import { useState, useEffect } from 'react'
import AccountLayout from '@/components/account/AccountLayout'
import Button from '@/components/ui/Button'
import { useToast } from '@/context/ToastContext'
import { useAuth } from '@/context/AuthContext'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export default function Profile() {
  const { userProfile, currentUser, token } = useAuth()
  const [form, setForm] = useState({
    name: userProfile?.name || currentUser?.displayName || 'Demo User',
    email: userProfile?.email || currentUser?.email || 'demo@hamar.com',
    phone: userProfile?.phone || '+880 1XXXXXXXXX',
  })
  const { showToast } = useToast()

  useEffect(() => {
    if (userProfile || currentUser) {
      setForm((prev) => ({
        ...prev,
        name: userProfile?.name || currentUser?.displayName || prev.name,
        email: userProfile?.email || currentUser?.email || prev.email,
        phone: userProfile?.phone || prev.phone,
      }))
    }
  }, [userProfile, currentUser])

  const handleSave = async (e) => {
    e.preventDefault()
    if (token) {
      try {
        await fetch(`${API_URL}/auth/me`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: form.name, phone: form.phone }),
        })
      } catch (err) {
        console.warn('Profile update request failed:', err.message)
      }
    }
    showToast?.('Profile updated')
  }

  return (
    <AccountLayout title="Profile">
      <form
        onSubmit={handleSave}
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
