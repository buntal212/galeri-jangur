export const useProdukStore = defineStore('produk', {
  state: () => ({
    items: [],
    currentPage: 1,
    lastPage: 1,
    perPage: 24,
    total: 0,
    search: '',
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

    async getProduk(params = {}) {
        const { $api } = useNuxtApp()

        this.loading = true
        this.error = null

        try {
            const page = params.page ?? this.currentPage
            const perPage = params.perPage ?? this.perPage
            const search = params.search ?? this.search
            const response = await $api.get('/product/get-products', { params: { page, per_page: perPage, search: search || undefined } })
            const raw = typeof response.data === 'string' ? JSON.parse(response.data.replace(/^\uFEFF/, '')) : response.data
            const paginator = raw?.data || {}
            this.items = Array.isArray(paginator.data) ? paginator.data : []
            this.currentPage = Number(paginator.current_page) || page
            this.lastPage = Number(paginator.last_page) || 1
            this.perPage = Number(paginator.per_page) || perPage
            this.total = Number(paginator.total) || this.items.length
            this.search = search
        }
        catch (error) {
            this.items = []
            this.total = 0
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
