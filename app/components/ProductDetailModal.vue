<script setup>
const props = defineProps({ item: { type: Object, required: true } })
defineEmits(['close'])

const config = useRuntimeConfig()
const { t } = useI18n()
const activeImage = ref(0)

const imageUrl = (path) => {
  if (!path) return null
  if (/^https?:\/\//i.test(path)) return path
  const base = config.public.backendUrl || ''
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}

const images = computed(() => {
  const values = props.item?.images?.map(image => imageUrl(image?.gambar || image?.url || image?.image)).filter(Boolean) || []
  const main = imageUrl(props.item?.image)
  return [...new Set(main ? [main, ...values] : values)]
})

const close = () => {
  activeImage.value = 0
}
</script>

<template>
  <div class="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm" @click.self="$emit('close')">
    <article class="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] bg-white shadow-2xl">
      <div class="flex items-center justify-between border-b border-slate-100 px-6 py-5 sm:px-8">
        <div><p class="text-xs font-bold uppercase tracking-[0.18em] text-slate-600">{{ t('catalog.viewDetails') }}</p><h2 class="mt-1 text-xl font-bold text-slate-950">{{ item?.namagabung || item?.name || t('nav.products') }}</h2></div>
        <button type="button" :aria-label="t('catalog.viewDetails')" class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-slate-100 text-xl text-slate-600 transition hover:bg-slate-950 hover:text-white" @click="$emit('close')">&times;</button>
      </div>
      <div class="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.05fr_.95fr]">
        <div>
          <div class="aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-slate-100 to-slate-300">
            <img v-if="images[activeImage]" :src="images[activeImage]" :alt="item?.name || t('nav.products')" decoding="async" class="h-full w-full object-cover">
            <div v-else class="flex h-full items-center justify-center text-sm text-slate-600">{{ t('catalog.imageUnavailable') }}</div>
          </div>
          <div v-if="images.length > 1" class="mt-3 grid grid-cols-5 gap-2">
            <button v-for="(image, index) in images" :key="image" type="button" class="aspect-square cursor-pointer overflow-hidden rounded-xl border-2 transition" :class="activeImage === index ? 'border-slate-950' : 'border-transparent opacity-60 hover:opacity-100'" @click="activeImage = index"><img :src="image" :alt="`Gambar ${index + 1}`" loading="lazy" decoding="async" class="h-full w-full object-cover"></button>
          </div>
        </div>
        <div class="flex flex-col justify-center">
          <span class="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase text-slate-600">{{ item?.category || t('nav.products') }}</span>
          <p class="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-slate-600">{{ item?.brand || 'Jangur' }}</p>
          <h3 class="mt-2 text-3xl font-bold tracking-[-0.04em] text-slate-950">{{ item?.namagabung || item?.name || '-' }}</h3>
          <div class="mt-7 grid grid-cols-2 gap-3">
            <div class="rounded-2xl bg-slate-50 p-4"><p class="text-xs text-slate-600">{{ t('detail.size') }}</p><p class="mt-1 font-semibold text-slate-900">{{ item?.ukuran || '-' }}</p></div>
            <div class="rounded-2xl bg-slate-50 p-4"><p class="text-xs text-slate-600">Grade</p><p class="mt-1 font-semibold text-slate-900">{{ item?.kualitas || '-' }}</p></div>
            <div class="col-span-2 rounded-2xl bg-slate-50 p-4"><p class="text-xs text-slate-600">{{ t('catalog.type') }}</p><p class="mt-1 font-semibold text-slate-900">{{ item?.kodejenis || '-' }}</p></div>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>
