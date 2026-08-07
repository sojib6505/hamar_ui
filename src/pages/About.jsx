import Breadcrumb from '@/components/ui/Breadcrumb'
import { motion } from 'framer-motion'

const SECTIONS = [
  {
    title: 'Brand Story',
    text: 'HAMAR started with a simple frustration: too many "original" accessories sold locally weren\u2019t original at all. We set out to build a source customers could trust completely — every charger, cable and earbud verified before it reaches a cart.',
  },
  {
    title: 'Vision',
    text: 'A future where every household has reliable, original technology accessories — without needing to gamble on a listing photo or a seller\u2019s promise.',
  },
  {
    title: 'Mission',
    text: 'Make trusted technology accessible to everyone, backed by real warranty support and a community that helps you choose well.',
  },
  {
    title: 'The Journey',
    text: 'From a small curated catalogue to a growing ecosystem — HAMAR Store, HAMAR Club, HAMAR Community and HAMAR Rewards all build toward one goal: long-term trust, not one-time sales.',
  },
  {
    title: 'Quality Promise',
    text: 'Every product is sourced through authorised channels, checked before listing, and backed by a warranty HAMAR actually honours.',
  },
  {
    title: 'What\u2019s Next',
    text: 'HAMAR Originals — our own line of technology accessories, engineered with everything we\u2019ve learned from serving this community.',
  },
]

export default function About() {
  return (
    <div>
      <section className="bg-ink py-20">
        <div className="container-hamar">
          <Breadcrumb items={[{ label: 'About' }]} />
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white max-w-xl">Technology for Everyone, done properly.</h1>
          <p className="text-white/60 text-[15px] max-w-lg mt-4">HAMAR exists so you never have to wonder if what you bought is real.</p>
        </div>
      </section>
      <div className="container-hamar py-16 space-y-14 max-w-3xl">
        {SECTIONS.map((s, i) => (
          <motion.div key={s.title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}>
            <span className="text-xs font-mono-tech uppercase tracking-wide text-muted">{String(i + 1).padStart(2, '0')}</span>
            <h2 className="font-display text-2xl font-semibold text-ink mt-1 mb-3">{s.title}</h2>
            <p className="text-ink/70 leading-relaxed">{s.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
