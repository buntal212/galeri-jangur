export const useAppStore = defineStore('app', {
  state: () => ({
    nama: 'Galeri Jangur',
    salesLogin: false
  }),

  actions: {
    loginSales() {
      this.salesLogin = true
    },

    logoutSales() {
      this.salesLogin = false
    }
  }
})