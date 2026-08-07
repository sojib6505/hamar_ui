// GET /api/brands, GET /api/brands/:slug
import { brands, getBrandBySlug } from '@/data/brands'
const delay = (ms = 200) => new Promise((r) => setTimeout(r, ms))

export async function fetchBrands() {
  await delay()
  return brands
}
export async function fetchBrandBySlug(slug) {
  await delay()
  return getBrandBySlug(slug) || null
}
