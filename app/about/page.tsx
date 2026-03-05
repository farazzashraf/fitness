'use client'

import { useState } from 'react'
import Link from 'next/link'

const NAV_LINKS = [['Classes', '/classes'], ['Pricing', '/pricing'], ['About', '/about'], ['Blog', '/blog']]

const team = [
  { name: 'Priya Sharma', role: 'Head of Yoga & Wellness', bio: '500-hr certified. Trained in Mysore. 9 years teaching. 3,000+ students transformed.', initials: 'PS', color: '#7C3AED', stat: '2,840 classes taught' },
  { name: 'Marcus Cole', role: 'Head of HIIT & Cardio', bio: 'Former D1 athlete. NSCA-certified. Built APEX\'s entire HIIT program from the ground up.', initials: 'MC', color: '#EA580C', stat: '3,210 classes taught' },
  { name: 'Sofia Reyes', role: 'Head of Pilates', bio: 'Balanced Body certified. Former professional dancer. Specialist in posture correction and rehab.', initials: 'SR', color: '#0891B2', stat: '2,190 classes taught' },
  { name: 'Jake Monroe', role: 'Head of Strength', bio: 'NSCA-CSCS. 11 years coaching. Competitive powerlifter. Coaches national-level athletes.', initials: 'JM', color: '#C9FF00', stat: '1,980 classes taught' },
  { name: 'Riya Nair', role: 'Co-Founder & CEO', bio: 'Ex-McKinsey. Fitness obsessed. Built APEX to bring world-class coaching to everyone in India.', initials: 'RN', color: '#F59E0B', stat: 'Founder' },
  { name: 'Aryan Mehta', role: 'Co-Founder & CTO', bio: 'Ex-Google engineer. Built the entire platform from scratch. Believes great tech should be invisible.', initials: 'AM', color: '#60A5FA', stat: 'Founder' },
]

const milestones = [
  { year: '2021', title: 'APEX Founded', desc: 'Riya and Aryan launched APEX from a small apartment in Bengaluru with 4 instructors and 200 beta members.' },
  { year: '2022', title: 'First 10,000 Members', desc: 'Crossed 10k members in under 18 months. Launched HIIT Burn and Iron Strength programs.' },
  { year: '2023', title: 'Live Classes Launch', desc: 'Introduced real-time live streaming. 500+ members joined the first ever live HIIT session.' },
  { year: '2024', title: 'AI Coaching Introduced', desc: 'ELITE members get AI-powered coaching Q&A. Over 50,000 coaching conversations in year one.' },
  { year: '2025', title: '12,400+ Members Strong', desc: 'Serving members across India. 98% satisfaction rate. Expanding to Southeast Asia in 2026.' },
]

