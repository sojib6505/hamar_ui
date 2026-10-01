import { createContext, useContext, useEffect, useState } from 'react'
import { useToast } from './ToastContext'

const WishlistContext = createContext(null)
const WISHLIST_STORAGE_KEY = 'hamar_wishlist'

function readWishlist() {
  try {
    const stored = window.localStorage.getItem(WISHLIST_STORAGE_KEY)
    const items = stored ? JSON.parse(stored) : []
    return Array.isArray(items) ? items : []
  } catch {
    return []
  }
}

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(readWishlist)
  const { showToast } = useToast()

  useEffect(() => {
    try {
      window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items))
    } catch {
      // Keep the wishlist usable when browser storage is unavailable.
    }
  }, [items])

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
