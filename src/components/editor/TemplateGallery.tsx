import { TEMPLATES } from '../../canvas/templates'
import type { TemplateId } from '../../domain/types'
import { Badge } from '../../ui/Badge'

export function TemplateGallery({
  current,
  onPick,
}: {
  current: TemplateId
  onPick: (id: TemplateId) => void
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {TEMPLATES.map((item) => {
        const active = item.id === current
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onPick(item.id)}
            className={`rounded-2xl border p-3 text-left transition ${
              active
                ? 'border-gold ring-2 ring-gold/40'
                : 'border-ink/10 hover:border-maroon/30 dark:border-cream/10'
            }`}
          >
            <div
              className="mb-3 h-20 rounded-xl"
              style={{ background: item.paper }}
            />
            <div className="mb-1 flex items-center justify-between gap-2">
              <p className="font-display text-lg">{item.name}</p>
              <Badge>{item.tag}</Badge>
            </div>
            <p className="text-sm text-ink/65 dark:text-cream/65">
              {item.description}
            </p>
          </button>
        )
      })}
    </div>
  )
}
