import { Link } from 'react-router-dom'
import Breadcrumb from '@/components/ui/Breadcrumb'
import EmptyState from '@/components/ui/EmptyState'
import Rating from '@/components/ui/Rating'
import { useCompare } from '@/context/CompareContext'
import { formatPrice } from '@/utils/format'
import { FiBarChart2, FiX } from 'react-icons/fi'

const ROWS = [
  { key: 'price', label: 'Price', render: (p) => formatPrice(p.price) },
  { key: 'brandName', label: 'Brand', render: (p) => p.brandName },
  { key: 'chargingSpeed', label: 'Charging Speed', render: (p) => p.chargingSpeed },
  { key: 'usbType', label: 'Port / Connector', render: (p) => p.usbType },
  { key: 'compatibility', label: 'Compatibility', render: (p) => p.compatibility.join(', ') },
  { key: 'warranty', label: 'Warranty', render: (p) => p.warranty },
  { key: 'rating', label: 'Rating', render: (p) => <Rating value={p.rating} showValue /> },
  { key: 'features', label: 'Features', render: (p) => (
    <ul className="space-y-1">{p.features.slice(0, 3).map((f) => <li key={f}>• {f}</li>)}</ul>
  ) },
]

export default function Compare() {
  const { items, removeFromCompare } = useCompare()

  if (items.length === 0) {
    return (
      <div className="container-hamar py-8">
        <Breadcrumb items={[{ label: 'Compare' }]} />
        <EmptyState icon={FiBarChart2} title="No products to compare" description="Add up to 4 products from the shop to compare them side-by-side." actionLabel="Browse Products" actionTo="/shop" />
      </div>
    )
  }

  return (
    <div className="container-hamar py-8">
      <Breadcrumb items={[{ label: 'Compare' }]} />
      <h1 className="font-display text-2xl md:text-3xl font-semibold text-ink mb-8">Compare Products</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[640px]">
          <thead>
            <tr>
              <th className="text-left p-3 w-40" />
              {items.map((p) => (
                <th key={p.id} className="p-3 text-left align-top w-56">
                  <div className="relative border border-line rounded-2xl p-3">
                    <button onClick={() => removeFromCompare(p.id)} className="absolute top-2 right-2 w-6 h-6 grid place-items-center rounded-full bg-surface"><FiX size={12} /></button>
                    <div className="aspect-square rounded-xl overflow-hidden bg-surface mb-2">
                      <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <Link to={`/product/${p.slug}`} className="text-sm font-medium text-ink line-clamp-2">{p.name}</Link>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, i) => (
              <tr key={row.key} className={i % 2 === 0 ? 'bg-surface' : 'bg-white'}>
                <td className="p-3 text-sm font-medium text-ink align-top">{row.label}</td>
                {items.map((p) => (
                  <td key={p.id} className="p-3 text-sm text-ink/80 align-top">{row.render(p)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
