import { NavLink } from 'react-router-dom'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { FiUser, FiPackage, FiShield, FiGift, FiUsers, FiHeart } from 'react-icons/fi'

const LINKS = [
  { to: '/profile', label: 'Profile', icon: FiUser },
  { to: '/orders', label: 'Orders', icon: FiPackage },
  { to: '/warranty', label: 'Warranty', icon: FiShield },
  { to: '/wishlist', label: 'Wishlist', icon: FiHeart },
  { to: '/rewards', label: 'Rewards', icon: FiGift },
  { to: '/referrals', label: 'Referrals', icon: FiUsers },
]

export default function AccountLayout({ title, children }) {
  return (
    <div className="container-hamar py-8">
      <Breadcrumb items={[{ label: title }]} />
      <div className="grid lg:grid-cols-[220px_1fr] gap-8">
        <aside className="flex lg:flex-col gap-1.5 overflow-x-auto no-scrollbar lg:overflow-visible">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-full lg:rounded-xl text-sm font-medium transition-colors ${
                  isActive ? 'bg-ink text-white' : 'text-muted hover:bg-surface'
                }`
              }
            >
              <l.icon size={15} /> {l.label}
            </NavLink>
          ))}
        </aside>
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink mb-6">{title}</h1>
          {children}
        </div>
      </div>
    </div>
  )
}
