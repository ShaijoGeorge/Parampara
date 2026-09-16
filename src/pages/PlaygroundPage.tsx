import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { TextInput } from '../ui/Field'

export function PlaygroundPage() {
  return (
    <main className="min-h-screen bg-[#f9f9fb] dark:bg-[#09090b] text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
      <div className="mx-auto max-w-5xl space-y-10 px-4 py-12">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Craft Design Tokens
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white mt-1">
            Component Showcase
          </h1>
        </div>

        {/* Button & Badges */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white">
            Pill Buttons & Badges
          </h2>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">Primary Pill</Button>
            <Button variant="secondary">Secondary Neutral</Button>
            <Button variant="accent">Indigo Accent</Button>
            <Button variant="ghost">Subtle Ghost</Button>
            <Badge variant="accent">Active Document</Badge>
            <Badge variant="neutral">Local Storage</Badge>
          </div>
        </section>

        {/* Inputs & Fields */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white">
            Inputs & Search
          </h2>
          <div className="max-w-md space-y-3">
            <TextInput placeholder="Search lineage or enter ancestor name..." />
          </div>
        </section>

        {/* Cards Showcase */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white">
            Bento Surfaces & Shadows
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Light Island
              </span>
              <h3 className="text-xl font-bold tracking-tight mt-2">Crisp Porcelain</h3>
              <p className="mt-1.5 text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                Clean white card with hairline border, subtle multi-stage diffused shadows, and rounded-2xl geometry.
              </p>
            </Card>

            <Card className="bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20">
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                Luminous Accent
              </span>
              <h3 className="text-xl font-bold tracking-tight mt-2">OLED Slate</h3>
              <p className="mt-1.5 text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                Subtle gradient backdrop with frosted glass effects and high-fidelity contrast in both light and dark themes.
              </p>
            </Card>
          </div>
        </section>
      </div>
    </main>
  )
}
