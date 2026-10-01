import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Breadcrumb from '@/components/ui/Breadcrumb'
import BlogCard from '@/components/blog/BlogCard'
import { getBlogBySlug, getRelatedBlogs } from '@/data/blogs'
import { FiClock } from 'react-icons/fi'

export default function BlogDetail() {
  const { slug } = useParams()
  const [blog, setBlog] = useState(null)

  useEffect(() => {
    setBlog(getBlogBySlug(slug))
    window.scrollTo(0, 0)
  }, [slug])

  if (!blog) return <div className="container-hamar py-24 text-center text-muted">Loading article…</div>
  const related = getRelatedBlogs(blog)

  return (
    <div className="container-hamar py-8 max-w-3xl">
      <Breadcrumb items={[{ label: 'Blog', to: '/blog' }, { label: blog.title }]} />
      <span className="text-xs font-mono-tech uppercase tracking-wide text-muted">{blog.category}</span>
      <h1 className="font-display text-3xl font-semibold text-ink mt-2 mb-3 leading-tight">{blog.title}</h1>
      <div className="flex items-center gap-3 text-xs text-muted mb-6">
        <span>{blog.author}</span>
        <span>•</span>
        <span>{blog.date}</span>
        <span>•</span>
        <span className="flex items-center gap-1"><FiClock size={12} /> {blog.readTime}</span>
      </div>
      <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-8">
        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
      </div>
      <p className="text-ink/80 text-[16px] leading-relaxed">{blog.content}</p>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="font-display text-xl font-semibold text-ink mb-5">Related Articles</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {related.map((b) => <BlogCard key={b.id} blog={b} />)}
          </div>
        </div>
      )}
    </div>
  )
}
