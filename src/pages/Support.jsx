import { useState } from 'react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import Button from '@/components/ui/Button'
import { FaWhatsapp } from 'react-icons/fa'
import { FiPackage, FiShield, FiRefreshCw, FiHelpCircle, FiMessageSquare, FiFileText } from 'react-icons/fi'
import { useToast } from '@/context/ToastContext'
import { submitSupportTicket, trackOrder } from '@/services/supportService'

const CARDS = [
  { icon: FiPackage, title: 'Track Order', desc: 'Check your delivery status in real time.' },
  { icon: FiShield, title: 'Warranty', desc: 'Register or claim your product warranty.' },
  { icon: FiRefreshCw, title: 'Returns', desc: 'Start a return or exchange request.' },
  { icon: FiHelpCircle, title: 'FAQs', desc: 'Answers to the most common questions.' },
  { icon: FiMessageSquare, title: 'Live Chat', desc: 'Chat with our support team directly.' },
  { icon: FiFileText, title: 'Support Ticket', desc: 'Open a ticket for anything else.' },
]

const FAQS = [
  { q: 'How long does delivery take?', a: 'Most orders arrive within 2–4 business days across Bangladesh.' },
  { q: 'Do you offer Cash on Delivery?', a: 'Yes, Cash on Delivery is available nationwide alongside bKash and card payments.' },
  { q: 'How do I claim warranty?', a: 'Register your product under HAMAR Club and submit a warranty ticket with your order ID.' },
]

export default function Support() {
  const [orderId, setOrderId] = useState('')
  const [tracked, setTracked] = useState(null)
  const [ticketForm, setTicketForm] = useState({ name: '', email: '', message: '' })
  const { showToast } = useToast()

  const handleTrack = async (e) => {
    e.preventDefault()
    if (!orderId) return
    const result = await trackOrder(orderId)
    setTracked(result)
  }

  const handleTicket = async (e) => {
    e.preventDefault()
    const res = await submitSupportTicket(ticketForm)
    showToast?.(`Ticket ${res.ticketId} submitted`)
    setTicketForm({ name: '', email: '', message: '' })
  }

  return (
    <div className="container-hamar py-8">
      <Breadcrumb items={[{ label: 'Support' }]} />
      <h1 className="font-display text-2xl md:text-3xl font-semibold text-ink mb-2">Support Center</h1>
      <p className="text-muted text-sm mb-8 max-w-xl">Everything you need — order help, warranty, returns and direct support.</p>

      <div className="grid md:grid-cols-3 gap-4 mb-14">
        {CARDS.map((c) => (
          <div key={c.title} className="rounded-2xl border border-line p-6 hover:border-ink transition-colors">
            <c.icon size={20} className="text-ink mb-3" />
            <h3 className="font-display font-semibold text-ink mb-1">{c.title}</h3>
            <p className="text-muted text-sm">{c.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-10 mb-14">
        <div>
          <h2 className="font-display text-xl font-semibold text-ink mb-4">Track Your Order</h2>
          <form onSubmit={handleTrack} className="flex gap-2 mb-4">
            <input value={orderId} onChange={(e) => setOrderId(e.target.value)} placeholder="Order ID e.g. ORD-10234" className="flex-1 border border-line rounded-full px-4 py-2.5 text-sm outline-none focus:border-ink" />
            <Button type="submit">Track</Button>
          </form>
          {tracked && (
            <div className="border border-line rounded-2xl p-5">
              <p className="text-sm font-medium mb-3">Status: <span className="text-ink">{tracked.status}</span></p>
              <div className="flex items-center gap-1">
                {tracked.steps.map((s, i) => (
                  <div key={s} className="flex-1 flex flex-col items-center gap-1.5">
                    <div className={`w-3 h-3 rounded-full ${i <= tracked.currentStep ? 'bg-accent' : 'bg-line'}`} />
                    <span className="text-[10px] text-muted text-center">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <h2 className="font-display text-xl font-semibold text-ink mb-4">Open a Support Ticket</h2>
          <form onSubmit={handleTicket} className="space-y-3">
            <input required value={ticketForm.name} onChange={(e) => setTicketForm({ ...ticketForm, name: e.target.value })} placeholder="Your name" className="w-full border border-line rounded-full px-4 py-2.5 text-sm outline-none focus:border-ink" />
            <input required type="email" value={ticketForm.email} onChange={(e) => setTicketForm({ ...ticketForm, email: e.target.value })} placeholder="Email" className="w-full border border-line rounded-full px-4 py-2.5 text-sm outline-none focus:border-ink" />
            <textarea required value={ticketForm.message} onChange={(e) => setTicketForm({ ...ticketForm, message: e.target.value })} placeholder="Describe your issue" rows={3} className="w-full border border-line rounded-2xl px-4 py-2.5 text-sm outline-none focus:border-ink resize-none" />
            <Button type="submit" variant="accent" className="w-full">Submit Ticket</Button>
          </form>
        </div>
      </div>

      <div className="mb-14">
        <h2 className="font-display text-xl font-semibold text-ink mb-4">Frequently Asked Questions</h2>
        <div className="space-y-3 max-w-2xl">
          {FAQS.map((f) => (
            <details key={f.q} className="border border-line rounded-xl p-4 group">
              <summary className="text-sm font-medium text-ink cursor-pointer">{f.q}</summary>
              <p className="text-sm text-muted mt-2">{f.a}</p>
            </details>
          ))}
        </div>
      </div>

      <a href="https://wa.me/8801000000000" target="_blank" rel="noreferrer">
        <Button><FaWhatsapp size={16} /> Chat on WhatsApp</Button>
      </a>
    </div>
  )
}
