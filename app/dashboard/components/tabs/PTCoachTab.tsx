import { UserData } from '../../types'
import { LockedOverlay } from '../LockedOverlay'

export function PTCoachTab({ bp, user }: { bp: 'mobile' | 'tablet' | 'desktop'; user: UserData }) {
    const isElite = user?.plan === 'ELITE';
    const isMobile = bp === 'mobile';
    const isTablet = bp === 'tablet';

    if (!isElite) return <LockedOverlay title="Personal Coach Chat" message="Get direct 1-on-1 access to your certified health and fitness trainer. Custom adjustments, form reviews, and personalized motivation." unlockTier="ELITE" ctaLink="/checkout?plan=elite" />

    return (
        <div style={{
            display: 'flex',
            flexDirection: isMobile || isTablet ? 'column' : 'row',
            gap: 24,
            height: isMobile ? 'auto' : 'calc(100vh - 200px)',
            minHeight: 600
        }}>

            {/* 1. Main Chat Area (Left/Main) */}
            <div style={{
                flex: 1,
                background: '#0f0f0f',
                border: '1px solid #1a1a1a',
                borderRadius: 20,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
            }}>
                {/* Chat Header */}
                <div style={{
                    padding: '16px 20px',
                    borderBottom: '1px solid #1a1a1a',
                    background: '#111',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), #666)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#000', fontSize: 12 }}>MC</div>
                        <div>
                            <h3 style={{ fontSize: 15, fontWeight: 700 }}>Coach Marcus Cole</h3>
                            <p style={{ fontSize: 11, color: '#4ade80', marginTop: 1 }}>Online</p>
                        </div>
                    </div>
                    <button style={{ background: '#1a1a1a', border: '1px solid #333', color: '#888', borderRadius: 8, padding: '6px 12px', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>Call Trainer</button>
                </div>

                {/* Chat Messages */}
                <div style={{
                    flex: 1,
                    padding: 20,
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 16
                }}>
                    <div style={{ alignSelf: 'center', background: '#111', padding: '6px 12px', borderRadius: 100, fontSize: 10, color: '#444', textTransform: 'uppercase', letterSpacing: 1 }}>Yesterday</div>

                    <div style={{ alignSelf: 'flex-start', background: '#1a1a1a', padding: 14, borderRadius: '16px 16px 16px 4px', maxWidth: '85%' }}>
                        <p style={{ fontSize: 13, lineHeight: 1.5, color: '#eee', margin: 0 }}>
                            Hey {user.name.split(' ')[0]}! I reviewed your squat form from the video you sent. Great depth! Let's work on keeping your chest up a bit more on the ascent. 🏋️‍♂️
                        </p>
                    </div>

                    <div style={{ alignSelf: 'flex-end', background: 'var(--accent)', padding: 14, borderRadius: '16px 16px 4px 16px', maxWidth: '85%' }}>
                        <p style={{ fontSize: 13, lineHeight: 1.5, color: '#000', margin: 0, fontWeight: 500 }}>
                            Thanks Marcus! I'll focus on that during tomorrow's leg session.
                        </p>
                    </div>

                    <div style={{ alignSelf: 'center', background: '#111', padding: '6px 12px', borderRadius: 100, fontSize: 10, color: '#444', textTransform: 'uppercase', letterSpacing: 1, marginTop: 8 }}>Today</div>

                    <div style={{ alignSelf: 'flex-start', background: '#1a1a1a', padding: 14, borderRadius: '16px 16px 16px 4px', maxWidth: '85%' }}>
                        <p style={{ fontSize: 13, lineHeight: 1.5, color: '#eee', margin: 0 }}>
                            Great plan. I've also updated your nutrition guide to include a bit more protein for recovery. Check it out in your resources!
                        </p>
                    </div>
                </div>

                {/* Chat Input */}
                <div style={{ padding: 16, borderTop: '1px solid #1a1a1a', display: 'flex', gap: 12, background: '#0a0a0a' }}>
                    <button style={{ background: '#111', border: '1px solid #222', borderRadius: 12, padding: '0 12px', color: '#666', cursor: 'pointer' }}>+</button>
                    <input type="text" placeholder="Message Coach Marcus..." style={{
                        flex: 1, background: '#111', border: '1px solid #222', padding: '12px 16px',
                        borderRadius: 12, color: '#fff', outline: 'none', fontSize: 14
                    }} />
                    <button style={{
                        background: 'var(--accent)', color: '#000', border: 'none', borderRadius: 12,
                        padding: '0 20px', fontWeight: 700, cursor: 'pointer', fontSize: 14
                    }}>Send</button>
                </div>
            </div>

            {/* 2. Trainer Toolbox (Right Sidebar) */}
            <div style={{
                width: isMobile || isTablet ? '100%' : 340,
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
                overflowY: isMobile || isTablet ? 'visible' : 'auto'
            }}>

                {/* Trainer Profile Card */}
                <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 16, padding: 20 }}>
                    <div style={{ display: 'flex', gap: 14, marginBottom: 16 }}>
                        <div style={{ width: 60, height: 60, borderRadius: 16, background: 'linear-gradient(135deg, var(--accent), #333)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <span style={{ fontSize: 24 }}>💪</span>
                        </div>
                        <div>
                            <h4 style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>Marcus Cole</h4>
                            <p style={{ fontSize: 12, color: '#666', marginTop: 4 }}>NASM Certified · CSCS</p>
                            <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
                                {['Strength', 'Hypertension', 'Rehab'].map(tag => (
                                    <span key={tag} style={{ fontSize: 9, background: '#111', border: '1px solid #222', padding: '2px 6px', borderRadius: 4, color: '#555' }}>{tag.toUpperCase()}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <p style={{ fontSize: 12, color: '#888', lineHeight: 1.6 }}>"Specializing in metabolic conditioning and biomechanics. I help elite athletes break plateaus."</p>
                </div>

                {/* Weekly Program Widget */}
                <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 16, padding: 20 }}>
                    <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 16, color: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span>📅</span> Weekly Focus
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {[
                            { day: 'Mon', focus: 'Heavy Squat + Core', done: true },
                            { day: 'Wed', focus: 'Upper Body Pull', done: true },
                            { day: 'Fri', focus: 'Metabolic Finisher', done: false },
                            { day: 'Sat', focus: 'Mobility Flow', done: false },
                        ].map(f => (
                            <div key={f.day} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{ width: 34, fontSize: 11, fontWeight: 800, color: f.done ? 'var(--accent)' : '#444' }}>{f.day.toUpperCase()}</div>
                                <div style={{ flex: 1, fontSize: 12, color: f.done ? '#eee' : '#555' }}>{f.focus}</div>
                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: f.done ? 'var(--accent)' : '#222' }} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Form Check Widget */}
                <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 16, padding: 20 }}>
                    <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 16, color: '#fff' }}>Form Reviews</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <div style={{ background: '#111', padding: 12, borderRadius: 12, border: '1px solid #222' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                <span style={{ fontSize: 11, fontWeight: 700 }}>Back Squat</span>
                                <span style={{ fontSize: 10, color: 'var(--accent)' }}>REVIEWED</span>
                            </div>
                            <p style={{ fontSize: 10, color: '#666', margin: 0 }}>Feedback: "Push through heels more."</p>
                        </div>
                        <div style={{ background: '#0a0a0a', padding: 12, borderRadius: 12, border: '1px dashed #222', textAlign: 'center' }}>
                            <span style={{ fontSize: 11, color: '#444' }}>Upload new form video...</span>
                        </div>
                    </div>
                </div>

                {/* Resource Library Snippet */}
                <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 16, padding: 20 }}>
                    <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 16, color: '#fff' }}>Trainer Resources</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {[
                            'Custom Macro Guide.pdf',
                            'Advanced Warm-up.mp4',
                            'Recovery Protocols.pdf'
                        ].map(r => (
                            <div key={r} style={{ padding: '8px 12px', background: '#111', borderRadius: 8, fontSize: 11, color: '#888', cursor: 'pointer', border: '1px solid transparent' }}
                                onMouseEnter={e => e.currentTarget.style.borderColor = '#333'}
                                onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}>
                                📎 {r}
                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </div>
    )
}
