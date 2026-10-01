import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SectionHeader from '@/components/ui/SectionHeader'
import ProductCard from '@/components/product/ProductCard'
import Button from '@/components/ui/Button'
import { fetchProducts } from '@/services/productService'
import { FiArrowRight } from 'react-icons/fi'

export default function BestSellers() {
  const [bestSellers, setBestSellers] = useState([])

  useEffect(() => {
    fetchProducts({ sort: 'bestselling' }).then((products) => setBestSellers(products.slice(0, 8)))
  }, [])

  return (
    <section className="py-20 md:py-24">
      <div className="container-hamar">
        <SectionHeader
          eyebrow="Customer Favourites"
          title="Best Sellers"
          subtitle="The products HAMAR customers reorder the most."
          action={
            <Link to="/shop?sort=bestselling">
              <Button variant="outline">View All <FiArrowRight size={15} /></Button>
            </Link>
          }
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {bestSellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
