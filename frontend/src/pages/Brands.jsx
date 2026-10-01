import Breadcrumb from '@/components/ui/Breadcrumb'
import BrandCard from '@/components/brand/BrandCard'
import { brands } from '@/data/brands'

export default function Brands() {
  return (
    <div className="container-hamar py-8">
      <Breadcrumb items={[{ label: 'Brands' }]} />
      <h1 className="font-display text-2xl md:text-3xl font-semibold text-ink mb-2">Our Brands</h1>
      <p className="text-muted text-sm mb-8 max-w-xl">Every brand HAMAR carries is sourced through authorised distribution — no grey-market imports, ever.</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {brands.map((b) => <BrandCard key={b.id} brand={b} />)}
      </div>
    </div>
  )
}
