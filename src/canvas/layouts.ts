import ELK from 'elkjs/lib/elk.bundled.js'
import {
  childrenOfUnit,
  personById,
  spousesOf,
  unitMembers,
} from '../domain/graph'
import type { Edge, Person, TemplateId } from '../domain/types'

export interface LaidOutNode {
  id: string
  x: number
  y: number
}

const NODE = { w: 248, h: 128 }

function unique(ids: string[]): string[] {
  return [...new Set(ids)]
}

function generations(
  people: Person[],
  edges: Edge[],
  rootId: string | null,
): Map<string, number> {
  const gen = new Map<string, number>()
  const start =
    rootId && people.some((p) => p.id === rootId)
      ? rootId
      : (people[0]?.id ?? null)
  if (!start) return gen
  const queue: string[] = [start]
  gen.set(start, 0)
  while (queue.length) {
    const id = queue.shift()
    if (!id) break
    const g = gen.get(id) ?? 0
    for (const spouseId of spousesOf(id, edges)) {
      if (!gen.has(spouseId)) {
        gen.set(spouseId, g)
        queue.push(spouseId)
      }
    }
    for (const childId of childrenOfUnit(id, edges)) {
      if (!gen.has(childId)) {
        gen.set(childId, g + 1)
        queue.push(childId)
      }
    }
  }
  for (const person of people) {
    if (!gen.has(person.id)) gen.set(person.id, 99)
  }
  return gen
}

function layoutPedigree(
  people: Person[],
  edges: Edge[],
  rootId: string | null,
  compact: boolean,
  axis: 'down' | 'right',
): LaidOutNode[] {
  const gapX = compact ? 18 : 36
  const gapY = compact ? 64 : 96
  const spouseGap = compact ? 12 : 20
  const placed = new Set<string>()
  const positions = new Map<string, { x: number; y: number }>()

  const placeUnit = (personId: string, gen: number, left: number): number => {
    if (placed.has(personId)) return 0
    const members = unique(unitMembers(personId, edges)).filter((id) =>
      people.some((p) => p.id === id),
    )
    for (const id of members) placed.add(id)

    const kids = childrenOfUnit(personId, edges).filter(
      (id) => !placed.has(id) && people.some((p) => p.id === id),
    )
    let childWidth = 0
    const childStarts: number[] = []
    for (const kid of kids) {
      const w = placeUnit(kid, gen + 1, left + childWidth)
      childStarts.push(left + childWidth)
      childWidth += w
    }

    const unitWidth = members.length * NODE.w + (members.length - 1) * spouseGap
    const width = Math.max(unitWidth, childWidth, NODE.w)
    const unitLeft = left + Math.max(0, (width - unitWidth) / 2)

    members.forEach((id, index) => {
      const x = unitLeft + index * (NODE.w + spouseGap)
      const y = gen * (NODE.h + gapY)
      positions.set(id, { x, y })
    })

    return width + gapX
  }

  const root =
    rootId && people.some((p) => p.id === rootId)
      ? rootId
      : (people[0]?.id ?? null)
  let cursor = 0
  if (root) cursor += placeUnit(root, 0, 0)

  const leftovers = people.filter((p) => !placed.has(p.id))
  for (const person of leftovers) {
    cursor += placeUnit(person.id, 99, cursor)
  }

  return people.map((person) => {
    const pos = positions.get(person.id) ?? { x: cursor, y: 0 }
    if (axis === 'right') {
      return { id: person.id, x: pos.y, y: pos.x }
    }
    return { id: person.id, x: pos.x, y: pos.y }
  })
}

function layoutMandala(
  people: Person[],
  edges: Edge[],
  rootId: string | null,
): LaidOutNode[] {
  const gen = generations(people, edges, rootId)
  const buckets = new Map<number, string[]>()
  for (const person of people) {
    const g = gen.get(person.id) ?? 99
    const list = buckets.get(g) ?? []
    list.push(person.id)
    buckets.set(g, list)
  }
  const result: LaidOutNode[] = []
  for (const [g, ids] of buckets) {
    const radius = g === 0 || g === 99 ? (g === 0 ? 0 : 420 + ids.length * 8) : 170 + g * 210
    ids.forEach((id, index) => {
      const angle = (index / Math.max(ids.length, 1)) * Math.PI * 2 - Math.PI / 2
      result.push({
        id,
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
      })
    })
  }
  return result
}

async function layoutElk(
  people: Person[],
  edges: Edge[],
): Promise<LaidOutNode[]> {
  const elk = new ELK()
  const graph = await elk.layout({
    id: 'root',
    layoutOptions: {
      'elk.algorithm': 'layered',
      'elk.direction': 'DOWN',
      'elk.layered.spacing.nodeNodeBetweenLayers': '72',
      'elk.spacing.nodeNode': '28',
      'elk.edgeRouting': 'ORTHOGONAL',
    },
    children: people.map((person) => ({
      id: person.id,
      width: NODE.w,
      height: NODE.h,
    })),
    edges: edges.map((edge) => ({
      id: edge.id,
      sources: [edge.fromId],
      targets: [edge.toId],
    })),
  })
  return (graph.children ?? []).map((child) => ({
    id: child.id,
    x: child.x ?? 0,
    y: child.y ?? 0,
  }))
}

export async function layoutFamily(
  people: Person[],
  edges: Edge[],
  template: TemplateId,
  rootId: string | null,
): Promise<LaidOutNode[]> {
  if (people.length === 0) return []
  if (template === 'mandala') return layoutMandala(people, edges, rootId)
  if (template === 'river') {
    return layoutPedigree(people, edges, rootId, false, 'right')
  }
  if (template === 'compact') {
    try {
      const elkNodes = await layoutElk(people, edges)
      if (elkNodes.length === people.length) return elkNodes
    } catch {
      // fall through to the packed pedigree
    }
    return layoutPedigree(people, edges, rootId, true, 'down')
  }
  return layoutPedigree(people, edges, rootId, false, 'down')
}

export { NODE, personById }
