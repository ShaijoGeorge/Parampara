import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { TextInput } from '../ui/Field'

export function PlaygroundPage() {
  return (
    <main className="mx-auto max-w-5xl space-y-10 px-4 py-12">
      <div>
        <span className="font-display text-xs font-bold tracking-[0.25em] text-maroon uppercase dark:text-gold">
          Design System & Atelier Tokens
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-ink dark:text-cream mt-1">
          Heirloom Component Kit
        </h1>
      </div>

      {/* Button & Badges */}
      <section className="space-y-4">
        <h2 className="font-display text-xl font-bold text-ink dark:text-cream">
          Interactive Controls & Badges
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="gold">Gold Leaf Action</Button>
          <Button variant="primary">Royal Maroon</Button>
          <Button variant="secondary">Temple Teal</Button>
          <Button variant="ghost">Glass Ghost</Button>
          <Badge>Heritage Pedigree</Badge>
          <Badge>100% Sealed</Badge>
        </div>
      </section>

      {/* Inputs & Fields */}
      <section className="space-y-4">
        <h2 className="font-display text-xl font-bold text-ink dark:text-cream">
          Inputs & Typography
        </h2>
        <div className="max-w-md space-y-3">
          <TextInput placeholder="Search lineage or enter ancestor name..." />
        </div>
      </section>

      {/* Cards Showcase */}
      <section className="space-y-4">
        <h2 className="font-display text-xl font-bold text-ink dark:text-cream">
          Surfaces & Parchments
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <span className="font-display text-xs font-bold text-maroon uppercase dark:text-gold">
              Cameo Surface
            </span>
            <h3 className="font-display text-2xl font-bold mt-2">Vellum & Glass</h3>
            <p className="mt-2 text-sm text-ink/75 dark:text-cream/75 leading-relaxed">
              Warm parchment texture with hairline gold leaf borders, soft ambient shadows, and blur glass physics.
            </p>
          </Card>

          <Card className="border-gold/50 bg-gradient-to-br from-gold/10 via-maroon/5 to-teal/10">
            <span className="font-display text-xs font-bold text-gold-dark dark:text-gold uppercase">
              Dynasty Surface
            </span>
            <h3 className="font-display text-2xl font-bold mt-2">Obsidian & Amber</h3>
            <p className="mt-2 text-sm text-ink/75 dark:text-cream/75 leading-relaxed">
              Used across the royal night mode and glowing lineage constellation cards.
            </p>
          </Card>
        </div>
      </section>
    </main>
  )
}
