import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'gold'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  children: ReactNode
}

const styles: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-maroon to-maroon-dark text-cream border border-gold/35 shadow-[0_10px_25px_-8px_rgba(125,22,52,0.45)] hover:shadow-[0_14px_30px_-6px_rgba(125,22,52,0.65)] hover:border-gold/70 hover:brightness-105',
  secondary:
    'bg-gradient-to-r from-teal to-teal-ink text-cream border border-teal/40 shadow-[0_10px_25px_-8px_rgba(12,107,101,0.4)] hover:shadow-[0_14px_30px_-6px_rgba(12,107,101,0.6)] hover:brightness-105',
  ghost:
    'bg-white/50 text-ink ring-1 ring-ink/15 hover:bg-ink/5 hover:ring-gold/60 dark:bg-ink/40 dark:text-cream dark:ring-cream/20 dark:hover:bg-cream/10 dark:hover:ring-gold/60 backdrop-blur-sm',
  gold:
    'bg-gradient-to-r from-gold-light via-gold to-gold-dark text-ink font-semibold border border-gold-light/60 shadow-[0_10px_25px_-8px_rgba(201,162,39,0.5)] hover:shadow-[0_14px_32px_-6px_rgba(201,162,39,0.75)] hover:brightness-105',
}

export function Button({
  variant = 'primary',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium tracking-wide transition-all duration-200 cursor-pointer active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
