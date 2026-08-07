import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import { FiArrowRight } from 'react-icons/fi'

export default function Hero() {
  return (
    <section className="relative bg-ink overflow-hidden">
      <div className="absolute inset-0 opacity-[0.07]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
        backgroundSize: '28px 28px',
      }} />
      <div className="container-hamar relative py-24 md:py-36 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-block font-display font-extrabold text-4xl text-accent mb-6">HAMAR</span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.05] mb-5">
            Technology<br /> for Everyone.
          </h1>
          <p className="text-white/60 text-base md:text-lg max-w-md mb-8">
            Trusted technology accessories for everyday life.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/shop">
              <Button variant="accent" size="lg">Shop Now <FiArrowRight size={16} /></Button>
            </Link>
            <Link to="/brands">
              <Button variant="outlineLight" size="lg">Explore Brands</Button>
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative aspect-square rounded-3xl overflow-hidden border border-white/10"
        >
          <img
            src="https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=1000&q=80"
            alt="HAMAR technology accessories"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  )
}
