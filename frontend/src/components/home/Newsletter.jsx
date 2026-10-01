import { useState } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import { useToast } from '@/context/ToastContext'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const { showToast } = useToast()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    showToast?.('Subscribed! Welcome to HAMAR updates.')
    setEmail('')
  }

  return (
    <section className="py-20 md:py-24 bg-ink">
      <div className="container-hamar text-center max-w-xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-3">Get Tech Updates.</h2>
        <p className="text-white/50 text-sm mb-8">New products, buying guides, exclusive deals and useful tech tips.</p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="flex-1 rounded-full px-5 py-3.5 text-sm bg-white/10 border border-white/15 text-white placeholder:text-white/40 outline-none focus:border-accent transition-colors"
          />
          <button type="submit" className="inline-flex items-center justify-center gap-2 bg-accent text-ink rounded-full px-6 py-3.5 text-sm font-medium hover:brightness-95 transition-all">
            Subscribe <FiArrowRight size={15} />
          </button>
        </form>
      </div>
    </section>
  )
}
