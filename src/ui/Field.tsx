import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'

export function Field({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <label className="block space-y-1.5 text-sm">
      <span className="font-medium tracking-wide text-ink/75 dark:text-cream/80">{label}</span>
      {children}
    </label>
  )
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-2xl border border-gold/25 bg-white/90 px-3.5 py-2.5 text-sm text-ink outline-none transition-all focus:border-gold focus:ring-2 focus:ring-gold/30 dark:border-gold/20 dark:bg-ink/70 dark:text-cream dark:focus:border-gold-light ${props.className ?? ''}`}
    />
  )
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full rounded-2xl border border-gold/25 bg-white/90 px-3.5 py-2.5 text-sm text-ink outline-none transition-all focus:border-gold focus:ring-2 focus:ring-gold/30 dark:border-gold/20 dark:bg-ink/70 dark:text-cream dark:focus:border-gold-light ${props.className ?? ''}`}
    />
  )
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`w-full rounded-2xl border border-gold/25 bg-white/90 px-3.5 py-2.5 text-sm text-ink outline-none transition-all focus:border-gold focus:ring-2 focus:ring-gold/30 dark:border-gold/20 dark:bg-ink/70 dark:text-cream dark:focus:border-gold-light ${props.className ?? ''}`}
    />
  )
}
