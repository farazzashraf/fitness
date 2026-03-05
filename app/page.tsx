'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

// ─── Types ───────────────────────────────────────────────────────────────────
interface ClassItem {
  id: string
  name: string
  category: string
  instructor: string
  duration: string
  level: string
  calories: string
  tag: string
  emoji: string
  color: string
  description: string
}

interface Testimonial {
  name: string
  role: string
  body: string
  rating: number
  initials: string
}

interface PricingTier {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  cta: string
  highlight: boolean
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const classes: ClassItem[] = [
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
  },
]

const testimonials: Testimonial[] = [
  {
    name: 'Aisha Patel',
    role: 'ELITE Member — 8 months',
    body: 'APEX completely transformed my body and mindset. The live classes feel like having a personal trainer. I\'ve lost 18kg and honestly never felt stronger.',
    rating: 5,
    initials: 'AP',
  },
  {
    name: 'David Kim',
    role: 'PRO Member — 1 year',
    body: 'The video library alone is worth every rupee. I train at 11pm after work and the quality rivals any in-person studio. Marcus\'s HIIT sessions are brutal in the best way.',
    rating: 5,
    initials: 'DK',
  },
  {
    name: 'Lakshmi Reddy',
    role: 'ELITE Member — 5 months',
    body: 'I was intimidated to start but the Beginner Pilates path eased me in perfectly. Now I\'m doing Iron Strength and I can\'t believe the results. Community here is everything.',
    rating: 5,
    initials: 'LR',
  },
]

const pricingTiers: PricingTier[] = [
  {
    name: 'FREE',
    price: '₹0',
    period: 'forever',
    description: 'Explore the APEX universe',
    features: [
      'Browse all class schedules',
      '3 free intro videos',
      'Community forum access',
      'Weekly newsletter',
    ],
    cta: 'Start Free',
    highlight: false,
  },
  {
    name: 'PRO',
    price: '₹2,499',
    period: '/month',
    description: 'Everything you need to transform',
    features: [
      'Full video library (200+ videos)',
      'Recorded class replays',
      'Progress tracking',
      'Nutrition guides',
      'Priority support',
    ],
    cta: 'Go PRO',
    highlight: true,
  },
  {
    name: 'ELITE',
    price: '₹4,999',
    period: '/month',
    description: 'The complete APEX experience',
    features: [
      'Everything in PRO',
      'Live real-time classes daily',
      'AI-powered coaching Q&A',
      '1-on-1 monthly check-in',
      'Exclusive member events',
      'Early access to new classes',
    ],
    cta: 'Go ELITE',
    highlight: false,
  },
]

const stats = [
  { value: '12,400+', label: 'Active Members' },
  { value: '200+', label: 'Video Classes' },
  { value: '4', label: 'Disciplines' },
  { value: '98%', label: 'Satisfaction Rate' },
]

const marqueeItems = [
  'POWER YOGA', '•', 'HIIT BURN', '•', 'CORE PILATES', '•', 'IRON STRENGTH', '•',
  'LIVE CLASSES', '•', 'AI COACHING', '•', 'REAL RESULTS', '•',
  'POWER YOGA', '•', 'HIIT BURN', '•', 'CORE PILATES', '•', 'IRON STRENGTH', '•',
  'LIVE CLASSES', '•', 'AI COACHING', '•', 'REAL RESULTS', '•',
]

