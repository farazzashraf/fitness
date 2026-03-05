'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Tab = 'overview' | 'videos' | 'live' | 'progress'

// ─── Breakpoint hook ──────────────────────────────────────────────────────────
function useBreakpoint() {
  const [bp, setBp] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth
      setBp(w < 768 ? 'mobile' : w < 1100 ? 'tablet' : 'desktop')
    }
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [])
  return bp
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const defaultMemberData = {
  name: 'Guest', plan: 'FREE' as const, initials: 'G',
  streak: 0, classesThisMonth: 0, totalClasses: 0,
  caloriesBurned: 0, joinedDays: 0,
}

// In this setup, 'locked: true' means it requires at least PRO to view.
const videos = [
  { id: 1, title: '45-Min HIIT Blast', instructor: 'Marcus Cole', duration: '45 min', category: 'HIIT', emoji: '🔥', color: '#EA580C', locked: false, watched: true },
  { id: 2, title: 'Power Yoga Flow', instructor: 'Priya Sharma', duration: '60 min', category: 'Yoga', emoji: '🧘', color: '#7C3AED', locked: false, watched: true },
  { id: 3, title: 'Core Pilates 50', instructor: 'Sofia Reyes', duration: '50 min', category: 'Pilates', emoji: '⚡', color: '#0891B2', locked: true, watched: false },
  { id: 4, title: 'Squat Masterclass', instructor: 'Jake Monroe', duration: '22 min', category: 'Strength', emoji: '💪', color: '#C9FF00', locked: true, watched: false },
  { id: 5, title: 'Full Iron Strength', instructor: 'Jake Monroe', duration: '75 min', category: 'Strength', emoji: '💪', color: '#C9FF00', locked: true, watched: false },
  { id: 6, title: 'Hip Opener Deep Dive', instructor: 'Priya Sharma', duration: '38 min', category: 'Yoga', emoji: '🧘', color: '#7C3AED', locked: true, watched: false },
  { id: 7, title: 'Tabata Protocol', instructor: 'Marcus Cole', duration: '25 min', category: 'HIIT', emoji: '🔥', color: '#EA580C', locked: true, watched: false },
  { id: 8, title: 'Advanced Core Challenge', instructor: 'Sofia Reyes', duration: '45 min', category: 'Pilates', emoji: '⚡', color: '#0891B2', locked: true, watched: false },
]

const liveClasses = [
  { title: 'HIIT Burn', instructor: 'Marcus Cole', time: 'Today, 7:00 PM', timeLeft: '2h 30m', spots: 4, emoji: '🔥', color: '#EA580C' },
  { title: 'Power Yoga', instructor: 'Priya Sharma', time: 'Today, 8:30 PM', timeLeft: '4h', spots: 8, emoji: '🧘', color: '#7C3AED' },
  { title: 'Morning HIIT', instructor: 'Marcus Cole', time: 'Tomorrow, 6:00 AM', timeLeft: '12h', spots: 6, emoji: '🔥', color: '#EA580C' },
  { title: 'Core Pilates', instructor: 'Sofia Reyes', time: 'Tomorrow, 9:00 AM', timeLeft: '15h', spots: 10, emoji: '⚡', color: '#0891B2' },
  { title: 'Iron Strength', instructor: 'Jake Monroe', time: 'Wed, 7:30 PM', timeLeft: '2d', spots: 2, emoji: '💪', color: '#C9FF00' },
]

const progressData = [
  { week: 'W1', classes: 2 }, { week: 'W2', classes: 3 },
  { week: 'W3', classes: 1 }, { week: 'W4', classes: 4 },
  { week: 'W5', classes: 3 }, { week: 'W6', classes: 5 },
  { week: 'W7', classes: 4 }, { week: 'W8', classes: 8 },
]

const recentActivity = [
  { action: 'Completed HIIT Burn', time: '2 hours ago', emoji: '🔥' },
  { action: 'Watched Squat Masterclass', time: 'Yesterday', emoji: '💪' },
  { action: 'Completed Power Yoga', time: '2 days ago', emoji: '🧘' },
  { action: 'Booked Iron Strength – Wed 7:30PM', time: '3 days ago', emoji: '📅' },
  { action: 'Completed Core Pilates', time: '4 days ago', emoji: '⚡' },
]

