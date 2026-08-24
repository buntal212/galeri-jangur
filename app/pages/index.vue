<script setup>
import ProductAdvancedFilter from '~/components/product/ProductAdvancedFilter.vue'

const config = useRuntimeConfig()
const route = useRoute()
const siteUrl = String(config.public.siteUrl || 'https://jangur-keramik.my.id').replace(/\/+$/, '')
const normalizedPage = value => {
  const parsed = Number.parseInt(String(value || '1'), 10)
  return Number.isFinite(parsed) && parsed >= 1 ? parsed : 1
}
const requestedPage = computed(() => normalizedPage(route.query.page))
const pageTitle = computed(() => requestedPage.value === 1
  ? 'Jangur Keramik Probolinggo | Keramik & Granit'
  : `Produk Keramik & Granit Halaman ${requestedPage.value} | Jangur Keramik Probolinggo`)
const pageDescription = computed(() => requestedPage.value === 1
  ? 'Katalog keramik dan granit Jangur Keramik Probolinggo. Temukan berbagai pilihan produk keramik dan material bangunan.'
  : `Lihat katalog keramik dan granit Jangur Keramik Probolinggo halaman ${requestedPage.value}. Temukan berbagai produk dan pilihan material bangunan.`)
useSeoMeta(() => ({ title: pageTitle.value, description: pageDescription.value, ogTitle: pageTitle.value, ogDescription: pageDescription.value, ogType: 'website', twitterCard: 'summary_large_image' }))
useHead(() => ({
  title: pageTitle.value,
  meta: [{ name: 'description', content: pageDescription.value }],
  link: [{ rel: 'canonical', href: `${siteUrl}${requestedPage.value === 1 ? '/' : `/?page=${requestedPage.value}`}` }],
  script: [{ type: 'application/ld+json', children: JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Jangur Keramik',
    url: `${siteUrl}/`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jalan Raya Jangur Barat Sungai Paser, Pacar, Jangur',
      addressLocality: 'Kecamatan Sumberasih',
      addressRegion: 'Jawa Timur',
      postalCode: '67251',
      addressCountry: 'ID'
    }
  }) }]
}))

const produkStore = useProdukStore()

const search = ref('')
const selectedCategory = ref('Semua')
const selectedBrand = ref('Semua')
const selectedSize = ref('Semua')
const selectedGrade = ref('Semua')
const selectedType = ref('Semua')

await Promise.all([
  produkStore.items.length && produkStore.currentPage === requestedPage.value
    ? Promise.resolve()
    : produkStore.getProduk({ page: requestedPage.value }),
  produkStore.filters.brands.length ? Promise.resolve() : produkStore.getFilters()
])

const categories = computed(() => {
  const data = produkStore.items
    .map(item => item?.category)
    .filter(Boolean)

  return ['Semua', ...new Set(data)]
})
const currentPage = computed({ get: () => produkStore.currentPage, set: value => { produkStore.currentPage = value } })
const totalPages = computed(() => Math.max(produkStore.lastPage, 1))

const brands = computed(() => ['Semua', ...produkStore.filters.brands])
const sizes = computed(() => ['Semua', ...produkStore.filters.sizes])
const grades = computed(() => ['Semua', ...produkStore.filters.grades])
const types = computed(() => ['Semua', ...produkStore.filters.types.map(type => typeof type === 'string' ? { value: type, label: type } : type)])

const filteredProducts = computed(() => {
  let products = produkStore.items

  if (selectedCategory.value !== 'Semua') {
    products = products.filter(
      item => item?.category === selectedCategory.value
    )
  }

  if (selectedBrand.value !== 'Semua') products = products.filter(item => item?.brand === selectedBrand.value)
  if (selectedSize.value !== 'Semua') products = products.filter(item => item?.ukuran === selectedSize.value)
  if (selectedGrade.value !== 'Semua') products = products.filter(item => item?.kualitas === selectedGrade.value)
  if (selectedType.value !== 'Semua') products = products.filter(item => item?.kodejenis === selectedType.value)

  return products
})

const visiblePages = computed(() => {
  const total = totalPages.value
  const current = currentPage.value

  if (total <= 5) {
    return Array.from({ length: total }, (_, index) => index + 1)
  }

  if (current <= 3) return [1, 2, 3, 4, '...', total]
  if (current >= total - 2) return [1, '...', total - 3, total - 2, total - 1, total]

  return [1, '...', current - 1, current, current + 1, '...', total]
})

