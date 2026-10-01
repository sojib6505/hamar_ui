import { Link } from 'react-router-dom'
import Button from './Button'

export default function EmptyState({ icon: Icon, title, description, actionLabel, actionTo }) {
  return (
    <div className="flex flex-col items-center text-center py-20 px-6">
      {Icon && (
        <div className="w-16 h-16 rounded-full bg-surface grid place-items-center mb-5 text-muted">
          <Icon size={26} />
        </div>
      )}
      <h3 className="font-display text-xl font-semibold text-ink mb-2">{title}</h3>
      {description && <p className="text-muted text-sm max-w-sm mb-6">{description}</p>}
      {actionLabel && actionTo && (
        <Link to={actionTo}>
          <Button variant="accent">{actionLabel}</Button>
        </Link>
      )}
    </div>
  )
}
