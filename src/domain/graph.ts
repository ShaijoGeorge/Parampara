import type { Edge, Person } from './types'

export function spousesOf(personId: string, edges: Edge[]): string[] {
  const ids: string[] = []
  for (const edge of edges) {
    if (edge.type !== 'spouse') continue
    if (edge.fromId === personId) ids.push(edge.toId)
    if (edge.toId === personId) ids.push(edge.fromId)
  }
  return [...new Set(ids)]
}

export function childrenOf(personId: string, edges: Edge[]): string[] {
  return edges
    .filter((edge) => edge.type === 'parent' && edge.fromId === personId)
    .map((edge) => edge.toId)
}

export function parentsOf(personId: string, edges: Edge[]): string[] {
  return edges
    .filter((edge) => edge.type === 'parent' && edge.toId === personId)
    .map((edge) => edge.fromId)
}

export function unitMembers(personId: string, edges: Edge[]): string[] {
  return [personId, ...spousesOf(personId, edges)]
}

export function childrenOfUnit(personId: string, edges: Edge[]): string[] {
  const members = unitMembers(personId, edges)
  const childIds = members.flatMap((id) => childrenOf(id, edges))
  return [...new Set(childIds)]
}

export function displayName(person: Person): string {
  const name = `${person.givenName} ${person.familyName}`.trim()
  if (name) return name
  return person.isPlaceholder ? 'Unnamed' : 'Unknown'
}

export function personById(
  people: Person[],
  id: string,
): Person | undefined {
  return people.find((person) => person.id === id)
}

export function canvasAriaLabel(people: Person[]): string {
  if (people.length === 0) return 'Empty family canvas'
  return `Family canvas with ${people.map(displayName).slice(0, 3).join(', ')}`
}
