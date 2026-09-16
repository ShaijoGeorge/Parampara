import type { ReactNode } from 'react'

export function Badge({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[11px] font-semibold tracking-wider text-saffron-ink dark:text-gold-light uppercase backdrop-blur-xs shadow-xs ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-gold/90" />
      {children}
    </span>
  )
}