// ─── Sidebar (desktop + tablet) ───────────────────────────────────────────────
function Sidebar({ active, setActive, onLogout, collapsed, user }: { active: Tab; setActive: (t: Tab) => void; onLogout: () => void; collapsed: boolean; user: any }) {
  const items: { id: Tab; label: string; icon: string }[] = [
    { id: 'overview', label: 'Overview', icon: '▦' },
    { id: 'videos', label: 'Video Library', icon: '▶' },
    { id: 'live', label: 'Live Classes', icon: '📡' },
    { id: 'progress', label: 'My Progress', icon: '📈' },
  ]

  const isFree = user?.plan === 'FREE';
  const isPro = user?.plan === 'PRO';
  const isElite = user?.plan === 'ELITE';

  return (
    <aside style={{
      width: collapsed ? 64 : 230,
      flexShrink: 0,
      background: '#080808',
      borderRight: '1px solid #1a1a1a',
      display: 'flex',
      flexDirection: 'column',
      padding: collapsed ? '24px 10px' : '24px 14px',
      minHeight: '100vh',
      position: 'sticky',
      top: 0,
      height: '100vh',
      overflowY: 'auto',
      overflowX: 'hidden',
      transition: 'width 0.25s ease',
    }}>
      {/* Logo */}
      <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, padding: '0 4px', marginBottom: 36, overflow: 'hidden', flexShrink: 0 }}>
        <div style={{ width: 32, height: 32, minWidth: 32, background: 'var(--accent)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span className="font-display" style={{ color: '#000', fontSize: 18 }}>A</span>
        </div>
        {!collapsed && <span className="font-display" style={{ fontSize: 22, letterSpacing: 4, color: '#fff', whiteSpace: 'nowrap' }}>APEX</span>}
      </Link>

      {/* Plan badge */}
      {!collapsed && (
        <div style={{
          background: 'rgba(201,255,0,0.06)', border: '1px solid rgba(201,255,0,0.15)',
          borderRadius: 10, padding: '10px 12px', marginBottom: 28, marginLeft: 4, marginRight: 4,
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <div style={{ width: 8, height: 8, minWidth: 8, borderRadius: '50%', background: 'var(--accent)' }} />
          <span style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 700, whiteSpace: 'nowrap' }}>{user.plan} Plan Active</span>
        </div>
      )}
      {collapsed && (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)' }} />
        </div>
      )}

      {!collapsed && <div style={{ fontSize: 10, color: '#333', letterSpacing: 2, textTransform: 'uppercase', padding: '0 8px', marginBottom: 10 }}>Menu</div>}

      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {items.map(item => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            title={collapsed ? item.label : undefined}
            style={{
              display: 'flex', alignItems: 'center',
              justifyContent: collapsed ? 'center' : 'flex-start',
              gap: collapsed ? 0 : 12,
              padding: collapsed ? '12px 0' : '11px 14px',
              borderRadius: 10,
              background: active === item.id ? 'rgba(201,255,0,0.08)' : 'transparent',
              border: `1px solid ${active === item.id ? 'rgba(201,255,0,0.15)' : 'transparent'}`,
              color: active === item.id ? 'var(--accent)' : '#555',
              cursor: 'pointer', fontSize: collapsed ? 18 : 14,
              fontWeight: active === item.id ? 700 : 500,
              transition: 'all 0.15s', width: '100%', textAlign: 'left',
            }}
            onMouseEnter={e => { if (active !== item.id) e.currentTarget.style.color = '#aaa' }}
            onMouseLeave={e => { if (active !== item.id) e.currentTarget.style.color = '#555' }}
          >
            <span>{item.icon}</span>
            {!collapsed && item.label}
          </button>
        ))}

        {/* Dynamic Upsell Logic */}
        {isFree && !collapsed && (
          <div style={{ margin: '20px 4px 0', background: 'rgba(56,189,248,0.06)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: 14, padding: '16px 14px' }}>
            <div style={{ fontSize: 12, color: '#38BDF8', fontWeight: 700, marginBottom: 6 }}>Unlock PRO</div>
            <div style={{ fontSize: 12, color: '#555', lineHeight: 1.6, marginBottom: 12 }}>Get full access to all on-demand training videos.</div>
            <Link href="/pricing" style={{ display: 'block', textAlign: 'center', background: '#38BDF8', color: '#000', borderRadius: 8, padding: '8px 0', fontSize: 12, fontWeight: 800, textDecoration: 'none' }}>Upgrade →</Link>
          </div>
        )}

        {isPro && !collapsed && (
          <div style={{ margin: '20px 4px 0', background: 'rgba(167,139,250,0.06)', border: '1px solid rgba(167,139,250,0.2)', borderRadius: 14, padding: '16px 14px' }}>
            <div style={{ fontSize: 12, color: '#A78BFA', fontWeight: 700, marginBottom: 6 }}>Unlock ELITE</div>
            <div style={{ fontSize: 12, color: '#555', lineHeight: 1.6, marginBottom: 12 }}>Join daily live classes & interactive coaching.</div>
            <Link href="/pricing" style={{ display: 'block', textAlign: 'center', background: '#A78BFA', color: '#000', borderRadius: 8, padding: '8px 0', fontSize: 12, fontWeight: 800, textDecoration: 'none' }}>Upgrade →</Link>
          </div>
        )}

        {!isElite && collapsed && (
          <Link href="/pricing" title="Upgrade Plan" style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '16px 0', padding: '10px 0',
            background: isFree ? 'rgba(56,189,248,0.08)' : 'rgba(167,139,250,0.08)', 
            border: `1px solid ${isFree ? 'rgba(56,189,248,0.2)' : 'rgba(167,139,250,0.2)'}`,
            borderRadius: 10, fontSize: 16, textDecoration: 'none',
          }}>⬆</Link>
        )}
      </nav>

      {/* User + logout */}
      <div style={{ borderTop: '1px solid #111', paddingTop: 20, marginTop: 20 }}>
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          padding: '4px 4px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: collapsed ? 0 : 10 }}>
            <div style={{
              width: 32, height: 32, minWidth: 32, borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent), #666)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 800, color: '#000',
            }}>{user.initials}</div>
            {!collapsed && (
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#ccc', whiteSpace: 'nowrap' }}>{user.name}</div>
                <div style={{ fontSize: 10, color: '#444' }}>{user.plan} Member</div>
              </div>
            )}
          </div>
          {!collapsed && (
            <button onClick={onLogout} style={{
              background: 'none', border: 'none', color: '#444', cursor: 'pointer',
              fontSize: 16, padding: 4, transition: 'color 0.2s',
            }}
              title="Sign out"
              onMouseEnter={e => (e.currentTarget.style.color = '#f87171')}
              onMouseLeave={e => (e.currentTarget.style.color = '#444')}
            >⎋</button>
          )}
        </div>
      </div>
    </aside>
  )
}

