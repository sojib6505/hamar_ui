import ProductCard from './ProductCard'
import EmptyState from '@/components/ui/EmptyState'
import LoadingState from '@/components/ui/LoadingState'
import { FiSearch } from 'react-icons/fi'

export default function ProductGrid({ products, loading }) {
  if (loading) return <LoadingState />
  if (!products || products.length === 0) {
    return (
      <EmptyState
        icon={FiSearch}
        title="No products found"
        description="Try adjusting your filters or search terms to find what you're looking for."
      />
    )
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )
}
