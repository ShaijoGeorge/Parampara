import { DexieTreeRepository } from './dexieRepo'
import type { TreeRepository } from './repository'
import { RemoteTreeRepository } from './remote'

const local = new DexieTreeRepository()
const remote = new RemoteTreeRepository()

/** v1 always returns the local IndexedDB adapter. */
export function getRepository(): TreeRepository {
  return local
}

export function getRemoteAdapter(): RemoteTreeRepository {
  return remote
}

export type { TreeRepository } from './repository'
export type { StorageEstimate } from './repository'
