import { createContext, useContext, useState } from 'react'
import { useToast } from './ToastContext'

const WishlistContext = createContext(null)

export function WishlistProvider({ children }) {
  const [items, setItems] = useState([])
  const { showToast } = useToast()

  const isWishlisted = (productId) => items.some((p) => p.id === productId)

  const toggleWishlist = (product) => {
    setItems((prev) => {
      const exists = prev.some((p) => p.id === product.id)
      if (exists) {
        showToast?.(`Removed from wishlist`, 'info')
        return prev.filter((p) => p.id !== product.id)
      }
      showToast?.(`Added to wishlist`)
      return [...prev, product]
    })
  }

  const removeFromWishlist = (productId) => setItems((prev) => prev.filter((p) => p.id !== productId))

  return (
    <WishlistContext.Provider value={{ items, isWishlisted, toggleWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => useContext(WishlistContext)
