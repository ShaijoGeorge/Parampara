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

      const nextEdges: FlowEdge[] = edges.map((edge) => {
        const isSpouse = edge.type === 'spouse'
        return {
          id: edge.id,
          source: edge.fromId,
          target: edge.toId,
          sourceHandle: isSpouse ? 'r' : undefined,
          targetHandle: isSpouse ? 'l' : undefined,
          type: isSpouse ? 'straight' : 'smoothstep',
          animated: false,
          style: {
            stroke: isSpouse ? '#c9a227' : skin.accent,
            strokeWidth: isSpouse ? 2.5 : 2.4,
            strokeDasharray: isSpouse ? '5 3' : undefined,
            filter: 'drop-shadow(0 2px 4px rgba(25, 16, 12, 0.15))',
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
      if (person?.id === rootPersonId) return '#c9a227'
      return person?.isLate ? '#7d163488' : skin.accent
    },
    [people, rootPersonId, skin.accent],
  )

  return (
    <div className="h-full w-full bg-constellation">
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
        <Background color="rgba(201, 162, 39, 0.25)" gap={32} size={1.5} />
        <Controls showInteractive={false} position="bottom-left" />
        <MiniMap
          nodeColor={miniFill}
          maskColor="rgba(25, 16, 12, 0.25)"
          position="bottom-right"
          pannable
          zoomable
        />
      </ReactFlow>
    </div>
  )
}
