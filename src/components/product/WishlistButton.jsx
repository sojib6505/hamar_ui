import { FiHeart } from 'react-icons/fi'
import { useWishlist } from '@/context/WishlistContext'

export default function WishlistButton({ product, className = '' }) {
  const { isWishlisted, toggleWishlist } = useWishlist()
  const active = isWishlisted(product.id)
  return (
    <button
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product) }}
      aria-label="Toggle wishlist"
      className={`w-9 h-9 grid place-items-center rounded-full bg-white/95 border border-line hover:border-ink transition-colors ${className}`}
    >
      <FiHeart size={15} className={active ? 'fill-danger text-danger' : 'text-ink'} />
    </button>
  )
}
