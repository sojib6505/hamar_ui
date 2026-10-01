import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useToast } from './ToastContext'

const CartContext = createContext(null)
const CART_STORAGE_KEY = 'hamar_cart'

function readCart() {
  try {
    const stored = window.localStorage.getItem(CART_STORAGE_KEY)
    const items = stored ? JSON.parse(stored) : []
    return Array.isArray(items) ? items : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readCart) // { product, quantity }
  const { showToast } = useToast()

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    } catch {
      // Keep the cart usable when browser storage is unavailable.
    }
  }, [items])

  const addToCart = (product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id)
      if (existing) {
        return prev.map((i) => (i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i))
      }
      return [...prev, { product, quantity }]
    })
    showToast?.(`${product.name} added to cart`)
  }

  const removeFromCart = (productId) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return
    setItems((prev) => prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i)))
  }

  const clearCart = () => setItems([])

  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.product.price * i.quantity, 0), [items])
  const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items])

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, subtotal, itemCount }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
