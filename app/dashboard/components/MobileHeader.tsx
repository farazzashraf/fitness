import { UserData } from '../types'

export function MobileHeader({ title, onLogout, user }: { title: string; onLogout: () => void; user: UserData }) {
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50, background: 'rgba(8,8,8,0.95)', borderBottom: '1px solid #1a1a1a',
      backdropFilter: 'blur(12px)', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
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
        <button onClick={onLogout} style={{ background: '#111', border: '1px solid #222', borderRadius: 8, color: '#aaa', cursor: 'pointer', fontSize: 11, fontWeight: 600, padding: '6px 12px' }}>
          Logout
        </button>
      </div>
    </header>
  )
}