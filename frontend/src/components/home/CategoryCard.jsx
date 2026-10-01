
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'

export default function CategoryCard({ category }) {
  return (
    <Link to={`/shop?category=${category.slug}`}>
      <motion.div
        whileHover={{ y: -4 }}
        className="group relative rounded-2xl overflow-hidden h-40 sm:h-48 md:h-52 bg-ink"
      >
        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-55 group-hover:scale-105 transition-all duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h3 className="font-display text-white font-semibold text-sm sm:text-base">
                {category.name}
              </h3>

              <p className="text-white/70 text-[10px] sm:text-xs mt-0.5">
                {category.productCount} products
              </p>
            </div>

            <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-accent grid place-items-center text-ink group-hover:rotate-45 transition-transform duration-300 shrink-0">
              <FiArrowUpRight size={14} />
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

