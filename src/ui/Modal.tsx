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
        className="absolute inset-0 bg-ink/45 backdrop-blur-sm"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-auto rounded-3xl bg-cream p-6 shadow-2xl dark:bg-ink dark:text-cream"
      >
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 id="modal-title" className="font-display text-2xl">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-2 py-1 text-sm opacity-70 hover:opacity-100"
          >
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
