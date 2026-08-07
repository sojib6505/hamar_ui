import { useState } from 'react'
import AccountLayout from '@/components/account/AccountLayout'
import Button from '@/components/ui/Button'
import { useToast } from '@/context/ToastContext'

export default function Profile() {
  const [form, setForm] = useState({ name: 'Demo User', email: 'demo@hamar.com', phone: '+880 1XXXXXXXXX' })
  const { showToast } = useToast()

  return (
    <AccountLayout title="Profile">
      <form
        onSubmit={(e) => { e.preventDefault(); showToast?.('Profile updated') }}
        className="max-w-md space-y-3 border border-line rounded-2xl p-6"
      >
        <label className="block text-xs text-muted mb-1">Full Name</label>
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-line rounded-full px-4 py-2.5 text-sm outline-none focus:border-ink" />
        <label className="block text-xs text-muted mb-1 pt-2">Email</label>
        <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border border-line rounded-full px-4 py-2.5 text-sm outline-none focus:border-ink" />
        <label className="block text-xs text-muted mb-1 pt-2">Phone</label>
        <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full border border-line rounded-full px-4 py-2.5 text-sm outline-none focus:border-ink" />
        <Button type="submit" variant="accent" className="mt-2">Save Changes</Button>
      </form>
    </AccountLayout>
  )
}
