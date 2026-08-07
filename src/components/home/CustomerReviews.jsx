import SectionHeader from '@/components/ui/SectionHeader'
import ReviewCard from '@/components/product/ReviewCard'
import { reviews } from '@/data/reviews'

export default function CustomerReviews() {
  const featured = reviews.slice(0, 6)
  return (
    <section className="py-20 md:py-24 bg-surface">
      <div className="container-hamar">
        <SectionHeader eyebrow="Real Customers" title="What HAMAR Customers Say" subtitle="Verified reviews from people who bought and actually used these products." />
        <div className="grid md:grid-cols-3 gap-5">
          {featured.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
      </div>
    </section>
  )
}
