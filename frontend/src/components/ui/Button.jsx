import { forwardRef } from 'react'

const variants = {
  primary: 'bg-ink text-white hover:bg-ink-soft',
  accent: 'bg-accent text-ink hover:brightness-95',
  outline: 'bg-transparent text-ink border border-ink hover:bg-ink hover:text-white',
  ghost: 'bg-transparent text-ink hover:bg-surface',
  outlineLight: 'bg-transparent text-white border border-white/40 hover:bg-white hover:text-ink',
}
const sizes = {
  sm: 'text-xs px-3.5 py-2',
  md: 'text-sm px-5 py-3',
  lg: 'text-[15px] px-7 py-3.5',
}

const Button = forwardRef(({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => (
  <button
    ref={ref}
    className={`inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
    {...props}
  >
    {children}
  </button>
))
Button.displayName = 'Button'
export default Button
