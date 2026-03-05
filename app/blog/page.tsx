'use client'

import { useState } from 'react'
import Link from 'next/link'

const NAV_LINKS = [['Classes', '/classes'], ['Pricing', '/pricing'], ['About', '/about'], ['Blog', '/blog']]

const posts = [
  {
    id: 1,
    slug: 'progressive-overload-guide',
    title: 'The Only Progressive Overload Guide You\'ll Ever Need',
    excerpt: 'Most people plateau because they don\'t understand progressive overload. Here\'s the science, the methods, and the exact framework we use in Iron Strength.',
    author: 'Jake Monroe',
    initials: 'JM',
    authorColor: '#C9FF00',
    date: 'Jan 28, 2025',
    readTime: '8 min read',
    category: 'Strength',
    categoryColor: '#C9FF00',
    emoji: '💪',
    featured: true,
  },
  {
    id: 2,
    slug: 'hiit-vs-steady-state',
    title: 'HIIT vs Steady-State Cardio: Which Actually Burns More Fat?',
    excerpt: 'The internet has been arguing about this for a decade. We looked at the actual research and here\'s what the science says -and what it means for your training.',
    author: 'Marcus Cole',
    initials: 'MC',
    authorColor: '#EA580C',
    date: 'Jan 20, 2025',
    readTime: '6 min read',
    category: 'HIIT',
    categoryColor: '#EA580C',
    emoji: '🔥',
    featured: false,
  },
  {
    id: 3,
    slug: 'yoga-for-athletes',
    title: 'Why Every Serious Athlete Should Be Doing Yoga',
    excerpt: 'Flexibility training isn\'t just for yogis. The mobility, breath control, and recovery benefits of yoga have made it essential training for elite athletes worldwide.',
    author: 'Priya Sharma',
    initials: 'PS',
    authorColor: '#7C3AED',
    date: 'Jan 14, 2025',
    readTime: '5 min read',
    category: 'Yoga',
    categoryColor: '#7C3AED',
    emoji: '🧘',
    featured: false,
  },
  {
    id: 4,
    slug: 'core-vs-abs',
    title: 'Core Strength vs Ab Strength: They\'re Not the Same Thing',
    excerpt: 'Six-pack abs and a strong core are not the same thing. Understanding the difference will completely change how you train -and how you feel.',
    author: 'Sofia Reyes',
    initials: 'SR',
    authorColor: '#0891B2',
    date: 'Jan 7, 2025',
    readTime: '7 min read',
    category: 'Pilates',
    categoryColor: '#0891B2',
    emoji: '⚡',
    featured: false,
  },
  {
    id: 5,
    slug: 'nutrition-basics',
    title: 'Nutrition 101: What to Eat Before and After a Workout',
    excerpt: 'You can\'t out-train a bad diet. But you also don\'t need to obsess over every macro. Here\'s the simple framework we recommend to all APEX members.',
    author: 'Marcus Cole',
    initials: 'MC',
    authorColor: '#EA580C',
    date: 'Dec 30, 2024',
    readTime: '9 min read',
    category: 'Nutrition',
    categoryColor: '#4ade80',
    emoji: '🥗',
    featured: false,
  },
  {
    id: 6,
    slug: 'recovery-science',
    title: 'The Science of Recovery: Why Rest Days Are Part of Training',
    excerpt: 'Rest days aren\'t lazy. They\'re where adaptation happens. Here\'s what your body is actually doing on your days off -and how to optimize recovery.',
    author: 'Priya Sharma',
    initials: 'PS',
    authorColor: '#7C3AED',
    date: 'Dec 22, 2024',
    readTime: '6 min read',
    category: 'Wellness',
    categoryColor: '#A78BFA',
    emoji: '😴',
    featured: false,
  },
  {
    id: 7,
    slug: 'beginner-mistakes',
    title: '7 Mistakes Every Fitness Beginner Makes (And How to Avoid Them)',
    excerpt: 'Starting a fitness journey is hard. Starting one with bad habits is even harder to fix later. Here are the most common mistakes we see -and exactly how to avoid them.',
    author: 'Sofia Reyes',
    initials: 'SR',
    authorColor: '#0891B2',
    date: 'Dec 15, 2024',
    readTime: '10 min read',
    category: 'Beginner',
    categoryColor: '#F59E0B',
    emoji: '🎯',
    featured: false,
  },
  {
    id: 8,
    slug: 'consistency-over-intensity',
    title: 'Consistency Beats Intensity: Why Showing Up Matters More',
    excerpt: 'The best workout is the one you actually do. Here\'s the psychology behind building a sustainable training habit -backed by behavioural science.',
    author: 'Jake Monroe',
    initials: 'JM',
    authorColor: '#C9FF00',
    date: 'Dec 8, 2024',
    readTime: '5 min read',
    category: 'Mindset',
    categoryColor: '#60A5FA',
    emoji: '🧠',
    featured: false,
  },
]

