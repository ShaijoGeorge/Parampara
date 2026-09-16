import { TEMPLATES } from '../../canvas/templates'
import type { TemplateId } from '../../domain/types'
import { Badge } from '../../ui/Badge'

function TemplateMiniIcon({ id }: { id: TemplateId }) {
  if (id === 'pedigree') {
    return (
      <svg className="h-full w-full p-4 opacity-75" viewBox="0 0 100 60" fill="none" stroke="currentColor">
        {/* Pedigree tree illustration */}
        <rect x="42" y="6" width="16" height="10" rx="3" strokeWidth="2" />
        <line x1="50" y1="16" x2="50" y2="28" strokeWidth="1.5" />
        <line x1="22" y1="28" x2="78" y2="28" strokeWidth="1.5" />
        <line x1="22" y1="28" x2="22" y2="38" strokeWidth="1.5" />
        <line x1="50" y1="28" x2="50" y2="38" strokeWidth="1.5" />
        <line x1="78" y1="28" x2="78" y2="38" strokeWidth="1.5" />
        <rect x="14" y="38" width="16" height="10" rx="3" strokeWidth="2" />
        <rect x="42" y="38" width="16" height="10" rx="3" strokeWidth="2" />
        <rect x="70" y="38" width="16" height="10" rx="3" strokeWidth="2" />
      </svg>
    )
  }
  if (id === 'river') {
    return (
      <svg className="h-full w-full p-4 opacity-75" viewBox="0 0 100 60" fill="none" stroke="currentColor">
        {/* River horizontal flow */}
        <rect x="8" y="25" width="16" height="10" rx="3" strokeWidth="2" />
        <path d="M24 30 C 36 30, 36 16, 46 16" strokeWidth="1.5" />
        <path d="M24 30 C 36 30, 36 44, 46 44" strokeWidth="1.5" />
        <rect x="46" y="11" width="16" height="10" rx="3" strokeWidth="2" />
        <rect x="46" y="39" width="16" height="10" rx="3" strokeWidth="2" />
        <line x1="62" y1="16" x2="76" y2="16" strokeWidth="1.5" />
        <line x1="62" y1="44" x2="76" y2="44" strokeWidth="1.5" />
        <rect x="76" y="11" width="16" height="10" rx="3" strokeWidth="2" />
        <rect x="76" y="39" width="16" height="10" rx="3" strokeWidth="2" />
      </svg>
    )
  }
  if (id === 'mandala') {
    return (
      <svg className="h-full w-full p-4 opacity-75" viewBox="0 0 100 60" fill="none" stroke="currentColor">
        {/* Concentric Lotus Mandala */}
        <circle cx="50" cy="30" r="6" strokeWidth="2" />
        <circle cx="50" cy="30" r="16" strokeWidth="1.5" strokeDasharray="3 2" />
        <circle cx="50" cy="30" r="26" strokeWidth="1" strokeDasharray="4 3" />
        <circle cx="50" cy="14" r="3" fill="currentColor" />
        <circle cx="50" cy="46" r="3" fill="currentColor" />
        <circle cx="34" cy="30" r="3" fill="currentColor" />
        <circle cx="66" cy="30" r="3" fill="currentColor" />
        <circle cx="38" cy="18" r="2.5" fill="currentColor" />
        <circle cx="62" cy="18" r="2.5" fill="currentColor" />
        <circle cx="38" cy="42" r="2.5" fill="currentColor" />
        <circle cx="62" cy="42" r="2.5" fill="currentColor" />
      </svg>
    )
  }
  return (
    <svg className="h-full w-full p-4 opacity-75" viewBox="0 0 100 60" fill="none" stroke="currentColor">
      {/* Compact clan matrix */}
      <rect x="12" y="12" width="18" height="12" rx="2" strokeWidth="1.5" />
      <rect x="41" y="12" width="18" height="12" rx="2" strokeWidth="1.5" />
      <rect x="70" y="12" width="18" height="12" rx="2" strokeWidth="1.5" />
      <rect x="12" y="36" width="18" height="12" rx="2" strokeWidth="1.5" />
      <rect x="41" y="36" width="18" height="12" rx="2" strokeWidth="1.5" />
      <rect x="70" y="36" width="18" height="12" rx="2" strokeWidth="1.5" />
      <line x1="30" y1="18" x2="41" y2="18" strokeWidth="1" />
      <line x1="59" y1="18" x2="70" y2="18" strokeWidth="1" />
      <line x1="21" y1="24" x2="21" y2="36" strokeWidth="1" />
      <line x1="50" y1="24" x2="50" y2="36" strokeWidth="1" />
      <line x1="79" y1="24" x2="79" y2="36" strokeWidth="1" />
    </svg>
  )
}

export function TemplateGallery({
  current,
  onPick,
}: {
  current: TemplateId
  onPick: (id: TemplateId) => void
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {TEMPLATES.map((item) => {
        const active = item.id === current
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onPick(item.id)}
            className={`group relative flex flex-col rounded-3xl border p-4 text-left transition-all duration-300 cursor-pointer active:scale-[0.98] ${
              active
                ? 'border-gold bg-gold/10 ring-2 ring-gold shadow-[0_12px_30px_-8px_rgba(201,162,39,0.35)] dark:bg-gold/15'
                : 'border-gold/20 bg-white/70 hover:border-gold/60 hover:bg-gold/5 dark:border-gold/15 dark:bg-ink/50 dark:hover:bg-gold/10'
            }`}
          >
            {/* Visual Silhouette Miniature */}
            <div
              className="relative mb-3.5 flex h-28 w-full items-center justify-center overflow-hidden rounded-2xl shadow-inner border border-gold/20 text-ink dark:text-cream"
              style={{ background: item.paper }}
            >
              <TemplateMiniIcon id={item.id} />
              <div className="absolute top-2 right-2">
                <Badge>{item.tag}</Badge>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2">
              <p className="font-display text-lg font-bold tracking-tight text-ink dark:text-cream">
                {item.name}
              </p>
              {active && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold text-xs font-bold text-ink shadow-xs">
                  ✓
                </span>
              )}
            </div>

            <p className="mt-1 text-xs leading-relaxed text-ink/65 dark:text-cream/65">
              {item.description}
            </p>
          </button>
        )
      })}
    </div>
  )
}
