// GET /api/community/channels, GET /api/community/posts, GET /api/gallery
import { communityChannels, communityPosts, galleryItems } from '@/data/community'
const delay = (ms = 200) => new Promise((r) => setTimeout(r, ms))

export async function fetchCommunityChannels() {
  await delay()
  return communityChannels
}
export async function fetchCommunityPosts() {
  await delay()
  return communityPosts
}
export async function fetchGalleryItems() {
  await delay()
  return galleryItems
}
