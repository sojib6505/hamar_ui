import { NavLink, Link } from 'react-router-dom'
import Drawer from '@/components/ui/Drawer'
import { FiUser, FiHeart, FiBarChart2, FiPhoneCall } from 'react-icons/fi'

export default function MobileNav({ open, onClose, links }) {
  return (
    <Drawer open={open} onClose={onClose} title="HAMAR" side="left" width="max-w-xs">
      <div className="flex flex-col p-6 gap-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            onClick={onClose}
            className={({ isActive }) =>
              `py-3 border-b border-line text-[15px] font-medium ${isActive ? 'text-ink' : 'text-muted'}`
            }
          >
            {link.label}
          </NavLink>
        ))}
        <div className="grid grid-cols-3 gap-2 mt-6">
          <Link to="/login" onClick={onClose} className="flex flex-col items-center gap-1.5 py-4 rounded-xl border border-line text-xs">
            <FiUser size={18} /> Account
          </Link>
          <Link to="/wishlist" onClick={onClose} className="flex flex-col items-center gap-1.5 py-4 rounded-xl border border-line text-xs">
            <FiHeart size={18} /> Wishlist
          </Link>
          <Link to="/compare" onClick={onClose} className="flex flex-col items-center gap-1.5 py-4 rounded-xl border border-line text-xs">
            <FiBarChart2 size={18} /> Compare
          </Link>
        </div>
        <a
          href="https://wa.me/8801000000000"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 mt-4 bg-ink text-white rounded-full py-3 text-sm font-medium"
        >
          <FiPhoneCall size={15} /> WhatsApp Support
        </a>
      </div>
    </Drawer>
  )
}
