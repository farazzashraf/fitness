import { useState } from 'react'
import { useIsMobile } from '../utils'

export function AIAssistantTab() {
    const isMobile = useIsMobile()
    const [messages, setMessages] = useState([
        { role: 'assistant', text: "Hello! I'm your APEX Business Assistant. I've analyzed your Pro and Elite membership data from the last 30 days. How can I help you grow today?" }
    ])
    const [input, setInput] = useState('')

    const insights = [
        { title: 'Revenue Optimization', desc: 'Elite upgrades are up 15%. Consider a limited-time bonus for Pro members to upgrade.', icon: '💰' },
        { title: 'Engagement Insight', desc: 'Yoga classes have a 95% fill rate. Adding two more weekly slots could increase MRR by ₹40k.', icon: '📈' },
        { title: 'Churn Prediction', desc: '3 members are at risk due to inactivity. Sending an automated "We Miss You" perk is recommended.', icon: '⚠️' }
    ]

    const handleSend = () => {
        if (!input.trim()) return
        const newMsgs = [...messages, { role: 'user', text: input }]
        setMessages(newMsgs)
        setInput('')
        setTimeout(() => {
            setMessages([...newMsgs, { role: 'assistant', text: "That's a great question. Based on current trends, focusing on ELITE member retention is your highest ROI activity this week. Would you like a detailed churn forecast?" }])
        }, 1000)
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: isMobile ? 16 : 24,
            height: isMobile ? 'auto' : 'calc(100vh - 220px)',
            minHeight: isMobile ? '700px' : 600,
            paddingBottom: isMobile ? 40 : 0
        }}>
            {/* Insights Row */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 16
            }}>
                {insights.map(i => (
                    <div key={i.title} style={{ background: 'linear-gradient(135deg, #0f0f0f, #161616)', border: '1px solid #222', borderRadius: 16, padding: 20, position: 'relative', overflow: 'hidden' }}>
                        <div style={{ fontSize: 24, marginBottom: 12 }}>{i.icon}</div>
                        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6, color: 'var(--accent)' }}>{i.title}</div>
                        <div style={{ fontSize: 12, color: '#888', lineHeight: 1.5 }}>{i.desc}</div>
                        <div style={{ position: 'absolute', top: 0, right: 0, width: 60, height: 60, background: 'radial-gradient(circle at top right, rgba(201,255,0,0.05), transparent)', pointerEvents: 'none' }} />
                    </div>
                ))}
            </div>

            {/* Chat Area */}
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                background: '#0a0a0a',
                border: '1px solid #1a1a1a',
                borderRadius: 20,
                overflow: 'hidden',
                minHeight: isMobile ? '450px' : 'auto'
            }}>
                <div style={{ padding: '16px 20px', borderBottom: '1px solid #1a1a1a', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }} />
                    <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1 }}>AI ANALYTICS ENGINE</span>
                </div>

                <div style={{ flex: 1, padding: isMobile ? 12 : 20, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {messages.map((m, i) => (
                        <div key={i} style={{
                            alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                            maxWidth: '85%',
                            background: m.role === 'user' ? 'var(--accent)' : '#161616',
                            color: m.role === 'user' ? '#000' : '#ddd',
                            padding: '12px 16px',
                            borderRadius: m.role === 'user' ? '18px 18px 2px 18px' : '18px 18px 18px 2px',
                            fontSize: 14,
                            lineHeight: 1.5
                        }}>
                            {m.text}
                        </div>
                    ))}
                </div>

                <div style={{ padding: isMobile ? 12 : 16, borderTop: '1px solid #1a1a1a', display: 'flex', gap: 8 }}>
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSend()}
                        placeholder={isMobile ? "Ask..." : "Ask about your business..."}
                        style={{ flex: 1, background: '#111', border: '1px solid #222', borderRadius: 12, padding: '12px 16px', color: '#fff', outline: 'none', fontSize: 14 }}
                    />
                    <button
                        onClick={handleSend}
                        style={{
                            background: 'var(--accent)',
                            color: '#000',
                            border: 'none',
                            borderRadius: 12,
                            padding: isMobile ? '0 12px' : '0 20px',
                            fontWeight: 800,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: isMobile ? 16 : 13
                        }}
                    >
                        {isMobile ? '→' : 'SEND'}
                    </button>
                </div>
            </div>
        </div>
    )
}
