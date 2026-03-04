'use client'

import { useState } from 'react'
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts'

// ─── Types ───────────────────────────────────────────────────────────────────
type Tab = 'overview' | 'customers' | 'subscriptions' | 'analytics' | 'churn'

interface Customer {
  id: string
  name: string
  email: string
  plan: 'FREE' | 'PRO' | 'ELITE'
  joined: string
  lastActive: string
  status: 'active' | 'churned' | 'at-risk'
  classes: number
  spend: number
  initials: string
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const revenueData = [
  { month: 'Jul', revenue: 284000, members: 9800 },
  { month: 'Aug', revenue: 312000, members: 10200 },
  { month: 'Sep', revenue: 298000, members: 10600 },
  { month: 'Oct', revenue: 341000, members: 11100 },
  { month: 'Nov', revenue: 389000, members: 11700 },
  { month: 'Dec', revenue: 421000, members: 12100 },
  { month: 'Jan', revenue: 398000, members: 12000 },
  { month: 'Feb', revenue: 445000, members: 12200 },
  { month: 'Mar', revenue: 478000, members: 12400 },
]

const churnData = [
  { month: 'Jul', churn: 4.2, retention: 95.8 },
  { month: 'Aug', churn: 3.8, retention: 96.2 },
  { month: 'Sep', churn: 4.5, retention: 95.5 },
  { month: 'Oct', churn: 3.2, retention: 96.8 },
  { month: 'Nov', churn: 2.9, retention: 97.1 },
  { month: 'Dec', churn: 2.4, retention: 97.6 },
  { month: 'Jan', churn: 3.1, retention: 96.9 },
  { month: 'Feb', churn: 2.7, retention: 97.3 },
  { month: 'Mar', churn: 2.2, retention: 97.8 },
]

const classAttendance = [
  { name: 'Power Yoga', sessions: 3840, color: '#7C3AED' },
  { name: 'HIIT Burn', sessions: 4210, color: '#EA580C' },
  { name: 'Core Pilates', sessions: 2980, color: '#0891B2' },
  { name: 'Iron Strength', sessions: 3120, color: '#C9FF00' },
]

const planDistribution = [
  { name: 'FREE', value: 4200, color: '#333' },
  { name: 'PRO', value: 5800, color: '#C9FF00' },
  { name: 'ELITE', value: 2400, color: '#A78BFA' },
]

const trafficData = [
  { day: 'Mon', visits: 1240, signups: 48 },
  { day: 'Tue', visits: 1580, signups: 62 },
  { day: 'Wed', visits: 1320, signups: 51 },
  { day: 'Thu', visits: 1890, signups: 74 },
  { day: 'Fri', visits: 2100, signups: 89 },
  { day: 'Sat', visits: 2640, signups: 112 },
  { day: 'Sun', visits: 2280, signups: 96 },
]

const customers: Customer[] = [
  { id: 'C001', name: 'Aisha Patel', email: 'aisha@gmail.com', plan: 'ELITE', joined: '12 Aug 2024', lastActive: '2h ago', status: 'active', classes: 84, spend: 39992, initials: 'AP' },
  { id: 'C002', name: 'David Kim', email: 'david.k@outlook.com', plan: 'PRO', joined: '3 Mar 2024', lastActive: '1d ago', status: 'active', classes: 121, spend: 29988, initials: 'DK' },
  { id: 'C003', name: 'Lakshmi Reddy', email: 'lakshmi.r@gmail.com', plan: 'ELITE', joined: '19 Oct 2024', lastActive: '5h ago', status: 'active', classes: 56, spend: 24995, initials: 'LR' },
  { id: 'C004', name: 'Rohan Mehta', email: 'rohan.m@gmail.com', plan: 'PRO', joined: '7 Jan 2025', lastActive: '3d ago', status: 'at-risk', classes: 12, spend: 4998, initials: 'RM' },
  { id: 'C005', name: 'Sneha Joshi', email: 'sneha.j@yahoo.com', plan: 'FREE', joined: '22 Feb 2025', lastActive: '12d ago', status: 'at-risk', classes: 3, spend: 0, initials: 'SJ' },
  { id: 'C006', name: 'Marcus Cole', email: 'marcus.c@gmail.com', plan: 'ELITE', joined: '1 Jun 2024', lastActive: 'Just now', status: 'active', classes: 198, spend: 44991, initials: 'MC' },
  { id: 'C007', name: 'Priya Nair', email: 'priya.n@gmail.com', plan: 'PRO', joined: '15 Nov 2024', lastActive: '6h ago', status: 'active', classes: 44, spend: 9996, initials: 'PN' },
  { id: 'C008', name: 'Arjun Kapoor', email: 'arjun.k@hotmail.com', plan: 'FREE', joined: '10 Dec 2024', lastActive: '21d ago', status: 'churned', classes: 1, spend: 0, initials: 'AK' },
  { id: 'C009', name: 'Sofia Reyes', email: 'sofia.r@gmail.com', plan: 'ELITE', joined: '28 Sep 2024', lastActive: '1h ago', status: 'active', classes: 77, spend: 29995, initials: 'SR' },
  { id: 'C010', name: 'Jake Monroe', email: 'jake.m@gmail.com', plan: 'PRO', joined: '4 Feb 2025', lastActive: '2d ago', status: 'active', classes: 28, spend: 4998, initials: 'JM' },
]

const atRiskReasons = [
  { customer: 'Rohan Mehta', reason: 'Login frequency dropped 80%', days: 3, plan: 'PRO' },
  { customer: 'Sneha Joshi', reason: 'No class attendance in 12 days', days: 12, plan: 'FREE' },
  { customer: 'Arjun Kapoor', reason: 'No activity in 3 weeks', days: 21, plan: 'FREE' },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────
const planColor = (plan: string) => {
  if (plan === 'ELITE') return '#A78BFA'
  if (plan === 'PRO') return '#C9FF00'
  return '#444'
}

const statusColor = (status: string) => {
  if (status === 'active') return '#C9FF00'
  if (status === 'at-risk') return '#F59E0B'
  return '#EF4444'
}

const statusBg = (status: string) => {
  if (status === 'active') return 'rgba(201,255,0,0.08)'
  if (status === 'at-risk') return 'rgba(245,158,11,0.08)'
  return 'rgba(239,68,68,0.08)'
}

const fmtINR = (n: number) => `₹${n.toLocaleString('en-IN')}`

// ─── Custom Tooltip ───────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: '#111', border: '1px solid #222',
      borderRadius: 10, padding: '10px 16px',
    }}>
      <p style={{ color: '#888', fontSize: 12, marginBottom: 6 }}>{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color || 'var(--accent)', fontSize: 13, fontWeight: 600 }}>
          {p.name}: {typeof p.value === 'number' && p.name.toLowerCase().includes('revenue')
            ? fmtINR(p.value) : p.value}
        </p>
      ))}
    </div>
  )
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({ active, setActive }: { active: Tab, setActive: (t: Tab) => void }) {
  const items: { id: Tab; label: string; icon: string }[] = [
    { id: 'overview', label: 'Overview', icon: '▦' },
    { id: 'customers', label: 'Customers', icon: '👥' },
    { id: 'subscriptions', label: 'Subscriptions', icon: '💳' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'churn', label: 'Churn Rate', icon: '⚠️' },
  ]

  return (
    <aside style={{
      width: 240, flexShrink: 0,
      background: '#080808',
      borderRight: '1px solid #1a1a1a',
      display: 'flex', flexDirection: 'column',
      padding: '28px 16px',
      minHeight: '100vh',
      position: 'sticky', top: 0, height: '100vh',
      overflowY: 'auto',
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 8px', marginBottom: 40 }}>
        <div style={{ width: 32, height: 32, background: 'var(--accent)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span className="font-display" style={{ color: '#000', fontSize: 18 }}>A</span>
        </div>
        <div>
          <span className="font-display" style={{ fontSize: 20, letterSpacing: 3, color: '#fff' }}>APEX</span>
          <div style={{ fontSize: 9, color: '#444', letterSpacing: 2, textTransform: 'uppercase', marginTop: -2 }}>Admin Panel</div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1 }}>
        <div style={{ fontSize: 10, color: '#333', letterSpacing: 2, textTransform: 'uppercase', padding: '0 8px', marginBottom: 12 }}>
          Dashboard
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '11px 14px', borderRadius: 10,
                background: active === item.id ? 'rgba(201,255,0,0.08)' : 'transparent',
                border: active === item.id ? '1px solid rgba(201,255,0,0.15)' : '1px solid transparent',
                color: active === item.id ? 'var(--accent)' : '#555',
                cursor: 'pointer', textAlign: 'left',
                fontSize: 14, fontWeight: active === item.id ? 700 : 500,
                transition: 'all 0.15s',
                width: '100%',
              }}
              onMouseEnter={e => { if (active !== item.id) e.currentTarget.style.color = '#aaa' }}
              onMouseLeave={e => { if (active !== item.id) e.currentTarget.style.color = '#555' }}
            >
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              {item.label}
              {item.id === 'churn' && (
                <span style={{
                  marginLeft: 'auto', background: 'rgba(239,68,68,0.15)',
                  border: '1px solid rgba(239,68,68,0.3)',
                  color: '#EF4444', fontSize: 10, fontWeight: 700,
                  borderRadius: 100, padding: '1px 7px',
                }}>3</span>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Bottom */}
      <div style={{ borderTop: '1px solid #111', paddingTop: 20, marginTop: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px' }}>
          <div style={{
            width: 34, height: 34, borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--accent), #666)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 800, color: '#000', flexShrink: 0,
          }}>AD</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#ddd' }}>Admin User</div>
            <div style={{ fontSize: 11, color: '#444' }}>admin@apexfit.com</div>
          </div>
        </div>
      </div>
    </aside>
  )
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, trend, color = 'var(--accent)' }: {
  label: string, value: string, sub: string, trend: string, color?: string
}) {
  const up = trend.startsWith('+')
  return (
    <div style={{
      background: '#0f0f0f', border: '1px solid #1a1a1a',
      borderRadius: 16, padding: '24px 28px',
      transition: 'border-color 0.2s',
    }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = '#2a2a2a')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = '#1a1a1a')}
    >
      <div style={{ fontSize: 12, color: '#555', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>{label}</div>
      <div className="font-display" style={{ fontSize: 40, letterSpacing: 1, color, lineHeight: 1, marginBottom: 8 }}>{value}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{
          fontSize: 12, fontWeight: 700,
          color: up ? '#4ade80' : '#f87171',
        }}>{trend}</span>
        <span style={{ fontSize: 12, color: '#444' }}>{sub}</span>
      </div>
    </div>
  )
}

