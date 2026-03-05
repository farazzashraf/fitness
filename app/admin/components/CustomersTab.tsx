import { useState } from 'react'
import { CustomerRows } from './CustomerRows'
import { customers } from '../data'

export function CustomersTab() {
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState<'ALL' | 'PRO' | 'ELITE'>('ALL')

    const filtered = customers.filter(c => {
        const matchPlan = filter === 'ALL' || c.plan === (filter as any)
        const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase())
        return matchPlan && matchSearch
    })

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 14 }}>
                {/* <div>
                    <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>All Customers</h2>
                    <p style={{ fontSize: 13, color: '#555' }}>{customers.length} total members</p>
                </div> */}
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', flex: '1 1 auto', justifyContent: 'flex-start' }}>
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name or email..."
                        style={{ background: '#0f0f0f', border: '1px solid #222', borderRadius: 10, padding: '10px 16px', color: '#fff', fontSize: 13, outline: 'none', flex: '1 1 160px', minWidth: 0, maxWidth: 260 }}
                    />
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        {(['ALL', 'PRO', 'ELITE'] as const).map(f => (
                            <button key={f} onClick={() => setFilter(f)} style={{
                                background: filter === f ? 'rgba(201,255,0,0.1)' : 'transparent',
                                border: `1px solid ${filter === f ? 'rgba(201,255,0,0.3)' : '#222'}`,
                                color: filter === f ? 'var(--accent)' : '#555',
                                borderRadius: 8, padding: '8px 12px', fontSize: 12,
                                fontWeight: 700, letterSpacing: 1, cursor: 'pointer', transition: 'all 0.15s',
                            }}>{f}</button>
                        ))}
                    </div>
                </div>
            </div>
            <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 16, padding: '24px 20px' }}>
                <CustomerRows customers={filtered} />
                {filtered.length === 0 && <div style={{ textAlign: 'center', padding: '40px 0', color: '#444' }}>No customers found.</div>}
            </div>
        </div>
    )
}
