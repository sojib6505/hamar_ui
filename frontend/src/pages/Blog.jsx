import { useEffect, useState } from 'react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import BlogCard from '@/components/blog/BlogCard'
import { FiSearch } from 'react-icons/fi'
import { blogs, blogCategories } from '@/data/blogs'

export default function Blog() {
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')

  useEffect(() => window.scrollTo(0, 0), [])

  const filtered = blogs.filter((b) => {
    const matchCategory = category === 'All' || b.category === category
    const matchSearch = !search || b.title.toLowerCase().includes(search.toLowerCase())
    return matchCategory && matchSearch
  })
  const featured = blogs.find((b) => b.featured)

  return (
    <div className="container-hamar py-8">
      <Breadcrumb items={[{ label: 'Blog' }]} />
      <h1 className="font-display text-2xl md:text-3xl font-semibold text-ink mb-2">Tech Learning Center</h1>
      <p className="text-muted text-sm mb-8 max-w-xl">Buying guides, charging tips, and honest comparisons.</p>

      {featured && (
        <div className="mb-10">
          <BlogCard blog={featured} />
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {['All', ...blogCategories].map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`shrink-0 text-xs font-medium px-4 py-2 rounded-full border transition-colors ${
                category === c ? 'bg-ink text-white border-ink' : 'border-line text-muted hover:border-ink'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 border border-line rounded-full px-4 py-2 max-w-xs w-full">
          <FiSearch size={14} className="text-muted" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search articles" className="flex-1 outline-none text-sm bg-transparent" />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {filtered.map((b) => <BlogCard key={b.id} blog={b} />)}
      </div>
    </div>
  )
}
