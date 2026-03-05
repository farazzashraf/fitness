'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface ClassItem {
  id: string; name: string; category: string; instructor: string
  duration: string; level: string; calories: string; tag: string
  emoji: string; color: string; description: string
}
interface Testimonial { name: string; role: string; body: string; rating: number; initials: string }

const classes: ClassItem[] = [
  { id: 'yoga', name: 'Power Yoga', category: 'Flexibility & Mind', instructor: 'Priya Sharma', duration: '60 min', level: 'All Levels', calories: '300–400', tag: 'Most Popular', emoji: '🧘', color: '#7C3AED', description: 'Deep stretches, breathwork, and mindfulness that rebuild your body from the inside out.' },
  { id: 'hiit', name: 'HIIT Burn', category: 'Cardio & Endurance', instructor: 'Marcus Cole', duration: '45 min', level: 'Intermediate', calories: '500–700', tag: 'High Intensity', emoji: '🔥', color: '#EA580C', description: 'Max-effort intervals that torch fat and skyrocket your metabolism for hours after class.' },
  { id: 'pilates', name: 'Core Pilates', category: 'Strength & Posture', instructor: 'Sofia Reyes', duration: '50 min', level: 'Beginner', calories: '250–350', tag: 'Beginner Friendly', emoji: '⚡', color: '#0891B2', description: 'Precision movements that sculpt your core, improve posture, and build lean muscle.' },
  { id: 'strength', name: 'Iron Strength', category: 'Weight Training', instructor: 'Jake Monroe', duration: '75 min', level: 'Advanced', calories: '400–600', tag: 'Build Muscle', emoji: '💪', color: '#C9FF00', description: 'Progressive overload training designed to maximize muscle gain and raw strength.' },
]

const testimonials: Testimonial[] = [
  { name: 'Aisha Patel', role: 'ELITE Member -8 months', body: 'The personal training sessions are a game changer. My trainer picks up exactly where my online sessions left off. I\'ve lost 18kg and feel stronger than I ever have -one membership really does it all.', rating: 5, initials: 'AP' },
  { name: 'David Kim', role: 'PRO Member -1 year', body: 'The video library alone is worth every rupee. I stream at 11pm after work, and when I can make it to the gym my chosen class slot is always booked through the app without any hassle.', rating: 5, initials: 'DK' },
  { name: 'Lakshmi Reddy', role: 'ELITE Member -5 months', body: 'Started on PRO for the gym access and chosen classes, upgraded to ELITE after a month for the personal trainer. Best decision I\'ve made. My coach designs the sessions around what I\'m doing online too.', rating: 5, initials: 'LR' },
]

const stats = [
  { value: '12,400+', label: 'Active Members' },
  { value: '200+', label: 'Video Classes' },
  { value: '4', label: 'Disciplines' },
  { value: '98%', label: 'Satisfaction' },
]

