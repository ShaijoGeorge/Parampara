import { Handle, Position, type Node, type NodeProps } from '@xyflow/react'
import { displayName } from '../domain/graph'
import type { Person, TemplateId } from '../domain/types'

export type PersonNodeData = {
  person: Person
  selected: boolean
  template: TemplateId
  isRoot?: boolean
  onAddRelative?: (kind: 'parent' | 'spouse' | 'child' | 'sibling') => void
}

const genderAesthetics: Record<
  Person['gender'],
  { gradient: string; ring: string; tag: string }
> = {
  female: {
    gradient: 'from-[#8b1e3f] via-[#b3395b] to-[#d96f32]',
    ring: 'ring-maroon/30 dark:ring-maroon/50',
    tag: 'F',
  },
  male: {
    gradient: 'from-[#0a4a45] via-[#0c6b65] to-[#1f4e79]',
    ring: 'ring-teal/30 dark:ring-teal/50',
    tag: 'M',
  },
  other: {
    gradient: 'from-[#d96f32] via-[#e59b2c] to-[#c9a227]',
    ring: 'ring-gold/30 dark:ring-gold/50',
    tag: 'O',
  },
  unspecified: {
    gradient: 'from-[#231915] via-[#4a342c] to-[#7d1634]',
    ring: 'ring-gold/20 dark:ring-gold/40',
    tag: '—',
  },
}

export function PersonNode({ data }: NodeProps<Node<PersonNodeData>>) {
  const { person, selected, isRoot } = data
  const name = displayName(person)
  const late = person.isLate
  const aesthetic = genderAesthetics[person.gender]

  return (
    <article
      className={[
        'group relative w-[256px] rounded-3xl p-3.5 transition-all duration-300 backdrop-blur-xl',
        'border',
        selected
          ? 'border-gold bg-cream/95 ring-4 ring-gold/40 shadow-[0_20px_50px_-15px_rgba(201,162,39,0.45)] dark:bg-[#1f1510]/95 dark:ring-gold/30'
          : 'border-gold/30 bg-cream/90 hover:border-gold/70 hover:shadow-[0_20px_45px_-15px_rgba(201,162,39,0.25)] hover:-translate-y-1 dark:border-gold/20 dark:bg-[#18100c]/90',
        late ? 'opacity-90' : '',
      ].join(' ')}
    >
      {/* Decorative Corner Filigree Marks */}
      <div className="pointer-events-none absolute top-1.5 left-1.5 h-2 w-2 border-t-2 border-l-2 border-gold/40 rounded-tl-sm" />
      <div className="pointer-events-none absolute top-1.5 right-1.5 h-2 w-2 border-t-2 border-r-2 border-gold/40 rounded-tr-sm" />
      <div className="pointer-events-none absolute bottom-1.5 left-1.5 h-2 w-2 border-b-2 border-l-2 border-gold/40 rounded-bl-sm" />
      <div className="pointer-events-none absolute bottom-1.5 right-1.5 h-2 w-2 border-b-2 border-r-2 border-gold/40 rounded-br-sm" />

      {/* Connection Handles */}
      <Handle type="target" position={Position.Top} className="!h-2.5 !w-2.5 !border-2 !border-gold !bg-cream dark:!bg-ink !opacity-0 group-hover:!opacity-100 transition-opacity" />
      <Handle type="source" position={Position.Bottom} className="!h-2.5 !w-2.5 !border-2 !border-gold !bg-cream dark:!bg-ink !opacity-0 group-hover:!opacity-100 transition-opacity" />
      <Handle type="target" position={Position.Left} id="l" className="!h-2.5 !w-2.5 !border-2 !border-gold !bg-cream dark:!bg-ink !opacity-0 group-hover:!opacity-100 transition-opacity" />
      <Handle type="source" position={Position.Right} id="r" className="!h-2.5 !w-2.5 !border-2 !border-gold !bg-cream dark:!bg-ink !opacity-0 group-hover:!opacity-100 transition-opacity" />

      <div className="flex items-center gap-3">
        {/* Cameo Portrait Frame */}
        <div className="relative shrink-0">
          <div
            className={`relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl p-0.5 shadow-md transition-transform duration-300 group-hover:scale-105 bg-gradient-to-br from-gold-light via-gold to-gold-dark`}
          >
            <div
              className={`flex h-full w-full items-center justify-center overflow-hidden rounded-[14px] bg-gradient-to-br text-base font-bold text-cream ${aesthetic.gradient}`}
            >
              {person.photoDataUrl ? (
                <img
                  src={person.photoDataUrl}
                  alt={name}
                  className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-110 ${
                    late ? 'grayscale contrast-125' : ''
                  }`}
                />
              ) : (
                <span className="font-serif tracking-wider drop-shadow-sm">
                  {initials(name)}
                </span>
              )}
            </div>
          </div>

          {/* Root Crown Indicator */}
          {isRoot && (
            <div
              className="absolute -top-1.5 -left-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-tr from-gold to-gold-light text-[10px] text-ink shadow-md"
              title="Tree Root"
            >
              👑
            </div>
          )}

          {/* Sacred Diya/Memorial Indicator */}
          {late && (
            <div
              className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-ink/80 text-[10px] text-gold border border-gold/40 shadow-xs"
              title="Remembered as Late"
            >
              🪔
            </div>
          )}
        </div>

        {/* Member Details */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-1">
            <h3 className="font-serif text-[15px] font-bold leading-snug text-ink dark:text-cream truncate">
              {name}
            </h3>
            {late && (
              <span className="shrink-0 rounded-full border border-gold/30 bg-gold/10 px-1.5 py-0.5 text-[9px] font-bold tracking-widest text-maroon uppercase dark:text-gold-light">
                Late
              </span>
            )}
          </div>

          <p className="truncate text-xs font-medium text-maroon/80 dark:text-gold/90 mt-0.5">
            {person.familyName ? `${person.familyName} clan` : 'Family name unset'}
          </p>

          <div className="mt-1 flex items-center gap-1.5 text-[11px] text-ink/60 dark:text-cream/60 truncate">
            {person.livingPlace ? (
              <span className="truncate">{person.livingPlace}</span>
            ) : (
              <span className="italic opacity-60">Place unset</span>
            )}
            {late && person.deathYear ? (
              <>
                <span className="opacity-40">·</span>
                <span className="font-mono text-[10px]">†{person.deathYear}</span>
              </>
            ) : null}
          </div>
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
