<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['select'])

const config = useRuntimeConfig()

const imageUrl = (path) => {
  if (!path) return null
  if (/^https?:\/\//i.test(path)) return path

  const backendUrl = config.public.backendUrl || ''

  return `${backendUrl}${path.startsWith('/') ? path : `/${path}`}`
}

const productImage = computed(() => {
  if (props.item?.image) {
    return imageUrl(props.item.image)
  }

  if (props.item?.images?.length) {
    return imageUrl(
      props.item.images[0]?.url ||
      props.item.images[0]?.image ||
      props.item.images[0]?.gambar
    )
  }

  return null
})

</script>

<template>
  <article
    class="group relative cursor-pointer overflow-hidden rounded-[1.75rem] border border-slate-200/70 bg-white shadow-sm transition duration-500 hover:-translate-y-1.5 hover:border-slate-300 hover:shadow-2xl hover:shadow-slate-300/40"
    @click="emit('select', item)"
  >
    <div
      class="relative aspect-square overflow-hidden bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300"
    >
      <img
        v-if="productImage"
        :src="productImage"
        :alt="item?.name || 'Produk'"
        loading="lazy"
        decoding="async"
        class="h-full w-full object-cover transition duration-700 group-hover:scale-110"
      >

      <div
        v-else
        class="flex h-full flex-col items-center justify-center p-6 text-center"
      >
        <div
          class="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm"
        >
          <svg
            class="h-6 w-6 text-slate-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="m21 15-5-5L5 21" />
          </svg>
        </div>

        <span class="mt-3 text-xs font-medium text-slate-400">
          Foto segera tersedia
        </span>
      </div>

      <div
        class="absolute left-3 top-3 rounded-full border border-white/70 bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-700 shadow-sm backdrop-blur"
      >
        {{ item?.category || 'Produk' }}
      </div>
      <div class="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/20 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
    </div>

    <div class="p-5">
      <div
        class="flex items-center justify-between gap-3 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400"
      >
        <span class="truncate">{{ item?.brand || 'Jangur' }}</span>
        <span class="shrink-0 text-amber-500">● Tersedia</span>
      </div>

      <h3
        class="mt-2 line-clamp-2 min-h-10 text-sm font-bold leading-5 tracking-[-0.01em] text-slate-950 sm:text-base"
      >
        {{ item?.namagabung || item?.name || '-' }}
      </h3>

      <div class="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
        <span
          v-if="item?.ukuran"
          class="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 font-medium"
        >
          {{ item.ukuran }}
        </span>

        <span
          v-if="item?.kualitas && item.kualitas !== '-'"
          class="rounded-lg bg-slate-100 px-2 py-1"
        >
          Grade {{ item.kualitas }}
        </span>
      </div>

      <div
        class="mt-5 flex items-center justify-between border-t border-slate-100 pt-4"
      >
        <span class="text-xs font-medium text-slate-400">
          Lihat detail
        </span>

        <div
          class="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 transition group-hover:bg-slate-950 group-hover:text-white"
        >
          →
        </div>
      </div>
    </div>
  </article>
</template>
