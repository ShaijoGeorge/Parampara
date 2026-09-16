import type { ThemeMode } from '../domain/types'

export function ThemeToggle({
  theme,
  onChange,
}: {
  theme: ThemeMode
  onChange: (theme: ThemeMode) => void
}) {
  const isDark = theme === 'dark'
  const next = isDark ? 'light' : 'dark'

  return (
    <button
      type="button"
      onClick={() => onChange(next)}
      className="group relative flex h-8 w-8 items-center justify-center rounded-full border border-black/[0.06] bg-neutral-100/80 text-neutral-700 transition-all hover:bg-neutral-200 dark:border-white/[0.08] dark:bg-neutral-800/80 dark:text-neutral-300 dark:hover:bg-neutral-700 cursor-pointer active:scale-95"
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} mode`}
    >
      {isDark ? (
        <svg
          className="h-3.5 w-3.5 text-amber-400 transition-transform duration-200 group-hover:-rotate-12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
          />
        </svg>
      ) : (
        <svg
          className="h-3.5 w-3.5 text-neutral-600 transition-transform duration-200 group-hover:rotate-45"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
          <path
            strokeLinecap="round"
            d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41m14.14-14.14l-1.41 1.41"
          />
        </svg>
      )}
    </button>
  )
}
