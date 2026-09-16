import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { templateById } from '../canvas/templates'
import { makeSampleBundle } from '../domain/sample'
import { treeNameSchema } from '../domain/schemas'
import type { Tree } from '../domain/types'
import { getRepository } from '../storage'
import { BackupBanner } from '../ui/BackupBanner'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { Modal } from '../ui/Modal'
import { TextInput } from '../ui/Field'

export function TreesPage() {
  const [trees, setTrees] = useState<Tree[]>([])
  const [createOpen, setCreateOpen] = useState(false)
  const [name, setName] = useState('Our family')
  const [error, setError] = useState('')
  const [importError, setImportError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const repo = getRepository()

  const refresh = useCallback(async () => {
    setTrees(await repo.listTrees())
  }, [repo])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const create = async () => {
    const parsed = treeNameSchema.safeParse(name)
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? 'Invalid name')
      return
    }
    const tree = await repo.createTree(parsed.data)
    setCreateOpen(false)
    navigate(`/trees/${tree.id}`)
  }

  const onImport = async (file: File) => {
    setImportError('')
    try {
      const text = await file.text()
      const payload = JSON.parse(text)
      const tree = await repo.importTree(payload)
      await refresh()
      navigate(`/trees/${tree.id}`)
    } catch {
      setImportError('That file is not a Parampara export.')
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm tracking-[0.2em] text-maroon uppercase">Studio</p>
          <h1 className="font-display text-5xl">Your trees</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button type="button" onClick={() => setCreateOpen(true)}>
            New tree
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={async () => {
              const sample = makeSampleBundle()
              await repo.putBundle(sample)
              navigate(`/trees/${sample.tree.id}`)
            }}
          >
            Sample family
          </Button>
          <Button type="button" variant="ghost" onClick={() => fileRef.current?.click()}>
            Import JSON
          </Button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0]
              if (file) void onImport(file)
            }}
          />
        </div>
      </div>
      <div className="mt-6">
        <BackupBanner />
      </div>
      {importError ? <p className="mt-3 text-sm text-maroon">{importError}</p> : null}

      {trees.length === 0 ? (
        <Card className="mt-10">
          <h2 className="font-display text-3xl">No trees yet</h2>
          <p className="mt-2 max-w-lg text-ink/70 dark:text-cream/70">
            Start empty, drop in a sample lineage, or import a JSON backup from
            another browser.
          </p>
        </Card>
      ) : (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trees.map((tree) => {
            const skin = templateById(tree.templateId)
            return (
              <Card key={tree.id} className="flex flex-col">
                <div
                  className="mb-4 h-24 rounded-2xl"
                  style={{ background: skin.paper }}
                />
                <h2 className="font-display text-2xl">{tree.name}</h2>
                <p className="text-sm text-ink/55 dark:text-cream/55">{skin.name}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link to={`/trees/${tree.id}`}>
                    <Button type="button">Open</Button>
                  </Link>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={async () => {
                      const next = window.prompt('Rename tree', tree.name)
                      if (!next) return
                      const parsed = treeNameSchema.safeParse(next)
                      if (!parsed.success) return
                      await repo.saveTreeMeta({ ...tree, name: parsed.data })
                      await refresh()
                    }}
                  >
                    Rename
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={async () => {
                      const copy = await repo.duplicateTree(tree.id)
                      await refresh()
                      navigate(`/trees/${copy.id}`)
                    }}
                  >
                    Duplicate
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={async () => {
                      if (!window.confirm(`Delete “${tree.name}”?`)) return
                      await repo.deleteTree(tree.id)
                      await refresh()
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>
      )}

      <Modal open={createOpen} title="Name this tree" onClose={() => setCreateOpen(false)}>
        <div className="space-y-4">
          <TextInput value={name} onChange={(event) => setName(event.target.value)} />
          {error ? <p className="text-sm text-maroon">{error}</p> : null}
          <Button type="button" onClick={() => void create()}>
            Create
          </Button>
        </div>
      </Modal>
    </main>
  )
}
