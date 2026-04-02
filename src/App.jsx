import { useState } from 'react'
import BottomNav from './components/BottomNav'
import HomeScreen from './screens/HomeScreen'
import CoachScreen from './screens/CoachScreen'
import GoalsScreen from './screens/GoalsScreen'
import LeaderboardScreen from './screens/LeaderboardScreen'
import ProfileScreen from './screens/ProfileScreen'

const INITIAL_NOTIFICATIONS = [
  {
    id: 1, read: false, icon: '🤖', color: '#0D9488',
    title: 'Max has a tip for you',
    body: "Your Emergency Fund is 61% done. One more push and you're covered.",
    time: 'now',
  },
  {
    id: 2, read: false, icon: '⚠️', color: '#E85D04',
    title: 'Budget heads up',
    body: "You're at 66% of your weekly budget with 2 days left.",
    time: '1h ago',
  },
  {
    id: 3, read: true, icon: '🏆', color: '#7C3AED',
    title: 'Leaderboard update',
    body: "Sarah M. extended her lead. She's saving $23/week more than you.",
    time: '3h ago',
  },
]

export default function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [badgeModal, setBadgeModal] = useState(null)
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS)
  const [showNotifications, setShowNotifications] = useState(false)

  const unreadCount = notifications.filter(n => !n.read).length

  const handleBellClick = () => {
    setShowNotifications(v => !v)
    if (!showNotifications) {
      setTimeout(() => setNotifications(prev => prev.map(n => ({ ...n, read: true }))), 400)
    }
  }

  const screens = {
    home:        <HomeScreen setActiveTab={setActiveTab} unreadCount={unreadCount} onBellClick={handleBellClick} />,
    coach:       <CoachScreen />,
    goals:       <GoalsScreen />,
    leaderboard: <LeaderboardScreen />,
    profile:     <ProfileScreen setActiveTab={setActiveTab} openBadgeModal={setBadgeModal} />,
  }

  return (
    /* Outer wrapper for side buttons */
    <div style={{ position: 'relative' }}>

      {/* Left — volume / action buttons */}
      <div style={{
        position: 'absolute', left: '-4px', top: '96px',
        width: '4px', height: '30px', background: '#2A2420',
        borderRadius: '4px 0 0 4px', boxShadow: '-1px 0 2px rgba(0,0,0,0.5)',
      }} />
      <div style={{
        position: 'absolute', left: '-4px', top: '140px',
        width: '4px', height: '56px', background: '#2A2420',
        borderRadius: '4px 0 0 4px', boxShadow: '-1px 0 2px rgba(0,0,0,0.5)',
      }} />
      <div style={{
        position: 'absolute', left: '-4px', top: '208px',
        width: '4px', height: '56px', background: '#2A2420',
        borderRadius: '4px 0 0 4px', boxShadow: '-1px 0 2px rgba(0,0,0,0.5)',
      }} />

      {/* Right — power button */}
      <div style={{
        position: 'absolute', right: '-4px', top: '160px',
        width: '4px', height: '72px', background: '#2A2420',
        borderRadius: '0 4px 4px 0', boxShadow: '1px 0 2px rgba(0,0,0,0.5)',
      }} />

      {/* Phone frame */}
      <div style={{
        width: '390px',
        height: '844px',
        background: 'var(--bg-primary)',
        borderRadius: '52px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        boxShadow: [
          '0 0 0 1px rgba(255,255,255,0.08)',
          '0 0 0 2px #1A1108',
          '0 0 0 3px rgba(255,255,255,0.05)',
          '0 32px 80px rgba(0,0,0,0.7)',
          '0 8px 24px rgba(0,0,0,0.5)',
          'inset 0 1px 0 rgba(255,255,255,0.12)',
        ].join(', '),
      }}>

        {/* Dynamic Island */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '122px',
          height: '34px',
          background: '#0A0A0A',
          borderRadius: '99px',
          zIndex: 40,
          boxShadow: '0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.04)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingRight: '10px',
          gap: '5px',
        }}>
          {/* Selfie camera dot */}
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#161616', border: '1px solid #222', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '4px', height: '4px', borderRadius: '50%', background: '#1a3a4a', boxShadow: '0 0 3px rgba(13,148,136,0.4)' }} />
          </div>
        </div>

        {/* Status bar */}
        <div style={{
          height: '54px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 30px',
          flexShrink: 0,
          background: 'var(--bg-primary)',
          zIndex: 30,
        }}>
          <span style={{ fontSize: '15px', fontWeight: 700, letterSpacing: '-0.3px', color: 'var(--text-primary)' }}>
            9:41
          </span>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <SignalIcon />
            <WifiIcon />
            <BatteryIcon />
          </div>
        </div>

        {/* Screen content */}
        <div
          key={activeTab}
          style={{
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            position: 'relative',
            scrollbarWidth: 'none',
            animation: 'fadeUp 0.2s ease',
            background: 'var(--bg-primary)',
          }}
        >
          {screens[activeTab]}
        </div>

        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Notification panel */}
        {showNotifications && (
          <>
            <div
              onClick={() => setShowNotifications(false)}
              style={{
                position: 'absolute', inset: 0,
                background: 'rgba(0,0,0,0.15)',
                backdropFilter: 'blur(2px)',
                zIndex: 48,
                animation: 'fadeIn 0.15s ease',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '60px',
                left: '16px',
                right: '16px',
                zIndex: 50,
                animation: 'slideDown 0.22s cubic-bezier(0.34,1.15,0.64,1)',
              }}
            >
              <div style={{
                background: 'rgba(255,255,255,0.94)',
                backdropFilter: 'blur(40px)',
                WebkitBackdropFilter: 'blur(40px)',
                borderRadius: '22px',
                border: '1px solid rgba(255,255,255,0.8)',
                boxShadow: '0 8px 40px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.08)',
                overflow: 'hidden',
              }}>
                <div style={{
                  padding: '14px 18px 10px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  borderBottom: '1px solid rgba(0,0,0,0.05)',
                }}>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Notifications
                  </span>
                  <button
                    onClick={() => setShowNotifications(false)}
                    style={{
                      background: 'rgba(0,0,0,0.06)', border: 'none',
                      width: '24px', height: '24px', borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--text-secondary)', fontSize: '14px', cursor: 'pointer',
                    }}
                  >×</button>
                </div>
                {notifications.map((n, i) => (
                  <div key={n.id}>
                    <div style={{
                      padding: '12px 18px',
                      display: 'flex', alignItems: 'flex-start', gap: '12px',
                      background: n.read ? 'transparent' : 'rgba(232,93,4,0.03)',
                    }}>
                      <div style={{
                        width: '36px', height: '36px', borderRadius: '10px',
                        background: `${n.color}14`,
                        border: `1px solid ${n.color}22`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '16px', flexShrink: 0,
                      }}>{n.icon}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                          <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>{n.title}</p>
                          <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{n.time}</span>
                        </div>
                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>{n.body}</p>
                      </div>
                      {!n.read && (
                        <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--accent-orange)', flexShrink: 0, marginTop: '3px' }} />
                      )}
                    </div>
                    {i < notifications.length - 1 && (
                      <div style={{ height: '1px', background: 'rgba(0,0,0,0.05)', margin: '0 18px' }} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Badge modal */}
        {badgeModal && (
          <div
            onClick={() => setBadgeModal(null)}
            style={{
              position: 'absolute', inset: 0,
              background: 'rgba(0,0,0,0.3)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              zIndex: 100,
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
              animation: 'fadeIn 0.15s ease',
            }}
          >
            <div
              onClick={e => e.stopPropagation()}
              style={{
                background: 'var(--bg-secondary)',
                borderRadius: '30px 30px 0 0',
                padding: '12px 24px 44px',
                animation: 'slideUp 0.24s cubic-bezier(0.34,1.2,0.64,1)',
                borderTop: '1px solid var(--border)',
              }}
            >
              <div style={{ width: '36px', height: '4px', borderRadius: '99px', background: 'var(--border)', margin: '0 auto 28px' }} />
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div style={{
                  fontSize: '64px', marginBottom: '16px',
                  filter: badgeModal.earned ? 'none' : 'grayscale(1)',
                  display: 'inline-block',
                  animation: 'popIn 0.35s cubic-bezier(0.34,1.3,0.64,1)',
                }}>{badgeModal.emoji}</div>
                <h2 style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: '8px', color: 'var(--text-primary)' }}>
                  {badgeModal.name}
                </h2>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {badgeModal.description}
                </p>
              </div>
              {badgeModal.earned ? (
                <div style={{
                  background: `${badgeModal.color}0C`, border: `1px solid ${badgeModal.color}22`,
                  borderRadius: '14px', padding: '14px 20px',
                  textAlign: 'center', marginBottom: '16px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                }}>
                  <span style={{ fontSize: '16px' }}>✓</span>
                  <span style={{ fontSize: '15px', fontWeight: 700, color: badgeModal.color }}>Badge Earned</span>
                </div>
              ) : (
                <div style={{
                  background: 'var(--bg-primary)', border: '1px solid var(--border)',
                  borderRadius: '14px', padding: '14px 20px',
                  textAlign: 'center', marginBottom: '16px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                }}>
                  <span style={{ fontSize: '16px' }}>🔒</span>
                  <span style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 500 }}>Keep going to unlock</span>
                </div>
              )}
              <button className="pressable" onClick={() => setBadgeModal(null)} style={{
                width: '100%', padding: '15px', borderRadius: '16px',
                background: 'var(--accent-primary)',
                color: 'white', fontSize: '15px', fontWeight: 700,
              }}>Got it</button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

function SignalIcon() {
  return (
    <svg width="17" height="12" viewBox="0 0 17 12" fill="var(--text-primary)" aria-hidden="true">
      <rect x="0" y="4" width="3" height="8" rx="1" opacity="0.25"/>
      <rect x="4.5" y="2.5" width="3" height="9.5" rx="1" opacity="0.5"/>
      <rect x="9" y="1" width="3" height="11" rx="1" opacity="0.75"/>
      <rect x="13.5" y="0" width="3" height="12" rx="1"/>
    </svg>
  )
}

function WifiIcon() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
      <path d="M8 9.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" fill="var(--text-primary)"/>
      <path d="M4.2 7.2a5.3 5.3 0 0 1 7.6 0" stroke="var(--text-primary)" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
      <path d="M1.5 4.5a9 9 0 0 1 13 0" stroke="var(--text-primary)" strokeWidth="1.5" strokeLinecap="round" opacity="0.35"/>
    </svg>
  )
}

function BatteryIcon() {
  return (
    <svg width="25" height="12" viewBox="0 0 25 12" fill="none" aria-hidden="true">
      <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="var(--text-primary)" strokeOpacity="0.25"/>
      <rect x="2" y="2" width="17" height="8" rx="2" fill="var(--text-primary)"/>
      <path d="M23 4v4a2 2 0 0 0 0-4z" fill="var(--text-primary)" fillOpacity="0.4"/>
    </svg>
  )
}
