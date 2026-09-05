<script setup>
defineEmits(['select-product'])
const { t } = useI18n()

defineProps({
  products: {
    type: Array,
    default: () => []
  },

  loading: {
    type: Boolean,
    default: false
  },

  error: {
    type: String,
    default: null
  }
})
</script>

<template>
  <div>
    <div
      v-if="loading"
      class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
    >
      <div
        v-for="i in 8"
        :key="i"
        class="overflow-hidden rounded-2xl bg-white"
      >
        <div class="aspect-square animate-pulse bg-slate-200" />

        <div class="space-y-3 p-4">
          <div class="h-3 w-20 animate-pulse rounded bg-slate-200" />
          <div class="h-5 animate-pulse rounded bg-slate-200" />
          <div class="h-3 w-1/2 animate-pulse rounded bg-slate-200" />
        </div>
      </div>
    </div>

    <div
      v-else-if="error"
      class="rounded-3xl border border-red-100 bg-gradient-to-br from-red-50 to-white p-8 text-center"
    >
      <div class="font-semibold text-red-700">
        {{ t('catalog.loadError') }}
      </div>

      <p class="mt-1 text-sm text-red-500">
        {{ error }}
      </p>
    </div>

    <div
      v-else-if="products.length"
      class="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4"
    >
      <ProductCard
        v-for="item in products"
        :key="item?.id"
        :item="item"
        @select="$emit('select-product', $event)"
      />
    </div>

    <div
      v-else
      class="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center"
    >
      <div class="text-lg font-bold">
        {{ t('catalog.notFound') }}
      </div>

      <p class="mt-2 text-sm text-slate-600">
        {{ t('catalog.notFoundDescription') }}
      </p>
    </div>
  </div>
</template>
