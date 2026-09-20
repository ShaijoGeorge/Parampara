import { Handle, Position, type Node, type NodeProps } from '@xyflow/react'
import { useState } from 'react'

export type UnionNodeData = {
  coupleId: string
  parentAId: string
  parentBId: string
  parentAName: string
  parentBName: string
  onAddChild?: (parentAId: string, parentBId: string) => void
  [key: string]: unknown
}

export function UnionNode({ data }: NodeProps<Node<UnionNodeData>>) {
  const [hovered, setHovered] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    data.onAddChild?.(data.parentAId, data.parentBId)
  }

  return (
    <div
      className="group relative flex items-center justify-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Target handle from left spouse */}
      <Handle
        type="target"
        position={Position.Left}
        id="l"
        className="!h-1 !w-1 !border-0 !bg-transparent !opacity-0"
      />

      {/* Source handle to right spouse */}
      <Handle
        type="source"
        position={Position.Right}
        id="r"
        className="!h-1 !w-1 !border-0 !bg-transparent !opacity-0"
      />

      {/* Source handle dropping down to all children of this couple */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        className="!h-1 !w-1 !border-0 !bg-transparent !opacity-0"
      />

      {/* Interactive Union Button / Junction Anchor */}
      <button
        type="button"
        onClick={handleClick}
        title={`Couple: ${data.parentAName} & ${data.parentBName} · Click to add child`}
        className={[
          'flex h-7 w-7 items-center justify-center rounded-full transition-all duration-200 cursor-pointer shadow-xs',
          'border border-rose-300/90 dark:border-rose-500/50 bg-white/95 dark:bg-[#1a1a22]/95',
          'hover:scale-115 hover:border-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50',
          'active:scale-95 text-rose-500 dark:text-rose-400',
        ].join(' ')}
      >
        {hovered ? (
          <span className="text-xs font-bold leading-none text-rose-600 dark:text-rose-400">
            +
          </span>
        ) : (
          /* Interlocking Wedding Rings (⚭) Vector Symbol */
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-3.5 w-3.5 stroke-current"
            strokeWidth="2.2"
            aria-hidden="true"
          >
            <circle cx="9" cy="12" r="4.5" />
            <circle cx="15" cy="12" r="4.5" />
          </svg>
        )}
      </button>

      {/* Micro-Tooltip on hover */}
      {hovered && (
        <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-black/[0.08] dark:border-white/[0.08] bg-neutral-900/90 dark:bg-neutral-100/90 px-2 py-0.5 text-[10px] font-medium text-white dark:text-neutral-900 shadow-craft-sm z-30">
          + Add child to couple
        </div>
      )}
    </div>
  )
}
