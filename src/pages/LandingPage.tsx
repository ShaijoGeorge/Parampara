import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { TEMPLATES } from '../canvas/templates'
import type { TemplateId } from '../domain/types'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'

export function LandingPage() {
  const [activeSilhouette, setActiveSilhouette] = useState<TemplateId>('pedigree')

  const sampleNodes = [
    {
      id: '1',
      name: 'Kamala Menon',
      clan: 'Menon Lineage',
      place: 'Thrissur',
      late: true,
      year: '1932–2014',
      gender: 'female',
      role: 'Matriarch',
      color: 'from-maroon to-saffron',
    },
    {
      id: '2',
      name: 'Raghavan Menon',
      clan: 'Menon Lineage',
      place: 'Thrissur',
      late: true,
      year: '1928–2009',
      gender: 'male',
      role: 'Patriarch',
      color: 'from-teal to-teal-ink',
    },
    {
      id: '3',
      name: 'Lakshmi Nair',
      clan: 'Nair Household',
      place: 'Kochi',
      late: false,
      year: 'Living',
      gender: 'female',
      role: 'Daughter',
      color: 'from-maroon to-maroon-dark',
    },
    {
      id: '4',
      name: 'Arun Nair',
      clan: 'Nair Household',
      place: 'Kochi',
      late: false,
      year: 'Living',
      gender: 'male',
      role: 'Son-in-Law',
      color: 'from-teal to-teal-ink',
    },
    {
      id: '5',
      name: 'Maya Nair',
      clan: 'Next Generation',
      place: 'Bengaluru',
      late: false,
      year: 'Living',
      gender: 'female',
      role: 'Granddaughter',
      color: 'from-saffron to-gold',
    },
  ]

  return (
    <main className="overflow-hidden bg-constellation">
      {/* Grand Hero Section */}
      <section className="relative mx-auto max-w-6xl px-4 pt-16 pb-24 sm:pt-24 sm:pb-32">
        {/* Ambient Glows */}
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[500px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-br from-gold/20 via-saffron/15 to-maroon/20 blur-[120px]" />
        <div className="pointer-events-none absolute top-1/3 -right-40 h-80 w-80 rounded-full bg-teal/15 blur-3xl" />

        <div className="relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/45 bg-gold/10 px-4 py-1.5 text-xs font-bold tracking-widest text-saffron-ink dark:text-gold-light uppercase shadow-xs backdrop-blur-sm">
              <span className="text-gold">✦</span> Sovereign Heritage Studio · 100% On-Device Privacy <span className="text-gold">✦</span>
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="font-display mx-auto mt-6 max-w-4xl text-5xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-7xl lg:text-8xl dark:text-cream"
          >
            Every family has a history.{' '}
            <span className="bg-gradient-to-r from-maroon via-saffron to-gold bg-clip-text text-transparent dark:from-gold-light dark:via-saffron-light dark:to-gold">
              We give yours a dynasty.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink/75 sm:text-xl dark:text-cream/80"
          >
            Parampara is an heirloom digital atelier. Weave names, portraits, sacred memories,
            and kinship into royal interactive canvases. Stored safely inside your browser — zero cloud harvesting.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Link to="/trees">
              <Button variant="gold" className="!px-7 !py-3.5 text-base font-bold shadow-lg">
                Enter Lineage Studio →
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="ghost" className="!px-6 !py-3.5 text-base font-medium">
                Our Philosophy & Privacy
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Live Interactive Hero Constellation Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="relative mt-16 sm:mt-24"
        >
          <div className="relative mx-auto max-w-5xl rounded-[36px] border border-gold/30 bg-white/75 p-6 shadow-[0_30px_100px_-20px_rgba(25,16,12,0.25)] backdrop-blur-2xl dark:border-gold/25 dark:bg-[#18100c]/80 dark:shadow-[0_30px_100px_-20px_rgba(0,0,0,0.6)]">
            {/* Top Preview Bar */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-gold/15 pb-4">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-maroon/70" />
                <span className="h-3 w-3 rounded-full bg-gold/70" />
                <span className="h-3 w-3 rounded-full bg-teal/70" />
                <span className="ml-2 font-display text-xs font-bold tracking-widest text-ink/70 dark:text-cream/70 uppercase">
                  Royal Pedigree Canvas · Live Interactive Miniature
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Badge>5 Family Members</Badge>
                <Badge>3 Generations</Badge>
              </div>
            </div>

            {/* Tree Nodes Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {sampleNodes.map((node, i) => (
                <div
                  key={node.id}
                  className={`group relative rounded-3xl border border-gold/30 bg-cream/90 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-[0_16px_36px_-10px_rgba(201,162,39,0.3)] dark:border-gold/20 dark:bg-[#201612]/90 ${
                    i === 0 ? 'border-gold ring-1 ring-gold/40' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-light via-gold to-gold-dark p-0.5 shadow-sm">
                        <div
                          className={`flex h-full w-full items-center justify-center rounded-[14px] bg-gradient-to-br text-base font-serif font-bold text-cream ${node.color}`}
                        >
                          {node.name.split(' ').map((n) => n[0]).join('')}
                        </div>
                      </div>
                      {node.late && (
                        <span
                          className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border border-gold/40 bg-ink text-[10px]"
                          title="Late Ancestor"
                        >
                          🪔
                        </span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <p className="font-serif text-base font-bold text-ink dark:text-cream truncate">
                          {node.name}
                        </p>
                        {node.late && (
                          <span className="rounded-full border border-gold/30 bg-gold/10 px-1.5 py-0.2 text-[9px] font-bold text-maroon uppercase dark:text-gold-light">
                            Late
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-maroon font-medium dark:text-gold/90 truncate">
                        {node.clan}
                      </p>
                      <p className="text-[11px] text-ink/60 dark:text-cream/60 truncate mt-0.5">
                        {node.place} · {node.year}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add Member Tile Callout */}
              <Link
                to="/trees"
                className="flex items-center justify-center rounded-3xl border-2 border-dashed border-gold/40 p-4 transition-all hover:border-gold hover:bg-gold/5 text-center group cursor-pointer"
              >
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-gold/40 bg-gold/10 text-gold text-lg group-hover:scale-110 transition-transform">
                    +
                  </div>
                  <p className="font-serif text-sm font-bold text-ink dark:text-cream mt-2">
                    Build Your Tree
                  </p>
                  <p className="text-[11px] text-ink/55 dark:text-cream/55">
                    Click to launch studio
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Interactive Silhouette Showcase */}
      <section className="relative border-y border-gold/20 bg-cream/60 py-20 backdrop-blur-md dark:border-gold/15 dark:bg-[#140e0c]/60">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <span className="font-display text-xs font-bold tracking-[0.25em] text-maroon uppercase dark:text-gold">
              Cartographic Mastery
            </span>
            <h2 className="font-display mt-2 text-4xl font-extrabold text-ink sm:text-5xl dark:text-cream">
              Four Classical Silhouettes. One Living Kinship.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-ink/70 dark:text-cream/70">
              Your family relationships remain identical. Switch your viewing perspective at any time with a single click.
            </p>

            {/* Template Selector Tabs */}
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl.id}
                  type="button"
                  onClick={() => setActiveSilhouette(tmpl.id)}
                  className={`rounded-full px-5 py-2 text-xs font-bold tracking-wider transition-all duration-200 uppercase cursor-pointer ${
                    activeSilhouette === tmpl.id
                      ? 'bg-gradient-to-r from-maroon to-maroon-dark text-cream border border-gold/40 shadow-md scale-105'
                      : 'border border-gold/20 bg-white/70 text-ink/75 hover:border-gold/50 dark:bg-ink/50 dark:text-cream/75'
                  }`}
                >
                  {tmpl.name} · {tmpl.tag}
                </button>
              ))}
            </div>
          </div>

          {/* Active Silhouette Detail Card */}
          <div className="mt-12 overflow-hidden rounded-[32px] border border-gold/30 bg-white/85 p-8 shadow-xl backdrop-blur-xl dark:border-gold/20 dark:bg-[#1a110d]/90">
            {TEMPLATES.filter((t) => t.id === activeSilhouette).map((current) => (
              <div key={current.id} className="grid gap-8 md:grid-cols-2 items-center">
                <div className="space-y-4">
                  <div className="inline-flex">
                    <Badge>{current.tag} Silhouette</Badge>
                  </div>
                  <h3 className="font-display text-3xl font-bold text-ink dark:text-cream">
                    {current.name}
                  </h3>
                  <p className="text-base leading-relaxed text-ink/75 dark:text-cream/75">
                    {current.description}
                  </p>
                  <ul className="space-y-2 text-sm text-ink/70 dark:text-cream/70">
                    <li className="flex items-center gap-2">
                      <span className="text-gold">✓</span> Real-time smooth drag, pan, and zoom
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-gold">✓</span> Respectful late ancestor treatment and portrait cameos
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-gold">✓</span> Archival print and vector export ready
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Link to="/trees">
                      <Button variant="gold" className="!px-6 !py-2.5 text-xs font-bold">
                        Open with {current.name} →
                      </Button>
                    </Link>
                  </div>
                </div>

                <div
                  className="flex h-64 w-full items-center justify-center rounded-2xl border border-gold/25 p-6 shadow-inner"
                  style={{ background: current.paper }}
                >
                  <div className="text-center text-ink dark:text-cream space-y-2">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/60 dark:bg-ink/60 border border-gold/40 shadow-sm font-display text-2xl font-bold">
                      प
                    </div>
                    <p className="font-serif text-lg font-bold">{current.name}</p>
                    <p className="text-xs max-w-xs opacity-75">{current.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Four Pillars of Sovereign Lineage */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <div className="text-center">
          <span className="font-display text-xs font-bold tracking-[0.25em] text-maroon uppercase dark:text-gold">
            Archival Standard
          </span>
          <h2 className="font-display mt-2 text-4xl font-extrabold text-ink sm:text-5xl dark:text-cream">
            Built for Generational Permanence
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: 'Sacred Memorials',
              badge: 'Remembrance',
              desc: 'Respectfully honor departed ancestors with archival diya lamps, transition years, and dignified monochrome treatments.',
              icon: '🪔',
            },
            {
              title: 'Sovereign Privacy',
              badge: 'Zero Cloud',
              desc: 'Stored exclusively in your local browser’s IndexedDB. No accounts, no data brokers, and zero surveillance.',
              icon: '🛡️',
            },
            {
              title: 'Kinship Builder',
              badge: 'Intuitive',
              desc: 'Attach parents, spouses, children, and siblings with single-click connectors. Add photo portraits with instant local compression.',
              icon: '🌿',
            },
            {
              title: 'Archival Export',
              badge: 'Print & JSON',
              desc: 'Download portable JSON time-capsules or print museum-grade genealogy posters for family celebrations and reunions.',
              icon: '📜',
            },
          ].map((pillar) => (
            <Card key={pillar.title} className="flex flex-col justify-between hover:border-gold">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{pillar.icon}</span>
                  <Badge>{pillar.badge}</Badge>
                </div>
                <h3 className="font-display mt-4 text-xl font-bold text-ink dark:text-cream">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-ink/70 dark:text-cream/70">
                  {pillar.desc}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="mx-auto max-w-5xl px-4 pb-24">
        <div className="relative overflow-hidden rounded-[36px] border border-gold/40 bg-gradient-to-br from-maroon via-maroon-dark to-ink p-10 sm:p-14 text-center text-cream shadow-2xl">
          <div className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full bg-gold/20 blur-3xl" />
          <div className="relative z-10">
            <span className="font-display text-xs font-bold tracking-[0.3em] text-gold uppercase">
              The Archive Awaits
            </span>
            <h2 className="font-display mt-3 text-4xl font-extrabold sm:text-5xl">
              Preserve your family’s legacy today.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-cream/80 sm:text-base">
              Start in seconds. No login required. Create your tree and print a timeless heirloom for your descendants.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link to="/trees">
                <Button variant="gold" className="!px-8 !py-3.5 text-base font-bold shadow-xl">
                  Start Drawing Free →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
