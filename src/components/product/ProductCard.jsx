import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Rating from '@/components/ui/Rating'
import Badge from '@/components/ui/Badge'
import WishlistButton from './WishlistButton'
import CompareButton from './CompareButton'
import AddToCartButton from './AddToCartButton'
import { formatPrice } from '@/utils/format'

export default function ProductCard({ product }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group relative rounded-2xl border border-line bg-white overflow-hidden hover:shadow-card-hover hover:border-ink/20 transition-shadow duration-200"
    >
      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative aspect-square bg-surface overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.discount > 0 && <Badge tone="accent">-{product.discount}%</Badge>}
            {product.badges?.map((b) => (
              <Badge key={b} tone={b === 'New' ? 'success' : 'default'}>{b}</Badge>
            ))}
          </div>
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <WishlistButton product={product} />
            <CompareButton product={product} />
          </div>
          {product.stock === 'out-of-stock' && (
            <div className="absolute inset-0 bg-white/70 grid place-items-center">
              <span className="text-xs font-semibold uppercase tracking-wide text-ink">Out of Stock</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <span className="text-xs text-muted font-medium">{product.brandName}</span>
          <h3 className="font-medium text-ink text-[15px] leading-snug mt-0.5 mb-1.5 line-clamp-2">{product.name}</h3>
          <Rating value={product.rating} reviewCount={product.reviewCount} />
          <div className="flex items-baseline gap-2 mt-2 font-mono-tech">
            <span className="text-[15px] font-semibold text-ink">{formatPrice(product.price)}</span>
            {product.oldPrice && <span className="text-xs text-muted line-through">{formatPrice(product.oldPrice)}</span>}
          </div>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <AddToCartButton product={product} full size="sm" />
      </div>
    </motion.div>
  )
}
