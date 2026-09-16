export function QuotaNote({
  usage,
  quota,
}: {
  usage: number
  quota: number
}) {
  if (!quota) return null
  const ratio = usage / quota
  if (ratio < 0.7) return null
  const pct = Math.round(ratio * 100)
  return (
    <p
      role="status"
      className="rounded-xl border border-amber-500/20 bg-amber-500/10 px-3 py-2 text-xs font-medium text-amber-700 dark:text-amber-300"
    >
      This browser is using {pct}% of its storage quota. Export a backup and
      remove unused photos if saves start failing.
    </p>
  )
}
