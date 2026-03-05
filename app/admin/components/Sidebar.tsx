import { Tab } from '../types'
import { useIsMobile } from '../utils'

function AsideSidebar({ isOpen, children }: { isOpen?: boolean; children: React.ReactNode }) {
    const isMobile = useIsMobile()
    return (
        <aside style={{
            width: 240, flexShrink: 0, background: '#080808', borderRight: '1px solid #1a1a1a',
            display: 'flex', flexDirection: 'column', padding: '28px 16px',
            minHeight: '100vh', overflowY: 'auto',
            ...(isMobile ? {
                position: 'fixed' as const,
                top: 0, left: 0, bottom: 0, height: '100vh',
                zIndex: 200,
                transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
                transition: 'transform 0.28s cubic-bezier(.4,0,.2,1)',
                boxShadow: isOpen ? '4px 0 40px rgba(0,0,0,0.8)' : 'none',
            } : {
                position: 'sticky' as const,
                top: 0, height: '100vh',
            }),
        }}>
            {children}
        </aside>
    )
}

export function Sidebar({ active, setActive, isOpen, onClose, onLogout }: {
    active: Tab; setActive: (t: Tab) => void
    isOpen?: boolean; onClose?: () => void; onLogout: () => void
}) {
    const items: { id: Tab; label: string; icon: string }[] = [
        { id: 'overview', label: 'Overview', icon: '▦' },
        { id: 'customers', label: 'Customers', icon: '👥' },
        { id: 'subscriptions', label: 'Subscriptions', icon: '💳' },
        { id: 'analytics', label: 'Analytics', icon: '📈' },
        { id: 'churn', label: 'Churn Rate', icon: '⚠️' },
        { id: 'ai-assistant', label: 'AI Assistant', icon: '🤖' },
    ]

    return (
        <AsideSidebar isOpen={isOpen}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px', marginBottom: 40 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 32, height: 32, background: 'var(--accent)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span className="font-display" style={{ color: '#000', fontSize: 18 }}>A</span>
                    </div>
                    <div>
                        <span className="font-display" style={{ fontSize: 20, letterSpacing: 3, color: '#fff' }}>APEX</span>
                        <div style={{ fontSize: 9, color: '#444', letterSpacing: 2, textTransform: 'uppercase', marginTop: -2 }}>Admin Panel</div>
                    </div>
                </div>
            </div>

            <nav style={{ flex: 1 }}>
                <div style={{ fontSize: 10, color: '#333', letterSpacing: 2, textTransform: 'uppercase', padding: '0 8px', marginBottom: 12 }}>Dashboard</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {items.map(item => (
                        <button key={item.id} onClick={() => { setActive(item.id); onClose?.() }} style={{
                            display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', borderRadius: 10,
                            background: active === item.id ? 'rgba(201,255,0,0.08)' : 'transparent',
                            border: active === item.id ? '1px solid rgba(201,255,0,0.15)' : '1px solid transparent',
                            color: active === item.id ? 'var(--accent)' : '#555',
                            cursor: 'pointer', textAlign: 'left', fontSize: 14, fontWeight: active === item.id ? 700 : 500,
                            transition: 'all 0.15s', width: '100%',
                        }}
                            onMouseEnter={e => { if (active !== item.id) e.currentTarget.style.color = '#aaa' }}
                            onMouseLeave={e => { if (active !== item.id) e.currentTarget.style.color = '#555' }}
                        >
                            <span style={{ fontSize: 16 }}>{item.icon}</span>
                            {item.label}
                            {item.id === 'churn' && (
                                <span style={{ marginLeft: 'auto', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#EF4444', fontSize: 10, fontWeight: 700, borderRadius: 100, padding: '1px 7px' }}>3</span>
                            )}
                        </button>
                    ))}
                </div>
            </nav>

            {/* ── User + Logout ── */}
            <div style={{ borderTop: '1px solid #111', paddingTop: 16, marginTop: 20 }}>
                {/* Avatar row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 8px 14px' }}>
                    <div style={{
                        width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
                        background: 'linear-gradient(135deg, var(--accent), #666)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 12, fontWeight: 800, color: '#000',
                    }}>AD</div>
                    <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#ddd', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Admin User</div>
                        <div style={{ fontSize: 11, color: '#444', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>admin@apexfit.com</div>
                    </div>
                </div>

                {/* Logout button */}
                <button
                    onClick={onLogout}
                    style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        width: '100%', padding: '10px 14px', borderRadius: 10,
                        background: 'transparent',
                        border: '1px solid transparent',
                        color: '#555', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                        transition: 'all 0.15s', textAlign: 'left',
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.background = 'rgba(248,113,113,0.08)'
                        e.currentTarget.style.borderColor = 'rgba(248,113,113,0.2)'
                        e.currentTarget.style.color = '#f87171'
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.background = 'transparent'
                        e.currentTarget.style.borderColor = 'transparent'
                        e.currentTarget.style.color = '#555'
                    }}
                >
                    <span style={{ fontSize: 16 }}>⎋</span>
                    Sign Out
                </button>
            </div>
        </AsideSidebar>
    )
}
