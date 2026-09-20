import { Handle, Position, type Node, type NodeProps } from '@xyflow/react'
import { displayName } from '../domain/graph'
import type { Person, TemplateId } from '../domain/types'
import { GenderBadge, GENDER_THEMES } from '../ui/GenderIcon'

export type PersonNodeData = {
  person: Person
  selected: boolean
  template: TemplateId
  isRoot?: boolean
  onAddRelative?: (kind: 'parent' | 'spouse' | 'child' | 'sibling') => void
}

export function PersonNode({ data }: NodeProps<Node<PersonNodeData>>) {
  const { person, selected, isRoot } = data
  const name = displayName(person)
  const late = person.isLate
  const hasPhoto = Boolean(person.photoDataUrl)
  const familyName = person.familyName?.trim()
  const genderTheme = GENDER_THEMES[person.gender] ?? GENDER_THEMES.unspecified

  // Calculate age / year display (optional detail: only show if present)
  let ageDisplay: string | null = null
  if (person.age !== undefined && !isNaN(person.age)) {
    ageDisplay = late ? `Passed at ${person.age}` : `Age ${person.age}`
  } else if (person.birthYear && person.deathYear) {
    ageDisplay = `${person.birthYear}–${person.deathYear}`
  } else if (person.deathYear) {
    ageDisplay = `†${person.deathYear}`
  } else if (person.birthYear) {
    ageDisplay = `b. ${person.birthYear}`
  }

  return (
    <article
      className={[
        'group relative w-[240px] rounded-2xl p-3 transition-all duration-200 backdrop-blur-md',
        'border',
        selected
          ? 'border-indigo-500 bg-white ring-2 ring-indigo-500/25 shadow-craft-md dark:border-indigo-400 dark:bg-[#181820] dark:ring-indigo-400/25'
          : late
            ? 'border-stone-300/90 bg-stone-50/95 dark:border-stone-700/80 dark:bg-[#141418]/95 shadow-craft-xs ring-1 ring-stone-400/20 hover:border-stone-400 dark:hover:border-stone-600'
            : 'border-black/[0.07] bg-white/95 hover:border-black/20 hover:shadow-craft-md hover:-translate-y-0.5 dark:border-white/[0.08] dark:bg-[#141419]/95 dark:hover:border-white/20',
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
        {/* Avatar Cameo (Photo if available, otherwise monogram with gender tone) */}
        <div className="relative shrink-0">
          <div
            className={`flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl ring-1 shadow-xs transition-transform duration-200 group-hover:scale-105 ${
              late
                ? 'ring-stone-400/30 dark:ring-stone-600/30 grayscale'
                : 'ring-black/5 dark:ring-white/10'
            }`}
          >
            {hasPhoto ? (
              <img
                src={person.photoDataUrl}
                alt={name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div
                className={`flex h-full w-full items-center justify-center bg-gradient-to-br text-xs font-semibold tracking-wider ${genderTheme.avatarGrad}`}
              >
                {initials(name)}
              </div>
            )}
          </div>

          {/* Gender Icon Badge overlaid on bottom-right of avatar */}
          <GenderBadge
            gender={person.gender}
            size="md"
            className="absolute -bottom-1 -right-1"
          />

          {/* Root Star Badge */}
          {isRoot && (
            <div
              className="absolute -top-1 -left-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[9px] text-amber-950 font-bold shadow-xs"
              title="Tree Root Ancestor"
            >
              ★
            </div>
          )}
        </div>

        {/* Member Details: Only Name and present optional details */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-1.5">
            <h3 className="text-[13px] font-bold tracking-tight text-neutral-900 dark:text-neutral-100 truncate">
              {name}
            </h3>

            {/* Late / Deceased Badge */}
            {late && (
              <span
                className="shrink-0 inline-flex items-center gap-0.5 rounded-full border border-stone-300/80 dark:border-stone-700 bg-stone-100/90 dark:bg-stone-900/60 px-1.5 py-0.5 text-[9px] font-medium text-stone-600 dark:text-stone-300"
                title="Departed Ancestor"
              >
                <span className="text-[8px] text-amber-500">✦</span> Late
              </span>
            )}
          </div>

          {/* Family Name (optional: only if provided) */}
          {familyName ? (
            <p className="truncate text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              {familyName}
            </p>
          ) : null}

          {/* Age / Years (optional: only if provided) */}
          {ageDisplay ? (
            <p className="truncate text-[11px] font-medium text-indigo-600/90 dark:text-indigo-400/90 mt-0.5">
              {ageDisplay}
            </p>
          ) : null}
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
