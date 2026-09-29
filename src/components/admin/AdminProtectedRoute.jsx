/**
 * components/admin/AdminProtectedRoute.jsx
 *
 * Route guard that ensures only authenticated users with the 'admin' role
 * can access the HAMAR Admin Dashboard.
 */

import { Navigate, Outlet, Link } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { ArrowLeft, LogOut, ShieldX } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function AdminProtectedRoute({ children }) {
  const { currentUser, userProfile, loading, logout } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 text-center">
        <div className="w-10 h-10 border-3 border-ink/20 border-t-ink rounded-full animate-spin mb-4" />
        <p className="text-sm font-medium text-ink">Verifying administrator credentials…</p>
      </div>
    )
  }

  // Not logged in -> redirect to dedicated Admin Login
  if (!currentUser) {
    return <Navigate to="/admin/login" replace />
  }

  // Fallback dev allowance: if email is admin@hamar.com, treat as admin
  const isAuthorized = userProfile?.role === 'admin'

  // Logged in, but not an admin -> Access Denied
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl border border-line p-8 text-center shadow-card">
          <div className="w-14 h-14 rounded-2xl bg-danger/10 text-danger grid place-items-center mx-auto mb-5">
            <ShieldX size={28} />
          </div>
          <h1 className="font-display text-2xl font-bold text-ink mb-2">Access Denied</h1>
          <p className="text-sm text-muted leading-relaxed mb-6">
            You are signed in as <span className="font-mono-tech text-ink font-medium">{currentUser.email}</span>,
            but this account does not have administrator privileges to access the HAMAR Management Console.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/">
                <Button variant="outline" size="md" className="w-full">
                <ArrowLeft size={16} /> Return to Store
              </Button>
            </Link>
              <Button variant="primary" size="md" onClick={logout} className="w-full">
              <LogOut size={16} /> Sign Out
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return children ? children : <Outlet />
}
