import { Link } from 'react-router-dom'

export default function BrandCard({ brand }) {
  return (
    <Link
      to={`/brand/${brand.slug}`}
      className="group flex flex-col items-center justify-center gap-3 py-8 px-4 rounded-2xl border border-line hover:border-ink hover:shadow-card transition-all duration-200 bg-white"
    >
      <span className="text-3xl group-hover:scale-110 transition-transform duration-200">{brand.logo}</span>
      <span className="font-display font-semibold text-ink text-sm">{brand.name}</span>
    </Link>
  )
}
