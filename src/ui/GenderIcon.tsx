import type { Gender } from '../domain/types'

export interface GenderIconProps {
  gender: Gender
  className?: string
}

export function FemaleIcon({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Venus circle */}
      <circle cx="12" cy="8.5" r="5.5" />
      {/* Vertical cross stem */}
      <path d="M12 14v7" />
      {/* Horizontal cross bar */}
      <path d="M8.5 17.5h7" />
    </svg>
  )
}

export function MaleIcon({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Mars circle */}
      <circle cx="10" cy="14" r="5.5" />
      {/* Diagonal arrow stem */}
      <path d="M14 10l6.5-6.5" />
      {/* Arrow head */}
      <path d="M15 3.5h5.5v5.5" />
    </svg>
  )
}

export function OtherGenderIcon({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Center circle */}
      <circle cx="11.5" cy="12.5" r="4.5" />
      {/* Upward arrow */}
      <path d="M14.5 9.5L19.5 4.5" />
      <path d="M15.5 4.5h4v4" />
      {/* Downward cross */}
      <path d="M11.5 17v4.5" />
      <path d="M9 19.5h5" />
    </svg>
  )
}

export function UnspecifiedGenderIcon({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="5.5" strokeDasharray="3 3" />
    </svg>
  )
}

export function GenderIcon({ gender, className = 'h-3.5 w-3.5' }: GenderIconProps) {
  switch (gender) {
    case 'female':
      return <FemaleIcon className={className} />
    case 'male':
      return <MaleIcon className={className} />
    case 'other':
      return <OtherGenderIcon className={className} />
    default:
      return <UnspecifiedGenderIcon className={className} />
  }
}

import { GENDER_THEMES } from '../domain/gender'
export { GENDER_THEMES }

export function GenderBadge({
  gender,
  size = 'md',
  showLabel = false,
  className = '',
}: {
  gender: Gender
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  className?: string
}) {
  const theme = GENDER_THEMES[gender] ?? GENDER_THEMES.unspecified

  const sizeClasses = {
    sm: {
      box: 'h-4 w-4',
      icon: 'h-2.5 w-2.5',
      text: 'text-[9px]',
      pill: 'px-1.5 py-0.5 gap-1 text-[10px]',
    },
    md: {
      box: 'h-5 w-5',
      icon: 'h-3.5 w-3.5',
      text: 'text-[10px]',
      pill: 'px-2 py-0.5 gap-1.5 text-xs',
    },
    lg: {
      box: 'h-7 w-7',
      icon: 'h-4 w-4',
      text: 'text-xs',
      pill: 'px-2.5 py-1 gap-2 text-sm',
    },
  }[size]

  if (showLabel) {
    return (
      <span
        className={`inline-flex items-center font-medium rounded-full border shadow-2xs ${theme.pillClass} ${sizeClasses.pill} ${className}`}
      >
        <GenderIcon gender={gender} className={`${sizeClasses.icon} ${theme.strokeColor}`} />
        <span>{theme.label}</span>
      </span>
    )
  }

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full border shadow-2xs transition-transform ${theme.badgeBg} ${theme.badgeBorder} ${theme.textColor} ${sizeClasses.box} ${className}`}
      title={`Gender: ${theme.label}`}
    >
      <GenderIcon gender={gender} className={`${sizeClasses.icon} ${theme.strokeColor}`} />
    </span>
  )
}
