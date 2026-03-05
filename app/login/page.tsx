'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async () => {
    if (!email || !password) { setError('Please fill in all fields.'); return }
    setLoading(true)
    setError('')
    await new Promise(r => setTimeout(r, 900))

    const inputEmail = email.toLowerCase().trim()

    const users = [
      { email: process.env.NEXT_PUBLIC_ADMIN_EMAIL, password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD, plan: 'ADMIN', name: 'Admin' },
      { email: process.env.NEXT_PUBLIC_FREE_EMAIL, password: process.env.NEXT_PUBLIC_FREE_PASSWORD, plan: 'FREE', name: 'Alex Free' },
      { email: process.env.NEXT_PUBLIC_PRO_EMAIL, password: process.env.NEXT_PUBLIC_PRO_PASSWORD, plan: 'PRO', name: 'David Kim' },
      { email: process.env.NEXT_PUBLIC_ELITE_EMAIL, password: process.env.NEXT_PUBLIC_ELITE_PASSWORD, plan: 'ELITE', name: 'Aisha Patel' },
    ]

    const match = users.find(u => u.email === inputEmail && u.password === password)

    if (!match) {
      setError('Invalid email or password.')
      setLoading(false)
      return
    }

    if (match.plan === 'ADMIN') {
      router.push('/admin')
    } else {
      localStorage.setItem('apexUser', JSON.stringify({ name: match.name, email: match.email, plan: match.plan }))
      router.push('/dashboard')
    }
  }

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', top: '-100px', right: '-100px', background: 'radial-gradient(circle, rgba(201,255,0,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', bottom: '-80px', left: '-80px', background: 'radial-gradient(circle, rgba(167,139,250,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: 440, position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 40, height: 40, background: 'var(--accent)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="font-display" style={{ color: '#000', fontSize: 22 }}>A</span>
            </div>
            <span className="font-display" style={{ fontSize: 32, letterSpacing: 4, color: '#fff' }}>APEX</span>
          </Link>
        </div>

        <div className="auth-card" style={{ background: '#0f0f0f', border: '1px solid #1e1e1e', borderRadius: 24, padding: '24px' }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, textAlign: 'center' }}>Welcome back</h1>
          <p style={{ color: '#555', fontSize: 14, textAlign: 'center', marginBottom: 32 }}>Sign in to continue your training</p>

          {error && (
            <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 10, padding: '12px 16px', color: '#f87171', fontSize: 13, marginBottom: 20 }}>
              {error}
            </div>
          )}

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#666', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSubmit()} placeholder="you@apexfit.com"
              style={{ width: '100%', background: '#141414', border: '1px solid #222', borderRadius: 12, padding: '13px 16px', color: '#fff', fontSize: 14, outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box' }}
              onFocus={e => (e.target.style.borderColor = 'rgba(201,255,0,0.4)')} onBlur={e => (e.target.style.borderColor = '#222')}
            />
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#666', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSubmit()} placeholder="••••••••"
                style={{ width: '100%', background: '#141414', border: '1px solid #222', borderRadius: 12, padding: '13px 48px 13px 16px', color: '#fff', fontSize: 14, outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box' }}
                onFocus={e => (e.target.style.borderColor = 'rgba(201,255,0,0.4)')} onBlur={e => (e.target.style.borderColor = '#222')}
              />
              <button onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: 16, padding: 0 }}>
                {showPassword ? '🙈' : '👁'}
              </button>
            </div>
          </div>

          <div style={{ textAlign: 'right', marginBottom: 28 }}>
            <span style={{ fontSize: 13, color: '#555', cursor: 'pointer' }} onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')} onMouseLeave={e => (e.currentTarget.style.color = '#555')}>
              Forgot password?
            </span>
          </div>

          <button onClick={handleSubmit} disabled={loading} style={{
            width: '100%', background: loading ? '#1a1a1a' : 'var(--accent)', color: loading ? '#555' : '#000',
            border: 'none', borderRadius: 12, padding: '15px 0', fontSize: 14, fontWeight: 800, letterSpacing: 2,
            textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.boxShadow = '0 8px 28px rgba(201,255,0,0.3)' }}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
          >
            {loading ? (
              <><span style={{ width: 16, height: 16, border: '2px solid #555', borderTopColor: 'var(--accent)', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />Signing in...</>
            ) : 'Sign In →'}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '28px 0' }}>
            <div style={{ flex: 1, height: 1, background: '#1e1e1e' }} />
            <span style={{ fontSize: 12, color: '#444' }}>OR</span>
            <div style={{ flex: 1, height: 1, background: '#1e1e1e' }} />
          </div>

          {[{ icon: '🔵', label: 'Continue with Google' }, { icon: '⚫', label: 'Continue with Apple' }].map(s => (
            <button key={s.label} style={{
              width: '100%', background: 'transparent', border: '1px solid #222', borderRadius: 12,
              padding: '13px 0', color: '#aaa', fontSize: 14, fontWeight: 600, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 10, transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#333'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#222'; e.currentTarget.style.color = '#aaa' }}
            ><span>{s.icon}</span> {s.label}</button>
          ))}
        </div>

        <p style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: '#555' }}>
          Don&apos;t have an account?{' '}
          <Link href="/register" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 700 }}>Sign up free</Link>
        </p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}