import SectionHeader from '@/components/ui/SectionHeader'
import CategoryCard from './CategoryCard'
import { categories } from '@/data/categories'

export default function FeaturedCategories() {
  return (
    <section className="py-20 md:py-24">
      <div className="container-hamar">
        <SectionHeader eyebrow="Shop by Category" title="What are you looking for?" subtitle="Eight categories covering everything from daily charging to gaming setups." />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {categories.map((c) => (
            <CategoryCard key={c.id} category={c} />
          ))}
        </div>
      </div>
    </section>
  )
}
