import ELK from 'elkjs/lib/elk.bundled.js'
import {
  childrenOf,
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

export const NODE = { w: 260, h: 100 }
const GAP_X = 40
const GAP_Y = 100
const SPOUSE_GAP = 20

function unique(ids: string[]): string[] {
  return [...new Set(ids)]
}

// ---------------------------------------------------------------------------
// 1. Classical Descendants (Top-Down Generational Tree)
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

function layoutDescendants(
  people: Person[],
  edges: Edge[],
  rootId: string | null,
): LaidOutNode[] {
  const visited = new Set<string>()
  const allPositions = new Map<string, { x: number; y: number }>()

  // Determine root ancestor: preferred rootId, or an ancestor with no parents
  let primaryRoot = rootId && people.some((p) => p.id === rootId) ? rootId : null
  if (!primaryRoot) {
    const withoutParents = people.filter(
      (p) => parentsOf(p.id, edges).length === 0,
    )
    primaryRoot = withoutParents[0]?.id ?? people[0]?.id ?? null
  }

  let cursorX = 0

  if (primaryRoot) {
    const box = layoutSubtreeDown(primaryRoot, 0, edges, people, visited)
    for (const [id, pos] of box.positions) {
      allPositions.set(id, { x: pos.x + cursorX, y: pos.y })
    }
    cursorX += box.width + GAP_X * 2
  }

  // Handle any remaining unattached components
  const leftovers = people.filter((p) => !visited.has(p.id))
  for (const person of leftovers) {
    if (visited.has(person.id)) continue
    const box = layoutSubtreeDown(person.id, 0, edges, people, visited)
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
// 2. Direct Ancestry Chart (Bottom-Up Pedigree)
// ---------------------------------------------------------------------------
function layoutAncestry(
  people: Person[],
  edges: Edge[],
  rootId: string | null,
): LaidOutNode[] {
  const visited = new Set<string>()
  const positions = new Map<string, { x: number; y: number }>()

  // Start with the focus person (root) at bottom
  const focus =
    rootId && people.some((p) => p.id === rootId)
      ? rootId
      : (people[people.length - 1]?.id ?? people[0]?.id ?? null)

  if (!focus) return []

  const layoutBranchUp = (
    personId: string,
    level: number,
    centerX: number,
    spread: number,
  ) => {
    if (visited.has(personId)) return
    visited.add(personId)

    const y = -level * (NODE.h + GAP_Y)
    positions.set(personId, { x: centerX - NODE.w / 2, y })

    const parents = parentsOf(personId, edges).filter((id) =>
      people.some((p) => p.id === id),
    )

    if (parents.length === 1) {
      layoutBranchUp(parents[0]!, level + 1, centerX, spread * 0.75)
    } else if (parents.length >= 2) {
      const nextSpread = Math.max(spread / 2, (NODE.w + GAP_X) / 2)
      // Father on left, Mother on right
      layoutBranchUp(parents[0]!, level + 1, centerX - nextSpread, nextSpread)
      layoutBranchUp(parents[1]!, level + 1, centerX + nextSpread, nextSpread)
    }
  }

  // Initial root placed at (0, 0)
  layoutBranchUp(focus, 0, 0, (NODE.w + GAP_X) * 2.2)

  // Layout any remaining people cleanly beside
  let extraX = (NODE.w + GAP_X) * 3
  const leftovers = people.filter((p) => !visited.has(p.id))
  for (const person of leftovers) {
    positions.set(person.id, { x: extraX, y: 0 })
    extraX += NODE.w + GAP_X
  }

  return people.map((p) => {
    const pos = positions.get(p.id) ?? { x: 0, y: 0 }
    return { id: p.id, x: pos.x, y: pos.y }
  })
}

// ---------------------------------------------------------------------------
// 3. Balanced Hourglass (Focus Center: Ancestors Up, Descendants Down)
// ---------------------------------------------------------------------------
function layoutHourglass(
  people: Person[],
  edges: Edge[],
  rootId: string | null,
): LaidOutNode[] {
  const visited = new Set<string>()
  const positions = new Map<string, { x: number; y: number }>()

  const focus =
    rootId && people.some((p) => p.id === rootId)
      ? rootId
      : (people[0]?.id ?? null)

  if (!focus) return []

  // 1. Center Unit (Focus + Spouses) at Y = 0
  const centerUnit = unique(unitMembers(focus, edges)).filter((id) =>
    people.some((p) => p.id === id),
  )
  centerUnit.forEach((id) => visited.add(id))

  const centerUnitWidth =
    centerUnit.length * NODE.w + (centerUnit.length - 1) * SPOUSE_GAP
  centerUnit.forEach((id, index) => {
    positions.set(id, {
      x: -centerUnitWidth / 2 + index * (NODE.w + SPOUSE_GAP),
      y: 0,
    })
  })

  // 2. Ancestors branch UPWARDS
  const parents = parentsOf(focus, edges).filter((id) =>
    people.some((p) => p.id === id),
  )
  if (parents.length === 1) {
    visited.add(parents[0]!)
    positions.set(parents[0]!, {
      x: -NODE.w / 2,
      y: -(NODE.h + GAP_Y),
    })
  } else if (parents.length >= 2) {
    const spread = (NODE.w + GAP_X) * 0.75
    visited.add(parents[0]!)
    visited.add(parents[1]!)
    positions.set(parents[0]!, {
      x: -spread - NODE.w / 2,
      y: -(NODE.h + GAP_Y),
    })
    positions.set(parents[1]!, {
      x: spread - NODE.w / 2,
      y: -(NODE.h + GAP_Y),
    })
  }

  // 3. Descendants branch DOWNWARDS
  const children = unique(childrenOf(focus, edges)).filter((id) =>
    people.some((p) => p.id === id),
  )
  if (children.length > 0) {
    const totalKidsWidth =
      children.length * NODE.w + (children.length - 1) * GAP_X
    children.forEach((childId, index) => {
      visited.add(childId)
      positions.set(childId, {
        x: -totalKidsWidth / 2 + index * (NODE.w + GAP_X),
        y: NODE.h + GAP_Y,
      })
    })
  }

  // 4. Place any remaining people
  let cursorX = centerUnitWidth + GAP_X * 2
  const leftovers = people.filter((p) => !visited.has(p.id))
  for (const person of leftovers) {
    positions.set(person.id, { x: cursorX, y: 0 })
    cursorX += NODE.w + GAP_X
  }

  return people.map((p) => {
    const pos = positions.get(p.id) ?? { x: 0, y: 0 }
    return { id: p.id, x: pos.x, y: pos.y }
  })
}

// ---------------------------------------------------------------------------
// 4. Compact Clan Matrix (ELK Layered Orthogonal DAG)
// ---------------------------------------------------------------------------
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
      'elk.layered.spacing.nodeNodeBetweenLayers': '80',
      'elk.spacing.nodeNode': '36',
      'elk.edgeRouting': 'ORTHOGONAL',
      'elk.layered.nodePlacement.strategy': 'BRANDES_KOEPF',
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

// ---------------------------------------------------------------------------
// Main Dispatcher
// ---------------------------------------------------------------------------
export async function layoutFamily(
  people: Person[],
  edges: Edge[],
  template: TemplateId,
  rootId: string | null,
): Promise<LaidOutNode[]> {
  if (people.length === 0) return []

  if (template === 'ancestry' || template === 'river') {
    return layoutAncestry(people, edges, rootId)
  }

  if (template === 'hourglass' || template === 'mandala') {
    return layoutHourglass(people, edges, rootId)
  }

  if (template === 'compact') {
    try {
      const elkNodes = await layoutElk(people, edges)
      if (elkNodes.length === people.length) return elkNodes
    } catch {
      // fallback
    }
  }

  // Default: Classical Descendants Top-Down Tree
  return layoutDescendants(people, edges, rootId)
}

export { personById }
