import type { ReactNode } from 'react'

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex rounded-full bg-saffron/15 px-2.5 py-0.5 text-[11px] font-medium tracking-wide text-saffron-ink uppercase">
      {children}
    </span>
  )
}
