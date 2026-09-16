import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'

export function PlaygroundPage() {
  return (
    <main className="mx-auto max-w-5xl space-y-8 px-4 py-12">
      <h1 className="font-display text-4xl">UI kit</h1>
      <section className="flex flex-wrap gap-3">
        <Button>Primary</Button>
        <Button variant="secondary">Teal</Button>
        <Button variant="gold">Gold</Button>
        <Button variant="ghost">Ghost</Button>
        <Badge>Heritage</Badge>
      </section>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <h2 className="font-display text-2xl">Parchment card</h2>
          <p className="mt-2 text-ink/70 dark:text-cream/70">
            Cream paper, maroon ink, a little gold in the seams.
          </p>
        </Card>
        <Card className="bg-gradient-to-br from-saffron/30 to-maroon/20">
          <h2 className="font-display text-2xl">Festival wash</h2>
          <p className="mt-2">Used on the template gallery tiles.</p>
        </Card>
      </div>
    </main>
  )
}
