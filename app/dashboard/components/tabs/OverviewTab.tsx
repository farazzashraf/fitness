import { UserData } from '../../types'
import { recentActivity, liveClasses } from '../../data'
import Link from 'next/link'

export function OverviewTab({ bp, user }: { bp: 'mobile' | 'tablet' | 'desktop'; user: UserData }) {
  const isMobile = bp === 'mobile'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 16 : 24 }}>
      
      {/* 1. Welcome Banner + Quick Action CTA */}
      <div style={{
        background: 'linear-gradient(135deg, #0f0f0f, #111)', border: '1px solid #1a1a1a', borderRadius: isMobile ? 16 : 20,
        padding: isMobile ? '20px 18px' : '28px 32px', display: 'flex', flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'space-between', gap: isMobile ? 16 : 20,
      }}>
        <div>
          <p style={{ color: '#666', fontSize: 13, marginBottom: 4 }}>Good evening 👋</p>
          <h2 style={{ fontSize: isMobile ? 20 : 26, fontWeight: 700, marginBottom: 8 }}>Welcome back, {user.name.split(' ')[0]}!</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 16 }}>🔥</span>
            <span style={{ color: 'var(--accent)', fontSize: 13, fontWeight: 700 }}>{user.streak}-day streak!</span>
            <span style={{ color: '#555', fontSize: 13 }}>Keep it up.</span>
          </div>
        </div>
        <button style={{
          background: 'var(--accent)', color: '#000', padding: '14px 28px', borderRadius: 12,
          fontWeight: 800, fontSize: 13, border: 'none', cursor: 'pointer', letterSpacing: 1, textTransform: 'uppercase',
          width: isMobile ? '100%' : 'auto', transition: 'all 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 24px rgba(201,255,0,0.25)'}
        onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
        >
          Start Workout →
        </button>
      </div>

      {/* 2. Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: isMobile ? 10 : 14 }}>
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

      {/* 3. Bottom Grid: Up Next & Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 16 : 24 }}>
        
        {/* Up Next (Live Class Teaser) */}
        <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 16, padding: isMobile ? '20px 16px' : '24px 28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Up Next</h3>
            {user.plan !== 'ELITE' && (
              <span style={{ fontSize: 10, background: '#222', padding: '4px 8px', borderRadius: 100, color: '#aaa', fontWeight: 700, letterSpacing: 1 }}>ELITE ONLY</span>
            )}
          </div>

          {liveClasses.slice(0, 1).map((c, i) => (
            <div key={i} style={{ 
              display: 'flex', alignItems: 'center', gap: 16, background: '#111', padding: 16, 
              borderRadius: 12, border: '1px solid #1a1a1a', 
              filter: user.plan !== 'ELITE' ? 'grayscale(1)' : 'none', 
              opacity: user.plan !== 'ELITE' ? 0.6 : 1 
            }}>
              <div style={{ fontSize: 28 }}>{c.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{c.title}</div>
                <div style={{ fontSize: 12, color: '#666', marginTop: 2 }}>{c.time}</div>
              </div>
              <div style={{ fontSize: 12, color: c.color, fontWeight: 700 }}>In {c.timeLeft}</div>
            </div>
          ))}

          {user.plan !== 'ELITE' && (
            <Link href="/pricing" style={{ display: 'block', textAlign: 'center', marginTop: 16, fontSize: 12, color: '#A78BFA', textDecoration: 'none', fontWeight: 600 }}>
              Upgrade to join live classes →
            </Link>
          )}
        </div>

        {/* Recent Activity Log */}
        <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 16, padding: isMobile ? '20px 16px' : '24px 28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Recent Activity</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {recentActivity.slice(0, 3).map((activity, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                <div style={{ 
                  width: 40, height: 40, borderRadius: 10, background: '#111', 
                  border: '1px solid #222', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 
                }}>
                  {activity.emoji}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#eee' }}>{activity.action}</div>
                  <div style={{ fontSize: 11, color: '#666', marginTop: 3 }}>{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  )
}