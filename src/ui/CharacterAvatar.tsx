import type { Gender } from '../domain/types'

export function FemaleAvatarPlaceholder({ className = 'h-full w-full' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Female character portrait"
    >
      <defs>
        <linearGradient id="female-bg" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fb7185" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
        <linearGradient id="female-skin" x1="40" y1="20" x2="40" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#ffe4e6" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="female-hair" x1="40" y1="12" x2="40" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#881337" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#4c0519" stopOpacity="0.96" />
        </linearGradient>
        <linearGradient id="female-clothes" x1="40" y1="52" x2="40" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.88" />
          <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.75" />
        </linearGradient>
      </defs>

      {/* Backdrop */}
      <rect width="80" height="80" rx="16" fill="url(#female-bg)" />

      {/* Shoulders / Dress */}
      <path d="M16 80c0-13.5 10.7-24.5 24-24.5s24 11 24 24.5H16z" fill="url(#female-clothes)" />
      {/* Neck */}
      <path d="M35 48h10v10H35z" fill="url(#female-skin)" />
      {/* Head */}
      <ellipse cx="40" cy="36" rx="12" ry="14" fill="url(#female-skin)" />
      {/* Hair Top Volume Bun */}
      <circle cx="40" cy="16" r="6" fill="url(#female-hair)" />
      {/* Hair Waves */}
      <path
        d="M40 16c-10 0-16 6-16 16 0 4 1 9 3 12 1.5-5 3.5-9 6-11 5-4 10-4 14 0 2.5 2 4.5 6 6 11 2-3 3-8 3-12 0-10-6-16-16-16z"
        fill="url(#female-hair)"
      />
      {/* Gold Earring Accents */}
      <circle cx="27" cy="40" r="1.5" fill="#fef08a" />
      <circle cx="53" cy="40" r="1.5" fill="#fef08a" />
    </svg>
  )
}

export function MaleAvatarPlaceholder({ className = 'h-full w-full' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Male character portrait"
    >
      <defs>
        <linearGradient id="male-bg" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
        <linearGradient id="male-skin" x1="40" y1="20" x2="40" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#e0e7ff" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="male-hair" x1="40" y1="14" x2="40" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1e1b4b" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#0f172a" stopOpacity="0.98" />
        </linearGradient>
        <linearGradient id="male-clothes" x1="40" y1="52" x2="40" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.88" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.75" />
        </linearGradient>
      </defs>

      {/* Backdrop */}
      <rect width="80" height="80" rx="16" fill="url(#male-bg)" />

      {/* Shoulders */}
      <path d="M14 80c0-14 11.5-25 26-25s26 11 26 25H14z" fill="url(#male-clothes)" />
      {/* Shirt Collar */}
      <path d="M36 55l4 7 4-7h-8z" fill="#ffffff" opacity="0.9" />
      {/* Neck */}
      <path d="M34 46h12v10H34z" fill="url(#male-skin)" />
      {/* Head */}
      <ellipse cx="40" cy="35" rx="12.5" ry="14" fill="url(#male-skin)" />
      {/* Classic Styled Haircut */}
      <path
        d="M26.5 32c-.5-8 5-16 13.5-16 9 0 14 6 14 13 0 2-.5 4-1 6-2-4-5-7-10-7-5 0-9 2-13 4l-3.5 0z"
        fill="url(#male-hair)"
      />
    </svg>
  )
}

export function OtherAvatarPlaceholder({ className = 'h-full w-full' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Character portrait"
    >
      <defs>
        <linearGradient id="other-bg" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#d946ef" />
        </linearGradient>
        <linearGradient id="other-skin" x1="40" y1="20" x2="40" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#f3e8ff" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="other-hair" x1="40" y1="14" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3b0764" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="other-clothes" x1="40" y1="52" x2="40" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.88" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0.75" />
        </linearGradient>
      </defs>

      {/* Backdrop */}
      <rect width="80" height="80" rx="16" fill="url(#other-bg)" />

      {/* Shoulders */}
      <path d="M15 80c0-13.5 11-24.5 25-24.5s25 11 25 24.5H15z" fill="url(#other-clothes)" />
      {/* Neck */}
      <path d="M35 47h10v10H35z" fill="url(#other-skin)" />
      {/* Head */}
      <ellipse cx="40" cy="35" rx="12" ry="14" fill="url(#other-skin)" />
      {/* Stylish Layered Hair */}
      <path
        d="M26 31c0-10 6-16 14-16 8.5 0 14.5 5 14.5 12 0 4-1.5 8-3.5 10-1.5-5-5-8-10-8-5.5 0-9.5 3-12 7l-3-5z"
        fill="url(#other-hair)"
      />
    </svg>
  )
}

export function UnspecifiedAvatarPlaceholder({ className = 'h-full w-full' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Universal ancestor portrait"
    >
      <defs>
        <linearGradient id="unspecified-bg" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
      </defs>

      {/* Backdrop */}
      <rect width="80" height="80" rx="16" fill="url(#unspecified-bg)" />

      {/* Cameo Bust Silhouette */}
      <ellipse cx="40" cy="33" rx="12" ry="14" fill="#ffffff" opacity="0.88" />
      <path d="M18 80c0-13 10-23 22-23s22 10 22 23H18z" fill="#ffffff" opacity="0.88" />
    </svg>
  )
}

export function CharacterAvatarPlaceholder({
  gender,
  className = 'h-full w-full',
}: {
  gender: Gender
  className?: string
}) {
  switch (gender) {
    case 'female':
      return <FemaleAvatarPlaceholder className={className} />
    case 'male':
      return <MaleAvatarPlaceholder className={className} />
    case 'other':
      return <OtherAvatarPlaceholder className={className} />
    default:
      return <UnspecifiedAvatarPlaceholder className={className} />
  }
}

export function CharacterAvatar({
  photoDataUrl,
  gender,
  name,
  isLate = false,
  className = 'h-12 w-12',
}: {
  photoDataUrl?: string
  gender: Gender
  name?: string
  isLate?: boolean
  className?: string
}) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-xl ring-1 shadow-xs transition-transform duration-200 group-hover:scale-105 ${
        isLate
          ? 'ring-stone-400/30 dark:ring-stone-600/30 grayscale'
          : 'ring-black/5 dark:ring-white/10'
      } ${className}`}
    >
      {photoDataUrl ? (
        <img
          src={photoDataUrl}
          alt={name ?? 'Portrait'}
          className="h-full w-full object-cover"
        />
      ) : (
        <CharacterAvatarPlaceholder gender={gender} />
      )}
    </div>
  )
}
