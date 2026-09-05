<script setup>
defineProps({
  categories: {
    type: Array,
    default: () => []
  },

  selected: {
    type: String,
    default: ''
  },

  total: {
    type: Number,
    default: 0
  }
})

defineEmits(['select'])
const { t } = useI18n()
</script>

<template>
  <div
    id="kategori"
    class="mb-8 flex flex-col gap-5 border-t border-slate-200 pt-10 md:flex-row md:items-end md:justify-between"
  >
    <div>
      <p
        class="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-600"
      >
        {{ t('catalog.eyebrow') }}
      </p>

      <h2 class="text-3xl font-bold tracking-[-0.03em] text-slate-950">
        {{ t('catalog.title') }}
      </h2>

      <p class="mt-2 text-sm text-slate-600">
        {{ t('catalog.found', { count: total }) }}
      </p>
    </div>

    <div class="flex max-w-full gap-2 overflow-x-auto pb-2">
      <button
        v-for="category in categories"
        :key="typeof category === 'string' ? category : category.value"
        class="shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition"
        :class="
          selected === (typeof category === 'string' ? category : category.value)
            ? 'bg-slate-950 text-white'
            : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300'
        "
        @click="$emit('select', typeof category === 'string' ? category : category.value)"
      >
        {{ typeof category === 'string' ? category : category.label }}
      </button>
    </div>
  </div>
</template>
