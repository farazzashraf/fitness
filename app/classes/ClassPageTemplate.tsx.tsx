'use client'

import Link from 'next/link'
import { useState } from 'react'

export interface ClassData {
  id: string
  name: string
  tagline: string
  category: string
  instructor: { name: string; bio: string; initials: string; classes: number; rating: number }
  duration: string
  level: string
  calories: string
  emoji: string
  accentColor: string
  description: string
  benefits: string[]
  schedule: { day: string; time: string; spots: number }[]
  videos: { title: string; duration: string; locked: boolean }[]
  reviews: { name: string; initials: string; rating: number; body: string; plan: string }[]
}

const NAV_ITEMS = ['Classes', 'Pricing', 'About', 'Blog']

function ClassNav() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <>
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: menuOpen ? 'rgba(8,8,8,0.99)' : 'rgba(8,8,8,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #1a1a1a', padding: '0 5%' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
          <Link href="/" onClick={() => setMenuOpen(false)} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 36, height: 36, background: 'var(--accent)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="font-display" style={{ color: '#000', fontSize: 20 }}>A</span>
            </div>
            <span className="font-display" style={{ fontSize: 28, letterSpacing: 4, color: '#fff' }}>APEX</span>
          </Link>
          <div className="nav-links" style={{ gap: 40, alignItems: 'center' }}>
            {NAV_ITEMS.map(item => (
              <Link key={item} href={`/${item.toLowerCase()}`} style={{ color: item === 'Classes' ? 'var(--accent)' : '#aaa', textDecoration: 'none', fontSize: 14, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={e => (e.currentTarget.style.color = item === 'Classes' ? 'var(--accent)' : '#aaa')}
              >{item}</Link>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Link href="/login" className="nav-links" style={{ color: '#aaa', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>Log In</Link>
            <Link href="/register" style={{ background: 'var(--accent)', color: '#000', padding: '10px 20px', borderRadius: 8, textDecoration: 'none', fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap' }}>Join Now</Link>
            <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: '1px solid #333', borderRadius: 8, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexDirection: 'column', gap: 5, padding: 0 }}>
              <span style={{ display: 'block', width: 18, height: 2, background: menuOpen ? 'var(--accent)' : '#fff', borderRadius: 2, transition: 'all 0.25s', transform: menuOpen ? 'rotate(45deg) translate(3px, 3px)' : 'none' }} />
              <span style={{ display: 'block', width: 18, height: 2, background: menuOpen ? 'var(--accent)' : '#fff', borderRadius: 2, transition: 'all 0.25s', opacity: menuOpen ? 0 : 1 }} />
              <span style={{ display: 'block', width: 18, height: 2, background: menuOpen ? 'var(--accent)' : '#fff', borderRadius: 2, transition: 'all 0.25s', transform: menuOpen ? 'rotate(-45deg) translate(3px, -3px)' : 'none' }} />
            </button>
          </div>
        </div>
      </nav>
      <div style={{
        display: menuOpen ? 'flex' : 'none',
        flexDirection: 'column',
        position: 'fixed', top: 72, left: 0, right: 0, zIndex: 200,
        background: 'rgba(8,8,8,0.99)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid #1a1a1a',
        padding: '12px 24px 20px',
        gap: 4,
        animation: menuOpen ? 'fadeIn 0.15s ease' : 'none',
      }}>
        {NAV_ITEMS.map(item => (
          <Link key={item} href={`/${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} style={{ display:'block',padding:'14px 12px',borderRadius:10,fontSize:14,fontWeight:700,letterSpacing:1,textTransform:'uppercase' as const,textDecoration:'none',borderBottom:'1px solid #111', color: item === 'Classes' ? 'var(--accent)' : '#ccc' }}>{item}</Link>
        ))}
        <Link href="/login" onClick={() => setMenuOpen(false)} style={{ display:'block',padding:'14px 12px',borderRadius:10,fontSize:14,fontWeight:700,letterSpacing:1,textTransform:'uppercase' as const,textDecoration:'none',borderBottom:'1px solid #111', color: '#666' }}>Log In</Link>
        <Link href="/register" onClick={() => setMenuOpen(false)} style={{ display:'block', padding:'14px 12px', borderRadius:10, fontSize:14, fontWeight:800, textDecoration:'none', color: 'var(--accent)' }}>Join Free →</Link>
      </div>
    </>
  )
}

export default function ClassPageTemplate({ cls }: { cls: ClassData }) {
  const [activeTab, setActiveTab] = useState<'about' | 'schedule' | 'videos' | 'reviews'>('about')

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', color: '#fff' }}>
      {/* Navbar */}
      <ClassNav />

      {/* Hero */}
      <section style={{
        paddingTop: 72, minHeight: '60vh',
        background: `linear-gradient(180deg, ${cls.accentColor}18 0%, #080808 100%)`,
        display: 'flex', alignItems: 'center',
        borderBottom: '1px solid #111', position: 'relative', overflow: 'hidden',
      }}>
        {/* BG glow */}
        <div style={{
          position: 'absolute', width: 500, height: 500, borderRadius: '50%',
          top: '-100px', right: '5%',
          background: `radial-gradient(circle, ${cls.accentColor}15 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '60px 5%', width: '100%', position: 'relative', zIndex: 1 }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24, fontSize: 13, color: '#555' }}>
            <Link href="/" style={{ color: '#555', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <span style={{ color: '#888' }}>Classes</span>
            <span>/</span>
            <span style={{ color: cls.accentColor }}>{cls.name}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 40 }}>
            <div style={{ maxWidth: 620 }}>
              {/* Tag */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: `${cls.accentColor}12`, border: `1px solid ${cls.accentColor}30`,
                borderRadius: 100, padding: '5px 16px', marginBottom: 20,
              }}>
                <span style={{ fontSize: 16 }}>{cls.emoji}</span>
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: cls.accentColor, textTransform: 'uppercase' }}>
                  {cls.category}
                </span>
              </div>

              <h1 className="font-display" style={{ fontSize: 'clamp(52px, 7vw, 90px)', letterSpacing: 2, lineHeight: 0.95, marginBottom: 20 }}>
                {cls.name.toUpperCase()}
              </h1>
              <p style={{ color: '#888', fontSize: 17, lineHeight: 1.7, marginBottom: 32, maxWidth: 500 }}>
                {cls.tagline}
              </p>

              {/* Meta pills */}
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 36 }}>
                {[
                  { icon: '⏱', label: cls.duration },
                  { icon: '🎯', label: cls.level },
                  { icon: '🔥', label: `${cls.calories} cal` },
                ].map(m => (
                  <div key={m.label} style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    background: '#111', border: '1px solid #222',
                    borderRadius: 100, padding: '7px 16px',
                    fontSize: 13, fontWeight: 600,
                  }}>
                    <span>{m.icon}</span>
                    <span style={{ color: '#ccc' }}>{m.label}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 12 }}>
                <Link href="/register" style={{
                  background: cls.accentColor, color: cls.accentColor === '#C9FF00' ? '#000' : '#fff',
                  padding: '14px 36px', borderRadius: 12, textDecoration: 'none',
                  fontSize: 14, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase',
                  display: 'inline-block', transition: 'all 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = `0 8px 28px ${cls.accentColor}40`}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                >
                  Join This Class →
                </Link>
                <button
                  onClick={() => setActiveTab('schedule')}
                  style={{
                    background: 'transparent', border: '1px solid #333', color: '#aaa',
                    padding: '14px 28px', borderRadius: 12,
                    fontSize: 14, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#555'; e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#333'; e.currentTarget.style.color = '#aaa' }}
                >
                  View Schedule
                </button>
              </div>
            </div>

            {/* Instructor card */}
            <div style={{
              background: '#0f0f0f', border: '1px solid #1e1e1e',
              borderRadius: 20, padding: '28px', minWidth: 260,
            }}>
              <div style={{ fontSize: 11, color: '#555', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>Lead Instructor</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                <div style={{
                  width: 52, height: 52, borderRadius: '50%',
                  background: `linear-gradient(135deg, ${cls.accentColor}, ${cls.accentColor}60)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16, fontWeight: 800, color: '#000', flexShrink: 0,
                }}>
                  {cls.instructor.initials}
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>{cls.instructor.name}</div>
                  <div style={{ color: cls.accentColor, fontSize: 12, marginTop: 2 }}>★ {cls.instructor.rating} rating</div>
                </div>
              </div>
              <p style={{ color: '#666', fontSize: 13, lineHeight: 1.7, marginBottom: 16 }}>{cls.instructor.bio}</p>
              <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: 16, fontSize: 12, color: '#555' }}>
                <span style={{ color: cls.accentColor, fontWeight: 700 }}>{cls.instructor.classes.toLocaleString()}</span> classes taught
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div style={{ borderBottom: '1px solid #111', padding: '0 5%', position: 'sticky', top: 72, background: 'rgba(8,8,8,0.97)', backdropFilter: 'blur(12px)', zIndex: 50 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', gap: 0 }}>
          {(['about', 'schedule', 'videos', 'reviews'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: 'transparent', border: 'none',
                borderBottom: `2px solid ${activeTab === tab ? cls.accentColor : 'transparent'}`,
                color: activeTab === tab ? '#fff' : '#555',
                padding: '18px 24px', fontSize: 14, fontWeight: 600,
                letterSpacing: 1, textTransform: 'capitalize',
                cursor: 'pointer', transition: 'all 0.2s',
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '60px 5%' }}>

        {/* About */}
        {activeTab === 'about' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60 }}>
            <div>
              <h2 className="font-display" style={{ fontSize: 40, letterSpacing: 2, marginBottom: 24 }}>ABOUT THIS CLASS</h2>
              <p style={{ color: '#888', lineHeight: 1.9, fontSize: 15, marginBottom: 32 }}>{cls.description}</p>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, color: '#ccc' }}>What you&apos;ll gain</h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
                {cls.benefits.map(b => (
                  <li key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: '50%', flexShrink: 0, marginTop: 1,
                      background: `${cls.accentColor}15`, border: `1px solid ${cls.accentColor}40`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 11, color: cls.accentColor, fontWeight: 800,
                    }}>✓</div>
                    <span style={{ color: '#aaa', fontSize: 15 }}>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA card */}
            <div>
              <div style={{
                background: '#0f0f0f', border: '1px solid #1e1e1e',
                borderRadius: 24, padding: 32, position: 'sticky', top: 140,
              }}>
                <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Ready to start?</div>
                <p style={{ color: '#666', fontSize: 14, lineHeight: 1.7, marginBottom: 28 }}>
                  Join thousands of members already training with {cls.instructor.name.split(' ')[0]}.
                  First 14 days free on all paid plans.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <Link href="/register?plan=elite" style={{
                    background: cls.accentColor, color: cls.accentColor === '#C9FF00' ? '#000' : '#fff',
                    padding: '14px 0', borderRadius: 12, textDecoration: 'none',
                    fontSize: 14, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase',
                    textAlign: 'center', transition: 'all 0.2s', display: 'block',
                  }}>
                    Start Free Trial →
                  </Link>
                  <Link href="/pricing" style={{
                    background: 'transparent', border: '1px solid #222', color: '#666',
                    padding: '14px 0', borderRadius: 12, textDecoration: 'none',
                    fontSize: 14, fontWeight: 600, textAlign: 'center', display: 'block',
                    transition: 'all 0.2s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#333'; e.currentTarget.style.color = '#aaa' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#222'; e.currentTarget.style.color = '#666' }}
                  >
                    View All Plans
                  </Link>
                </div>
                <p style={{ fontSize: 12, color: '#444', textAlign: 'center', marginTop: 16 }}>No credit card required</p>
              </div>
            </div>
          </div>
        )}

        {/* Schedule */}
        {activeTab === 'schedule' && (
          <div style={{ maxWidth: 700 }}>
            <h2 className="font-display" style={{ fontSize: 40, letterSpacing: 2, marginBottom: 32 }}>WEEKLY SCHEDULE</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {cls.schedule.map((s, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  background: '#0f0f0f', border: '1px solid #1a1a1a',
                  borderRadius: 16, padding: '20px 24px', flexWrap: 'wrap', gap: 12,
                }}>
                  <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: cls.accentColor, minWidth: 80 }}>{s.day}</div>
                    <div style={{ fontSize: 15, color: '#ccc' }}>{s.time}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 13, color: s.spots < 5 ? '#F59E0B' : '#555' }}>
                      {s.spots} spots left
                    </span>
                    <Link href="/register" style={{
                      background: s.spots === 0 ? '#1a1a1a' : `${cls.accentColor}15`,
                      border: `1px solid ${s.spots === 0 ? '#222' : `${cls.accentColor}40`}`,
                      color: s.spots === 0 ? '#444' : cls.accentColor,
                      padding: '8px 20px', borderRadius: 8, textDecoration: 'none',
                      fontSize: 13, fontWeight: 700, pointerEvents: s.spots === 0 ? 'none' : 'auto',
                    }}>
                      {s.spots === 0 ? 'Full' : 'Book →'}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Videos */}
        {activeTab === 'videos' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
              <h2 className="font-display" style={{ fontSize: 40, letterSpacing: 2 }}>VIDEO LIBRARY</h2>
              <p style={{ color: '#555', fontSize: 13 }}>PRO & ELITE only — <Link href="/pricing" style={{ color: cls.accentColor }}>upgrade to unlock</Link></p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
              {cls.videos.map((v, i) => (
                <div key={i} style={{
                  background: '#0f0f0f', border: '1px solid #1a1a1a',
                  borderRadius: 16, overflow: 'hidden',
                  opacity: v.locked ? 0.6 : 1, cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { if (!v.locked) { e.currentTarget.style.borderColor = '#333'; e.currentTarget.style.transform = 'translateY(-3px)' } }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#1a1a1a'; e.currentTarget.style.transform = 'none' }}
                >
                  {/* Thumbnail */}
                  <div style={{
                    height: 140, background: `linear-gradient(135deg, ${cls.accentColor}20, #111)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    position: 'relative',
                  }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: '50%',
                      background: v.locked ? 'rgba(255,255,255,0.05)' : `${cls.accentColor}20`,
                      border: `2px solid ${v.locked ? '#333' : cls.accentColor}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <span style={{ fontSize: 20 }}>{v.locked ? '🔒' : '▶'}</span>
                    </div>
                    <div style={{ position: 'absolute', bottom: 10, right: 12, fontSize: 12, color: '#555', background: '#000', padding: '2px 8px', borderRadius: 4 }}>
                      {v.duration}
                    </div>
                  </div>
                  <div style={{ padding: '16px 18px' }}>
                    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{v.title}</div>
                    {v.locked && (
                      <div style={{ fontSize: 12, color: '#555' }}>Upgrade to PRO to unlock</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews */}
        {activeTab === 'reviews' && (
          <div style={{ maxWidth: 800 }}>
            <h2 className="font-display" style={{ fontSize: 40, letterSpacing: 2, marginBottom: 32 }}>MEMBER REVIEWS</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {cls.reviews.map((r, i) => (
                <div key={i} style={{
                  background: '#0f0f0f', border: '1px solid #1a1a1a',
                  borderRadius: 20, padding: 28,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: '50%',
                        background: `linear-gradient(135deg, ${cls.accentColor}, ${cls.accentColor}60)`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 13, fontWeight: 800, color: '#000',
                      }}>{r.initials}</div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14 }}>{r.name}</div>
                        <div style={{ fontSize: 11, color: '#555', marginTop: 2 }}>{r.plan} Member</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 2 }}>
                      {Array(r.rating).fill(0).map((_, j) => (
                        <span key={j} style={{ color: cls.accentColor, fontSize: 14 }}>★</span>
                      ))}
                    </div>
                  </div>
                  <p style={{ color: '#888', fontSize: 14, lineHeight: 1.8, fontStyle: 'italic' }}>&ldquo;{r.body}&rdquo;</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}