import Dexie, { type Table } from 'dexie'
import type { AppSettings, Edge, Person, Tree } from '../domain/types'

export class ParamparaDB extends Dexie {
  trees!: Table<Tree, string>
  people!: Table<Person, string>
  edges!: Table<Edge, string>
  settings!: Table<AppSettings, string>

  constructor() {
    super('parampara')
    this.version(1).stores({
      trees: 'id, updatedAt',
      people: 'id, treeId',
      edges: 'id, treeId',
      settings: 'id',
    })
  }
}

export const db = new ParamparaDB()
