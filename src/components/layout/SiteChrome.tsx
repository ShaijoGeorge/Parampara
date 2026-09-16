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
    `relative rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider transition-all duration-200 uppercase ${
      isActive
        ? 'bg-gradient-to-r from-maroon to-maroon-dark text-cream border border-gold/40 shadow-xs'
        : 'text-ink/75 hover:text-maroon hover:bg-gold/10 dark:text-cream/75 dark:hover:text-gold-light dark:hover:bg-cream/5'
    }`

  return (
    <header className="no-print sticky top-0 z-40 border-b border-gold/20 bg-cream/85 backdrop-blur-xl transition-colors duration-300 dark:border-gold/15 dark:bg-[#140e0c]/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        {/* Brand Crest */}
        <Link to="/" className="group flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-light via-saffron to-maroon p-[1.5px] shadow-[0_4px_16px_rgba(201,162,39,0.35)] transition-transform duration-300 group-hover:scale-105">
            <div className="flex h-full w-full items-center justify-center rounded-2xl bg-cream/90 backdrop-blur-xs transition-colors dark:bg-[#19100c]/90">
              <span className="font-display text-xl font-black text-maroon dark:text-gold-light">
                प
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xl font-bold tracking-tight text-ink dark:text-cream">
              Parampara
            </span>
            <span className="text-[10px] font-medium tracking-[0.2em] text-maroon uppercase dark:text-gold">
              Royal Lineage Studio
            </span>
          </div>
        </Link>

        {/* Navigation & Controls */}
        <nav className="flex items-center gap-2 sm:gap-3">
          <div className="hidden items-center gap-1 sm:flex">
            <NavLink to="/trees" className={linkClass}>
              Studio
            </NavLink>
            <NavLink to="/about" className={linkClass}>
              Heritage
            </NavLink>
            <NavLink to="/playground" className={linkClass}>
              Atelier
            </NavLink>
          </div>

          <div className="h-4 w-px bg-gold/25" />

          <Link
            to="/trees"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-gold-light via-gold to-gold-dark px-3.5 py-1.5 text-xs font-bold tracking-wider text-ink uppercase shadow-[0_4px_16px_rgba(201,162,39,0.3)] transition-all duration-200 hover:brightness-110 active:scale-95"
          >
            + New Tree
          </Link>

          <ThemeToggle theme={theme} onChange={onTheme} />
        </nav>
      </div>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="no-print relative border-t border-gold/20 bg-cream/40 px-4 py-12 text-sm text-ink/70 backdrop-blur-md dark:border-gold/15 dark:bg-[#100a07] dark:text-cream/70">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br from-gold to-maroon text-xs font-bold text-cream">
                प
              </div>
              <span className="font-display text-lg font-bold text-ink dark:text-cream">
                Parampara
              </span>
            </div>
            <p className="text-xs leading-relaxed text-ink/65 dark:text-cream/65">
              Honoring origins, kinship, and ancestors. A sovereign lineage canvas crafted with royal archival aesthetics.
            </p>
          </div>

          <div>
            <p className="font-display text-xs font-bold tracking-widest text-maroon uppercase dark:text-gold">
              Navigation
            </p>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <Link to="/trees" className="hover:text-maroon dark:hover:text-gold">
                  Family Trees Studio
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-maroon dark:hover:text-gold">
                  About & Philosophy
                </Link>
              </li>
              <li>
                <Link to="/playground" className="hover:text-maroon dark:hover:text-gold">
                  UI Kit & Silhouettes
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-display text-xs font-bold tracking-widest text-maroon uppercase dark:text-gold">
              Sovereignty
            </p>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <Link to="/privacy" className="hover:text-maroon dark:hover:text-gold">
                  Local-First Privacy
                </Link>
              </li>
              <li>
                <span className="text-ink/60 dark:text-cream/60">
                  Zero Cloud Sync in v1
                </span>
              </li>
              <li>
                <span className="text-ink/60 dark:text-cream/60">
                  Browser IndexedDB Sealed
                </span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-gold/25 bg-gold/5 p-4">
            <p className="text-xs font-semibold text-saffron-ink dark:text-gold-light">
              🛡️ Sovereign Device Storage
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-ink/60 dark:text-cream/60">
              Your portraits and ancestry never leave this browser. Export regular JSON archives for safe keeping.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-gold/15 pt-6 text-xs text-ink/50 dark:text-cream/50">
          <p>© {new Date().getFullYear()} Parampara Family Tree Studio. Built by Shaijo George.</p>
          <p className="font-serif italic">Tradition, drawn by hand.</p>
        </div>
      </div>
    </footer>
  )
}
