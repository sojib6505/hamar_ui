// GET /api/blogs, GET /api/blogs/:slug
import { blogs, blogCategories, getBlogBySlug, getFeaturedBlogs, getRelatedBlogs } from '@/data/blogs'
const delay = (ms = 200) => new Promise((r) => setTimeout(r, ms))

export async function fetchBlogs(filters = {}) {
  await delay()
  let result = [...blogs]
  if (filters.category && filters.category !== 'All') result = result.filter((b) => b.category === filters.category)
  if (filters.search) {
    const q = filters.search.toLowerCase()
    result = result.filter((b) => b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q))
  }
  return result
}
export async function fetchBlogCategories() {
  await delay(100)
  return blogCategories
}
export async function fetchBlogBySlug(slug) {
  await delay()
  return getBlogBySlug(slug) || null
}
export async function fetchFeaturedBlogs() {
  await delay()
  return getFeaturedBlogs()
}
export async function fetchRelatedBlogs(blog, limit = 3) {
  await delay(150)
  return getRelatedBlogs(blog, limit)
}
