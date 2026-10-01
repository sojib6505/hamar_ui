export default function CommunityCard({ channel }) {
  return (
    <div className="rounded-2xl border border-line p-5 bg-white hover:border-ink transition-colors duration-200">
      <span className="text-2xl">{channel.icon}</span>
      <h4 className="font-display font-semibold text-ink mt-3 mb-1">{channel.name}</h4>
      <p className="text-muted text-sm leading-relaxed">{channel.description}</p>
    </div>
  )
}
