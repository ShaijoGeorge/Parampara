import type { Gender } from './types'

export const GENDER_THEMES: Record<
  Gender,
  {
    label: string
    symbol: string
    textColor: string
    strokeColor: string
    badgeBg: string
    badgeBorder: string
    glowRing: string
    avatarGrad: string
    pillClass: string
  }
> = {
  female: {
    label: 'Female',
    symbol: '♀',
    textColor: 'text-rose-600 dark:text-rose-400',
    strokeColor: 'stroke-rose-600 dark:stroke-rose-400',
    badgeBg: 'bg-rose-50 dark:bg-rose-950/80',
    badgeBorder: 'border-rose-200/90 dark:border-rose-800/80',
    glowRing: 'ring-rose-500/20',
    avatarGrad: 'from-rose-500 to-amber-500 text-white',
    pillClass:
      'bg-rose-50 text-rose-700 border-rose-200/80 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800/60',
  },
  male: {
    label: 'Male',
    symbol: '♂',
    textColor: 'text-sky-600 dark:text-sky-400',
    strokeColor: 'stroke-sky-600 dark:stroke-sky-400',
    badgeBg: 'bg-sky-50 dark:bg-sky-950/80',
    badgeBorder: 'border-sky-200/90 dark:border-sky-800/80',
    glowRing: 'ring-sky-500/20',
    avatarGrad: 'from-blue-600 to-indigo-600 text-white',
    pillClass:
      'bg-sky-50 text-sky-700 border-sky-200/80 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-800/60',
  },
  other: {
    label: 'Other',
    symbol: '⚥',
    textColor: 'text-violet-600 dark:text-violet-400',
    strokeColor: 'stroke-violet-600 dark:stroke-violet-400',
    badgeBg: 'bg-violet-50 dark:bg-violet-950/80',
    badgeBorder: 'border-violet-200/90 dark:border-violet-800/80',
    glowRing: 'ring-violet-500/20',
    avatarGrad: 'from-violet-500 to-fuchsia-500 text-white',
    pillClass:
      'bg-violet-50 text-violet-700 border-violet-200/80 dark:bg-violet-950/40 dark:text-violet-300 dark:border-violet-800/60',
  },
  unspecified: {
    label: 'Unspecified',
    symbol: '○',
    textColor: 'text-neutral-500 dark:text-neutral-400',
    strokeColor: 'stroke-neutral-500 dark:stroke-neutral-400',
    badgeBg: 'bg-neutral-100 dark:bg-neutral-800/80',
    badgeBorder: 'border-neutral-200 dark:border-neutral-700',
    glowRing: 'ring-neutral-500/20',
    avatarGrad: 'from-neutral-700 to-neutral-900 text-neutral-200',
    pillClass:
      'bg-neutral-100 text-neutral-600 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-700',
  },
}
