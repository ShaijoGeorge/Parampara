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
      <span className="text-ink/70 dark:text-cream/70">{label}</span>
      {children}
    </label>
  )
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-xl border border-ink/10 bg-white px-3 py-2 text-ink outline-none ring-gold/40 focus:ring-2 dark:border-cream/15 dark:bg-ink dark:text-cream ${props.className ?? ''}`}
    />
  )
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full rounded-xl border border-ink/10 bg-white px-3 py-2 text-ink outline-none ring-gold/40 focus:ring-2 dark:border-cream/15 dark:bg-ink dark:text-cream ${props.className ?? ''}`}
    />
  )
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className="w-full rounded-xl border border-ink/10 bg-white px-3 py-2 text-ink outline-none ring-gold/40 focus:ring-2 dark:border-cream/15 dark:bg-ink dark:text-cream"
    />
  )
}
