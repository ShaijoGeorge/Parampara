import { Handle, Position, type Node, type NodeProps } from '@xyflow/react'
import { displayName } from '../domain/graph'
import type { Person, TemplateId } from '../domain/types'
import { CharacterAvatar } from '../ui/CharacterAvatar'
import { GenderBadge } from '../ui/GenderIcon'

export type PersonNodeData = {
  person: Person
  selected: boolean
  template: TemplateId
  isRoot?: boolean
  onAddRelative?: (kind: 'parent' | 'spouse' | 'child' | 'sibling') => void
  [key: string]: unknown
}

export function PersonNode({ data }: NodeProps<Node<PersonNodeData>>) {
  const { person, selected, isRoot } = data
  const name = displayName(person)
  const late = person.isLate
  const familyName = person.familyName?.trim()

  // Calculate age / year display (automatically calculate age if birthYear is given)
  let ageDisplay: string | null = null
  let effectiveAge = person.age
  if ((effectiveAge === undefined || isNaN(effectiveAge)) && person.birthYear && !isNaN(person.birthYear)) {
    const endYear =
      late && person.deathYear && !isNaN(person.deathYear) && person.deathYear >= person.birthYear
        ? person.deathYear
        : new Date().getFullYear()
    const calc = endYear - person.birthYear
    if (calc >= 0 && calc <= 150) {
      effectiveAge = calc
    }
  }

  if (effectiveAge !== undefined && !isNaN(effectiveAge)) {
    ageDisplay = late ? `Passed at ${effectiveAge}` : `Age ${effectiveAge}`
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
        'group relative w-[140px] h-[140px] rounded-2xl p-2.5 flex flex-col items-center justify-center text-center transition-all duration-200 backdrop-blur-md select-none',
        'border',
        selected
          ? 'border-indigo-500 bg-white ring-2 ring-indigo-500/25 shadow-craft-md dark:border-indigo-400 dark:bg-[#181820] dark:ring-indigo-400/25'
          : late
            ? 'border-stone-300/90 bg-stone-50/95 dark:border-stone-700/80 dark:bg-[#141418]/95 shadow-craft-xs ring-1 ring-stone-400/20 hover:border-stone-400 dark:hover:border-stone-600'
            : 'border-black/[0.07] bg-white/95 hover:border-black/20 hover:shadow-craft-md hover:-translate-y-0.5 dark:border-white/[0.08] dark:bg-[#141419]/95 dark:hover:border-white/20',
      ].join(' ')}
    >
      {/* Subtle Connection Handles with explicit IDs */}
      <Handle
        type="target"
        position={Position.Top}
        id="t"
        className="!h-2 !w-2 !border !border-neutral-300 !bg-white dark:!border-neutral-600 dark:!bg-neutral-800 !opacity-0 group-hover:!opacity-100 transition-opacity"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
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

      {/* Root Star Badge (Top-Left corner) */}
      {isRoot && (
        <div
          className="absolute top-2 left-2 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[9px] text-amber-950 font-bold shadow-xs z-10"
          title="Tree Root Ancestor"
        >
          ★
        </div>
      )}

      {/* Late / Deceased Badge (Top-Right corner) */}
      {late && (
        <span
          className="absolute top-2 right-2 inline-flex items-center gap-0.5 rounded-full border border-stone-300/80 dark:border-stone-700 bg-stone-100/90 dark:bg-stone-900/80 px-1.5 py-0.5 text-[8.5px] font-medium text-stone-600 dark:text-stone-300 z-10"
          title="Departed Ancestor"
        >
          <span className="text-[7px] text-amber-500">✦</span> Late
        </span>
      )}

      {/* Centered Avatar Cameo */}
      <div className="relative shrink-0">
        <CharacterAvatar
          photoDataUrl={person.photoDataUrl}
          gender={person.gender}
          name={name}
          isLate={late}
          className="h-11 w-11"
        />

        {/* Gender Icon Badge overlaid on bottom-right of avatar */}
        <GenderBadge
          gender={person.gender}
          size="md"
          className="absolute -bottom-1 -right-1 shadow-xs"
        />
      </div>

      {/* Centered Name: Strictly fits inside the square */}
      <div className="w-full max-w-[124px] mt-1.5 px-1 min-w-0 overflow-hidden">
        <h3
          className="text-xs font-bold tracking-tight text-neutral-900 dark:text-neutral-100 line-clamp-2 leading-[15px] text-center break-words [overflow-wrap:anywhere]"
          title={name}
        >
          {name}
        </h3>
      </div>

      {/* Floating Quick Details Popover on Hover */}
      <div className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-[220px] pointer-events-none opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-150 ease-out z-[1000]">
        <div className="relative rounded-xl border border-neutral-200/90 dark:border-neutral-800 bg-white/95 dark:bg-[#16161f]/95 backdrop-blur-xl p-3 shadow-craft-xl text-left">
          {/* Pointer notch arrow centered */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 h-2 w-2 rotate-45 border-t border-l border-neutral-200/90 dark:border-neutral-800 bg-white/95 dark:bg-[#16161f]/95" />

          {/* Header with full name and status */}
          <div className="flex items-start justify-between gap-1.5 mb-2 pb-1.5 border-b border-neutral-100 dark:border-neutral-800/80">
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 truncate">
                {name}
              </h4>
              {familyName ? (
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
                  Family: <span className="font-medium text-neutral-700 dark:text-neutral-300">{familyName}</span>
                </p>
              ) : null}
            </div>

            {late ? (
              <span className="shrink-0 inline-flex items-center gap-1 rounded-full border border-stone-300/80 dark:border-stone-700 bg-stone-100/90 dark:bg-stone-900/60 px-1.5 py-0.5 text-[9px] font-medium text-stone-600 dark:text-stone-300">
                <span className="text-[8px] text-amber-500">✦</span> Late
              </span>
            ) : (
              <span className="shrink-0 inline-flex items-center gap-1 rounded-full border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 text-[9px] font-medium text-emerald-700 dark:text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Living
              </span>
            )}
          </div>

          {/* Details Grid */}
          <div className="space-y-1 text-[11px]">
            {/* Age & Lifespan */}
            {ageDisplay ? (
              <div className="flex items-center justify-between text-neutral-700 dark:text-neutral-300">
                <span className="text-neutral-500 dark:text-neutral-400">Age:</span>
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                  {ageDisplay}
                </span>
              </div>
            ) : null}

            {/* Birth / Death Years if not already in ageDisplay */}
            {person.birthYear || person.deathYear ? (
              <div className="flex items-center justify-between text-neutral-700 dark:text-neutral-300">
                <span className="text-neutral-500 dark:text-neutral-400">Years:</span>
                <span className="font-medium text-neutral-800 dark:text-neutral-200">
                  {person.birthYear && person.deathYear
                    ? `${person.birthYear} – ${person.deathYear}`
                    : person.birthYear
                      ? `b. ${person.birthYear}`
                      : `† ${person.deathYear}`}
                </span>
              </div>
            ) : null}

            {/* Gender */}
            <div className="flex items-center justify-between text-neutral-700 dark:text-neutral-300">
              <span className="text-neutral-500 dark:text-neutral-400">Gender:</span>
              <span className="capitalize font-medium text-neutral-800 dark:text-neutral-200">
                {person.gender}
              </span>
            </div>

            {/* Living Place */}
            {person.livingPlace?.trim() ? (
              <div className="flex items-center justify-between text-neutral-700 dark:text-neutral-300">
                <span className="text-neutral-500 dark:text-neutral-400">Place:</span>
                <span
                  className="truncate max-w-[130px] font-medium text-neutral-800 dark:text-neutral-200"
                  title={person.livingPlace}
                >
                  {person.livingPlace}
                </span>
              </div>
            ) : null}

            {/* Notes snippet */}
            {person.notes?.trim() ? (
              <div className="mt-1 pt-1.5 border-t border-neutral-100 dark:border-neutral-800/60">
                <p
                  className="text-[10px] text-neutral-500 dark:text-neutral-400 italic line-clamp-2"
                  title={person.notes}
                >
                  "{person.notes}"
                </p>
              </div>
            ) : null}
          </div>

          {/* Footer hint */}
          <div className="mt-2 pt-1.5 border-t border-neutral-100 dark:border-neutral-800/60 text-[9.5px] text-neutral-400 dark:text-neutral-500 text-center flex items-center justify-center gap-1">
            <span>Click card to edit</span>
          </div>
        </div>
      </div>
    </article>
  )
}
