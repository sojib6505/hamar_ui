import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '@/components/layout/AuthLayout'
import Button from '@/components/ui/Button'
import { login } from '@/services/authService'
import { useToast } from '@/context/ToastContext'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const navigate = useNavigate()
  const { showToast } = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(form)
    showToast?.('Welcome back to HAMAR')
    navigate('/profile')
  }

  return (
    <AuthLayout title="Welcome back" subtitle="Log in to your HAMAR account">
      <form onSubmit={handleSubmit} className="space-y-3">
        <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="w-full border border-line rounded-full px-4 py-3 text-sm outline-none focus:border-ink" />
        <input required type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Password" className="w-full border border-line rounded-full px-4 py-3 text-sm outline-none focus:border-ink" />
        <Button type="submit" variant="accent" className="w-full">Log In</Button>
      </form>
      <p className="text-sm text-muted mt-5">Don't have an account? <Link to="/register" className="text-ink font-medium underline underline-offset-2">Register</Link></p>
    </AuthLayout>
  )
}
