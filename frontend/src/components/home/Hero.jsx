
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import { FiArrowRight } from 'react-icons/fi'

export default function Hero() {
  return (
    <section className="relative bg-ink overflow-hidden">
      {/* Mobile background image */}
      <div className="absolute inset-0 md:hidden">
        <img
          src="/images/hamar-hero-tech.png"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/75" />
      </div>

      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="container-hamar relative py-16 md:py-16 grid md:grid-cols-2 gap-10 md:gap-12 items-center">
        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block font-display font-extrabold text-4xl text-accent mb-6">
            HAMAR
          </span>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.05] mb-5">
            Technology
            <br /> for Everyone.
          </h1>

          <p className="text-white/60 text-base md:text-lg max-w-md mb-8">
            Trusted technology accessories for everyday life.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link to="/shop">
              <Button variant="accent" size="lg">
                Shop Now <FiArrowRight size={16} />
              </Button>
            </Link>

            <Link to="/brands">
              <Button variant="outlineLight" size="lg">
                Explore Brands
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Desktop Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 hidden md:block"
        >
          <img
            src="/images/hamar-hero-tech.png"
            alt="HAMAR technology accessories"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  )
}

