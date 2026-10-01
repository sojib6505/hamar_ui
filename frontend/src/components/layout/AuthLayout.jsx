export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-[80vh] grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-center bg-ink p-16">
        <span className="font-display font-extrabold text-3xl text-accent mb-6">HAMAR</span>
        <h2 className="font-display text-3xl font-semibold text-white leading-tight mb-3">Join the HAMAR ecosystem.</h2>
        <p className="text-white/50 text-sm max-w-xs">Track orders, register warranty, earn rewards, and get early access to new arrivals.</p>
      </div>
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <h1 className="font-display text-2xl font-semibold text-ink mb-1">{title}</h1>
          <p className="text-muted text-sm mb-8">{subtitle}</p>
          {children}
        </div>
      </div>
    </div>
  )
}
