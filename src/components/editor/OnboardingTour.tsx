import { Button } from '../../ui/Button'

const STEPS = [
  {
    title: 'This canvas is yours',
    body: 'Pan, pinch, and zoom freely. Every card represents a real person in your family story.',
  },
  {
    title: 'Kinship at a click',
    body: 'Click any card to open the inspector, then attach parents, spouses, children, or siblings with one tap.',
  },
  {
    title: 'Four genuine perspectives',
    body: 'Switch between Descendants Flow, Direct Lineage, Balanced Hourglass, and Clan Bento Matrix anytime.',
  },
  {
    title: 'Sovereign on-device safety',
    body: 'Your trees reside in this browser’s IndexedDB. Export a JSON time-capsule backup whenever you wish.',
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
      <div className="pointer-events-auto w-full max-w-md rounded-3xl border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#141419] p-6 text-neutral-900 dark:text-neutral-100 shadow-craft-lg backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase">
            Step {step + 1} of {STEPS.length}
          </span>
          <button
            type="button"
            onClick={onSkip}
            className="text-xs text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
          >
            Dismiss
          </button>
        </div>
        <h2 className="mt-2 text-xl font-bold tracking-tight">{current.title}</h2>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          {current.body}
        </p>
        <div className="mt-5 flex items-center justify-between pt-3 border-t border-black/[0.06] dark:border-white/[0.06]">
          <div className="flex gap-1.5">
            {STEPS.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === step ? 'w-5 bg-indigo-600 dark:bg-indigo-400' : 'w-1.5 bg-neutral-200 dark:bg-neutral-800'
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" type="button" onClick={onSkip}>
              Skip
            </Button>
            <Button variant="primary" size="sm" type="button" onClick={onNext}>
              {last ? 'Get Started' : 'Next →'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
