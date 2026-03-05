'use client'

import { useState } from 'react'
import { Tab } from './types'
import { useIsMobile } from './utils'
import { Sidebar } from './components/Sidebar'
import { OverviewTab } from './components/OverviewTab'
import { CustomersTab } from './components/CustomersTab'
import { SubscriptionsTab } from './components/SubscriptionsTab'
import { AnalyticsTab } from './components/AnalyticsTab'
import { ChurnTab } from './components/ChurnTab'
import { AIAssistantTab } from './components/AIAssistantTab'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const isMobile = useIsMobile()

  const handleLogout = () => { window.location.href = '/' }

  const tabTitles: Record<Tab, string> = {
    overview: 'Dashboard Overview',
    customers: 'Customer Management',
    subscriptions: 'Subscription Management',
    analytics: 'Website Analytics',
    churn: 'Churn Analysis',
    'ai-assistant': 'AI Business Assistant',
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#080808', color: '#fff' }}>

      {/* Backdrop */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 97, backdropFilter: 'blur(2px)' }} />
      )}

      <Sidebar
        active={activeTab}
        setActive={setActiveTab}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={handleLogout}
      />

      <main className="dash-main" style={{
        flex: 1,
        padding: isMobile ? '20px 16px' : '32px 36px',
        overflowY: 'auto',
        minWidth: 0
      }}>

        {/* ── Mobile top bar ── */}
        <div style={{
          display: isMobile ? 'flex' : 'none',
          alignItems: 'center', justifyContent: 'space-between',
          marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid #1a1a1a',
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, background: 'var(--accent)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="font-display" style={{ color: '#000', fontSize: 16 }}>A</span>
            </div>
            <span className="font-display" style={{ fontSize: 18, letterSpacing: 3, color: '#fff' }}>APEX</span>
          </div>

          {/* Logout button -mobile */}
          <button
            onClick={handleLogout}
            title="Sign out"
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: '#111', border: '1px solid #1e1e1e',
              borderRadius: 8, padding: '8px 12px',
              color: '#555', cursor: 'pointer', fontSize: 12, fontWeight: 600,
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(248,113,113,0.3)'
              e.currentTarget.style.color = '#f87171'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = '#1e1e1e'
              e.currentTarget.style.color = '#555'
            }}
          >
            <span style={{ fontSize: 14 }}>⎋</span>
            <span>Sign out</span>
          </button>
        </div>

        {/* ── Desktop top bar ── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, flexWrap: 'wrap', gap: 10 }}>
          <div>
            <h1 style={{ fontSize: isMobile ? 18 : 24, fontWeight: 700, marginBottom: 4 }}>{tabTitles[activeTab]}</h1>
            <p style={{ fontSize: 12, color: '#555' }}>
              {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          {!isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 10, padding: '8px 16px', fontSize: 12, color: '#555' }}>Last updated: just now</div>
              <div style={{ background: 'rgba(201,255,0,0.1)', border: '1px solid rgba(201,255,0,0.2)', borderRadius: 10, padding: '8px 16px', fontSize: 12, color: 'var(--accent)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />Live
              </div>
            </div>
          )}
        </div>

        {/* ── Mobile tab strip ── */}
        {isMobile && (
          <div style={{ display: 'flex', gap: 6, overflowX: 'auto', marginBottom: 20, paddingBottom: 4, WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
            {(['overview', 'customers', 'subscriptions', 'analytics', 'churn', 'ai-assistant'] as Tab[]).map(t => (
              <button key={t} onClick={() => setActiveTab(t)} style={{
                background: activeTab === t ? 'rgba(201,255,0,0.1)' : 'transparent',
                border: `1px solid ${activeTab === t ? 'rgba(201,255,0,0.35)' : '#222'}`,
                color: activeTab === t ? 'var(--accent)' : '#555',
                borderRadius: 8, padding: '7px 14px', fontSize: 12, fontWeight: 700,
                cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
              }}>
                {t === 'ai-assistant' ? 'AI Assistant' : t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        )}

        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'customers' && <CustomersTab />}
        {activeTab === 'subscriptions' && <SubscriptionsTab />}
        {activeTab === 'analytics' && <AnalyticsTab />}
        {activeTab === 'churn' && <ChurnTab />}
        {activeTab === 'ai-assistant' && <AIAssistantTab />}
      </main>
    </div>
  )
}