// ─── Mobile bottom nav ────────────────────────────────────────────────────────
function BottomNav({ active, setActive }: { active: Tab; setActive: (t: Tab) => void }) {
  const items: { id: Tab; label: string; icon: string }[] = [
    { id: 'overview', label: 'Home', icon: '▦' },
    { id: 'videos', label: 'Videos', icon: '▶' },
    { id: 'live', label: 'Live', icon: '📡' },
    { id: 'progress', label: 'Progress', icon: '📈' },
  ]
  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
      background: 'rgba(8,8,8,0.96)',
      borderTop: '1px solid #1e1e1e',
      display: 'flex',
      backdropFilter: 'blur(16px)',
      paddingBottom: 'env(safe-area-inset-bottom)',
    }}>
      {items.map(item => (
        <button
          key={item.id}
          onClick={() => setActive(item.id)}
          style={{
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: 4, padding: '10px 4px 8px',
            background: 'none', border: 'none', cursor: 'pointer',
            color: active === item.id ? 'var(--accent)' : '#444',
            transition: 'color 0.15s',
          }}
        >
          <span style={{ fontSize: 18 }}>{item.icon}</span>
          <span style={{
            fontSize: 10, fontWeight: active === item.id ? 700 : 500,
            letterSpacing: 0.5,
          }}>{item.label}</span>
        </button>
      ))}
    </nav>
  )
}

