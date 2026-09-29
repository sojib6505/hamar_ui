// Service layer for products.
// Connects to the HAMAR backend REST API endpoints:
//   GET /api/products
//   GET /api/products/slug/:slug
//   GET /api/products/:id/related
// Falls back to local mock data if the backend is unreachable.

import {
  products as mockProducts,
  getProductBySlug as mockGetProductBySlug,
  getProductsByCategory as mockGetProductsByCategory,
  getProductsByBrand as mockGetProductsByBrand,
  getRelatedProducts as mockGetRelatedProducts,
} from '@/data/products'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Helper for local filter/sort when falling back
function applyLocalFilters(filters = {}) {
  let result = [...mockProducts]

  if (filters.category) result = result.filter((p) => p.category === filters.category)
  if (filters.brand && filters.brand.length) result = result.filter((p) => filters.brand.includes(p.brand))
  if (filters.minPrice != null) result = result.filter((p) => p.price >= filters.minPrice)
  if (filters.maxPrice != null) result = result.filter((p) => p.price <= filters.maxPrice)
  if (filters.search) {
    const q = filters.search.toLowerCase()
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brandName.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    )
  }
  if (filters.rating) result = result.filter((p) => p.rating >= filters.rating)
  if (filters.usbType) result = result.filter((p) => p.usbType === filters.usbType)
  if (filters.stock) result = result.filter((p) => p.stock === filters.stock)

  switch (filters.sort) {
    case 'newest':
      result = [...result].reverse()
      break
    case 'price-asc':
      result = [...result].sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      result = [...result].sort((a, b) => b.price - a.price)
      break
    case 'rating':
      result = [...result].sort((a, b) => b.rating - a.rating)
      break
    case 'bestselling':
      result = [...result].sort((a, b) => b.reviewCount - a.reviewCount)
      break
    default:
      break
  }

  return result
}

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
    console.warn('Backend product fetch failed, falling back to local dataset:', err.message)
  }

  return applyLocalFilters(filters)
}

// GET /api/products/slug/:slug
export async function fetchProductBySlug(slug) {
  try {
    const res = await fetch(`${API_URL}/products/slug/${encodeURIComponent(slug)}`)
    if (res.ok) {
      const json = await res.json()
      if (json.success && json.data) {
        return json.data
      }
    }
  } catch (err) {
    console.warn('Backend product fetch by slug failed, using local fallback:', err.message)
  }

  return mockGetProductBySlug(slug) || null
}

// GET /api/products?category=:slug
export async function fetchProductsByCategory(categorySlug) {
  return fetchProducts({ category: categorySlug })
}

// GET /api/products?brand=:slug
export async function fetchProductsByBrand(brandSlug) {
  return fetchProducts({ brand: [brandSlug] })
}

// GET /api/products/:id/related
export async function fetchRelatedProducts(product, limit = 4) {
  try {
    if (product?._id) {
      const res = await fetch(`${API_URL}/products/${product._id}/related?limit=${limit}`)
      if (res.ok) {
        const json = await res.json()
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          return json.data
        }
      }
    }
  } catch (err) {
    console.warn('Backend related products fetch failed, using local fallback:', err.message)
  }

  return mockGetRelatedProducts(product, limit)
}

// GET /api/products/bestsellers
export async function fetchBestSellers(limit = 8) {
  return fetchProducts({ sort: 'bestselling', limit })
}
