import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'
import { CustomTooltip } from './CustomTooltip'
import { churnData, atRiskReasons } from '../data'
import { planColor } from '../utils'

export function ChurnTab() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* <div>
                <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Churn Analysis</h2>
                <p style={{ fontSize: 13, color: '#555' }}>Monitor retention and at-risk members</p>
            </div> */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 14 }}>
                {[
                    { label: 'Current Churn Rate', value: '2.2%', note: 'Down from 2.7% last month', good: true },
                    { label: 'Retention Rate', value: '97.8%', note: 'Up from 97.3% last month', good: true },
                    { label: 'At-Risk Members', value: '3', note: 'Need immediate attention', good: false },
                    { label: 'Avg. Member LTV', value: '₹18.2k', note: 'Based on 12mo avg.', good: true },
                ].map(s => (
                    <div key={s.label} style={{ background: '#0f0f0f', border: `1px solid ${s.good ? '#1a1a1a' : 'rgba(239,68,68,0.2)'}`, borderRadius: 14, padding: '20px 22px' }}>
                        <div style={{ fontSize: 11, color: '#555', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>{s.label}</div>
                        <div className="font-display" style={{ fontSize: 'clamp(26px, 3.5vw, 36px)', color: s.good ? 'var(--accent)' : '#EF4444', marginBottom: 6 }}>{s.value}</div>
                        <div style={{ fontSize: 11, color: '#555' }}>{s.note}</div>
                    </div>
                ))}
            </div>
            <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 16, padding: '24px 20px' }}>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Churn Rate Trend</div>
                <div style={{ fontSize: 12, color: '#555', marginBottom: 24 }}>Last 9 months -target: under 3%</div>
                <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={churnData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
                        <XAxis dataKey="month" tick={{ fill: '#555', fontSize: 11 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: '#555', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} domain={[0, 6]} width={36} />
                        <Tooltip content={<CustomTooltip />} />
                        <Line type="monotone" dataKey={() => 3} stroke="#333" strokeDasharray="4 4" dot={false} name="Target (3%)" />
                        <Line type="monotone" dataKey="churn" name="Churn %" stroke="#EF4444" strokeWidth={2.5} dot={{ fill: '#EF4444', r: 4 }} activeDot={{ r: 6 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 16, padding: '24px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                    <span style={{ fontSize: 18 }}>⚠️</span>
                    <div>
                        <div style={{ fontSize: 15, fontWeight: 700, color: '#EF4444' }}>At-Risk Members</div>
                        <div style={{ fontSize: 12, color: '#666' }}>These members show signs of disengagement</div>
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {atRiskReasons.map(r => (
                        <div key={r.customer} style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 12, padding: '16px 18px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>⚠</div>
                                <div style={{ minWidth: 0 }}>
                                    <div style={{ fontSize: 14, fontWeight: 600 }}>{r.customer}</div>
                                    <div style={{ fontSize: 12, color: '#666', marginTop: 2 }}>{r.reason}</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                                <span style={{ fontSize: 11, color: planColor(r.plan), background: `${planColor(r.plan)}15`, border: `1px solid ${planColor(r.plan)}30`, borderRadius: 100, padding: '3px 10px', fontWeight: 700 }}>{r.plan}</span>
                                <span style={{ fontSize: 12, color: '#555' }}>Inactive {r.days}d</span>
                                <button style={{ marginLeft: 'auto', background: 'rgba(201,255,0,0.1)', border: '1px solid rgba(201,255,0,0.3)', color: 'var(--accent)', borderRadius: 8, padding: '7px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                                    Send Re-engagement →
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 16, padding: '24px 20px' }}>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 20 }}>Retention by Plan</div>
                {[
                    { plan: 'ELITE', rate: 98.4, color: '#A78BFA' },
                    { plan: 'PRO', rate: 97.1, color: '#C9FF00' },
                ].map(p => (
                    <div key={p.plan} style={{ marginBottom: 20 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                            <span style={{ fontSize: 14, color: '#888', fontWeight: 600 }}>{p.plan}</span>
                            <span style={{ fontSize: 14, fontWeight: 700, color: p.color }}>{p.rate}%</span>
                        </div>
                        <div style={{ height: 8, background: '#1a1a1a', borderRadius: 4 }}>
                            <div style={{ height: '100%', width: `${p.rate}%`, background: p.color, borderRadius: 4, boxShadow: `0 0 12px ${p.color}40` }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
