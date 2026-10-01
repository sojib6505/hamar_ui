// GET /api/reviews, POST /api/reviews
import { reviews, getReviewsByProduct } from '@/data/reviews'
const delay = (ms = 200) => new Promise((r) => setTimeout(r, ms))

export async function fetchReviews() {
  await delay()
  return reviews
}
export async function fetchReviewsByProduct(productName) {
  await delay()
  return getReviewsByProduct(productName)
}
export async function submitReview(payload) {
  await delay(300)
  // Later: POST /api/reviews with payload
  return { success: true, review: { id: `r${Date.now()}`, ...payload } }
}
