import type { ReactNode } from 'react'

export type BadgeVariant = 'neutral' | 'accent' | 'success' | 'warning'

const badgeStyles: Record<BadgeVariant, { container: string; dot: string }> = {
  neutral: {
    container:
      'border-black/[0.06] bg-neutral-100/90 text-neutral-700 dark:border-white/[0.08] dark:bg-neutral-800/90 dark:text-neutral-300',
    dot: 'bg-neutral-400 dark:bg-neutral-500',
  },
  accent: {
    container:
      'border-indigo-500/20 bg-indigo-50/80 text-indigo-700 dark:border-indigo-400/20 dark:bg-indigo-950/40 dark:text-indigo-300',
    dot: 'bg-indigo-500',
  },
  success: {
    container:
      'border-emerald-500/20 bg-emerald-50/80 text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-950/40 dark:text-emerald-300',
    dot: 'bg-emerald-500',
  },
  warning: {
    container:
      'border-amber-500/20 bg-amber-50/80 text-amber-700 dark:border-amber-400/20 dark:bg-amber-950/40 dark:text-amber-300',
    dot: 'bg-amber-500',
  },
}

export function Badge({
  children,
  variant = 'neutral',
  className = '',
}: {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
}) {
  const { container, dot } = badgeStyles[variant]
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${container} ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {children}
    </span>
  )
}
