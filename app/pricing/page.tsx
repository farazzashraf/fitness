'use client'

import { useState } from 'react'
import Link from 'next/link'

// ─── Types ───────────────────────────────────────────────────────────────────
interface Feature {
  name: string
  free: boolean | string
  pro: boolean | string
  elite: boolean | string
}

interface FAQ {
  q: string
  a: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const features: Feature[] = [
  { name: 'Browse class schedules',       free: true,       pro: true,        elite: true },
  { name: 'Free intro videos',            free: '3 videos', pro: true,        elite: true },
  { name: 'Full video library',           free: false,      pro: '200+ videos', elite: '200+ videos' },
  { name: 'Recorded class replays',       free: false,      pro: true,        elite: true },
  { name: 'Progress tracking',            free: false,      pro: true,        elite: true },
  { name: 'Nutrition guides',             free: false,      pro: true,        elite: true },
  { name: 'Community forum',              free: true,       pro: true,        elite: true },
  { name: 'Live real-time classes',       free: false,      pro: false,       elite: 'Daily' },
  { name: 'AI coaching Q&A',              free: false,      pro: false,       elite: true },
  { name: '1-on-1 monthly check-in',      free: false,      pro: false,       elite: true },
  { name: 'Exclusive member events',      free: false,      pro: false,       elite: true },
  { name: 'Early access — new classes',   free: false,      pro: false,       elite: true },
  { name: 'Priority support',             free: false,      pro: true,        elite: true },
  { name: 'Cancel anytime',               free: true,       pro: true,        elite: true },
]

const faqs: FAQ[] = [
  {
    q: 'Can I switch plans anytime?',
    a: 'Absolutely. You can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle, and we\'ll prorate any difference.',
  },
  {
    q: 'Is there a free trial for PRO or ELITE?',
    a: 'Yes — all paid plans come with a 14-day free trial. No credit card is required to start. You\'ll only be charged after the trial ends if you choose to continue.',
  },
  {
    q: 'What happens to my data if I cancel?',
    a: 'Your account and progress data are saved for 12 months after cancellation. You can reactivate anytime and pick up right where you left off.',
  },
  {
    q: 'How do live classes work?',
    a: 'Live classes are available exclusively on the ELITE plan. You\'ll receive a notification 30 minutes before each session. Join directly from your dashboard — no extra software needed.',
  },
  {
    q: 'What is the AI coaching Q&A?',
    a: 'ELITE members get access to an AI fitness coach powered by advanced language models. Ask anything — form tips, nutrition, recovery, programming — and get instant expert-level answers 24/7.',
  },
  {
    q: 'Do you offer team or corporate plans?',
    a: 'Yes! We offer custom pricing for teams of 5 or more. Reach out to us at team@apexfitness.com and we\'ll put together a tailored package.',
  },
]

const tiers = [
  {
    id: 'free',
    name: 'FREE',
    monthlyPrice: 0,
    annualPrice: 0,
    description: 'Get started, explore the platform',
    color: '#444',
    cta: 'Get Started',
    ctaHref: '/register',
    highlight: false,
    badge: null,
  },
  {
    id: 'pro',
    name: 'PRO',
    monthlyPrice: 2499,
    annualPrice: 1999,
    description: 'Everything you need to transform your body',
    color: '#C9FF00',
    cta: 'Start Free Trial',
    ctaHref: '/checkout?plan=pro',
    highlight: true,
    badge: 'Most Popular',
  },
  {
    id: 'elite',
    name: 'ELITE',
    monthlyPrice: 4999,
    annualPrice: 3999,
    description: 'The complete, uncompromising APEX experience',
    color: '#A78BFA',
    cta: 'Go ELITE',
    ctaHref: '/checkout?plan=elite',
    highlight: false,
    badge: 'Best Value',
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

const NAV_ITEMS = ['Classes', 'Pricing', 'About', 'Blog']

function Navbar() {
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
          <div className="nav-links" style={{ gap: 32, alignItems: 'center' }}>
            {NAV_ITEMS.map(item => (
              <Link key={item} href={`/${item.toLowerCase()}`} style={{ color: item === 'Pricing' ? 'var(--accent)' : '#aaa', textDecoration: 'none', fontSize: 14, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={e => (e.currentTarget.style.color = item === 'Pricing' ? 'var(--accent)' : '#aaa')}
              >{item}</Link>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Link href="/login" className="nav-links" style={{ color: '#aaa', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>Log In</Link>
            <Link href="/register" style={{ background: 'var(--accent)', color: '#000', padding: '10px 20px', borderRadius: 8, textDecoration: 'none', fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap' }}>Join Free</Link>
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
          <Link key={item} href={`/${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} style={{ display:'block',padding:'14px 12px',borderRadius:10,fontSize:14,fontWeight:700,letterSpacing:1,textTransform:'uppercase' as const,textDecoration:'none',borderBottom:'1px solid #111', color: item === 'Pricing' ? 'var(--accent)' : '#ccc' }}>{item}</Link>
        ))}
        <Link href="/login" onClick={() => setMenuOpen(false)} style={{ display:'block',padding:'14px 12px',borderRadius:10,fontSize:14,fontWeight:700,letterSpacing:1,textTransform:'uppercase' as const,textDecoration:'none',borderBottom:'1px solid #111', color: '#666' }}>Log In</Link>
        <Link href="/register" onClick={() => setMenuOpen(false)} style={{ display:'block', padding:'14px 12px', borderRadius:10, fontSize:14, fontWeight:800, textDecoration:'none', color: 'var(--accent)' }}>Join Free →</Link>
      </div>
    </>
  )
}

function FAQItem({ faq }: { faq: FAQ }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      style={{
        border: '1px solid', borderColor: open ? '#333' : '#1a1a1a',
        borderRadius: 16, overflow: 'hidden',
        transition: 'border-color 0.2s',
        background: open ? '#0f0f0f' : 'transparent',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', padding: '24px 28px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: 'transparent', border: 'none', color: '#fff',
          cursor: 'pointer', textAlign: 'left', gap: 16,
        }}
      >
        <span style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.4 }}>{faq.q}</span>
        <span style={{
          fontSize: 22, color: 'var(--accent)', flexShrink: 0,
          transition: 'transform 0.3s',
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          display: 'inline-block',
        }}>+</span>
      </button>
      <div style={{
        maxHeight: open ? 200 : 0,
        overflow: 'hidden',
        transition: 'max-height 0.35s ease',
      }}>
        <p style={{ padding: '0 28px 24px', color: '#777', fontSize: 15, lineHeight: 1.8, margin: 0 }}>
          {faq.a}
        </p>
      </div>
    </div>
  )
}

function FeatureValue({ val }: { val: boolean | string }) {
  if (val === false) return <span style={{ color: '#333', fontSize: 20 }}>—</span>
  if (val === true) return (
    <div style={{
      width: 24, height: 24, borderRadius: '50%',
      background: 'rgba(201,255,0,0.15)', border: '1px solid rgba(201,255,0,0.4)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto',
    }}>
      <span style={{ color: 'var(--accent)', fontSize: 13, fontWeight: 700 }}>✓</span>
    </div>
  )
  return <span style={{ color: 'var(--accent)', fontSize: 12, fontWeight: 600 }}>{val}</span>
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function PricingPage() {
  const [annual, setAnnual] = useState(false)
  const [hoveredTier, setHoveredTier] = useState<string | null>(null)

  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Navbar />

      {/* ── Hero ── */}
      <section style={{ padding: '140px 5% 80px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Background glow */}
        <div style={{
          position: 'absolute', width: 800, height: 400, borderRadius: '50%',
          top: 0, left: '50%', transform: 'translateX(-50%)',
          background: 'radial-gradient(ellipse, rgba(201,255,0,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(201,255,0,0.08)', border: '1px solid rgba(201,255,0,0.2)',
            borderRadius: 100, padding: '6px 20px', marginBottom: 28,
          }}>
            <span style={{ color: 'var(--accent)', fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>
              Simple, Transparent Pricing
            </span>
          </div>

          <h1 className="font-display" style={{
            fontSize: 'clamp(56px, 9vw, 108px)',
            letterSpacing: 3, lineHeight: 0.95, marginBottom: 20,
          }}>
            INVEST IN
            <br />
            <span style={{ color: 'var(--accent)' }}>YOURSELF</span>
          </h1>

          <p style={{ color: '#666', fontSize: 18, maxWidth: 480, margin: '0 auto 48px', lineHeight: 1.7 }}>
            No contracts. No hidden fees. Cancel anytime. Your 14-day free trial starts the moment you sign up.
          </p>

          {/* Billing toggle */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 16,
            background: '#0f0f0f', border: '1px solid #1a1a1a',
            borderRadius: 100, padding: '6px 8px 6px 20px',
          }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: annual ? '#555' : '#fff', transition: 'color 0.2s' }}>
              Monthly
            </span>
            <div
              onClick={() => setAnnual(!annual)}
              style={{
                width: 52, height: 28, borderRadius: 100,
                background: annual ? 'var(--accent)' : '#222',
                cursor: 'pointer', position: 'relative',
                transition: 'background 0.3s', border: '1px solid #333',
                flexShrink: 0,
              }}
            >
              <div style={{
                position: 'absolute', top: 3,
                left: annual ? 26 : 3,
                width: 20, height: 20, borderRadius: '50%',
                background: annual ? '#000' : '#666',
                transition: 'left 0.3s',
              }} />
            </div>
            <span style={{ fontSize: 14, fontWeight: 600, color: annual ? '#fff' : '#555', transition: 'color 0.2s' }}>
              Annual
            </span>
            <div style={{
              background: 'rgba(201,255,0,0.12)', border: '1px solid rgba(201,255,0,0.3)',
              borderRadius: 100, padding: '4px 14px',
              color: 'var(--accent)', fontSize: 11, fontWeight: 800, letterSpacing: 1,
            }}>
              SAVE 20%
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing Cards ── */}
      <section style={{ padding: '0 5% 100px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 24, alignItems: 'stretch',
          }}>
            {tiers.map((tier) => {
              const price = annual ? tier.annualPrice : tier.monthlyPrice
              const isHovered = hoveredTier === tier.id

              return (
                <div
                  key={tier.id}
                  className={tier.highlight ? 'pricing-highlight' : ''}
                  onMouseEnter={() => setHoveredTier(tier.id)}
                  onMouseLeave={() => setHoveredTier(null)}
                  style={{
                    position: 'relative',
                    background: tier.highlight ? tier.color : '#0f0f0f',
                    border: `1px solid ${tier.highlight ? 'transparent' : isHovered ? '#333' : '#1a1a1a'}`,
                    borderRadius: 24,
                    padding: 36,
                    display: 'flex', flexDirection: 'column',
                    transform: tier.highlight ? 'translateY(-12px)' : isHovered ? 'translateY(-4px)' : 'none',
                    boxShadow: tier.highlight
                      ? '0 32px 80px rgba(201,255,0,0.2)'
                      : isHovered ? '0 16px 48px rgba(0,0,0,0.4)' : 'none',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {/* Badge */}
                  {tier.badge && (
                    <div style={{
                      position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
                      background: tier.highlight ? '#000' : '#1a1a1a',
                      border: `1px solid ${tier.highlight ? 'transparent' : '#333'}`,
                      color: tier.highlight ? 'var(--accent)' : '#aaa',
                      fontSize: 11, fontWeight: 800, letterSpacing: 2,
                      padding: '5px 18px', borderRadius: 100, whiteSpace: 'nowrap',
                      textTransform: 'uppercase',
                    }}>
                      {tier.badge}
                    </div>
                  )}

                  {/* Tier name */}
                  <div style={{
                    fontSize: 12, fontWeight: 800, letterSpacing: 4,
                    textTransform: 'uppercase', marginBottom: 24,
                    color: tier.highlight ? '#000' : tier.color,
                  }}>
                    {tier.name}
                  </div>

                  {/* Price */}
                  <div style={{ marginBottom: 8 }}>
                    {price === 0 ? (
                      <span className="font-display" style={{
                        fontSize: 64, letterSpacing: 1,
                        color: tier.highlight ? '#000' : '#fff',
                      }}>FREE</span>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4 }}>
                        <span style={{ fontSize: 20, color: tier.highlight ? '#333' : '#555', marginBottom: 12 }}>₹</span>
                        <span className="font-display" style={{
                          fontSize: 64, letterSpacing: 1, lineHeight: 1,
                          color: tier.highlight ? '#000' : '#fff',
                        }}>
                          {price.toLocaleString('en-IN')}
                        </span>
                        <span style={{ color: tier.highlight ? '#333' : '#555', fontSize: 14, marginBottom: 10 }}>
                          /mo
                        </span>
                      </div>
                    )}
                    {annual && price > 0 && (
                      <div style={{
                        fontSize: 13, color: tier.highlight ? '#333' : '#555', marginTop: 4,
                      }}>
                        Billed ₹{(price * 12).toLocaleString('en-IN')}/year
                      </div>
                    )}
                  </div>

                  <p style={{
                    color: tier.highlight ? '#333' : '#555',
                    fontSize: 14, lineHeight: 1.6, marginBottom: 32,
                  }}>
                    {tier.description}
                  </p>

                  {/* Divider */}
                  <div style={{ height: 1, background: tier.highlight ? 'rgba(0,0,0,0.15)' : '#1a1a1a', marginBottom: 28 }} />

                  {/* Features */}
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 36px', display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
                    {features.filter(f => f[tier.id as keyof Feature] !== false).map((f) => (
                      <li key={f.name} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{
                          width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                          background: tier.highlight ? 'rgba(0,0,0,0.15)' : 'rgba(201,255,0,0.1)',
                          border: `1px solid ${tier.highlight ? 'rgba(0,0,0,0.2)' : 'rgba(201,255,0,0.3)'}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <span style={{ fontSize: 11, color: tier.highlight ? '#000' : 'var(--accent)', fontWeight: 800 }}>✓</span>
                        </div>
                        <span style={{ fontSize: 14, color: tier.highlight ? '#111' : '#aaa' }}>
                          {typeof f[tier.id as keyof Feature] === 'string' && f[tier.id as keyof Feature] !== 'true'
                            ? `${f.name} (${f[tier.id as keyof Feature]})`
                            : f.name}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link href={tier.ctaHref} style={{ textDecoration: 'none' }}>
                    <div style={{
                      background: tier.highlight ? '#000' : 'transparent',
                      border: `2px solid ${tier.highlight ? 'transparent' : tier.color}`,
                      color: tier.highlight ? 'var(--accent)' : tier.color,
                      borderRadius: 14, padding: '16px 0',
                      textAlign: 'center', fontWeight: 800,
                      fontSize: 14, letterSpacing: 2,
                      textTransform: 'uppercase', cursor: 'pointer',
                      transition: 'all 0.25s',
                    }}
                      onMouseEnter={e => {
                        if (!tier.highlight) {
                          e.currentTarget.style.background = tier.color
                          e.currentTarget.style.color = '#000'
                        }
                      }}
                      onMouseLeave={e => {
                        if (!tier.highlight) {
                          e.currentTarget.style.background = 'transparent'
                          e.currentTarget.style.color = tier.color
                        }
                      }}
                    >
                      {tier.cta} →
                    </div>
                  </Link>

                  {tier.id !== 'free' && (
                    <p style={{ textAlign: 'center', fontSize: 12, color: tier.highlight ? '#444' : '#444', marginTop: 14 }}>
                      14-day free trial · No credit card required
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Full Comparison Table ── */}
      <section style={{ padding: '80px 5%', background: '#050505' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span style={{ color: 'var(--accent)', fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase' }}>
              Side by Side
            </span>
            <h2 className="font-display" style={{ fontSize: 'clamp(36px, 5vw, 56px)', marginTop: 12, letterSpacing: 2 }}>
              FULL COMPARISON
            </h2>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '0 0 24px', color: '#444', fontSize: 13, fontWeight: 600, width: '40%' }}>
                    Feature
                  </th>
                  {['FREE', 'PRO', 'ELITE'].map((t) => (
                    <th key={t} style={{ textAlign: 'center', padding: '0 0 24px', width: '20%' }}>
                      <span className="font-display" style={{
                        fontSize: 22, letterSpacing: 3,
                        color: t === 'PRO' ? 'var(--accent)' : t === 'ELITE' ? '#A78BFA' : '#555',
                      }}>
                        {t}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((f, i) => (
                  <tr key={f.name} style={{ borderTop: '1px solid #111' }}>
                    <td style={{
                      padding: '16px 0', fontSize: 14,
                      color: '#888', fontWeight: 500,
                    }}>
                      {f.name}
                    </td>
                    <td style={{ textAlign: 'center', padding: '16px 0' }}>
                      <FeatureValue val={f.free} />
                    </td>
                    <td style={{ textAlign: 'center', padding: '16px 0' }}>
                      <FeatureValue val={f.pro} />
                    </td>
                    <td style={{ textAlign: 'center', padding: '16px 0' }}>
                      <FeatureValue val={f.elite} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Social Proof Strip ── */}
      <section style={{ padding: '60px 5%', borderTop: '1px solid #111', borderBottom: '1px solid #111' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 40, textAlign: 'center',
          }}>
            {[
              { val: '12,400+', label: 'Active Members' },
              { val: '₹0', label: 'Hidden Fees' },
              { val: '14 Days', label: 'Free Trial' },
              { val: '4.9★', label: 'App Store Rating' },
              { val: '24/7', label: 'AI Support (ELITE)' },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-display" style={{ fontSize: 40, color: 'var(--accent)', letterSpacing: 2 }}>{s.val}</div>
                <div style={{ fontSize: 12, color: '#555', letterSpacing: 2, textTransform: 'uppercase', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: '100px 5%' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <span style={{ color: 'var(--accent)', fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase' }}>
              Got Questions?
            </span>
            <h2 className="font-display" style={{ fontSize: 'clamp(36px, 5vw, 56px)', marginTop: 12, letterSpacing: 2 }}>
              FREQUENTLY ASKED
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {faqs.map((faq) => (
              <FAQItem key={faq.q} faq={faq} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <p style={{ color: '#555', fontSize: 15, marginBottom: 20 }}>
              Still have questions? We&apos;re happy to help.
            </p>
            <Link href="/contact" style={{
              color: 'var(--accent)', textDecoration: 'none',
              fontSize: 14, fontWeight: 700, letterSpacing: 1,
              border: '1px solid rgba(201,255,0,0.3)',
              padding: '12px 32px', borderRadius: 10,
              transition: 'all 0.2s', display: 'inline-block',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(201,255,0,0.08)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent'
              }}
            >
              Contact Support →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section style={{ padding: '60px 5% 100px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{
            background: 'linear-gradient(135deg, #0f0f0f, #161616)',
            border: '1px solid #222', borderRadius: 32,
            padding: 'clamp(40px, 6vw, 80px)',
            textAlign: 'center', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', width: 400, height: 200,
              top: -100, left: '50%', transform: 'translateX(-50%)',
              background: 'radial-gradient(ellipse, rgba(201,255,0,0.08) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 className="font-display" style={{ fontSize: 'clamp(36px, 5vw, 60px)', letterSpacing: 2, marginBottom: 16 }}>
                START FREE TODAY
              </h2>
              <p style={{ color: '#666', fontSize: 16, marginBottom: 36, maxWidth: 420, margin: '0 auto 36px' }}>
                14 days free on any plan. No credit card. Cancel whenever. What are you waiting for?
              </p>
              <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/checkout?plan=pro" style={{
                  background: 'var(--accent)', color: '#000',
                  padding: '16px 40px', borderRadius: 12,
                  textDecoration: 'none', fontSize: 14,
                  fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase',
                  transition: 'all 0.2s', display: 'inline-block',
                }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 32px rgba(201,255,0,0.35)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                >
                  Try PRO Free →
                </Link>
                <Link href="/register" style={{
                  background: 'transparent', border: '1px solid #333', color: '#aaa',
                  padding: '16px 40px', borderRadius: 12,
                  textDecoration: 'none', fontSize: 14,
                  fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase',
                  display: 'inline-block', transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#555'; e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#333'; e.currentTarget.style.color = '#aaa' }}
                >
                  Stay Free
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}