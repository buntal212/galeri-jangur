<script setup>
import logoUrl from '~/assets/Logojk.svg'

useHead({
  title: 'Galery Jangur Keramik',
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: logoUrl
    }
  ],
  meta: [
    {
      name: 'description',
      content: 'Katalog produk keramik dan material bangunan Jangur Keramik.'
    },
    {
      name: 'theme-color',
      content: '#0f172a'
    }
  ]
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
