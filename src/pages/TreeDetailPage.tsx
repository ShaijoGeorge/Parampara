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
      givenName: 'Ancestor',
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
      <main className="flex min-h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-maroon/20 border-t-maroon" />
          <p className="font-display text-lg text-ink/70 dark:text-cream/70">
            Unrolling lineage canvas...
          </p>
        </div>
      </main>
    )
  }

  if (!bundle) {
    return (
      <main className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="font-display text-4xl">Tree not found</h1>
        <p className="mt-3 text-ink/70 dark:text-cream/70">
          This family tree might have been removed or does not exist in this browser.
        </p>
        <div className="mt-6">
          <Link to="/trees">
            <Button>Return to trees</Button>
          </Link>
        </div>
      </main>
    )
  }

  const currentTemplate = templateById(bundle.tree.templateId)
  const selectedPerson = bundle.people.find((p) => p.id === selectedPersonId)
  const isRoot = bundle.tree.rootPersonId === selectedPersonId

  return (
    <div className="relative flex h-[calc(100vh-4rem)] flex-col overflow-hidden bg-[#faf7f2] dark:bg-[#1c120c]">
      {/* Top action toolbar */}
      <header className="no-print z-20 flex flex-wrap items-center justify-between gap-3 border-b border-maroon/10 bg-cream/95 px-4 py-2.5 backdrop-blur-md dark:border-cream/10 dark:bg-ink/90">
        <div className="flex items-center gap-3">
          <Link
            to="/trees"
            className="flex items-center gap-1 rounded-full px-2.5 py-1 text-sm font-medium text-ink/70 transition hover:bg-ink/5 dark:text-cream/70 dark:hover:bg-cream/10"
          >
            ← Trees
          </Link>
          <div className="h-4 w-px bg-maroon/15 dark:bg-cream/15" />
          <div className="flex items-center gap-2">
            <h1 className="font-display text-xl font-bold text-ink dark:text-cream">
              {bundle.tree.name}
            </h1>
            <button
              type="button"
              onClick={() => {
                setTreeNameInput(bundle.tree.name)
                setRenameError('')
                setRenameModalOpen(true)
              }}
              className="text-xs text-ink/50 hover:text-maroon dark:text-cream/50 dark:hover:text-gold"
              title="Rename tree"
            >
              ✎
            </button>
          </div>
          <button
            type="button"
            onClick={() => setTemplateModalOpen(true)}
            className="hidden items-center gap-1.5 rounded-full border border-maroon/20 bg-white/80 px-3 py-1 text-xs font-medium text-ink shadow-xs transition hover:border-gold sm:inline-flex dark:border-cream/20 dark:bg-ink/60 dark:text-cream"
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: currentTemplate.accent }}
            />
            {currentTemplate.name}
            <span className="text-ink/40 dark:text-cream/40">· {currentTemplate.tag}</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {bundle.people.length > 0 && (
            <Button
              type="button"
              variant="ghost"
              className="!px-3 !py-1 text-xs"
              onClick={() => void handleAddStandalonePerson()}
            >
              + Person
            </Button>
          )}
          <Button
            type="button"
            variant="ghost"
            className="hidden !px-3 !py-1 text-xs sm:inline-flex"
            onClick={() => setTemplateModalOpen(true)}
          >
            Template
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="!px-3 !py-1 text-xs"
            onClick={() => void handleExport()}
            title="Export JSON backup to your computer"
          >
            Export
          </Button>
          <Button
            type="button"
            variant="gold"
            className="!px-3 !py-1 text-xs font-semibold"
            onClick={() => window.print()}
            title="Print canvas or save as PDF"
          >
            Print / PDF
          </Button>
        </div>
      </header>

      {/* Main Canvas Viewport */}
      <div className="relative flex-1">
        <FamilyCanvas
          people={bundle.people}
          edges={bundle.edges}
          template={bundle.tree.templateId}
          rootPersonId={bundle.tree.rootPersonId}
          selectedPersonId={selectedPersonId}
          onSelect={(pid) => setSelectedPersonId(pid)}
        />

        {/* Empty tree state */}
        {bundle.people.length === 0 && (
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center p-4">
            <Card className="pointer-events-auto max-w-md text-center shadow-2xl">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-saffron to-maroon text-2xl text-cream shadow-md">
                प
              </div>
              <h2 className="font-display text-3xl font-bold text-ink dark:text-cream">
                Begin your lineage
              </h2>
              <p className="mt-2 text-sm text-ink/70 dark:text-cream/70">
                Start with your earliest known ancestor or drop in our sample heritage family to explore the canvas layouts.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button
                  type="button"
                  onClick={() => void handleAddStandalonePerson()}
                >
                  Add first ancestor
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => void handleAddFirstPerson()}
                >
                  Load sample family
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Person Inspector Drawer */}
        {selectedPerson && (
          <aside className="no-print absolute top-3 right-3 bottom-3 z-20 flex w-full max-w-md flex-col rounded-3xl border border-maroon/15 bg-white/95 p-5 shadow-2xl backdrop-blur-md dark:border-cream/15 dark:bg-ink/95">
            <div className="mb-4 flex items-center justify-between border-b border-ink/10 pb-3 dark:border-cream/10">
              <div className="flex items-center gap-2">
                <h3 className="font-display text-xl font-bold text-ink dark:text-cream">
                  {displayName(selectedPerson)}
                </h3>
                {isRoot && <Badge>Root</Badge>}
                {selectedPerson.isLate && (
                  <span className="rounded-full bg-ink/10 px-2 py-0.5 text-xs text-ink/70 dark:bg-cream/10 dark:text-cream/70">
                    Late
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setSelectedPersonId(null)}
                className="rounded-full p-1 text-ink/60 hover:bg-ink/10 dark:text-cream/60 dark:hover:bg-cream/10"
                aria-label="Close inspector"
              >
                ✕
              </button>
            </div>

            {/* Quick Relative Buttons */}
            <div className="mb-4 space-y-2 rounded-2xl bg-cream/70 p-3 dark:bg-ink/60">
              <p className="text-xs font-semibold tracking-wider text-ink/60 uppercase dark:text-cream/60">
                Attach relative to {selectedPerson.givenName || 'member'}
              </p>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  className="!py-1.5 text-xs font-medium"
                  onClick={() => void handleAddRelative('parent')}
                >
                  + Add Parent
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="!py-1.5 text-xs font-medium"
                  onClick={() => void handleAddRelative('spouse')}
                >
                  + Add Spouse
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="!py-1.5 text-xs font-medium"
                  onClick={() => void handleAddRelative('child')}
                >
                  + Add Child
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="!py-1.5 text-xs font-medium"
                  onClick={() => void handleAddRelative('sibling')}
                >
                  + Add Sibling
                </Button>
              </div>
              {!isRoot && (
                <button
                  type="button"
                  onClick={() => void handleSetRoot()}
                  className="mt-1 w-full rounded-xl py-1 text-center text-xs text-maroon hover:underline dark:text-gold"
                >
                  Make this member the Tree Root
                </button>
              )}
            </div>

            {/* Member Edit Form */}
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

      {/* Template Switcher Modal */}
      <Modal
        open={templateModalOpen}
        title="Select Canvas Silhouette"
        onClose={() => setTemplateModalOpen(false)}
      >
        <p className="mb-4 text-sm text-ink/70 dark:text-cream/70">
          Switch the layout view without losing or rearranging your lineage data.
        </p>
        <TemplateGallery
          current={bundle.tree.templateId}
          onPick={(tid) => void onSelectTemplate(tid)}
        />
      </Modal>

      {/* Rename Tree Modal */}
      <Modal
        open={renameModalOpen}
        title="Rename family tree"
        onClose={() => setRenameModalOpen(false)}
      >
        <div className="space-y-4">
          <TextInput
            value={treeNameInput}
            onChange={(e) => setTreeNameInput(e.target.value)}
            autoFocus
          />
          {renameError && <p className="text-xs text-maroon">{renameError}</p>}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => setRenameModalOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={() => void handleRename()}>
              Save name
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
