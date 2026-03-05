import { UserData } from '../../types'
import { LockedOverlay } from '../LockedOverlay'

export function NutritionTab({ bp, user }: { bp: 'mobile' | 'tablet' | 'desktop'; user: UserData }) {
  const isFree = user?.plan === 'FREE';
  
  if (isFree) return <LockedOverlay title="Nutrition Guides" message="Get full meal plans, macro-tracking guides, and healthy recipes tailored for your goals." unlockTier="PRO" ctaLink="/checkout?plan=pro" />

  const guides = [
    { title: 'High Protein Muscle Builder', type: 'Meal Plan', icon: '🥩', color: '#ef4444' },
    { title: 'Keto Kickstart', type: 'Guide', icon: '🥑', color: '#10b981' },
    { title: 'Vegan Power', type: 'Recipes', icon: '🥗', color: '#84cc16' },
  ]

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>
      {guides.map(g => (
        <div key={g.title} style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 16, padding: 24, cursor: 'pointer' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>{g.icon}</div>
          <div style={{ fontSize: 10, color: g.color, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>{g.type}</div>
          <div style={{ fontSize: 16, fontWeight: 700 }}>{g.title}</div>
        </div>
      ))}
    </div>
  )
}