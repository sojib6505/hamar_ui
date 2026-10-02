// Category service layer
// Connects to GET /api/categories and GET /api/categories/:slug with fallback to local data

import { categories, getCategoryBySlug } from '@/data/categories'
import { API_BASE_URL as API_URL } from '@/config/api'

export async function fetchCategories() {
  try {
    const res = await fetch(`${API_URL}/categories`)
    if (res.ok) {
      const json = await res.json()
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        return json.data
      }
    }
  } catch (err) {
    console.warn('Backend categories fetch failed, using local data fallback:', err.message)
  }
  return categories
}

export async function fetchCategoryBySlug(slug) {
  try {
    const res = await fetch(`${API_URL}/categories/${encodeURIComponent(slug)}`)
    if (res.ok) {
      const json = await res.json()
      if (json.success && json.data) {
        return json.data
      }
    }
  } catch (err) {
    console.warn('Backend category fetch failed, using local data fallback:', err.message)
  }
  return getCategoryBySlug(slug) || null
}
