/**
 * Remote sync is intentionally unimplemented in v1.
 * IndexedDB holds every tree on this device. When shareable links land,
 * implement this adapter with the same TreeRepository methods and swap it
 * in `getRepository()` without touching the editor.
 */
import type {
  AppSettings,
  ExportPayload,
  Person,
  RelativeKind,
  TemplateId,
  Tree,
  TreeBundle,
} from '../domain/types'
import type { StorageEstimate, TreeRepository } from './repository'

export class RemoteTreeRepository implements TreeRepository {
  readonly kind = 'remote' as const

  private unsupported(): never {
    throw new Error(
      'Online sharing is not enabled yet. Export a JSON backup to move a tree.',
    )
  }

  async listTrees(): Promise<Tree[]> {
    this.unsupported()
  }

  async getBundle(_treeId: string): Promise<TreeBundle | undefined> {
    this.unsupported()
  }

  async createTree(_name: string, _templateId?: TemplateId): Promise<Tree> {
    this.unsupported()
  }

  async saveTreeMeta(_tree: Tree): Promise<void> {
    this.unsupported()
  }

  async deleteTree(_treeId: string): Promise<void> {
    this.unsupported()
  }

  async duplicateTree(_treeId: string): Promise<Tree> {
    this.unsupported()
  }

  async upsertPerson(_person: Person): Promise<void> {
    this.unsupported()
  }

  async deletePerson(_treeId: string, _personId: string): Promise<void> {
    this.unsupported()
  }

  async addRelative(
    _treeId: string,
    _personId: string,
    _kind: RelativeKind,
  ): Promise<Person> {
    this.unsupported()
  }

  async setRoot(_treeId: string, _personId: string): Promise<void> {
    this.unsupported()
  }

  async setTemplate(_treeId: string, _templateId: TemplateId): Promise<void> {
    this.unsupported()
  }

  async getSettings(): Promise<AppSettings> {
    this.unsupported()
  }

  async saveSettings(_patch: Partial<Omit<AppSettings, 'id'>>): Promise<void> {
    this.unsupported()
  }

  async exportTree(_treeId: string): Promise<ExportPayload> {
    this.unsupported()
  }

  async importTree(_payload: ExportPayload): Promise<Tree> {
    this.unsupported()
  }

  async putBundle(_bundle: TreeBundle): Promise<void> {
    this.unsupported()
  }

  async estimateUsage(): Promise<StorageEstimate> {
    this.unsupported()
  }
}
