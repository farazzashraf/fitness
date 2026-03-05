import { UserData } from '../../types'

export function OverviewTab({ bp, user }: { bp: 'mobile' | 'tablet' | 'desktop'; user: UserData }) {
  const isMobile = bp === 'mobile'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 16 : 24 }}>
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
      </div>

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
    </div>
  )
}