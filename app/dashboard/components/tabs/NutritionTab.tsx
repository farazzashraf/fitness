import { useState } from 'react'
import { UserData } from '../../types'
import { LockedOverlay } from '../LockedOverlay'

export function NutritionTab({ bp, user }: { bp: 'mobile' | 'tablet' | 'desktop'; user: UserData }) {
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null)
  const isFree = user?.plan === 'FREE';
  const isMobile = bp === 'mobile';
  
  if (isFree) return <LockedOverlay title="Nutrition Guides" message="Get full meal plans, macro-tracking guides, and healthy recipes tailored for your goals." unlockTier="PRO" ctaLink="/checkout?plan=pro" />

  const guides = [
    { 
      id: 'high-protein', 
      title: 'High Protein Muscle Builder', 
      type: 'Meal Plan', 
      icon: '🥩', 
      color: '#ef4444',
      content: {
        description: 'A 7-day meal plan designed to hit 1.8g of protein per kg of bodyweight, perfect for the Iron Strength program.',
        meals: [
          { time: 'Breakfast', name: 'Scrambled Eggs & Oatmeal', macros: '450 cal · 35g Protein' },
          { time: 'Lunch', name: 'Grilled Chicken & Quinoa', macros: '600 cal · 55g Protein' },
          { time: 'Dinner', name: 'Lean Steak & Sweet Potato', macros: '750 cal · 60g Protein' },
        ]
      }
    },
    { 
      id: 'keto', 
      title: 'Keto Kickstart', 
      type: 'Guide', 
      icon: '🥑', 
      color: '#10b981',
      content: {
        description: 'Everything you need to know to transition into ketosis smoothly without losing energy for your workouts.',
        meals: [
          { time: 'Tip 1', name: 'Increase Electrolytes', macros: 'Add salt to your water' },
          { time: 'Tip 2', name: 'Track Net Carbs', macros: 'Keep under 30g daily' },
          { time: 'Tip 3', name: 'Eat Fatty Cuts of Meat', macros: 'Chicken thighs over breasts' },
        ]
      }
    },
    { 
      id: 'vegan', 
      title: 'Vegan Power', 
      type: 'Recipes', 
      icon: '🥗', 
      color: '#84cc16',
      content: {
        description: 'Plant-based recipes that don\'t compromise on amino acids or flavor.',
        meals: [
          { time: 'Breakfast', name: 'Tofu Scramble & Avocado', macros: '380 cal · 22g Protein' },
          { time: 'Lunch', name: 'Lentil & Chickpea Bowl', macros: '520 cal · 30g Protein' },
          { time: 'Dinner', name: 'Seitan Stir-fry', macros: '450 cal · 35g Protein' },
        ]
      }
    },
  ]

  // Find the currently selected guide based on ID
  const activeGuide = guides.find(g => g.id === selectedGuide)

  // ─── DETAIL VIEW ─────────────────────────────────────────────────────────
  if (activeGuide) {
    return (
      <div className="animate-fadeIn">
        {/* Back Button */}
        <button 
          onClick={() => setSelectedGuide(null)}
          style={{ 
            background: 'transparent', border: 'none', color: '#888', 
            cursor: 'pointer', fontSize: 14, fontWeight: 600, 
            display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24, padding: 0
          }}
        >
          ← Back to Library
        </button>

        {/* Header */}
        <div style={{ 
          background: `linear-gradient(135deg, ${activeGuide.color}15, transparent)`, 
          border: '1px solid #1a1a1a', borderRadius: 20, 
          padding: isMobile ? 24 : 32, marginBottom: 24
        }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>{activeGuide.icon}</div>
          <div style={{ fontSize: 11, color: activeGuide.color, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>
            {activeGuide.type}
          </div>
          <h2 className="font-display" style={{ fontSize: isMobile ? 32 : 48, letterSpacing: 1, marginBottom: 12 }}>
            {activeGuide.title}
          </h2>
          <p style={{ color: '#888', fontSize: 15, lineHeight: 1.6, maxWidth: 600 }}>
            {activeGuide.content.description}
          </p>
        </div>

        {/* Content List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Inside this guide:</h3>
          {activeGuide.content.meals.map((meal, i) => (
            <div key={i} style={{ 
              background: '#0f0f0f', border: '1px solid #1a1a1a', 
              borderRadius: 16, padding: 20, display: 'flex', 
              flexDirection: isMobile ? 'column' : 'row', 
              justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center',
              gap: 8
            }}>
              <div>
                <div style={{ fontSize: 12, color: activeGuide.color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>
                  {meal.time}
                </div>
                <div style={{ fontSize: 16, fontWeight: 600 }}>{meal.name}</div>
              </div>
              <div style={{ 
                background: '#1a1a1a', color: '#aaa', fontSize: 12, 
                padding: '6px 12px', borderRadius: 8, fontWeight: 600 
              }}>
                {meal.macros}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // ─── GRID VIEW (Default) ──────────────────────────────────────────────────
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>
      {guides.map(g => (
        <div 
          key={g.id} 
          onClick={() => setSelectedGuide(g.id)}
          style={{ 
            background: '#0f0f0f', border: '1px solid #1a1a1a', 
            borderRadius: 16, padding: 24, cursor: 'pointer',
            transition: 'all 0.2s', position: 'relative', overflow: 'hidden'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = g.color
            e.currentTarget.style.transform = 'translateY(-4px)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = '#1a1a1a'
            e.currentTarget.style.transform = 'none'
          }}
        >
          <div style={{ fontSize: 32, marginBottom: 12 }}>{g.icon}</div>
          <div style={{ fontSize: 10, color: g.color, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>{g.type}</div>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>{g.title}</div>
          <div style={{ color: '#555', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
            Read more <span style={{ color: g.color }}>→</span>
          </div>
        </div>
      ))}
    </div>
  )
}