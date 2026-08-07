import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '@/components/layout/AuthLayout'
import Button from '@/components/ui/Button'
import { register } from '@/services/authService'
import { useToast } from '@/context/ToastContext'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const navigate = useNavigate()
  const { showToast } = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await register(form)
    showToast?.('Account created — welcome to HAMAR')
    navigate('/profile')
  }

  return (
    <AuthLayout title="Create your account" subtitle="Join HAMAR Club for warranty, rewards and more">
      <form onSubmit={handleSubmit} className="space-y-3">
        <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" className="w-full border border-line rounded-full px-4 py-3 text-sm outline-none focus:border-ink" />
        <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="w-full border border-line rounded-full px-4 py-3 text-sm outline-none focus:border-ink" />
        <input required type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Password" className="w-full border border-line rounded-full px-4 py-3 text-sm outline-none focus:border-ink" />
        <Button type="submit" variant="accent" className="w-full">Create Account</Button>
      </form>
      <p className="text-sm text-muted mt-5">Already have an account? <Link to="/login" className="text-ink font-medium underline underline-offset-2">Log In</Link></p>
    </AuthLayout>
  )
}
