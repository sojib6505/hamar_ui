import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'
import { FiCheck, FiX } from 'react-icons/fi'

const ROWS = [
  { label: 'Build Quality', original: 'Reinforced materials, tested joints', fake: 'Brittle plastic, weak seams' },
  { label: 'Safety', original: 'Certified overcurrent & thermal protection', fake: 'No real safety circuitry' },
  { label: 'Charging Speed', original: 'Matches rated wattage consistently', fake: 'Inconsistent, often overstated' },
  { label: 'Durability', original: 'Rated for years of daily use', fake: 'Fails within weeks or months' },
  { label: 'Warranty', original: 'Real manufacturer warranty', fake: 'No valid warranty coverage' },
  { label: 'Performance', original: 'Consistent, predictable output', fake: 'Fluctuates, can damage devices' },
  { label: 'Packaging', original: 'Sealed retail packaging, holograms', fake: 'Generic or copied packaging' },
  { label: 'Long-term Value', original: 'Lower cost per year of use', fake: 'Repeat purchases add up' },
]

export default function OriginalVsFake() {
  const [split, setSplit] = useState(50)
  const trackRef = useRef(null)
  const dragging = useRef(false)

  const updateFromClientX = (clientX) => {
    if (!trackRef.current) return
    const rect = trackRef.current.getBoundingClientRect()
    const pct = ((clientX - rect.left) / rect.width) * 100
    setSplit(Math.min(96, Math.max(4, pct)))
  }

  const onPointerMove = (e) => {
    if (!dragging.current) return
    updateFromClientX(e.clientX ?? e.touches?.[0]?.clientX)
  }
  const startDrag = () => {
    dragging.current = true
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', stopDrag)
  }
  const stopDrag = () => {
    dragging.current = false
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerup', stopDrag)
  }

  return (
    <section className="py-20 md:py-24 bg-surface">
      <div className="container-hamar">
        <SectionHeader
          eyebrow="See the Difference"
          title="Original vs Fake."
          subtitle="Drag the divider to compare what you're really paying for."
        />

        <div
          ref={trackRef}
          className="relative w-full aspect-[16/7] rounded-2xl overflow-hidden select-none border border-line shadow-card mb-10"
        >
          <div className="absolute inset-0 bg-ink flex items-center justify-center">
            <div className="text-center px-6">
              <span className="text-accent font-mono-tech text-xs tracking-widest uppercase">Original</span>
              <p className="font-display text-white text-2xl md:text-3xl font-semibold mt-2">Built to last.</p>
            </div>
          </div>
          <div
            className="absolute inset-0 bg-white flex items-center justify-center"
            style={{ clipPath: `inset(0 0 0 ${split}%)` }}
          >
            <div className="text-center px-6">
              <span className="text-danger font-mono-tech text-xs tracking-widest uppercase">Fake</span>
              <p className="font-display text-ink text-2xl md:text-3xl font-semibold mt-2">Fails you fast.</p>
            </div>
          </div>

          <div
            className="absolute top-0 bottom-0 w-1 bg-accent cursor-ew-resize"
            style={{ left: `${split}%` }}
            onPointerDown={startDrag}
            onTouchStart={(e) => { dragging.current = true; updateFromClientX(e.touches[0].clientX) }}
            onTouchMove={(e) => updateFromClientX(e.touches[0].clientX)}
            onTouchEnd={() => (dragging.current = false)}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -left-4 w-9 h-9 rounded-full bg-accent grid place-items-center shadow-card-hover">
              <div className="flex gap-0.5">
                <span className="w-0.5 h-3 bg-ink rounded-full" />
                <span className="w-0.5 h-3 bg-ink rounded-full" />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-line overflow-hidden bg-white">
          <div className="grid grid-cols-3 bg-ink text-white text-xs font-mono-tech uppercase tracking-wide">
            <div className="px-4 py-3">Criteria</div>
            <div className="px-4 py-3 text-accent">Original</div>
            <div className="px-4 py-3 text-white/60">Fake</div>
          </div>
          {ROWS.map((row, i) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              className={`grid grid-cols-3 text-sm ${i % 2 === 0 ? 'bg-white' : 'bg-surface'}`}
            >
              <div className="px-4 py-3.5 font-medium text-ink">{row.label}</div>
              <div className="px-4 py-3.5 text-ink/80 flex items-start gap-1.5">
                <FiCheck size={14} className="text-success mt-0.5 shrink-0" /> {row.original}
              </div>
              <div className="px-4 py-3.5 text-muted flex items-start gap-1.5">
                <FiX size={14} className="text-danger mt-0.5 shrink-0" /> {row.fake}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
