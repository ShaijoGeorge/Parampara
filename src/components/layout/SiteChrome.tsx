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
    `rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-150 ${
      isActive
        ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-xs'
        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/80 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-800/80'
    }`

  return (
    <header className="no-print sticky top-4 z-50 mx-auto w-full max-w-4xl px-4 transition-all duration-200">
      <div className="flex h-13 items-center justify-between rounded-full border border-black/[0.08] bg-white/85 px-3 py-1.5 shadow-craft-md backdrop-blur-xl transition-colors dark:border-white/[0.1] dark:bg-[#121217]/85">
        {/* Brand */}
        <Link to="/" className="group flex items-center gap-2.5 pl-1.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-sm font-bold text-white shadow-xs transition-transform duration-200 group-hover:scale-105">
            प
          </div>
          <span className="font-sans text-sm font-semibold tracking-tight text-neutral-900 dark:text-white">
            Parampara
          </span>
        </Link>

        {/* Center Nav */}
        <nav className="flex items-center gap-1">
          <NavLink to="/trees" className={linkClass}>
            Studio
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>
          <NavLink to="/playground" className={linkClass}>
            Components
          </NavLink>
        </nav>

        {/* Right CTA & Theme */}
        <div className="flex items-center gap-2 pr-1">
          <Link
            to="/trees"
            className="hidden sm:inline-flex items-center justify-center rounded-full bg-neutral-900 px-3.5 py-1.5 text-xs font-medium text-white shadow-xs transition-all hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 active:scale-95"
          >
            + New Tree
          </Link>
          <ThemeToggle theme={theme} onChange={onTheme} />
        </div>
      </div>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="no-print border-t border-black/[0.06] bg-white/50 px-4 py-12 text-xs text-neutral-500 backdrop-blur-md dark:border-white/[0.06] dark:bg-[#0c0c10]/50 dark:text-neutral-400">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-600 text-xs font-bold text-white">
              प
            </div>
            <span className="font-semibold text-neutral-900 dark:text-white">Parampara</span>
            <span className="text-neutral-400 dark:text-neutral-600">·</span>
            <span>Client-First Family Trees</span>
          </div>

          <div className="flex items-center gap-5">
            <Link to="/trees" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              Studio
            </Link>
            <Link to="/about" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              About
            </Link>
            <Link to="/privacy" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              Privacy
            </Link>
            <Link to="/playground" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              UI Kit
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-black/[0.04] pt-6 dark:border-white/[0.04] text-[11px] text-neutral-400 dark:text-neutral-500">
          <p>© {new Date().getFullYear()} Parampara. Stored securely on your device.</p>
          <p>Designed with Craft-grade simplicity.</p>
        </div>
      </div>
    </footer>
  )
}
