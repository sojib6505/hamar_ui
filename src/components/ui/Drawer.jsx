import { AnimatePresence, motion } from 'framer-motion'
import { FiX } from 'react-icons/fi'
import { useEffect } from 'react'

export default function Drawer({ open, onClose, title, children, side = 'right', width = 'max-w-md' }) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const x = side === 'right' ? { initial: '100%', exit: '100%' } : { initial: '-100%', exit: '-100%' }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-ink/50 backdrop-blur-sm z-[95]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            initial={{ x: x.initial }}
            animate={{ x: 0 }}
            exit={{ x: x.exit }}
            transition={{ type: 'tween', duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
            className={`fixed top-0 ${side}-0 h-full w-full ${width} bg-white z-[96] flex flex-col shadow-card-hover`}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-line">
              <h3 className="font-display font-semibold text-lg">{title}</h3>
              <button onClick={onClose} className="w-8 h-8 grid place-items-center rounded-full hover:bg-surface transition-colors">
                <FiX size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
