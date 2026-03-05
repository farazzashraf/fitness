import { UserData } from '../../types'
import { liveClasses } from '../../data'
import { LockedOverlay } from '../LockedOverlay'

export function LiveTab({ bp, user }: { bp: 'mobile' | 'tablet' | 'desktop'; user: UserData }) {
  const isElite = user?.plan === 'ELITE'
  
  if (!isElite) return <LockedOverlay title="Live Classes" message="Join real-time classes with live instructors. Daily sessions, interactive coaching, and community energy." unlockTier="ELITE" ctaLink="/checkout?plan=elite" />

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {liveClasses.map((c, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 16, padding: '20px 24px', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: `${c.color}18`, border: `1px solid ${c.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{c.emoji}</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700 }}>{c.title}</div>
              <div style={{ fontSize: 11, color: '#555', marginTop: 2 }}>with {c.instructor} · {c.time}</div>
            </div>
          </div>
          <button style={{ background: 'var(--accent)', color: '#000', borderRadius: 8, padding: '8px 18px', fontSize: 11, fontWeight: 700, cursor: 'pointer', border: 'none' }}>Join</button>
        </div>
      ))}
    </div>
  )
}