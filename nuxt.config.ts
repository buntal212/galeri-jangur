import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: {
    enabled: true
  },

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/i18n'
  ],

  css: [
    '~/assets/css/main.css'
  ],

  i18n: {
    restructureDir: false,
    vueI18n: './i18n.config.ts',
    strategy: 'prefix_except_default',
    defaultLocale: 'id',
    langDir: 'locales',
    locales: [
      { code: 'id', language: 'id-ID', file: 'id.json' },
      { code: 'en', language: 'en-US', file: 'en.json' }
    ],
    customRoutes: 'config',
    pages: {
      index: { id: '/', en: '/' },
      produk: { id: '/produk', en: '/products' },
      'produk-slug': { id: '/produk/[slug]', en: '/products/[slug]' },
      tentang: { id: '/tentang', en: '/about' },
      kontak: { id: '/kontak', en: '/contact' }
    },
    detectBrowserLanguage: { useCookie: true, cookieKey: 'jangur_locale', redirectOn: 'root' },
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://jangur-keramik.my.id',
    seo: true
  },
  hooks: {
    'pages:extend': (pages) => {
      pages.push({ name: 'produk', path: '/produk', file: '~/pages/index.vue' })
    }
  },

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
