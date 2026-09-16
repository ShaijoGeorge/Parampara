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

const genderTones: Record<Person['gender'], string> = {
  female: 'from-rose-500 to-amber-500 text-white',
  male: 'from-blue-600 to-indigo-600 text-white',
  other: 'from-violet-500 to-fuchsia-500 text-white',
  unspecified: 'from-neutral-700 to-neutral-900 text-neutral-200',
}

export function PersonNode({ data }: NodeProps<Node<PersonNodeData>>) {
  const { person, selected, isRoot } = data
  const name = displayName(person)
  const late = person.isLate

  return (
    <article
      className={[
        'group relative w-[240px] rounded-2xl p-3 transition-all duration-200 backdrop-blur-md',
        'border',
        selected
          ? 'border-indigo-500 bg-white ring-2 ring-indigo-500/25 shadow-craft-md dark:border-indigo-400 dark:bg-[#181820] dark:ring-indigo-400/25'
          : 'border-black/[0.07] bg-white/95 hover:border-black/20 hover:shadow-craft-md hover:-translate-y-0.5 dark:border-white/[0.08] dark:bg-[#141419]/95 dark:hover:border-white/20',
        late ? 'opacity-85' : '',
      ].join(' ')}
    >
      {/* Subtle Connection Handles */}
      <Handle
        type="target"
        position={Position.Top}
        className="!h-2 !w-2 !border !border-neutral-300 !bg-white dark:!border-neutral-600 dark:!bg-neutral-800 !opacity-0 group-hover:!opacity-100 transition-opacity"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!h-2 !w-2 !border !border-neutral-300 !bg-white dark:!border-neutral-600 dark:!bg-neutral-800 !opacity-0 group-hover:!opacity-100 transition-opacity"
      />
      <Handle
        type="target"
        position={Position.Left}
        id="l"
        className="!h-2 !w-2 !border !border-neutral-300 !bg-white dark:!border-neutral-600 dark:!bg-neutral-800 !opacity-0 group-hover:!opacity-100 transition-opacity"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="r"
        className="!h-2 !w-2 !border !border-neutral-300 !bg-white dark:!border-neutral-600 dark:!bg-neutral-800 !opacity-0 group-hover:!opacity-100 transition-opacity"
      />

      <div className="flex items-center gap-3">
        {/* Avatar Cameo */}
        <div className="relative shrink-0">
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl ring-1 ring-black/5 dark:ring-white/10 shadow-xs">
            {person.photoDataUrl ? (
              <img
                src={person.photoDataUrl}
                alt={name}
                className={`h-full w-full object-cover transition-transform duration-200 group-hover:scale-105 ${
                  late ? 'grayscale' : ''
                }`}
              />
            ) : (
              <div
                className={`flex h-full w-full items-center justify-center bg-gradient-to-br text-xs font-semibold tracking-wider ${genderTones[person.gender]}`}
              >
                {initials(name)}
              </div>
            )}
          </div>

          {/* Root Pill Icon */}
          {isRoot && (
            <div
              className="absolute -top-1 -left-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[9px] text-amber-950 font-bold shadow-xs"
              title="Tree Root"
            >
              ★
            </div>
          )}
        </div>

        {/* Member Details */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-1">
            <h3 className="text-[13px] font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 truncate">
              {name}
            </h3>
            {late && (
              <span className="shrink-0 rounded-full bg-neutral-100 px-1.5 py-0.5 text-[9px] font-medium text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
                Late
              </span>
            )}
          </div>

          <p className="truncate text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            {person.familyName || 'Family clan unset'}
          </p>

          <p className="truncate text-[11px] text-neutral-400 dark:text-neutral-500 mt-0.5">
            {person.livingPlace || 'Place unset'}
            {late && person.deathYear ? ` · †${person.deathYear}` : ''}
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
