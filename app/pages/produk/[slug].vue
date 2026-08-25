<script setup>

const route = useRoute()
const config = useRuntimeConfig()
const apiBase = String(config.public.apiBase || '').replace(/\/$/, '')
const siteUrl = String(config.public.siteUrl || '').replace(/\/$/, '')
const { data: product, error, status } = await useAsyncData(`product-${route.params.slug}`, async () => {
  const raw = await $fetch(`${apiBase}/product/detail-by-slug/${encodeURIComponent(route.params.slug)}`)
  const payload = typeof raw === 'string' ? JSON.parse(raw.replace(/^\uFEFF/, '')) : raw
  const item = payload?.data || null
  return item
})

if (product.value?.slug && product.value.slug !== route.params.slug) {
  await navigateTo(`/produk/${product.value.slug}`, { redirectCode: 301 })
}

if (!product.value) {
  throw createError({ statusCode: 404, statusMessage: 'Produk tidak ditemukan', fatal: true })
}

const loading = computed(() => status.value === 'pending')
const current = computed(() => product.value || {})
const name = computed(() => String(current.value.namagabung || current.value.name || 'Produk Jangur Keramik').trim())
const brand = computed(() => String(current.value.brand || '').trim())
const size = computed(() => String(current.value.ukuran || '').trim())
const grade = computed(() => String(current.value.kualitas || '').trim())
const description = computed(() => {
  const details = [
    name.value,
    brand.value ? `dari ${brand.value}` : '',
    size.value ? `ukuran ${size.value}` : '',
    grade.value && grade.value !== '-' ? `kualitas ${grade.value}` : ''
  ].filter(Boolean).join(' ')

  return `${details}. Lihat detail produk di Jangur Keramik Probolinggo.`
})
const imageUrl = path => !path ? '' : (/^https?:\/\//i.test(path) ? path : `${config.public.backendUrl || ''}${path.startsWith('/') ? path : `/${path}`}`)
const gallery = computed(() => { const images = Array.isArray(current.value.images) ? [...current.value.images].sort((a, b) => Number(Boolean(b.flag_thumbnail)) - Number(Boolean(a.flag_thumbnail))) : []; return [...new Set([current.value.image, ...images.map(item => item?.url || item?.image || item?.gambar)].map(imageUrl).filter(Boolean))] })
const activeImage = ref(0)
const mainImage = computed(() => gallery.value[activeImage.value] || '')
const imageLoading = ref(true)
watch(mainImage, value => { imageLoading.value = Boolean(value) }, { immediate: true })

const schemaBreadcrumb = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Beranda', item: `${siteUrl}/` },
    { '@type': 'ListItem', position: 2, name: 'Produk', item: `${siteUrl}/` },
    { '@type': 'ListItem', position: 3, name: name.value, item: `${siteUrl}/produk/${route.params.slug}` }
  ]
}))
const schemaProduct = computed(() => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: name.value,
    url: `${siteUrl}/produk/${current.value.slug || route.params.slug}`
  }

  if (description.value) schema.description = description.value
  if (current.value.kodebarang) schema.sku = String(current.value.kodebarang).trim()
  if (brand.value) schema.brand = { '@type': 'Brand', name: brand.value }
  if (gallery.value.length) schema.image = gallery.value

  return schema
})
useSeoMeta(() => ({ title: `${name.value}${brand.value ? ` ${brand.value}` : ''}${size.value ? ` ${size.value}` : ''} | Jangur Keramik`, description: description.value, ogTitle: `${name.value} | Jangur Keramik`, ogDescription: description.value, ...(mainImage.value ? { ogImage: mainImage.value } : {}), ogType: 'product', twitterCard: 'summary_large_image' }))
useHead(() => ({
  title: `${name.value}${brand.value ? ` ${brand.value}` : ''}${size.value ? ` ${size.value}` : ''} | Jangur Keramik`,
  meta: [{ name: 'description', content: description.value }],
  link: [{ rel: 'canonical', href: `${siteUrl}/produk/${route.params.slug}` }],
  script: [
    { type: 'application/ld+json', children: JSON.stringify(schemaBreadcrumb.value) },
    { type: 'application/ld+json', children: JSON.stringify(schemaProduct.value) }
  ]
}))
</script>

