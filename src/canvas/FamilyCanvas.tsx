import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  type Edge as FlowEdge,
  type Node,
} from '@xyflow/react'
import { useEffect, useMemo, useState } from 'react'
import type { Edge, Person, TemplateId } from '../domain/types'
import { layoutFamily } from './layouts'
import { PersonNode, type PersonNodeData } from './PersonNode'
import { templateById } from './templates'

const nodeTypes = { person: PersonNode }

interface FamilyCanvasProps {
  people: Person[]
  edges: Edge[]
  template: TemplateId
  rootPersonId: string | null
  selectedPersonId: string | null
  onSelect: (personId: string | null) => void
}

export function FamilyCanvas({
  people,
  edges,
  template,
  rootPersonId,
  selectedPersonId,
  onSelect,
}: FamilyCanvasProps) {
  const [nodes, setNodes] = useState<Node<PersonNodeData>[]>([])
  const [flowEdges, setFlowEdges] = useState<FlowEdge[]>([])
  const skin = templateById(template)

  useEffect(() => {
    let cancelled = false
    void layoutFamily(people, edges, template, rootPersonId).then((laid) => {
      if (cancelled) return
      const nextNodes: Node<PersonNodeData>[] = laid.map((item) => {
        const person = people.find((p) => p.id === item.id)
        if (!person) {
          return {
            id: item.id,
            position: { x: item.x, y: item.y },
            type: 'person',
            data: {
              person: people[0]!,
              selected: false,
              template,
              isRoot: false,
            },
          }
        }
        return {
          id: person.id,
          position: { x: item.x, y: item.y },
          type: 'person',
          data: {
            person,
            selected: person.id === selectedPersonId,
            template,
            isRoot: person.id === rootPersonId,
          },
        }
      })

      const nodePosMap = new Map<string, { x: number; y: number }>()
      laid.forEach((item) => nodePosMap.set(item.id, { x: item.x, y: item.y }))

      const nextEdges: FlowEdge[] = edges.map((edge) => {
        const isSpouse = edge.type === 'spouse'
        let source = edge.fromId
        let target = edge.toId
        let sourceHandle: string | undefined = undefined
        let targetHandle: string | undefined = undefined

        if (isSpouse) {
          const fromPos = nodePosMap.get(edge.fromId)
          const toPos = nodePosMap.get(edge.toId)
          if (fromPos && toPos && fromPos.x > toPos.x) {
            source = edge.toId
            target = edge.fromId
          }
          sourceHandle = 'r'
          targetHandle = 'l'
        }

        return {
          id: edge.id,
          source,
          target,
          sourceHandle,
          targetHandle,
          type: isSpouse ? 'straight' : 'smoothstep',
          animated: false,
          style: {
            stroke: isSpouse ? '#f43f5e' : '#94a3b8',
            strokeWidth: isSpouse ? 2 : 2,
            strokeDasharray: isSpouse ? '4 4' : undefined,
            opacity: isSpouse ? 0.85 : 0.65,
          },
        }
      })

      setNodes(nextNodes.filter((node) => people.some((p) => p.id === node.id)))
      setFlowEdges(nextEdges)
    })
    return () => {
      cancelled = true
    }
  }, [people, edges, template, rootPersonId, selectedPersonId, skin.accent])

  const miniFill = useMemo(
    () => (n: Node) => {
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
