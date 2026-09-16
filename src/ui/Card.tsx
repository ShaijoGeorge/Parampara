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
      className={`relative overflow-hidden rounded-3xl border border-gold/25 bg-white/85 p-6 shadow-[0_20px_50px_-20px_rgba(25,16,12,0.15)] backdrop-blur-xl transition-all duration-300 dark:border-gold/20 dark:bg-ink/80 dark:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)] ${className}`}
    >
      {children}
    </div>
  )
}
