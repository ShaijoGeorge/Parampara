import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'gold'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  children: ReactNode
}

const styles: Record<Variant, string> = {
  primary:
    'bg-maroon text-cream shadow-[0_10px_24px_-12px_#8b1e3f] hover:bg-maroon/90',
  secondary:
    'bg-teal text-cream hover:bg-teal/90 shadow-[0_10px_24px_-12px_#0f7a73]',
  ghost:
    'bg-transparent text-ink ring-1 ring-ink/15 hover:bg-ink/5 dark:text-cream dark:ring-cream/20',
  gold: 'bg-gold text-ink hover:bg-gold/90',
}

export function Button({
  variant = 'primary',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition disabled:opacity-50 ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
