const slug = value => String(value || '')
  .normalize('NFKD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')

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
    .map(item =>
      slug(
        item.namagabung ||
        item.name ||
        item.kodebarang ||
        item.id
      )
    )
    .filter(Boolean)
    .map(productSlug => `${siteUrl}/produk/${productSlug}`)

  const urls = [`${siteUrl}/`, ...productUrls]
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