export default function LoadingState({ rows = 8 }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-line overflow-hidden animate-pulse">
          <div className="aspect-square bg-surface-2" />
          <div className="p-4 space-y-2">
            <div className="h-3 bg-surface-2 rounded w-1/3" />
            <div className="h-4 bg-surface-2 rounded w-4/5" />
            <div className="h-4 bg-surface-2 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
}
