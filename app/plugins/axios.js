import axios from 'axios'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const api = axios.create({
    baseURL: config.public.apiBase,
    headers: {
      Accept: 'application/json'
    }
  })

  api.interceptors.request.use((request) => {
    if (import.meta.client) {
      const token = localStorage.getItem('jangur_sales_token')

      if (token) {
        request.headers.Authorization = `Bearer ${token}`
      }
    }

    return request
  })

  return {
    provide: {
      api
    }
  }
})
