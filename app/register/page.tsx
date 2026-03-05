'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

const plans = [
  { id: 'PRO', label: 'Pro', price: '₹2,499/mo', desc: 'Full video library' },
  { id: 'ELITE', label: 'Elite', price: '₹4,999/mo', desc: 'Live classes + AI coaching' },
]

export default function RegisterPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultPlan = searchParams.get('plan')?.toUpperCase() || 'PRO'

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [plan, setPlan] = useState(defaultPlan)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [step, setStep] = useState<1 | 2>(1)

  const handleNext = () => {
    if (!name || !email || !password) return
    setStep(2)
  }

  const handleSubmit = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    router.push(`/checkout?plan=${plan.toLowerCase()}`)
  }

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px', position: 'relative', overflow: 'hidden',
    }}>
      {/* BG orbs */}
      <div style={{
        position: 'absolute', width: 500, height: 500, borderRadius: '50%',
        top: '-120px', left: '-120px',
        background: 'radial-gradient(circle, rgba(201,255,0,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', width: 400, height: 400, borderRadius: '50%',
        bottom: '-80px', right: '-80px',
        background: 'radial-gradient(circle, rgba(167,139,250,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ width: '100%', maxWidth: 480, position: 'relative', zIndex: 1 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 40, height: 40, background: 'var(--accent)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="font-display" style={{ color: '#000', fontSize: 22 }}>A</span>
            </div>
            <span className="font-display" style={{ fontSize: 32, letterSpacing: 4, color: '#fff' }}>APEX</span>
          </Link>
        </div>

        {/* Step indicator */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 32 }}>
          {[1, 2].map(s => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: step >= s ? 'var(--accent)' : '#1a1a1a',
                border: `1px solid ${step >= s ? 'transparent' : '#333'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 800,
                color: step >= s ? '#000' : '#555',
                transition: 'all 0.3s',
              }}>
                {step > s ? '✓' : s}
              </div>
              <span style={{ fontSize: 12, color: step >= s ? '#aaa' : '#444' }}>
                {s === 1 ? 'Your Details' : 'Pick a Plan'}
              </span>
              {s < 2 && <div style={{ width: 40, height: 1, background: step > s ? 'var(--accent)' : '#222', transition: 'background 0.3s' }} />}
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="auth-card" style={{ background: '#0f0f0f', border: '1px solid #1e1e1e', borderRadius: 24, padding: '24px' }}>

          {step === 1 && (
            <>
              <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6, textAlign: 'center' }}>Create your account</h1>
              <p style={{ color: '#555', fontSize: 14, textAlign: 'center', marginBottom: 32 }}>14-day free trial on all paid plans</p>

              {[
                { label: 'Full Name', value: name, setter: setName, type: 'text', placeholder: 'John Doe' },
                { label: 'Email', value: email, setter: setEmail, type: 'email', placeholder: 'you@example.com' },
              ].map(field => (
                <div key={field.label} style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#666', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    value={field.value}
                    onChange={e => field.setter(e.target.value)}
                    placeholder={field.placeholder}
                    style={{
                      width: '100%', background: '#141414', border: '1px solid #222',
                      borderRadius: 12, padding: '13px 16px', color: '#fff',
                      fontSize: 14, outline: 'none', transition: 'border-color 0.2s',
                      boxSizing: 'border-box',
                    }}
                    onFocus={e => (e.target.style.borderColor = 'rgba(201,255,0,0.4)')}
                    onBlur={e => (e.target.style.borderColor = '#222')}
                  />
                </div>
              ))}

              {/* Password */}
              <div style={{ marginBottom: 28 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#666', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                    style={{
                      width: '100%', background: '#141414', border: '1px solid #222',
                      borderRadius: 12, padding: '13px 48px 13px 16px', color: '#fff',
                      fontSize: 14, outline: 'none', transition: 'border-color 0.2s',
                      boxSizing: 'border-box',
                    }}
                    onFocus={e => (e.target.style.borderColor = 'rgba(201,255,0,0.4)')}
                    onBlur={e => (e.target.style.borderColor = '#222')}
                  />
                  <button onClick={() => setShowPassword(!showPassword)} style={{
                    position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: 16, padding: 0,
                  }}>
                    {showPassword ? '🙈' : '👁'}
                  </button>
                </div>
              </div>

              <button
                onClick={handleNext}
                disabled={!name || !email || !password}
                style={{
                  width: '100%', background: (!name || !email || !password) ? '#1a1a1a' : 'var(--accent)',
                  color: (!name || !email || !password) ? '#444' : '#000',
                  border: 'none', borderRadius: 12, padding: '15px 0',
                  fontSize: 14, fontWeight: 800, letterSpacing: 2,
                  textTransform: 'uppercase', cursor: (!name || !email || !password) ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { if (name && email && password) e.currentTarget.style.boxShadow = '0 8px 28px rgba(201,255,0,0.3)' }}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
              >
                Continue →
              </button>

              {/* Divider */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0' }}>
                <div style={{ flex: 1, height: 1, background: '#1e1e1e' }} />
                <span style={{ fontSize: 12, color: '#444' }}>OR</span>
                <div style={{ flex: 1, height: 1, background: '#1e1e1e' }} />
              </div>

              {[
                { icon: '🔵', label: 'Sign up with Google' },
                { icon: '⚫', label: 'Sign up with Apple' },
              ].map(s => (
                <button key={s.label} style={{
                  width: '100%', background: 'transparent', border: '1px solid #222',
                  borderRadius: 12, padding: '13px 0', color: '#aaa',
                  fontSize: 14, fontWeight: 600, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  marginBottom: 10, transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#333'; e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#222'; e.currentTarget.style.color = '#aaa' }}
                >
                  <span>{s.icon}</span>{s.label}
                </button>
              ))}
            </>
          )}

          {step === 2 && (
            <>
              <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6, textAlign: 'center' }}>Choose your plan</h1>
              <p style={{ color: '#555', fontSize: 14, textAlign: 'center', marginBottom: 28 }}>You can upgrade or downgrade anytime</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
                {plans.map(p => (
                  <div
                    key={p.id}
                    onClick={() => setPlan(p.id)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '16px 20px', borderRadius: 14, cursor: 'pointer',
                      border: `1px solid ${plan === p.id ? 'rgba(201,255,0,0.4)' : '#222'}`,
                      background: plan === p.id ? 'rgba(201,255,0,0.05)' : '#141414',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div style={{
                        width: 20, height: 20, borderRadius: '50%',
                        border: `2px solid ${plan === p.id ? 'var(--accent)' : '#444'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0, transition: 'all 0.2s',
                      }}>
                        {plan === p.id && <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--accent)' }} />}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 15, color: plan === p.id ? '#fff' : '#aaa' }}>{p.label}</div>
                        <div style={{ fontSize: 12, color: '#555', marginTop: 2 }}>{p.desc}</div>
                      </div>
                    </div>
                    <span style={{
                      fontSize: 14, fontWeight: 700,
                      color: plan === p.id ? 'var(--accent)' : '#555',
                    }}>{p.price}</span>
                  </div>
                ))}
              </div>

              <div style={{
                background: 'rgba(201,255,0,0.05)', border: '1px solid rgba(201,255,0,0.15)',
                borderRadius: 12, padding: '12px 16px', marginBottom: 24,
                fontSize: 13, color: '#888', lineHeight: 1.6,
              }}>
                ✓ 14-day free trial · No credit card charged today · Cancel anytime
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  onClick={() => setStep(1)}
                  style={{
                    flex: 1, background: 'transparent', border: '1px solid #222',
                    borderRadius: 12, padding: '15px 0', color: '#666',
                    fontSize: 14, fontWeight: 700, cursor: 'pointer',
                  }}
                >
                  ← Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  style={{
                    flex: 2, background: loading ? '#1a1a1a' : 'var(--accent)',
                    color: loading ? '#555' : '#000',
                    border: 'none', borderRadius: 12, padding: '15px 0',
                    fontSize: 14, fontWeight: 800, letterSpacing: 2,
                    textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  }}
                >
                  {loading ? (
                    <>
                      <span style={{
                        width: 16, height: 16, border: '2px solid #555',
                        borderTopColor: 'var(--accent)', borderRadius: '50%',
                        display: 'inline-block', animation: 'spin 0.7s linear infinite',
                      }} />
                      Creating...
                    </>
                  ) : 'Continue to Checkout →'}
                </button>
              </div>
            </>
          )}
        </div>

        <p style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: '#555' }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 700 }}>
            Sign in
          </Link>
        </p>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}