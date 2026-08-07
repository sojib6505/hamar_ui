import SectionHeader from '@/components/ui/SectionHeader'
import BrandCard from '@/components/brand/BrandCard'
import { brands } from '@/data/brands'

export default function FeaturedBrands() {
  return (
    <section className="py-20 md:py-24 bg-surface">
      <div className="container-hamar">
        <SectionHeader eyebrow="Trusted Names" title="Brands We Carry" subtitle="Every brand on HAMAR is sourced through authorised channels — no grey-market imports." />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {brands.map((b) => (
            <BrandCard key={b.id} brand={b} />
          ))}
        </div>
      </div>
    </section>
  )
}