// ─── Components ───────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route click
  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        transition: 'all 0.3s ease',
        background: scrolled || menuOpen ? 'rgba(8,8,8,0.97)' : 'transparent',
        backdropFilter: scrolled || menuOpen ? 'blur(12px)' : 'none',
        borderBottom: scrolled || menuOpen ? '1px solid #222' : '1px solid transparent',
        padding: '0 5%',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none' }} onClick={closeMenu}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 36, height: 36, background: 'var(--accent)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="font-display" style={{ color: '#000', fontSize: 20, lineHeight: 1 }}>A</span>
              </div>
              <span className="font-display" style={{ fontSize: 28, letterSpacing: 4, color: '#fff' }}>APEX</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="nav-links" style={{ gap: 40, alignItems: 'center' }}>
            {['Classes', 'Pricing', 'About', 'Blog'].map((item) => (
              <Link key={item} href={`/${item.toLowerCase()}`} style={{ color: '#aaa', textDecoration: 'none', fontSize: 14, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={e => (e.currentTarget.style.color = '#aaa')}
              >{item}</Link>
            ))}
          </div>

          {/* Right: CTA + hamburger */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Link href="/login" className="nav-links" style={{ color: '#aaa', textDecoration: 'none', fontSize: 14, fontWeight: 600, letterSpacing: 1 }}>Log In</Link>
            <Link href="/register" style={{ background: 'var(--accent)', color: '#000', padding: '10px 20px', borderRadius: 8, textDecoration: 'none', fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
              Join Now
            </Link>
            {/* Hamburger */}
            <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: '1px solid #333', borderRadius: 8, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexDirection: 'column', gap: 5, padding: 0 }}>
              <span style={{ display: 'block', width: 18, height: 2, background: menuOpen ? 'var(--accent)' : '#fff', borderRadius: 2, transition: 'all 0.25s', transform: menuOpen ? 'rotate(45deg) translate(3px, 3px)' : 'none' }} />
              <span style={{ display: 'block', width: 18, height: 2, background: menuOpen ? 'var(--accent)' : '#fff', borderRadius: 2, transition: 'all 0.25s', opacity: menuOpen ? 0 : 1 }} />
              <span style={{ display: 'block', width: 18, height: 2, background: menuOpen ? 'var(--accent)' : '#fff', borderRadius: 2, transition: 'all 0.25s', transform: menuOpen ? 'rotate(-45deg) translate(3px, -3px)' : 'none' }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
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
        {['Classes', 'Pricing', 'About', 'Blog'].map(item => (
          <Link key={item} href={`/${item.toLowerCase()}`} onClick={closeMenu} style={{ display:'block',padding:'14px 12px',borderRadius:10,fontSize:14,fontWeight:700,letterSpacing:1,textTransform:'uppercase' as const,textDecoration:'none',borderBottom:'1px solid #111', color: '#ccc' }}>{item}</Link>
        ))}
        <Link href="/login" onClick={closeMenu} style={{ display:'block',padding:'14px 12px',borderRadius:10,fontSize:14,fontWeight:700,letterSpacing:1,textTransform:'uppercase' as const,textDecoration:'none',borderBottom:'1px solid #111', color: '#666' }}>Log In</Link>
        <Link href="/register" onClick={closeMenu} style={{ display:'block', padding:'14px 12px', borderRadius:10, fontSize:14, fontWeight:800, textDecoration:'none', color: 'var(--accent)' }}>Join Free →</Link>
      </div>
    </>
  )
}

function HeroSection() {
  return (
    <section
      className="noise"
      style={{
        position: 'relative', minHeight: '100vh',
        display: 'flex', alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Grid Background */}
      <div className="hero-grid" style={{ position: 'absolute', inset: 0, opacity: 0.6 }} />

      {/* Gradient orbs */}
      <div style={{
        position: 'absolute', width: 600, height: 600,
        borderRadius: '50%', top: '-100px', right: '-100px',
        background: 'radial-gradient(circle, rgba(201,255,0,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', width: 400, height: 400,
        borderRadius: '50%', bottom: '10%', left: '-80px',
        background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(100px, 15vw, 140px) 5% clamp(60px, 8vw, 80px)', maxWidth: 1280, margin: '0 auto', width: '100%' }}>
        <div style={{ maxWidth: 800 }}>
          {/* Badge */}
          <div
            className="animate-fadeUp opacity-0"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(201,255,0,0.1)', border: '1px solid rgba(201,255,0,0.3)',
              borderRadius: 100, padding: '6px 16px', marginBottom: 32,
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} className="animate-pulse-glow" />
            <span style={{ color: 'var(--accent)', fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>
              Live Classes Available Now
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-display animate-fadeUp opacity-0 delay-100"
            style={{
              fontSize: 'clamp(72px, 12vw, 140px)',
              lineHeight: 0.9, letterSpacing: 2,
              margin: '0 0 24px', color: '#fff',
            }}
          >
            TRAIN
            <br />
            <span style={{ color: 'var(--accent)', WebkitTextStroke: '2px var(--accent)', WebkitTextFillColor: 'transparent' }}>
              HARDER.
            </span>
            <br />
            LIVE
            <br />
            BETTER.
          </h1>

          {/* Sub */}
          <p
            className="animate-fadeUp opacity-0 delay-200"
            style={{
              fontSize: 18, color: '#888', lineHeight: 1.7,
              maxWidth: 500, marginBottom: 48,
            }}
          >
            Premium fitness classes, expert instructors, and AI-powered coaching — all in one platform built to transform your body and your life.
          </p>

          {/* CTAs */}
          <div
            className="animate-fadeUp opacity-0 delay-300"
            style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}
          >
            <Link href="/pricing" style={{
              background: 'var(--accent)', color: '#000',
              padding: '16px 40px', borderRadius: 12,
              textDecoration: 'none', fontSize: 15,
              fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase',
              transition: 'all 0.2s',
              display: 'inline-block',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-3px)'
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(201,255,0,0.4)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              Start Free Trial
            </Link>
            <Link href="/classes/yoga" style={{
              background: 'transparent',
              border: '1px solid #333', color: '#fff',
              padding: '16px 40px', borderRadius: 12,
              textDecoration: 'none', fontSize: 15,
              fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase',
              transition: 'all 0.2s', display: 'inline-block',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--accent)'
                e.currentTarget.style.color = 'var(--accent)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#333'
                e.currentTarget.style.color = '#fff'
              }}
            >
              Browse Classes →
            </Link>
          </div>

          {/* Trust bar */}
          <div
            className="animate-fadeUp opacity-0 delay-400"
            style={{ display: 'flex', gap: 'clamp(16px, 4vw, 32px)', marginTop: 'clamp(32px, 6vw, 64px)', flexWrap: 'wrap' }}
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-display" style={{ fontSize: 36, color: 'var(--accent)', letterSpacing: 2 }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: 12, color: '#666', letterSpacing: 1, textTransform: 'uppercase', marginTop: 2 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating card - desktop decoration */}
      <div
        className="animate-float hero-float-card"
        style={{
          position: 'absolute', right: '8%', top: '35%',
          background: 'rgba(17,17,17,0.9)',
          border: '1px solid #222', borderRadius: 20,
          padding: '20px 24px', backdropFilter: 'blur(12px)',
          minWidth: 200,
        }}
      >
        <div style={{ fontSize: 12, color: '#666', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Next Live Class</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ fontSize: 28 }}>🔥</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15 }}>HIIT Burn</div>
            <div style={{ color: 'var(--accent)', fontSize: 13, marginTop: 2 }}>Starting in 22 min</div>
          </div>
        </div>
        <div style={{
          marginTop: 14, background: 'var(--accent)', color: '#000',
          borderRadius: 8, padding: '8px 0', textAlign: 'center',
          fontSize: 12, fontWeight: 800, letterSpacing: 1,
          cursor: 'pointer',
        }}>
          JOIN CLASS
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{
        position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        opacity: 0.4,
      }}>
        <span style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase' }}>Scroll</span>
        <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, #fff, transparent)' }} />
      </div>
    </section>
  )
}

function MarqueeBar() {
  return (
    <div style={{
      background: 'var(--accent)', padding: '14px 0',
      overflow: 'hidden', position: 'relative',
    }}>
      <div className="animate-marquee" style={{ display: 'flex', gap: 48, whiteSpace: 'nowrap' }}>
        {marqueeItems.map((item, i) => (
          <span key={i} className="font-display" style={{
            fontSize: 18, color: '#000', letterSpacing: 3,
          }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

function ClassesSection() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section style={{ padding: '100px 5%', maxWidth: 1280, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 64 }}>
        <span style={{
          color: 'var(--accent)', fontSize: 12, fontWeight: 700,
          letterSpacing: 3, textTransform: 'uppercase',
        }}>
          What We Offer
        </span>
        <h2 className="font-display" style={{
          fontSize: 'clamp(40px, 6vw, 72px)', marginTop: 12,
          letterSpacing: 2, lineHeight: 1,
        }}>
          CHOOSE YOUR<br />
          <span style={{ color: 'var(--accent)' }}>DISCIPLINE</span>
        </h2>
        <p style={{ color: '#666', marginTop: 16, maxWidth: 500, fontSize: 16, lineHeight: 1.7 }}>
          Four expertly designed programs to match your goals, pace, and lifestyle.
        </p>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 24,
      }}>
        {classes.map((cls, i) => (
          <Link
            key={cls.id}
            href={`/classes/${cls.id}`}
            style={{ textDecoration: 'none' }}
          >
            <div
              onMouseEnter={() => setHovered(cls.id)}
              onMouseLeave={() => setHovered(null)}
              className={`gradient-border animate-fadeUp opacity-0`}
              style={{
                animationDelay: `${i * 0.1}s`,
                borderRadius: 20,
                padding: 28,
                cursor: 'pointer',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                transform: hovered === cls.id ? 'translateY(-8px)' : 'translateY(0)',
                boxShadow: hovered === cls.id
                  ? `0 20px 60px ${cls.color}30`
                  : '0 4px 20px rgba(0,0,0,0.3)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Glow blob */}
              <div style={{
                position: 'absolute', top: -40, right: -40,
                width: 140, height: 140, borderRadius: '50%',
                background: `radial-gradient(circle, ${cls.color}20 0%, transparent 70%)`,
                transition: 'opacity 0.3s',
                opacity: hovered === cls.id ? 1 : 0.4,
                pointerEvents: 'none',
              }} />

              {/* Tag */}
              <div style={{
                display: 'inline-block', fontSize: 10, fontWeight: 700,
                letterSpacing: 2, textTransform: 'uppercase',
                color: cls.color, background: `${cls.color}15`,
                border: `1px solid ${cls.color}40`,
                borderRadius: 100, padding: '4px 12px', marginBottom: 20,
              }}>
                {cls.tag}
              </div>

              {/* Emoji + Title */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 16 }}>
                <span style={{ fontSize: 40 }}>{cls.emoji}</span>
                <div>
                  <h3 className="font-display" style={{ fontSize: 32, letterSpacing: 1, color: '#fff', margin: 0 }}>
                    {cls.name}
                  </h3>
                  <p style={{ color: '#666', fontSize: 13, marginTop: 2 }}>{cls.category}</p>
                </div>
              </div>

              <p style={{ color: '#888', fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>
                {cls.description}
              </p>

              {/* Meta */}
              <div style={{ display: 'flex', gap: 20, marginBottom: 24 }}>
                {[
                  { icon: '⏱', val: cls.duration },
                  { icon: '🎯', val: cls.level },
                  { icon: '🔥', val: `${cls.calories} cal` },
                ].map((m) => (
                  <div key={m.val} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 16 }}>{m.icon}</div>
                    <div style={{ fontSize: 11, color: '#666', marginTop: 2, letterSpacing: 1 }}>{m.val}</div>
                  </div>
                ))}
              </div>

              {/* Instructor */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10,
                paddingTop: 20, borderTop: '1px solid #1a1a1a',
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: `linear-gradient(135deg, ${cls.color}, ${cls.color}80)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 700, color: '#000',
                }}>
                  {cls.instructor.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{cls.instructor}</div>
                  <div style={{ fontSize: 11, color: '#555' }}>Lead Instructor</div>
                </div>
                <div style={{
                  marginLeft: 'auto',
                  color: cls.color, fontSize: 20, fontWeight: 300,
                  transition: 'transform 0.2s',
                  transform: hovered === cls.id ? 'translateX(4px)' : 'translateX(0)',
                }}>→</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      title: 'Create Your Account',
      body: 'Sign up in under 2 minutes. No credit card needed to start. Pick your fitness goal and we\'ll guide the rest.',
      icon: '👤',
    },
    {
      number: '02',
      title: 'Choose Your Plan',
      body: 'Start free or go PRO/ELITE for unlimited access to live classes, AI coaching, and the full video library.',
      icon: '⚡',
    },
    {
      number: '03',
      title: 'Start Training',
      body: 'Join live classes in real time or train on your schedule. Track progress, hit milestones, get results.',
      icon: '🏆',
    },
  ]

  return (
    <section style={{ padding: '100px 5%', background: '#0d0d0d', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <span style={{ color: 'var(--accent)', fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase' }}>
            Simple Process
          </span>
          <h2 className="font-display" style={{ fontSize: 'clamp(40px, 5vw, 64px)', marginTop: 12, letterSpacing: 2 }}>
            HOW IT WORKS
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 40 }}>
          {steps.map((step, i) => (
            <div key={step.number} style={{ position: 'relative' }}>
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div style={{
                  position: 'absolute', top: 32, right: -20, width: 40, height: 1,
                  background: 'linear-gradient(to right, #333, transparent)',
                  display: 'none', // hide on mobile by default
                }} />
              )}
              <div style={{ display: 'flex', gap: 20 }}>
                <div>
                  <div className="font-display" style={{
                    fontSize: 64, color: 'var(--accent)', opacity: 0.15,
                    lineHeight: 1, letterSpacing: -2,
                  }}>
                    {step.number}
                  </div>
                </div>
                <div style={{ paddingTop: 8 }}>
                  <div style={{ fontSize: 28, marginBottom: 12 }}>{step.icon}</div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{step.title}</h3>
                  <p style={{ color: '#666', lineHeight: 1.7, fontSize: 15 }}>{step.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PricingSection() {
  const [billingAnnual, setBillingAnnual] = useState(false)

  return (
    <section style={{ padding: '100px 5%' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span style={{ color: 'var(--accent)', fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase' }}>
            Pricing
          </span>
          <h2 className="font-display" style={{ fontSize: 'clamp(40px, 5vw, 64px)', marginTop: 12, letterSpacing: 2 }}>
            PICK YOUR PLAN
          </h2>
          <p style={{ color: '#666', marginTop: 16, fontSize: 16 }}>
            Cancel anytime. No hidden fees. No BS.
          </p>

          {/* Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 32 }}>
            <span style={{ fontSize: 14, color: billingAnnual ? '#666' : '#fff', fontWeight: 600 }}>Monthly</span>
            <div
              onClick={() => setBillingAnnual(!billingAnnual)}
              style={{
                width: 52, height: 28, borderRadius: 100,
                background: billingAnnual ? 'var(--accent)' : '#222',
                cursor: 'pointer', position: 'relative',
                transition: 'background 0.3s',
                border: '1px solid #333',
              }}
            >
              <div style={{
                position: 'absolute', top: 3, left: billingAnnual ? 26 : 3,
                width: 20, height: 20, borderRadius: '50%',
                background: billingAnnual ? '#000' : '#666',
                transition: 'left 0.3s',
              }} />
            </div>
            <span style={{ fontSize: 14, color: billingAnnual ? '#fff' : '#666', fontWeight: 600 }}>
              Annual
              <span style={{
                background: 'rgba(201,255,0,0.15)', color: 'var(--accent)',
                fontSize: 11, fontWeight: 700, padding: '2px 8px',
                borderRadius: 100, marginLeft: 8, letterSpacing: 1,
              }}>
                SAVE 20%
              </span>
            </span>
          </div>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, alignItems: 'center' }}>
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              style={{
                background: tier.highlight ? 'var(--accent)' : 'var(--card)',
                border: tier.highlight ? 'none' : '1px solid #1e1e1e',
                borderRadius: 24,
                padding: tier.highlight ? '40px 32px' : '32px',
                transform: tier.highlight ? 'scale(1.05)' : 'scale(1)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {tier.highlight && (
                <div style={{
                  position: 'absolute', top: 20, right: 20,
                  background: '#000', color: 'var(--accent)',
                  fontSize: 10, fontWeight: 800, letterSpacing: 2,
                  padding: '4px 12px', borderRadius: 100, textTransform: 'uppercase',
                }}>
                  Most Popular
                </div>
              )}

              <div style={{
                fontSize: 12, fontWeight: 700, letterSpacing: 3,
                textTransform: 'uppercase',
                color: tier.highlight ? '#000' : 'var(--accent)',
                marginBottom: 8,
              }}>
                {tier.name}
              </div>

              <div style={{ marginBottom: 8 }}>
                <span className="font-display" style={{
                  fontSize: 52, letterSpacing: 1,
                  color: tier.highlight ? '#000' : '#fff',
                }}>
                  {billingAnnual && tier.price !== '₹0'
                    ? `₹${Math.floor(parseInt(tier.price.replace(/[^0-9]/g, '')) * 0.8).toLocaleString('en-IN')}`
                    : tier.price}
                </span>
                <span style={{ color: tier.highlight ? '#000' : '#666', fontSize: 14, marginLeft: 4 }}>
                  {tier.period}
                </span>
              </div>

              <p style={{ color: tier.highlight ? '#333' : '#666', fontSize: 14, marginBottom: 28, lineHeight: 1.6 }}>
                {tier.description}
              </p>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {tier.features.map((f) => (
                  <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14 }}>
                    <span style={{ color: tier.highlight ? '#000' : 'var(--accent)', fontSize: 16, flexShrink: 0, marginTop: 1 }}>✓</span>
                    <span style={{ color: tier.highlight ? '#111' : '#aaa' }}>{f}</span>
                  </li>
                ))}
              </ul>

              <Link href="/pricing" style={{ textDecoration: 'none' }}>
                <div style={{
                  background: tier.highlight ? '#000' : 'transparent',
                  border: tier.highlight ? 'none' : '1px solid var(--accent)',
                  color: tier.highlight ? 'var(--accent)' : 'var(--accent)',
                  borderRadius: 12, padding: '14px 0',
                  textAlign: 'center', fontWeight: 800,
                  fontSize: 14, letterSpacing: 2,
                  textTransform: 'uppercase', cursor: 'pointer',
                  transition: 'all 0.2s',
                }}>
                  {tier.cta} →
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  return (
    <section style={{ padding: '100px 5%', background: '#0a0a0a' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ marginBottom: 64 }}>
          <span style={{ color: 'var(--accent)', fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase' }}>
            Real Results
          </span>
          <h2 className="font-display" style={{ fontSize: 'clamp(40px, 5vw, 64px)', marginTop: 12, letterSpacing: 2 }}>
            WHAT MEMBERS SAY
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              style={{
                background: 'var(--card)', border: '1px solid #1a1a1a',
                borderRadius: 20, padding: 32,
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = '#333')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = '#1a1a1a')}
            >
              {/* Stars */}
              <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
                {Array(t.rating).fill(0).map((_, j) => (
                  <span key={j} style={{ color: 'var(--accent)', fontSize: 16 }}>★</span>
                ))}
              </div>

              {/* Quote */}
              <p style={{ color: '#ccc', lineHeight: 1.8, fontSize: 15, marginBottom: 28, fontStyle: 'italic' }}>
                &ldquo;{t.body}&rdquo;
              </p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--accent), #666)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, fontWeight: 800, color: '#000',
                }}>
                  {t.initials}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{t.name}</div>
                  <div style={{ color: '#555', fontSize: 12, marginTop: 2 }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section style={{ padding: '100px 5%' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{
          background: 'var(--accent)', borderRadius: 32,
          padding: 'clamp(48px, 8vw, 96px)',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* BG text */}
          <div className="font-display" style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: 'clamp(80px, 20vw, 240px)',
            color: 'rgba(0,0,0,0.06)',
            letterSpacing: 8, whiteSpace: 'nowrap',
            userSelect: 'none', pointerEvents: 'none',
          }}>
            APEX
          </div>

          <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
            <h2 className="font-display" style={{
              fontSize: 'clamp(40px, 7vw, 80px)',
              color: '#000', letterSpacing: 2, marginBottom: 20,
            }}>
              READY TO TRANSFORM?
            </h2>
            <p style={{ color: '#333', fontSize: 18, marginBottom: 40, maxWidth: 500, margin: '0 auto 40px' }}>
              Join 12,400+ members already training smarter. First 14 days free, cancel anytime.
            </p>
            <Link href="/register" style={{
              display: 'inline-block',
              background: '#000', color: 'var(--accent)',
              padding: '18px 56px', borderRadius: 12,
              textDecoration: 'none', fontSize: 16,
              fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-3px)'
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.4)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              Start Your Free Trial →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const links = {
    'Classes': ['Power Yoga', 'HIIT Burn', 'Core Pilates', 'Iron Strength'],
    'Company': ['About Us', 'Careers', 'Press', 'Contact'],
    'Support': ['Help Center', 'Privacy Policy', 'Terms of Service', 'Cookie Policy'],
  }

  return (
    <footer style={{ borderTop: '1px solid #111', padding: '64px 5% 40px', background: '#050505' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 48, marginBottom: 64 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <div style={{
                width: 32, height: 32, background: 'var(--accent)', borderRadius: 6,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span className="font-display" style={{ color: '#000', fontSize: 18 }}>A</span>
              </div>
              <span className="font-display" style={{ fontSize: 24, letterSpacing: 4 }}>APEX</span>
            </div>
            <p style={{ color: '#555', fontSize: 14, lineHeight: 1.7 }}>
              Premium fitness. Expert coaching. Real results.
            </p>
          </div>

          {/* Links */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <h4 style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#444', marginBottom: 20 }}>
                {group}
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {items.map((item) => (
                  <li key={item}>
                    <Link href="#" style={{
                      color: '#555', textDecoration: 'none', fontSize: 14,
                      transition: 'color 0.2s',
                    }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#555')}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{
          borderTop: '1px solid #111', paddingTop: 32,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 16,
        }}>
          <p style={{ color: '#333', fontSize: 13 }}>© 2025 APEX Fitness. All rights reserved.</p>
          <p style={{ color: '#333', fontSize: 13 }}>Built with ❤️ for champions.</p>
        </div>
      </div>
    </footer>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Navbar />
      <HeroSection />
      <MarqueeBar />
      <ClassesSection />
      <HowItWorksSection />
      <PricingSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  )
}