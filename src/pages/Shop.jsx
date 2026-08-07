import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ProductFilter from '@/components/product/ProductFilter'
import ProductGrid from '@/components/product/ProductGrid'
import Pagination from '@/components/ui/Pagination'
import { fetchProducts } from '@/services/productService'
import { FiFilter, FiX } from 'react-icons/fi'

const PAGE_SIZE = 12
const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Best Rated' },
  { value: 'bestselling', label: 'Best Selling' },
]

export default function Shop() {
  const [searchParams] = useSearchParams()
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || null,
    search: searchParams.get('search') || '',
    sort: searchParams.get('sort') || 'featured',
    brand: [],
    minPrice: null,
    maxPrice: null,
    rating: null,
    stock: null,
  })
  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetchProducts(filters).then((res) => {
      setAllProducts(res)
      setLoading(false)
      setPage(1)
    })
  }, [filters])

  const totalPages = Math.max(1, Math.ceil(allProducts.length / PAGE_SIZE))
  const paginated = useMemo(() => allProducts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE), [allProducts, page])

  return (
    <div className="container-hamar py-8">
      <Breadcrumb items={[{ label: 'Shop' }]} />
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-semibold text-ink">Shop All Products</h1>
          <p className="text-muted text-sm mt-1">{allProducts.length} products found</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setMobileFilterOpen(true)} className="lg:hidden flex items-center gap-1.5 text-sm border border-line rounded-full px-4 py-2">
            <FiFilter size={14} /> Filters
          </button>
          <select
            value={filters.sort}
            onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
            className="text-sm border border-line rounded-full px-4 py-2 outline-none focus:border-ink bg-white"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid lg:grid-cols-[240px_1fr] gap-8">
        <div className="hidden lg:block">
          <ProductFilter filters={filters} onChange={setFilters} />
        </div>

        {mobileFilterOpen && (
          <div className="fixed inset-0 z-[90] lg:hidden">
            <div className="absolute inset-0 bg-ink/50" onClick={() => setMobileFilterOpen(false)} />
            <div className="absolute left-0 top-0 bottom-0 w-full max-w-xs bg-white overflow-y-auto p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold">Filters</h3>
                <button onClick={() => setMobileFilterOpen(false)}><FiX size={20} /></button>
              </div>
              <ProductFilter filters={filters} onChange={setFilters} />
            </div>
          </div>
        )}

        <div>
          <ProductGrid products={paginated} loading={loading} />
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </div>
      </div>
    </div>
  )
}
