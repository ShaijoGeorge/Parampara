import { useEffect, useState } from 'react'
import type { ThemeMode } from '../domain/types'
import { getRepository } from '../storage'

function getInitialTheme(): ThemeMode {
  try {
    const saved = localStorage.getItem('parampara_theme') as ThemeMode | null
    if (saved === 'dark' || saved === 'light') return saved
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
  } catch {
    // Fallback for SSR / restricted iframe
  }
  return 'light'
}

function applyTheme(theme: ThemeMode) {
  const isDark = theme === 'dark'
  document.documentElement.classList.toggle('dark', isDark)
  document.documentElement.setAttribute('data-theme', theme)
  try {
    localStorage.setItem('parampara_theme', theme)
  } catch {
    // ignore
  }
}

export function useThemeSession() {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // Sync with IndexedDB settings
    void getRepository()
      .getSettings()
      .then((settings) => {
        if (settings.theme) {
          setTheme(settings.theme)
          applyTheme(settings.theme)
        }
        setReady(true)
      })
      .catch(() => {
        setReady(true)
      })
  }, [])

  const onTheme = (next: ThemeMode) => {
    setTheme(next)
    applyTheme(next)
    void getRepository().saveSettings({ theme: next })
  }

  return { theme, onTheme, ready }
}
