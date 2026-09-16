import type { ReactNode } from 'react'
import { useEffect } from 'react'

export function Modal({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean
  title: string
  onClose: () => void
  children: ReactNode
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
      <button
        type="button"
        className="fixed inset-0 bg-ink/60 backdrop-blur-md transition-opacity duration-300"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-gold/30 bg-cream/95 p-7 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-all duration-300 dark:border-gold/25 dark:bg-[#18100c]/95 dark:text-cream"
      >
        <div className="mb-5 flex items-center justify-between border-b border-gold/15 pb-4">
          <h2 id="modal-title" className="font-display text-2xl font-bold tracking-tight text-ink dark:text-cream">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/10 text-xs text-ink/60 transition-all hover:border-gold hover:text-maroon dark:border-cream/10 dark:text-cream/60 dark:hover:border-gold dark:hover:text-gold"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
