import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  type Edge as FlowEdge,
  type Node,
} from '@xyflow/react'
import { useEffect, useMemo, useState } from 'react'
import { displayName, parentsOf } from '../domain/graph'
import type { Edge, Person, TemplateId } from '../domain/types'
import { NODE, layoutFamily } from './layouts'
import { PersonNode } from './PersonNode'
import { templateById } from './templates'
import { UnionNode } from './UnionNode'

const nodeTypes = {
  person: PersonNode,
  union: UnionNode,
}

interface FamilyCanvasProps {
  people: Person[]
  edges: Edge[]
  template: TemplateId
  rootPersonId: string | null
  selectedPersonId: string | null
  onSelect: (personId: string | null) => void
  onAddChildToCouple?: (parentAId: string, parentBId: string) => void
}

export function FamilyCanvas({
  people,
  edges,
  template,
  rootPersonId,
  selectedPersonId,
  onSelect,
  onAddChildToCouple,
}: FamilyCanvasProps) {
  const [nodes, setNodes] = useState<Node[]>([])
  const [flowEdges, setFlowEdges] = useState<FlowEdge[]>([])
  const skin = templateById(template)

  useEffect(() => {
    let cancelled = false
    void layoutFamily(people, edges, template, rootPersonId).then((laid) => {
      if (cancelled) return

      const personNodes: Node[] = []
      for (const item of laid) {
        const person = people.find((p) => p.id === item.id)
        if (!person) continue
        personNodes.push({
          id: person.id,
          position: { x: item.x, y: item.y },
          type: 'person',
          data: {
            person,
            selected: person.id === selectedPersonId,
            template,
            isRoot: person.id === rootPersonId,
          },
        })
      }

      const nodePosMap = new Map<string, { x: number; y: number }>()
      laid.forEach((item) => nodePosMap.set(item.id, { x: item.x, y: item.y }))

      // 1. Identify Couples & create Union Nodes
      const unionNodes: Node[] = []
      const nextEdges: FlowEdge[] = []
      const processedCouples = new Set<string>()
      // Map couple key to unionNodeId
      const coupleToUnionIdMap = new Map<string, string>()

      const spouseEdges = edges.filter((e) => e.type === 'spouse')
      for (const edge of spouseEdges) {
        const p1 = edge.fromId
        const p2 = edge.toId
        const pos1 = nodePosMap.get(p1)
        const pos2 = nodePosMap.get(p2)
        if (!pos1 || !pos2) continue

        const pairKey = [p1, p2].sort().join('--')
        if (processedCouples.has(pairKey)) continue
        processedCouples.add(pairKey)

        const leftId = pos1.x <= pos2.x ? p1 : p2
        const rightId = pos1.x <= pos2.x ? p2 : p1
        const leftPos = pos1.x <= pos2.x ? pos1 : pos2
        const rightPos = pos1.x <= pos2.x ? pos2 : pos1

        const UNION_SIZE = 28
        const unionX = (leftPos.x + NODE.w + rightPos.x) / 2 - UNION_SIZE / 2
        const unionY = (leftPos.y + rightPos.y) / 2 + NODE.h / 2 - UNION_SIZE / 2
        const unionId = `union-${pairKey}`
        coupleToUnionIdMap.set(pairKey, unionId)

        const personA = people.find((p) => p.id === leftId)
        const personB = people.find((p) => p.id === rightId)

        unionNodes.push({
          id: unionId,
          position: { x: unionX, y: unionY },
          type: 'union',
          selectable: false,
          data: {
            coupleId: pairKey,
            parentAId: leftId,
            parentBId: rightId,
            parentAName: personA ? displayName(personA) : 'Parent',
            parentBName: personB ? displayName(personB) : 'Parent',
            onAddChild: onAddChildToCouple,
          },
        })

        // Horizontal spouse bridge: Left -> Union, Union -> Right
        nextEdges.push({
          id: `spouse-l-${pairKey}`,
          source: leftId,
          target: unionId,
          sourceHandle: 'r',
          targetHandle: 'l',
          type: 'straight',
          animated: false,
          style: {
            stroke: '#f43f5e',
            strokeWidth: 2,
            opacity: 0.85,
          },
        })
        nextEdges.push({
          id: `spouse-r-${pairKey}`,
          source: unionId,
          target: rightId,
          sourceHandle: 'r',
          targetHandle: 'l',
          type: 'straight',
          animated: false,
          style: {
            stroke: '#f43f5e',
            strokeWidth: 2,
            opacity: 0.85,
          },
        })
      }

      // 2. Route Child Branches: From Couple Union if couple exists, otherwise from Single Parent
      for (const person of people) {
        const parentIds = parentsOf(person.id, edges).filter((pId) =>
          people.some((p) => p.id === pId),
        )
        if (parentIds.length === 0) continue

        let routedViaCouple = false
        // Check if any two parents form a couple with a union node
        if (parentIds.length >= 2) {
          for (let i = 0; i < parentIds.length; i++) {
            for (let j = i + 1; j < parentIds.length; j++) {
              const pairKey = [parentIds[i]!, parentIds[j]!].sort().join('--')
              const unionId = coupleToUnionIdMap.get(pairKey)
              if (unionId) {
                // Branch drops from the Couple Union!
                nextEdges.push({
                  id: `parent-union-${unionId}-${person.id}`,
                  source: unionId,
                  target: person.id,
                  sourceHandle: 'b',
                  type: 'smoothstep',
                  animated: false,
                  style: {
                    stroke: '#94a3b8',
                    strokeWidth: 2,
                    opacity: 0.8,
                  },
                })
                routedViaCouple = true
                break
              }
            }
            if (routedViaCouple) break
          }
        }

        // If not routed via a couple union, route from each single parent
        if (!routedViaCouple) {
          for (const pId of parentIds) {
            nextEdges.push({
              id: `parent-single-${pId}-${person.id}`,
              source: pId,
              target: person.id,
              type: 'smoothstep',
              animated: false,
              style: {
                stroke: '#94a3b8',
                strokeWidth: 2,
                opacity: 0.8,
              },
            })
          }
        }
      }

      setNodes([...personNodes, ...unionNodes])
      setFlowEdges(nextEdges)
    })
    return () => {
      cancelled = true
    }
  }, [people, edges, template, rootPersonId, selectedPersonId, onAddChildToCouple, skin.accent])

  const miniFill = useMemo(
    () => (n: Node) => {
      if (n.type === 'union') return '#f43f5e'
      const person = people.find((p) => p.id === n.id)
      if (person?.id === rootPersonId) return '#4f46e5'
      return person?.isLate ? '#94a3b8' : '#6366f1'
    },
    [people, rootPersonId],
  )

  return (
    <div className="h-full w-full bg-[#f9f9fb] dark:bg-[#09090b] relative transition-colors duration-300">
      <ReactFlow
        nodes={nodes}
        edges={flowEdges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.25 }}
        minZoom={0.15}
        maxZoom={1.75}
        onPaneClick={() => onSelect(null)}
        onNodeClick={(_, node) => onSelect(node.id)}
        proOptions={{ hideAttribution: true }}
      >
        <Background
          color="currentColor"
          className="text-zinc-300/80 dark:text-zinc-800/80"
          gap={24}
          size={1.2}
        />
        <Controls
          showInteractive={false}
          position="bottom-left"
          className="!bg-white/80 dark:!bg-[#141419]/80 !backdrop-blur-md !border !border-black/[0.08] dark:!border-white/[0.08] !shadow-craft-md !rounded-2xl overflow-hidden [&>button]:!border-b-black/[0.06] dark:[&>button]:!border-b-white/[0.06] [&>button]:!fill-neutral-700 dark:[&>button]:!fill-neutral-200 hover:[&>button]:!bg-black/5 dark:hover:[&>button]:!bg-white/5"
        />
        <MiniMap
          nodeColor={miniFill}
          maskColor="rgba(0, 0, 0, 0.08)"
          className="!bg-white/80 dark:!bg-[#141419]/80 !backdrop-blur-md !border !border-black/[0.08] dark:!border-white/[0.08] !shadow-craft-md !rounded-2xl overflow-hidden"
          position="bottom-right"
          pannable
          zoomable
        />
      </ReactFlow>
    </div>
  )
}
