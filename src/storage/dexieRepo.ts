import { childrenOf, parentsOf, spousesOf } from '../domain/graph'
import { newId, now } from '../domain/ids'
import { exportPayloadSchema } from '../domain/schemas'
import type {
  AppSettings,
  Edge,
  ExportPayload,
  Person,
  RelativeKind,
  TemplateId,
  Tree,
  TreeBundle,
} from '../domain/types'
import { db } from './db'
import type { StorageEstimate, TreeRepository } from './repository'

const defaultSettings = (): AppSettings => ({
  id: 'app',
  theme: 'light',
  onboardingDone: false,
  lastTreeId: null,
})

function blankPerson(treeId: string, patch?: Partial<Person>): Person {
  const t = now()
  return {
    id: newId(),
    treeId,
    givenName: '',
    familyName: '',
    gender: 'unspecified',
    livingPlace: '',
    isLate: false,
    isPlaceholder: true,
    expectedChildren: 0,
    createdAt: t,
    updatedAt: t,
    ...patch,
  }
}

export class DexieTreeRepository implements TreeRepository {
  async listTrees(): Promise<Tree[]> {
    const trees = await db.trees.toArray()
    return trees.sort((a, b) => b.updatedAt - a.updatedAt)
  }

  async getBundle(treeId: string): Promise<TreeBundle | undefined> {
    const tree = await db.trees.get(treeId)
    if (!tree) return undefined
    const [people, edges] = await Promise.all([
      db.people.where('treeId').equals(treeId).toArray(),
      db.edges.where('treeId').equals(treeId).toArray(),
    ])
    return { tree, people, edges }
  }

  async createTree(name: string, templateId: TemplateId = 'pedigree'): Promise<Tree> {
    const t = now()
    const tree: Tree = {
      id: newId(),
      name,
      rootPersonId: null,
      templateId,
      createdAt: t,
      updatedAt: t,
    }
    await db.trees.put(tree)
    await this.saveSettings({ lastTreeId: tree.id })
    return tree
  }

  async saveTreeMeta(tree: Tree): Promise<void> {
    await db.trees.put({ ...tree, updatedAt: now() })
  }

  async deleteTree(treeId: string): Promise<void> {
    await db.transaction('rw', db.trees, db.people, db.edges, async () => {
      await db.people.where('treeId').equals(treeId).delete()
      await db.edges.where('treeId').equals(treeId).delete()
      await db.trees.delete(treeId)
    })
    const settings = await this.getSettings()
    if (settings.lastTreeId === treeId) {
      await this.saveSettings({ lastTreeId: null })
    }
  }

  async duplicateTree(treeId: string): Promise<Tree> {
    const bundle = await this.getBundle(treeId)
    if (!bundle) throw new Error('Tree not found')
    const idMap = new Map<string, string>()
    const t = now()
    const newTreeId = newId()
    idMap.set(bundle.tree.id, newTreeId)
    for (const person of bundle.people) idMap.set(person.id, newId())
    for (const edge of bundle.edges) idMap.set(edge.id, newId())

    const remap = (id: string) => idMap.get(id) ?? id

    const tree: Tree = {
      ...bundle.tree,
      id: newTreeId,
      name: `${bundle.tree.name} copy`,
      rootPersonId: bundle.tree.rootPersonId
        ? remap(bundle.tree.rootPersonId)
        : null,
      createdAt: t,
      updatedAt: t,
    }
    const people = bundle.people.map((person) => ({
      ...person,
      id: remap(person.id),
      treeId: newTreeId,
      createdAt: t,
      updatedAt: t,
    }))
    const edges = bundle.edges.map((edge) => ({
      ...edge,
      id: remap(edge.id),
      treeId: newTreeId,
      fromId: remap(edge.fromId),
      toId: remap(edge.toId),
    }))
    await this.putBundle({ tree, people, edges })
    return tree
  }

  async putBundle(bundle: TreeBundle): Promise<void> {
    await db.transaction('rw', db.trees, db.people, db.edges, async () => {
      await db.trees.put(bundle.tree)
      await db.people.bulkPut(bundle.people)
      await db.edges.bulkPut(bundle.edges)
    })
  }

  async upsertPerson(person: Person): Promise<void> {
    const next = { ...person, updatedAt: now() }
    await db.people.put(next)
    const bundle = await this.getBundle(person.treeId)
    if (!bundle) return
    const tree = { ...bundle.tree, updatedAt: now() }
    if (!tree.rootPersonId) tree.rootPersonId = person.id
    await db.trees.put(tree)
    await this.syncChildSlots(person.treeId, person.id)
  }

  async deletePerson(treeId: string, personId: string): Promise<void> {
    await db.transaction('rw', db.trees, db.people, db.edges, async () => {
      await db.people.delete(personId)
      const edges = await db.edges.where('treeId').equals(treeId).toArray()
      const stale = edges.filter(
        (edge) => edge.fromId === personId || edge.toId === personId,
      )
      await db.edges.bulkDelete(stale.map((edge) => edge.id))
      const tree = await db.trees.get(treeId)
      if (tree?.rootPersonId === personId) {
        const remaining = await db.people.where('treeId').equals(treeId).first()
        await db.trees.put({
          ...tree,
          rootPersonId: remaining?.id ?? null,
          updatedAt: now(),
        })
      } else if (tree) {
        await db.trees.put({ ...tree, updatedAt: now() })
      }
    })
  }

