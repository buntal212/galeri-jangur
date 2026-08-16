<template>
  <section class="relative z-10 mx-auto -mt-4 max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="grid overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl shadow-slate-200/40 sm:grid-cols-2 lg:grid-cols-4">
      <div v-for="benefit in benefits" :key="benefit.title" class="flex items-center gap-3 border-b border-slate-100 px-5 py-5 last:border-0 sm:nth-[2n]:border-r-0 lg:border-b-0 lg:border-r lg:last:border-0">
        <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-5 w-5"><path stroke-linecap="round" stroke-linejoin="round" :d="benefit.icon" /></svg>
        </div>
        <div><p class="text-sm font-bold text-slate-900">{{ benefit.title }}</p><p class="mt-0.5 text-xs text-slate-500">{{ benefit.description }}</p></div>
      </div>
    </div>
  </section>

  <section class="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
    <div class="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
      <div><p class="text-xs font-bold uppercase tracking-[0.2em] text-amber-500">Kenapa Jangur?</p><h2 class="mt-3 max-w-md text-3xl font-bold leading-tight tracking-[-0.04em] text-slate-950 sm:text-4xl">Pilihan material yang membuat proyek terasa lebih mudah.</h2><p class="mt-5 max-w-md text-sm leading-6 text-slate-500">Kami membantu Anda menemukan produk yang tepat dengan pilihan brand, ukuran, dan spesifikasi yang lengkap.</p></div>
      <div class="grid gap-3 sm:grid-cols-2">
        <div v-for="reason in reasons" :key="reason.title" class="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><div class="text-2xl">{{ reason.icon }}</div><h3 class="mt-4 font-bold text-slate-950">{{ reason.title }}</h3><p class="mt-2 text-sm leading-6 text-slate-500">{{ reason.description }}</p></div>
      </div>
    </div>
  </section>
</template>

<script setup>
const benefits = [
  { title: 'Koleksi lengkap', description: 'Beragam pilihan produk', icon: 'M4 6h16M4 12h16M4 18h16' },
  { title: 'Brand terpercaya', description: 'Kualitas pilihan terbaik', icon: 'M12 3 4 7v5c0 4.5 3.4 7.7 8 9 4.6-1.3 8-4.5 8-9V7l-8-4Z' },
  { title: 'Stok tersedia', description: 'Data diperbarui berkala', icon: 'M5 12h14M12 5v14' },
  { title: 'Sales siap bantu', description: 'Konsultasi lebih mudah', icon: 'M20 11a8 8 0 1 1-3-6.2M20 4v7h-7' }
]

const reasons = [
  { title: 'Spesifikasi jelas', description: 'Temukan detail ukuran, grade, merk, dan jenis dengan mudah.', icon: '◈' },
  { title: 'Pencarian praktis', description: 'Gunakan pencarian dan filter untuk mempersempit pilihan.', icon: '⌕' },
  { title: 'Pilihan terpercaya', description: 'Koleksi dari berbagai brand untuk kebutuhan rumah dan proyek.', icon: '✦' },
  { title: 'Dukungan Sales', description: 'Dapatkan bantuan langsung dari tim Sales Jangur.', icon: '↗' }
]
</script>
