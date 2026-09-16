import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'

export function Field({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <label className="block space-y-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-300">
      <span>{label}</span>
      {children}
    </label>
  )
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-xl border border-black/[0.08] bg-neutral-50/80 px-3.5 py-2.5 text-sm text-neutral-900 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 dark:border-white/[0.09] dark:bg-neutral-800/60 dark:text-white dark:focus:border-indigo-400 dark:focus:bg-neutral-800 ${props.className ?? ''}`}
    />
  )
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full rounded-xl border border-black/[0.08] bg-neutral-50/80 px-3.5 py-2.5 text-sm text-neutral-900 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 dark:border-white/[0.09] dark:bg-neutral-800/60 dark:text-white dark:focus:border-indigo-400 dark:focus:bg-neutral-800 ${props.className ?? ''}`}
    />
  )
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`w-full rounded-xl border border-black/[0.08] bg-neutral-50/80 px-3.5 py-2.5 text-sm text-neutral-900 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 dark:border-white/[0.09] dark:bg-neutral-800/60 dark:text-white dark:focus:border-indigo-400 dark:focus:bg-neutral-800 ${props.className ?? ''}`}
    />
  )
}
