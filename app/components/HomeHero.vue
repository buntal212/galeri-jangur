<script setup>
const props = defineProps({
  totalProduk: {
    type: Number,
    default: 0
  },

  totalKategori: {
    type: Number,
    default: 0
  },

  search: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:search'])
const { t } = useI18n()

const searchValue = computed({
  get() {
    return props.search
  },

  set(value) {
    emit('update:search', value)
  }
})
</script>

<template>
  <section class="relative overflow-hidden">
    <div
      class="absolute inset-0 bg-[radial-gradient(circle_at_78%_15%,rgba(245,196,65,0.14),transparent_28%),radial-gradient(circle_at_12%_30%,rgba(148,163,184,0.16),transparent_30%),linear-gradient(180deg,#fff,transparent_72%)]"
    />

    <div
      class="relative mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-16 sm:px-6 md:pt-24 lg:grid-cols-[1.1fr_.9fr] lg:px-8 lg:pb-24"
    >
      <div class="flex flex-col justify-center">
        <div
          class="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm shadow-amber-100"
        >
          <span class="h-2 w-2 rounded-full bg-amber-500" />

          <span class="text-emerald-600">●</span> {{ t('hero.badge') }}
        </div>

        <h1
          class="max-w-3xl text-4xl font-bold leading-[1.03] tracking-[-0.05em] text-slate-950 sm:text-5xl lg:text-6xl"
        >
          {{ t('hero.title') }}
          <span class="text-slate-600 decoration-amber-300 decoration-4 underline-offset-8">
            {{ t('hero.titleAccent') }}
          </span>
        </h1>

        <p class="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
          {{ t('hero.description') }}
        </p>

        <div
          class="mt-8 flex max-w-xl items-center rounded-2xl border border-slate-200/80 bg-white p-2 shadow-xl shadow-slate-300/30 transition focus-within:border-amber-400 focus-within:ring-4 focus-within:ring-amber-100"
        >
          <svg
            class="ml-3 h-5 w-5 text-slate-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>

          <input
            v-model="searchValue"
            type="text"
            :placeholder="t('hero.search')"
            class="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none"
          >
        </div>
      </div>

      <div class="relative hidden min-h-[430px] lg:block">
        <div
          class="absolute inset-0 rotate-3 rounded-[2rem] bg-gradient-to-br from-slate-200 to-slate-300"
        />

        <div
          class="absolute inset-0 overflow-hidden rounded-[2rem] bg-[radial-gradient(circle_at_80%_10%,#b38a25,transparent_2%),radial-gradient(circle_at_80%_10%,#475569,transparent_35%),linear-gradient(145deg,#1e293b,#020617)] p-8 shadow-2xl"
        >
          <div class="relative flex h-full flex-col justify-between">
            <div>
              <div
                class="inline-flex rounded-full border border-amber-200/20 bg-amber-300/10 px-3 py-1 text-xs text-amber-100"
              >
                {{ t('hero.collection') }}
              </div>

              <h2
                class="mt-5 max-w-sm text-4xl font-semibold tracking-tight text-white"
              >
                {{ t('hero.inspiration') }}
              </h2>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div
                class="rounded-2xl border border-white/10 bg-white/10 p-4"
              >
                <div class="text-2xl font-bold text-white">
                  {{ totalProduk }}+
                </div>

                <div class="mt-1 text-xs text-white/60">
                  {{ t('hero.products') }}
                </div>
              </div>

              <div
                class="rounded-2xl border border-white/10 bg-white/10 p-4"
              >
                <div class="text-2xl font-bold text-white">
                  {{ totalKategori }}
                </div>

                <div class="mt-1 text-xs text-white/60">
                  {{ t('hero.categories') }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
