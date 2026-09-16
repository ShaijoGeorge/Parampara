import { Button } from '../../ui/Button'

const STEPS = [
  {
    title: 'This canvas is yours',
    body: 'Pan, pinch, and zoom. Every card is a person in this lineage.',
  },
  {
    title: 'Add people, not rows',
    body: 'Open a card, then attach a parent, spouse, child, or sibling. Children slots fill empty places.',
  },
  {
    title: 'Switch the cloth, keep the kin',
    body: 'Pedigree, river, mandala, and compact clan all draw the same family.',
  },
  {
    title: 'Keep a backup',
    body: 'Trees live in IndexedDB on this device. Export JSON before you wipe the browser.',
  },
]

export function OnboardingTour({
  step,
  onNext,
  onSkip,
}: {
  step: number
  onNext: () => void
  onSkip: () => void
}) {
  const current = STEPS[step] ?? STEPS[STEPS.length - 1]
  const last = step >= STEPS.length - 1
  return (
    <div className="pointer-events-none absolute inset-0 z-30 flex items-end justify-center p-4 sm:items-center">
      <div className="pointer-events-auto w-full max-w-md rounded-3xl bg-maroon p-6 text-cream shadow-2xl">
        <p className="text-xs tracking-[0.2em] uppercase opacity-70">
          {step + 1} / {STEPS.length}
        </p>
        <h2 className="font-display mt-2 text-3xl">{current.title}</h2>
        <p className="mt-2 text-cream/85">{current.body}</p>
        <div className="mt-5 flex gap-2">
          <Button variant="gold" type="button" onClick={onNext}>
            {last ? 'Start drawing' : 'Next'}
          </Button>
          <Button variant="ghost" type="button" className="text-cream ring-cream/30" onClick={onSkip}>
            Skip
          </Button>
        </div>
      </div>
    </div>
  )
}
