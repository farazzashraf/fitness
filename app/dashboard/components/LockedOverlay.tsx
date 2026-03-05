import Link from 'next/link'

export function LockedOverlay({ title, message, unlockTier, ctaLink }: { title: string, message: string, unlockTier: 'PRO' | 'ELITE', ctaLink: string }) {
  const color = unlockTier === 'PRO' ? '#C9FF00' : '#A78BFA'
  return (
    <div style={{
      background: 'rgba(15,15,15,0.8)', border: '1px solid #1a1a1a', borderRadius: 24,
      padding: '60px 20px', textAlign: 'center', backdropFilter: 'blur(10px)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      minHeight: 400
    }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
      <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12, color: color }}>{title} requires {unlockTier}</h3>
      <p style={{ color: '#888', maxWidth: 400, lineHeight: 1.6, marginBottom: 32 }}>{message}</p>
      <Link href={ctaLink} style={{
        background: color, color: '#000', padding: '14px 32px', borderRadius: 12,
        textDecoration: 'none', fontWeight: 800, fontSize: 14, letterSpacing: 1, textTransform: 'uppercase'
      }}>
        Upgrade to {unlockTier} →
      </Link>
    </div>
  )
}