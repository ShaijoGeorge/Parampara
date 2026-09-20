import {
  childrenOfUnit,
  parentsOf,
  personById,
  unitMembers,
} from '../domain/graph'
import type { Edge, Person, TemplateId } from '../domain/types'

export interface LaidOutNode {
  id: string
  x: number
  y: number
}

export const NODE = { w: 140, h: 140 }
export const GAP_X = 40
export const GAP_Y = 80
export const SPOUSE_GAP = 50

function unique(ids: string[]): string[] {
  return [...new Set(ids)]
}

// ---------------------------------------------------------------------------
// Classical Descendants Flow (Top-Down Generational Tree)
// ---------------------------------------------------------------------------
interface SubtreeBox {
  width: number
  unitCenterX: number
  positions: Map<string, { x: number; y: number }>
}

function layoutSubtreeDown(
  personId: string,
  gen: number,
  edges: Edge[],
  people: Person[],
  visited: Set<string>,
): SubtreeBox {
  const positions = new Map<string, { x: number; y: number }>()

  // Gather unit members (person + spouses)
  const unit = unique(unitMembers(personId, edges)).filter(
    (id) => !visited.has(id) && people.some((p) => p.id === id),
  )

  if (unit.length === 0) {
    return { width: NODE.w, unitCenterX: NODE.w / 2, positions }
  }

  for (const id of unit) visited.add(id)

  const unitWidth = unit.length * NODE.w + (unit.length - 1) * SPOUSE_GAP

  // Gather children of this union
  const children = unique(childrenOfUnit(personId, edges)).filter(
    (id) => !visited.has(id) && people.some((p) => p.id === id),
  )

  if (children.length === 0) {
    unit.forEach((id, index) => {
      positions.set(id, {
        x: index * (NODE.w + SPOUSE_GAP),
        y: gen * (NODE.h + GAP_Y),
      })
    })
    return {
      width: unitWidth,
      unitCenterX: unitWidth / 2,
      positions,
    }
  }

  // Layout all child subtrees
  const childBoxes: SubtreeBox[] = []
  for (const childId of children) {
    const box = layoutSubtreeDown(childId, gen + 1, edges, people, visited)
    childBoxes.push(box)
  }

  // Calculate total children width
  let totalChildWidth = 0
  const childOffsets: number[] = []
  childBoxes.forEach((box, i) => {
    childOffsets.push(totalChildWidth)
    totalChildWidth += box.width + (i < childBoxes.length - 1 ? GAP_X : 0)
  })

  // Center parents over children
  const firstChildCenter = childOffsets[0]! + childBoxes[0]!.unitCenterX
  const lastChildCenter =
    childOffsets[childBoxes.length - 1]! + childBoxes[childBoxes.length - 1]!.unitCenterX
  const childrenCenter = (firstChildCenter + lastChildCenter) / 2

  let parentStartX = childrenCenter - unitWidth / 2
  let childShiftX = 0

  if (parentStartX < 0) {
    childShiftX = -parentStartX
    parentStartX = 0
  }

  const totalWidth = Math.max(parentStartX + unitWidth, totalChildWidth + childShiftX)

  // Position parent unit
  unit.forEach((id, index) => {
    positions.set(id, {
      x: parentStartX + index * (NODE.w + SPOUSE_GAP),
      y: gen * (NODE.h + GAP_Y),
    })
  })

  // Position children with shift
  childBoxes.forEach((box, i) => {
    const offsetX = childOffsets[i]! + childShiftX
    for (const [id, pos] of box.positions) {
      positions.set(id, {
        x: pos.x + offsetX,
        y: pos.y,
      })
    }
  })

  return {
    width: totalWidth,
    unitCenterX: parentStartX + unitWidth / 2,
    positions,
  }
}

function findAncestralRoots(
  people: Person[],
  edges: Edge[],
  preferredRootId: string | null,
): string[] {
  const roots: string[] = []
  const hasParents = new Set(
    edges.filter((e) => e.type === 'parent').map((e) => e.toId),
  )

  // If a preferred root is specified, trace its lineage to the uppermost ancestor(s)
  if (preferredRootId && people.some((p) => p.id === preferredRootId)) {
    const climbVisited = new Set<string>()
    const climb = (id: string) => {
      if (climbVisited.has(id)) return
      climbVisited.add(id)
      const parents = parentsOf(id, edges).filter((pId) =>
        people.some((p) => p.id === pId),
      )
      if (parents.length === 0) {
        if (!roots.includes(id)) roots.push(id)
      } else {
        for (const pId of parents) climb(pId)
      }
    }
    climb(preferredRootId)
  }

  // Next, collect all other elders who have no parents
  for (const p of people) {
    if (!hasParents.has(p.id) && !roots.includes(p.id)) {
      roots.push(p.id)
    }
  }

  // If there are still remaining nodes, append them to ensure nobody is omitted
  for (const p of people) {
    if (!roots.includes(p.id)) {
      roots.push(p.id)
    }
  }

  return roots
}

export function layoutDescendants(
  people: Person[],
  edges: Edge[],
  rootId: string | null,
): LaidOutNode[] {
  const visited = new Set<string>()
  const allPositions = new Map<string, { x: number; y: number }>()

  const roots = findAncestralRoots(people, edges, rootId)
  let cursorX = 0

  for (const rId of roots) {
    if (visited.has(rId)) continue
    const box = layoutSubtreeDown(rId, 0, edges, people, visited)
    for (const [id, pos] of box.positions) {
      allPositions.set(id, { x: pos.x + cursorX, y: pos.y })
    }
    cursorX += box.width + GAP_X * 2
  }

  return people.map((p) => {
    const pos = allPositions.get(p.id) ?? { x: cursorX, y: 0 }
    return { id: p.id, x: pos.x, y: pos.y }
  })
}

// ---------------------------------------------------------------------------
// Main Dispatcher (Exclusively Descendants Flow)
// ---------------------------------------------------------------------------
export async function layoutFamily(
  people: Person[],
  edges: Edge[],
  _template?: TemplateId,
  rootId: string | null = null,
): Promise<LaidOutNode[]> {
  if (people.length === 0) return []
  return layoutDescendants(people, edges, rootId)
}

export { personById }
