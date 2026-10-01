import SectionHeader from '@/components/ui/SectionHeader'
import { galleryItems } from '@/data/community'

export default function InstagramGallery() {
  return (
    <section className="py-20 md:py-24">
      <div className="container-hamar">
        <SectionHeader eyebrow="#HAMARSetup" title="From the Community Gallery" subtitle="Real desks, real setups — tagged and shared by HAMAR customers." />
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {galleryItems.slice(0, 10).map((g) => (
            <div key={g.id} className="group relative aspect-square rounded-xl overflow-hidden bg-surface">
              <img src={g.image} alt={g.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/40 transition-colors duration-200 flex items-end p-3 opacity-0 group-hover:opacity-100">
                <span className="text-white text-xs font-medium">{g.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
