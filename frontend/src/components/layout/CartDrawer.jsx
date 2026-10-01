import { Link } from 'react-router-dom'
import Drawer from '@/components/ui/Drawer'
import Button from '@/components/ui/Button'
import EmptyState from '@/components/ui/EmptyState'
import { FiShoppingBag, FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/utils/format'

export default function CartDrawer({ open, onClose }) {
  const { items, updateQuantity, removeFromCart, subtotal } = useCart()

  return (
    <Drawer open={open} onClose={onClose} title={`Your Cart (${items.length})`}>
      {items.length === 0 ? (
        <EmptyState icon={FiShoppingBag} title="Your cart is empty" description="Browse the shop and add products you like." actionLabel="Start Shopping" actionTo="/shop" />
      ) : (
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex gap-3">
                <Link to={`/product/${product.slug}`} onClick={onClose} className="w-16 h-16 rounded-xl overflow-hidden bg-surface shrink-0">
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${product.slug}`} onClick={onClose} className="text-sm font-medium text-ink line-clamp-1">{product.name}</Link>
                  <span className="text-xs text-muted font-mono-tech">{formatPrice(product.price)}</span>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center border border-line rounded-full">
                      <button onClick={() => updateQuantity(product.id, quantity - 1)} className="w-6 h-6 grid place-items-center"><FiMinus size={11} /></button>
                      <span className="w-6 text-center text-xs">{quantity}</span>
                      <button onClick={() => updateQuantity(product.id, quantity + 1)} className="w-6 h-6 grid place-items-center"><FiPlus size={11} /></button>
                    </div>
                    <button onClick={() => removeFromCart(product.id)} className="text-muted hover:text-danger transition-colors">
                      <FiTrash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-5 border-t border-line space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted">Subtotal</span>
              <span className="font-mono-tech font-semibold text-ink">{formatPrice(subtotal)}</span>
            </div>
            <Link to="/cart" onClick={onClose}>
              <Button variant="outline" className="w-full">View Cart</Button>
            </Link>
            <Link to="/checkout" onClick={onClose}>
              <Button variant="accent" className="w-full">Checkout</Button>
            </Link>
          </div>
        </div>
      )}
    </Drawer>
  )
}
