import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ProductCard from '@/components/product/ProductCard'
import BlogCard from '@/components/blog/BlogCard'
import { fetchBrandBySlug } from '@/services/brandService'
import { fetchProductsByBrand } from '@/services/productService'
import { blogs } from '@/data/blogs'

export default function BrandDetail() {
  const { slug } = useParams()
  const [brand, setBrand] = useState(null)
  const [productsList, setProductsList] = useState([])

  useEffect(() => {
    fetchBrandBySlug(slug).then(setBrand)
    fetchProductsByBrand(slug).then(setProductsList)
    window.scrollTo(0, 0)
  }, [slug])

  if (!brand) return <div className="container-hamar py-24 text-center text-muted">Loading brand…</div>

  const bestSellers = [...productsList].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 4)
  const relatedArticles = blogs.slice(0, 2)

  return (
    <div>
      <section className="relative bg-ink py-20">
        <div className="absolute inset-0">
          <img src={brand.heroImage} alt={brand.name} className="w-full h-full object-cover opacity-25" />
        </div>
        <div className="container-hamar relative">
          <Breadcrumb items={[{ label: 'Brands', to: '/brands' }, { label: brand.name }]} />
          <span className="text-4xl">{brand.logo}</span>
          <h1 className="font-display text-4xl font-bold text-white mt-3">{brand.name}</h1>
          <p className="text-accent text-sm mt-1">{brand.tagline}</p>
          <p className="text-white/60 text-[15px] max-w-xl mt-4 leading-relaxed">{brand.description}</p>
        </div>
      </section>

      <div className="container-hamar py-14 space-y-14">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="font-display text-xl font-semibold text-ink mb-3">Brand History</h2>
            <p className="text-ink/70 text-sm leading-relaxed">{brand.history}</p>
            <div className="flex gap-6 mt-4 text-sm text-muted">
              <span>Est. {brand.established}</span>
              <span>{brand.country}</span>
            </div>
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-ink mb-3">Why Choose {brand.name}</h2>
            <ul className="space-y-2">
              {brand.whyChoose.map((w) => (
                <li key={w} className="flex items-start gap-2 text-sm text-ink/80"><span className="text-accent mt-0.5">●</span> {w}</li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h2 className="font-display text-xl font-semibold text-ink mb-3">Technology</h2>
          <div className="flex flex-wrap gap-2">
            {brand.technology.map((t) => (
              <span key={t} className="text-xs font-mono-tech px-3 py-1.5 rounded-full border border-line text-ink/70">{t}</span>
            ))}
          </div>
        </div>

        {bestSellers.length > 0 && (
          <div>
            <h2 className="font-display text-xl font-semibold text-ink mb-5">Popular {brand.name} Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {bestSellers.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}

        <div>
          <h2 className="font-display text-xl font-semibold text-ink mb-5">Related Articles</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {relatedArticles.map((b) => <BlogCard key={b.id} blog={b} />)}
          </div>
        </div>
      </div>
    </div>
  )
}
