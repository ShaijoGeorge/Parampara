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
      className={`relative overflow-hidden rounded-3xl border border-black/[0.07] bg-white p-6 shadow-craft-sm transition-all duration-200 hover:shadow-craft-md dark:border-white/[0.08] dark:bg-[#141419] ${className}`}
    >
      {children}
    </div>
  )
}
