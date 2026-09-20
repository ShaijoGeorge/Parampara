import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { TEMPLATES } from '../canvas/templates'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { GenderBadge } from '../ui/GenderIcon'
import type { Gender } from '../domain/types'

export function LandingPage() {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('1')

  const sampleNodes = [
    {
      id: '1',
      name: 'Kamala Menon',
      familyName: 'Menon Lineage',
      late: true,
      age: 'Passed at 82',
      gender: 'female',
      avatarBg: 'bg-gradient-to-br from-rose-500 to-amber-500 text-white',
    },
    {
      id: '2',
      name: 'Raghavan Menon',
      familyName: 'Menon Lineage',
      late: true,
      age: 'Passed at 81',
      gender: 'male',
      avatarBg: 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white',
    },
    {
      id: '3',
      name: 'Lakshmi Nair',
      familyName: 'Nair Household',
      late: false,
      age: 'Age 58',
      gender: 'female',
      avatarBg: 'bg-gradient-to-br from-rose-500 to-amber-500 text-white',
    },
    {
      id: '4',
      name: 'Arun Nair',
      familyName: 'Nair Household',
      late: false,
      age: 'Age 62',
      gender: 'male',
      avatarBg: 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white',
    },
    {
      id: '5',
      name: 'Maya Nair',
      familyName: 'Nair Household',
      late: false,
      age: 'Age 28',
      gender: 'female',
      avatarBg: 'bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white',
    },
  ]

  const activeTemplate = TEMPLATES[0]!

  return (
    <main className="min-h-screen bg-[#f9f9fb] dark:bg-[#09090b] text-neutral-900 dark:text-neutral-100 transition-colors duration-300 overflow-hidden">
      {/* Hero Section */}
      <section className="relative mx-auto max-w-6xl px-4 pt-12 pb-20 sm:pt-20 sm:pb-28">
        {/* Soft Ambient Radiance */}
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[680px] -translate-x-1/2 rounded-full bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent blur-3xl dark:from-indigo-500/15 dark:via-purple-500/10" />

        <div className="relative text-center">
          {/* Subtle Announcement Pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center justify-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/80 dark:border-white/[0.08] dark:bg-[#141419]/80 px-3.5 py-1 text-xs font-medium text-neutral-600 dark:text-neutral-300 shadow-craft-xs backdrop-blur-md">
              <span className="flex h-1.5 w-1.5 rounded-full bg-indigo-500" />
              <span>Sovereign Family Studio · 100% On-Device Privacy</span>
            </div>
          </motion.div>

          {/* Clean Grotesque Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mx-auto mt-6 max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-[80px] lg:leading-[1.06]"
          >
            Your family story.{' '}
            <span className="bg-gradient-to-r from-neutral-900 via-neutral-600 to-neutral-800 dark:from-white dark:via-neutral-200 dark:to-neutral-400 bg-clip-text text-transparent">
              Crafted with joy.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal"
          >
            Parampara reimagines family trees into fluid, interactive canvases. Weave portraits, sacred memories, and kinship into timeless heirlooms — stored privately inside your browser.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3.5"
          >
            <Link to="/trees">
              <Button variant="primary" size="lg" className="shadow-craft-sm">
                Open Studio Free →
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="secondary" size="lg">
                Privacy & Philosophy
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Floating App Preview Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 28 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="relative mt-14 sm:mt-20"
        >
          <div className="relative mx-auto max-w-5xl rounded-[32px] border border-black/[0.08] dark:border-white/[0.08] bg-white/90 dark:bg-[#141419]/90 p-5 sm:p-7 shadow-craft-lg backdrop-blur-xl">
            {/* Window Chrome Header */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-black/[0.06] dark:border-white/[0.06] pb-4">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-rose-400/80" />
                <span className="h-3 w-3 rounded-full bg-amber-400/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
                <span className="ml-3 text-xs font-semibold tracking-tight text-neutral-500 dark:text-neutral-400">
                  Parampara Canvas · Menon–Nair Lineage
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="accent">5 Members</Badge>
                <Badge variant="neutral">3 Generations</Badge>
              </div>
            </div>

            {/* Interactive Miniature Tree Nodes Grid */}
            <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
              {sampleNodes.map((node) => {
                const isSelected = node.id === selectedNodeId
                return (
                  <div
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`group relative rounded-2xl border p-3.5 transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'border-indigo-500 bg-white ring-2 ring-indigo-500/20 shadow-craft-md dark:border-indigo-400 dark:bg-[#181820] dark:ring-indigo-400/20'
                        : node.late
                          ? 'border-stone-300/90 bg-stone-50/95 dark:border-stone-700/80 dark:bg-[#141418]/95 shadow-craft-xs ring-1 ring-stone-400/20 hover:border-stone-400 dark:hover:border-stone-600'
                          : 'border-black/[0.07] bg-white/80 hover:border-black/20 hover:bg-white hover:shadow-craft-sm dark:border-white/[0.08] dark:bg-[#141419]/80 dark:hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative shrink-0">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-xl overflow-hidden shadow-xs ring-1 transition-transform duration-200 group-hover:scale-105 ${
                            node.late
                              ? 'ring-stone-400/30 dark:ring-stone-600/30 grayscale'
                              : 'ring-black/5 dark:ring-white/10'
                          }`}
                        >
                          <div
                            className={`flex h-full w-full items-center justify-center text-xs font-semibold tracking-wider ${node.avatarBg}`}
                          >
                            {node.name.split(' ').map((n) => n[0]).join('')}
                          </div>
                        </div>

                        {/* Gender Icon Badge */}
                        <GenderBadge
                          gender={node.gender as Gender}
                          size="md"
                          className="absolute -bottom-1 -right-1"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1.5">
                          <p className="text-[13px] font-bold tracking-tight text-neutral-900 dark:text-neutral-100 truncate">
                            {node.name}
                          </p>
                          {node.late && (
                            <span className="shrink-0 inline-flex items-center gap-0.5 rounded-full border border-stone-300/80 dark:border-stone-700 bg-stone-100/90 dark:bg-stone-900/60 px-1.5 py-0.5 text-[9px] font-medium text-stone-600 dark:text-stone-300">
                              <span className="text-[8px] text-amber-500">✦</span> Late
                            </span>
                          )}
                        </div>

                        {node.familyName && (
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                            {node.familyName}
                          </p>
                        )}

                        {node.age && (
                          <p className="text-[11px] font-medium text-indigo-600/90 dark:text-indigo-400/90 truncate mt-0.5">
                            {node.age}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}

              {/* Add Member Tile Callout */}
              <Link
                to="/trees"
                className="flex items-center justify-center rounded-2xl border-2 border-dashed border-black/[0.1] dark:border-white/[0.1] p-4 text-center hover:border-indigo-500/50 hover:bg-indigo-500/[0.02] dark:hover:border-indigo-400/50 transition-all cursor-pointer group"
              >
                <div className="flex flex-col items-center">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 text-sm font-semibold group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    +
                  </div>
                  <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 mt-2">
                    Add Family Branch
                  </p>
                  <p className="text-[11px] text-neutral-400 dark:text-neutral-500">
                    Open studio workspace
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Descendants Flow Showcase */}
      <section className="relative border-y border-black/[0.06] dark:border-white/[0.06] bg-white/60 dark:bg-[#111115]/60 py-20 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Genealogy Architecture
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Descendants Flow. The natural shape of family.
            </h2>
            <p className="mx-auto mt-2.5 max-w-2xl text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
              Ancestors at the top, generations cascading gracefully downward, spouses united side-by-side with children centered beneath.
            </p>
          </div>

          {/* Active Silhouette Detail Card */}
          <div className="mt-10 overflow-hidden rounded-3xl border border-black/[0.08] dark:border-white/[0.08] bg-white/90 dark:bg-[#141419]/90 p-6 sm:p-8 shadow-craft-md backdrop-blur-xl">
            <div className="grid gap-8 md:grid-cols-2 items-center">
              <div className="space-y-4">
                <div className="inline-flex">
                  <Badge variant="accent">{activeTemplate.tag}</Badge>
                </div>
                <h3 className="text-2xl font-bold tracking-tight">
                  {activeTemplate.name}
                </h3>
                <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {activeTemplate.description}
                </p>
                <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
                  <li className="flex items-center gap-2">
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold">✓</span> Genuine non-overlapping recursive tree algorithm
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold">✓</span> Smooth pan, zoom, and interactive spouse bridges
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold">✓</span> High-resolution archival poster export ready
                  </li>
                </ul>
                <div className="pt-2">
                  <Link to="/trees">
                    <Button variant="primary" size="md">
                      Open Studio Canvas →
                    </Button>
                  </Link>
                </div>
              </div>

              <div
                className="flex h-60 w-full items-center justify-center rounded-2xl border border-black/[0.06] dark:border-white/[0.08] bg-gradient-to-b from-neutral-50 to-neutral-100/80 dark:from-[#181820] dark:to-[#121216] p-6 shadow-inner"
              >
                <div className="text-center space-y-2 text-neutral-900 dark:text-neutral-100">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 dark:bg-[#141419]/80 border border-black/[0.08] dark:border-white/[0.08] shadow-craft-xs text-lg font-bold">
                    प
                  </div>
                  <p className="text-sm font-semibold">{activeTemplate.name}</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-xs">{activeTemplate.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Craft Bento Grid Features */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Crafted for Permanence
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Every feature designed with Apple-grade precision.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: 'Sovereign Privacy',
              badge: 'Zero Cloud',
              desc: 'Stored exclusively in your local browser IndexedDB. No logins, no tracking, no servers storing your private genealogy.',
              icon: '🛡️',
            },
            {
              title: 'Kinship Builder',
              badge: 'Intuitive',
              desc: 'Attach parents, spouses, children, and siblings with effortless handles. Add compressed portraits directly on device.',
              icon: '🌿',
            },
            {
              title: 'Sacred Memorials',
              badge: 'Remembrance',
              desc: 'Dignified ancestor treatments with transition years, subtle monochrome portraits, and dedicated memorial badges.',
              icon: '★',
            },
            {
              title: 'Archival Export',
              badge: 'PNG & JSON',
              desc: 'Generate high-resolution PNG prints for framing at family reunions, or export complete JSON time capsules to back up safely.',
              icon: '📜',
            },
          ].map((pillar) => (
            <Card key={pillar.title} className="flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{pillar.icon}</span>
                  <Badge variant="neutral">{pillar.badge}</Badge>
                </div>
                <h3 className="mt-4 text-base font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                  {pillar.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
                  {pillar.desc}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="mx-auto max-w-5xl px-4 pb-20">
        <div className="relative overflow-hidden rounded-3xl border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#141419] p-8 sm:p-12 text-center shadow-craft-lg">
          <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
          <div className="relative z-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Start Today
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Preserve your family lineage today.
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-neutral-600 dark:text-neutral-400">
              Begin your family tree in seconds. 100% private, on-device, and free forever.
            </p>
            <div className="mt-7 flex justify-center gap-3">
              <Link to="/trees">
                <Button variant="primary" size="lg" className="shadow-craft-sm">
                  Create Your Family Tree →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
