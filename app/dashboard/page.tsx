'use client'

import { useState } from 'react'
import Link from 'next/link'

type Tab = 'overview' | 'videos' | 'live' | 'progress'

const memberData = {
  name: 'David Kim',
  plan: 'PRO' as const,
  initials: 'DK',
  streak: 14,
  classesThisMonth: 8,
  totalClasses: 121,
  caloriesBurned: 18400,
  joinedDays: 365,
}

const videos = [
  { id: 1, title: '45-Min HIIT Blast', instructor: 'Marcus Cole', duration: '45 min', category: 'HIIT', emoji: '🔥', color: '#EA580C', locked: false, watched: true },
  { id: 2, title: 'Power Yoga Flow', instructor: 'Priya Sharma', duration: '60 min', category: 'Yoga', emoji: '🧘', color: '#7C3AED', locked: false, watched: true },
  { id: 3, title: 'Core Pilates 50', instructor: 'Sofia Reyes', duration: '50 min', category: 'Pilates', emoji: '⚡', color: '#0891B2', locked: false, watched: false },
  { id: 4, title: 'Squat Masterclass', instructor: 'Jake Monroe', duration: '22 min', category: 'Strength', emoji: '💪', color: '#C9FF00', locked: false, watched: false },
  { id: 5, title: 'Full Iron Strength', instructor: 'Jake Monroe', duration: '75 min', category: 'Strength', emoji: '💪', color: '#C9FF00', locked: true, watched: false },
  { id: 6, title: 'Hip Opener Deep Dive', instructor: 'Priya Sharma', duration: '38 min', category: 'Yoga', emoji: '🧘', color: '#7C3AED', locked: true, watched: false },
  { id: 7, title: 'Tabata Protocol', instructor: 'Marcus Cole', duration: '25 min', category: 'HIIT', emoji: '🔥', color: '#EA580C', locked: true, watched: false },
  { id: 8, title: 'Advanced Core Challenge', instructor: 'Sofia Reyes', duration: '45 min', category: 'Pilates', emoji: '⚡', color: '#0891B2', locked: true, watched: false },
]

const liveClasses = [
  { title: 'HIIT Burn', instructor: 'Marcus Cole', time: 'Today, 7:00 PM', timeLeft: '2h 30m', spots: 4, emoji: '🔥', color: '#EA580C', live: false },
  { title: 'Power Yoga', instructor: 'Priya Sharma', time: 'Today, 8:30 PM', timeLeft: '4h', spots: 8, emoji: '🧘', color: '#7C3AED', live: false },
  { title: 'Morning HIIT', instructor: 'Marcus Cole', time: 'Tomorrow, 6:00 AM', timeLeft: '12h', spots: 6, emoji: '🔥', color: '#EA580C', live: false },
  { title: 'Core Pilates', instructor: 'Sofia Reyes', time: 'Tomorrow, 9:00 AM', timeLeft: '15h', spots: 10, emoji: '⚡', color: '#0891B2', live: false },
  { title: 'Iron Strength', instructor: 'Jake Monroe', time: 'Wed, 7:30 PM', timeLeft: '2d', spots: 2, emoji: '💪', color: '#C9FF00', live: false },
]

const progressData = [
  { week: 'W1', classes: 2 },
  { week: 'W2', classes: 3 },
  { week: 'W3', classes: 1 },
  { week: 'W4', classes: 4 },
  { week: 'W5', classes: 3 },
  { week: 'W6', classes: 5 },
  { week: 'W7', classes: 4 },
  { week: 'W8', classes: 8 },
]

const recentActivity = [
  { action: 'Completed HIIT Burn', time: '2 hours ago', emoji: '🔥' },
  { action: 'Watched Squat Masterclass', time: 'Yesterday', emoji: '💪' },
  { action: 'Completed Power Yoga', time: '2 days ago', emoji: '🧘' },
  { action: 'Booked Iron Strength — Wed 7:30PM', time: '3 days ago', emoji: '📅' },
  { action: 'Completed Core Pilates', time: '4 days ago', emoji: '⚡' },
]

