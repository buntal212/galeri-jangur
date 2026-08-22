<script setup>
import ProductAdvancedFilter from '~/components/product/ProductAdvancedFilter.vue'

const produkStore = useProdukStore()

const search = ref('')
const selectedCategory = ref('Semua')
const selectedBrand = ref('Semua')
const selectedSize = ref('Semua')
const selectedGrade = ref('Semua')
const selectedType = ref('Semua')
const currentPage = ref(1)
const itemsPerPage = 12
const selectedProduct = ref(null)

await Promise.all([
  produkStore.getProduk(),
  produkStore.getFilters()
])

const categories = computed(() => {
  const data = produkStore.items
    .map(item => item?.category)
    .filter(Boolean)

  return ['Semua', ...new Set(data)]
})

const brands = computed(() => ['Semua', ...produkStore.filters.brands])
const sizes = computed(() => ['Semua', ...produkStore.filters.sizes])
const grades = computed(() => ['Semua', ...produkStore.filters.grades])
const types = computed(() => ['Semua', ...produkStore.filters.types])

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

  const keyword = search.value.trim().toLowerCase()

  if (keyword) {
    products = products.filter(item => {
      return (
        item?.name?.toLowerCase().includes(keyword) ||
        item?.namagabung?.toLowerCase().includes(keyword) ||
        item?.brand?.toLowerCase().includes(keyword) ||
        item?.ukuran?.toLowerCase().includes(keyword)
      )
    })
  }

  return products
})

const totalPages = computed(() =>
  Math.max(Math.ceil(filteredProducts.value.length / itemsPerPage), 1)
)

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredProducts.value.slice(start, start + itemsPerPage)
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

watch([search, selectedCategory, selectedBrand, selectedSize, selectedGrade, selectedType], () => {
  currentPage.value = 1
})

watch(totalPages, (total) => {
  if (currentPage.value > total) currentPage.value = total
})
</script>

<template>
  <div class="min-h-screen bg-[#f7f7f5] text-slate-900">
    <AppHeader />

    <main>
      <HomeHero
        v-model:search="search"
        :total-produk="produkStore.items.length"
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
          :total="filteredProducts.length"
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
          :products="paginatedProducts"
          :loading="produkStore.loading"
          :error="produkStore.error"
          @select-product="selectedProduct = $event"
        />

        <ProductDetailModal
          v-if="selectedProduct"
          :item="selectedProduct"
          @close="selectedProduct = null"
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
            <button
              type="button"
              aria-label="Halaman sebelumnya"
              :disabled="currentPage === 1"
              class="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg text-slate-600 shadow-sm transition hover:border-slate-950 hover:bg-slate-950 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:bg-white disabled:hover:text-slate-600"
              @click="currentPage--"
            >
              ‹
            </button>

            <template v-for="(page, index) in visiblePages" :key="`${page}-${index}`">
              <span
                v-if="page === '...'"
                class="flex h-10 w-7 items-center justify-center text-sm text-slate-400"
              >
                …
              </span>

              <button
                v-else
                type="button"
                :aria-label="`Buka halaman ${page}`"
                :aria-current="currentPage === page ? 'page' : undefined"
                class="flex h-10 min-w-10 items-center justify-center rounded-xl px-3 text-sm font-semibold transition"
                :class="currentPage === page
                  ? 'bg-slate-950 text-white shadow-lg shadow-slate-950/20'
                  : 'border border-slate-200 bg-white text-slate-600 shadow-sm hover:border-slate-950 hover:bg-slate-950 hover:text-white'"
                @click="currentPage = page"
              >
                {{ page }}
              </button>
            </template>

            <button
              type="button"
              aria-label="Halaman berikutnya"
              :disabled="currentPage === totalPages"
              class="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg text-slate-600 shadow-sm transition hover:border-slate-950 hover:bg-slate-950 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:bg-white disabled:hover:text-slate-600"
              @click="currentPage++"
            >
              ›
            </button>
          </div>
        </nav>
      </section>
      <StoreLocation />
    </main>

    <AppFooter />
  </div>
</template>
