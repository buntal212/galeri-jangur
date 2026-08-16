<script setup>
import logoUrl from '~/assets/Logojk.svg'

const scrollToSection = (id) => {
  activeMenu.value = id
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const activeMenu = ref('beranda')

const updateActiveMenu = () => {
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
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl"
  >
    <div
      class="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
    >
      <NuxtLink to="/" class="flex items-center gap-3">
        <img
          :src="logoUrl"
          alt="Logo Jangur Keramik"
          class="h-11 w-11 rounded-xl object-cover shadow-sm"
        >

        <div>
          <div class="font-bold tracking-tight text-slate-950">
            Jangur <span class="text-slate-500">Keramik</span>
          </div>

          <div class="text-[11px] font-medium text-slate-400">
            Gallery & Building Materials
          </div>
        </div>
      </NuxtLink>

      <nav class="hidden items-center gap-8 md:flex">
        <NuxtLink
          to="/"
          class="border-b-2 pb-1 text-sm transition"
          :class="activeMenu === 'beranda' ? 'border-slate-950 font-semibold text-slate-950' : 'border-transparent font-medium text-slate-500 hover:border-slate-300 hover:text-slate-950'"
          @click="activeMenu = 'beranda'"
        >
          Beranda
        </NuxtLink>

        <button
          type="button"
          class="cursor-pointer border-b-2 pb-1 text-sm transition"
          :class="activeMenu === 'produk' ? 'border-slate-950 font-semibold text-slate-950' : 'border-transparent font-medium text-slate-500 hover:border-slate-300 hover:text-slate-950'"
          @click="scrollToSection('produk')"
        >
          Produk
        </button>

        <button
          type="button"
          class="cursor-pointer border-b-2 pb-1 text-sm transition"
          :class="activeMenu === 'kontak' ? 'border-slate-950 font-semibold text-slate-950' : 'border-transparent font-medium text-slate-500 hover:border-slate-300 hover:text-slate-950'"
          @click="scrollToSection('kontak')"
        >
          Kontak
        </button>
      </nav>

      <div class="hidden items-center gap-3 sm:flex">
        <div class="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-500 lg:flex">
          <span class="h-2 w-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-300" />
          Koleksi aktif
        </div>
        <button
          type="button"
          class="cursor-pointer rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-slate-800"
          @click="scrollToSection('kontak')"
        >
          Hubungi kami
        </button>
      </div>
    </div>
  </header>
</template>
