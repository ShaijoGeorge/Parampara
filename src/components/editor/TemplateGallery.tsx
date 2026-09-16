import { TEMPLATES } from '../../canvas/templates'
import type { TemplateId } from '../../domain/types'
import { Badge } from '../../ui/Badge'

function TemplateMiniIcon({ id }: { id: TemplateId }) {
  if (id === 'pedigree') {
    return (
      <svg className="h-full w-full p-4 opacity-75" viewBox="0 0 100 60" fill="none" stroke="currentColor">
        {/* Top-Down Pedigree Tree */}
        <rect x="42" y="6" width="16" height="10" rx="3" strokeWidth="1.8" className="stroke-indigo-600 dark:stroke-indigo-400" />
        <line x1="50" y1="16" x2="50" y2="28" strokeWidth="1.5" className="stroke-neutral-400 dark:stroke-neutral-500" />
        <line x1="22" y1="28" x2="78" y2="28" strokeWidth="1.5" className="stroke-neutral-400 dark:stroke-neutral-500" />
        <line x1="22" y1="28" x2="22" y2="38" strokeWidth="1.5" className="stroke-neutral-400 dark:stroke-neutral-500" />
        <line x1="50" y1="28" x2="50" y2="38" strokeWidth="1.5" className="stroke-neutral-400 dark:stroke-neutral-500" />
        <line x1="78" y1="28" x2="78" y2="38" strokeWidth="1.5" className="stroke-neutral-400 dark:stroke-neutral-500" />
        <rect x="14" y="38" width="16" height="10" rx="3" strokeWidth="1.5" className="stroke-neutral-600 dark:stroke-neutral-400" />
        <rect x="42" y="38" width="16" height="10" rx="3" strokeWidth="1.5" className="stroke-neutral-600 dark:stroke-neutral-400" />
        <rect x="70" y="38" width="16" height="10" rx="3" strokeWidth="1.5" className="stroke-neutral-600 dark:stroke-neutral-400" />
      </svg>
    )
  }
  if (id === 'ancestry') {
    return (
      <svg className="h-full w-full p-4 opacity-75" viewBox="0 0 100 60" fill="none" stroke="currentColor">
        {/* Bottom-Up Ancestry Tree */}
        <rect x="42" y="44" width="16" height="10" rx="3" strokeWidth="1.8" className="stroke-teal-600 dark:stroke-teal-400" />
        <line x1="50" y1="44" x2="50" y2="32" strokeWidth="1.5" className="stroke-neutral-400 dark:stroke-neutral-500" />
        <line x1="26" y1="32" x2="74" y2="32" strokeWidth="1.5" className="stroke-neutral-400 dark:stroke-neutral-500" />
        <line x1="26" y1="32" x2="26" y2="24" strokeWidth="1.5" className="stroke-neutral-400 dark:stroke-neutral-500" />
        <line x1="74" y1="32" x2="74" y2="24" strokeWidth="1.5" className="stroke-neutral-400 dark:stroke-neutral-500" />
        <rect x="18" y="14" width="16" height="10" rx="3" strokeWidth="1.5" className="stroke-neutral-600 dark:stroke-neutral-400" />
        <rect x="66" y="14" width="16" height="10" rx="3" strokeWidth="1.5" className="stroke-neutral-600 dark:stroke-neutral-400" />
      </svg>
    )
  }
  if (id === 'hourglass') {
    return (
      <svg className="h-full w-full p-4 opacity-75" viewBox="0 0 100 60" fill="none" stroke="currentColor">
        {/* Center Hourglass */}
        <rect x="42" y="25" width="16" height="10" rx="3" strokeWidth="1.8" className="stroke-amber-600 dark:stroke-amber-400" />
        {/* Upward to parents */}
        <line x1="50" y1="25" x2="50" y2="18" strokeWidth="1.5" className="stroke-neutral-400 dark:stroke-neutral-500" />
        <line x1="26" y1="18" x2="74" y2="18" strokeWidth="1.5" className="stroke-neutral-400 dark:stroke-neutral-500" />
        <rect x="18" y="8" width="16" height="8" rx="2" strokeWidth="1.5" className="stroke-neutral-600 dark:stroke-neutral-400" />
        <rect x="66" y="8" width="16" height="8" rx="2" strokeWidth="1.5" className="stroke-neutral-600 dark:stroke-neutral-400" />
        {/* Downward to children */}
        <line x1="50" y1="35" x2="50" y2="42" strokeWidth="1.5" className="stroke-neutral-400 dark:stroke-neutral-500" />
        <line x1="26" y1="42" x2="74" y2="42" strokeWidth="1.5" className="stroke-neutral-400 dark:stroke-neutral-500" />
        <rect x="18" y="44" width="16" height="8" rx="2" strokeWidth="1.5" className="stroke-neutral-600 dark:stroke-neutral-400" />
        <rect x="66" y="44" width="16" height="8" rx="2" strokeWidth="1.5" className="stroke-neutral-600 dark:stroke-neutral-400" />
      </svg>
    )
  }
  return (
    <svg className="h-full w-full p-4 opacity-75" viewBox="0 0 100 60" fill="none" stroke="currentColor">
      {/* Compact clan matrix */}
      <rect x="12" y="12" width="18" height="12" rx="3" strokeWidth="1.5" className="stroke-blue-600 dark:stroke-blue-400" />
      <rect x="41" y="12" width="18" height="12" rx="3" strokeWidth="1.5" className="stroke-neutral-600 dark:stroke-neutral-400" />
      <rect x="70" y="12" width="18" height="12" rx="3" strokeWidth="1.5" className="stroke-neutral-600 dark:stroke-neutral-400" />
      <rect x="12" y="36" width="18" height="12" rx="3" strokeWidth="1.5" className="stroke-neutral-600 dark:stroke-neutral-400" />
      <rect x="41" y="36" width="18" height="12" rx="3" strokeWidth="1.5" className="stroke-neutral-600 dark:stroke-neutral-400" />
      <rect x="70" y="36" width="18" height="12" rx="3" strokeWidth="1.5" className="stroke-neutral-600 dark:stroke-neutral-400" />
      <line x1="30" y1="18" x2="41" y2="18" strokeWidth="1" className="stroke-neutral-400 dark:stroke-neutral-500" />
      <line x1="59" y1="18" x2="70" y2="18" strokeWidth="1" className="stroke-neutral-400 dark:stroke-neutral-500" />
      <line x1="21" y1="24" x2="21" y2="36" strokeWidth="1" className="stroke-neutral-400 dark:stroke-neutral-500" />
      <line x1="50" y1="24" x2="50" y2="36" strokeWidth="1" className="stroke-neutral-400 dark:stroke-neutral-500" />
      <line x1="79" y1="24" x2="79" y2="36" strokeWidth="1" className="stroke-neutral-400 dark:stroke-neutral-500" />
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
    <div className="grid gap-3.5 sm:grid-cols-2">
      {TEMPLATES.map((item) => {
        const active = item.id === current
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onPick(item.id)}
            className={`group relative flex flex-col rounded-2xl border p-4 text-left transition-all duration-200 cursor-pointer active:scale-[0.98] ${
              active
                ? 'border-indigo-500 bg-white ring-2 ring-indigo-500/20 shadow-craft-md dark:border-indigo-400 dark:bg-[#181820] dark:ring-indigo-400/20'
                : 'border-black/[0.07] bg-white/80 hover:border-black/20 hover:bg-white hover:shadow-craft-sm dark:border-white/[0.08] dark:bg-[#141419]/80 dark:hover:border-white/20 dark:hover:bg-[#141419]'
            }`}
          >
            {/* Visual Silhouette Miniature */}
            <div
              className="relative mb-3.5 flex h-24 w-full items-center justify-center overflow-hidden rounded-xl border border-black/[0.06] dark:border-white/[0.06]"
              style={{ background: item.paper }}
            >
              <TemplateMiniIcon id={item.id} />
              <div className="absolute top-2 right-2">
                <Badge variant={active ? 'accent' : 'neutral'}>{item.tag}</Badge>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                {item.name}
              </p>
              {active && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white shadow-xs">
                  ✓
                </span>
              )}
            </div>

            <p className="mt-1 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
              {item.description}
            </p>
          </button>
        )
      })}
    </div>
  )
}
