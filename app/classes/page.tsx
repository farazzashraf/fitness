'use client'

import { useState } from 'react'
import Link from 'next/link'

const classes = [
  {
    id: 'yoga',
    name: 'Power Yoga',
    category: 'Flexibility & Mind',
    instructor: 'Priya Sharma',
    duration: '60 min',
    level: 'All Levels',
    calories: '300–400',
    tag: 'Most Popular',
    emoji: '🧘',
    color: '#7C3AED',
    description: 'Deep stretches, breathwork, and mindfulness that rebuild your body from the inside out.',
    sessions: '14 sessions/week',
    members: '3,840 enrolled',
  },
  {
    id: 'hiit',
    name: 'HIIT Burn',
    category: 'Cardio & Endurance',
    instructor: 'Marcus Cole',
    duration: '45 min',
    level: 'Intermediate',
    calories: '500–700',
    tag: 'High Intensity',
    emoji: '🔥',
    color: '#EA580C',
    description: 'Max-effort intervals that torch fat and skyrocket your metabolism for hours after class.',
    sessions: '18 sessions/week',
    members: '4,210 enrolled',
  },
  {
    id: 'pilates',
    name: 'Core Pilates',
    category: 'Strength & Posture',
    instructor: 'Sofia Reyes',
    duration: '50 min',
    level: 'Beginner',
    calories: '250–350',
    tag: 'Beginner Friendly',
    emoji: '⚡',
    color: '#0891B2',
    description: 'Precision movements that sculpt your core, improve posture, and build lean muscle.',
    sessions: '12 sessions/week',
    members: '2,980 enrolled',
  },
  {
    id: 'strength',
    name: 'Iron Strength',
    category: 'Weight Training',
    instructor: 'Jake Monroe',
    duration: '75 min',
    level: 'Advanced',
    calories: '400–600',
    tag: 'Build Muscle',
    emoji: '💪',
    color: '#C9FF00',
    description: 'Progressive overload training designed to maximize muscle gain and raw strength.',
    sessions: '10 sessions/week',
    members: '3,120 enrolled',
  },
]

const levels = ['All', 'Beginner', 'Intermediate', 'Advanced', 'All Levels']

const NAV_ITEMS = ['Classes', 'Pricing', 'About', 'Blog']

