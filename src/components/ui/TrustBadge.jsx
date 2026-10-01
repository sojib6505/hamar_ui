export default function TrustBadge({ icon: Icon, label }) {
  return (
    <div className="group flex flex-col items-center text-center gap-3 py-6 px-4 rounded-2xl border border-line hover:border-ink transition-colors duration-200">
      <div className="w-11 h-11 rounded-full bg-ink text-accent grid place-items-center group-hover:bg-accent group-hover:text-ink transition-colors duration-200">
        <Icon size={18} />
      </div>
      <span className="text-[10px] md:text-sm font-medium text-ink">{label}</span>
    </div>
  )
}
