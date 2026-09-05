const xmlEscape = value => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&apos;')

export default defineEventHandler(async event => {
  const config = useRuntimeConfig(event)

  const siteUrl = String(config.public.siteUrl || '').replace(/\/+$/, '')
  const apiBase = String(config.public.apiBase || '').replace(/\/+$/, '')

  const products = []

  try {
    // Ambil page pertama sekaligus metadata pagination
    const firstResponse = await $fetch(
      `${apiBase}/product/get-products`,
      {
        query: {
          page: 1,
          per_page: 100,
        },
      }
    )

    const firstPage = firstResponse?.data

    if (Array.isArray(firstPage?.data)) {
      products.push(...firstPage.data)
    }

    const lastPage = Number(firstPage?.last_page || 1)

    // Ambil halaman berikutnya
    for (let page = 2; page <= lastPage; page++) {
      const response = await $fetch(
        `${apiBase}/product/get-products`,
        {
          query: {
            page,
            per_page: 100,
          },
        }
      )

      const pageProducts = response?.data?.data || []

      if (Array.isArray(pageProducts)) {
        products.push(...pageProducts)
      }
    }
  } catch (error) {
    console.error('Failed generating sitemap products:', error)
  }

  const productUrls = products
    .map(item => item.slug)
    .filter(Boolean)
    .flatMap(productSlug => [`${siteUrl}/produk/${productSlug}`, `${siteUrl}/en/products/${productSlug}`])

  const urls = [
    `${siteUrl}/`, `${siteUrl}/en`,
    `${siteUrl}/tentang`, `${siteUrl}/en/about`,
    `${siteUrl}/kontak`, `${siteUrl}/en/contact`,
    ...productUrls
  ]
    .filter(Boolean)
    .filter((url, index, all) => all.indexOf(url) === index)

  setResponseHeader(
    event,
    'content-type',
    'application/xml; charset=utf-8'
  )

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(url => `  <url><loc>${xmlEscape(url)}</loc></url>`)
  .join('\n')}
</urlset>`
})
