import { FiStar } from 'react-icons/fi'

export default function Rating({ value = 0, reviewCount, size = 14, showValue = false }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <FiStar
            key={i}
            size={size}
            className={i <= Math.round(value) ? 'fill-accent text-accent' : 'fill-transparent text-line'}
          />
        ))}
      </div>
      {showValue && <span className="text-sm font-medium text-ink">{value.toFixed(1)}</span>}
      {reviewCount != null && <span className="text-xs text-muted">({reviewCount})</span>}
    </div>
  )
}
