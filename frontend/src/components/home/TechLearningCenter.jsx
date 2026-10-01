import { Link } from 'react-router-dom'
import SectionHeader from '@/components/ui/SectionHeader'
import BlogCard from '@/components/blog/BlogCard'
import Button from '@/components/ui/Button'
import { blogs } from '@/data/blogs'
import { FiArrowRight } from 'react-icons/fi'

export default function TechLearningCenter() {
  const featured = blogs.slice(0, 3)
  return (
    <section className="py-20 md:py-24">
      <div className="container-hamar">
        <SectionHeader eyebrow="Tech Learning Center" title="Learn Before You Buy." subtitle="Buying guides, charging tips and honest comparisons — written to help you choose, not just to sell." />
        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {featured.map((b) => (
            <BlogCard key={b.id} blog={b} />
          ))}
        </div>
        <div className="text-center">
          <Link to="/blog">
            <Button variant="outline">Explore Tech Learning Center <FiArrowRight size={15} /></Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
