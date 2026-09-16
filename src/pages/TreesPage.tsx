import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TEMPLATES, templateById } from '../canvas/templates'
import { makeSampleBundle } from '../domain/sample'
import { treeNameSchema } from '../domain/schemas'
import type { TemplateId, Tree } from '../domain/types'
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
  const [chosenTemplate, setChosenTemplate] = useState<TemplateId>('pedigree')
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
    const tree = await repo.createTree(parsed.data, chosenTemplate)
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
    <main className="mx-auto max-w-6xl px-4 py-12">
      {/* Studio Header Bar */}
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-gold/20 pb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-display text-xs font-bold tracking-[0.25em] text-maroon uppercase dark:text-gold">
              Genealogy Atelier
            </span>
            <Badge>{trees.length} {trees.length === 1 ? 'Archive' : 'Archives'}</Badge>
          </div>
          <h1 className="font-display mt-2 text-4xl sm:text-5xl font-extrabold text-ink dark:text-cream">
            Your Family Trees
          </h1>
          <p className="mt-2 text-sm text-ink/70 dark:text-cream/70">
            Select a lineage canvas to open the interactive editor, or create an archive for another branch.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <Button
            type="button"
            variant="gold"
            className="!px-5 !py-2.5 font-bold"
            onClick={() => setCreateOpen(true)}
          >
            + Create New Tree
          </Button>

          <Button
            type="button"
            variant="secondary"
            className="!px-5 !py-2.5"
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
            className="!px-4 !py-2.5"
            onClick={() => fileRef.current?.click()}
          >
            Import JSON Archive
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
        <div className="mt-4 rounded-2xl border border-maroon/30 bg-maroon/10 p-4 text-xs font-semibold text-maroon dark:text-gold">
          ⚠️ {importError}
        </div>
      ) : null}

      {/* Lineage Tree Grid */}
      {trees.length === 0 ? (
        <Card className="mt-12 text-center p-12 border-dashed border-gold/40">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-gold/15 text-3xl font-serif text-maroon dark:text-gold">
            प
          </div>
          <h2 className="font-display text-3xl font-bold text-ink dark:text-cream">
            No family trees yet
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-ink/70 dark:text-cream/70">
            Start with an empty canvas, import a previously exported archive, or load our Kerala heritage sample family.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button type="button" variant="gold" onClick={() => setCreateOpen(true)}>
              Create First Tree
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
              Load Sample Lineage
            </Button>
          </div>
        </Card>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                className="group flex flex-col justify-between hover:-translate-y-1 hover:border-gold hover:shadow-[0_20px_50px_-15px_rgba(201,162,39,0.3)] transition-all duration-300"
              >
                <div>
                  {/* Silhouette Paper Preview Banner */}
                  <div
                    className="relative mb-4 h-28 w-full rounded-2xl border border-gold/25 shadow-inner overflow-hidden flex items-center justify-center p-4"
                    style={{ background: skin.paper }}
                  >
                    <div className="absolute top-2.5 right-2.5">
                      <Badge>{skin.tag}</Badge>
                    </div>
                    <div className="text-center">
                      <p className="font-serif text-lg font-bold text-ink drop-shadow-xs">
                        {skin.name}
                      </p>
                      <p className="text-[10px] text-ink/60 tracking-wider uppercase font-semibold">
                        2D Interactive Silhouette
                      </p>
                    </div>
                  </div>

                  <h2 className="font-display text-2xl font-bold text-ink dark:text-cream group-hover:text-maroon dark:group-hover:text-gold transition-colors">
                    {tree.name}
                  </h2>

                  <p className="mt-1 text-xs text-ink/55 dark:text-cream/55">
                    Last edited {updatedDate}
                  </p>
                </div>

                {/* Card Actions */}
                <div className="mt-6 pt-4 border-t border-gold/15 flex flex-wrap items-center justify-between gap-2">
                  <Link to={`/trees/${tree.id}`} className="flex-1">
                    <Button type="button" variant="primary" className="w-full !py-2 text-xs font-bold">
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
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/10 text-xs text-ink/70 transition hover:border-gold hover:text-maroon dark:border-cream/15 dark:text-cream/70 dark:hover:text-gold cursor-pointer"
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
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/10 text-xs text-ink/70 transition hover:border-gold hover:text-maroon dark:border-cream/15 dark:text-cream/70 dark:hover:text-gold cursor-pointer"
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
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/10 text-xs text-ink/70 transition hover:border-maroon hover:text-maroon dark:border-cream/15 dark:text-cream/70 dark:hover:text-red-400 cursor-pointer"
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
      <Modal open={createOpen} title="Initiate Family Archive" onClose={() => setCreateOpen(false)}>
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-semibold tracking-wider text-maroon uppercase dark:text-gold mb-1.5">
              Archive Name
            </label>
            <TextInput
              value={name}
              placeholder="e.g. The Kurian Lineage"
              onChange={(event) => setName(event.target.value)}
              autoFocus
            />
            {error ? <p className="mt-1 text-xs text-maroon">{error}</p> : null}
          </div>

          <div>
            <label className="block text-xs font-semibold tracking-wider text-maroon uppercase dark:text-gold mb-2">
              Initial Silhouette
            </label>
            <div className="grid grid-cols-2 gap-2">
              {TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl.id}
                  type="button"
                  onClick={() => setChosenTemplate(tmpl.id)}
                  className={`rounded-2xl border p-3 text-left transition cursor-pointer ${
                    chosenTemplate === tmpl.id
                      ? 'border-gold bg-gold/15 ring-2 ring-gold'
                      : 'border-gold/20 bg-white/70 hover:border-gold/50 dark:bg-ink/50'
                  }`}
                >
                  <p className="font-serif text-sm font-bold text-ink dark:text-cream">
                    {tmpl.name}
                  </p>
                  <p className="text-[11px] text-ink/60 dark:text-cream/60">{tmpl.tag}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-gold/15">
            <Button type="button" variant="ghost" onClick={() => setCreateOpen(false)}>
              Cancel
            </Button>
            <Button type="button" variant="gold" onClick={() => void create()}>
              Create & Enter Canvas →
            </Button>
          </div>
        </div>
      </Modal>
    </main>
  )
}
