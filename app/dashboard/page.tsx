'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Types & Data
import { Tab, UserData } from './types'
import { defaultMemberData } from './data'
import { useBreakpoint } from './hooks/useBreakpoint'

// Layout Components
import { Sidebar } from './components/Sidebar'
import { MobileHeader } from './components/MobileHeader'
import { BottomNav } from './components/BottomNav'

// Tabs
import { OverviewTab } from './components/tabs/OverviewTab'
import { VideosTab } from './components/tabs/VideosTab'
import { LiveTab } from './components/tabs/LiveTab'
import { ProgressTab } from './components/tabs/ProgressTab'
import { NutritionTab } from './components/tabs/NutritionTab'
import { CommunityTab } from './components/tabs/CommunityTab'
import { AICoachTab } from './components/tabs/AICoachTab'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const bp = useBreakpoint()
  const router = useRouter()
  const isMobile = bp === 'mobile'
  const isTablet = bp === 'tablet'

  useEffect(() => {
    const stored = localStorage.getItem('apexUser')
    if (stored) {
      const parsed = JSON.parse(stored)
      const initials = parsed.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()
      const isElite = parsed.plan === 'ELITE'
      const isPro = parsed.plan === 'PRO'

      setUser({
        ...defaultMemberData,
        ...parsed,
        initials: initials,
        streak: isElite ? 24 : isPro ? 14 : 3,
        classesThisMonth: isElite ? 12 : isPro ? 8 : 2,
        totalClasses: isElite ? 156 : isPro ? 121 : 12,
        caloriesBurned: isElite ? 24500 : isPro ? 18400 : 3200,
        joinedDays: isElite ? 412 : isPro ? 365 : 45,
      })
    } else {
      router.push('/login')
    }
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('apexUser')
    router.push('/')
  }

  if (loading || !user) {
    return (
      <div style={{ minHeight: '100vh', background: '#080808', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 40, height: 40, border: '3px solid #1a1a1a', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  const tabTitles: Record<Tab, string> = {
    overview: 'Dashboard',
    videos: 'Video Library',
    live: 'Live Classes',
    progress: 'My Progress',
    nutrition: 'Nutrition Guides',
    community: 'Community Forum',
    ai: 'AI Coach Q&A'
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#080808', color: '#fff' }}>

      {!isMobile && (
        <Sidebar
          active={activeTab} setActive={setActiveTab} onLogout={handleLogout}
          collapsed={isTablet} user={user}
        />
      )}

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {isMobile && <MobileHeader title={tabTitles[activeTab]} onLogout={handleLogout} user={user} />}

        <main style={{
          flex: 1, padding: isMobile ? '16px 14px 90px' : isTablet ? '28px 28px' : '36px 40px',
          overflowY: 'auto', minWidth: 0,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: isMobile ? 12 : 32, flexWrap: 'wrap', gap: 12 }}>
            {!isMobile && (
              <div>
                <h1 style={{ fontSize: isTablet ? 18 : 22, fontWeight: 700, marginBottom: 4 }}>{tabTitles[activeTab]}</h1>
                <p style={{ fontSize: 12, color: '#555' }}>
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            )}
            {!isMobile && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8, background: '#0f0f0f', border: '1px solid #1a1a1a',
                borderRadius: 10, padding: '8px 16px',
              }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80' }} />
                <span style={{ fontSize: 12, color: '#666' }}>{user.streak} day streak 🔥</span>
              </div>
            )}
          </div>

          {activeTab === 'overview' && <OverviewTab bp={bp} user={user} />}
          {activeTab === 'videos' && <VideosTab bp={bp} user={user} />}
          {activeTab === 'live' && <LiveTab bp={bp} user={user} />}
          {activeTab === 'progress' && <ProgressTab bp={bp} user={user} />}
          {activeTab === 'nutrition' && <NutritionTab bp={bp} user={user} />}
          {activeTab === 'community' && <CommunityTab bp={bp} />}
          {activeTab === 'ai' && <AICoachTab bp={bp} user={user} />}

        </main>
      </div>

      {isMobile && <BottomNav active={activeTab} setActive={setActiveTab} />}
    </div>
  )
}