import { useState } from 'react'
import { FiZoomIn, FiPlay } from 'react-icons/fi'

export default function ProductGallery({ images, videoPlaceholder = true }) {
  const [active, setActive] = useState(0)
  const [zoom, setZoom] = useState(false)
  const gallery = [...images]

  return (
    <div>
      <div
        className="relative aspect-square rounded-2xl overflow-hidden bg-surface border border-line cursor-zoom-in"
        onClick={() => setZoom((z) => !z)}
      >
        <img
          src={gallery[active]}
          alt="Product"
          className={`w-full h-full object-cover transition-transform duration-300 ${zoom ? 'scale-150' : 'scale-100'}`}
        />
        <span className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/90 grid place-items-center text-ink">
          <FiZoomIn size={16} />
        </span>
      </div>
      <div className="flex gap-3 mt-4 overflow-x-auto no-scrollbar">
        {gallery.map((img, i) => (
          <button
            key={i}
            onClick={() => { setActive(i); setZoom(false) }}
            className={`shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-colors ${
              active === i ? 'border-ink' : 'border-line'
            }`}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
        {videoPlaceholder && (
          <div className="shrink-0 w-16 h-16 rounded-xl border-2 border-dashed border-line grid place-items-center text-muted">
            <FiPlay size={16} />
          </div>
        )}
      </div>
    </div>
  )
}