// ─── Mobile header ────────────────────────────────────────────────────────────
function MobileHeader({ title, onLogout, user }: { title: string; onLogout: () => void; user: any }) {
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(8,8,8,0.95)',
      borderBottom: '1px solid #1a1a1a',
      backdropFilter: 'blur(12px)',
      padding: '14px 16px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 28, height: 28, background: 'var(--accent)', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span className="font-display" style={{ color: '#000', fontSize: 16 }}>A</span>
        </div>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{title}</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 8, padding: '5px 10px' }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80' }} />
          <span style={{ fontSize: 11, color: '#555' }}>{user.streak}🔥</span>
        </div>
        <button onClick={onLogout} style={{
          background: '#111', border: '1px solid #222', borderRadius: 8,
          color: '#555', cursor: 'pointer', fontSize: 14, padding: '6px 10px',
        }}>⎋</button>
      </div>
    </header>
  )
}

// ─── Overview Tab ─────────────────────────────────────────────────────────────
function OverviewTab({ bp, user }: { bp: 'mobile' | 'tablet' | 'desktop'; user: any }) {
  const isMobile = bp === 'mobile'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 16 : 24 }}>
      {/* Welcome banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0f0f0f, #111)',
        border: '1px solid #1a1a1a', borderRadius: isMobile ? 16 : 20,
        padding: isMobile ? '20px 18px' : '28px 32px',
        display: 'flex', flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'flex-start' : 'center',
        justifyContent: 'space-between', gap: isMobile ? 16 : 20,
      }}>
        <div>
          <p style={{ color: '#666', fontSize: 13, marginBottom: 4 }}>Good evening 👋</p>
          <h2 style={{ fontSize: isMobile ? 20 : 26, fontWeight: 700, marginBottom: 8 }}>
            Welcome back, {user.name.split(' ')[0]}!
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 16 }}>🔥</span>
            <span style={{ color: 'var(--accent)', fontSize: 13, fontWeight: 700 }}>{user.streak}-day streak!</span>
            <span style={{ color: '#555', fontSize: 13 }}>Keep it up.</span>
          </div>
        </div>
        <Link href="#" style={{
          background: 'var(--accent)', color: '#000',
          padding: isMobile ? '11px 20px' : '13px 28px',
          borderRadius: 12, textDecoration: 'none',
          fontSize: 12, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase',
          alignSelf: isMobile ? 'stretch' : 'auto', textAlign: 'center',
        }}>
          Start Today&apos;s Class →
        </Link>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
        gap: isMobile ? 10 : 14,
      }}>
        {[
          { label: 'This Month', value: user.classesThisMonth, icon: '📅', color: 'var(--accent)' },
          { label: 'Total Classes', value: user.totalClasses, icon: '🏆', color: '#60A5FA' },
          { label: 'Cals Burned', value: `${(user.caloriesBurned / 1000).toFixed(1)}k`, icon: '🔥', color: '#EA580C' },
          { label: 'Days Active', value: user.joinedDays, icon: '⭐', color: '#A78BFA' },
        ].map(s => (
          <div key={s.label} style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: isMobile ? 14 : 16, padding: isMobile ? '16px 14px' : '20px 22px' }}>
            <div style={{ fontSize: isMobile ? 18 : 22, marginBottom: 8 }}>{s.icon}</div>
            <div className="font-display" style={{ fontSize: isMobile ? 26 : 36, color: s.color, letterSpacing: 1, marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 11, color: '#555', letterSpacing: 0.5 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Upcoming + recent */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: isMobile ? 14 : 16,
      }}>
        {/* Upcoming */}
        <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 18, padding: isMobile ? 18 : 24 }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 16 }}>Upcoming Classes</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {liveClasses.slice(0, 3).map((c, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '11px 14px', background: '#111', borderRadius: 12, border: '1px solid #1a1a1a',
              }}>
                <span style={{ fontSize: 20 }}>{c.emoji}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.title}</div>
                  <div style={{ fontSize: 11, color: '#555', marginTop: 1 }}>{c.time}</div>
                </div>
                <span style={{ fontSize: 11, color: c.color, fontWeight: 700, flexShrink: 0 }}>In {c.timeLeft}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent */}
        <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 18, padding: isMobile ? 18 : 24 }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 16 }}>Recent Activity</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {recentActivity.map((a, i) => (
              <div key={i} style={{
                display: 'flex', gap: 10,
                padding: '10px 0',
                borderBottom: i < recentActivity.length - 1 ? '1px solid #111' : 'none',
                alignItems: 'flex-start',
              }}>
                <span style={{ fontSize: 16, marginTop: 1 }}>{a.emoji}</span>
                <div>
                  <div style={{ fontSize: 12, color: '#ccc' }}>{a.action}</div>
                  <div style={{ fontSize: 11, color: '#444', marginTop: 1 }}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Videos Tab ───────────────────────────────────────────────────────────────
function VideosTab({ bp, user }: { bp: 'mobile' | 'tablet' | 'desktop'; user: any }) {
  const [filter, setFilter] = useState('All')
  const isMobile = bp === 'mobile'
  
  // PRO and ELITE get full video access
  const hasFullVideoAccess = user?.plan === 'PRO' || user?.plan === 'ELITE'
  
  const categories = ['All', 'HIIT', 'Yoga', 'Pilates', 'Strength']
  const filtered = filter === 'All' ? videos : videos.filter(v => v.category === filter)

  const cols = isMobile ? '1fr' : bp === 'tablet' ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(260px, 1fr))'

  const lockedCount = hasFullVideoAccess ? 0 : videos.filter(v => v.locked).length
  const unlockedCount = videos.length - lockedCount

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', marginBottom: isMobile ? 16 : 24, gap: 12 }}>
        <div className="desktop-only">
          <p style={{ fontSize: 12, color: '#555', marginTop: -20, marginBottom: 12 }}>
            {unlockedCount} unlocked {lockedCount > 0 ? `· ${lockedCount} require PRO` : '· All Access Video Pass'}
          </p>
        </div>

        {/* Filter scroll row */}
        <div style={{
          display: 'flex', gap: 8,
          overflowX: 'auto',
          paddingBottom: isMobile ? 4 : 0,
          scrollbarWidth: 'none',
          width: isMobile ? '100%' : 'auto',
          WebkitOverflowScrolling: 'touch',
        }}>
          {categories.map(c => (
            <button key={c} onClick={() => setFilter(c)} style={{
              background: filter === c ? 'rgba(201,255,0,0.1)' : 'transparent',
              border: `1px solid ${filter === c ? 'rgba(201,255,0,0.3)' : '#222'}`,
              color: filter === c ? 'var(--accent)' : '#555',
              borderRadius: 8, padding: '7px 14px', fontSize: 12,
              fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s',
              flexShrink: 0,
            }}>{c}</button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: cols, gap: isMobile ? 12 : 16 }}>
        {filtered.map(v => {
          // Locked if the video is marked 'locked' AND user doesn't have full access
          const effectivelyLocked = v.locked && !hasFullVideoAccess;

          return (
            <div key={v.id} style={{
              background: '#0f0f0f', border: '1px solid #1a1a1a',
              borderRadius: 16, overflow: 'hidden',
              opacity: effectivelyLocked ? 0.55 : 1, cursor: effectivelyLocked ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              display: isMobile ? 'flex' : 'block',
            }}
              onMouseEnter={e => { if (!effectivelyLocked) { e.currentTarget.style.borderColor = '#333'; e.currentTarget.style.transform = 'translateY(-3px)' } }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#1a1a1a'; e.currentTarget.style.transform = 'none' }}
            >
              {/* Thumbnail */}
              <div style={{
                height: isMobile ? undefined : 130,
                width: isMobile ? 90 : undefined,
                minWidth: isMobile ? 90 : undefined,
                aspectRatio: isMobile ? '1' : undefined,
                background: `linear-gradient(135deg, ${v.color}22, #111)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', flexShrink: 0,
              }}>
                <div style={{
                  width: isMobile ? 36 : 44, height: isMobile ? 36 : 44, borderRadius: '50%',
                  background: effectivelyLocked ? 'rgba(255,255,255,0.04)' : `${v.color}22`,
                  border: `2px solid ${effectivelyLocked ? '#333' : v.color}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontSize: isMobile ? 14 : 18 }}>{effectivelyLocked ? '🔒' : v.watched ? '✓' : '▶'}</span>
                </div>
                {!isMobile && v.watched && !effectivelyLocked && (
                  <div style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(74,222,128,0.15)', border: '1px solid rgba(74,222,128,0.3)', borderRadius: 100, padding: '2px 8px', fontSize: 10, color: '#4ade80', fontWeight: 700 }}>
                    Watched
                  </div>
                )}
                {!isMobile && (
                  <div style={{ position: 'absolute', bottom: 8, right: 8, fontSize: 11, color: '#555', background: '#000', padding: '2px 7px', borderRadius: 4 }}>
                    {v.duration}
                  </div>
                )}
              </div>

              {/* Info */}
              <div style={{ padding: isMobile ? '12px 14px' : '14px 16px', flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 3 }}>
                  <span style={{ fontSize: 13 }}>{v.emoji}</span>
                  <span style={{ fontSize: 10, color: v.color, fontWeight: 700, letterSpacing: 1 }}>{v.category.toUpperCase()}</span>
                  {isMobile && <span style={{ fontSize: 10, color: '#444', marginLeft: 'auto' }}>{v.duration}</span>}
                </div>
                <div style={{ fontSize: isMobile ? 13 : 14, fontWeight: 600, marginBottom: 3, whiteSpace: isMobile ? 'nowrap' : undefined, overflow: 'hidden', textOverflow: 'ellipsis' }}>{v.title}</div>
                <div style={{ fontSize: 11, color: '#555' }}>{v.instructor}</div>
                {v.watched && !effectivelyLocked && isMobile && (
                  <span style={{ display: 'inline-block', marginTop: 6, background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.25)', borderRadius: 100, padding: '1px 8px', fontSize: 10, color: '#4ade80', fontWeight: 700 }}>Watched</span>
                )}
                {effectivelyLocked && (
                  <Link href="/pricing" style={{ display: 'block', marginTop: 8, fontSize: 11, color: '#38BDF8', textDecoration: 'none' }}>
                    Upgrade to PRO →
                  </Link>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Live Tab ─────────────────────────────────────────────────────────────────
function LiveTab({ bp, user }: { bp: 'mobile' | 'tablet' | 'desktop'; user: any }) {
  const isMobile = bp === 'mobile'
  // ONLY Elite gets live classes
  const isElite = user?.plan === 'ELITE'

  return (
    <div>
      {!isElite && (
        <>
          <div style={{ marginBottom: isMobile ? 18 : 12 }} className="desktop-only">
            <p style={{ fontSize: 12, color: '#555', marginTop: -20 }}>
              Live classes are available on the{' '}
              <Link href="/pricing" style={{ color: '#A78BFA', textDecoration: 'none', fontWeight: 700 }}>ELITE plan</Link>.
            </p>
          </div>

          {/* Upgrade notice */}
          <div style={{
            background: 'rgba(167,139,250,0.05)', border: '1px solid rgba(167,139,250,0.2)',
            borderRadius: 18, padding: isMobile ? '18px 16px' : '24px 28px', marginBottom: isMobile ? 18 : 28,
            display: 'flex', flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'flex-start' : 'center',
            justifyContent: 'space-between', gap: 16,
          }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#A78BFA', marginBottom: 6 }}>🔴 Live classes require ELITE</div>
              <div style={{ fontSize: 12, color: '#666', maxWidth: 480, lineHeight: 1.6 }}>
                Join real-time classes with live instructors. Daily sessions, interactive coaching, and community energy you can&apos;t get from recordings.
              </div>
            </div>
            <Link href="/checkout?plan=elite" style={{
              background: '#A78BFA', color: '#000',
              padding: isMobile ? '12px 0' : '13px 28px',
              borderRadius: 12, textDecoration: 'none',
              fontSize: 12, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase',
              whiteSpace: 'nowrap', alignSelf: isMobile ? 'stretch' : 'auto', textAlign: 'center',
            }}>
              Upgrade to ELITE →
            </Link>
          </div>
        </>
      )}

      {/* Schedule */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {liveClasses.map((c, i) => (
          <div key={i} style={{
            display: 'flex',
            alignItems: isMobile ? 'flex-start' : 'center',
            flexDirection: isMobile ? 'row' : 'row',
            justifyContent: 'space-between',
            background: '#0f0f0f', border: '1px solid #1a1a1a',
            borderRadius: 16,
            padding: isMobile ? '14px 14px' : '20px 24px',
            gap: 12,
            filter: isElite ? 'none' : 'grayscale(0.3)', 
            opacity: isElite ? 1 : 0.7,
            transition: 'all 0.2s',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 12 : 16, flex: 1, minWidth: 0 }}>
              <div style={{
                width: isMobile ? 38 : 44, height: isMobile ? 38 : 44, borderRadius: 12, flexShrink: 0,
                background: `${c.color}18`, border: `1px solid ${c.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: isMobile ? 18 : 22,
              }}>{c.emoji}</div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: isMobile ? 13 : 15, fontWeight: 700 }}>{c.title}</div>
                <div style={{ fontSize: 11, color: '#555', marginTop: 2, whiteSpace: isMobile ? 'nowrap' : undefined, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {isMobile ? c.time : `with ${c.instructor} · ${c.time}`}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-end' : 'center', gap: isMobile ? 6 : 12, flexShrink: 0 }}>
              <span style={{ fontSize: 11, color: c.spots < 4 ? '#F59E0B' : '#555' }}>{c.spots} spots</span>
              <button style={{
                background: isElite ? 'var(--accent)' : '#1a1a1a', 
                border: `1px solid ${isElite ? 'var(--accent)' : '#222'}`,
                color: isElite ? '#000' : '#444', 
                borderRadius: 8, padding: isMobile ? '6px 12px' : '8px 18px',
                fontSize: 11, fontWeight: 700, cursor: isElite ? 'pointer' : 'not-allowed',
              }}>
                {isElite ? 'Join' : '🔒 Join'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Progress Tab ─────────────────────────────────────────────────────────────
function ProgressTab({ bp, user }: { bp: 'mobile' | 'tablet' | 'desktop'; user: any }) {
  const isMobile = bp === 'mobile'
  const maxClasses = Math.max(...progressData.map(d => d.classes))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 16 : 24 }}>
      <div className="desktop-only">
        <p style={{ fontSize: 12, color: '#555', marginTop: -20, marginBottom: 12 }}>Your fitness journey over time</p>
      </div>

      {/* Stat cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
        gap: isMobile ? 10 : 14,
      }}>
        {[
          { label: 'Current Streak', value: `${user.streak}d`, color: '#EA580C' },
          { label: 'Best Streak', value: '21d', color: 'var(--accent)' },
          { label: 'Avg / Week', value: '3.4', color: '#60A5FA' },
          { label: 'Fav Class', value: 'HIIT', color: '#A78BFA' },
        ].map(s => (
          <div key={s.label} style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 16, padding: isMobile ? '14px 14px' : '20px 22px' }}>
            <div style={{ fontSize: 10, color: '#555', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontSize: isMobile ? 22 : 20, fontWeight: 700, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 18, padding: isMobile ? '18px 16px' : 28 }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>Weekly Classes</div>
        <div style={{ fontSize: 11, color: '#555', marginBottom: isMobile ? 20 : 28 }}>Last 8 weeks</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: isMobile ? 6 : 12, height: isMobile ? 120 : 160 }}>
          {progressData.map((d, i) => (
            <div key={d.week} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: isMobile ? 4 : 8, height: '100%', justifyContent: 'flex-end' }}>
              <span style={{ fontSize: isMobile ? 9 : 11, color: 'var(--accent)', fontWeight: 700 }}>{d.classes}</span>
              <div style={{
                width: '100%', borderRadius: '4px 4px 0 0',
                background: i === progressData.length - 1 ? 'var(--accent)' : '#1e1e1e',
                height: `${(d.classes / maxClasses) * (isMobile ? 80 : 120)}px`,
                transition: 'height 0.4s ease',
                border: `1px solid ${i === progressData.length - 1 ? 'var(--accent)' : '#2a2a2a'}`,
              }} />
              <span style={{ fontSize: isMobile ? 9 : 11, color: '#555' }}>{d.week}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Discipline breakdown */}
      <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 18, padding: isMobile ? '18px 16px' : 28 }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 18 }}>Classes by Discipline</div>
        {[
          { name: 'HIIT Burn', count: 52, total: 121, color: '#EA580C' },
          { name: 'Power Yoga', count: 34, total: 121, color: '#7C3AED' },
          { name: 'Iron Strength', count: 24, total: 121, color: '#C9FF00' },
          { name: 'Core Pilates', count: 11, total: 121, color: '#0891B2' },
        ].map(c => (
          <div key={c.name} style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: '#aaa' }}>{c.name}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: c.color }}>{c.count} classes</span>
            </div>
            <div style={{ height: 5, background: '#1a1a1a', borderRadius: 3 }}>
              <div style={{ height: '100%', borderRadius: 3, width: `${(c.count / c.total) * 100}%`, background: c.color }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [user, setUser] = useState<any>(null)
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

      // Define logical stats based on the plan tier
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
      window.location.href = '/login'
    }
    setLoading(false)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('apexUser')
    window.location.href = '/'
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
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#080808', color: '#fff' }}>

      {/* Sidebar — hidden on mobile */}
      {!isMobile && (
        <Sidebar
          active={activeTab}
          setActive={setActiveTab}
          onLogout={handleLogout}
          collapsed={isTablet}
          user={user}
        />
      )}

      {/* Main area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

        {/* Mobile sticky header */}
        {isMobile && <MobileHeader title={tabTitles[activeTab]} onLogout={handleLogout} user={user} />}

        <main style={{
          flex: 1,
          padding: isMobile ? '16px 14px 90px' : isTablet ? '28px 28px' : '36px 40px',
          overflowY: 'auto',
          minWidth: 0,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: isMobile ? 12 : 32, flexWrap: 'wrap', gap: 12 }}>
            {!isMobile ? (
              <div>
                <h1 style={{ fontSize: isTablet ? 18 : 22, fontWeight: 700, marginBottom: 4 }}>{tabTitles[activeTab]}</h1>
                <p style={{ fontSize: 12, color: '#555' }}>
                  {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            ) : (
              <div style={{ width: '100%', marginBottom: 4 }}>
                <p style={{ fontSize: 11, color: '#444' }}>
                  {new Date().toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}
                </p>
              </div>
            )}
            {!isMobile && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: '#0f0f0f', border: '1px solid #1a1a1a',
                borderRadius: 10, padding: '8px 16px',
              }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80' }} />
                <span style={{ fontSize: 12, color: '#666' }}>{user.streak} day streak 🔥</span>
              </div>
            )}
          </div>

          {/* Render Active Tab */}
          {activeTab === 'overview' && <OverviewTab bp={bp} user={user} />}
          {activeTab === 'videos' && <VideosTab bp={bp} user={user} />}
          {activeTab === 'live' && <LiveTab bp={bp} user={user} />}
          {activeTab === 'progress' && <ProgressTab bp={bp} user={user} />}
        </main>
      </div>

      {/* Mobile bottom nav */}
      {isMobile && <BottomNav active={activeTab} setActive={setActiveTab} />}
    </div>
  )
}