const marqueeItems = [
  'POWER YOGA', '•', 'HIIT BURN', '•', 'CORE PILATES', '•', 'IRON STRENGTH', '•',
  'LIVE CLASSES', '•', 'PERSONAL TRAINING', '•', 'REAL RESULTS', '•',
  'POWER YOGA', '•', 'HIIT BURN', '•', 'CORE PILATES', '•', 'IRON STRENGTH', '•',
  'LIVE CLASSES', '•', 'PERSONAL TRAINING', '•', 'REAL RESULTS', '•',
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const closeMenu = () => setMenuOpen(false)
  return (
    <>
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, transition: 'all 0.3s ease', background: scrolled || menuOpen ? 'rgba(8,8,8,0.97)' : 'transparent', backdropFilter: scrolled || menuOpen ? 'blur(12px)' : 'none', borderBottom: scrolled || menuOpen ? '1px solid #222' : '1px solid transparent', padding: '0 5%' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
          <Link href="/" style={{ textDecoration: 'none' }} onClick={closeMenu}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 36, height: 36, background: 'var(--accent)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="font-display" style={{ color: '#000', fontSize: 20, lineHeight: 1 }}>A</span>
              </div>
              <span className="font-display" style={{ fontSize: 28, letterSpacing: 4, color: '#fff' }}>APEX</span>
            </div>
          </Link>
          <div className="nav-links" style={{ gap: 40, alignItems: 'center' }}>
            {['Classes', 'Pricing', 'About', 'Blog'].map(item => (
              <Link key={item} href={`/${item.toLowerCase()}`} style={{ color: '#aaa', textDecoration: 'none', fontSize: 14, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={e => (e.currentTarget.style.color = '#aaa')}
              >{item}</Link>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Link href="/login" className="nav-links" style={{ color: '#aaa', textDecoration: 'none', fontSize: 14, fontWeight: 600, letterSpacing: 1 }}>Log In</Link>
            <Link href="/register" style={{ background: 'var(--accent)', color: '#000', padding: '10px 20px', borderRadius: 8, textDecoration: 'none', fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Join Now</Link>
            <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: '1px solid #333', borderRadius: 8, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexDirection: 'column', gap: 5, padding: 0 }}>
              <span style={{ display: 'block', width: 18, height: 2, background: menuOpen ? 'var(--accent)' : '#fff', borderRadius: 2, transition: 'all 0.25s', transform: menuOpen ? 'rotate(45deg) translate(3px,3px)' : 'none' }} />
              <span style={{ display: 'block', width: 18, height: 2, background: menuOpen ? 'var(--accent)' : '#fff', borderRadius: 2, transition: 'all 0.25s', opacity: menuOpen ? 0 : 1 }} />
              <span style={{ display: 'block', width: 18, height: 2, background: menuOpen ? 'var(--accent)' : '#fff', borderRadius: 2, transition: 'all 0.25s', transform: menuOpen ? 'rotate(-45deg) translate(3px,-3px)' : 'none' }} />
            </button>
          </div>
        </div>
      </nav>
      <div style={{ display: menuOpen ? 'flex' : 'none', flexDirection: 'column', position: 'fixed', top: 72, left: 0, right: 0, zIndex: 200, background: 'rgba(8,8,8,0.99)', backdropFilter: 'blur(16px)', borderBottom: '1px solid #1a1a1a', padding: '12px 24px 20px', gap: 4 }}>
        {['Classes', 'Pricing', 'About', 'Blog'].map(item => (
          <Link key={item} href={`/${item.toLowerCase()}`} onClick={closeMenu} style={{ display: 'block', padding: '14px 12px', borderRadius: 10, fontSize: 14, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' as const, textDecoration: 'none', borderBottom: '1px solid #111', color: '#ccc' }}>{item}</Link>
        ))}
        <Link href="/login" onClick={closeMenu} style={{ display: 'block', padding: '14px 12px', borderRadius: 10, fontSize: 14, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' as const, textDecoration: 'none', borderBottom: '1px solid #111', color: '#666' }}>Log In</Link>
        <Link href="/register" onClick={closeMenu} style={{ display: 'block', padding: '14px 12px', borderRadius: 10, fontSize: 14, fontWeight: 800, textDecoration: 'none', color: 'var(--accent)' }}>Start Free Trial →</Link>
      </div>
    </>
  )
}

function HeroSection() {
  return (
    <section className="noise" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      <div className="hero-grid" style={{ position: 'absolute', inset: 0, opacity: 0.6 }} />
      <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', top: '-100px', right: '-100px', background: 'radial-gradient(circle, rgba(201,255,0,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', bottom: '10%', left: '-80px', background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(100px, 15vw, 140px) 5% clamp(60px, 8vw, 80px)', maxWidth: 1280, margin: '0 auto', width: '100%' }}>
        <div style={{ maxWidth: 800 }}>
          {/* <div className="animate-fadeUp opacity-0" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(201,255,0,0.1)', border: '1px solid rgba(201,255,0,0.3)', borderRadius: 100, padding: '6px 16px', marginBottom: 32 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} className="animate-pulse-glow" />
            <span style={{ color: 'var(--accent)', fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>Stream Online · Train In-Gym · One Membership</span>
          </div> */}
          <h1 className="font-display animate-fadeUp opacity-0 delay-100" style={{ fontSize: 'clamp(72px, 12vw, 140px)', lineHeight: 0.9, letterSpacing: 2, margin: '0 0 24px', color: '#fff' }}>
            TRAIN<br />
            <span style={{ color: 'var(--accent)', WebkitTextStroke: '2px var(--accent)', WebkitTextFillColor: 'transparent' }}>HARDER.</span><br />
            LIVE<br />BETTER.
          </h1>
          <p className="animate-fadeUp opacity-0 delay-200" style={{ fontSize: 18, color: '#888', lineHeight: 1.7, maxWidth: 520, marginBottom: 48 }}>
            Stream 200+ classes on demand or walk into the gym for your chosen sessions. Go ELITE and unlock personal trainer sessions on top. Two plans, zero compromise.
          </p>
          <div className="animate-fadeUp opacity-0 delay-300" style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
            <Link href="/register" style={{ background: 'var(--accent)', color: '#000', padding: '16px 40px', borderRadius: 12, textDecoration: 'none', fontSize: 15, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', transition: 'all 0.2s', display: 'inline-block' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(201,255,0,0.4)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
            >Start Free Trial</Link>
            <Link href="/classes" style={{ background: 'transparent', border: '1px solid #333', color: '#fff', padding: '16px 40px', borderRadius: 12, textDecoration: 'none', fontSize: 15, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', transition: 'all 0.2s', display: 'inline-block' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#333'; e.currentTarget.style.color = '#fff' }}
            >Browse Classes →</Link>
          </div>
          <div className="animate-fadeUp opacity-0 delay-400" style={{ display: 'flex', gap: 'clamp(16px, 4vw, 32px)', marginTop: 'clamp(32px, 6vw, 64px)', flexWrap: 'wrap' }}>
            {stats.map(stat => (
              <div key={stat.label}>
                <div className="font-display" style={{ fontSize: 36, color: 'var(--accent)', letterSpacing: 2 }}>{stat.value}</div>
                <div style={{ fontSize: 12, color: '#666', letterSpacing: 1, textTransform: 'uppercase', marginTop: 2 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="animate-float hero-float-card" style={{ position: 'absolute', right: '8%', top: '35%', background: 'rgba(17,17,17,0.9)', border: '1px solid #222', borderRadius: 20, padding: '20px 24px', backdropFilter: 'blur(12px)', minWidth: 200 }}>
        <div style={{ fontSize: 12, color: '#666', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Next Live Class</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ fontSize: 28 }}>🔥</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15 }}>HIIT Burn</div>
            <div style={{ color: 'var(--accent)', fontSize: 13, marginTop: 2 }}>Starting in 22 min</div>
          </div>
        </div>
        <Link href="/login" style={{ display: 'block', textDecoration: 'none', marginTop: 14, background: 'var(--accent)', color: '#000', borderRadius: 8, padding: '8px 0', textAlign: 'center', fontSize: 12, fontWeight: 800, letterSpacing: 1 }}>JOIN CLASS</Link>
      </div>
      <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: 0.4 }}>
        <span style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase' }}>Scroll</span>
        <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, #fff, transparent)' }} />
      </div>
    </section>
  )
}

function MarqueeBar() {
  return (
    <div style={{ background: 'var(--accent)', padding: '14px 0', overflow: 'hidden', position: 'relative' }}>
      <div className="animate-marquee" style={{ display: 'flex', gap: 48, whiteSpace: 'nowrap' }}>
        {marqueeItems.map((item, i) => (
          <span key={i} className="font-display" style={{ fontSize: 18, color: '#000', letterSpacing: 3 }}>{item}</span>
        ))}
      </div>
    </div>
  )
}

function ClassesSection() {
  const [hovered, setHovered] = useState<string | null>(null)
  return (
    <section style={{ padding: '100px 5%', maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ marginBottom: 64 }}>
        <span style={{ color: 'var(--accent)', fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase' }}>What We Offer</span>
        <h2 className="font-display" style={{ fontSize: 'clamp(40px, 6vw, 72px)', marginTop: 12, letterSpacing: 2, lineHeight: 1 }}>
          CHOOSE YOUR<br /><span style={{ color: 'var(--accent)' }}>DISCIPLINE</span>
        </h2>
        <p style={{ color: '#666', marginTop: 16, maxWidth: 500, fontSize: 16, lineHeight: 1.7 }}>
          Four expert programs available online and as bookable in-gym sessions. Your chosen classes are included in both plans.
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
        {classes.map((cls, i) => (
          <Link key={cls.id} href={`/classes/${cls.id}`} style={{ textDecoration: 'none' }}>
            <div onMouseEnter={() => setHovered(cls.id)} onMouseLeave={() => setHovered(null)}
              className="gradient-border animate-fadeUp opacity-0"
              style={{ animationDelay: `${i * 0.1}s`, borderRadius: 20, padding: 28, cursor: 'pointer', transition: 'transform 0.3s ease, box-shadow 0.3s ease', transform: hovered === cls.id ? 'translateY(-8px)' : 'translateY(0)', boxShadow: hovered === cls.id ? `0 20px 60px ${cls.color}30` : '0 4px 20px rgba(0,0,0,0.3)', position: 'relative', overflow: 'hidden' }}
            >
              <div style={{ position: 'absolute', top: -40, right: -40, width: 140, height: 140, borderRadius: '50%', background: `radial-gradient(circle, ${cls.color}20 0%, transparent 70%)`, opacity: hovered === cls.id ? 1 : 0.4, pointerEvents: 'none', transition: 'opacity 0.3s' }} />
              <div style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: cls.color, background: `${cls.color}15`, border: `1px solid ${cls.color}40`, borderRadius: 100, padding: '4px 12px', marginBottom: 20 }}>{cls.tag}</div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 16 }}>
                <span style={{ fontSize: 40 }}>{cls.emoji}</span>
                <div>
                  <h3 className="font-display" style={{ fontSize: 32, letterSpacing: 1, color: '#fff', margin: 0 }}>{cls.name}</h3>
                  <p style={{ color: '#666', fontSize: 13, marginTop: 2 }}>{cls.category}</p>
                </div>
              </div>
              <p style={{ color: '#888', fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>{cls.description}</p>
              <div style={{ display: 'flex', gap: 20, marginBottom: 24 }}>
                {[{ icon: '⏱', val: cls.duration }, { icon: '🎯', val: cls.level }, { icon: '🔥', val: `${cls.calories} cal` }].map(m => (
                  <div key={m.val} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 16 }}>{m.icon}</div>
                    <div style={{ fontSize: 11, color: '#666', marginTop: 2, letterSpacing: 1 }}>{m.val}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 20, borderTop: '1px solid #1a1a1a' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: `linear-gradient(135deg, ${cls.color}, ${cls.color}80)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#000' }}>
                  {cls.instructor.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{cls.instructor}</div>
                  <div style={{ fontSize: 11, color: '#555' }}>Lead Instructor</div>
                </div>
                <div style={{ marginLeft: 'auto', color: cls.color, fontSize: 20, transition: 'transform 0.2s', transform: hovered === cls.id ? 'translateX(4px)' : 'translateX(0)' }}>→</div>
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
    { number: '01', title: 'Create Your Account', body: 'Sign up in under 2 minutes. Pick PRO or ELITE based on how you want to train -change your mind anytime.', icon: '👤' },
    { number: '02', title: 'Choose Your Plan', body: 'PRO gives you unlimited gym access + 4 chosen classes per month. ELITE gives you 12 classes, unlimited gym, and unlimited personal trainer sessions on top.', icon: '⚡' },
    { number: '03', title: 'Train Your Way', body: 'Stream 200+ videos at home, book your chosen in-gym sessions, or work one-on-one with your personal trainer. All from one dashboard.', icon: '🏆' },
  ]
  return (
    <section style={{ padding: '100px 5%', background: '#0d0d0d', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <span style={{ color: 'var(--accent)', fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase' }}>Simple Process</span>
          <h2 className="font-display" style={{ fontSize: 'clamp(40px, 5vw, 64px)', marginTop: 12, letterSpacing: 2 }}>HOW IT WORKS</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 40 }}>
          {steps.map(step => (
            <div key={step.number} style={{ display: 'flex', gap: 20 }}>
              <div>
                <div className="font-display" style={{ fontSize: 64, color: 'var(--accent)', opacity: 0.15, lineHeight: 1, letterSpacing: -2 }}>{step.number}</div>
              </div>
              <div style={{ paddingTop: 8 }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{step.icon}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{step.title}</h3>
                <p style={{ color: '#666', lineHeight: 1.7, fontSize: 15 }}>{step.body}</p>
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

  const plans = [
    {
      name: 'PRO', color: '#C9FF00', highlight: false,
      monthlyPrice: 2499, annualPrice: 1999,
      description: 'Online classes + gym access + your chosen in-person sessions',
      gymTag: 'Unlimited gym sessions · 4 chosen classes/mo',
      features: [
        'Full video library (200+ videos)',
        'Recorded class replays',
        'Unlimited gym sessions',
        '4 chosen group classes/mo',
        'Progress tracking & nutrition guides',
        'Priority support',
      ],
      cta: 'Go PRO', href: '/register',
    },
    {
      name: 'ELITE', color: '#A78BFA', highlight: true,
      monthlyPrice: 4999, annualPrice: 3999,
      description: 'Unlimited gym + more classes + personal trainer + live coaching',
      gymTag: 'Unlimited gym · 12 classes/mo · Unlimited PT sessions',
      features: [
        'Everything in PRO',
        'Unlimited gym access',
        '12 chosen group classes per month',
        'Unlimited personal training for the whole month',
        'Daily live virtual classes',
        'AI coaching Q&A',
        '1-on-1 monthly check-in',
        'Exclusive events + early access',
      ],
      cta: 'Go ELITE', href: '/register',
    },
  ]

  return (
    <section style={{ padding: '100px 5%' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span style={{ color: 'var(--accent)', fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase' }}>Pricing</span>
          <h2 className="font-display" style={{ fontSize: 'clamp(40px, 5vw, 64px)', marginTop: 12, letterSpacing: 2 }}>PICK YOUR PLAN</h2>
          <p style={{ color: '#666', marginTop: 16, fontSize: 16 }}>Both plans include gym access and chosen in-person classes. No hidden fees. Cancel anytime.</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 32 }}>
            <span style={{ fontSize: 14, color: billingAnnual ? '#666' : '#fff', fontWeight: 600 }}>Monthly</span>
            <div onClick={() => setBillingAnnual(!billingAnnual)} style={{ width: 52, height: 28, borderRadius: 100, background: billingAnnual ? 'var(--accent)' : '#222', cursor: 'pointer', position: 'relative', transition: 'background 0.3s', border: '1px solid #333' }}>
              <div style={{ position: 'absolute', top: 3, left: billingAnnual ? 26 : 3, width: 20, height: 20, borderRadius: '50%', background: billingAnnual ? '#000' : '#666', transition: 'left 0.3s' }} />
            </div>
            <span style={{ fontSize: 14, color: billingAnnual ? '#fff' : '#666', fontWeight: 600 }}>
              Annual <span style={{ background: 'rgba(201,255,0,0.15)', color: 'var(--accent)', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 100, marginLeft: 8, letterSpacing: 1 }}>SAVE 20%</span>
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, alignItems: 'center', maxWidth: 860, margin: '0 auto' }}>
          {plans.map(plan => {
            const price = billingAnnual ? plan.annualPrice : plan.monthlyPrice
            return (
              <div key={plan.name} style={{ background: plan.highlight ? 'var(--accent)' : 'var(--card)', border: plan.highlight ? 'none' : '1px solid #1e1e1e', borderRadius: 24, padding: plan.highlight ? '40px 32px' : '32px', transform: plan.highlight ? 'scale(1.05)' : 'scale(1)', position: 'relative', overflow: 'hidden' }}>
                {plan.highlight && (
                  <div style={{ position: 'absolute', top: 20, right: 20, background: '#000', color: plan.color, fontSize: 10, fontWeight: 800, letterSpacing: 2, padding: '4px 12px', borderRadius: 100, textTransform: 'uppercase' }}>Most Popular</div>
                )}
                <div style={{ fontSize: 11, color: plan.highlight ? '#333' : '#555', marginBottom: 16, fontWeight: 600 }}>🏋️ {plan.gymTag}</div>
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: plan.highlight ? '#000' : 'var(--accent)', marginBottom: 8 }}>{plan.name}</div>
                <div style={{ marginBottom: 8 }}>
                  <span className="font-display" style={{ fontSize: 52, letterSpacing: 1, color: plan.highlight ? '#000' : '#fff' }}>
                    ₹{price.toLocaleString('en-IN')}
                  </span>
                  <span style={{ color: plan.highlight ? '#333' : '#666', fontSize: 14, marginLeft: 4 }}>/mo</span>
                </div>
                <p style={{ color: plan.highlight ? '#333' : '#666', fontSize: 14, marginBottom: 28, lineHeight: 1.6 }}>{plan.description}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14 }}>
                      <span style={{ color: plan.highlight ? '#000' : 'var(--accent)', fontSize: 16, flexShrink: 0, marginTop: 1 }}>✓</span>
                      <span style={{ color: plan.highlight ? '#111' : '#aaa' }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href={plan.href} style={{ textDecoration: 'none' }}>
                  <div style={{ background: plan.highlight ? '#000' : 'transparent', border: plan.highlight ? 'none' : '1px solid var(--accent)', color: plan.highlight ? 'var(--accent)' : 'var(--accent)', borderRadius: 12, padding: '14px 0', textAlign: 'center', fontWeight: 800, fontSize: 14, letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s' }}>
                    {plan.cta} →
                  </div>
                </Link>
              </div>
            )
          })}
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
          <span style={{ color: 'var(--accent)', fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase' }}>Real Results</span>
          <h2 className="font-display" style={{ fontSize: 'clamp(40px, 5vw, 64px)', marginTop: 12, letterSpacing: 2 }}>WHAT MEMBERS SAY</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {testimonials.map(t => (
            <div key={t.name} style={{ background: 'var(--card)', border: '1px solid #1a1a1a', borderRadius: 20, padding: 32, transition: 'border-color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = '#333')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = '#1a1a1a')}
            >
              <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
                {Array(t.rating).fill(0).map((_, j) => <span key={j} style={{ color: 'var(--accent)', fontSize: 16 }}>★</span>)}
              </div>
              <p style={{ color: '#ccc', lineHeight: 1.8, fontSize: 15, marginBottom: 28, fontStyle: 'italic' }}>&ldquo;{t.body}&rdquo;</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), #666)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, color: '#000' }}>{t.initials}</div>
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
        <div style={{ background: 'var(--accent)', borderRadius: 32, padding: 'clamp(48px, 8vw, 96px)', position: 'relative', overflow: 'hidden' }}>
          <div className="font-display" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: 'clamp(80px, 20vw, 240px)', color: 'rgba(0,0,0,0.06)', letterSpacing: 8, whiteSpace: 'nowrap', userSelect: 'none', pointerEvents: 'none' }}>APEX</div>
          <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
            <h2 className="font-display" style={{ fontSize: 'clamp(40px, 7vw, 80px)', color: '#000', letterSpacing: 2, marginBottom: 20 }}>READY TO TRANSFORM?</h2>
            <p style={{ color: '#333', fontSize: 18, marginBottom: 40, maxWidth: 500, margin: '0 auto 40px' }}>
              Join 12,400+ members training online and in-gym. First 14 days free on either plan -cancel anytime.
            </p>
            <Link href="/register" style={{ display: 'inline-block', background: '#000', color: 'var(--accent)', padding: '18px 56px', borderRadius: 12, textDecoration: 'none', fontSize: 16, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.4)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
            >Start Your Free Trial →</Link>
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
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <div style={{ width: 32, height: 32, background: 'var(--accent)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="font-display" style={{ color: '#000', fontSize: 18 }}>A</span>
              </div>
              <span className="font-display" style={{ fontSize: 24, letterSpacing: 4 }}>APEX</span>
            </div>
            <p style={{ color: '#555', fontSize: 14, lineHeight: 1.7 }}>Premium fitness. Expert coaching. Real results.</p>
          </div>
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <h4 style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#444', marginBottom: 20 }}>{group}</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {items.map(item => (
                  <li key={item}>
                    <Link href="#" style={{ color: '#555', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#555')}
                    >{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid #111', paddingTop: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <p style={{ color: '#333', fontSize: 13 }}>© 2025 APEX Fitness. All rights reserved.</p>
          <p style={{ color: '#333', fontSize: 13 }}>Built with ❤️ for champions.</p>
        </div>
      </div>
    </footer>
  )
}

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