import type { ThemeMode } from '../domain/types'

export function ThemeToggle({
  theme,
  onChange,
}: {
  theme: ThemeMode
  onChange: (theme: ThemeMode) => void
}) {
  const next = theme === 'light' ? 'dark' : 'light'
  return (
    <button
      type="button"
      onClick={() => onChange(next)}
      className="rounded-full px-3 py-1.5 text-sm ring-1 ring-ink/15 hover:bg-ink/5 dark:ring-cream/20 dark:hover:bg-cream/10"
      aria-label={`Switch to ${next} mode`}
    >
      {theme === 'light' ? 'Night' : 'Day'}
    </button>
  )
}
