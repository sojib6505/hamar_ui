import { useState } from 'react'
import { Menu } from 'lucide-react'
import { Outlet, useLocation } from 'react-router-dom'
import AdminSidebar from '@/components/admin/AdminSidebar'

const TITLES = {
  '/admin': 'Dashboard',
  '/admin/products': 'Products',
  '/admin/categories': 'Categories',
  '/admin/brands': 'Brands',
  '/admin/orders': 'Orders',
  '/admin/customers': 'Customers',
  '/admin/settings': 'Settings',
}

export default function AdminLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  return (
    <div className="min-h-screen bg-surface text-ink lg:flex">
      <div className="hidden lg:block lg:fixed lg:inset-y-0 lg:left-0 lg:z-30">
        <AdminSidebar />
      </div>
      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button aria-label="Close navigation" onClick={() => setMenuOpen(false)} className="absolute inset-0 bg-ink/50" />
          <div className="relative h-full w-[min(18rem,85vw)]"><AdminSidebar onClose={() => setMenuOpen(false)} /></div>
        </div>
      )}
      <div className="min-w-0 flex-1 lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-line bg-white px-4 sm:px-7">
          <button aria-label="Open navigation" onClick={() => setMenuOpen(true)} className="grid size-10 place-items-center rounded-lg hover:bg-surface lg:hidden">
            <Menu size={20} />
          </button>
          <h1 className="font-display text-lg font-semibold">{TITLES[pathname] || 'Administration'}</h1>
          <span className="ml-auto hidden text-xs text-muted sm:block">HAMAR management console</span>
        </header>
        <main className="mx-auto w-full max-w-[1440px] p-4 sm:p-7"><Outlet /></main>
      </div>
    </div>
  )
}