let searchTimer
watch(search, value => {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    produkStore.search = value.trim()
    produkStore.currentPage = 1
    produkStore.getProduk({ page: 1, search: produkStore.search })
  }, 400)
})
watch(currentPage, (page, previousPage) => {
  if (page !== previousPage) produkStore.getProduk({ page, search: produkStore.search })
})
watch(() => route.query.page, page => {
  const nextPage = normalizedPage(page)
  if (nextPage !== currentPage.value) produkStore.getProduk({ page: nextPage, search: produkStore.search })
})
onBeforeUnmount(() => clearTimeout(searchTimer))

const goToPage = page => {
  if (page === currentPage.value || page < 1 || page > totalPages.value) return
  navigateTo({ query: page === 1 ? {} : { page } })
  nextTick(() => document.getElementById('produk')?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
}

const pageLink = page => page === 1 ? '/' : { path: '/', query: { page } }
</script>

<template>
  <div class="min-h-screen bg-[#f7f7f5] text-slate-900">
    <AppHeader />

    <main>
      <HomeHero
        v-model:search="search"
        :total-produk="produkStore.total"
        :total-kategori="Math.max(categories.length - 1, 0)"
      />

      <HomeBenefits />

      <section
        id="produk"
        class="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8"
      >
        <ProductFilter
          :categories="categories"
          :selected="selectedCategory"
          :total="produkStore.total"
          @select="selectedCategory = $event"
        />

        <ProductAdvancedFilter
          v-model:brand="selectedBrand"
          v-model:size="selectedSize"
          v-model:grade="selectedGrade"
          v-model:type="selectedType"
          :brands="brands"
          :sizes="sizes"
          :grades="grades"
          :types="types"
        />

        <ProductGrid
          :products="filteredProducts"
          :loading="produkStore.loading"
          :error="produkStore.error"
        />

        <nav
          v-if="!produkStore.loading && !produkStore.error && filteredProducts.length"
          class="mt-12 flex flex-col items-center justify-between gap-5 border-t border-slate-200/80 pt-6 sm:flex-row"
          aria-label="Paginasi produk"
        >
          <p class="text-sm text-slate-500">
            Halaman <span class="font-semibold text-slate-950">{{ currentPage }}</span>
            dari <span class="font-semibold text-slate-950">{{ totalPages }}</span>
          </p>

          <div class="flex items-center gap-2">
            <NuxtLink
              :to="pageLink(currentPage - 1)"
              type="button"
              aria-label="Halaman sebelumnya"
              :disabled="currentPage === 1"
              class="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg text-slate-600 shadow-sm transition hover:border-slate-950 hover:bg-slate-950 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:bg-white disabled:hover:text-slate-600"
              @click="goToPage(currentPage - 1)"
            >
              ‹
            </NuxtLink>

            <template v-for="(page, index) in visiblePages" :key="`${page}-${index}`">
              <span
                v-if="page === '...'"
                class="flex h-10 w-7 items-center justify-center text-sm text-slate-400"
              >
                …
              </span>

              <NuxtLink
                :to="pageLink(page)"
                v-else
                type="button"
                :aria-label="`Buka halaman ${page}`"
                :aria-current="currentPage === page ? 'page' : undefined"
                class="flex h-10 min-w-10 items-center justify-center rounded-xl px-3 text-sm font-semibold transition"
                :class="currentPage === page
                  ? 'bg-slate-950 text-white shadow-lg shadow-slate-950/20'
                  : 'border border-slate-200 bg-white text-slate-600 shadow-sm hover:border-slate-950 hover:bg-slate-950 hover:text-white'"
                @click="goToPage(page)"
              >
                {{ page }}
            </NuxtLink>
            </template>

            <NuxtLink
              :to="pageLink(currentPage + 1)"
              type="button"
              aria-label="Halaman berikutnya"
              :disabled="currentPage === totalPages"
              class="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg text-slate-600 shadow-sm transition hover:border-slate-950 hover:bg-slate-950 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:bg-white disabled:hover:text-slate-600"
              @click="goToPage(currentPage + 1)"
            >
              ›
            </NuxtLink>
          </div>
        </nav>
      </section>
      <StoreLocation />
    </main>

    <AppFooter />
  </div>
</template>
