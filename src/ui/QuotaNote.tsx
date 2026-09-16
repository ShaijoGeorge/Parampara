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
      className="rounded-xl bg-maroon/10 px-3 py-2 text-sm text-maroon dark:bg-gold/10 dark:text-gold"
    >
      This browser is using {pct}% of its storage quota. Export a backup and
      remove unused photos if saves start failing.
    </p>
  )
}
