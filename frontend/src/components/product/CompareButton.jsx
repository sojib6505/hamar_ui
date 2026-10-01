import { FiBarChart2 } from 'react-icons/fi'
import { useCompare } from '@/context/CompareContext'

export default function CompareButton({ product, className = '' }) {
  const { isComparing, toggleCompare } = useCompare()
  const active = isComparing(product.id)
  return (
    <button
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleCompare(product) }}
      aria-label="Toggle compare"
      className={`w-9 h-9 grid place-items-center rounded-full bg-white/95 border border-line hover:border-ink transition-colors ${className}`}
    >
      <FiBarChart2 size={15} className={active ? 'text-accent-ink' : 'text-ink'} style={active ? { color: '#0B0B0C' } : {}} />
      {active && <span className="sr-only">Added to compare</span>}
    </button>
  )
}
