/**
 * components/admin/AdminSidebar.jsx
 *
 * Desktop & mobile sidebar navigation for the HAMAR Admin Console.
 */

import { NavLink, Link, useNavigate } from 'react-router-dom'
import {
  Boxes,
  ExternalLink,
  Folder,
  LayoutDashboard,
  LogOut,
  Settings,
  ShoppingBag,
  Tag,
  Users,
  X,
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

const NAV_ITEMS = [
  { label: 'Dashboard', to: '/admin', icon: LayoutDashboard, end: true },
  { label: 'Products', to: '/admin/products', icon: Boxes },
  { label: 'Categories', to: '/admin/categories', icon: Folder },
  { label: 'Brands', to: '/admin/brands', icon: Tag },
  { label: 'Orders', to: '/admin/orders', icon: ShoppingBag },
  { label: 'Customers', to: '/admin/customers', icon: Users },
  { label: 'Settings', to: '/admin/settings', icon: Settings },
]

export default function AdminSidebar({ onClose }) {
  const { logout, currentUser, userProfile } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/admin/login')
  }

  return (
    <aside className="w-64 bg-ink text-white flex flex-col h-full shrink-0 border-r border-line-dark select-none">
      {/* Brand Header */}
      <div className="h-16 px-6 flex items-center justify-between border-b border-line-dark/60">
        <Link to="/admin" className="flex items-center gap-2.5">
          <span className="font-display font-black text-xl tracking-tight text-white">
            HAMAR<span className="text-accent">.</span>
          </span>
          <span className="text-[10px] font-mono-tech tracking-wider uppercase bg-accent text-ink px-1.5 py-0.5 rounded font-bold">
            Admin
          </span>
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto no-scrollbar">
        <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-dark">
          Management
        </div>

        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-accent text-ink font-semibold shadow-sm'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`
              }
            >
              <Icon size={18} className="shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          )
        })}
      </nav>

      {/* Footer & User info */}
      <div className="p-4 border-t border-line-dark/60 space-y-2">
        <Link
          to="/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink size={14} /> View Storefront
          </span>
          <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded">Live</span>
        </Link>

        <div className="pt-2 border-t border-line-dark/40 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0 pr-2">
            <div className="w-8 h-8 rounded-full bg-accent/20 text-accent font-semibold text-xs grid place-items-center shrink-0 uppercase">
              {(userProfile?.name || currentUser?.email || 'A')[0]}
            </div>
            <div className="truncate">
              <p className="text-xs font-medium text-white truncate">
                {userProfile?.name || 'Administrator'}
              </p>
              <p className="text-[11px] text-white/40 truncate">
                {currentUser?.email || 'admin@hamar.com'}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Log Out"
            className="p-2 text-white/50 hover:text-danger hover:bg-white/10 rounded-lg transition-colors shrink-0"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  )
}
