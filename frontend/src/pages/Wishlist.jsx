import Breadcrumb from '@/components/ui/Breadcrumb'
import EmptyState from '@/components/ui/EmptyState'
import ProductCard from '@/components/product/ProductCard'
import { useWishlist } from '@/context/WishlistContext'
import { FiHeart } from 'react-icons/fi'

export default function Wishlist() {
  const { items } = useWishlist()
  return (
    <div className="container-hamar py-8">
      <Breadcrumb items={[{ label: 'Wishlist' }]} />
      <h1 className="font-display text-2xl md:text-3xl font-semibold text-ink mb-8">Your Wishlist</h1>
      {items.length === 0 ? (
        <EmptyState icon={FiHeart} title="Your wishlist is empty" description="Save products you like so you can find them again easily." actionLabel="Browse Products" actionTo="/shop" />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {items.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  )
}
