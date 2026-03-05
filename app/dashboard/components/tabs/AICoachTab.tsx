import { UserData } from '../../types'
import { LockedOverlay } from '../LockedOverlay'

export function AICoachTab({ bp, user }: { bp: 'mobile' | 'tablet' | 'desktop'; user: UserData }) {
  const isMobile = bp === 'mobile';


  return (
    <div style={{
      background: '#0f0f0f',
      border: '1px solid #1a1a1a',
      borderRadius: isMobile ? 16 : 20,
      // On mobile, take up most of the screen height so it feels like a real chat app
      height: isMobile ? 'calc(100vh - 220px)' : '65vh',
      minHeight: isMobile ? 400 : 500,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>

      {/* Chat Header */}
      <div style={{
        padding: isMobile ? '12px 16px' : 20,
        borderBottom: '1px solid #1a1a1a',
        background: '#111'
      }}>
        <h3 style={{ fontSize: isMobile ? 15 : 16, fontWeight: 700 }}>APEX Coach AI</h3>
        <p style={{ fontSize: isMobile ? 11 : 12, color: '#666', marginTop: 2 }}>Always online to help you.</p>
      </div>

      {/* Chat History */}
      <div style={{
        flex: 1,
        padding: isMobile ? '16px 12px' : 20,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 16
      }}>
        {/* AI Message */}
        <div style={{
          alignSelf: 'flex-start',
          background: '#1a1a1a',
          padding: isMobile ? '12px 14px' : 16,
          borderRadius: '16px 16px 16px 4px',
          maxWidth: isMobile ? '90%' : '80%'
        }}>
          <p style={{ fontSize: isMobile ? 13 : 14, lineHeight: 1.5, color: '#eee', margin: 0 }}>
            Hello {user.name.split(' ')[0]}! I noticed you finished a HIIT session today. How are your legs feeling?
          </p>
        </div>

        {/* User Message (Mock) */}
        <div style={{
          alignSelf: 'flex-end',
          background: 'var(--accent)',
          padding: isMobile ? '12px 14px' : 16,
          borderRadius: '16px 16px 4px 16px',
          maxWidth: isMobile ? '90%' : '80%'
        }}>
          <p style={{ fontSize: isMobile ? 13 : 14, lineHeight: 1.5, color: '#000', margin: 0, fontWeight: 500 }}>
            A bit sore honestly! Any quick recovery tips?
          </p>
        </div>
      </div>

      {/* Input Area */}
      <div style={{
        padding: isMobile ? 12 : 16,
        borderTop: '1px solid #1a1a1a',
        display: 'flex',
        gap: isMobile ? 8 : 12,
        background: '#0a0a0a'
      }}>
        <input
          type="text"
          placeholder="Ask your coach..."
          style={{
            flex: 1,
            background: '#111',
            border: '1px solid #222',
            padding: isMobile ? '10px 14px' : '12px 16px',
            borderRadius: 12,
            color: '#fff',
            outline: 'none',
            fontSize: isMobile ? 13 : 14
          }}
        />
        <button style={{
          background: 'var(--accent)',
          color: '#000',
          border: 'none',
          borderRadius: 12,
          padding: isMobile ? '0 16px' : '0 20px',
          fontWeight: 700,
          cursor: 'pointer',
          fontSize: isMobile ? 13 : 14
        }}>
          Send
        </button>
      </div>

    </div>
  )
}