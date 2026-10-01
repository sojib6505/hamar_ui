import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { ArrowLeft, LockKeyhole, ShieldCheck } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/context/ToastContext'

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [submitting, setSubmitting] = useState(false)
  const { adminLogin, currentUser, userProfile, loading } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  if (!loading && currentUser && userProfile?.role === 'admin') return <Navigate to="/admin" replace />

  const submit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    try {
      await adminLogin(form.email, form.password)
      showToast?.('Administrator verified')
      navigate('/admin', { replace: true })
    } catch (error) {
      showToast?.(error.message || 'Unable to verify administrator access.', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="grid min-h-screen bg-white lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.8fr)]">
      <section className="relative hidden overflow-hidden bg-ink p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <Link to="/" className="w-fit font-display text-2xl font-black">HAMAR<span className="text-accent">.</span></Link>
        <div className="max-w-lg">
          <div className="mb-6 grid size-14 place-items-center bg-accent text-ink"><ShieldCheck size={26} /></div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-accent">Operations console</p>
          <h1 className="font-display text-4xl font-bold leading-tight">A clear view of every order, product and customer.</h1>
        </div>
        <p className="text-xs text-white/50">HAMAR Electronics · Administrator access</p>
      </section>
      <section className="flex items-center justify-center px-5 py-12 sm:px-10">
        <div className="w-full max-w-md">
          <Link to="/" className="mb-12 inline-flex items-center gap-2 text-sm text-muted hover:text-ink lg:hidden"><ArrowLeft size={16} /> Storefront</Link>
          <div className="mb-8 grid size-12 place-items-center bg-accent text-ink"><LockKeyhole size={22} /></div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-muted">HAMAR admin</p>
          <h2 className="font-display text-3xl font-bold">Sign in</h2>
          <p className="mt-2 text-sm text-muted">Your account must have an administrator role in HAMAR.</p>
          <form onSubmit={submit} className="mt-8 space-y-4">
            <label className="block text-sm font-medium">Email<input required type="email" autoComplete="username" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="mt-2 w-full rounded-md border border-line px-4 py-3 outline-none focus:border-ink" /></label>
            <label className="block text-sm font-medium">Password<input required type="password" autoComplete="current-password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} className="mt-2 w-full rounded-md border border-line px-4 py-3 outline-none focus:border-ink" /></label>
            <button disabled={submitting} className="flex w-full items-center justify-center gap-2 bg-accent px-4 py-3 font-semibold text-ink transition hover:brightness-95 disabled:opacity-60">{submitting ? 'Verifying…' : 'Sign in to admin'}</button>
          </form>
          <Link to="/" className="mt-6 inline-flex items-center gap-2 text-sm text-muted hover:text-ink"><ArrowLeft size={15} /> Back to store</Link>
        </div>
      </section>
    </main>
  )
}