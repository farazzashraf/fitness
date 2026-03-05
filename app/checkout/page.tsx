'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

const plans = {
  pro: { name: 'PRO', price: 2499, annual: 23990, features: ['200+ video classes', 'Recorded replays', 'Progress tracking', 'Nutrition guides', 'Priority support'] },
  elite: { name: 'ELITE', price: 4999, annual: 47990, features: ['Everything in PRO', 'Daily live classes', 'AI coaching Q&A', '1-on-1 check-in', 'Exclusive events'] },
}

function CheckoutContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialPlanKey = (searchParams.get('plan') || 'pro') as keyof typeof plans
  const [planKey, setPlanKey] = useState<keyof typeof plans>(initialPlanKey)
  const plan = plans[planKey] || plans.pro

  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly')
  const [step, setStep] = useState<'payment' | 'processing' | 'success'>('payment')

  // Card fields
  const [cardName, setCardName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const price = billing === 'annual' ? plan.annual : plan.price
  const perMonth = billing === 'annual' ? Math.round(plan.annual / 12) : plan.price

  const formatCard = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 16)
    return digits.replace(/(.{4})/g, '$1 ').trim()
  }

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 4)
    if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2)
    return digits
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!cardName) e.cardName = 'Name is required'
    if (cardNumber.replace(/\s/g, '').length < 16) e.cardNumber = 'Enter a valid 16-digit card number'
    if (expiry.length < 5) e.expiry = 'Enter a valid expiry date'
    if (cvv.length < 3) e.cvv = 'Enter a valid CVV'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handlePay = async () => {
    if (!validate()) return
    setStep('processing')
    await new Promise(r => setTimeout(r, 2200))
    setStep('success')
  }

  // ── Success Screen ────────────────────────────────────────────────────────
  if (step === 'success') {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{ textAlign: 'center', maxWidth: 480 }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%', margin: '0 auto 28px',
            background: 'rgba(201,255,0,0.1)', border: '2px solid var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 36, animation: 'popIn 0.4s ease',
          }}>✓</div>

          <h1 className="font-display" style={{ fontSize: 56, letterSpacing: 2, marginBottom: 12 }}>
            YOU&apos;RE IN!
          </h1>
          <p style={{ color: '#666', fontSize: 16, lineHeight: 1.7, marginBottom: 12 }}>
            Welcome to APEX <span style={{ color: 'var(--accent)', fontWeight: 700 }}>{plan.name}</span>.
            Your 14-day free trial has started.
          </p>
          <p style={{ color: '#444', fontSize: 14, marginBottom: 40 }}>
            A confirmation has been sent to your email.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <Link href="/dashboard" style={{
              background: 'var(--accent)', color: '#000',
              padding: '14px 36px', borderRadius: 12, textDecoration: 'none',
              fontSize: 14, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase',
            }}>
              Go to Dashboard →
            </Link>
          </div>
        </div>
        <style>{`@keyframes popIn { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }`}</style>
      </div>
    )
  }

  // ── Processing Screen ─────────────────────────────────────────────────────
  if (step === 'processing') {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 64, height: 64, border: '3px solid #1a1a1a',
            borderTopColor: 'var(--accent)', borderRadius: '50%',
            margin: '0 auto 24px', animation: 'spin 0.8s linear infinite',
          }} />
          <p style={{ color: '#888', fontSize: 16, fontWeight: 600 }}>Processing payment...</p>
          <p style={{ color: '#444', fontSize: 13, marginTop: 8 }}>Please don&apos;t close this window</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  // ── Payment Form ──────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: '#fff' }}>
      {/* Nav */}
      <nav style={{
        borderBottom: '1px solid #1a1a1a', padding: '0 5%',
        background: 'rgba(8,8,8,0.97)', backdropFilter: 'blur(12px)',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 34, height: 34, background: 'var(--accent)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="font-display" style={{ color: '#000', fontSize: 18 }}>A</span>
            </div>
            <span className="font-display" style={{ fontSize: 26, letterSpacing: 4 }}>APEX</span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#555' }}>
            <span style={{ fontSize: 16 }}>🔒</span> Secure Checkout
          </div>
        </div>
      </nav>

      <div className="checkout-layout" style={{ maxWidth: 1000, margin: '0 auto', padding: '48px 5%', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) clamp(280px, 30vw, 380px)', gap: 40 }}>

        {/* ── Left: Payment Form ── */}
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>Complete your order</h1>
          <p style={{ color: '#555', fontSize: 14, marginBottom: 36 }}>14-day free trial -no charge today</p>

          {/* Billing toggle */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#666', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>
              Billing Period
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              {(['monthly', 'annual'] as const).map(b => (
                <button key={b} onClick={() => setBilling(b)} style={{
                  flex: 1, padding: '13px 0',
                  background: billing === b ? 'rgba(201,255,0,0.08)' : '#0f0f0f',
                  border: `1px solid ${billing === b ? 'rgba(201,255,0,0.35)' : '#222'}`,
                  borderRadius: 12, color: billing === b ? 'var(--accent)' : '#555',
                  fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
                  textTransform: 'capitalize',
                }}>
                  {b === 'annual'
                    ? <span>Annual <span style={{ background: 'rgba(201,255,0,0.15)', color: 'var(--accent)', fontSize: 10, padding: '2px 7px', borderRadius: 100, marginLeft: 6, fontWeight: 800 }}>SAVE 20%</span></span>
                    : 'Monthly'}
                </button>
              ))}
            </div>
          </div>

          {/* Card details */}
          <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 20, padding: 28, marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>💳</span> Card Details
            </div>

            {/* Cardholder name */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#666', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>
                Cardholder Name
              </label>
              <input
                value={cardName} onChange={e => setCardName(e.target.value)}
                placeholder="Name on card"
                style={{
                  width: '100%', background: '#141414',
                  border: `1px solid ${errors.cardName ? 'rgba(239,68,68,0.5)' : '#222'}`,
                  borderRadius: 12, padding: '13px 16px', color: '#fff',
                  fontSize: 14, outline: 'none', boxSizing: 'border-box',
                }}
                onFocus={e => (e.target.style.borderColor = 'rgba(201,255,0,0.4)')}
                onBlur={e => (e.target.style.borderColor = errors.cardName ? 'rgba(239,68,68,0.5)' : '#222')}
              />
              {errors.cardName && <p style={{ color: '#f87171', fontSize: 12, marginTop: 4 }}>{errors.cardName}</p>}
            </div>

            {/* Card number */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#666', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>
                Card Number
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  value={cardNumber}
                  onChange={e => setCardNumber(formatCard(e.target.value))}
                  placeholder="1234 5678 9012 3456"
                  style={{
                    width: '100%', background: '#141414',
                    border: `1px solid ${errors.cardNumber ? 'rgba(239,68,68,0.5)' : '#222'}`,
                    borderRadius: 12, padding: '13px 52px 13px 16px', color: '#fff',
                    fontSize: 14, outline: 'none', boxSizing: 'border-box', letterSpacing: 2,
                  }}
                  onFocus={e => (e.target.style.borderColor = 'rgba(201,255,0,0.4)')}
                  onBlur={e => (e.target.style.borderColor = errors.cardNumber ? 'rgba(239,68,68,0.5)' : '#222')}
                />
                <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 20 }}>
                  {cardNumber.startsWith('4') ? '💳' : cardNumber.startsWith('5') ? '💳' : '💳'}
                </span>
              </div>
              {errors.cardNumber && <p style={{ color: '#f87171', fontSize: 12, marginTop: 4 }}>{errors.cardNumber}</p>}
            </div>

            {/* Expiry + CVV */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#666', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>
                  Expiry Date
                </label>
                <input
                  value={expiry} onChange={e => setExpiry(formatExpiry(e.target.value))}
                  placeholder="MM/YY"
                  style={{
                    width: '100%', background: '#141414',
                    border: `1px solid ${errors.expiry ? 'rgba(239,68,68,0.5)' : '#222'}`,
                    borderRadius: 12, padding: '13px 16px', color: '#fff',
                    fontSize: 14, outline: 'none', boxSizing: 'border-box',
                  }}
                  onFocus={e => (e.target.style.borderColor = 'rgba(201,255,0,0.4)')}
                  onBlur={e => (e.target.style.borderColor = errors.expiry ? 'rgba(239,68,68,0.5)' : '#222')}
                />
                {errors.expiry && <p style={{ color: '#f87171', fontSize: 12, marginTop: 4 }}>{errors.expiry}</p>}
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#666', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>
                  CVV
                </label>
                <input
                  value={cvv} onChange={e => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  placeholder="•••"
                  style={{
                    width: '100%', background: '#141414',
                    border: `1px solid ${errors.cvv ? 'rgba(239,68,68,0.5)' : '#222'}`,
                    borderRadius: 12, padding: '13px 16px', color: '#fff',
                    fontSize: 14, outline: 'none', boxSizing: 'border-box',
                  }}
                  onFocus={e => (e.target.style.borderColor = 'rgba(201,255,0,0.4)')}
                  onBlur={e => (e.target.style.borderColor = errors.cvv ? 'rgba(239,68,68,0.5)' : '#222')}
                />
                {errors.cvv && <p style={{ color: '#f87171', fontSize: 12, marginTop: 4 }}>{errors.cvv}</p>}
              </div>
            </div>
          </div>

          {/* UPI option */}
          <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 20, padding: '20px 24px', marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 20 }}>📱</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>Pay via UPI</div>
                  <div style={{ fontSize: 12, color: '#555', marginTop: 2 }}>GPay, PhonePe, Paytm and more</div>
                </div>
              </div>
              <div style={{
                border: '1px solid #333', borderRadius: 8,
                padding: '6px 14px', fontSize: 12, color: '#555', cursor: 'pointer',
              }}>Use Instead</div>
            </div>
          </div>

          {/* Pay button */}
          <button
            onClick={handlePay}
            style={{
              width: '100%', background: 'var(--accent)', color: '#000',
              border: 'none', borderRadius: 14, padding: '17px 0',
              fontSize: 15, fontWeight: 800, letterSpacing: 2,
              textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 32px rgba(201,255,0,0.35)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
          >
            🔒 Start Free Trial -Pay Nothing Today
          </button>

          <p style={{ textAlign: 'center', fontSize: 12, color: '#444', marginTop: 14 }}>
            You won&apos;t be charged until your 14-day trial ends. Cancel anytime.
          </p>
        </div>

        {/* ── Right: Order Summary ── */}
        <div>
          <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 20, padding: 28, position: 'sticky', top: 88 }}>
            <div style={{ fontSize: 12, color: '#555', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 20 }}>Order Summary</div>

            {/* Plan Selection */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
              {(Object.keys(plans) as Array<keyof typeof plans>).map(k => (
                <button key={k} onClick={() => setPlanKey(k)} style={{
                  padding: '14px 0',
                  background: planKey === k ? 'rgba(201,255,0,0.08)' : '#0f0f0f',
                  border: `1px solid ${planKey === k ? 'var(--accent)' : '#222'}`,
                  borderRadius: 12, color: planKey === k ? '#fff' : '#666',
                  fontSize: 14, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4
                }}>
                  <span style={{ color: planKey === k ? 'var(--accent)' : '#aaa' }}>APEX {plans[k].name}</span>
                  <span style={{ fontSize: 12, fontWeight: 400 }}>
                    ₹{(billing === 'annual' ? plans[k].annual : plans[k].price).toLocaleString('en-IN')}/{billing === 'annual' ? 'yr' : 'mo'}
                  </span>
                </button>
              ))}
            </div>

            {/* Features */}
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {plan.features.map(f => (
                <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
                  <span style={{ color: 'var(--accent)', fontWeight: 800 }}>✓</span>
                  <span style={{ color: '#888' }}>{f}</span>
                </li>
              ))}
            </ul>

            <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: 20 }}>
              {/* Trial notice */}
              <div style={{
                background: 'rgba(201,255,0,0.05)', border: '1px solid rgba(201,255,0,0.15)',
                borderRadius: 10, padding: '12px 14px', marginBottom: 16,
                fontSize: 12, color: '#888', lineHeight: 1.6,
              }}>
                🎁 14-day free trial. First charge after trial ends.
              </div>

              {/* Price breakdown */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#666' }}>
                  <span>Subtotal</span>
                  <span>₹{price.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#666' }}>
                  <span>GST (18%)</span>
                  <span>₹{Math.round(price * 0.18).toLocaleString('en-IN')}</span>
                </div>
                {billing === 'annual' && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#4ade80' }}>
                    <span>Annual discount (20%)</span>
                    <span>-₹{Math.round(plan.price * 12 * 0.2).toLocaleString('en-IN')}</span>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #1a1a1a', paddingTop: 16 }}>
                <span style={{ fontWeight: 700 }}>Due today</span>
                <span className="font-display" style={{ fontSize: 28, color: 'var(--accent)', letterSpacing: 1 }}>₹0</span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #222', borderRadius: 8, padding: '12px 16px', marginTop: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, color: '#ccc', fontWeight: 600 }}>Total after 14-day trial</span>
                  <span style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>
                    ₹{(price + Math.round(price * 0.18)).toLocaleString('en-IN')}
                    <span style={{ fontSize: 12, color: '#666', fontWeight: 400 }}>/{billing === 'annual' ? 'yr' : 'mo'}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Trust badges */}
            <div style={{ display: 'flex', gap: 12, marginTop: 24, justifyContent: 'center' }}>
              {['🔒 Secure', '↩ Cancel anytime', '🏆 14-day trial'].map(b => (
                <span key={b} style={{ fontSize: 11, color: '#444' }}>{b}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#080808', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ color: '#555' }}>Loading...</div></div>}>
      <CheckoutContent />
    </Suspense>
  )
}