function SharedNav({ active }: { active: string }) {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <>
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: menuOpen ? 'rgba(8,8,8,0.99)' : 'rgba(8,8,8,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #1a1a1a', padding: '0 5%' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }} onClick={() => setMenuOpen(false)}>
            <div style={{ width: 36, height: 36, background: 'var(--accent)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="font-display" style={{ color: '#000', fontSize: 20 }}>A</span>
            </div>
            <span className="font-display" style={{ fontSize: 28, letterSpacing: 4, color: '#fff' }}>APEX</span>
          </Link>
          <div className="nav-links" style={{ gap: 40, alignItems: 'center' }}>
            {NAV_LINKS.map(([label, href]) => (
              <Link key={label} href={href} style={{ color: label === active ? 'var(--accent)' : '#aaa', textDecoration: 'none', fontSize: 14, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={e => (e.currentTarget.style.color = label === active ? 'var(--accent)' : '#aaa')}
              >{label}</Link>
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
        {NAV_LINKS.map(([label, href]) => (
          <Link key={label} href={href} onClick={() => setMenuOpen(false)} style={{ display:'block',padding:'14px 12px',borderRadius:10,fontSize:14,fontWeight:700,letterSpacing:1,textTransform:'uppercase' as const,textDecoration:'none',borderBottom:'1px solid #111', color: label === active ? 'var(--accent)' : '#ccc' }}>{label}</Link>
        ))}
        <Link href="/login" onClick={() => setMenuOpen(false)} style={{ display:'block',padding:'14px 12px',borderRadius:10,fontSize:14,fontWeight:700,letterSpacing:1,textTransform:'uppercase' as const,textDecoration:'none',borderBottom:'1px solid #111', color: '#666' }}>Log In</Link>
        <Link href="/register" onClick={() => setMenuOpen(false)} style={{ display:'block', padding:'14px 12px', borderRadius:10, fontSize:14, fontWeight:800, textDecoration:'none', color: 'var(--accent)' }}>Join Free →</Link>
      </div>
    </>
  )
}

export default function AboutPage() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', color: '#fff' }}>
      <SharedNav active="About" />

      {/* Hero */}
      <section style={{ paddingTop: 72, padding: '140px 5% 100px', position: 'relative', overflow: 'hidden', borderBottom: '1px solid #111' }}>
        <div style={{ position: 'absolute', width: 700, height: 500, top: 0, left: '50%', transform: 'translateX(-50%)', background: 'radial-gradient(ellipse, rgba(201,255,0,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(201,255,0,0.08)', border: '1px solid rgba(201,255,0,0.2)', borderRadius: 100, padding: '5px 16px', marginBottom: 24 }}>
            <span style={{ color: 'var(--accent)', fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>Our Story</span>
          </div>
          <h1 className="font-display" style={{ fontSize: 'clamp(56px, 9vw, 110px)', letterSpacing: 2, lineHeight: 0.95, marginBottom: 28 }}>
            BUILT FOR<br /><span style={{ color: 'var(--accent)' }}>CHAMPIONS</span>
          </h1>
          <p style={{ color: '#666', fontSize: 18, maxWidth: 560, margin: '0 auto', lineHeight: 1.8 }}>
            APEX was born from a simple belief — world-class fitness coaching shouldn't be locked behind expensive gym memberships or geography. We're here to change that.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section style={{ padding: '100px 5%' }}>
        <div className='about-mission-grid' style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--accent)', fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase' }}>Our Mission</span>
            <h2 className="font-display" style={{ fontSize: 'clamp(36px, 5vw, 60px)', letterSpacing: 2, marginTop: 12, marginBottom: 28 }}>
              FITNESS WITHOUT<br />COMPROMISE
            </h2>
            <p style={{ color: '#777', fontSize: 16, lineHeight: 1.9, marginBottom: 20 }}>
              We built APEX because we were frustrated. Frustrated with gyms charging ₹5,000/month for equipment you never used. Frustrated with online content that was either too basic or too expensive.
            </p>
            <p style={{ color: '#777', fontSize: 16, lineHeight: 1.9 }}>
              So we hired the best instructors we could find, built a platform obsessed with quality, and priced it at a fraction of what it's worth. The result is APEX — and 12,400 members who train harder because of it.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { val: '12,400+', label: 'Members', color: 'var(--accent)' },
              { val: '98%', label: 'Satisfaction', color: '#A78BFA' },
              { val: '200+', label: 'Videos', color: '#60A5FA' },
              { val: '4', label: 'Disciplines', color: '#F59E0B' },
            ].map(s => (
              <div key={s.label} style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 20, padding: '28px 24px' }}>
                <div className="font-display" style={{ fontSize: 44, color: s.color, letterSpacing: 2, marginBottom: 6 }}>{s.val}</div>
                <div style={{ fontSize: 12, color: '#555', letterSpacing: 1, textTransform: 'uppercase' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '80px 5%', background: '#0a0a0a' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span style={{ color: 'var(--accent)', fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase' }}>What We Stand For</span>
            <h2 className="font-display" style={{ fontSize: 'clamp(36px, 5vw, 56px)', letterSpacing: 2, marginTop: 12 }}>OUR VALUES</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {[
              { icon: '🎯', title: 'Results First', desc: 'Every class, program, and feature is built around one question: does it get results? If it doesn\'t, we cut it.' },
              { icon: '🔓', title: 'Accessible to All', desc: 'World-class coaching shouldn\'t require a world-class budget. We price for impact, not profit maximization.' },
              { icon: '🧠', title: 'Science-Backed', desc: 'Our programs are built on exercise science, not trends. Periodization, progressive overload, recovery — all intentional.' },
              { icon: '🤝', title: 'Community Driven', desc: 'Fitness is better together. Live classes, forums, and events exist to build real connections between members.' },
            ].map(v => (
              <div key={v.title} style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 20, padding: 28 }}>
                <div style={{ fontSize: 32, marginBottom: 16 }}>{v.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{v.title}</h3>
                <p style={{ color: '#666', fontSize: 14, lineHeight: 1.8 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: '100px 5%' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <span style={{ color: 'var(--accent)', fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase' }}>How We Got Here</span>
            <h2 className="font-display" style={{ fontSize: 'clamp(36px, 5vw, 56px)', letterSpacing: 2, marginTop: 12 }}>OUR JOURNEY</h2>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: 55, top: 12, bottom: 12, width: 1, background: 'linear-gradient(to bottom, var(--accent), transparent)' }} />
            {milestones.map(m => (
              <div key={m.year} style={{ display: 'flex', gap: 28, paddingBottom: 36 }}>
                <div style={{ width: 110, flexShrink: 0, paddingTop: 4 }}>
                  <div style={{ background: 'var(--accent)', color: '#000', borderRadius: 100, padding: '4px 12px', fontSize: 12, fontWeight: 800, display: 'inline-block', position: 'relative', zIndex: 1 }}>
                    {m.year}
                  </div>
                </div>
                <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 16, padding: '20px 24px', flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{m.title}</div>
                  <p style={{ color: '#666', fontSize: 13, lineHeight: 1.7 }}>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: '80px 5% 100px', background: '#0a0a0a' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span style={{ color: 'var(--accent)', fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase' }}>The People Behind APEX</span>
            <h2 className="font-display" style={{ fontSize: 'clamp(36px, 5vw, 56px)', letterSpacing: 2, marginTop: 12 }}>MEET THE TEAM</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {team.map(member => (
              <div key={member.name} style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 20, padding: 28, transition: 'border-color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = member.color + '50')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = '#1a1a1a')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  <div style={{ width: 50, height: 50, borderRadius: '50%', flexShrink: 0, background: `linear-gradient(135deg, ${member.color}, ${member.color}60)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 800, color: ['#C9FF00', '#F59E0B'].includes(member.color) ? '#000' : '#fff' }}>
                    {member.initials}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{member.name}</div>
                    <div style={{ fontSize: 12, color: member.color, marginTop: 2, fontWeight: 600 }}>{member.role}</div>
                  </div>
                </div>
                <p style={{ color: '#666', fontSize: 13, lineHeight: 1.7, marginBottom: 16 }}>{member.bio}</p>
                <div style={{ paddingTop: 14, borderTop: '1px solid #1a1a1a', fontSize: 12, color: '#555' }}>
                  <span style={{ color: member.color, fontWeight: 700 }}>{member.stat}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '60px 5% 100px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ background: 'var(--accent)', borderRadius: 28, padding: '56px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div className="font-display" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: 180, color: 'rgba(0,0,0,0.05)', whiteSpace: 'nowrap', pointerEvents: 'none' }}>APEX</div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 className="font-display" style={{ fontSize: 'clamp(32px, 5vw, 56px)', color: '#000', letterSpacing: 2, marginBottom: 14 }}>JOIN THE MOVEMENT</h2>
              <p style={{ color: '#333', fontSize: 15, marginBottom: 32 }}>Start your 14-day free trial today. No credit card required.</p>
              <Link href="/register" style={{ background: '#000', color: 'var(--accent)', padding: '16px 48px', borderRadius: 12, textDecoration: 'none', fontSize: 14, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', display: 'inline-block' }}>
                Get Started Free →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}