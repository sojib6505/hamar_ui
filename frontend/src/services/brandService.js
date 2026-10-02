// Brand service layer
// Connects to GET /api/brands and GET /api/brands/:slug with fallback to local data

import { brands, getBrandBySlug } from '@/data/brands'
import { API_BASE_URL as API_URL } from '@/config/api'

export async function fetchBrands() {
  try {
    const res = await fetch(`${API_URL}/brands`)
    if (res.ok) {
      const json = await res.json()
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        return json.data
      }
    }
  } catch (err) {
    console.warn('Backend brands fetch failed, using local data fallback:', err.message)
  }
  return brands
}

export async function fetchBrandBySlug(slug) {
  try {
    const res = await fetch(`${API_URL}/brands/${encodeURIComponent(slug)}`)
    if (res.ok) {
      const json = await res.json()
      if (json.success && json.data) {
        return json.data
      }
    }
  } catch (err) {
    console.warn('Backend brand fetch failed, using local data fallback:', err.message)
  }
  return getBrandBySlug(slug) || null
}
