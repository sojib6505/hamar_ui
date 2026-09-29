import { Link } from 'react-router-dom'
import Breadcrumb from '@/components/ui/Breadcrumb'
import Button from '@/components/ui/Button'
import EmptyState from '@/components/ui/EmptyState'
import ProductCard from '@/components/product/ProductCard'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/utils/format'
import { fetchProducts } from '@/services/productService'
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag, FiHeart } from 'react-icons/fi'
import { useWishlist } from '@/context/WishlistContext'
import { useEffect, useState } from 'react'

export default function Cart() {
  const { items, updateQuantity, removeFromCart, subtotal } = useCart()
  const { toggleWishlist } = useWishlist()
  const [coupon, setCoupon] = useState('')
  const [applied, setApplied] = useState(null)
  const [recommended, setRecommended] = useState([])

  useEffect(() => {
    fetchProducts({ sort: 'featured' }).then((products) => setRecommended(products.slice(0, 4)))
  }, [])

  const delivery = subtotal > 3000 || items.length === 0 ? 0 : 80
  const discount = applied ? Math.round(subtotal * 0.1) : 0
  const total = subtotal + delivery - discount

  const handleApplyCoupon = () => {
    if (coupon.trim().toUpperCase() === 'HAMAR10') setApplied('HAMAR10')
  }

  if (items.length === 0) {
    return (
      <div className="container-hamar py-8">
        <Breadcrumb items={[{ label: 'Cart' }]} />
        <EmptyState icon={FiShoppingBag} title="Your cart is empty" description="Browse the shop and add products you'll love." actionLabel="Start Shopping" actionTo="/shop" />
      </div>
    )
  }

  return (
    <div className="container-hamar py-8">
      <Breadcrumb items={[{ label: 'Cart' }]} />
      <h1 className="font-display text-2xl md:text-3xl font-semibold text-ink mb-8">Your Cart</h1>

      <div className="grid lg:grid-cols-[1fr_360px] gap-10">
        <div className="space-y-4">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex gap-4 border border-line rounded-2xl p-4">
              <Link to={`/product/${product.slug}`} className="w-24 h-24 rounded-xl overflow-hidden bg-surface shrink-0">
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/product/${product.slug}`} className="font-medium text-ink text-sm">{product.name}</Link>
                <p className="text-xs text-muted mt-0.5">{product.brandName}</p>
                <div className="flex items-center gap-2 mt-1 font-mono-tech">
                  <span className="text-sm font-semibold text-ink">{formatPrice(product.price)}</span>
                  {product.oldPrice && <span className="text-xs text-muted line-through">{formatPrice(product.oldPrice)}</span>}
                </div>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center border border-line rounded-full">
                    <button onClick={() => updateQuantity(product.id, quantity - 1)} className="w-7 h-7 grid place-items-center"><FiMinus size={12} /></button>
                    <span className="w-7 text-center text-xs">{quantity}</span>
                    <button onClick={() => updateQuantity(product.id, quantity + 1)} className="w-7 h-7 grid place-items-center"><FiPlus size={12} /></button>
                  </div>
                  <button onClick={() => { toggleWishlist(product); removeFromCart(product.id) }} className="text-muted hover:text-ink transition-colors"><FiHeart size={14} /></button>
                  <button onClick={() => removeFromCart(product.id)} className="text-muted hover:text-danger transition-colors"><FiTrash2 size={14} /></button>
                </div>
              </div>
              <div className="text-sm font-semibold text-ink font-mono-tech shrink-0">{formatPrice(product.price * quantity)}</div>
            </div>
          ))}
        </div>

        <div className="border border-line rounded-2xl p-6 h-fit">
          <h2 className="font-display font-semibold text-lg mb-4">Order Summary</h2>
          <div className="flex gap-2 mb-4">
            <input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Coupon code (try HAMAR10)" className="flex-1 border border-line rounded-full px-3.5 py-2 text-xs outline-none focus:border-ink" />
            <Button size="sm" variant="outline" onClick={handleApplyCoupon}>Apply</Button>
          </div>
          {applied && <p className="text-xs text-success mb-3">Coupon {applied} applied — 10% off</p>}
          <div className="space-y-2.5 text-sm border-t border-line pt-4">
            <div className="flex justify-between text-muted"><span>Subtotal</span><span className="font-mono-tech text-ink">{formatPrice(subtotal)}</span></div>
            <div className="flex justify-between text-muted"><span>Delivery</span><span className="font-mono-tech text-ink">{delivery === 0 ? 'Free' : formatPrice(delivery)}</span></div>
            {applied && <div className="flex justify-between text-success"><span>Discount</span><span className="font-mono-tech">-{formatPrice(discount)}</span></div>}
            <div className="flex justify-between font-semibold text-ink pt-2 border-t border-line"><span>Total</span><span className="font-mono-tech">{formatPrice(total)}</span></div>
          </div>
          <Link to="/checkout"><Button variant="accent" className="w-full mt-5">Proceed to Checkout</Button></Link>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="font-display text-xl font-semibold text-ink mb-5">You Might Also Like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {recommended.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </div>
  )
}