<template>
  <div class="min-h-screen bg-[#f7f7f5] text-slate-900"><AppHeader /><main class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"><nav aria-label="Breadcrumb" class="mb-8 text-sm text-slate-500"><NuxtLink to="/">Beranda</NuxtLink><span class="mx-2">/</span><NuxtLink to="/#produk">Produk</NuxtLink><span class="mx-2">/</span><span>{{ name }}</span></nav>
    <div v-if="loading" class="grid gap-8 rounded-3xl bg-white p-6 shadow-xl md:grid-cols-2 md:p-10"><div class="aspect-square animate-pulse rounded-2xl bg-slate-200" /><div class="space-y-5 py-8"><div class="h-3 w-24 animate-pulse rounded bg-slate-200" /><div class="h-10 w-3/4 animate-pulse rounded bg-slate-200" /><div class="h-4 w-full animate-pulse rounded bg-slate-100" /><div class="h-32 animate-pulse rounded-2xl bg-slate-100" /></div></div>
    <div v-else-if="error || !product" class="rounded-3xl bg-white p-16 text-center"><h1 class="text-3xl font-bold">404</h1><p class="mt-3 text-slate-500">Produk tidak ditemukan.</p><NuxtLink to="/" class="mt-6 inline-block font-semibold underline">Kembali ke katalog</NuxtLink></div>
    <article v-else class="grid gap-10 rounded-3xl bg-white p-6 shadow-xl md:grid-cols-2 md:p-10"><div><div class="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-slate-100"><div v-if="imageLoading" class="absolute inset-0 z-10 flex items-center justify-center bg-slate-100"><span class="h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-slate-950" aria-label="Memuat gambar produk" /></div><img v-if="mainImage" :src="mainImage" :alt="name" class="h-full w-full object-cover" width="800" height="800" fetchpriority="high" @load="imageLoading = false"><span v-else class="text-sm text-slate-500">Foto produk belum tersedia</span></div><div v-if="gallery.length > 1" class="mt-4 grid grid-cols-5 gap-3"><button v-for="(image, index) in gallery" :key="image" type="button" class="aspect-square cursor-pointer overflow-hidden rounded-xl border-2" :class="activeImage === index ? 'border-slate-950' : 'border-transparent'" @click.stop.prevent="activeImage = index"><img :src="image" :alt="`${name} gambar ${index + 1}`" class="h-full w-full object-cover" loading="lazy"></button></div></div><div><p class="text-xs font-bold uppercase tracking-[0.2em] text-amber-500">{{ current.brand || 'Jangur Keramik' }}</p><h1 class="mt-3 text-3xl font-bold sm:text-4xl">{{ name }}</h1><p class="mt-5 leading-7 text-slate-500">{{ description }}</p><dl class="mt-8 divide-y rounded-2xl border"><div v-for="field in [{ label: 'Brand', value: current.brand }, { label: 'Kategori', value: current.category }, { label: 'Ukuran', value: current.ukuran }, { label: 'Kualitas', value: current.kualitas }, { label: 'Kode barang', value: current.kodebarang }, { label: 'Satuan besar', value: current.satuan_b }, { label: 'Satuan kecil', value: current.satuan_k }, { label: 'Isi', value: current.isi }]" v-show="field.value !== null && field.value !== undefined && field.value !== ''" :key="field.label" class="grid grid-cols-[9rem_1fr] gap-3 px-4 py-3 text-sm"><dt class="text-slate-500">{{ field.label }}</dt><dd class="font-semibold">{{ field.value }}</dd></div></dl></div></article>
  </main><AppFooter /></div>
</template>