function Sidebar({ active, setActive, onLogout }: { active: Tab, setActive: (t: Tab) => void, onLogout: () => void }) {
  const items: { id: Tab; label: string; icon: string }[] = [
    { id: 'overview', label: 'Overview', icon: '▦' },
    { id: 'videos', label: 'Video Library', icon: '▶' },
    { id: 'live', label: 'Live Classes', icon: '📡' },
    { id: 'progress', label: 'My Progress', icon: '📈' },
  ]

  return (
    <aside style={{
      width: 230, flexShrink: 0, background: '#080808',
      borderRight: '1px solid #1a1a1a', display: 'flex', flexDirection: 'column',
      padding: '24px 14px', minHeight: '100vh',
      position: 'sticky', top: 0, height: '100vh', overflowY: 'auto',
    }}>
      <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, padding: '0 8px', marginBottom: 36 }}>
        <div style={{ width: 32, height: 32, background: 'var(--accent)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span className="font-display" style={{ color: '#000', fontSize: 18 }}>A</span>
        </div>
        <span className="font-display" style={{ fontSize: 22, letterSpacing: 4, color: '#fff' }}>APEX</span>
      </Link>

      {/* Plan badge */}
      <div style={{
        background: 'rgba(201,255,0,0.06)', border: '1px solid rgba(201,255,0,0.15)',
        borderRadius: 10, padding: '10px 12px', marginBottom: 28, marginLeft: 8, marginRight: 8,
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }} />
        <span style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 700 }}>{memberData.plan} Plan Active</span>
      </div>

      <div style={{ fontSize: 10, color: '#333', letterSpacing: 2, textTransform: 'uppercase', padding: '0 8px', marginBottom: 10 }}>Menu</div>

      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {items.map(item => (
          <button key={item.id} onClick={() => setActive(item.id)} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', borderRadius: 10,
            background: active === item.id ? 'rgba(201,255,0,0.08)' : 'transparent',
            border: `1px solid ${active === item.id ? 'rgba(201,255,0,0.15)' : 'transparent'}`,
            color: active === item.id ? 'var(--accent)' : '#555',
            cursor: 'pointer', fontSize: 14, fontWeight: active === item.id ? 700 : 500,
            transition: 'all 0.15s', width: '100%', textAlign: 'left',
          }}
            onMouseEnter={e => { if (active !== item.id) e.currentTarget.style.color = '#aaa' }}
            onMouseLeave={e => { if (active !== item.id) e.currentTarget.style.color = '#555' }}
          >
            <span>{item.icon}</span> {item.label}
          </button>
        ))}

        {/* Upgrade CTA for PRO */}
        <div style={{
          margin: '20px 8px 0', background: 'rgba(167,139,250,0.06)',
          border: '1px solid rgba(167,139,250,0.2)', borderRadius: 14, padding: '16px 14px',
        }}>
          <div style={{ fontSize: 12, color: '#A78BFA', fontWeight: 700, marginBottom: 6 }}>Unlock ELITE</div>
          <div style={{ fontSize: 12, color: '#555', lineHeight: 1.6, marginBottom: 12 }}>Get live classes + AI coaching</div>
          <Link href="/pricing" style={{
            display: 'block', textAlign: 'center', background: '#A78BFA', color: '#000',
            borderRadius: 8, padding: '8px 0', fontSize: 12, fontWeight: 800, textDecoration: 'none',
          }}>
            Upgrade →
          </Link>
        </div>
      </nav>

      {/* User + logout */}
      <div style={{ borderTop: '1px solid #111', paddingTop: 20, marginTop: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent), #666)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 800, color: '#000', flexShrink: 0,
            }}>{memberData.initials}</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#ccc' }}>{memberData.name}</div>
              <div style={{ fontSize: 10, color: '#444' }}>{memberData.plan} Member</div>
            </div>
          </div>
          <button onClick={onLogout} style={{
            background: 'none', border: 'none', color: '#444', cursor: 'pointer',
            fontSize: 16, padding: 4, transition: 'color 0.2s',
          }}
            title="Sign out"
            onMouseEnter={e => (e.currentTarget.style.color = '#f87171')}
            onMouseLeave={e => (e.currentTarget.style.color = '#444')}
          >⎋</button>
        </div>
      </div>
    </aside>
  )
}

