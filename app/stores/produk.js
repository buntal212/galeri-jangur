export const useProdukStore = defineStore('produk', {
  state: () => ({
    items: [],
    filters: {
      brands: [],
      sizes: [],
      grades: [],
      types: []
    },
    loading: false,
    error: null
  }),

  actions: {
    async getFilters() {
      const { $api } = useNuxtApp()

      try {
        const response = await $api.get('/product/filters')
        this.filters = response.data?.data ?? this.filters
      } catch (error) {
        console.error('ERROR GET PRODUCT FILTERS:', error)
      }
    },

    async getProduk() {
        const { $api } = useNuxtApp()

        this.loading = true
        this.error = null

        try {
            const response = await $api.get('/product/get-products')

            this.items = response.data?.data?.data ?? []
        }
        catch (error) {
            this.items = []
            this.error =
            error?.response?.data?.message ||
            error?.message ||
            'Gagal mengambil produk'
        }
        finally {
            this.loading = false
        }
    }
  }
})
