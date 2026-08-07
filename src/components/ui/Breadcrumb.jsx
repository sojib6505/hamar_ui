import { Link } from 'react-router-dom'
import { FiChevronRight } from 'react-icons/fi'

export default function Breadcrumb({ items }) {
  return (
    <nav className="flex items-center flex-wrap gap-1.5 text-xs text-muted mb-6">
      <Link to="/" className="hover:text-ink transition-colors">Home</Link>
      {items.map((item, idx) => (
        <span key={idx} className="flex items-center gap-1.5">
          <FiChevronRight size={12} />
          {item.to ? (
            <Link to={item.to} className="hover:text-ink transition-colors">{item.label}</Link>
          ) : (
            <span className="text-ink font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