function MobileNav({ active }: { active: string }) {
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
              <Link key={item} href={`/${item.toLowerCase()}`} style={{ color: item === active ? 'var(--accent)' : '#aaa', textDecoration: 'none', fontSize: 14, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={e => (e.currentTarget.style.color = item === active ? 'var(--accent)' : '#aaa')}
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
          <Link key={item} href={`/${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} style={{ display:'block',padding:'14px 12px',borderRadius:10,fontSize:14,fontWeight:700,letterSpacing:1,textTransform:'uppercase' as const,textDecoration:'none',borderBottom:'1px solid #111', color: item === active ? 'var(--accent)' : '#ccc' }}>{item}</Link>
        ))}
        <Link href="/login" onClick={() => setMenuOpen(false)} style={{ display:'block',padding:'14px 12px',borderRadius:10,fontSize:14,fontWeight:700,letterSpacing:1,textTransform:'uppercase' as const,textDecoration:'none',borderBottom:'1px solid #111', color: '#666' }}>Log In</Link>
        <Link href="/register" onClick={() => setMenuOpen(false)} style={{ display:'block', padding:'14px 12px', borderRadius:10, fontSize:14, fontWeight:800, textDecoration:'none', color: 'var(--accent)' }}>Join Free →</Link>
      </div>
    </>
  )
}

export default function ClassesPage() {
  const [hovered, setHovered] = useState<string | null>(null)
  const [filter, setFilter] = useState('All')

  const filtered = filter === 'All' ? classes : classes.filter(c => c.level === filter)

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', color: '#fff' }}>
      {/* Navbar */}
      <MobileNav active="Classes" />

      {/* Hero */}
      <section style={{
        paddingTop: 72, padding: '140px 5% 80px',
        position: 'relative', overflow: 'hidden',
        borderBottom: '1px solid #111',
      }}>
        <div style={{
          position: 'absolute', width: 600, height: 400, borderRadius: '50%',
          top: 0, left: '50%', transform: 'translateX(-50%)',
          background: 'radial-gradient(ellipse, rgba(201,255,0,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(201,255,0,0.08)', border: '1px solid rgba(201,255,0,0.2)',
                borderRadius: 100, padding: '5px 16px', marginBottom: 20,
              }}>
                <span style={{ color: 'var(--accent)', fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>
                  4 Disciplines
                </span>
              </div>
              <h1 className="font-display" style={{
                fontSize: 'clamp(56px, 8vw, 100px)',
                letterSpacing: 2, lineHeight: 0.95, marginBottom: 20,
              }}>
                ALL<br />
                <span style={{ color: 'var(--accent)' }}>CLASSES</span>
              </h1>
              <p style={{ color: '#666', fontSize: 16, maxWidth: 480, lineHeight: 1.7 }}>
                Choose your discipline. Every class is built around real science, expert instruction,
                and a community that pushes you further than you'd go alone.
              </p>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: 32 }}>
              {[
                { val: '200+', label: 'Videos' },
                { val: '54', label: 'Live/week' },
                { val: '4', label: 'Disciplines' },
              ].map(s => (
                <div key={s.label} style={{ textAlign: 'center' }}>
                  <div className="font-display" style={{ fontSize: 44, color: 'var(--accent)', letterSpacing: 2 }}>{s.val}</div>
                  <div style={{ fontSize: 12, color: '#555', letterSpacing: 2, textTransform: 'uppercase', marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filter + Grid */}
      <section style={{ padding: '60px 5%', maxWidth: 1280, margin: '0 auto' }}>
        {/* Level filter */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 40, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 13, color: '#555', alignSelf: 'center', marginRight: 4 }}>Filter:</span>
          {levels.map(l => (
            <button key={l} onClick={() => setFilter(l)} style={{
              background: filter === l ? 'rgba(201,255,0,0.1)' : 'transparent',
              border: `1px solid ${filter === l ? 'rgba(201,255,0,0.35)' : '#222'}`,
              color: filter === l ? 'var(--accent)' : '#555',
              borderRadius: 100, padding: '8px 18px',
              fontSize: 13, fontWeight: 700, cursor: 'pointer',
              transition: 'all 0.15s',
            }}>
              {l}
            </button>
          ))}
        </div>

        {/* Class cards — large format */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {filtered.map((cls, i) => (
            <Link key={cls.id} href={`/classes/${cls.id}`} style={{ textDecoration: 'none' }}>
              <div
                onMouseEnter={() => setHovered(cls.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: '#0f0f0f',
                  border: `1px solid ${hovered === cls.id ? cls.color + '40' : '#1a1a1a'}`,
                  borderRadius: 20, padding: '28px 32px',
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr auto',
                  gap: 28, alignItems: 'center',
                  transition: 'all 0.25s',
                  transform: hovered === cls.id ? 'translateX(6px)' : 'translateX(0)',
                  boxShadow: hovered === cls.id ? `0 12px 40px ${cls.color}15` : 'none',
                  cursor: 'pointer', position: 'relative', overflow: 'hidden',
                }}
              >
                {/* Glow */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: `linear-gradient(90deg, ${cls.color}06 0%, transparent 60%)`,
                  opacity: hovered === cls.id ? 1 : 0,
                  transition: 'opacity 0.3s', pointerEvents: 'none',
                }} />

                {/* Emoji */}
                <div style={{
                  width: 72, height: 72, borderRadius: 18, flexShrink: 0,
                  background: `${cls.color}12`, border: `1px solid ${cls.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 36, position: 'relative', zIndex: 1,
                }}>
                  {cls.emoji}
                </div>

                {/* Info */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <h2 className="font-display" style={{ fontSize: 32, letterSpacing: 1, margin: 0 }}>{cls.name}</h2>
                    <span style={{
                      fontSize: 10, fontWeight: 700, letterSpacing: 2,
                      color: cls.color, background: `${cls.color}15`,
                      border: `1px solid ${cls.color}35`,
                      borderRadius: 100, padding: '3px 10px', textTransform: 'uppercase',
                    }}>{cls.tag}</span>
                  </div>
                  <p style={{ color: '#777', fontSize: 14, lineHeight: 1.6, marginBottom: 16, maxWidth: 560 }}>
                    {cls.description}
                  </p>
                  <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                    {[
                      { icon: '👤', val: cls.instructor },
                      { icon: '⏱', val: cls.duration },
                      { icon: '🎯', val: cls.level },
                      { icon: '🔥', val: `${cls.calories} cal` },
                      { icon: '📅', val: cls.sessions },
                      { icon: '👥', val: cls.members },
                    ].map(m => (
                      <div key={m.val} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <span style={{ fontSize: 13 }}>{m.icon}</span>
                        <span style={{ fontSize: 12, color: '#666' }}>{m.val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Arrow CTA */}
                <div style={{ position: 'relative', zIndex: 1, textAlign: 'right' }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: '50%',
                    background: hovered === cls.id ? cls.color : '#1a1a1a',
                    border: `1px solid ${hovered === cls.id ? 'transparent' : '#333'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 18, transition: 'all 0.25s',
                    color: hovered === cls.id ? (cls.color === '#C9FF00' ? '#000' : '#fff') : '#555',
                    marginLeft: 'auto',
                  }}>→</div>
                  <div style={{ fontSize: 11, color: '#444', marginTop: 8, letterSpacing: 1 }}>View Class</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#444' }}>
            No classes match this filter.
          </div>
        )}
      </section>

      {/* Bottom CTA */}
      <section style={{ padding: '60px 5% 100px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{
            background: 'var(--accent)', borderRadius: 24, padding: '48px 56px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: 24, position: 'relative', overflow: 'hidden',
          }}>
            <div className="font-display" style={{
              position: 'absolute', right: -20, top: '50%', transform: 'translateY(-50%)',
              fontSize: 160, color: 'rgba(0,0,0,0.06)', letterSpacing: 4,
              pointerEvents: 'none', userSelect: 'none',
            }}>APEX</div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 className="font-display" style={{ fontSize: 'clamp(32px, 4vw, 52px)', color: '#000', letterSpacing: 2, marginBottom: 8 }}>
                READY TO START?
              </h2>
              <p style={{ color: '#333', fontSize: 15 }}>14-day free trial. No credit card required.</p>
            </div>
            <Link href="/register" style={{
              background: '#000', color: 'var(--accent)',
              padding: '16px 40px', borderRadius: 12, textDecoration: 'none',
              fontSize: 14, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase',
              position: 'relative', zIndex: 1, transition: 'all 0.2s', display: 'inline-block',
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Join Free →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}