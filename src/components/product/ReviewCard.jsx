import Rating from '@/components/ui/Rating'
import Badge from '@/components/ui/Badge'
import { FiPlayCircle, FiImage } from 'react-icons/fi'

export default function ReviewCard({ review }) {
  return (
    <div className="rounded-2xl border border-line p-5 bg-white">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-ink text-accent grid place-items-center font-display font-semibold text-sm shrink-0">
            {review.avatar}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm text-ink">{review.customerName}</span>
              {review.verified && <Badge tone="accent">Verified Buyer</Badge>}
            </div>
            <span className="text-xs text-muted">{review.date}</span>
          </div>
        </div>
      </div>
      <Rating value={review.rating} size={13} />
      <p className="text-sm text-ink/80 mt-3 leading-relaxed">{review.text}</p>
      <div className="flex items-center gap-3 mt-3">
        {review.hasPhoto && (
          <span className="flex items-center gap-1 text-xs text-muted"><FiImage size={13} /> Photo</span>
        )}
        {review.hasVideo && (
          <span className="flex items-center gap-1 text-xs text-muted"><FiPlayCircle size={13} /> Video</span>
        )}
        <span className="text-xs text-muted ml-auto">on {review.productName}</span>
      </div>
    </div>
  )
}
