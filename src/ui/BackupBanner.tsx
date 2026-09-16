import { Button } from './Button'

export function BackupBanner({ onExport }: { onExport?: () => void }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-saffron/30 bg-saffron/10 px-4 py-3 text-sm text-ink sm:flex-row sm:items-center sm:justify-between dark:text-cream">
      <p>
        This tree is saved on <strong>this device</strong> in browser storage —
        not a disposable cache. Export a backup before clearing site data.
      </p>
      {onExport ? (
        <Button variant="gold" type="button" onClick={onExport}>
          Export JSON
        </Button>
      ) : null}
    </div>
  )
}
