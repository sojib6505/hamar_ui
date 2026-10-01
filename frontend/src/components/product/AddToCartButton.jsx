import { FiShoppingBag } from 'react-icons/fi'
import { useCart } from '@/context/CartContext'
import Button from '@/components/ui/Button'

export default function AddToCartButton({ product, quantity = 1, full = false, variant = 'primary', size = 'md', label = 'Add to Cart' }) {
  const { addToCart } = useCart()
  return (
    <Button
      variant={variant}
      size={size}
      className={full ? 'w-full' : ''}
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(product, quantity) }}
      disabled={product.stock === 'out-of-stock'}
    >
      <FiShoppingBag size={16} />
      {product.stock === 'out-of-stock' ? 'Out of Stock' : label}
    </Button>
  )
}
