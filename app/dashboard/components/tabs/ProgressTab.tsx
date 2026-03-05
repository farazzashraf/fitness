import { UserData } from '../../types'
import { LockedOverlay } from '../LockedOverlay'
import { progressData } from '../../data'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts'

export function ProgressTab({ bp, user }: { bp: 'mobile' | 'tablet' | 'desktop'; user: UserData }) {
  const isFree = user?.plan === 'FREE';
  const isMobile = bp === 'mobile';
  
  if (isFree) return <LockedOverlay title="Progress Tracking" message="Track your workouts, measure your calorie burn, and view your weekly discipline breakdown." unlockTier="PRO" ctaLink="/checkout?plan=pro" />

  // Custom dark-theme Tooltip for the chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ 
          background: '#111', 
          border: '1px solid #222', 
          padding: '12px 16px', 
          borderRadius: '12px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.5)'
        }}>
          <p style={{ color: '#888', fontSize: '12px', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: 1 }}>{label}</p>
          <p style={{ color: 'var(--accent)', fontSize: '18px', fontWeight: 'bold', margin: 0 }}>
            {payload[0].value} Classes
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 16 : 24 }}>
       
       {/* Stat cards */}
       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 14 }}>
        {[
          { label: 'Current Streak', value: `${user.streak}d`, color: '#EA580C' },
          { label: 'Best Streak', value: '21d', color: 'var(--accent)' },
          { label: 'Avg / Week', value: '3.4', color: '#60A5FA' },
        ].map(s => (
          <div key={s.label} style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: 16, padding: '20px 22px' }}>
            <div style={{ fontSize: 10, color: '#555', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>{s.label}</div>
            <div className="font-display" style={{ fontSize: 32, letterSpacing: 1, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Recharts Bar Chart */}
      <div style={{ 
        background: '#0f0f0f', 
        border: '1px solid #1a1a1a', 
        borderRadius: 16, 
        padding: isMobile ? '20px 16px' : '28px 32px' 
      }}>
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Weekly Classes</h3>
          <p style={{ fontSize: 12, color: '#666' }}>Your activity over the last 8 weeks</p>
        </div>
        
        <div style={{ height: isMobile ? 220 : 300, width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={progressData} 
              margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
            >
              <XAxis 
                dataKey="week" 
                stroke="#444" 
                fontSize={11} 
                tickLine={false} 
                axisLine={false} 
                dy={10}
              />
              <YAxis 
                stroke="#444" 
                fontSize={11} 
                tickLine={false} 
                axisLine={false} 
                tickCount={5}
              />
              {/* Highlight background row on hover */}
              <Tooltip 
                content={<CustomTooltip />} 
                cursor={{ fill: 'rgba(255,255,255,0.02)' }} 
              />
              <Bar dataKey="classes" radius={[6, 6, 6, 6]} barSize={isMobile ? 24 : 40}>
                {progressData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    // Highlight the very last bar with your accent color, dim the rest
                    fill={index === progressData.length - 1 ? 'var(--accent)' : '#222'} 
                    style={{ transition: 'all 0.3s ease' }}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  )
}