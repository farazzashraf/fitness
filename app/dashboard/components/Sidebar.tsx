import Link from 'next/link'
import { Tab, UserData } from '../types'

export function Sidebar({ active, setActive, onLogout, collapsed, user }: { active: Tab; setActive: (t: Tab) => void; onLogout: () => void; collapsed: boolean; user: UserData }) {
  const items: { id: Tab; label: string; icon: string }[] = [
    { id: 'overview', label: 'Overview', icon: '▦' },
    { id: 'videos', label: 'Video Library', icon: '▶' },
    { id: 'progress', label: 'Progress', icon: '📈' },
    { id: 'nutrition', label: 'Nutrition', icon: '🥗' },
    { id: 'community', label: 'Community', icon: '💬' },
    { id: 'live', label: 'Live Classes', icon: '📡' },
    { id: 'ai', label: 'AI Coach Q&A', icon: '🤖' },
  ]

  const isFree = user?.plan === 'FREE'
  const isPro = user?.plan === 'PRO'

  return (
    <aside style={{
      width: collapsed ? 64 : 240, flexShrink: 0, background: '#080808', borderRight: '1px solid #1a1a1a',
      display: 'flex', flexDirection: 'column', padding: collapsed ? '24px 10px' : '24px 14px',
      position: 'sticky', top: 0, height: '100vh', overflowY: 'auto', transition: 'width 0.25s ease',
    }}>
      <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, padding: '0 4px', marginBottom: 36, overflow: 'hidden', flexShrink: 0 }}>
        <div style={{ width: 32, height: 32, minWidth: 32, background: 'var(--accent)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span className="font-display" style={{ color: '#000', fontSize: 18 }}>A</span>
        </div>
        {!collapsed && <span className="font-display" style={{ fontSize: 22, letterSpacing: 4, color: '#fff', whiteSpace: 'nowrap' }}>APEX</span>}
      </Link>

      {!collapsed && <div style={{ fontSize: 10, color: '#333', letterSpacing: 2, textTransform: 'uppercase', padding: '0 8px', marginBottom: 10 }}>Menu</div>}

      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {items.map(item => {
          let isLocked = false;
          if (isFree && (item.id === 'progress' || item.id === 'nutrition' || item.id === 'live' || item.id === 'ai')) isLocked = true;
          if (isPro && (item.id === 'live' || item.id === 'ai')) isLocked = true;

          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              title={collapsed ? item.label : undefined}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'space-between',
                padding: collapsed ? '12px 0' : '11px 14px', borderRadius: 10,
                background: active === item.id ? 'rgba(201,255,0,0.08)' : 'transparent',
                border: `1px solid ${active === item.id ? 'rgba(201,255,0,0.15)' : 'transparent'}`,
                color: active === item.id ? 'var(--accent)' : isLocked ? '#444' : '#888',
                cursor: 'pointer', fontSize: collapsed ? 18 : 14, fontWeight: active === item.id ? 700 : 500,
                transition: 'all 0.15s', width: '100%', textAlign: 'left',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: collapsed ? 0 : 12 }}>
                <span style={{ opacity: isLocked ? 0.5 : 1 }}>{item.icon}</span>
                {!collapsed && item.label}
              </div>
              {!collapsed && isLocked && <span style={{ fontSize: 10 }}>🔒</span>}
            </button>
          )
        })}

        {isFree && !collapsed && (
          <div style={{ margin: '20px 4px 0', background: 'rgba(201,255,0,0.06)', border: '1px solid rgba(201,255,0,0.2)', borderRadius: 14, padding: '16px 14px' }}>
            <div style={{ fontSize: 12, color: '#C9FF00', fontWeight: 700, marginBottom: 6 }}>Unlock PRO</div>
            <div style={{ fontSize: 12, color: '#555', lineHeight: 1.6, marginBottom: 12 }}>Get full access to all on-demand training & progress tracking.</div>
            <Link href="/pricing" style={{ display: 'block', textAlign: 'center', background: '#C9FF00', color: '#000', borderRadius: 8, padding: '8px 0', fontSize: 12, fontWeight: 800, textDecoration: 'none' }}>Upgrade →</Link>
          </div>
        )}

        {isPro && !collapsed && (
          <div style={{ margin: '20px 4px 0', background: 'rgba(167,139,250,0.06)', border: '1px solid rgba(167,139,250,0.2)', borderRadius: 14, padding: '16px 14px' }}>
            <div style={{ fontSize: 12, color: '#A78BFA', fontWeight: 700, marginBottom: 6 }}>Unlock ELITE</div>
            <div style={{ fontSize: 12, color: '#555', lineHeight: 1.6, marginBottom: 12 }}>Join daily live classes & get 24/7 AI coaching.</div>
            <Link href="/pricing" style={{ display: 'block', textAlign: 'center', background: '#A78BFA', color: '#000', borderRadius: 8, padding: '8px 0', fontSize: 12, fontWeight: 800, textDecoration: 'none' }}>Upgrade →</Link>
          </div>
        )}
      </nav>

      <div style={{ borderTop: '1px solid #111', paddingTop: 20, marginTop: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'space-between', padding: '4px 4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: collapsed ? 0 : 10 }}>
            <div style={{
              width: 32, height: 32, minWidth: 32, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), #666)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: '#000',
            }}>{user.initials}</div>
            {!collapsed && (
              <div style={{ maxWidth: 90, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#ccc', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.name}</div>
                <div style={{ fontSize: 10, color: '#444' }}>{user.plan}</div>
              </div>
            )}
          </div>
          {!collapsed ? (
            <button onClick={onLogout} style={{ background: '#111', border: '1px solid #222', borderRadius: 8, color: '#aaa', cursor: 'pointer', fontSize: 11, fontWeight: 600, padding: '6px 10px' }}>
              Logout
            </button>
          ) : (
            <button onClick={onLogout} style={{ background: 'none', border: 'none', color: '#444', cursor: 'pointer', fontSize: 16, padding: 4 }} title="Sign out">⎋</button>
          )}
        </div>
      </div>
    </aside>
  )
}