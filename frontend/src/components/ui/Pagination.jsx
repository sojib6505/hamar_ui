import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="w-9 h-9 grid place-items-center rounded-full border border-line disabled:opacity-40 hover:border-ink transition-colors"
      >
        <FiChevronLeft size={16} />
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`w-9 h-9 grid place-items-center rounded-full text-sm font-medium transition-colors ${
            p === page ? 'bg-ink text-white' : 'border border-line hover:border-ink'
          }`}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="w-9 h-9 grid place-items-center rounded-full border border-line disabled:opacity-40 hover:border-ink transition-colors"
      >
        <FiChevronRight size={16} />
      </button>
    </div>
  )
}
