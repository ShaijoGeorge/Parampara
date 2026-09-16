import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'gold' | 'accent'
type Size = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  children: ReactNode
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-[#111114] text-white hover:bg-neutral-800 dark:bg-white dark:text-[#111114] dark:hover:bg-neutral-200 shadow-sm font-medium',
  secondary:
    'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-800/80 dark:text-neutral-100 dark:hover:bg-neutral-700 font-medium border border-black/[0.04] dark:border-white/[0.06]',
  ghost:
    'bg-transparent text-neutral-700 hover:bg-neutral-100/80 dark:text-neutral-300 dark:hover:bg-neutral-800/80 font-medium',
  gold:
    'bg-indigo-600 text-white hover:bg-indigo-500 shadow-sm font-medium',
  accent:
    'bg-indigo-600 text-white hover:bg-indigo-500 shadow-sm font-medium',
}

const sizeStyles: Record<Size, string> = {
  sm: 'px-3 py-1 text-xs',
  md: 'px-4 py-1.5 text-sm',
  lg: 'px-6 py-2.5 text-base',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full transition-all duration-150 cursor-pointer active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
