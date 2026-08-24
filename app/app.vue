<script setup>
useHead({
  title: 'Galery Jangur Keramik',
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '48x48',
      href: '/favicon-48x48.png'
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
