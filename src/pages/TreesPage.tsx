import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { templateById } from '../canvas/templates'
import { makeSampleBundle } from '../domain/sample'
import { treeNameSchema } from '../domain/schemas'
import type { Tree } from '../domain/types'
import { getRepository } from '../storage'
import { BackupBanner } from '../ui/BackupBanner'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { Modal } from '../ui/Modal'
import { TextInput } from '../ui/Field'

export function TreesPage() {
  const [trees, setTrees] = useState<Tree[]>([])
  const [createOpen, setCreateOpen] = useState(false)
  const [name, setName] = useState('Our Family Lineage')
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
    const tree = await repo.createTree(parsed.data, 'pedigree')
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
      setImportError('That file is not a valid Parampara genealogy archive.')
    }
  }

  return (
    <main className="min-h-screen bg-[#f9f9fb] dark:bg-[#09090b] text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        {/* Studio Header Bar */}
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-black/[0.06] dark:border-white/[0.06] pb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Studio Documents
              </span>
              <Badge variant="accent">{trees.length} {trees.length === 1 ? 'Canvas' : 'Canvases'}</Badge>
            </div>
            <h1 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Your Family Trees
            </h1>
            <p className="mt-1.5 text-sm text-neutral-500 dark:text-neutral-400">
              Select a lineage document to open the interactive canvas, or create an archive for another family branch.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <Button
              type="button"
              variant="primary"
              size="md"
              className="shadow-craft-sm"
              onClick={() => setCreateOpen(true)}
            >
              + Create New Tree
            </Button>

            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={async () => {
                const sample = makeSampleBundle()
                await repo.putBundle(sample)
                navigate(`/trees/${sample.tree.id}`)
              }}
            >
              Sample Lineage
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="md"
              onClick={() => fileRef.current?.click()}
            >
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

        {/* Backup Notification */}
        <div className="mt-6">
          <BackupBanner />
        </div>

        {importError ? (
          <div className="mt-4 rounded-2xl border border-rose-500/20 bg-rose-500/10 p-4 text-xs font-semibold text-rose-600 dark:text-rose-400">
            ⚠️ {importError}
          </div>
        ) : null}

        {/* Lineage Tree Grid */}
        {trees.length === 0 ? (
          <Card className="mt-12 text-center p-12 border-dashed border-black/[0.1] dark:border-white/[0.1]">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-2xl font-semibold text-neutral-800 dark:text-neutral-200">
              प
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
              No family trees yet
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-neutral-500 dark:text-neutral-400">
              Start with a fresh canvas, import an existing JSON archive, or explore our curated Kerala heritage sample lineage.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Button type="button" variant="primary" size="md" onClick={() => setCreateOpen(true)}>
                Create First Tree
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={async () => {
                  const sample = makeSampleBundle()
                  await repo.putBundle(sample)
                  navigate(`/trees/${sample.tree.id}`)
                }}
              >
                Load Sample Lineage
              </Button>
            </div>
          </Card>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {trees.map((tree) => {
              const skin = templateById(tree.templateId)
              const updatedDate = new Date(tree.updatedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })

              return (
                <Card
                  key={tree.id}
                  className="group flex flex-col justify-between hover:shadow-craft-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div>
                    {/* Visual Miniature Banner */}
                    <div
                      className="relative mb-4 h-24 w-full rounded-xl border border-black/[0.06] dark:border-white/[0.06] overflow-hidden flex items-center justify-center p-4"
                      style={{ background: skin.paper }}
                    >
                      <div className="absolute top-2.5 right-2.5">
                        <Badge variant="neutral">{skin.tag}</Badge>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-semibold tracking-tight text-neutral-800 dark:text-neutral-200">
                          {skin.name}
                        </p>
                        <p className="text-[10px] text-neutral-500 tracking-wider uppercase font-medium">
                          Interactive Canvas
                        </p>
                      </div>
                    </div>

                    <h2 className="text-lg font-bold tracking-tight text-neutral-900 dark:text-neutral-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                      {tree.name}
                    </h2>

                    <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                      Edited {updatedDate}
                    </p>
                  </div>

                  {/* Card Actions */}
                  <div className="mt-6 pt-3.5 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between gap-2">
                    <Link to={`/trees/${tree.id}`} className="flex-1">
                      <Button type="button" variant="secondary" size="sm" className="w-full font-semibold">
                        Open Canvas →
                      </Button>
                    </Link>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        title="Rename"
                        onClick={async () => {
                          const next = window.prompt('Rename tree archive', tree.name)
                          if (!next) return
                          const parsed = treeNameSchema.safeParse(next)
                          if (!parsed.success) return
                          await repo.saveTreeMeta({ ...tree, name: parsed.data })
                          await refresh()
                        }}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-black/[0.08] dark:border-white/[0.08] text-xs text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all cursor-pointer"
                      >
                        ✎
                      </button>

                      <button
                        type="button"
                        title="Duplicate"
                        onClick={async () => {
                          const copy = await repo.duplicateTree(tree.id)
                          await refresh()
                          navigate(`/trees/${copy.id}`)
                        }}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-black/[0.08] dark:border-white/[0.08] text-xs text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all cursor-pointer"
                      >
                        ⎘
                      </button>

                      <button
                        type="button"
                        title="Delete"
                        onClick={async () => {
                          if (!window.confirm(`Permanently delete “${tree.name}”? This cannot be undone.`)) {
                            return
                          }
                          await repo.deleteTree(tree.id)
                          await refresh()
                        }}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-black/[0.08] dark:border-white/[0.08] text-xs text-neutral-500 hover:text-rose-600 dark:text-neutral-400 dark:hover:text-rose-400 hover:bg-rose-500/10 transition-all cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        )}

        {/* Create Tree Modal */}
        <Modal open={createOpen} title="New Family Tree" onClose={() => setCreateOpen(false)}>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold tracking-wider text-neutral-600 dark:text-neutral-300 uppercase mb-1.5">
                Tree Title
              </label>
              <TextInput
                value={name}
                placeholder="e.g. The Kurian Lineage"
                onChange={(event) => setName(event.target.value)}
                autoFocus
              />
              {error ? <p className="mt-1 text-xs text-rose-500">{error}</p> : null}
            </div>

            <div className="rounded-xl border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.02] p-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                  Descendants Flow
                </span>
                <span className="text-[10px] font-medium tracking-wide uppercase text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-800/40">
                  Top-Down Tree
                </span>
              </div>
              <p className="mt-1 text-[11px] text-neutral-500 dark:text-neutral-400">
                Ancestors at the top, generations cascade downward, spouses sit side-by-side with children centered below.
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-black/[0.06] dark:border-white/[0.06]">
              <Button type="button" variant="ghost" size="md" onClick={() => setCreateOpen(false)}>
                Cancel
              </Button>
              <Button type="button" variant="primary" size="md" onClick={() => void create()}>
                Create Tree →
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </main>
  )
}
