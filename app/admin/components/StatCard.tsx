export function StatCard({ label, value, sub, trend, color = 'var(--accent)' }: {
    label: string; value: string; sub: string; trend: string; color?: string
}) {
    const up = trend.startsWith('+')
    return (
        <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 16, padding: '22px 24px', transition: 'border-color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = '#2a2a2a')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = '#1a1a1a')}
        >
            <div style={{ fontSize: 11, color: '#555', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>{label}</div>
            <div className="font-display" style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', letterSpacing: 1, color, lineHeight: 1, marginBottom: 8 }}>{value}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: up ? '#4ade80' : '#f87171' }}>{trend}</span>
                <span style={{ fontSize: 12, color: '#444' }}>{sub}</span>
            </div>
        </div>
    )
}
