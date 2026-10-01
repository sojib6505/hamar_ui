import SectionHeader from '@/components/ui/SectionHeader'
import BrandCard from '@/components/brand/BrandCard'
import { brands } from '@/data/brands'

export default function FeaturedBrands() {
  return (
    <section className="py-14 md:py-20 bg-surface">
      <div className="container-hamar">
        <SectionHeader
          eyebrow="Trusted Names"
          title="Brands We Carry"
          subtitle="Every brand on HAMAR is sourced through authorised channels — no grey-market imports."
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 max-w-5xl mx-auto">
          {brands.map((b) => (
            <BrandCard key={b.id} brand={b} />
          ))}
        </div>
      </div>
    </section>
  )
}