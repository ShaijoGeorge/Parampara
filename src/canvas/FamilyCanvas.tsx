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
          },
        }
      })
      const nextEdges: FlowEdge[] = edges.map((edge) => ({
        id: edge.id,
        source: edge.fromId,
        target: edge.toId,
        sourceHandle: edge.type === 'spouse' ? 'r' : undefined,
        targetHandle: edge.type === 'spouse' ? 'l' : undefined,
        type: edge.type === 'spouse' ? 'straight' : 'smoothstep',
        animated: false,
        style: {
          stroke: edge.type === 'spouse' ? '#c9a227' : skin.accent,
          strokeWidth: edge.type === 'spouse' ? 2 : 2.4,
        },
      }))
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
      return person?.isLate ? '#8b1e3f55' : skin.accent
    },
    [people, skin.accent],
  )

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={flowEdges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.2}
        maxZoom={1.6}
        onPaneClick={() => onSelect(null)}
        onNodeClick={(_, node) => onSelect(node.id)}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#c9a22755" gap={28} />
        <Controls showInteractive={false} />
        <MiniMap
          nodeColor={miniFill}
          maskColor="rgba(42,24,16,0.18)"
          pannable
          zoomable
        />
      </ReactFlow>
    </div>
  )
}
