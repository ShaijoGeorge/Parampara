import { Link } from 'react-router-dom'
import { BackupBanner } from '../ui/BackupBanner'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'

export function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f9f9fb] dark:bg-[#09090b] text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
      <div className="mx-auto max-w-4xl px-4 py-14 sm:py-20">
        {/* Editorial Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Philosophy & Origins
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Tradition, crafted for tomorrow.
          </h1>
          <p className="mx-auto max-w-2xl text-base text-neutral-600 dark:text-neutral-400 leading-relaxed pt-1">
            Parampara — from the Sanskrit for <em>uninterrupted succession</em> — was built on a simple premise:
            family stories are living legacies, not sterile tabular data.
          </p>
        </div>

        <div className="mt-12 space-y-6">
          <Card className="p-6 sm:p-8">
            <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
              The Human Shape of Kinship
            </h2>
            <p className="mt-2.5 leading-relaxed text-sm text-neutral-600 dark:text-neutral-300">
              You describe your elders and descendants the way families actually speak across dinner tables:
              who married whom, how many children came of that union, who migrated across seas,
              and who we hold in sacred memory.
            </p>
            <p className="mt-3 leading-relaxed text-sm text-neutral-600 dark:text-neutral-300">
              Rather than forcing your family into an awkward static diagram, Parampara gives you four
              fluid layout perspectives: <strong>Descendants Flow</strong>, <strong>Direct Lineage</strong>,
              <strong>Balanced Hourglass</strong>, and the structured <strong>Clan Bento Matrix</strong>.
            </p>
          </Card>

          <Card className="p-6 sm:p-8">
            <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Sovereignty & Complete Local Privacy
            </h2>
            <p className="mt-2.5 leading-relaxed text-sm text-neutral-600 dark:text-neutral-300">
              Commercial genealogy platforms commoditize personal records, DNA, and family relations.
              Parampara fundamentally rejects this. In this application:
            </p>
            <div className="mt-5 grid gap-3.5 sm:grid-cols-2 text-xs">
              <div className="rounded-2xl border border-black/[0.06] dark:border-white/[0.06] bg-neutral-50 dark:bg-[#181820] p-4">
                <p className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm">✦ Sealed on Device</p>
                <p className="mt-1 text-neutral-500 dark:text-neutral-400">
                  Your trees and portraits live exclusively inside IndexedDB on your personal browser.
                </p>
              </div>
              <div className="rounded-2xl border border-black/[0.06] dark:border-white/[0.06] bg-neutral-50 dark:bg-[#181820] p-4">
                <p className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm">✦ Zero Ad Tracking</p>
                <p className="mt-1 text-neutral-500 dark:text-neutral-400">
                  No third-party trackers, no cloud harvesting, no telemetry pixels.
                </p>
              </div>
            </div>
          </Card>

          <div className="mt-6">
            <BackupBanner />
          </div>

          <div className="text-center pt-6">
            <Link to="/trees">
              <Button variant="primary" size="lg" className="shadow-craft-sm">
                Open Your Lineage Studio →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

export function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#f9f9fb] dark:bg-[#09090b] text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
      <div className="mx-auto max-w-4xl px-4 py-14 sm:py-20">
        <div className="text-center space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
            Sovereign Privacy
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Your home. Your records.
          </h1>
          <p className="mx-auto max-w-xl text-base text-neutral-600 dark:text-neutral-400">
            A definitive, uncompromising standard for client-side genealogy privacy.
          </p>
        </div>

        <div className="mt-10 space-y-5">
          <Card className="p-6 sm:p-8">
            <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
              The Local-First Guarantee
            </h2>
            <ul className="mt-4 space-y-3.5 text-sm text-neutral-600 dark:text-neutral-300">
              <li className="flex items-start gap-3">
                <span className="text-indigo-600 dark:text-indigo-400 font-bold">1.</span>
                <div>
                  <strong className="text-neutral-900 dark:text-white">No Cloud Accounts:</strong> You never need to sign up, provide an email address, or create a password to use Parampara.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-600 dark:text-indigo-400 font-bold">2.</span>
                <div>
                  <strong className="text-neutral-900 dark:text-white">In-Browser Compression:</strong> When you upload a family photograph, it is compressed client-side and saved into your browser’s IndexedDB.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-600 dark:text-indigo-400 font-bold">3.</span>
                <div>
                  <strong className="text-neutral-900 dark:text-white">Self-Contained Backups:</strong> Exporting a JSON archive produces an open digital time capsule file that you can save to a drive or email to siblings.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-600 dark:text-indigo-400 font-bold">4.</span>
                <div>
                  <strong className="text-neutral-900 dark:text-white">Storage Awareness:</strong> Clearing your browser’s cookies or site data for this domain wipes the local database unless you exported a JSON backup.
                </div>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </main>
  )
}
