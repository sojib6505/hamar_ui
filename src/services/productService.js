// Service layer for products.
// Every function currently reads from local mock data and resolves as a Promise,
// so the calling code already behaves like it's awaiting a real network call.
// To connect the MERN backend later, replace each function body with a fetch()
// call to the matching endpoint below — the function signatures should not need to change.

import {
  products,
  getProductBySlug,
  getProductsByCategory,
  getProductsByBrand,
  getRelatedProducts,
} from '@/data/products'

const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms))

// GET /api/products
export async function fetchProducts(filters = {}) {
  await delay()
  let result = [...products]

  if (filters.category) result = result.filter((p) => p.category === filters.category)
  if (filters.brand) result = result.filter((p) => filters.brand.includes(p.brand))
  if (filters.minPrice != null) result = result.filter((p) => p.price >= filters.minPrice)
  if (filters.maxPrice != null) result = result.filter((p) => p.price <= filters.maxPrice)
  if (filters.search) {
    const q = filters.search.toLowerCase()
    result = result.filter(
      (p) => p.name.toLowerCase().includes(q) || p.brandName.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
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

// GET /api/products/:slug
export async function fetchProductBySlug(slug) {
  await delay()
  return getProductBySlug(slug) || null
}

// GET /api/products?category=:slug
export async function fetchProductsByCategory(categorySlug) {
  await delay()
  return getProductsByCategory(categorySlug)
}

// GET /api/products?brand=:slug
export async function fetchProductsByBrand(brandSlug) {
  await delay()
  return getProductsByBrand(brandSlug)
}

// GET /api/products/:id/related
export async function fetchRelatedProducts(product, limit = 4) {
  await delay(150)
  return getRelatedProducts(product, limit)
}

// GET /api/products/bestsellers
export async function fetchBestSellers(limit = 8) {
  await delay()
  return [...products].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, limit)
}
