<script setup>
useHead({
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
      name: 'theme-color',
      content: '#0f172a'
    }
  ]
})

useHead(useLocaleHead({ addSeoAttributes: true }))
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
