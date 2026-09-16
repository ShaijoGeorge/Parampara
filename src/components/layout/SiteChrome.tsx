import { Link, NavLink } from 'react-router-dom'
import type { ThemeMode } from '../../domain/types'
import { ThemeToggle } from '../../ui/ThemeToggle'

export function SiteHeader({
  theme,
  onTheme,
}: {
  theme: ThemeMode
  onTheme: (theme: ThemeMode) => void
}) {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-full px-3 py-1.5 text-sm ${
      isActive
        ? 'bg-maroon text-cream'
        : 'text-ink/80 hover:bg-ink/5 dark:text-cream/80 dark:hover:bg-cream/10'
    }`

  return (
    <header className="no-print sticky top-0 z-40 border-b border-maroon/10 bg-cream/80 backdrop-blur-md dark:border-cream/10 dark:bg-ink/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-to-br from-saffron to-maroon font-display text-cream">
            प
          </span>
          <span className="font-display text-xl tracking-tight text-ink dark:text-cream">
            Parampara
          </span>
        </Link>
        <nav className="flex items-center gap-1">
          <NavLink to="/trees" className={linkClass}>
            Trees
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>
          <ThemeToggle theme={theme} onChange={onTheme} />
        </nav>
      </div>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="no-print border-t border-maroon/10 px-4 py-8 text-sm text-ink/60 dark:border-cream/10 dark:text-cream/60">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
        <p>Parampara keeps lineage on your device.</p>
        <div className="flex gap-4">
          <Link to="/privacy">Privacy</Link>
          <Link to="/about">About</Link>
          <Link to="/playground">UI kit</Link>
        </div>
      </div>
    </footer>
  )
}
