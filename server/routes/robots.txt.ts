export default defineEventHandler(event => {
  const config = useRuntimeConfig(event)
  const siteUrl = String(config.public.siteUrl || 'https://jangur-keramik.my.id').replace(/\/+$/, '')
  setResponseHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return `User-agent: *\nAllow: /\nDisallow: /login\nDisallow: /admin\n\nSitemap: ${siteUrl}/sitemap.xml\n`
})
