import { Customer } from '../types'
import { planColor, statusColor, statusBg, fmtINR, useIsMobile } from '../utils'

export function CustomerRows({ customers: list }: { customers: Customer[] }) {
    const isMobile = useIsMobile()

    if (isMobile) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {list.map(c => (
                    <div key={c.id} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 14, padding: '14px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                                <div style={{ width: 36, height: 36, borderRadius: '50%', flexShrink: 0, background: `linear-gradient(135deg, ${planColor(c.plan)}, ${planColor(c.plan)}80)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: '#000' }}>{c.initials}</div>
                                <div style={{ minWidth: 0 }}>
                                    <div style={{ fontSize: 14, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</div>
                                    <div style={{ fontSize: 11, color: '#555', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.email}</div>
                                </div>
                            </div>
                            <span style={{ fontSize: 11, fontWeight: 700, color: planColor(c.plan), background: `${planColor(c.plan)}15`, border: `1px solid ${planColor(c.plan)}30`, borderRadius: 100, padding: '3px 10px', flexShrink: 0, marginLeft: 8 }}>{c.plan}</span>
                        </div>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                            <span style={{ fontSize: 11, fontWeight: 600, color: statusColor(c.status), background: statusBg(c.status), border: `1px solid ${statusColor(c.status)}30`, borderRadius: 100, padding: '2px 9px', textTransform: 'capitalize' }}>{c.status}</span>
                            <span style={{ fontSize: 11, color: '#555' }}>Joined {c.joined}</span>
                            <span style={{ fontSize: 11, color: '#666' }}>🏋 {c.classes} classes</span>
                            <span style={{ fontSize: 11, color: '#666' }}>{fmtINR(c.spend)}</span>
                            <span style={{ fontSize: 11, color: '#444', marginLeft: 'auto' }}>{c.lastActive}</span>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div style={{ overflowX: 'auto' }}>
            <div style={{ minWidth: 620 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1fr 0.7fr 1fr', padding: '0 0 12px', borderBottom: '1px solid #111', fontSize: 11, color: '#444', letterSpacing: 1, textTransform: 'uppercase' }}>
                    <span>Customer</span><span>Email</span><span>Plan</span><span>Status</span><span>Classes</span><span>Spend</span>
                </div>
                {list.map(c => (
                    <div key={c.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1fr 0.7fr 1fr', padding: '13px 0', borderBottom: '1px solid #0d0d0d', alignItems: 'center', transition: 'background 0.15s', cursor: 'pointer', borderRadius: 8 }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#111')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ width: 32, height: 32, borderRadius: '50%', flexShrink: 0, background: `linear-gradient(135deg, ${planColor(c.plan)}, ${planColor(c.plan)}80)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: '#000' }}>{c.initials}</div>
                            <div>
                                <div style={{ fontSize: 13, fontWeight: 600 }}>{c.name}</div>
                                <div style={{ fontSize: 11, color: '#555' }}>Joined {c.joined}</div>
                            </div>
                        </div>
                        <span style={{ fontSize: 12, color: '#666', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: 8 }}>{c.email}</span>
                        <span style={{ fontSize: 11, fontWeight: 700, color: planColor(c.plan), background: `${planColor(c.plan)}15`, border: `1px solid ${planColor(c.plan)}30`, borderRadius: 100, padding: '3px 10px', display: 'inline-block' }}>{c.plan}</span>
                        <span style={{ fontSize: 11, fontWeight: 600, color: statusColor(c.status), background: statusBg(c.status), border: `1px solid ${statusColor(c.status)}30`, borderRadius: 100, padding: '3px 10px', display: 'inline-block', textTransform: 'capitalize' }}>{c.status}</span>
                        <span style={{ fontSize: 13, color: '#aaa' }}>{c.classes}</span>
                        <span style={{ fontSize: 13, color: '#aaa' }}>{fmtINR(c.spend)}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
