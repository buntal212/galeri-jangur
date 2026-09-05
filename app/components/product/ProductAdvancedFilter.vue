<script setup>
const props = defineProps({
  brands: {
    type: Array,
    default: () => []
  },
  sizes: {
    type: Array,
    default: () => []
  },
  grades: {
    type: Array,
    default: () => []
  },
  types: {
    type: Array,
    default: () => []
  }
})

const brand = defineModel('brand')
const size = defineModel('size')
const grade = defineModel('grade')
const type = defineModel('type')
const { t } = useI18n()

const filters = computed(() => [
  {
    label: t('catalog.brand'),
    model: brand,
    options: props.brands
  },
  {
    label: t('catalog.size'),
    model: size,
    options: props.sizes
  },
  {
    label: t('catalog.grade'),
    model: grade,
    options: props.grades
  },
  {
    label: t('catalog.type'),
    model: type,
    options: props.types
  }
])

const resetFilter = () => {
  brand.value = ''
  size.value = ''
  grade.value = ''
  type.value = ''
}
</script>
<template>
  <div
    class="mb-8 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6"
  >
    <!-- Header -->
    <div
      class="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <div class="flex items-center gap-3">
        <div
          class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-white"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            class="h-5 w-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 6h16M7 12h10m-6 6h2"
            />
          </svg>
        </div>

        <div>
          <h3 class="text-sm font-bold text-slate-950">
            {{ t('catalog.filter') }}
          </h3>

          <p class="mt-0.5 text-xs text-slate-600">
            {{ t('catalog.filterDescription') }}
          </p>
        </div>
      </div>

      <button
        type="button"
        class="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
        @click="resetFilter"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          class="h-4 w-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3 12a9 9 0 1 0 3-6.7M3 4v6h6"
          />
        </svg>

        {{ t('catalog.reset') }}
      </button>
    </div>

    <!-- Filter -->
    <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <label
        v-for="filter in filters"
        :key="filter.label"
        class="block"
      >
        <span
          class="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-slate-600"
        >
          {{ filter.label }}
        </span>

        <div class="relative">
          <select
            v-model="filter.model.value"
            class="h-12 w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 pr-10 text-sm font-semibold text-slate-700 outline-none transition hover:border-slate-300 hover:bg-white focus:border-slate-950 focus:bg-white focus:ring-4 focus:ring-slate-100"
          >
            <option
              v-for="option in filter.options"
              :key="typeof option === 'string' ? option : option.value"
              :value="typeof option === 'string' ? option : option.value"
            >
              {{ typeof option === 'string' ? option : option.label }}
            </option>
          </select>

          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            class="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m7 10 5 5 5-5"
            />
          </svg>
        </div>
      </label>
    </div>
  </div>
</template>
