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
            console.log('MULAI GET PRODUK')

            const response = await $api.get('/product/get-products')

            console.log('RESPONSE PRODUK:', response.data)
            console.log('TYPE:', typeof response.data)
            console.log('IS ARRAY:', Array.isArray(response.data))

            this.items = response.data?.data?.data ?? []
        }
        catch (error) {
            console.error('ERROR GET PRODUK:', error)
            console.error('ERROR RESPONSE:', error?.response?.data)

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
