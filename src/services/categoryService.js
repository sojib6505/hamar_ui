// GET /api/categories, GET /api/categories/:slug
import { categories, getCategoryBySlug } from '@/data/categories'
const delay = (ms = 200) => new Promise((r) => setTimeout(r, ms))

export async function fetchCategories() {
  await delay()
  return categories
}
export async function fetchCategoryBySlug(slug) {
  await delay()
  return getCategoryBySlug(slug) || null
}
