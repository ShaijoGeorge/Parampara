import type { ReactNode } from 'react'

export function Card({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`rounded-3xl border border-maroon/10 bg-white/80 p-6 shadow-[0_30px_80px_-48px_rgba(42,24,16,0.6)] backdrop-blur dark:border-cream/10 dark:bg-ink/60 ${className}`}
    >
      {children}
    </div>
  )
}
