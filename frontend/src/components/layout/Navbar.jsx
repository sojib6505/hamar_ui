import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FiSearch, FiHeart, FiBarChart2, FiShoppingBag, FiUser, FiMenu, FiX } from 'react-icons/fi'
import { useWishlist } from '@/context/WishlistContext'
import { useCompare } from '@/context/CompareContext'
import { useCart } from '@/context/CartContext'
import AnnouncementBar from './AnnouncementBar'
import MobileNav from './MobileNav'
import CartDrawer from './CartDrawer'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Brands', to: '/brands' },
  { label: 'Blog', to: '/blog' },
  { label: 'Community', to: '/community' },
  { label: 'Support', to: '/support' },
  { label: 'About', to: '/about' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [cartOpen, setCartOpen] = useState(false)
  const navigate = useNavigate()

  const { items: wishlistItems } = useWishlist()
  const { items: compareItems } = useCompare()
  const { itemCount } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  return (
    <>
      <header className="sticky top-0 z-50">
        <AnnouncementBar />
        <div className={`bg-white/95 backdrop-blur-md border-b border-line transition-all duration-300 ${scrolled ? 'py-2.5' : 'py-4'}`}>
          <div className="container-hamar flex items-center justify-between gap-4">
            <button className="lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu">
              <FiMenu size={22} />
            </button>

            <Link to="/" className="font-display font-extrabold text-xl tracking-tight text-ink shrink-0">
              HAMAR
            </Link>

            <nav className="hidden lg:flex items-center gap-7">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors ${isActive ? 'text-ink' : 'text-muted hover:text-ink'}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-1 sm:gap-2">
              <button onClick={() => setSearchOpen((s) => !s)} className="w-9 h-9 grid place-items-center rounded-full hover:bg-surface transition-colors" aria-label="Search">
                {searchOpen ? <FiX size={18} /> : <FiSearch size={18} />}
              </button>
              <Link to="/compare" className="relative w-9 h-9 hidden sm:grid place-items-center rounded-full hover:bg-surface transition-colors" aria-label="Compare">
                <FiBarChart2 size={18} />
                {compareItems.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-accent text-ink text-[10px] font-bold grid place-items-center">
                    {compareItems.length}
                  </span>
                )}
              </Link>
              <Link to="/wishlist" className="relative w-9 h-9 grid place-items-center rounded-full hover:bg-surface transition-colors" aria-label="Wishlist">
                <FiHeart size={18} />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-accent text-ink text-[10px] font-bold grid place-items-center">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>
              <button onClick={() => setCartOpen(true)} className="relative w-9 h-9 grid place-items-center rounded-full hover:bg-surface transition-colors" aria-label="Cart">
                <FiShoppingBag size={18} />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-accent text-ink text-[10px] font-bold grid place-items-center">
                    {itemCount}
                  </span>
                )}
              </button>
              <Link to="/login" className="w-9 h-9 hidden sm:grid place-items-center rounded-full hover:bg-surface transition-colors" aria-label="Account">
                <FiUser size={18} />
              </Link>
            </div>
          </div>

          {searchOpen && (
            <div className="container-hamar mt-3">
              <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 border border-line rounded-full px-4 py-2.5 focus-within:border-ink transition-colors">
                <FiSearch size={16} className="text-muted shrink-0" />
                <input
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search chargers, power banks, earbuds…"
                  className="flex-1 outline-none text-sm bg-transparent"
                />
              </form>
            </div>
          )}
        </div>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} links={NAV_LINKS} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
