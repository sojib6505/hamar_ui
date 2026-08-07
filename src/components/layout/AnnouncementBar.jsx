export default function AnnouncementBar() {
  return (
    <div className="bg-ink text-white text-center py-2 text-xs tracking-wide overflow-hidden">
      <div className="flex items-center justify-center gap-2 px-4">
        <span>Free delivery on selected orders</span>
        <span className="text-accent">•</span>
        <span className="hidden sm:inline">100% Original Products</span>
        <span className="hidden sm:inline text-accent">•</span>
        <span className="hidden sm:inline">Warranty Support</span>
      </div>
    </div>
  )
}
