import { Link } from 'react-router-dom'
import { BackupBanner } from '../ui/BackupBanner'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'

export function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:py-24">
      {/* Editorial Header */}
      <div className="text-center space-y-3">
        <span className="font-display text-xs font-bold tracking-[0.3em] text-maroon uppercase dark:text-gold">
          Philosophy & Origins
        </span>
        <h1 className="font-display text-5xl sm:text-6xl font-extrabold text-ink dark:text-cream">
          Tradition, drawn by hand.
        </h1>
        <p className="mx-auto max-w-2xl text-base text-ink/75 dark:text-cream/75 leading-relaxed pt-2">
          Parampara — from the Sanskrit for <em>uninterrupted succession</em> — was built on a simple truth:
          families are living tapestries, not sterile database rows.
        </p>
      </div>

      <div className="mt-14 space-y-8">
        <Card className="p-8 sm:p-10 border-gold/30">
          <h2 className="font-display text-2xl font-bold text-ink dark:text-cream">
            The Human Shape of Kinship
          </h2>
          <p className="mt-3 leading-relaxed text-sm sm:text-base text-ink/80 dark:text-cream/80">
            You describe your elders and descendants the way families actually speak across dinner tables:
            who married whom, how many children came of that union, who migrated across seas,
            and who we hold in sacred memory as late.
          </p>
          <p className="mt-4 leading-relaxed text-sm sm:text-base text-ink/80 dark:text-cream/80">
            Rather than forcing your family into a single rigid vertical hierarchy, Parampara gives you four
            artistic silhouettes: the <strong>Heritage Pedigree</strong>, the flowing <strong>Ancestral River</strong>,
            the sacred concentric <strong>Lotus Mandala</strong>, and the structured <strong>Compact Clan</strong>.
          </p>
        </Card>

        <Card className="p-8 sm:p-10 border-gold/30">
          <h2 className="font-display text-2xl font-bold text-ink dark:text-cream">
            A Fortress of Sovereignty
          </h2>
          <p className="mt-3 leading-relaxed text-sm sm:text-base text-ink/80 dark:text-cream/80">
            Commercial genealogy platforms have commoditized personal family records and DNA.
            Parampara fundamentally rejects this. In this application:
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 text-xs">
            <div className="rounded-2xl border border-gold/20 bg-gold/5 p-4">
              <p className="font-bold text-saffron-ink dark:text-gold-light text-sm">✦ Sealed on Device</p>
              <p className="mt-1 text-ink/70 dark:text-cream/70">
                Your trees and portraits live exclusively inside IndexedDB on this machine.
              </p>
            </div>
            <div className="rounded-2xl border border-gold/20 bg-gold/5 p-4">
              <p className="font-bold text-saffron-ink dark:text-gold-light text-sm">✦ Zero Ad Tracking</p>
              <p className="mt-1 text-ink/70 dark:text-cream/70">
                No third-party trackers, no analytics pixels, and no user surveillance.
              </p>
            </div>
          </div>
        </Card>

        <div className="mt-8">
          <BackupBanner />
        </div>

        <div className="text-center pt-6">
          <Link to="/trees">
            <Button variant="gold" className="!px-8 !py-3 font-bold text-base">
              Enter Your Lineage Studio →
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}

export function PrivacyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:py-24">
      <div className="text-center space-y-3">
        <span className="font-display text-xs font-bold tracking-[0.3em] text-teal uppercase dark:text-teal-ink">
          Sovereign Privacy
        </span>
        <h1 className="font-display text-5xl sm:text-6xl font-extrabold text-ink dark:text-cream">
          Your house. Your records.
        </h1>
        <p className="mx-auto max-w-xl text-base text-ink/75 dark:text-cream/75">
          A definitive, uncompromising promise on how your genealogical data is handled.
        </p>
      </div>

      <div className="mt-12 space-y-6">
        <Card className="p-8 border-gold/30">
          <h2 className="font-display text-xl font-bold text-ink dark:text-cream">
            The Local-First Guarantee
          </h2>
          <ul className="mt-4 space-y-4 text-sm text-ink/80 dark:text-cream/80">
            <li className="flex items-start gap-3">
              <span className="text-gold font-bold">1.</span>
              <div>
                <strong>No Cloud Accounts:</strong> You never need to sign up, provide an email address, or create a password to use Parampara.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold font-bold">2.</span>
              <div>
                <strong>In-Browser Portrait Compression:</strong> When you upload a family photograph, it is compressed entirely client-side using WebAssembly and stored directly into your browser’s IndexedDB.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold font-bold">3.</span>
              <div>
                <strong>Self-Contained Backups:</strong> Exporting a JSON archive produces an unencrypted, standardized digital time-capsule file that you own and can save to a thumb drive or print.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold font-bold">4.</span>
              <div>
                <strong>Storage Awareness:</strong> Clearing your browser’s site data or cookies for this domain will wipe the local database unless you have exported a JSON backup.
              </div>
            </li>
          </ul>
        </Card>
      </div>
    </main>
  )
}