  async addRelative(
    treeId: string,
    personId: string,
    kind: RelativeKind,
  ): Promise<Person> {
    const bundle = await this.getBundle(treeId)
    if (!bundle) throw new Error('Tree not found')
    const person = bundle.people.find((p) => p.id === personId)
    if (!person) throw new Error('Person not found')

    const labels: Record<RelativeKind, string> = {
      parent: 'Parent',
      spouse: 'Spouse',
      child: 'Child',
      sibling: 'Sibling',
    }
    const created = blankPerson(treeId, {
      givenName: labels[kind],
      familyName: person.familyName,
      isPlaceholder: true,
    })
    const extraEdges: Edge[] = []

    if (kind === 'spouse') {
      extraEdges.push({
        id: newId(),
        treeId,
        fromId: personId,
        toId: created.id,
        type: 'spouse',
      })
    } else if (kind === 'child') {
      extraEdges.push({
        id: newId(),
        treeId,
        fromId: personId,
        toId: created.id,
        type: 'parent',
      })
      const spouseId = spousesOf(personId, bundle.edges)[0]
      if (spouseId) {
        extraEdges.push({
          id: newId(),
          treeId,
          fromId: spouseId,
          toId: created.id,
          type: 'parent',
        })
      }
    } else if (kind === 'parent') {
      extraEdges.push({
        id: newId(),
        treeId,
        fromId: created.id,
        toId: personId,
        type: 'parent',
      })
      if (!bundle.tree.rootPersonId || bundle.tree.rootPersonId === personId) {
        bundle.tree.rootPersonId = created.id
      }
    } else {
      const parentIds = parentsOf(personId, bundle.edges)
      if (parentIds.length === 0) {
        extraEdges.push({
          id: newId(),
          treeId,
          fromId: personId,
          toId: created.id,
          type: 'spouse',
        })
        created.givenName = 'Relative'
      } else {
        for (const parentId of parentIds) {
          extraEdges.push({
            id: newId(),
            treeId,
            fromId: parentId,
            toId: created.id,
            type: 'parent',
          })
        }
      }
    }

    await db.transaction('rw', db.trees, db.people, db.edges, async () => {
      await db.people.put(created)
      await db.edges.bulkPut(extraEdges)
      await db.trees.put({ ...bundle.tree, updatedAt: now() })
    })
    return created
  }

  async setRoot(treeId: string, personId: string): Promise<void> {
    const tree = await db.trees.get(treeId)
    if (!tree) return
    await db.trees.put({ ...tree, rootPersonId: personId, updatedAt: now() })
  }

  async setTemplate(treeId: string, templateId: TemplateId): Promise<void> {
    const tree = await db.trees.get(treeId)
    if (!tree) return
    await db.trees.put({ ...tree, templateId, updatedAt: now() })
  }

  async getSettings(): Promise<AppSettings> {
    const row = await db.settings.get('app')
    return row ?? defaultSettings()
  }

  async saveSettings(patch: Partial<Omit<AppSettings, 'id'>>): Promise<void> {
    const current = await this.getSettings()
    await db.settings.put({ ...current, ...patch, id: 'app' })
  }

  async exportTree(treeId: string): Promise<ExportPayload> {
    const bundle = await this.getBundle(treeId)
    if (!bundle) throw new Error('Tree not found')
    return { version: 1, exportedAt: now(), bundle }
  }

  async importTree(payload: ExportPayload): Promise<Tree> {
    const parsed = exportPayloadSchema.parse(payload)
    const idMap = new Map<string, string>()
    const t = now()
    const newTreeId = newId()
    const bundle = parsed.bundle
    const peopleIn = bundle.people as Person[]
    const edgesIn = bundle.edges as Edge[]
    idMap.set(bundle.tree.id, newTreeId)
    for (const person of peopleIn) idMap.set(person.id, newId())
    for (const edge of edgesIn) idMap.set(edge.id, newId())
    const remap = (id: string) => idMap.get(id) ?? newId()

    const tree: Tree = {
      ...bundle.tree,
      id: newTreeId,
      name: bundle.tree.name,
      rootPersonId: bundle.tree.rootPersonId
        ? remap(bundle.tree.rootPersonId)
        : null,
      createdAt: t,
      updatedAt: t,
    }
    const people = peopleIn.map((person) => ({
      ...person,
      id: remap(person.id),
      treeId: newTreeId,
    }))
    const edges = edgesIn.map((edge) => ({
      ...edge,
      id: remap(edge.id),
      treeId: newTreeId,
      fromId: remap(edge.fromId),
      toId: remap(edge.toId),
    }))
    await this.putBundle({ tree, people, edges })
    return tree
  }

  async estimateUsage(): Promise<StorageEstimate> {
    if (navigator.storage?.estimate) {
      const estimate = await navigator.storage.estimate()
      return { usage: estimate.usage ?? 0, quota: estimate.quota ?? 0 }
    }
    return { usage: 0, quota: 0 }
  }

  private async syncChildSlots(treeId: string, personId: string): Promise<void> {
    const bundle = await this.getBundle(treeId)
    if (!bundle) return
    const person = bundle.people.find((p) => p.id === personId)
    if (!person) return
    const wanted = person.expectedChildren ?? 0
    const existing = childrenOf(personId, bundle.edges)
    const missing = wanted - existing.length
    if (missing <= 0) return
    const created: Person[] = []
    const extraEdges: Edge[] = []
    for (let i = 0; i < missing; i += 1) {
      const child = blankPerson(treeId, {
        givenName: `Child ${existing.length + i + 1}`,
        familyName: person.familyName,
      })
      created.push(child)
      extraEdges.push({
        id: newId(),
        treeId,
        fromId: personId,
        toId: child.id,
        type: 'parent',
      })
    }
    await db.people.bulkPut(created)
    await db.edges.bulkPut(extraEdges)
  }
}
