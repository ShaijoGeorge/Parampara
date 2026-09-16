import type {
  AppSettings,
  ExportPayload,
  Person,
  RelativeKind,
  TemplateId,
  Tree,
  TreeBundle,
} from '../domain/types'

export interface StorageEstimate {
  usage: number
  quota: number
}

export interface TreeRepository {
  listTrees(): Promise<Tree[]>
  getBundle(treeId: string): Promise<TreeBundle | undefined>
  createTree(name: string, templateId?: TemplateId): Promise<Tree>
  saveTreeMeta(tree: Tree): Promise<void>
  deleteTree(treeId: string): Promise<void>
  duplicateTree(treeId: string): Promise<Tree>
  upsertPerson(person: Person): Promise<void>
  deletePerson(treeId: string, personId: string): Promise<void>
  addRelative(
    treeId: string,
    personId: string,
    kind: RelativeKind,
  ): Promise<Person>
  setRoot(treeId: string, personId: string): Promise<void>
  setTemplate(treeId: string, templateId: TemplateId): Promise<void>
  getSettings(): Promise<AppSettings>
  saveSettings(patch: Partial<Omit<AppSettings, 'id'>>): Promise<void>
  exportTree(treeId: string): Promise<ExportPayload>
  importTree(payload: ExportPayload): Promise<Tree>
  putBundle(bundle: TreeBundle): Promise<void>
  estimateUsage(): Promise<StorageEstimate>
}
