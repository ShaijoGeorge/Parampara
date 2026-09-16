export type Gender = 'female' | 'male' | 'other' | 'unspecified'

export type EdgeType = 'parent' | 'spouse'

export type TemplateId = 'pedigree' | 'river' | 'mandala' | 'compact'

export type ThemeMode = 'light' | 'dark'

export interface Person {
  id: string
  treeId: string
  givenName: string
  familyName: string
  gender: Gender
  livingPlace: string
  isLate: boolean
  deathYear?: number
  photoDataUrl?: string
  notes?: string
  isPlaceholder?: boolean
  expectedChildren?: number
  createdAt: number
  updatedAt: number
}

export interface Edge {
  id: string
  treeId: string
  fromId: string
  toId: string
  type: EdgeType
}

export interface Tree {
  id: string
  name: string
  rootPersonId: string | null
  templateId: TemplateId
  createdAt: number
  updatedAt: number
}

export interface TreeBundle {
  tree: Tree
  people: Person[]
  edges: Edge[]
}

export interface AppSettings {
  id: 'app'
  theme: ThemeMode
  onboardingDone: boolean
  lastTreeId: string | null
}

export interface ExportPayload {
  version: 1
  exportedAt: number
  bundle: TreeBundle
}

export type RelativeKind = 'parent' | 'spouse' | 'child' | 'sibling'
