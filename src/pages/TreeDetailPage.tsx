import { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FamilyCanvas } from '../canvas/FamilyCanvas'
import { templateById } from '../canvas/templates'
import { MemberForm } from '../components/editor/MemberForm'
import { OnboardingTour } from '../components/editor/OnboardingTour'
import { displayName } from '../domain/graph'
import { makeSampleBundle } from '../domain/sample'
import { treeNameSchema, type PersonFormValues } from '../domain/schemas'
import type { Person, RelativeKind, TreeBundle } from '../domain/types'
import { getRepository } from '../storage'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { CharacterAvatar } from '../ui/CharacterAvatar'
import { GenderBadge } from '../ui/GenderIcon'
import { Modal } from '../ui/Modal'
import { TextInput } from '../ui/Field'

export function TreeDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [bundle, setBundle] = useState<TreeBundle | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedPersonId, setSelectedPersonId] = useState<string | null>(null)
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
      givenName: 'New Member',
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
      <main className="flex min-h-[75vh] items-center justify-center bg-[#f9f9fb] dark:bg-[#09090b]">
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white/80 dark:bg-[#141419]/80 p-8 shadow-craft-md backdrop-blur-xl">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white font-bold animate-pulse">
            प
          </div>
          <p className="text-xs font-semibold tracking-tight text-neutral-600 dark:text-neutral-300">
            Opening Canvas...
          </p>
        </div>
      </main>
    )
  }

  if (!bundle) {
    return (
      <main className="mx-auto max-w-xl px-4 py-24 text-center">
        <Card>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Tree Archive Not Found
          </h1>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            This family tree may have been deleted or does not exist in this browser's local IndexedDB.
          </p>
          <div className="mt-6">
            <Link to="/trees">
              <Button variant="primary" size="md">Return to Studio</Button>
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
    <div className="relative flex h-[calc(100vh-4.25rem)] flex-col overflow-hidden bg-[#f9f9fb] dark:bg-[#09090b] transition-colors duration-300">
      {/* Archival Print Certificate Banner (Print Only) */}
      <div className="hidden print:block text-center py-6 border-b border-black mb-6">
        <p className="text-xs uppercase tracking-[0.2em] font-semibold text-neutral-500">
          Parampara Sovereign Genealogy Archive
        </p>
        <h1 className="text-3xl font-bold mt-1 text-black">{bundle.tree.name}</h1>
        <p className="text-xs text-neutral-600 mt-1">
          Preserved & printed on {new Date().toLocaleDateString('en-US', { dateStyle: 'long' })}
        </p>
      </div>

      {/* Floating Studio HUD Top Bar */}
      <header className="no-print z-20 flex flex-wrap items-center justify-between gap-3 border-b border-black/[0.06] dark:border-white/[0.06] bg-white/80 dark:bg-[#141419]/80 px-4 py-2.5 backdrop-blur-xl shadow-craft-xs">
        <div className="flex items-center gap-3">
          <Link
            to="/trees"
            className="flex items-center gap-1 rounded-full border border-black/[0.08] dark:border-white/[0.08] bg-white/70 dark:bg-[#181820]/70 px-3 py-1 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-black/5 dark:hover:bg-white/5 transition-all"
          >
            ← Canvases
          </Link>

          <div className="h-4 w-px bg-black/[0.08] dark:bg-white/[0.08]" />

          {/* Tree Name with edit button */}
          <div className="flex items-center gap-1.5">
            <h1 className="text-sm font-bold tracking-tight text-neutral-900 dark:text-white">
              {bundle.tree.name}
            </h1>
            <button
              type="button"
              onClick={() => {
                setTreeNameInput(bundle.tree.name)
                setRenameError('')
                setRenameModalOpen(true)
              }}
              className="flex h-5 w-5 items-center justify-center rounded-full text-xs text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition cursor-pointer"
              title="Rename tree"
            >
              ✎
            </button>
          </div>

          {/* Template Badge */}
          <div
            className="hidden sm:inline-flex items-center gap-2 rounded-full border border-black/[0.08] dark:border-white/[0.08] bg-white/80 dark:bg-[#181820]/80 px-3 py-1 text-xs font-medium text-neutral-700 dark:text-neutral-300 shadow-craft-xs"
          >
            <span
              className="h-2 w-2 rounded-full ring-1 ring-black/10 dark:ring-white/10"
              style={{ backgroundColor: currentTemplate.accent }}
            />
            <span>{currentTemplate.name}</span>
            <span className="text-[10px] uppercase tracking-wider text-neutral-400">· {currentTemplate.tag}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {bundle.people.length > 0 && (
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => void handleAddStandalonePerson()}
            >
              + Member
            </Button>
          )}


          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => void handleExport()}
            title="Export JSON backup archive"
          >
            Export JSON
          </Button>

          <Button
            type="button"
            variant="primary"
            size="sm"
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
            <Card className="pointer-events-auto max-w-md text-center p-8 shadow-craft-lg">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-2xl font-bold text-neutral-800 dark:text-neutral-200">
                प
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
                Begin Your Lineage
              </h2>
              <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                Add your earliest known ancestor to start branching kinship, or load our Kerala heritage sample family to experience the four layout perspectives.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2.5">
                <Button
                  type="button"
                  variant="primary"
                  size="md"
                  onClick={() => void handleAddStandalonePerson()}
                >
                  + Add First Member
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="md"
                  onClick={() => void handleAddFirstPerson()}
                >
                  Load Sample Lineage
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Craft Slide-Over Sheet (Inspector Drawer) */}
        {selectedPerson && (
          <aside className="no-print absolute top-3 right-3 bottom-3 z-20 flex w-full max-w-md flex-col rounded-3xl border border-black/[0.08] dark:border-white/[0.08] bg-white/95 dark:bg-[#141419]/95 p-5 shadow-craft-lg backdrop-blur-2xl transition-all duration-300">
            {/* Drawer Header */}
            <div className="mb-4 flex items-center justify-between border-b border-black/[0.06] dark:border-white/[0.06] pb-3.5">
              <div className="flex items-center gap-3">
                <CharacterAvatar
                  photoDataUrl={selectedPerson.photoDataUrl}
                  gender={selectedPerson.gender}
                  name={displayName(selectedPerson)}
                  isLate={selectedPerson.isLate}
                  className="h-10 w-10 shrink-0"
                />
                <div>
                  <h3 className="text-sm font-bold tracking-tight text-neutral-900 dark:text-white truncate max-w-[200px]">
                    {displayName(selectedPerson)}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <GenderBadge gender={selectedPerson.gender} size="sm" />
                    {isRoot && <Badge variant="accent">Central Root</Badge>}
                    {selectedPerson.isLate && (
                      <span className="rounded-full bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 text-[9px] font-medium text-neutral-500 dark:text-neutral-400">
                        Late
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPersonId(null)}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-black/[0.08] dark:border-white/[0.08] text-xs text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition cursor-pointer"
                aria-label="Close inspector"
              >
                ✕
              </button>
            </div>

            {/* Quick Kinship Connectors */}
            <div className="mb-4 space-y-2 rounded-2xl border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.02] p-3.5">
              <p className="text-[11px] font-semibold tracking-wider text-neutral-500 uppercase">
                Attach Kin to {selectedPerson.givenName || 'member'}
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => void handleAddRelative('parent')}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#1c1c24] py-2 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:border-indigo-500 dark:hover:border-indigo-400 transition cursor-pointer shadow-craft-xs"
                >
                  + Add Parent
                </button>
                <button
                  type="button"
                  onClick={() => void handleAddRelative('spouse')}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#1c1c24] py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:border-rose-500 transition cursor-pointer shadow-craft-xs"
                >
                  + Add Spouse
                </button>
                <button
                  type="button"
                  onClick={() => void handleAddRelative('child')}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#1c1c24] py-2 text-xs font-semibold text-teal-600 dark:text-teal-400 hover:border-teal-500 transition cursor-pointer shadow-craft-xs"
                >
                  + Add Child
                </button>
                <button
                  type="button"
                  onClick={() => void handleAddRelative('sibling')}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#1c1c24] py-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:border-indigo-500 transition cursor-pointer shadow-craft-xs"
                >
                  + Add Sibling
                </button>
              </div>

              {!isRoot && (
                <button
                  type="button"
                  onClick={() => void handleSetRoot()}
                  className="mt-1 flex w-full items-center justify-center gap-1 rounded-xl py-1 text-xs font-medium text-neutral-500 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition"
                >
                  ★ Set as Central Tree Root
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


      {/* Rename Tree Modal */}
      <Modal
        open={renameModalOpen}
        title="Rename Tree Archive"
        onClose={() => setRenameModalOpen(false)}
      >
        <div className="space-y-4">
          <TextInput
            value={treeNameInput}
            onChange={(e) => setTreeNameInput(e.target.value)}
            placeholder="e.g., The Travancore Lineage"
            autoFocus
          />
          {renameError && <p className="text-xs text-rose-500">{renameError}</p>}
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" size="md" onClick={() => setRenameModalOpen(false)}>
              Cancel
            </Button>
            <Button type="button" variant="primary" size="md" onClick={() => void handleRename()}>
              Save Title
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