// ─── Overview Tab ─────────────────────────────────────────────────────────────
function OverviewTab() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
        <StatCard label="Total Members" value="12,400" sub="vs last month" trend="+3.2%" />
        <StatCard label="Monthly Revenue" value="₹4.78L" sub="vs last month" trend="+7.4%" color="#A78BFA" />
        <StatCard label="Active Subscriptions" value="8,200" sub="PRO + ELITE" trend="+5.1%" color="#60A5FA" />
        <StatCard label="Churn Rate" value="2.2%" sub="vs last month" trend="-0.5%" color="#F87171" />
      </div>

      {/* Revenue + Members Chart */}
      <div style={{
        background: '#0f0f0f', border: '1px solid #1a1a1a',
        borderRadius: 16, padding: 28,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Revenue & Member Growth</div>
            <div style={{ fontSize: 13, color: '#555' }}>Last 9 months</div>
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            {[{ color: 'var(--accent)', label: 'Revenue' }, { color: '#60A5FA', label: 'Members' }].map(l => (
              <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: l.color }} />
                <span style={{ fontSize: 12, color: '#666' }}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={240}>
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
            <XAxis dataKey="month" tick={{ fill: '#555', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="rev" tick={{ fill: '#555', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
            <YAxis yAxisId="mem" orientation="right" tick={{ fill: '#555', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 1000).toFixed(1)}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Area yAxisId="rev" type="monotone" dataKey="revenue" name="Revenue" stroke="#C9FF00" strokeWidth={2} fill="url(#revGrad)" dot={false} />
            <Area yAxisId="mem" type="monotone" dataKey="members" name="Members" stroke="#60A5FA" strokeWidth={2} fill="url(#memGrad)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Plan Distribution */}
        <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 16, padding: 28 }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Plan Distribution</div>
          <div style={{ fontSize: 12, color: '#555', marginBottom: 24 }}>12,400 total members</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <PieChart width={140} height={140}>
              <Pie data={planDistribution} cx={65} cy={65} innerRadius={44} outerRadius={64} dataKey="value" strokeWidth={0}>
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

        {/* Class Attendance */}
        <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 16, padding: 28 }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Class Attendance</div>
          <div style={{ fontSize: 12, color: '#555', marginBottom: 20 }}>Sessions this month</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {classAttendance.map(c => (
              <div key={c.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 13, color: '#aaa' }}>{c.name}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: c.color }}>{c.sessions.toLocaleString()}</span>
                </div>
                <div style={{ height: 4, background: '#1a1a1a', borderRadius: 2 }}>
                  <div style={{
                    height: '100%', borderRadius: 2,
                    background: c.color,
                    width: `${(c.sessions / 4500) * 100}%`,
                    transition: 'width 0.6s ease',
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Customers */}
      <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 16, padding: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 15, fontWeight: 700 }}>Recent Customers</div>
          <span style={{ color: 'var(--accent)', fontSize: 13, cursor: 'pointer', fontWeight: 600 }}>View All →</span>
        </div>
        <CustomerRows customers={customers.slice(0, 5)} />
      </div>
    </div>
  )
}

// ─── Customer Rows (reusable) ─────────────────────────────────────────────────
function CustomerRows({ customers }: { customers: Customer[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {/* Header */}
      <div style={{
        display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr 1fr',
        padding: '0 0 12px', borderBottom: '1px solid #111',
        fontSize: 11, color: '#444', letterSpacing: 1, textTransform: 'uppercase',
      }}>
        <span>Customer</span>
        <span>Email</span>
        <span>Plan</span>
        <span>Status</span>
        <span>Classes</span>
        <span>Spend</span>
      </div>
      {customers.map((c) => (
        <div key={c.id} style={{
          display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr 1fr',
          padding: '14px 0', borderBottom: '1px solid #0d0d0d',
          alignItems: 'center', transition: 'background 0.15s',
          cursor: 'pointer', borderRadius: 8,
        }}
          onMouseEnter={e => (e.currentTarget.style.background = '#111')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
              background: `linear-gradient(135deg, ${planColor(c.plan)}, ${planColor(c.plan)}80)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 800, color: c.plan === 'FREE' ? '#aaa' : '#000',
            }}>{c.initials}</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{c.name}</div>
              <div style={{ fontSize: 11, color: '#555' }}>Joined {c.joined}</div>
            </div>
          </div>
          <span style={{ fontSize: 12, color: '#666' }}>{c.email}</span>
          <span style={{
            fontSize: 11, fontWeight: 700, letterSpacing: 1,
            color: planColor(c.plan),
            background: `${planColor(c.plan)}15`,
            border: `1px solid ${planColor(c.plan)}30`,
            borderRadius: 100, padding: '3px 10px',
            display: 'inline-block',
          }}>{c.plan}</span>
          <span style={{
            fontSize: 11, fontWeight: 600,
            color: statusColor(c.status),
            background: statusBg(c.status),
            border: `1px solid ${statusColor(c.status)}30`,
            borderRadius: 100, padding: '3px 10px',
            display: 'inline-block', textTransform: 'capitalize',
          }}>{c.status}</span>
          <span style={{ fontSize: 13, color: '#aaa' }}>{c.classes}</span>
          <span style={{ fontSize: 13, color: '#aaa' }}>{fmtINR(c.spend)}</span>
        </div>
      ))}
    </div>
  )
}

// ─── Customers Tab ────────────────────────────────────────────────────────────
function CustomersTab() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'ALL' | 'FREE' | 'PRO' | 'ELITE'>('ALL')

  const filtered = customers.filter(c => {
    const matchPlan = filter === 'ALL' || c.plan === filter
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
    return matchPlan && matchSearch
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>All Customers</h2>
          <p style={{ fontSize: 13, color: '#555' }}>{customers.length} total members</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search name or email..."
            style={{
              background: '#0f0f0f', border: '1px solid #222',
              borderRadius: 10, padding: '10px 16px',
              color: '#fff', fontSize: 13, outline: 'none', width: 220,
            }}
          />
          {(['ALL', 'FREE', 'PRO', 'ELITE'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              background: filter === f ? 'rgba(201,255,0,0.1)' : 'transparent',
              border: `1px solid ${filter === f ? 'rgba(201,255,0,0.3)' : '#222'}`,
              color: filter === f ? 'var(--accent)' : '#555',
              borderRadius: 8, padding: '8px 14px', fontSize: 12,
              fontWeight: 700, letterSpacing: 1, cursor: 'pointer',
              transition: 'all 0.15s',
            }}>{f}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 16, padding: 28 }}>
        <CustomerRows customers={filtered} />
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#444' }}>No customers found.</div>
        )}
      </div>
    </div>
  )
}

// ─── Subscriptions Tab ────────────────────────────────────────────────────────
function SubscriptionsTab() {
  const subscribers = customers.filter(c => c.plan !== 'FREE')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Subscriptions</h2>
        <p style={{ fontSize: 13, color: '#555' }}>Paid subscribers only</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14 }}>
        {[
          { label: 'PRO Subscribers', value: '5,800', color: 'var(--accent)' },
          { label: 'ELITE Subscribers', value: '2,400', color: '#A78BFA' },
          { label: 'MRR', value: '₹26.4L', color: '#60A5FA' },
          { label: 'Avg. LTV', value: '₹18,200', color: '#F59E0B' },
        ].map(s => (
          <div key={s.label} style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 14, padding: '20px 22px' }}>
            <div style={{ fontSize: 11, color: '#555', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>{s.label}</div>
            <div className="font-display" style={{ fontSize: 32, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 16, padding: 28 }}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 20 }}>Subscriber Details</div>
        <CustomerRows customers={subscribers} />
      </div>

      {/* Revenue by plan chart */}
      <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 16, padding: 28 }}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Monthly Recurring Revenue</div>
        <div style={{ fontSize: 12, color: '#555', marginBottom: 24 }}>Last 9 months</div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={revenueData} barSize={28}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: '#555', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#555', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="revenue" name="Revenue" fill="#C9FF00" radius={[6, 6, 0, 0]} fillOpacity={0.85} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

// ─── Analytics Tab ────────────────────────────────────────────────────────────
function AnalyticsTab() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Website Analytics</h2>
        <p style={{ fontSize: 13, color: '#555' }}>Traffic, signups, and engagement</p>
      </div>

      {/* Quick stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14 }}>
        {[
          { label: 'Weekly Visits', value: '13,050', trend: '+12%', color: 'var(--accent)' },
          { label: 'Weekly Signups', value: '532', trend: '+8%', color: '#60A5FA' },
          { label: 'Conversion Rate', value: '4.08%', trend: '+0.3%', color: '#4ADE80' },
          { label: 'Avg. Session', value: '6m 22s', trend: '+44s', color: '#F59E0B' },
          { label: 'Bounce Rate', value: '38.2%', trend: '-2.1%', color: '#A78BFA' },
        ].map(s => (
          <div key={s.label} style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 14, padding: '20px 22px' }}>
            <div style={{ fontSize: 11, color: '#555', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>{s.label}</div>
            <div className="font-display" style={{ fontSize: 30, color: s.color, marginBottom: 6 }}>{s.value}</div>
            <div style={{ fontSize: 11, color: s.trend.startsWith('+') ? '#4ade80' : '#f87171', fontWeight: 600 }}>{s.trend} vs last week</div>
          </div>
        ))}
      </div>

      {/* Daily traffic */}
      <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 16, padding: 28 }}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Daily Traffic & Signups</div>
        <div style={{ fontSize: 12, color: '#555', marginBottom: 24 }}>This week</div>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={trafficData} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" vertical={false} />
            <XAxis dataKey="day" tick={{ fill: '#555', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="v" tick={{ fill: '#555', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="s" orientation="right" tick={{ fill: '#555', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar yAxisId="v" dataKey="visits" name="Visits" fill="#1a1a1a" radius={[4, 4, 0, 0]} barSize={28} />
            <Bar yAxisId="s" dataKey="signups" name="Signups" fill="#C9FF00" radius={[4, 4, 0, 0]} barSize={12} fillOpacity={0.9} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Traffic sources */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 16, padding: 28 }}>
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

        <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 16, padding: 28 }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 20 }}>Top Pages</div>
          {[
            { page: '/ (Home)', visits: 4820 },
            { page: '/pricing', visits: 2340 },
            { page: '/classes/hiit', visits: 1890 },
            { page: '/classes/yoga', visits: 1620 },
            { page: '/register', visits: 1280 },
          ].map((p, i) => (
            <div key={p.page} style={{
              display: 'flex', justifyContent: 'space-between',
              padding: '10px 0', borderBottom: i < 4 ? '1px solid #111' : 'none',
            }}>
              <span style={{ fontSize: 13, color: '#888', fontFamily: 'monospace' }}>{p.page}</span>
              <span style={{ fontSize: 13, fontWeight: 600 }}>{p.visits.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Churn Tab ────────────────────────────────────────────────────────────────
function ChurnTab() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Churn Analysis</h2>
        <p style={{ fontSize: 13, color: '#555' }}>Monitor retention and at-risk members</p>
      </div>

      {/* Churn stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14 }}>
        {[
          { label: 'Current Churn Rate', value: '2.2%', note: 'Down from 2.7% last month', good: true },
          { label: 'Retention Rate', value: '97.8%', note: 'Up from 97.3% last month', good: true },
          { label: 'At-Risk Members', value: '3', note: 'Need immediate attention', good: false },
          { label: 'Avg. Member LTV', value: '₹18.2k', note: 'Based on 12mo avg.', good: true },
        ].map(s => (
          <div key={s.label} style={{ background: '#0f0f0f', border: `1px solid ${s.good ? '#1a1a1a' : 'rgba(239,68,68,0.2)'}`, borderRadius: 14, padding: '20px 22px' }}>
            <div style={{ fontSize: 11, color: '#555', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>{s.label}</div>
            <div className="font-display" style={{ fontSize: 36, color: s.good ? 'var(--accent)' : '#EF4444', marginBottom: 6 }}>{s.value}</div>
            <div style={{ fontSize: 11, color: '#555' }}>{s.note}</div>
          </div>
        ))}
      </div>

      {/* Churn chart */}
      <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 16, padding: 28 }}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Churn Rate Trend</div>
        <div style={{ fontSize: 12, color: '#555', marginBottom: 24 }}>Last 9 months — target: under 3%</div>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={churnData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
            <XAxis dataKey="month" tick={{ fill: '#555', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#555', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} domain={[0, 6]} />
            <Tooltip content={<CustomTooltip />} />
            {/* Target line */}
            <Line type="monotone" dataKey={() => 3} stroke="#333" strokeDasharray="4 4" dot={false} name="Target (3%)" />
            <Line type="monotone" dataKey="churn" name="Churn %" stroke="#EF4444" strokeWidth={2.5} dot={{ fill: '#EF4444', r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* At-risk alert */}
      <div style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 16, padding: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <span style={{ fontSize: 18 }}>⚠️</span>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#EF4444' }}>At-Risk Members</div>
            <div style={{ fontSize: 12, color: '#666' }}>These members show signs of disengagement</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {atRiskReasons.map(r => (
            <div key={r.customer} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: '#0a0a0a', border: '1px solid #1a1a1a',
              borderRadius: 12, padding: '16px 20px', flexWrap: 'wrap', gap: 12,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'rgba(239,68,68,0.15)',
                  border: '1px solid rgba(239,68,68,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14,
                }}>⚠</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{r.customer}</div>
                  <div style={{ fontSize: 12, color: '#666', marginTop: 2 }}>{r.reason}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{
                  fontSize: 11, color: planColor(r.plan),
                  background: `${planColor(r.plan)}15`,
                  border: `1px solid ${planColor(r.plan)}30`,
                  borderRadius: 100, padding: '3px 10px', fontWeight: 700,
                }}>{r.plan}</span>
                <span style={{ fontSize: 12, color: '#555' }}>Inactive {r.days}d</span>
                <button style={{
                  background: 'rgba(201,255,0,0.1)', border: '1px solid rgba(201,255,0,0.3)',
                  color: 'var(--accent)', borderRadius: 8, padding: '7px 16px',
                  fontSize: 12, fontWeight: 700, cursor: 'pointer',
                }}>
                  Send Re-engagement →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Retention by plan */}
      <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 16, padding: 28 }}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 20 }}>Retention by Plan</div>
        {[
          { plan: 'ELITE', rate: 98.4, color: '#A78BFA' },
          { plan: 'PRO', rate: 97.1, color: '#C9FF00' },
          { plan: 'FREE', rate: 71.2, color: '#444' },
        ].map(p => (
          <div key={p.plan} style={{ marginBottom: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 14, color: '#888', fontWeight: 600 }}>{p.plan}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: p.color }}>{p.rate}%</span>
            </div>
            <div style={{ height: 8, background: '#1a1a1a', borderRadius: 4 }}>
              <div style={{
                height: '100%', width: `${p.rate}%`,
                background: p.color, borderRadius: 4,
                boxShadow: `0 0 12px ${p.color}40`,
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main Admin Page ──────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('overview')

  const tabTitles: Record<Tab, string> = {
    overview: 'Dashboard Overview',
    customers: 'Customer Management',
    subscriptions: 'Subscription Management',
    analytics: 'Website Analytics',
    churn: 'Churn Analysis',
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#080808', color: '#fff' }}>
      <Sidebar active={activeTab} setActive={setActiveTab} />

      {/* Main content */}
      <main style={{ flex: 1, padding: '36px 40px', overflowY: 'auto', minWidth: 0 }}>
        {/* Top bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>{tabTitles[activeTab]}</h1>
            <p style={{ fontSize: 13, color: '#555' }}>
              {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{
              background: '#0f0f0f', border: '1px solid #1a1a1a',
              borderRadius: 10, padding: '8px 16px',
              fontSize: 12, color: '#555',
            }}>
              Last updated: just now
            </div>
            <div style={{
              background: 'rgba(201,255,0,0.1)', border: '1px solid rgba(201,255,0,0.2)',
              borderRadius: 10, padding: '8px 16px',
              fontSize: 12, color: 'var(--accent)', fontWeight: 700,
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
              Live
            </div>
          </div>
        </div>

        {/* Tab content */}
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'customers' && <CustomersTab />}
        {activeTab === 'subscriptions' && <SubscriptionsTab />}
        {activeTab === 'analytics' && <AnalyticsTab />}
        {activeTab === 'churn' && <ChurnTab />}
      </main>
    </div>
  )
}