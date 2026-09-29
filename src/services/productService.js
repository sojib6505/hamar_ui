// Service layer for products.
// Connects to the HAMAR backend REST API endpoints:
//   GET /api/products
//   GET /api/products/slug/:slug
//   GET /api/products/:id/related

const API_URL = import.meta.env.VITE_API_URL || 'https://hamar-backend.onrender.com/api'

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
        if (Array.isArray(list)) {
          return list
        }
      }
    }
  } catch (err) {
    console.warn('Backend product fetch failed:', err.message)
  }

  return []
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
    console.warn('Backend product fetch by slug failed:', err.message)
  }

  return null
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
        if (json.success && Array.isArray(json.data)) {
          return json.data
        }
      }
    }
  } catch (err) {
    console.warn('Backend related products fetch failed:', err.message)
  }

  return []
}

// GET /api/products/bestsellers
export async function fetchBestSellers(limit = 8) {
  return fetchProducts({ sort: 'bestselling', limit })
}
