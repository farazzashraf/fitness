import { Tab } from '../types'

export function BottomNav({ active, setActive }: { active: Tab; setActive: (t: Tab) => void }) {
  // We added all 7 tabs back in!
  const items: { id: Tab; label: string; icon: string }[] = [
    { id: 'overview', label: 'Home', icon: '▦' },
    { id: 'videos', label: 'Videos', icon: '▶' },
    { id: 'live', label: 'Live', icon: '📡' },
    { id: 'progress', label: 'Stats', icon: '📈' },
    { id: 'nutrition', label: 'Nutrition', icon: '🥗' },
    { id: 'community', label: 'Social', icon: '💬' },
    { id: 'ai', label: 'Coach', icon: '🤖' },
  ]

  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100, 
      background: 'rgba(8,8,8,0.96)', borderTop: '1px solid #1e1e1e', 
      display: 'flex', backdropFilter: 'blur(16px)', 
      paddingBottom: 'env(safe-area-inset-bottom)',
      // These properties make it scrollable on mobile without showing an ugly scrollbar
      overflowX: 'auto', 
      WebkitOverflowScrolling: 'touch',
      scrollbarWidth: 'none', // Firefox
    }}>
      {/* Hide scrollbar for Chrome/Safari */}
      <style>{`nav::-webkit-scrollbar { display: none; }`}</style>

      {items.map(item => (
        <button key={item.id} onClick={() => setActive(item.id)} style={{
          // flex: '0 0 auto' prevents them from squishing, keeping them a tap-friendly size
          flex: '0 0 auto', minWidth: '72px', 
          display: 'flex', flexDirection: 'column', alignItems: 'center', 
          gap: 4, padding: '10px 4px 8px',
          background: 'none', border: 'none', cursor: 'pointer', 
          color: active === item.id ? 'var(--accent)' : '#444',
          transition: 'color 0.15s',
        }}>
          <span style={{ fontSize: 18 }}>{item.icon}</span>
          <span style={{ 
            fontSize: 10, fontWeight: active === item.id ? 700 : 500, 
            letterSpacing: 0.5 
          }}>{item.label}</span>
        </button>
      ))}
    </nav>
  )
}