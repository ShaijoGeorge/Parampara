import { useEffect, useState } from 'react'
import type { ThemeMode } from '../domain/types'
import { getRepository } from '../storage'

export function useThemeSession() {
  const [theme, setTheme] = useState<ThemeMode>('light')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    void getRepository()
      .getSettings()
      .then((settings) => {
        setTheme(settings.theme)
        document.documentElement.classList.toggle('dark', settings.theme === 'dark')
        setReady(true)
      })
  }, [])

  const onTheme = (next: ThemeMode) => {
    setTheme(next)
    document.documentElement.classList.toggle('dark', next === 'dark')
    void getRepository().saveSettings({ theme: next })
  }

  return { theme, onTheme, ready }
}
