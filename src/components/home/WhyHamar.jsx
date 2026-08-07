import { motion } from 'framer-motion'
import { FiShield, FiTool, FiCheckCircle, FiPackage } from 'react-icons/fi'
import SectionHeader from '@/components/ui/SectionHeader'

const PILLARS = [
  {
    icon: FiShield,
    title: 'Why Original Matters',
    text: 'Authentic products from authorised channels deliver reliable performance, real manufacturer warranty coverage, better electrical safety, and a longer working lifespan than uncertified alternatives.',
  },
  {
    icon: FiTool,
    title: 'Warranty, Handled Properly',
    text: 'Every product ships with a clear warranty period and a straightforward claim process — no runaround, no disappearing sellers.',
  },
  {
    icon: FiCheckCircle,
    title: 'Quality Testing',
    text: 'Products are selected and checked before they reach the catalogue — HAMAR does not list an accessory it would not use every day.',
  },
  {
    icon: FiPackage,
    title: 'A Proper Unboxing',
    text: 'Sealed retail packaging, protective inner padding, and everything the manufacturer intended in the box — every single time.',
  },
]

export default function WhyHamar() {
  return (
    <section className="py-20 md:py-24 bg-ink">
      <div className="container-hamar">
        <SectionHeader
          eyebrow="Why HAMAR"
          title="Trust, built into every order."
          subtitle="This is not marketing copy — it's the operating standard behind every product HAMAR sells."
        />
        <div className="grid md:grid-cols-2 gap-5">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="flex gap-4 p-6 rounded-2xl border border-white/10 hover:border-accent/50 transition-colors duration-200"
            >
              <div className="w-11 h-11 rounded-full bg-accent text-ink grid place-items-center shrink-0">
                <p.icon size={18} />
              </div>
              <div>
                <h3 className="font-display font-semibold text-white text-lg mb-1.5">{p.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{p.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
