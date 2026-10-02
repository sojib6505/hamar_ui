import { Link } from 'react-router-dom'
import { FiInstagram, FiFacebook, FiYoutube } from 'react-icons/fi'

const COLUMNS = [
  {
    title: 'Shop',
    links: [
      { label: 'All Products', to: '/shop' },
      { label: 'Best Sellers', to: '/shop?sort=bestselling' },
      { label: 'New Arrivals', to: '/shop?sort=newest' },
      { label: 'Brands', to: '/brands' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Warranty', to: '/warranty' },
      { label: 'Returns', to: '/support' },
      { label: 'Shipping', to: '/support' },
      { label: 'Order Tracking', to: '/orders' },
      { label: 'FAQs', to: '/support' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Contact', to: '/contact' },
      { label: 'Blog', to: '/blog' },
      { label: 'Community', to: '/community' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'HAMAR Club', to: '/rewards' },
      { label: 'WhatsApp Community', to: '/community' },
      { label: 'Facebook Group', to: '/community' },
      { label: 'Rewards', to: '/rewards' },
      { label: 'Referrals', to: '/referrals' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-ink text-white/90">
      <div className="container-hamar py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10">
          <div className="col-span-2 md:col-span-2">
            <span className="font-display font-extrabold text-2xl text-white">HAMAR</span>
            <p className="text-white/50 text-sm mt-3 leading-relaxed max-w-xs">
              Trusted technology accessories for everyday life. Technology for Everyone.
            </p>
            <div className="flex items-center gap-2 mt-5">
              {[FiInstagram, FiFacebook, FiYoutube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 grid place-items-center rounded-full border border-white/15 hover:border-accent hover:text-accent transition-colors">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="font-medium text-white text-sm mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-white/50 hover:text-white text-sm transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-white/40 text-xs">© 2026 HAMAR. All rights reserved.</p>
          <div className="flex items-center gap-5 text-xs text-white/40">
            <Link to="/support" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/support" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
