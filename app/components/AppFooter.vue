<script setup>
import logoUrl from '~/assets/Logojk.svg'

const currentYear = new Date().getFullYear()
const { $api } = useNuxtApp()
const contact = ref({ profile: null, sales: [] })

const loadContact = async () => {
  try {
    const response = await $api.get('/contact')
    contact.value = response.data?.data ?? contact.value
  } catch (error) {
    console.error('ERROR GET CONTACT:', error)
  }
}

onMounted(loadContact)

const whatsappUrl = phone => `https://wa.me/${String(phone || '').replace(/\D/g, '').replace(/^0/, '62')}`
</script>

<template>
  <footer id="kontak" class="bg-slate-950 text-white">
    <div class="mx-auto max-w-7xl px-6 lg:px-8" style="padding-top: 72px; padding-bottom: 88px;">
      <div class="grid grid-cols-1 gap-10 sm:grid-cols-2 md:gap-14">
        <div>
          <div class="flex items-center gap-3">
            <img :src="logoUrl" alt="Logo Jangur Keramik" style="width: 46px; height: 46px; max-width: 46px; max-height: 46px;" class="rounded-xl object-cover">
            <div><h2 class="text-xl font-semibold tracking-tight">{{ contact.profile?.namatoko || 'Jangur Keramik' }}</h2><p class="mt-0.5 text-xs text-slate-500">Gallery & Building Materials</p></div>
          </div>
          <div class="mt-7 flex flex-col gap-3 text-sm text-slate-300">
            <p v-if="contact.profile?.telepon" class="flex gap-5"><span class="w-12 shrink-0 text-slate-500">Tel:</span><span>{{ contact.profile.telepon }}</span></p>
            <p v-if="contact.profile?.email" class="flex gap-5"><span class="w-12 shrink-0 text-slate-500">Email:</span><span class="break-all">{{ contact.profile.email }}</span></p>
            <p v-if="contact.profile?.alamat" class="flex max-w-md gap-5 leading-6"><span class="w-12 shrink-0 text-slate-500">Alamat:</span><span>{{ contact.profile.alamat }}</span></p>
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between"><p class="text-xs font-bold uppercase tracking-[0.18em] text-amber-300">Sales kami</p><span class="text-xs text-slate-500">{{ contact.sales?.length || 0 }} kontak</span></div>
          <div v-if="contact.sales?.length" class="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-1">
            <div v-for="sales in contact.sales" :key="sales.id" class="rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2.5">
              <p class="text-sm font-semibold text-white">{{ sales.nama }}</p>
              <div class="mt-2 flex flex-col gap-1.5 text-xs">
                <a v-if="sales.nohp" :href="whatsappUrl(sales.nohp)" target="_blank" rel="noopener noreferrer" class="flex gap-2 text-slate-400 transition hover:text-amber-300"><span class="w-8 text-slate-500">WA</span><span>{{ sales.nohp }}</span></a>
                <a v-if="sales.email" :href="`mailto:${sales.email}`" class="flex gap-2 truncate text-slate-500 transition hover:text-amber-300"><span class="w-8 shrink-0 text-slate-600">Email</span><span class="truncate">{{ sales.email }}</span></a>
              </div>
            </div>
          </div>
          <p v-else class="mt-5 text-sm text-slate-500">Informasi sales belum tersedia.</p>
        </div>
      </div>

      <div class="mt-12 flex flex-col justify-between gap-3 border-t border-white/10 pt-5 text-xs text-slate-500 sm:flex-row"><span>© {{ currentYear }} Jangur Keramik</span><span>Inspirasi dimulai dari pilihan yang tepat.</span></div>
    </div>
  </footer>
</template>
