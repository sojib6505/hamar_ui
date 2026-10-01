import { createContext, useContext, useState } from 'react'
import { useToast } from './ToastContext'

const CompareContext = createContext(null)
const MAX_COMPARE = 4

export function CompareProvider({ children }) {
  const [items, setItems] = useState([])
  const { showToast } = useToast()

  const isComparing = (productId) => items.some((p) => p.id === productId)

  const toggleCompare = (product) => {
    setItems((prev) => {
      const exists = prev.some((p) => p.id === product.id)
      if (exists) return prev.filter((p) => p.id !== product.id)
      if (prev.length >= MAX_COMPARE) {
        showToast?.(`You can compare up to ${MAX_COMPARE} products`, 'info')
        return prev
      }
      return [...prev, product]
    })
  }

  const removeFromCompare = (productId) => setItems((prev) => prev.filter((p) => p.id !== productId))
  const clearCompare = () => setItems([])

  return (
    <CompareContext.Provider value={{ items, isComparing, toggleCompare, removeFromCompare, clearCompare, MAX_COMPARE }}>
      {children}
    </CompareContext.Provider>
  )
}

export const useCompare = () => useContext(CompareContext)
