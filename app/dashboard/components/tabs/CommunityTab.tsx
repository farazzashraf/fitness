export function CommunityTab({ bp }: { bp: 'mobile' | 'tablet' | 'desktop' }) {
  const posts = [
    { name: 'Sarah J.', time: '2h ago', content: 'Just finished the 45-Min HIIT Blast. Absolutely dripping sweat! 🔥', likes: 12 },
    { name: 'Mike T.', time: '4h ago', content: 'Anyone else struggling with the Pistol Squat masterclass? I keep losing balance.', likes: 5 },
    { name: 'Priya Sharma (Coach)', time: '1d ago', content: 'Great energy in today\'s live yoga flow! Remember to drink plenty of water today team. 🧘‍♀️💧', likes: 48 },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 600 }}>
      {posts.map((p, i) => (
        <div key={i} style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 16, padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontWeight: 700, fontSize: 14 }}>{p.name}</span>
            <span style={{ color: '#555', fontSize: 12 }}>{p.time}</span>
          </div>
          <p style={{ color: '#ccc', fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>{p.content}</p>
          <div style={{ fontSize: 12, color: '#888' }}>❤️ {p.likes} Likes</div>
        </div>
      ))}
    </div>
  )
}