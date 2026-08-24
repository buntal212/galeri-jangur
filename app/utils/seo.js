export const slugify = value => String(value || '').normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
export const productSlug = product => slugify(product?.slug || product?.namagabung || product?.name || product?.kodebarang || product?.id)
