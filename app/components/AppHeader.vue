<script setup>
import logoUrl from '~/assets/Logojk.svg'

const scrollToSection = (id) => {
  activeMenu.value = id
  const section = document.getElementById(id)
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' })
  } else {
    navigateTo({ path: localePath({ name: 'index' }), hash: `#${id}` })
  }
}

const goHome = () => {
  activeMenu.value = 'beranda'
  if (!['/', '/en'].includes(route.path)) {
    return navigateTo(localePath({ name: 'index' }))
  }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const activeMenu = ref('beranda')
const route = useRoute()
const { t, locale } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()

const updateActiveMenu = () => {
  if (route.path.startsWith('/produk') || route.path.startsWith('/en/products')) {
    activeMenu.value = 'produk'
    return
  }

  const produk = document.getElementById('produk')
  const kontak = document.getElementById('kontak')
  const scrollPosition = window.scrollY + 140
  const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 24

  if (isAtBottom || (kontak && scrollPosition >= kontak.offsetTop)) {
    activeMenu.value = 'kontak'
  } else if (produk && scrollPosition >= produk.offsetTop) {
    activeMenu.value = 'produk'
  } else {
    activeMenu.value = 'beranda'
  }
}

onMounted(() => {
  updateActiveMenu()
  window.addEventListener('scroll', updateActiveMenu, { passive: true })
  onBeforeUnmount(() => window.removeEventListener('scroll', updateActiveMenu))
})

watch(() => route.path, updateActiveMenu)
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl"
  >
    <div
      class="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
    >
      <NuxtLink :to="localePath({ name: 'index' })" class="flex items-center gap-3">
        <img
          :src="logoUrl"
          alt="Logo Jangur Keramik"
          class="h-11 w-11 rounded-xl object-cover shadow-sm"
        >

        <div>
          <div class="font-bold tracking-tight text-slate-950">
            Jangur <span class="text-slate-600">Keramik</span>
          </div>

          <div class="text-[11px] font-medium text-slate-600">
            Gallery & Building Materials
          </div>
        </div>
      </NuxtLink>

      <nav class="hidden items-center gap-8 md:flex">
        <NuxtLink
          to="/"
          class="border-b-2 pb-1 text-sm transition"
          :class="activeMenu === 'beranda' ? 'border-slate-950 font-semibold text-slate-950' : 'border-transparent font-medium text-slate-600 hover:border-slate-300 hover:text-slate-950'"
          @click.prevent="goHome"
        >
          {{ t('nav.home') }}
        </NuxtLink>

        <button
          type="button"
          class="cursor-pointer border-b-2 pb-1 text-sm transition"
          :class="activeMenu === 'produk' ? 'border-slate-950 font-semibold text-slate-950' : 'border-transparent font-medium text-slate-600 hover:border-slate-300 hover:text-slate-950'"
          @click="scrollToSection('produk')"
        >
          {{ t('nav.products') }}
        </button>

        <button
          type="button"
          class="cursor-pointer border-b-2 pb-1 text-sm transition"
          :class="activeMenu === 'kontak' ? 'border-slate-950 font-semibold text-slate-950' : 'border-transparent font-medium text-slate-600 hover:border-slate-300 hover:text-slate-950'"
          @click="scrollToSection('kontak')"
        >
          {{ t('nav.contact') }}
        </button>
      </nav>

      <div class="hidden items-center gap-3 sm:flex">
        <div class="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 lg:flex">
          <span class="h-2 w-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-300" />
          {{ t('hero.badge') }}
        </div>
        <button
          type="button"
          class="cursor-pointer rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-slate-800"
          @click="scrollToSection('kontak')"
        >
          {{ t('nav.contactUs') }}
        </button>
        <div class="flex overflow-hidden rounded-xl border border-slate-200 bg-white text-xs font-semibold">
          <NuxtLink v-for="language in ['id', 'en']" :key="language" :to="switchLocalePath(language)" class="px-3 py-2 transition" :class="locale === language ? 'bg-slate-950 text-white' : 'text-slate-600 hover:bg-slate-100'">{{ language.toUpperCase() }}</NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>
