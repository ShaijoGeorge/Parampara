import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { SiteFooter, SiteHeader } from './components/layout/SiteChrome'
import { useThemeSession } from './hooks/useThemeSession'
import { AboutPage, PrivacyPage } from './pages/AboutPage'
import { LandingPage } from './pages/LandingPage'
import { PlaygroundPage } from './pages/PlaygroundPage'
import { TreeDetailPage } from './pages/TreeDetailPage'
import { TreesPage } from './pages/TreesPage'
import { getRepository } from './storage'
import { QuotaNote } from './ui/QuotaNote'

function Layout() {
  const { theme, onTheme } = useThemeSession()
  const [quotaInfo, setQuotaInfo] = useState({ usage: 0, quota: 0 })
  const location = useLocation()
  const isCanvasView = location.pathname.startsWith('/trees/') && location.pathname !== '/trees'

  useEffect(() => {
    void getRepository()
      .estimateUsage()
      .then((est) => setQuotaInfo(est))
  }, [location.pathname])

  return (
    <div className="flex min-h-screen flex-col bg-cream text-ink transition-colors duration-200 dark:bg-ink dark:text-cream">
      <SiteHeader theme={theme} onTheme={onTheme} />
      <div className="no-print mx-auto w-full max-w-6xl px-4 pt-2">
        <QuotaNote usage={quotaInfo.usage} quota={quotaInfo.quota} />
      </div>
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/trees" element={<TreesPage />} />
          <Route path="/trees/:id" element={<TreeDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/playground" element={<PlaygroundPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      {!isCanvasView && <SiteFooter />}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}
