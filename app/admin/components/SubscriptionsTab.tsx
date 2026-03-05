import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'
import { CustomerRows } from './CustomerRows'
import { CustomTooltip } from './CustomTooltip'
import { customers, revenueData } from '../data'

export function SubscriptionsTab() {
    const subscribers = customers
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* <div>
                <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Subscriptions</h2>
                <p style={{ fontSize: 13, color: '#555' }}>Paid subscribers only</p>
            </div> */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 14 }}>
                {[
                    { label: 'PRO Subscribers', value: '5,800', color: 'var(--accent)' },
                    { label: 'ELITE Subscribers', value: '2,400', color: '#A78BFA' },
                    { label: 'MRR', value: '₹26.4L', color: '#60A5FA' },
                    { label: 'Avg. LTV', value: '₹18,200', color: '#F59E0B' },
                ].map(s => (
                    <div key={s.label} style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 14, padding: '20px 22px' }}>
                        <div style={{ fontSize: 11, color: '#555', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>{s.label}</div>
                        <div className="font-display" style={{ fontSize: 'clamp(24px, 3vw, 32px)', color: s.color }}>{s.value}</div>
                    </div>
                ))}
            </div>
            <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 16, padding: '24px 20px' }}>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 20 }}>Subscriber Details</div>
                <CustomerRows customers={subscribers} />
            </div>
            <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 16, padding: '24px 20px' }}>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Monthly Recurring Revenue</div>
                <div style={{ fontSize: 12, color: '#555', marginBottom: 24 }}>Last 9 months</div>
                <ResponsiveContainer width="100%" height={210}>
                    <BarChart data={revenueData} barSize={24}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" vertical={false} />
                        <XAxis dataKey="month" tick={{ fill: '#555', fontSize: 11 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: '#555', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} width={46} />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="revenue" name="Revenue" fill="#C9FF00" radius={[6, 6, 0, 0]} fillOpacity={0.85} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
