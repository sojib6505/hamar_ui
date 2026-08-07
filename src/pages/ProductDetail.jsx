import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Breadcrumb from '@/components/ui/Breadcrumb'
import Rating from '@/components/ui/Rating'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import ProductGallery from '@/components/product/ProductGallery'
import WishlistButton from '@/components/product/WishlistButton'
import CompareButton from '@/components/product/CompareButton'
import AddToCartButton from '@/components/product/AddToCartButton'
import ProductCard from '@/components/product/ProductCard'
import ReviewCard from '@/components/product/ReviewCard'
import { fetchProductBySlug, fetchRelatedProducts } from '@/services/productService'
import { fetchReviewsByProduct } from '@/services/reviewService'
import { formatPrice } from '@/utils/format'
import { useCart } from '@/context/CartContext'
import { FiMinus, FiPlus, FiTruck, FiShield, FiRefreshCw } from 'react-icons/fi'

const TABS = ['Specifications', 'Features', "What's Included", 'Warranty', 'Delivery', 'Compatibility', 'Reviews', 'Questions']

export default function ProductDetail() {
  const { id: slug } = useParams()
  const [product, setProduct] = useState(null)
  const [related, setRelated] = useState([])
  const [reviews, setReviews] = useState([])
  const [qty, setQty] = useState(1)
  const [tab, setTab] = useState('Specifications')
  const { addToCart } = useCart()

  useEffect(() => {
    setProduct(null)
    fetchProductBySlug(slug).then((p) => {
      setProduct(p)
      if (p) {
        fetchRelatedProducts(p).then(setRelated)
        fetchReviewsByProduct(p.name).then(setReviews)
      }
    })
    window.scrollTo(0, 0)
  }, [slug])

  useEffect(() => {
    if (!product) return
    const seen = JSON.parse(localStorage.getItem('hamar_recently_viewed') || '[]').filter((s) => s !== product.slug)
    localStorage.setItem('hamar_recently_viewed', JSON.stringify([product.slug, ...seen].slice(0, 8)))
  }, [product])

  if (!product) {
    return <div className="container-hamar py-24 text-center text-muted">Loading product…</div>
  }

  return (
    <div className="container-hamar py-8">
      <Breadcrumb items={[{ label: 'Shop', to: '/shop' }, { label: product.name }]} />

      <div className="grid lg:grid-cols-2 gap-10 mb-16">
        <ProductGallery images={product.images} />

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link to={`/brand/${product.brand}`} className="text-sm text-muted hover:text-ink font-medium">{product.brandName}</Link>
            {product.badges?.map((b) => <Badge key={b} tone="accent">{b}</Badge>)}
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-semibold text-ink mb-3">{product.name}</h1>
          <div className="flex items-center gap-3 mb-4">
            <Rating value={product.rating} showValue reviewCount={product.reviewCount} />
            <span className="text-xs text-muted">SKU: {product.slug.toUpperCase()}</span>
          </div>

          <div className="flex items-baseline gap-3 mb-1 font-mono-tech">
            <span className="text-3xl font-semibold text-ink">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <>
                <span className="text-base text-muted line-through">{formatPrice(product.oldPrice)}</span>
                <Badge tone="accent">-{product.discount}%</Badge>
              </>
            )}
          </div>
          <p className={`text-sm mb-6 ${product.stock === 'in-stock' ? 'text-success' : 'text-danger'}`}>
            {product.stock === 'in-stock' ? '● In Stock — ready to ship' : '● Out of Stock'}
          </p>

          <p className="text-ink/70 text-[15px] leading-relaxed mb-6">{product.shortDescription}</p>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border border-line rounded-full">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-10 h-10 grid place-items-center"><FiMinus size={14} /></button>
              <span className="w-10 text-center text-sm font-medium">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="w-10 h-10 grid place-items-center"><FiPlus size={14} /></button>
            </div>
            <WishlistButton product={product} className="w-10 h-10" />
            <CompareButton product={product} className="w-10 h-10" />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <AddToCartButton product={product} quantity={qty} size="lg" />
            <Button
              variant="accent"
              size="lg"
              onClick={() => addToCart(product, qty)}
              disabled={product.stock === 'out-of-stock'}
            >
              Buy Now
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-3 border-t border-line pt-6">
            <div className="flex flex-col items-center text-center gap-1.5">
              <FiTruck size={18} className="text-ink" />
              <span className="text-xs text-muted">Fast Delivery</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1.5">
              <FiShield size={18} className="text-ink" />
              <span className="text-xs text-muted">{product.warranty}</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1.5">
              <FiRefreshCw size={18} className="text-ink" />
              <span className="text-xs text-muted">Easy Returns</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <div className="flex gap-1 overflow-x-auto no-scrollbar border-b border-line mb-6">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                tab === t ? 'border-ink text-ink' : 'border-transparent text-muted hover:text-ink'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === 'Specifications' && (
          <div className="max-w-2xl divide-y divide-line border border-line rounded-2xl overflow-hidden">
            {Object.entries(product.specifications).map(([k, v]) => (
              <div key={k} className="flex justify-between px-5 py-3 text-sm odd:bg-surface">
                <span className="text-muted">{k}</span>
                <span className="text-ink font-medium font-mono-tech">{v}</span>
              </div>
            ))}
          </div>
        )}
        {tab === 'Features' && (
          <ul className="space-y-2 max-w-2xl">
            {product.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-ink/80"><span className="text-accent mt-0.5">●</span> {f}</li>
            ))}
          </ul>
        )}
        {tab === "What's Included" && (
          <ul className="space-y-2 max-w-2xl">
            {product.whatsIncluded.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-ink/80"><span className="text-accent mt-0.5">●</span> {f}</li>
            ))}
          </ul>
        )}
        {tab === 'Warranty' && <p className="text-sm text-ink/80 max-w-2xl leading-relaxed">{product.warranty}. Register your product under HAMAR Club within 15 days of delivery for streamlined claims.</p>}
        {tab === 'Delivery' && <p className="text-sm text-ink/80 max-w-2xl leading-relaxed">{product.deliveryInfo} Cash on Delivery available nationwide.</p>}
        {tab === 'Compatibility' && (
          <ul className="space-y-2 max-w-2xl">
            {product.compatibility.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-ink/80"><span className="text-accent mt-0.5">●</span> {f}</li>
            ))}
          </ul>
        )}
        {tab === 'Reviews' && (
          <div>
            <div className="flex items-center gap-6 mb-6 p-5 rounded-2xl bg-surface max-w-md">
              <span className="font-display text-4xl font-semibold text-ink">{product.rating.toFixed(1)}</span>
              <div>
                <Rating value={product.rating} size={16} />
                <span className="text-xs text-muted">{product.reviewCount} ratings</span>
              </div>
            </div>
            {reviews.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-4 max-w-3xl">
                {reviews.map((r) => <ReviewCard key={r.id} review={r} />)}
              </div>
            ) : (
              <p className="text-sm text-muted">No reviews yet for this product.</p>
            )}
          </div>
        )}
        {tab === 'Questions' && (
          <div className="max-w-2xl space-y-4">
            <div className="border border-line rounded-xl p-4">
              <p className="text-sm font-medium text-ink">Q: Is this compatible with older phone models?</p>
              <p className="text-sm text-muted mt-1">A: Yes, it supports standard USB-C PD devices regardless of brand or release year.</p>
            </div>
            <div className="border border-line rounded-xl p-4">
              <p className="text-sm font-medium text-ink">Q: Does it come with an official warranty card?</p>
              <p className="text-sm text-muted mt-1">A: Yes, every HAMAR order includes the manufacturer's warranty documentation.</p>
            </div>
          </div>
        )}
      </div>

      {related.length > 0 && (
        <div className="mb-16">
          <h2 className="font-display text-2xl font-semibold text-ink mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  )
}
