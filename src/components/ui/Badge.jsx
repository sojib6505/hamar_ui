export default function Badge({ children, tone = 'default' }) {
  const tones = {
    default: 'bg-ink text-white',
    accent: 'bg-accent text-ink',
    outline: 'bg-white text-ink border border-line',
    danger: 'bg-danger text-white',
    success: 'bg-success text-white',
  }
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wide ${tones[tone]}`}>
      {children}
    </span>
  )
}
