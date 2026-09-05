<script setup>
import logoUrl from '~/assets/Logojk.svg'

const currentYear = new Date().getFullYear()
const { $api } = useNuxtApp()
const { t } = useI18n()
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
            <div><h2 class="text-xl font-semibold tracking-tight">{{ contact.profile?.namatoko || 'Jangur Keramik' }}</h2><p class="mt-0.5 text-xs text-slate-400">{{ t('footer.tagline') }}</p></div>
          </div>
          <div class="mt-7 flex flex-col gap-3 text-sm text-slate-300">
            <p v-if="contact.profile?.telepon" class="flex gap-5"><span class="w-12 shrink-0 text-slate-400">{{ t('footer.phone') }}</span><span>{{ contact.profile.telepon }}</span></p>
            <p v-if="contact.profile?.email" class="flex gap-5"><span class="w-12 shrink-0 text-slate-400">{{ t('footer.email') }}</span><span class="break-all">{{ contact.profile.email }}</span></p>
            <p v-if="contact.profile?.alamat" class="flex max-w-md gap-5 leading-6"><span class="w-12 shrink-0 text-slate-400">{{ t('footer.address') }}</span><span>{{ contact.profile.alamat }}</span></p>
          </div>
          <div class="mt-7">
            <p class="text-xs font-bold uppercase tracking-[0.18em] text-amber-300">{{ t('footer.follow') }}</p>
            <div class="mt-3 flex gap-3">
              <a href="https://www.instagram.com/keramikmurahprobolinggo/" target="_blank" rel="noopener noreferrer" aria-label="Instagram Keramik Murah Probolinggo" class="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2 text-xs font-semibold text-slate-300 transition hover:border-amber-300/50 hover:text-amber-300">
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" /></svg>
                Instagram
              </a>
              <a href="https://www.facebook.com/keramikmurahprobolinggo/?locale=id_ID" target="_blank" rel="noopener noreferrer" aria-label="Facebook Keramik Murah Probolinggo" class="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2 text-xs font-semibold text-slate-300 transition hover:border-amber-300/50 hover:text-amber-300">
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.6 1.6-1.6h1.7V3.8c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1V10H8v3h2.4v8h3.1Z" /></svg>
                Facebook
              </a>
            </div>
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between"><p class="text-xs font-bold uppercase tracking-[0.18em] text-amber-300">{{ t('footer.sales') }}</p><span class="text-xs text-slate-400">{{ t('footer.contacts', { count: contact.sales?.length || 0 }) }}</span></div>
          <div v-if="contact.sales?.length" class="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-1">
            <div v-for="sales in contact.sales" :key="sales.id" class="rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2.5">
              <p class="text-sm font-semibold text-white">{{ sales.nama }}</p>
              <div class="mt-2 flex flex-col gap-1.5 text-xs">
                <a v-if="sales.nohp" :href="whatsappUrl(sales.nohp)" target="_blank" rel="noopener noreferrer" class="-mx-2 inline-flex min-h-11 items-center gap-2 rounded-lg px-2 text-slate-400 transition hover:bg-white/10 hover:text-amber-300"><span class="w-8 text-slate-400">WA</span><span>{{ sales.nohp }}</span></a>
                <a v-if="sales.email" :href="`mailto:${sales.email}`" class="-mx-2 inline-flex min-h-11 items-center gap-2 rounded-lg px-2 text-slate-400 transition hover:bg-white/10 hover:text-amber-300"><span class="w-8 shrink-0 text-slate-400">Email</span><span class="truncate">{{ sales.email }}</span></a>
              </div>
            </div>
          </div>
          <p v-else class="mt-5 text-sm text-slate-400">{{ t('footer.salesUnavailable') }}</p>
        </div>
      </div>

      <div class="mt-12 flex flex-col justify-between gap-3 border-t border-white/10 pt-5 text-xs text-slate-400 sm:flex-row"><span>&copy; {{ currentYear }} Jangur Keramik</span><span>{{ t('footer.inspiration') }}</span></div>
    </div>
  </footer>
</template>
