import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'

export default function CategoryCard({ category }) {
  return (
    <Link to={`/shop?category=${category.slug}`}>
      <motion.div whileHover={{ y: -4 }} className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-ink">
        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-55 group-hover:scale-105 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-white font-semibold text-lg">{category.name}</h3>
              <p className="text-white/70 text-xs mt-0.5">{category.productCount} products</p>
            </div>
            <span className="w-9 h-9 rounded-full bg-accent grid place-items-center text-ink group-hover:rotate-45 transition-transform duration-300 shrink-0">
              <FiArrowUpRight size={16} />
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
