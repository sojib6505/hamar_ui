import { useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import { categories } from '@/data/categories'
import { brands } from '@/data/brands'
import { formatPrice } from '@/utils/format'

function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-line py-5">
      <button onClick={() => setOpen((o) => !o)} className="flex items-center justify-between w-full mb-1">
        <span className="font-medium text-sm text-ink">{title}</span>
        <FiChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="pt-3 space-y-2.5">{children}</div>}
    </div>
  )
}

export default function ProductFilter({ filters, onChange }) {
  const toggleBrand = (slug) => {
    const current = filters.brand || []
    onChange({ ...filters, brand: current.includes(slug) ? current.filter((b) => b !== slug) : [...current, slug] })
  }

  return (
    <aside className="w-full">
      <FilterSection title="Category">
        <div className="space-y-2">
          {categories.map((c) => (
            <label key={c.id} className="flex items-center gap-2.5 text-sm text-ink/80 cursor-pointer">
              <input
                type="radio"
                name="category"
                checked={filters.category === c.slug}
                onChange={() => onChange({ ...filters, category: c.slug })}
                className="accent-accent"
              />
              {c.name}
            </label>
          ))}
          {filters.category && (
            <button onClick={() => onChange({ ...filters, category: null })} className="text-xs text-muted underline underline-offset-2">
              Clear category
            </button>
          )}
        </div>
      </FilterSection>

      <FilterSection title="Brand">
        <div className="space-y-2">
          {brands.map((b) => (
            <label key={b.id} className="flex items-center gap-2.5 text-sm text-ink/80 cursor-pointer">
              <input
                type="checkbox"
                checked={(filters.brand || []).includes(b.slug)}
                onChange={() => toggleBrand(b.slug)}
                className="accent-accent"
              />
              {b.name}
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Price Range">
        <div className="flex items-center gap-2 text-sm">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice || ''}
            onChange={(e) => onChange({ ...filters, minPrice: e.target.value ? Number(e.target.value) : null })}
            className="w-full border border-line rounded-lg px-2.5 py-1.5 focus:border-ink outline-none"
          />
          <span className="text-muted">–</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice || ''}
            onChange={(e) => onChange({ ...filters, maxPrice: e.target.value ? Number(e.target.value) : null })}
            className="w-full border border-line rounded-lg px-2.5 py-1.5 focus:border-ink outline-none"
          />
        </div>
      </FilterSection>

      <FilterSection title="Rating">
        <div className="space-y-2">
          {[4, 3, 2].map((r) => (
            <label key={r} className="flex items-center gap-2.5 text-sm text-ink/80 cursor-pointer">
              <input
                type="radio"
                name="rating"
                checked={filters.rating === r}
                onChange={() => onChange({ ...filters, rating: r })}
                className="accent-accent"
              />
              {r}★ & above
            </label>
          ))}
          {filters.rating && (
            <button onClick={() => onChange({ ...filters, rating: null })} className="text-xs text-muted underline underline-offset-2">
              Clear rating
            </button>
          )}
        </div>
      </FilterSection>

      <FilterSection title="Stock">
        <label className="flex items-center gap-2.5 text-sm text-ink/80 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.stock === 'in-stock'}
            onChange={(e) => onChange({ ...filters, stock: e.target.checked ? 'in-stock' : null })}
            className="accent-accent"
          />
          In stock only
        </label>
      </FilterSection>
    </aside>
  )
}
