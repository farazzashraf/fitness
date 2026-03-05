import { UserData } from '../../types'
import { LockedOverlay } from '../LockedOverlay'

export function ProgressTab({ bp, user }: { bp: 'mobile' | 'tablet' | 'desktop'; user: UserData }) {
  const isFree = user?.plan === 'FREE';
  
  if (isFree) return <LockedOverlay title="Progress Tracking" message="Track your workouts, measure your calorie burn, and view your weekly discipline breakdown." unlockTier="PRO" ctaLink="/checkout?plan=pro" />

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 14 }}>
        {[
          { label: 'Current Streak', value: `${user.streak}d`, color: '#EA580C' },
          { label: 'Best Streak', value: '21d', color: 'var(--accent)' },
          { label: 'Avg / Week', value: '3.4', color: '#60A5FA' },
        ].map(s => (
          <div key={s.label} style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 16, padding: '20px 22px' }}>
            <div style={{ fontSize: 10, color: '#555', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}