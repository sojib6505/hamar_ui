import { Link } from 'react-router-dom'
import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="container-hamar py-32 text-center">
      <span className="font-display text-6xl font-bold text-ink">404</span>
      <h1 className="font-display text-2xl font-semibold text-ink mt-4 mb-2">Page not found</h1>
      <p className="text-muted text-sm mb-8">The page you're looking for doesn't exist or has moved.</p>
      <Link to="/"><Button variant="accent">Back to Home</Button></Link>
    </div>
  )
}
