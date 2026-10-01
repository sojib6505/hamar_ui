// Service layer for products.
// Connects to the HAMAR backend REST API endpoints with fallback to local mock data

import { products as localProducts, getProductBySlug as getLocalProductBySlug } from '@/data/products'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api'

// GET /api/products
export async function fetchProducts(filters = {}) {
  try {
    const params = new URLSearchParams()

    if (filters.category) params.append('category', filters.category)
    if (filters.brand && filters.brand.length) {
      const brandVal = Array.isArray(filters.brand) ? filters.brand.join(',') : filters.brand
      params.append('brand', brandVal)
    }
    if (filters.search) params.append('search', filters.search)
    if (filters.sort) params.append('sort', filters.sort)
    if (filters.minPrice != null) params.append('minPrice', filters.minPrice)
    if (filters.maxPrice != null) params.append('maxPrice', filters.maxPrice)
    if (filters.rating) params.append('rating', filters.rating)
    if (filters.usbType) params.append('usbType', filters.usbType)
    if (filters.stock) params.append('stock', filters.stock)

    const res = await fetch(`${API_URL}/products?${params.toString()}`)
    if (res.ok) {
      const json = await res.json()
      if (json.success && json.data) {
        const list = json.data.products || json.data
        if (Array.isArray(list) && list.length > 0) {
          return list
        }
      }
    }
  } catch (err) {
    console.warn('Backend product fetch failed, falling back to local data:', err.message)
  }

  // Graceful local data fallback
  let filtered = [...localProducts]
  if (filters.category) {
    filtered = filtered.filter((p) => p.category === filters.category || p.categoryName?.toLowerCase() === filters.category.toLowerCase())
  }
  if (filters.search) {
    const s = filters.search.toLowerCase()
    filtered = filtered.filter((p) => p.name.toLowerCase().includes(s) || p.brandName?.toLowerCase().includes(s))
  }
  return filtered
}

// GET /api/products/slug/:slug or /api/products/:slug
export async function fetchProductBySlug(slug) {
  try {
    const res = await fetch(`${API_URL}/products/${encodeURIComponent(slug)}`)
    if (res.ok) {
      const json = await res.json()
      if (json.success && json.data) {
        return json.data
      }
    }
  } catch (err) {
    console.warn('Backend product fetch by slug failed:', err.message)
  }

  return getLocalProductBySlug(slug) || null
}

// GET /api/products?category=:slug
export async function fetchProductsByCategory(categorySlug) {
  return fetchProducts({ category: categorySlug })
}

// GET /api/products?brand=:slug
export async function fetchProductsByBrand(brandSlug) {
  return fetchProducts({ brand: [brandSlug] })
}

// GET /api/products/:identifier/related
export async function fetchRelatedProducts(product, limit = 4) {
  try {
    const identifier = product?.slug || product?._id || product?.id
    if (identifier) {
      const res = await fetch(`${API_URL}/products/${encodeURIComponent(identifier)}/related?limit=${limit}`)
      if (res.ok) {
        const json = await res.json()
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          return json.data
        }
      }
    }
  } catch (err) {
    console.warn('Backend related products fetch failed:', err.message)
  }

  if (!product) return []
  return localProducts
    .filter((p) => p.id !== product.id && p.slug !== product.slug && (p.category === product.category || p.brand === product.brand))
    .slice(0, limit)
}

// GET /api/products/bestsellers
export async function fetchBestSellers(limit = 8) {
  try {
    const res = await fetch(`${API_URL}/products/bestsellers?limit=${limit}`)
    if (res.ok) {
      const json = await res.json()
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        return json.data
      }
    }
  } catch (err) {
    console.warn('Backend bestsellers fetch failed:', err.message)
  }
  return fetchProducts({ sort: 'bestselling', limit })
}
