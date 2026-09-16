import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { TEMPLATES } from '../canvas/templates'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'

export function LandingPage() {
  return (
    <main className="overflow-hidden">
      <section className="relative mx-auto max-w-6xl px-4 pt-16 pb-20">
        <div className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full bg-saffron/30 blur-3xl" />
        <div className="pointer-events-none absolute top-40 left-10 h-72 w-72 rounded-full bg-teal/20 blur-3xl" />
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-2xl"
        >
          <Badge>Living lineage, kept locally</Badge>
          <h1 className="font-display mt-4 text-5xl leading-[1.05] text-ink sm:text-7xl dark:text-cream">
            Draw the family you come from.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-ink/70 dark:text-cream/70">
            Parampara is a studio for family trees — names, places, portraits,
            and the quiet mark of those who have passed. Everything stays in
            your browser until you export it.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/trees">
              <Button>Start a tree</Button>
            </Link>
            <Link to="/about">
              <Button variant="ghost">How it works</Button>
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="relative mt-14 grid gap-4 sm:grid-cols-3"
        >
          {['Kamala Menon', 'Arun Nair', 'Maya Nair'].map((name, index) => (
            <div
              key={name}
              className="rounded-3xl border border-maroon/10 bg-white/70 p-5 shadow-xl dark:border-cream/10 dark:bg-ink/50"
              style={{ transform: `translateY(${index === 1 ? -12 : 12}px)` }}
            >
              <div className="mb-3 h-12 w-12 rounded-2xl bg-gradient-to-br from-maroon to-saffron" />
              <p className="font-display text-xl">{name}</p>
              <p className="text-sm text-ink/55 dark:text-cream/55">
                {index === 0 ? 'Thrissur · Late' : 'Kochi · Living'}
              </p>
            </div>
          ))}
        </motion.div>
      </section>

      <section className="bg-maroon text-cream">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-3">
          {[
            ['Write people', 'Gender, family name, children, hometown, and a late mark — without a spreadsheet.'],
            ['Pick a cloth', 'Four interactive 2D templates. Same kin, different silhouette.'],
            ['Keep the keys', 'IndexedDB on your machine. No account. Export when you travel.'],
          ].map(([title, body]) => (
            <div key={title}>
              <h2 className="font-display text-3xl">{title}</h2>
              <p className="mt-2 text-cream/75">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="font-display text-4xl">Templates</h2>
        <p className="mt-2 max-w-xl text-ink/65 dark:text-cream/65">
          Switch looks without rewriting the family. Pan and zoom on every
          layout.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TEMPLATES.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-3xl border border-ink/10 dark:border-cream/10"
            >
              <div className="h-28" style={{ background: item.paper }} />
              <div className="bg-white p-4 dark:bg-ink/80">
                <Badge>{item.tag}</Badge>
                <p className="font-display mt-2 text-xl">{item.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
