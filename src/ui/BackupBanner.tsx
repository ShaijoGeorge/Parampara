import { Button } from './Button'

export function BackupBanner({ onExport }: { onExport?: () => void }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-black/[0.06] bg-neutral-100/70 p-4 text-xs text-neutral-700 sm:flex-row sm:items-center sm:justify-between dark:border-white/[0.08] dark:bg-neutral-900/60 dark:text-neutral-300">
      <div className="flex items-center gap-2.5">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500/15 text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
          🔒
        </span>
        <p className="leading-relaxed">
          Stored <strong>locally on this device</strong> in browser IndexedDB. Export an archive backup before clearing browser data.
        </p>
      </div>
      {onExport ? (
        <Button variant="secondary" type="button" className="!py-1.5 text-xs shrink-0" onClick={onExport}>
          Export JSON
        </Button>
      ) : null}
    </div>
  )
}
