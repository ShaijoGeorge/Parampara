import { BackupBanner } from '../ui/BackupBanner'

export function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <p className="text-sm tracking-[0.2em] text-saffron uppercase">About</p>
      <h1 className="font-display mt-2 text-5xl">Tradition, drawn by hand.</h1>
      <p className="mt-6 text-lg text-ink/75 dark:text-cream/75">
        Parampara is a family-tree studio. You describe people the way families
        actually talk — who married whom, how many children, where they live,
        and who we remember as late. The canvas is 2D and interactive: pedigree,
        river, mandala, and a compact clan view.
      </p>
      <p className="mt-4 text-lg text-ink/75 dark:text-cream/75">
        There is no login in this version. Trees are written to IndexedDB, which
        is persistent browser storage, not the HTTP cache. Shareable links will
        need a later sync service; until then, export JSON and send the file.
      </p>
      <div className="mt-8">
        <BackupBanner />
      </div>
    </main>
  )
}

export function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <p className="text-sm tracking-[0.2em] text-teal uppercase">Privacy</p>
      <h1 className="font-display mt-2 text-5xl">Your house, your records.</h1>
      <ul className="mt-6 list-disc space-y-3 pl-5 text-lg text-ink/75 dark:text-cream/75">
        <li>No account, no server copy of your tree in v1.</li>
        <li>Portraits are compressed and stored beside the tree in IndexedDB.</li>
        <li>Clearing site data for this origin deletes trees unless you exported them.</li>
        <li>Print and JSON export never leave the machine unless you share the file.</li>
      </ul>
    </main>
  )
}
