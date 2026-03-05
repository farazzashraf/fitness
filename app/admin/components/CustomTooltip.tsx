import { fmtINR } from '../utils'

export const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null
    return (
        <div style={{ background: '#111', border: '1px solid #222', borderRadius: 10, padding: '10px 16px' }}>
            <p style={{ color: '#888', fontSize: 12, marginBottom: 6 }}>{label}</p>
            {payload.map((p: any) => (
                <p key={p.name} style={{ color: p.color || 'var(--accent)', fontSize: 13, fontWeight: 600 }}>
                    {p.name}: {typeof p.value === 'number' && p.name.toLowerCase().includes('revenue') ? fmtINR(p.value) : p.value}
                </p>
            ))}
        </div>
    )
}
