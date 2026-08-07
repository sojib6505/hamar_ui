import { useState } from 'react'
import AccountLayout from '@/components/account/AccountLayout'
import Button from '@/components/ui/Button'
import { submitWarrantyRegistration } from '@/services/supportService'
import { useToast } from '@/context/ToastContext'

export default function Warranty() {
  const [form, setForm] = useState({ orderId: '', productName: '', purchaseDate: '' })
  const { showToast } = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await submitWarrantyRegistration(form)
    showToast?.(`Warranty registered — ${res.warrantyId}`)
    setForm({ orderId: '', productName: '', purchaseDate: '' })
  }

  return (
    <AccountLayout title="Warranty Registration">
      <div className="max-w-md border border-line rounded-2xl p-6">
        <p className="text-sm text-muted mb-4">Register your product within 15 days of delivery for streamlined future claims.</p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input required value={form.orderId} onChange={(e) => setForm({ ...form, orderId: e.target.value })} placeholder="Order ID" className="w-full border border-line rounded-full px-4 py-2.5 text-sm outline-none focus:border-ink" />
          <input required value={form.productName} onChange={(e) => setForm({ ...form, productName: e.target.value })} placeholder="Product name" className="w-full border border-line rounded-full px-4 py-2.5 text-sm outline-none focus:border-ink" />
          <input required type="date" value={form.purchaseDate} onChange={(e) => setForm({ ...form, purchaseDate: e.target.value })} className="w-full border border-line rounded-full px-4 py-2.5 text-sm outline-none focus:border-ink" />
          <Button type="submit" variant="accent" className="w-full">Register Warranty</Button>
        </form>
      </div>
    </AccountLayout>
  )
}
