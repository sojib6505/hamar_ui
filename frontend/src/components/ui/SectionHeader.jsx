import { motion } from 'framer-motion'

export default function SectionHeader({ eyebrow, title, subtitle, align = 'left', action }) {
  return (
    <div className={`flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 ${align === 'center' ? 'text-center md:text-center items-center' : ''}`}>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        className={align === 'center' ? 'mx-auto max-w-2xl' : 'max-w-2xl'}
      >
        {eyebrow && (
          <span className="inline-block text-xs font-mono-tech uppercase tracking-[0.14em] text-muted mb-3">
            {eyebrow}
          </span>
        )}
        <h2 className="font-display text-3xl md:text-[2.4rem] font-semibold text-ink leading-[1.1]">{title}</h2>
        {subtitle && <p className="text-muted mt-3 text-[15px] leading-relaxed">{subtitle}</p>}
      </motion.div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
