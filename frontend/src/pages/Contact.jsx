import { useState } from 'react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import Button from '@/components/ui/Button'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import { useToast } from '@/context/ToastContext'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const { showToast } = useToast()

  const handleSubmit = (e) => {
    e.preventDefault()
    showToast?.('Message sent — we\u2019ll get back to you soon.')
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <div className="container-hamar py-8">
      <Breadcrumb items={[{ label: 'Contact' }]} />
      <h1 className="font-display text-2xl md:text-3xl font-semibold text-ink mb-8">Contact HAMAR</h1>
      <div className="grid md:grid-cols-2 gap-10">
        <form onSubmit={handleSubmit} className="space-y-3">
          <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="w-full border border-line rounded-full px-4 py-3 text-sm outline-none focus:border-ink" />
          <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="w-full border border-line rounded-full px-4 py-3 text-sm outline-none focus:border-ink" />
          <textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Message" rows={5} className="w-full border border-line rounded-2xl px-4 py-3 text-sm outline-none focus:border-ink resize-none" />
          <Button type="submit" variant="accent" className="w-full">Send Message</Button>
        </form>
        <div className="space-y-5">
          <div className="flex items-start gap-3">
            <FiMail size={18} className="text-ink mt-0.5" />
            <div><p className="text-sm font-medium text-ink">Email</p><p className="text-sm text-muted">support@hamar.com</p></div>
          </div>
          <div className="flex items-start gap-3">
            <FiPhone size={18} className="text-ink mt-0.5" />
            <div><p className="text-sm font-medium text-ink">Phone / WhatsApp</p><p className="text-sm text-muted">+880 1000-000000</p></div>
          </div>
          <div className="flex items-start gap-3">
            <FiMapPin size={18} className="text-ink mt-0.5" />
            <div><p className="text-sm font-medium text-ink">Location</p><p className="text-sm text-muted">Dhaka, Bangladesh</p></div>
          </div>
        </div>
      </div>
    </div>
  )
}
