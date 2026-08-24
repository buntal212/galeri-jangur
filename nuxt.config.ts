import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: {
    enabled: true
  },

  modules: [
    '@pinia/nuxt'
  ],

  css: [
    '~/assets/css/main.css'
  ],

  runtimeConfig: {
    public: {
      apiBase: '',
      backendUrl: '',
      siteUrl: ''
    }
  },

  vite: {
    plugins: [
      tailwindcss()
    ]
  }
})
