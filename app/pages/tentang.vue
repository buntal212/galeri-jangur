<script setup>
const { t } = useI18n()
const config = useRuntimeConfig()
const siteUrl = String(config.public.siteUrl || 'https://jangur-keramik.my.id').replace(/\/+$/, '')
const localePath = useLocalePath()
const path = computed(() => localePath({ name: 'tentang' }))
useSeoMeta(() => ({ title: `${t('about.title')} | Jangur Keramik`, description: t('about.description') }))
useHead(() => ({ link: [{ rel: 'canonical', href: `${siteUrl}${path.value}` }] }))
</script>

<template>
  <div class="min-h-screen bg-[#f7f7f5] text-slate-900"><AppHeader /><main class="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8"><article class="rounded-3xl bg-white p-8 shadow-xl sm:p-12"><p class="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">Jangur Keramik</p><h1 class="mt-3 text-4xl font-bold">{{ t('about.title') }}</h1><p class="mt-6 max-w-2xl text-lg leading-8 text-slate-600">{{ t('about.description') }}</p></article></main><AppFooter /></div>
</template>