const categories = ['All', 'Strength', 'HIIT', 'Yoga', 'Pilates', 'Nutrition', 'Wellness', 'Beginner', 'Mindset']

function MobileNav({ active }: { active: string }) {
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

export default function BlogPage() {
  const [filter, setFilter] = useState('All')
  const [hovered, setHovered] = useState<number | null>(null)

  const featured = posts.find(p => p.featured)!
  const rest = posts.filter(p => !p.featured)
  const filteredRest = filter === 'All' ? rest : rest.filter(p => p.category === filter)

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', color: '#fff' }}>

      {/* Navbar */}
      <MobileNav active="Blog" />

      {/* Hero */}
      <section style={{ paddingTop: 72, padding: '120px 5% 80px', position: 'relative', overflow: 'hidden', borderBottom: '1px solid #111' }}>
        <div style={{ position: 'absolute', width: 600, height: 400, top: 0, left: '50%', transform: 'translateX(-50%)', background: 'radial-gradient(ellipse, rgba(201,255,0,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(201,255,0,0.08)', border: '1px solid rgba(201,255,0,0.2)', borderRadius: 100, padding: '5px 16px', marginBottom: 20 }}>
            <span style={{ color: 'var(--accent)', fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>Training Intel</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}>
            <h1 className="font-display" style={{ fontSize: 'clamp(52px, 8vw, 96px)', letterSpacing: 2, lineHeight: 0.95 }}>
              THE APEX<br /><span style={{ color: 'var(--accent)' }}>BLOG</span>
            </h1>
            <p style={{ color: '#555', fontSize: 15, maxWidth: 400, lineHeight: 1.7 }}>
              Science-backed training advice, nutrition guides, and mindset content from our team of expert coaches.
            </p>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(32px, 5vw, 60px) 5% clamp(60px, 8vw, 100px)' }}>

        {/* Featured post */}
        <div style={{ marginBottom: 60 }}>
          <div style={{ fontSize: 11, color: '#555', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 20 }}>Featured Article</div>
          <div
            className='blog-featured-grid' style={{
              background: '#0f0f0f', border: `1px solid ${hovered === 0 ? 'rgba(201,255,0,0.25)' : '#1a1a1a'}`,
              borderRadius: 24, padding: '36px 40px', cursor: 'pointer',
              transition: 'all 0.25s', display: 'grid',
              gridTemplateColumns: '1fr 320px', gap: 48, alignItems: 'center',
              transform: hovered === 0 ? 'translateY(-4px)' : 'none',
              boxShadow: hovered === 0 ? '0 20px 60px rgba(201,255,0,0.08)' : 'none',
            }}
            onMouseEnter={() => setHovered(0)}
            onMouseLeave={() => setHovered(null)}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: featured.categoryColor, background: `${featured.categoryColor}15`, border: `1px solid ${featured.categoryColor}35`, borderRadius: 100, padding: '4px 12px', textTransform: 'uppercase' }}>
                  {featured.category}
                </span>
                <span style={{ fontSize: 12, color: '#555' }}>{featured.readTime}</span>
              </div>
              <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, lineHeight: 1.3, marginBottom: 16 }}>
                {featured.title}
              </h2>
              <p style={{ color: '#777', fontSize: 15, lineHeight: 1.8, marginBottom: 28 }}>{featured.excerpt}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: `linear-gradient(135deg, ${featured.authorColor}, ${featured.authorColor}60)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: featured.authorColor === '#C9FF00' ? '#000' : '#fff' }}>
                  {featured.initials}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{featured.author}</div>
                  <div style={{ fontSize: 11, color: '#555', marginTop: 1 }}>{featured.date}</div>
                </div>
                <div style={{ marginLeft: 'auto', color: 'var(--accent)', fontSize: 14, fontWeight: 700 }}>Read Article →</div>
              </div>
            </div>
            {/* Thumbnail placeholder */}
            <div className='blog-featured-thumb' style={{
              height: 200, borderRadius: 16,
              background: `linear-gradient(135deg, ${featured.categoryColor}20, #111)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 72, border: `1px solid ${featured.categoryColor}20`,
            }}>
              {featured.emoji}
            </div>
          </div>
        </div>

        {/* Category filter */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 36, flexWrap: 'wrap' }}>
          {categories.map(c => (
            <button key={c} onClick={() => setFilter(c)} style={{
              background: filter === c ? 'rgba(201,255,0,0.1)' : 'transparent',
              border: `1px solid ${filter === c ? 'rgba(201,255,0,0.35)' : '#222'}`,
              color: filter === c ? 'var(--accent)' : '#555',
              borderRadius: 100, padding: '7px 18px',
              fontSize: 12, fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s',
            }}>{c}</button>
          ))}
        </div>

        {/* Posts grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
          {filteredRest.map(post => (
            <div
              key={post.id}
              style={{
                background: '#0f0f0f', border: `1px solid ${hovered === post.id ? post.categoryColor + '35' : '#1a1a1a'}`,
                borderRadius: 20, overflow: 'hidden', cursor: 'pointer',
                transition: 'all 0.2s',
                transform: hovered === post.id ? 'translateY(-5px)' : 'none',
                boxShadow: hovered === post.id ? `0 16px 48px ${post.categoryColor}12` : 'none',
              }}
              onMouseEnter={() => setHovered(post.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Thumbnail */}
              <div style={{
                height: 140,
                background: `linear-gradient(135deg, ${post.categoryColor}18, #111)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 56, position: 'relative',
                borderBottom: '1px solid #1a1a1a',
              }}>
                {post.emoji}
                <div style={{
                  position: 'absolute', top: 14, left: 16,
                  fontSize: 10, fontWeight: 700, letterSpacing: 2,
                  color: post.categoryColor, background: `${post.categoryColor}15`,
                  border: `1px solid ${post.categoryColor}35`,
                  borderRadius: 100, padding: '3px 10px', textTransform: 'uppercase',
                }}>
                  {post.category}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '22px 24px' }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.45, marginBottom: 10 }}>
                  {post.title}
                </h3>
                <p style={{ color: '#666', fontSize: 13, lineHeight: 1.7, marginBottom: 20 }}>
                  {post.excerpt.slice(0, 100)}...
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 16, borderTop: '1px solid #1a1a1a' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: `linear-gradient(135deg, ${post.authorColor}, ${post.authorColor}60)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, color: post.authorColor === '#C9FF00' ? '#000' : '#fff', flexShrink: 0 }}>
                    {post.initials}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 600 }}>{post.author}</div>
                    <div style={{ fontSize: 11, color: '#555' }}>{post.date}</div>
                  </div>
                  <span style={{ fontSize: 11, color: '#444' }}>{post.readTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredRest.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#444' }}>
            No posts in this category yet.
          </div>
        )}

        {/* Newsletter signup */}
        <div style={{ marginTop: 80, background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 24, padding: '48px', textAlign: 'center' }}>
          <div style={{ fontSize: 28, marginBottom: 16 }}>📬</div>
          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 10 }}>Get the weekly training digest</h2>
          <p style={{ color: '#666', fontSize: 15, marginBottom: 32, maxWidth: 440, margin: '0 auto 32px' }}>
            New articles, class announcements, and training tips. Every week. No spam -ever.
          </p>
          <div style={{ display: 'flex', gap: 10, maxWidth: 440, margin: '0 auto', justifyContent: 'center', flexWrap: 'wrap' }}>
            <input
              type="email"
              placeholder="your@email.com"
              style={{
                flex: '1 1 200px', background: '#141414', border: '1px solid #222', borderRadius: 10,
                padding: '13px 16px', color: '#fff', fontSize: 14, outline: 'none', minWidth: 0,
              }}
              onFocus={e => (e.target.style.borderColor = 'rgba(201,255,0,0.4)')}
              onBlur={e => (e.target.style.borderColor = '#222')}
            />
            <button style={{
              background: 'var(--accent)', color: '#000', border: 'none',
              borderRadius: 10, padding: '13px 24px', fontSize: 13,
              fontWeight: 800, letterSpacing: 1, cursor: 'pointer',
              whiteSpace: 'nowrap', flexShrink: 0,
            }}>Subscribe →</button>
          </div>
        </div>
      </div>
    </div>
  )
}