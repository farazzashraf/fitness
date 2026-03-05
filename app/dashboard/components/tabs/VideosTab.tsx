import { useState } from 'react'
import Link from 'next/link'
import { UserData } from '../../types'
import { videos } from '../../data'

export function VideosTab({ bp, user }: { bp: 'mobile' | 'tablet' | 'desktop'; user: UserData }) {
  const [filter, setFilter] = useState('All')
  const isMobile = bp === 'mobile'
  
  const hasFullVideoAccess = user?.plan === 'PRO' || user?.plan === 'ELITE'
  const categories = ['All', 'HIIT', 'Yoga', 'Pilates', 'Strength', 'Replays']
  const filtered = filter === 'All' ? videos : videos.filter(v => v.category === filter)
  const cols = isMobile ? '1fr' : bp === 'tablet' ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(260px, 1fr))'

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: isMobile ? 12 : 24, scrollbarWidth: 'none' }}>
        {categories.map(c => (
          <button key={c} onClick={() => setFilter(c)} style={{
            background: filter === c ? 'rgba(201,255,0,0.1)' : 'transparent', border: `1px solid ${filter === c ? 'rgba(201,255,0,0.3)' : '#222'}`,
            color: filter === c ? 'var(--accent)' : '#555', borderRadius: 8, padding: '7px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer', flexShrink: 0,
          }}>{c}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: cols, gap: isMobile ? 12 : 16 }}>
        {filtered.map(v => {
          const effectivelyLocked = !hasFullVideoAccess && !v.isFreeIntro;

          return (
            <div key={v.id} style={{
              background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 16, overflow: 'hidden',
              opacity: effectivelyLocked ? 0.55 : 1, cursor: effectivelyLocked ? 'not-allowed' : 'pointer',
              display: isMobile ? 'flex' : 'block',
            }}>
              <div style={{
                height: isMobile ? undefined : 130, width: isMobile ? 90 : undefined, aspectRatio: isMobile ? '1' : undefined,
                background: `linear-gradient(135deg, ${v.color}22, #111)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <span style={{ fontSize: 24 }}>{effectivelyLocked ? '🔒' : v.watched ? '✓' : '▶'}</span>
              </div>
              <div style={{ padding: '12px 14px', flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 10, color: v.color, fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>{v.category.toUpperCase()}</div>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{v.title}</div>
                <div style={{ fontSize: 11, color: '#555' }}>{v.duration} · {v.instructor}</div>
                {effectivelyLocked && <Link href="/pricing" style={{ display: 'block', marginTop: 8, fontSize: 11, color: '#C9FF00', textDecoration: 'none' }}>Unlock with PRO →</Link>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}