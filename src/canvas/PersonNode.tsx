import { Handle, Position, type Node, type NodeProps } from '@xyflow/react'
import { displayName } from '../domain/graph'
import type { Person, TemplateId } from '../domain/types'

export type PersonNodeData = {
  person: Person
  selected: boolean
  template: TemplateId
}

const genderTone: Record<Person['gender'], string> = {
  female: 'from-maroon/90 to-saffron/80',
  male: 'from-teal to-teal-ink',
  other: 'from-saffron to-gold',
  unspecified: 'from-ink/80 to-maroon/60',
}

export function PersonNode({ data }: NodeProps<Node<PersonNodeData>>) {
  const { person, selected } = data
  const name = displayName(person)
  const late = person.isLate

  return (
    <article
      className={[
        'w-[248px] rounded-2xl border bg-white/90 p-3 shadow-[0_18px_40px_-28px_rgba(42,24,16,0.55)] backdrop-blur-md dark:bg-ink/80',
        selected
          ? 'border-gold ring-2 ring-gold/50'
          : 'border-maroon/15 dark:border-cream/15',
        late ? 'opacity-80' : '',
      ].join(' ')}
    >
      <Handle type="target" position={Position.Top} className="!opacity-0" />
      <Handle type="source" position={Position.Bottom} className="!opacity-0" />
      <Handle
        type="target"
        position={Position.Left}
        id="l"
        className="!opacity-0"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="r"
        className="!opacity-0"
      />
      <div className="flex gap-3">
        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br text-sm font-semibold text-cream ${genderTone[person.gender]}`}
        >
          {person.photoDataUrl ? (
            <img
              src={person.photoDataUrl}
              alt=""
              className={`h-full w-full object-cover ${late ? 'grayscale' : ''}`}
            />
          ) : (
            <span>{initials(name)}</span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-[15px] leading-tight font-semibold text-ink dark:text-cream">
              {name}
            </h3>
            {late ? (
              <span className="rounded-full bg-ink/10 px-1.5 py-0.5 text-[10px] tracking-wide text-ink/70 uppercase dark:bg-cream/10 dark:text-cream/70">
                Late
              </span>
            ) : null}
          </div>
          <p className="mt-0.5 truncate text-[11px] text-ink/55 dark:text-cream/55">
            {person.familyName || 'Family name unset'}
          </p>
          <p className="truncate text-[11px] text-ink/55 dark:text-cream/55">
            {person.livingPlace || 'Place unknown'}
            {late && person.deathYear ? ` · ${person.deathYear}` : ''}
          </p>
        </div>
      </div>
    </article>
  )
}

function initials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}
