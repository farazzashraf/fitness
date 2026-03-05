import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts'
import { StatCard } from './StatCard'
import { CustomTooltip } from './CustomTooltip'
import { CustomerRows } from './CustomerRows'
import { revenueData, planDistribution, classAttendance, customers } from '../data'

export function OverviewTab() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14 }}>
                <StatCard label="Total Members" value="12,400" sub="vs last month" trend="+3.2%" />
                <StatCard label="Monthly Revenue" value="₹4.78L" sub="vs last month" trend="+7.4%" color="#A78BFA" />
                <StatCard label="Active Subscriptions" value="8,200" sub="PRO + ELITE" trend="+5.1%" color="#60A5FA" />
                <StatCard label="Churn Rate" value="2.2%" sub="vs last month" trend="-0.5%" color="#F87171" />
            </div>

            <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 16, padding: '24px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 10 }}>
                    <div>
                        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Revenue & Member Growth</div>
                        <div style={{ fontSize: 12, color: '#555' }}>Last 9 months</div>
                    </div>
                    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                        {[{ color: 'var(--accent)', label: 'Revenue' }, { color: '#60A5FA', label: 'Members' }].map(l => (
                            <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <div style={{ width: 10, height: 10, borderRadius: 2, background: l.color }} />
                                <span style={{ fontSize: 12, color: '#666' }}>{l.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                    <AreaChart data={revenueData}>
                        <defs>
                            <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#C9FF00" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#C9FF00" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="memGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.15} />
                                <stop offset="95%" stopColor="#60A5FA" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
                        <XAxis dataKey="month" tick={{ fill: '#555', fontSize: 11 }} axisLine={false} tickLine={false} />
                        <YAxis yAxisId="rev" tick={{ fill: '#555', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} width={46} />
                        <YAxis yAxisId="mem" orientation="right" tick={{ fill: '#555', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 1000).toFixed(1)}k`} width={38} />
                        <Tooltip content={<CustomTooltip />} />
                        <Area yAxisId="rev" type="monotone" dataKey="revenue" name="Revenue" stroke="#C9FF00" strokeWidth={2} fill="url(#revGrad)" dot={false} />
                        <Area yAxisId="mem" type="monotone" dataKey="members" name="Members" stroke="#60A5FA" strokeWidth={2} fill="url(#memGrad)" dot={false} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="admin-grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 16, padding: '24px 20px' }}>
                    <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Plan Distribution</div>
                    <div style={{ fontSize: 12, color: '#555', marginBottom: 20 }}>12,400 total members</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
                        <PieChart width={130} height={130}>
                            <Pie data={planDistribution} cx={60} cy={60} innerRadius={40} outerRadius={60} dataKey="value" strokeWidth={0}>
                                {planDistribution.map((e, i) => <Cell key={i} fill={e.color} />)}
                            </Pie>
                        </PieChart>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {planDistribution.map(p => (
                                <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <div style={{ width: 10, height: 10, borderRadius: 2, background: p.color, flexShrink: 0 }} />
                                    <div>
                                        <div style={{ fontSize: 13, fontWeight: 600 }}>{p.name}</div>
                                        <div style={{ fontSize: 11, color: '#555' }}>{p.value.toLocaleString()} members</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 16, padding: '24px 20px' }}>
                    <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Class Attendance</div>
                    <div style={{ fontSize: 12, color: '#555', marginBottom: 20 }}>Sessions this month</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {classAttendance.map(c => (
                            <div key={c.name}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                    <span style={{ fontSize: 13, color: '#aaa' }}>{c.name}</span>
                                    <span style={{ fontSize: 13, fontWeight: 600, color: c.color }}>{c.sessions.toLocaleString()}</span>
                                </div>
                                <div style={{ height: 4, background: '#1a1a1a', borderRadius: 2 }}>
                                    <div style={{ height: '100%', borderRadius: 2, background: c.color, width: `${(c.sessions / 4500) * 100}%`, transition: 'width 0.6s ease' }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 16, padding: '24px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div style={{ fontSize: 15, fontWeight: 700 }}>Recent Customers</div>
                    <span style={{ color: 'var(--accent)', fontSize: 13, cursor: 'pointer', fontWeight: 600 }}>View All →</span>
                </div>
                <CustomerRows customers={customers.slice(0, 5)} />
            </div>
        </div>
    )
}
