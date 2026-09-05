<script setup>
const { $api } = useNuxtApp()
const location = ref(null)
const loading = ref(true)
const { t } = useI18n()

const mapUrl = computed(() => {
  const latitude = location.value?.latitude
  const longitude = location.value?.longitude
  if (latitude === undefined || longitude === undefined) return ''
  return `https://www.google.com/maps?q=${encodeURIComponent(`${latitude},${longitude}`)}&output=embed`
})

const directionUrl = computed(() => {
  const latitude = location.value?.latitude
  const longitude = location.value?.longitude
  if (latitude === undefined || longitude === undefined) return ''
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${latitude},${longitude}`)}`
})

onMounted(async () => {
  try {
    const response = await $api.get('/lokasi-absen')
    const payload = typeof response.data === 'string'
      ? JSON.parse(response.data.replace(/^\uFEFF/, ''))
      : response.data
    location.value = payload?.result || payload?.data || null
  } catch (error) {
    console.error('ERROR GET LOKASI API V3:', error?.response?.data || error?.message || error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section id="lokasi" class="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
    <div class="mb-8 max-w-2xl">
      <p class="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">{{ t('location.eyebrow') }}</p>
      <h2 class="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">{{ t('location.title') }}</h2>
      <p class="mt-4 text-sm leading-6 text-slate-600">{{ t('location.description') }}</p>
    </div>
    <div class="grid overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl shadow-slate-200/40 lg:grid-cols-[1.2fr_.8fr]">
      <div v-if="mapUrl" class="aspect-[4/3] min-h-72 bg-slate-100 lg:aspect-auto">
        <iframe :src="mapUrl" title="Peta lokasi Jangur Keramik Probolinggo" class="h-full min-h-72 w-full border-0" loading="lazy" referrerpolicy="no-referrer-when-downgrade" />
      </div>
      <div v-else class="flex min-h-72 items-center justify-center bg-slate-100 p-8 text-center text-sm text-slate-600">{{ loading ? t('location.loading') : t('location.unavailable') }}</div>
      <div class="flex flex-col justify-center p-7 sm:p-10">
        <h3 class="text-xl font-bold text-slate-950">{{ location?.nama || 'Jangur Keramik Probolinggo' }}</h3>
        <p class="mt-4 text-sm leading-7 text-slate-600">Jalan Raya Jangur Barat Sungai Paser, Pacar, Jangur, Kecamatan Sumberasih, Kabupaten Probolinggo, Jawa Timur 67251.</p>
        <a v-if="directionUrl" :href="directionUrl" target="_blank" rel="noopener noreferrer" class="mt-7 inline-flex w-fit rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">{{ t('location.directions') }}</a>
      </div>
    </div>
  </section>
</template>
