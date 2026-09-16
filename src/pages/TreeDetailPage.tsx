import { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FamilyCanvas } from '../canvas/FamilyCanvas'
import { templateById } from '../canvas/templates'
import { MemberForm } from '../components/editor/MemberForm'
import { OnboardingTour } from '../components/editor/OnboardingTour'
import { TemplateGallery } from '../components/editor/TemplateGallery'
import { displayName } from '../domain/graph'
import { makeSampleBundle } from '../domain/sample'
import { treeNameSchema, type PersonFormValues } from '../domain/schemas'
import type { Person, RelativeKind, TemplateId, TreeBundle } from '../domain/types'
import { getRepository } from '../storage'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { Modal } from '../ui/Modal'
import { TextInput } from '../ui/Field'

export function TreeDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [bundle, setBundle] = useState<TreeBundle | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedPersonId, setSelectedPersonId] = useState<string | null>(null)
  const [templateModalOpen, setTemplateModalOpen] = useState(false)
  const [renameModalOpen, setRenameModalOpen] = useState(false)
  const [treeNameInput, setTreeNameInput] = useState('')
  const [renameError, setRenameError] = useState('')
  const [tourStep, setTourStep] = useState<number | null>(null)

  const repo = getRepository()

  const refresh = useCallback(async () => {
    if (!id) return
    const data = await repo.getBundle(id)
    setBundle(data ?? null)
    setLoading(false)
  }, [id, repo])

  useEffect(() => {
    void refresh()
    void repo.getSettings().then((settings) => {
      if (!settings.onboardingDone) {
        setTourStep(0)
      }
    })
  }, [id, refresh, repo])

  const finishTour = async () => {
    setTourStep(null)
    await repo.saveSettings({ onboardingDone: true })
  }

  const onSelectTemplate = async (templateId: TemplateId) => {
    if (!bundle) return
    await repo.setTemplate(bundle.tree.id, templateId)
    setTemplateModalOpen(false)
    await refresh()
  }

  const handleRename = async () => {
    if (!bundle) return
    const parsed = treeNameSchema.safeParse(treeNameInput)
    if (!parsed.success) {
      setRenameError(parsed.error.issues[0]?.message ?? 'Invalid name')
      return
    }
    await repo.saveTreeMeta({ ...bundle.tree, name: parsed.data })
    setRenameModalOpen(false)
    await refresh()
  }

  const handleExport = async () => {
    if (!bundle) return
    const payload = await repo.exportTree(bundle.tree.id)
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `${bundle.tree.name.toLowerCase().replace(/\s+/g, '_')}_parampara.json`
    anchor.click()
    URL.revokeObjectURL(url)
  }

  const handleAddFirstPerson = async () => {
    if (!bundle) return
    const sample = makeSampleBundle()
    sample.tree.id = bundle.tree.id
    sample.tree.name = bundle.tree.name
    sample.people.forEach((p) => (p.treeId = bundle.tree.id))
    sample.edges.forEach((e) => (e.treeId = bundle.tree.id))
    await repo.putBundle(sample)
    await refresh()
  }

  const handleAddStandalonePerson = async () => {
    if (!bundle) return
    const newPerson: Person = {
      id: crypto.randomUUID(),
      treeId: bundle.tree.id,
      givenName: 'New Ancestor',
      familyName: '',
      gender: 'unspecified',
      livingPlace: '',
      isLate: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    await repo.upsertPerson(newPerson)
    await refresh()
    setSelectedPersonId(newPerson.id)
  }

  const handleAddRelative = async (kind: RelativeKind) => {
    if (!bundle || !selectedPersonId) return
    const created = await repo.addRelative(bundle.tree.id, selectedPersonId, kind)
    await refresh()
    setSelectedPersonId(created.id)
  }

  const handleSavePerson = async (values: PersonFormValues, photoDataUrl?: string) => {
    if (!bundle || !selectedPersonId) return
    const current = bundle.people.find((p) => p.id === selectedPersonId)
    if (!current) return
    const updated: Person = {
      ...current,
      ...values,
      photoDataUrl: photoDataUrl !== undefined ? photoDataUrl : current.photoDataUrl,
      isPlaceholder: false,
    }
    await repo.upsertPerson(updated)
    await refresh()
  }

  const handleDeletePerson = async () => {
    if (!bundle || !selectedPersonId) return
    const person = bundle.people.find((p) => p.id === selectedPersonId)
    if (!person) return
    if (!window.confirm(`Delete ${displayName(person)}? Connected relationships will be removed.`)) {
      return
    }
    await repo.deletePerson(bundle.tree.id, selectedPersonId)
    setSelectedPersonId(null)
    await refresh()
  }

  const handleSetRoot = async () => {
    if (!bundle || !selectedPersonId) return
    await repo.setRoot(bundle.tree.id, selectedPersonId)
    await refresh()
  }

  if (loading) {
    return (
      <main className="flex min-h-[75vh] items-center justify-center bg-constellation">
        <div className="flex flex-col items-center gap-4 rounded-3xl border border-gold/30 bg-cream/80 p-8 shadow-xl backdrop-blur-xl dark:bg-ink/80">
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gold via-saffron to-maroon text-2xl font-black text-cream shadow-md animate-pulse">
            प
          </div>
          <p className="font-display text-lg font-bold tracking-wide text-ink dark:text-cream">
            Unrolling Sacred Lineage Canvas...
          </p>
        </div>
      </main>
    )
  }

  if (!bundle) {
    return (
      <main className="mx-auto max-w-xl px-4 py-24 text-center">
        <Card>
          <h1 className="font-display text-4xl font-bold text-ink dark:text-cream">
            Tree Archive Not Found
          </h1>
          <p className="mt-3 text-sm text-ink/70 dark:text-cream/70">
            This family tree may have been removed or does not exist in this browser's IndexedDB storage.
          </p>
          <div className="mt-6">
            <Link to="/trees">
              <Button>Return to Studio</Button>
            </Link>
          </div>
        </Card>
      </main>
    )
  }

  const currentTemplate = templateById(bundle.tree.templateId)
  const selectedPerson = bundle.people.find((p) => p.id === selectedPersonId)
  const isRoot = bundle.tree.rootPersonId === selectedPersonId

  return (
    <div className="relative flex h-[calc(100vh-4.25rem)] flex-col overflow-hidden bg-[#faf7f2] dark:bg-[#120b08]">
      {/* Archival Print Certificate Banner (Visible only in print) */}
      <div className="hidden print:block text-center py-6 border-b-2 border-gold mb-6">
        <p className="text-xs uppercase tracking-[0.3em] text-gold-dark font-semibold">
          Parampara Sovereign Genealogy Archive
        </p>
        <h1 className="font-display text-3xl font-bold mt-1 text-maroon">{bundle.tree.name}</h1>
        <p className="text-xs text-ink/60 mt-1 italic">
          Preserved & printed on {new Date().toLocaleDateString('en-US', { dateStyle: 'long' })}
        </p>
      </div>

      {/* Floating Studio HUD Top Bar */}
      <header className="no-print z-20 flex flex-wrap items-center justify-between gap-3 border-b border-gold/20 bg-cream/90 px-4 py-2.5 backdrop-blur-xl shadow-xs dark:border-gold/15 dark:bg-[#18100c]/90">
        <div className="flex items-center gap-3">
          <Link
            to="/trees"
            className="flex items-center gap-1.5 rounded-full border border-gold/25 bg-white/60 px-3 py-1 text-xs font-semibold text-ink/80 transition-all hover:border-gold hover:text-maroon hover:shadow-xs dark:border-gold/20 dark:bg-ink/60 dark:text-cream/80 dark:hover:text-gold"
          >
            ← Studio
          </Link>

          <div className="h-4 w-px bg-gold/30" />

          {/* Tree Name with edit button */}
          <div className="flex items-center gap-2">
            <h1 className="font-display text-xl font-bold tracking-tight text-ink dark:text-cream">
              {bundle.tree.name}
            </h1>
            <button
              type="button"
              onClick={() => {
                setTreeNameInput(bundle.tree.name)
                setRenameError('')
                setRenameModalOpen(true)
              }}
              className="flex h-6 w-6 items-center justify-center rounded-full text-xs text-ink/40 transition hover:bg-gold/15 hover:text-maroon dark:text-cream/40 dark:hover:text-gold cursor-pointer"
              title="Rename tree"
            >
              ✎
            </button>
          </div>

          {/* Template Badge & Trigger */}
          <button
            type="button"
            onClick={() => setTemplateModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-2 rounded-full border border-gold/35 bg-gold/10 px-3.5 py-1 text-xs font-semibold text-ink transition-all hover:border-gold hover:shadow-xs dark:border-gold/25 dark:text-cream cursor-pointer"
          >
            <span
              className="h-2 w-2 rounded-full ring-2 ring-gold/40"
              style={{ backgroundColor: currentTemplate.accent }}
            />
            {currentTemplate.name}
            <span className="text-[10px] uppercase tracking-wider opacity-60">· {currentTemplate.tag}</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {bundle.people.length > 0 && (
            <Button
              type="button"
              variant="ghost"
              className="!px-3.5 !py-1 text-xs font-semibold"
              onClick={() => void handleAddStandalonePerson()}
            >
              + Ancestor
            </Button>
          )}

          <Button
            type="button"
            variant="ghost"
            className="hidden sm:inline-flex !px-3.5 !py-1 text-xs font-semibold"
            onClick={() => setTemplateModalOpen(true)}
          >
            Silhouette
          </Button>

          <Button
            type="button"
            variant="ghost"
            className="!px-3.5 !py-1 text-xs font-semibold"
            onClick={() => void handleExport()}
            title="Export JSON backup archive"
          >
            Export JSON
          </Button>

          <Button
            type="button"
            variant="gold"
            className="!px-4 !py-1 text-xs font-bold"
            onClick={() => window.print()}
            title="Print Archival Poster or save PDF"
          >
            Print Poster
          </Button>
        </div>
      </header>

      {/* Canvas Viewport */}
      <div className="relative flex-1">
        <FamilyCanvas
          people={bundle.people}
          edges={bundle.edges}
          template={bundle.tree.templateId}
          rootPersonId={bundle.tree.rootPersonId}
          selectedPersonId={selectedPersonId}
          onSelect={(pid) => setSelectedPersonId(pid)}
        />

        {/* Empty Lineage Callout */}
        {bundle.people.length === 0 && (
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center p-4">
            <Card className="pointer-events-auto max-w-md text-center border-gold/40 shadow-2xl p-8">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-gold-light via-saffron to-maroon text-3xl font-black text-cream shadow-lg">
                प
              </div>
              <h2 className="font-display text-3xl font-bold text-ink dark:text-cream">
                Begin Your Dynasty
              </h2>
              <p className="mt-2 text-sm text-ink/70 leading-relaxed dark:text-cream/70">
                Every grand lineage begins with a single name. Add your earliest known ancestor, or load our heritage sample family to experience the four canvas silhouettes.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button
                  type="button"
                  onClick={() => void handleAddStandalonePerson()}
                >
                  Add Earliest Ancestor
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => void handleAddFirstPerson()}
                >
                  Load Sample Family
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Genealogy Atelier (Sliding Inspector Drawer) */}
        {selectedPerson && (
          <aside className="no-print absolute top-3 right-3 bottom-3 z-20 flex w-full max-w-md flex-col rounded-3xl border border-gold/30 bg-cream/95 p-5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-all duration-300 dark:border-gold/20 dark:bg-[#18100c]/95">
            {/* Atelier Drawer Header */}
            <div className="mb-4 flex items-center justify-between border-b border-gold/20 pb-3.5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-gold to-maroon text-cream font-serif font-bold shadow-xs">
                  {selectedPerson.givenName?.[0] || '—'}
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-ink dark:text-cream truncate max-w-[200px]">
                    {displayName(selectedPerson)}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    {isRoot && <Badge>Tree Root</Badge>}
                    {selectedPerson.isLate && (
                      <span className="rounded-full border border-gold/30 bg-gold/10 px-2 py-0.5 text-[10px] font-bold text-maroon uppercase dark:text-gold-light">
                        Late
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPersonId(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/10 text-xs text-ink/60 transition hover:border-gold hover:text-maroon dark:border-cream/10 dark:text-cream/60 dark:hover:text-gold cursor-pointer"
                aria-label="Close inspector"
              >
                ✕
              </button>
            </div>

            {/* Quick Kinship Connectors */}
            <div className="mb-4 space-y-2 rounded-2xl border border-gold/20 bg-gold/5 p-3.5">
              <p className="text-[11px] font-bold tracking-widest text-maroon uppercase dark:text-gold">
                Attach Kin to {selectedPerson.givenName || 'member'}
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => void handleAddRelative('parent')}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-maroon/20 bg-white/70 py-2 text-xs font-semibold text-maroon transition hover:bg-maroon hover:text-cream dark:border-gold/20 dark:bg-ink/50 dark:text-gold-light dark:hover:bg-maroon cursor-pointer"
                >
                  + Add Parent
                </button>
                <button
                  type="button"
                  onClick={() => void handleAddRelative('spouse')}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-gold/30 bg-white/70 py-2 text-xs font-semibold text-saffron-ink transition hover:bg-gold hover:text-ink dark:border-gold/20 dark:bg-ink/50 dark:text-gold-light dark:hover:bg-gold dark:hover:text-ink cursor-pointer"
                >
                  + Add Spouse
                </button>
                <button
                  type="button"
                  onClick={() => void handleAddRelative('child')}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-teal/25 bg-white/70 py-2 text-xs font-semibold text-teal transition hover:bg-teal hover:text-cream dark:border-teal/20 dark:bg-ink/50 dark:text-teal dark:hover:bg-teal dark:hover:text-cream cursor-pointer"
                >
                  + Add Child
                </button>
                <button
                  type="button"
                  onClick={() => void handleAddRelative('sibling')}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-saffron/25 bg-white/70 py-2 text-xs font-semibold text-saffron transition hover:bg-saffron hover:text-cream dark:border-saffron/20 dark:bg-ink/50 dark:text-saffron-light dark:hover:bg-saffron cursor-pointer"
                >
                  + Add Sibling
                </button>
              </div>

              {!isRoot && (
                <button
                  type="button"
                  onClick={() => void handleSetRoot()}
                  className="mt-1 flex w-full items-center justify-center gap-1 rounded-xl py-1 text-xs font-medium text-maroon hover:underline dark:text-gold cursor-pointer"
                >
                  👑 Set as Central Tree Root
                </button>
              )}
            </div>

            {/* Member Form Body */}
            <div className="flex-1 overflow-y-auto pr-1">
              <MemberForm
                person={selectedPerson}
                onSave={handleSavePerson}
                onDelete={handleDeletePerson}
              />
            </div>
          </aside>
        )}
      </div>

      {/* Onboarding Tour */}
      {tourStep !== null && (
        <OnboardingTour
          step={tourStep}
          onNext={() => {
            if (tourStep >= 3) {
              void finishTour()
            } else {
              setTourStep((s) => (s ?? 0) + 1)
            }
          }}
          onSkip={() => void finishTour()}
        />
      )}

      {/* Silhouette Switcher Modal */}
      <Modal
        open={templateModalOpen}
        title="Canvas Silhouette & Cloth"
        onClose={() => setTemplateModalOpen(false)}
      >
        <p className="mb-4 text-xs leading-relaxed text-ink/70 dark:text-cream/70">
          Transform your genealogical projection instantly. Your family ties remain identical across every silhouette.
        </p>
        <TemplateGallery
          current={bundle.tree.templateId}
          onPick={(tid) => void onSelectTemplate(tid)}
        />
      </Modal>

      {/* Rename Tree Modal */}
      <Modal
        open={renameModalOpen}
        title="Rename Family Archive"
        onClose={() => setRenameModalOpen(false)}
      >
        <div className="space-y-4">
          <TextInput
            value={treeNameInput}
            onChange={(e) => setTreeNameInput(e.target.value)}
            placeholder="e.g., The Travancore Lineage"
            autoFocus
          />
          {renameError && <p className="text-xs text-maroon">{renameError}</p>}
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={() => setRenameModalOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={() => void handleRename()}>
              Save Archive Name
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
