import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'
import { CustomTooltip } from './CustomTooltip'
import { trafficData } from '../data'

export function AnalyticsTab() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* <p style={{ fontSize: 20, fontWeight: 500, color: '#edeaea' }}>Traffic, signups, and engagement</p> */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 14 }}>
                {[
                    { label: 'Weekly Visits', value: '13,050', trend: '+12%', color: 'var(--accent)' },
                    { label: 'Weekly Signups', value: '532', trend: '+8%', color: '#60A5FA' },
                    { label: 'Conversion', value: '4.08%', trend: '+0.3%', color: '#4ADE80' },
                    { label: 'Avg. Session', value: '6m 22s', trend: '+44s', color: '#F59E0B' },
                    { label: 'Bounce Rate', value: '38.2%', trend: '-2.1%', color: '#A78BFA' },
                ].map(s => (
                    <div key={s.label} style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 14, padding: '18px 20px' }}>
                        <div style={{ fontSize: 11, color: '#555', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>{s.label}</div>
                        <div className="font-display" style={{ fontSize: 'clamp(22px, 3vw, 30px)', color: s.color, marginBottom: 6 }}>{s.value}</div>
                        <div style={{ fontSize: 11, color: s.trend.startsWith('+') ? '#4ade80' : '#f87171', fontWeight: 600 }}>{s.trend} vs last week</div>
                    </div>
                ))}
            </div>
            <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 16, padding: '24px 20px' }}>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Daily Traffic & Signups</div>
                <div style={{ fontSize: 12, color: '#555', marginBottom: 24 }}>This week</div>
                <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={trafficData} barGap={4}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" vertical={false} />
                        <XAxis dataKey="day" tick={{ fill: '#555', fontSize: 11 }} axisLine={false} tickLine={false} />
                        <YAxis yAxisId="v" tick={{ fill: '#555', fontSize: 10 }} axisLine={false} tickLine={false} width={40} />
                        <YAxis yAxisId="s" orientation="right" tick={{ fill: '#555', fontSize: 10 }} axisLine={false} tickLine={false} width={36} />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar yAxisId="v" dataKey="visits" name="Visits" fill="#757575ff" radius={[4, 4, 0, 0]} barSize={24} />
                        <Bar yAxisId="s" dataKey="signups" name="Signups" fill="#C9FF00" radius={[4, 4, 0, 0]} barSize={10} fillOpacity={0.9} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="admin-grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 16, padding: '24px 20px' }}>
                    <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 20 }}>Traffic Sources</div>
                    {[
                        { source: 'Organic Search', pct: 42, color: '#C9FF00' },
                        { source: 'Direct', pct: 28, color: '#60A5FA' },
                        { source: 'Social Media', pct: 18, color: '#A78BFA' },
                        { source: 'Referral', pct: 12, color: '#F59E0B' },
                    ].map(s => (
                        <div key={s.source} style={{ marginBottom: 16 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                <span style={{ fontSize: 13, color: '#888' }}>{s.source}</span>
                                <span style={{ fontSize: 13, fontWeight: 600, color: s.color }}>{s.pct}%</span>
                            </div>
                            <div style={{ height: 4, background: '#1a1a1a', borderRadius: 2 }}>
                                <div style={{ height: '100%', width: `${s.pct}%`, background: s.color, borderRadius: 2 }} />
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 16, padding: '24px 20px' }}>
                    <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 20 }}>Top Pages</div>
                    {[
                        { page: '/ (Home)', visits: 4820 },
                        { page: '/pricing', visits: 2340 },
                        { page: '/classes/hiit', visits: 1890 },
                        { page: '/classes/yoga', visits: 1620 },
                        { page: '/register', visits: 1280 },
                    ].map((p, i) => (
                        <div key={p.page} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < 4 ? '1px solid #111' : 'none' }}>
                            <span style={{ fontSize: 12, color: '#888', fontFamily: 'monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1, marginRight: 12 }}>{p.page}</span>
                            <span style={{ fontSize: 13, fontWeight: 600, flexShrink: 0 }}>{p.visits.toLocaleString()}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
