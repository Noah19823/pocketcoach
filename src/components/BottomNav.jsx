import { useState } from 'react'

const tabs = [
  { id: 'home',        label: 'Home',    icon: HomeIcon },
  { id: 'coach',       label: 'Coach',   icon: CoachIcon },
  { id: 'goals',       label: 'Goals',   icon: GoalsIcon },
  { id: 'leaderboard', label: 'Ranks',   icon: LeaderboardIcon },
  { id: 'profile',     label: 'Profile', icon: ProfileIcon },
]

const ACTIVE = '#0D9488'
const INACTIVE = '#AEAAA4'

export default function BottomNav({ activeTab, setActiveTab }) {
  const [pressedTab, setPressedTab] = useState(null)

  return (
    <nav style={{
      height: '74px',
      background: 'rgba(247,245,242,0.94)',
      backdropFilter: 'blur(28px)',
      WebkitBackdropFilter: 'blur(28px)',
      borderTop: '1px solid rgba(0,0,0,0.06)',
      display: 'flex',
      flexShrink: 0,
      zIndex: 20,
      paddingBottom: '6px',
    }}>
      {tabs.map(tab => {
        const Icon = tab.icon
        const isActive = activeTab === tab.id
        const isPressed = pressedTab === tab.id

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            onMouseDown={() => setPressedTab(tab.id)}
            onMouseUp={() => setPressedTab(null)}
            onMouseLeave={() => setPressedTab(null)}
            onTouchStart={() => setPressedTab(tab.id)}
            onTouchEnd={() => setPressedTab(null)}
            aria-label={tab.label}
            aria-current={isActive ? 'page' : undefined}
            style={{
              flex: 1,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '3px', background: 'none', border: 'none',
              cursor: 'pointer',
              opacity: isPressed ? 0.45 : 1,
              transition: 'opacity 0.1s ease',
              paddingTop: '8px',
              position: 'relative',
            }}
          >
            {/* Active pill indicator */}
            {isActive && (
              <div style={{
                position: 'absolute', top: '6px', left: '50%', transform: 'translateX(-50%)',
                width: '38px', height: '30px',
                background: 'rgba(13,148,136,0.1)',
                borderRadius: '99px',
                animation: 'popIn 0.25s cubic-bezier(0.34,1.3,0.64,1)',
              }} />
            )}

            <div style={{ position: 'relative', zIndex: 1 }}>
              <Icon active={isActive} />
            </div>

            <span style={{
              fontSize: '10px',
              fontWeight: isActive ? 700 : 500,
              color: isActive ? ACTIVE : INACTIVE,
              letterSpacing: '0.05px',
              lineHeight: 1,
              position: 'relative', zIndex: 1,
              transition: 'color 0.15s ease',
            }}>
              {tab.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}

function HomeIcon({ active }) {
  const c = active ? ACTIVE : INACTIVE
  const sw = active ? '2' : '1.6'
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 9.5L12 3l9 6.5V21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"
        stroke={c} strokeWidth={sw} strokeLinejoin="round"
        fill={active ? `${ACTIVE}18` : 'none'}/>
      <path d="M9 22V12h6v10" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function CoachIcon({ active }) {
  const c = active ? ACTIVE : INACTIVE
  const sw = active ? '2' : '1.6'
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
        stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"
        fill={active ? `${ACTIVE}18` : 'none'}/>
    </svg>
  )
}

function GoalsIcon({ active }) {
  const c = active ? ACTIVE : INACTIVE
  const sw = active ? '2' : '1.6'
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke={c} strokeWidth={sw}/>
      <circle cx="12" cy="12" r="5.5" stroke={c} strokeWidth={sw}/>
      <circle cx="12" cy="12" r="2.5" fill={c}/>
    </svg>
  )
}

function LeaderboardIcon({ active }) {
  const c = active ? ACTIVE : INACTIVE
  const sw = active ? '2' : '1.6'
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="13" width="5.5" height="9" rx="1.5" stroke={c} strokeWidth={sw}
        fill={active ? `${ACTIVE}14` : 'none'}/>
      <rect x="9.25" y="8" width="5.5" height="14" rx="1.5" stroke={c} strokeWidth={sw}
        fill={active ? `${ACTIVE}20` : 'none'}/>
      <rect x="16.5" y="3" width="5.5" height="19" rx="1.5" stroke={c} strokeWidth={sw}
        fill={active ? `${ACTIVE}14` : 'none'}/>
    </svg>
  )
}

function ProfileIcon({ active }) {
  const c = active ? ACTIVE : INACTIVE
  const sw = active ? '2' : '1.6'
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="4" stroke={c} strokeWidth={sw}
        fill={active ? `${ACTIVE}18` : 'none'}/>
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke={c} strokeWidth={sw} strokeLinecap="round"/>
    </svg>
  )
}
