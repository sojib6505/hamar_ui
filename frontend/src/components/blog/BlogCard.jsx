import { Link } from 'react-router-dom'
import { FiClock } from 'react-icons/fi'

export default function BlogCard({ blog, horizontal = false }) {
  if (horizontal) {
    return (
      <Link to={`/blog/${blog.slug}`} className="group flex gap-4 items-start">
        <div className="w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-surface">
          <img src={blog.image} alt={blog.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
        <div>
          <span className="text-[11px] font-mono-tech uppercase tracking-wide text-muted">{blog.category}</span>
          <h4 className="font-medium text-ink text-sm leading-snug mt-1 line-clamp-2 group-hover:underline underline-offset-2">{blog.title}</h4>
          <span className="text-xs text-muted mt-1 inline-block">{blog.readTime}</span>
        </div>
      </Link>
    )
  }
  return (
    <Link to={`/blog/${blog.slug}`} className="group block rounded-2xl border border-line overflow-hidden bg-white hover:shadow-card-hover transition-shadow duration-200">
      <div className="aspect-[16/10] overflow-hidden bg-surface">
        <img src={blog.image} alt={blog.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-5">
        <span className="text-[11px] font-mono-tech uppercase tracking-wide text-muted">{blog.category}</span>
        <h3 className="font-display font-semibold text-ink text-[17px] leading-snug mt-1.5 mb-2 line-clamp-2">{blog.title}</h3>
        <p className="text-muted text-sm line-clamp-2 mb-3">{blog.excerpt}</p>
        <div className="flex items-center gap-3 text-xs text-muted">
          <span className="flex items-center gap-1"><FiClock size={12} /> {blog.readTime}</span>
          <span>{blog.date}</span>
        </div>
      </div>
    </Link>
  )
}