function OverviewTab() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Welcome */}
      <div style={{ background: 'linear-gradient(135deg, #0f0f0f, #111)', border: '1px solid #1a1a1a', borderRadius: 20, padding: '28px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
        <div>
          <p style={{ color: '#666', fontSize: 14, marginBottom: 6 }}>Good evening 👋</p>
          <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 8 }}>Welcome back, {memberData.name.split(' ')[0]}!</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 18 }}>🔥</span>
            <span style={{ color: 'var(--accent)', fontSize: 14, fontWeight: 700 }}>{memberData.streak}-day streak!</span>
            <span style={{ color: '#555', fontSize: 14 }}>Keep it up.</span>
          </div>
        </div>
        <Link href="#" style={{
          background: 'var(--accent)', color: '#000',
          padding: '13px 28px', borderRadius: 12, textDecoration: 'none',
          fontSize: 13, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase',
        }}>
          Start Today&apos;s Class →
        </Link>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14 }}>
        {[
          { label: 'Classes This Month', value: memberData.classesThisMonth, icon: '📅', color: 'var(--accent)' },
          { label: 'Total Classes', value: memberData.totalClasses, icon: '🏆', color: '#60A5FA' },
          { label: 'Calories Burned', value: `${(memberData.caloriesBurned / 1000).toFixed(1)}k`, icon: '🔥', color: '#EA580C' },
          { label: 'Days as Member', value: memberData.joinedDays, icon: '⭐', color: '#A78BFA' },
        ].map(s => (
          <div key={s.label} style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 16, padding: '20px 22px' }}>
            <div style={{ fontSize: 22, marginBottom: 10 }}>{s.icon}</div>
            <div className="font-display" style={{ fontSize: 36, color: s.color, letterSpacing: 1, marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: '#555', letterSpacing: 1 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Next class + recent activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Upcoming */}
        <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 18, padding: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 20 }}>Upcoming Classes</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {liveClasses.slice(0, 3).map((c, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: '#111', borderRadius: 12, border: '1px solid #1a1a1a' }}>
                <span style={{ fontSize: 22 }}>{c.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{c.title}</div>
                  <div style={{ fontSize: 11, color: '#555', marginTop: 2 }}>{c.time}</div>
                </div>
                <span style={{ fontSize: 11, color: c.color, fontWeight: 700 }}>In {c.timeLeft}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 18, padding: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 20 }}>Recent Activity</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {recentActivity.map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: i < recentActivity.length - 1 ? '1px solid #111' : 'none', alignItems: 'flex-start' }}>
                <span style={{ fontSize: 18, marginTop: 1 }}>{a.emoji}</span>
                <div>
                  <div style={{ fontSize: 13, color: '#ccc' }}>{a.action}</div>
                  <div style={{ fontSize: 11, color: '#444', marginTop: 2 }}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function VideosTab() {
  const [filter, setFilter] = useState('All')
  const categories = ['All', 'HIIT', 'Yoga', 'Pilates', 'Strength']
  const filtered = filter === 'All' ? videos : videos.filter(v => v.category === filter)

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Video Library</h2>
          <p style={{ fontSize: 13, color: '#555' }}>{videos.filter(v => !v.locked).length} unlocked · {videos.filter(v => v.locked).length} require ELITE</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {categories.map(c => (
            <button key={c} onClick={() => setFilter(c)} style={{
              background: filter === c ? 'rgba(201,255,0,0.1)' : 'transparent',
              border: `1px solid ${filter === c ? 'rgba(201,255,0,0.3)' : '#222'}`,
              color: filter === c ? 'var(--accent)' : '#555',
              borderRadius: 8, padding: '7px 14px', fontSize: 12,
              fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s',
            }}>{c}</button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
        {filtered.map(v => (
          <div key={v.id} style={{
            background: '#0f0f0f', border: '1px solid #1a1a1a',
            borderRadius: 16, overflow: 'hidden',
            opacity: v.locked ? 0.55 : 1, cursor: v.locked ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => { if (!v.locked) { e.currentTarget.style.borderColor = '#333'; e.currentTarget.style.transform = 'translateY(-3px)' } }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#1a1a1a'; e.currentTarget.style.transform = 'none' }}
          >
            <div style={{
              height: 130, background: `linear-gradient(135deg, ${v.color}22, #111)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                background: v.locked ? 'rgba(255,255,255,0.04)' : `${v.color}22`,
                border: `2px solid ${v.locked ? '#333' : v.color}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: 18 }}>{v.locked ? '🔒' : v.watched ? '✓' : '▶'}</span>
              </div>
              {v.watched && !v.locked && (
                <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(74,222,128,0.15)', border: '1px solid rgba(74,222,128,0.3)', borderRadius: 100, padding: '2px 8px', fontSize: 10, color: '#4ade80', fontWeight: 700 }}>
                  Watched
                </div>
              )}
              <div style={{ position: 'absolute', bottom: 8, right: 10, fontSize: 11, color: '#555', background: '#000', padding: '2px 7px', borderRadius: 4 }}>
                {v.duration}
              </div>
            </div>
            <div style={{ padding: '14px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <span style={{ fontSize: 14 }}>{v.emoji}</span>
                <span style={{ fontSize: 11, color: v.color, fontWeight: 700, letterSpacing: 1 }}>{v.category.toUpperCase()}</span>
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{v.title}</div>
              <div style={{ fontSize: 12, color: '#555' }}>{v.instructor}</div>
              {v.locked && (
                <Link href="/pricing" style={{ display: 'block', marginTop: 10, fontSize: 11, color: '#A78BFA', textDecoration: 'none' }}>
                  Upgrade to ELITE to unlock →
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function LiveTab() {
  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Live Classes</h2>
        <p style={{ fontSize: 13, color: '#555' }}>
          Live classes are available on the{' '}
          <Link href="/pricing" style={{ color: '#A78BFA', textDecoration: 'none', fontWeight: 700 }}>ELITE plan</Link>.
          Upgrade to join.
        </p>
      </div>

      {/* Upgrade notice */}
      <div style={{
        background: 'rgba(167,139,250,0.05)', border: '1px solid rgba(167,139,250,0.2)',
        borderRadius: 18, padding: '24px 28px', marginBottom: 28,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
      }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#A78BFA', marginBottom: 6 }}>🔴 Live classes require ELITE</div>
          <div style={{ fontSize: 13, color: '#666', maxWidth: 480 }}>
            Join real-time classes with live instructors. Daily sessions, interactive coaching, and community energy you can&apos;t get from recordings.
          </div>
        </div>
        <Link href="/checkout?plan=elite" style={{
          background: '#A78BFA', color: '#000',
          padding: '13px 28px', borderRadius: 12, textDecoration: 'none',
          fontSize: 13, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', whiteSpace: 'nowrap',
        }}>
          Upgrade to ELITE →
        </Link>
      </div>

      {/* Class schedule — blurred/locked */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {liveClasses.map((c, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: '#0f0f0f', border: '1px solid #1a1a1a',
            borderRadius: 16, padding: '20px 24px', flexWrap: 'wrap', gap: 12,
            filter: 'grayscale(0.3)', opacity: 0.7,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                background: `${c.color}18`, border: `1px solid ${c.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
              }}>{c.emoji}</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700 }}>{c.title}</div>
                <div style={{ fontSize: 12, color: '#555', marginTop: 2 }}>with {c.instructor} · {c.time}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 12, color: c.spots < 4 ? '#F59E0B' : '#555' }}>{c.spots} spots left</span>
              <div style={{
                background: '#1a1a1a', border: '1px solid #222',
                color: '#444', borderRadius: 8, padding: '8px 18px',
                fontSize: 12, fontWeight: 700,
              }}>🔒 Join Class</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProgressTab() {
  const maxClasses = Math.max(...progressData.map(d => d.classes))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>My Progress</h2>
        <p style={{ fontSize: 13, color: '#555' }}>Your fitness journey over time</p>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14 }}>
        {[
          { label: 'Current Streak', value: `${memberData.streak} days`, color: '#EA580C' },
          { label: 'Best Streak', value: '21 days', color: 'var(--accent)' },
          { label: 'Avg/Week', value: '3.4 classes', color: '#60A5FA' },
          { label: 'Fav Class', value: 'HIIT Burn', color: '#A78BFA' },
        ].map(s => (
          <div key={s.label} style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 16, padding: '20px 22px' }}>
            <div style={{ fontSize: 11, color: '#555', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Weekly bar chart (manual, no library needed) */}
      <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 18, padding: 28 }}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Weekly Classes Attended</div>
        <div style={{ fontSize: 12, color: '#555', marginBottom: 28 }}>Last 8 weeks</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 160 }}>
          {progressData.map((d, i) => (
            <div key={d.week} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, height: '100%', justifyContent: 'flex-end' }}>
              <span style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 700 }}>{d.classes}</span>
              <div style={{
                width: '100%', borderRadius: '6px 6px 0 0',
                background: i === progressData.length - 1 ? 'var(--accent)' : '#1e1e1e',
                height: `${(d.classes / maxClasses) * 120}px`,
                transition: 'height 0.4s ease',
                border: `1px solid ${i === progressData.length - 1 ? 'var(--accent)' : '#2a2a2a'}`,
              }} />
              <span style={{ fontSize: 11, color: '#555' }}>{d.week}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Classes by type */}
      <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 18, padding: 28 }}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 20 }}>Classes by Discipline</div>
        {[
          { name: 'HIIT Burn', count: 52, total: 121, color: '#EA580C' },
          { name: 'Power Yoga', count: 34, total: 121, color: '#7C3AED' },
          { name: 'Iron Strength', count: 24, total: 121, color: '#C9FF00' },
          { name: 'Core Pilates', count: 11, total: 121, color: '#0891B2' },
        ].map(c => (
          <div key={c.name} style={{ marginBottom: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
              <span style={{ fontSize: 13, color: '#aaa' }}>{c.name}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: c.color }}>{c.count} classes</span>
            </div>
            <div style={{ height: 6, background: '#1a1a1a', borderRadius: 3 }}>
              <div style={{
                height: '100%', borderRadius: 3,
                width: `${(c.count / c.total) * 100}%`,
                background: c.color,
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>('overview')

  const handleLogout = () => {
    window.location.href = '/'
  }

  const tabTitles: Record<Tab, string> = {
    overview: 'Dashboard',
    videos: 'Video Library',
    live: 'Live Classes',
    progress: 'My Progress',
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#080808', color: '#fff' }}>
      <Sidebar active={activeTab} setActive={setActiveTab} onLogout={handleLogout} />
      <main style={{ flex: 1, padding: '36px 40px', overflowY: 'auto', minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>{tabTitles[activeTab]}</h1>
            <p style={{ fontSize: 13, color: '#555' }}>
              {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: '#0f0f0f', border: '1px solid #1a1a1a',
            borderRadius: 10, padding: '8px 16px',
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80' }} />
            <span style={{ fontSize: 12, color: '#666' }}>{memberData.streak} day streak 🔥</span>
          </div>
        </div>

        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'videos' && <VideosTab />}
        {activeTab === 'live' && <LiveTab />}
        {activeTab === 'progress' && <ProgressTab />}
      </main>
    </div>
  )
}