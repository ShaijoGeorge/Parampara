import { newId, now } from './ids'
import type { Edge, Person, Tree, TreeBundle } from './types'

export function makeSampleBundle(): TreeBundle {
  const treeId = newId()
  const t = now()
  const ids = {
    nani: newId(),
    nana: newId(),
    ma: newId(),
    papa: newId(),
    me: newId(),
    sibling: newId(),
  }

  const tree: Tree = {
    id: treeId,
    name: 'Sample lineage',
    rootPersonId: ids.nani,
    templateId: 'pedigree',
    createdAt: t,
    updatedAt: t,
  }

  const person = (
    id: string,
    givenName: string,
    familyName: string,
    gender: Person['gender'],
    livingPlace: string,
    extra?: Partial<Person>,
  ): Person => ({
    id,
    treeId,
    givenName,
    familyName,
    gender,
    livingPlace,
    isLate: false,
    createdAt: t,
    updatedAt: t,
    ...extra,
  })

  const people: Person[] = [
    person(ids.nani, 'Kamala', 'Menon', 'female', 'Thrissur', {
      isLate: true,
      deathYear: 2014,
    }),
    person(ids.nana, 'Raghavan', 'Menon', 'male', 'Thrissur', {
      isLate: true,
      deathYear: 2009,
    }),
    person(ids.ma, 'Lakshmi', 'Nair', 'female', 'Kochi'),
    person(ids.papa, 'Arun', 'Nair', 'male', 'Kochi'),
    person(ids.me, 'Maya', 'Nair', 'female', 'Bengaluru'),
    person(ids.sibling, 'Dev', 'Nair', 'male', 'Kochi'),
  ]

  const edge = (fromId: string, toId: string, type: Edge['type']): Edge => ({
    id: newId(),
    treeId,
    fromId,
    toId,
    type,
  })

  const edges: Edge[] = [
    edge(ids.nani, ids.nana, 'spouse'),
    edge(ids.nani, ids.papa, 'parent'),
    edge(ids.nana, ids.papa, 'parent'),
    edge(ids.ma, ids.papa, 'spouse'),
    edge(ids.ma, ids.me, 'parent'),
    edge(ids.papa, ids.me, 'parent'),
    edge(ids.ma, ids.sibling, 'parent'),
    edge(ids.papa, ids.sibling, 'parent'),
  ]

  return { tree, people, edges }
}
