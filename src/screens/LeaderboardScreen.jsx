import { useState, useEffect } from 'react'

const leaderboard = [
  { rank: 1, name: 'Sarah M.',   initials: 'S', color: '#7C3AED', saved: 210, streak: 14, isUser: false },
  { rank: 2, name: 'Noah',       initials: 'N', color: '#0D9488', saved: 187, streak: 7,  isUser: true  },
  { rank: 3, name: 'Marcus T.',  initials: 'M', color: '#E85D04', saved: 154, streak: 5,  isUser: false },
  { rank: 4, name: 'Priya K.',   initials: 'P', color: '#2563EB', saved: 132, streak: 9,  isUser: false },
  { rank: 5, name: 'Jordan L.',  initials: 'J', color: '#DC2626', saved: 98,  streak: 3,  isUser: false },
]

const timeFilters = ['Week', 'Month', 'All Time']

// Podium order: 2nd | 1st | 3rd
const PODIUM_ORDER = [1, 0, 2]
const PODIUM_HEIGHTS = [82, 108, 60]
const PODIUM_LABEL = ['🥈', '🥇', '🥉']

export default function LeaderboardScreen() {
  const [activeFilter, setActiveFilter] = useState(0)
  const [fading, setFading] = useState(false)
  const [podiumReady, setPodiumReady] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setPodiumReady(true), 100)
    return () => clearTimeout(t)
  }, [])

  const changeFilter = (i) => {
    if (i === activeFilter) return
    setFading(true)
    setPodiumReady(false)
    setTimeout(() => {
      setActiveFilter(i)
      setFading(false)
      setTimeout(() => setPodiumReady(true), 80)
    }, 150)
  }

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100%', paddingBottom: '32px' }}>

      {/* Header */}
      <div style={{ padding: '8px 24px 0' }}>
        <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontWeight: 500 }}>Top savers nearby</p>
        <h1 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
          Leaderboard
        </h1>
      </div>

      {/* Time filter pills */}
      <div style={{ padding: '14px 24px 0', display: 'flex', gap: '8px' }}>
        {timeFilters.map((f, i) => (
          <button
            key={f}
            onClick={() => changeFilter(i)}
            className="pressable"
            style={{
              padding: '7px 18px', borderRadius: '99px',
              background: i === activeFilter ? 'var(--accent-primary)' : 'var(--bg-secondary)',
              border: i === activeFilter ? 'none' : '1px solid var(--border)',
              color: i === activeFilter ? 'white' : 'var(--text-secondary)',
              fontSize: '13px', fontWeight: 600, cursor: 'pointer',
              transition: 'all 0.15s ease',
              boxShadow: i === activeFilter ? '0 2px 8px rgba(17,17,17,0.2)' : 'var(--shadow-xs)',
            }}
          >{f}</button>
        ))}
      </div>

      {/* Fadeable section */}
      <div style={{ opacity: fading ? 0 : 1, transition: 'opacity 0.15s ease' }}>

        {/* ── Your rank pill ── */}
        <div style={{ padding: '16px 24px 0', display: 'flex', gap: '10px' }}>
          <div style={{
            flex: 1, background: 'var(--bg-secondary)',
            border: '1px solid var(--border)', borderRadius: '16px',
            boxShadow: 'var(--shadow-sm)', padding: '14px 16px',
            display: 'flex', alignItems: 'center', gap: '10px',
          }}>
            <span style={{ fontSize: '26px', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text-primary)' }}>#2</span>
            <div>
              <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>Your rank</p>
              <p style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>$23 behind Sarah</p>
            </div>
          </div>
          <div style={{
            flex: 1, background: 'var(--bg-secondary)',
            border: '1px solid var(--border)', borderRadius: '16px',
            boxShadow: 'var(--shadow-sm)', padding: '14px 16px',
            display: 'flex', alignItems: 'center', gap: '10px',
          }}>
            <span style={{ fontSize: '26px', fontWeight: 900, letterSpacing: '-1px', color: 'var(--accent-green)' }}>6%</span>
            <div>
              <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>Top tier</p>
              <p style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>Beat 94% of users</p>
            </div>
          </div>
        </div>

        {/* ── Podium ── */}
        <div style={{ padding: '20px 24px 0' }}>
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            borderRadius: '24px',
            boxShadow: 'var(--shadow-md)',
            padding: '20px 16px 0',
            overflow: 'hidden',
          }}>
            <p style={{
              fontSize: '10px', fontWeight: 700, color: 'var(--text-tertiary)',
              textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center', marginBottom: '16px',
            }}>Top 3 this {timeFilters[activeFilter].toLowerCase()}</p>

            {/* Avatar row */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px' }}>
              {PODIUM_ORDER.map((idx, col) => {
                const user = leaderboard[idx]
                const h = PODIUM_HEIGHTS[col]
                const isCenter = col === 1
                return (
                  <div key={idx} style={{
                    flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
                  }}>
                    {/* Medal */}
                    <div style={{ fontSize: '20px', marginBottom: '6px' }}>
                      {PODIUM_LABEL[col]}
                    </div>
                    {/* Avatar */}
                    <div style={{
                      width: isCenter ? '52px' : '42px',
                      height: isCenter ? '52px' : '42px',
                      borderRadius: '50%',
                      background: `${user.color}15`,
                      border: `2px solid ${user.color}30`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: isCenter ? '18px' : '15px',
                      fontWeight: 800, color: user.color,
                      marginBottom: '6px',
                      boxShadow: isCenter ? `0 4px 16px ${user.color}25` : 'none',
                    }}>
                      {user.initials}
                      {user.isUser && (
                        <div style={{
                          position: 'absolute', bottom: '-2px', right: '-2px',
                          width: '10px', height: '10px', borderRadius: '50%',
                          background: 'var(--accent-teal)', border: '2px solid var(--bg-secondary)',
                        }} />
                      )}
                    </div>
                    {/* Name */}
                    <p style={{
                      fontSize: isCenter ? '12px' : '10px',
                      fontWeight: 700, color: user.isUser ? 'var(--accent-teal)' : 'var(--text-primary)',
                      marginBottom: '2px', textAlign: 'center',
                      whiteSpace: 'nowrap', overflow: 'hidden', maxWidth: '100%',
                    }}>
                      {user.isUser ? 'You' : user.name.split(' ')[0]}
                    </p>
                    <p className="num" style={{
                      fontSize: '11px', fontWeight: 700,
                      color: user.color, marginBottom: '8px',
                    }}>${user.saved}</p>
                    {/* Podium column */}
                    <div style={{
                      width: '100%',
                      height: podiumReady ? `${h}px` : '0px',
                      background: user.isUser
                        ? `linear-gradient(180deg, ${user.color}25 0%, ${user.color}10 100%)`
                        : 'var(--bg-primary)',
                      border: `1px solid ${user.isUser ? `${user.color}30` : 'var(--border)'}`,
                      borderBottom: 'none',
                      borderRadius: '8px 8px 0 0',
                      transition: `height 0.6s cubic-bezier(0.34,1.1,0.64,1) ${col * 0.08}s`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      overflow: 'hidden',
                    }}>
                      <span style={{
                        fontSize: '18px', fontWeight: 900,
                        color: user.color,
                        opacity: podiumReady ? 0.15 : 0,
                        transition: 'opacity 0.4s ease 0.4s',
                      }}>{idx + 1}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div style={{ height: '1px', background: 'var(--border)', margin: '16px 24px' }} />

        {/* ── Full list ── */}
        <div style={{ padding: '0 24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {leaderboard.map((user, i) => (
            <LeaderboardRow key={user.rank} user={user} animDelay={i * 0.05} />
          ))}
        </div>

      </div>
    </div>
  )
}

function LeaderboardRow({ user, animDelay }) {
  const MEDAL = ['🥇', '🥈', '🥉']

  return (
    <div style={{
      background: user.isUser ? `${user.color}06` : 'var(--bg-secondary)',
      border: user.isUser ? `1.5px solid ${user.color}22` : '1px solid var(--border)',
      borderRadius: '16px',
      boxShadow: 'var(--shadow-xs)',
      display: 'flex', alignItems: 'center', gap: '10px',
      padding: '11px 14px',
      animation: 'fadeUpStagger 0.28s ease both',
      animationDelay: `${animDelay}s`,
    }}>
      {/* Rank */}
      <div style={{
        width: '28px', textAlign: 'center', flexShrink: 0,
        fontSize: user.rank <= 3 ? '18px' : '12px',
        fontWeight: 700, color: user.rank > 3 ? 'var(--text-tertiary)' : undefined,
      }}>
        {user.rank <= 3 ? MEDAL[user.rank - 1] : `#${user.rank}`}
      </div>

      {/* Avatar */}
      <div style={{
        width: '36px', height: '36px', borderRadius: '50%',
        background: `${user.color}12`,
        border: `1.5px solid ${user.color}25`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '13px', fontWeight: 800, color: user.color,
        flexShrink: 0,
      }}>{user.initials}</div>

      {/* Name */}
      <div style={{ flex: 1 }}>
        <p style={{
          fontSize: '14px', fontWeight: 700,
          color: user.isUser ? 'var(--accent-teal)' : 'var(--text-primary)',
          marginBottom: '1px',
        }}>{user.isUser ? 'Noah (You)' : user.name}</p>
        <p style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>🔥 {user.streak}-day streak</p>
      </div>

      {/* Bar + amount */}
      <div style={{ textAlign: 'right', minWidth: '56px' }}>
        <p className="num" style={{
          fontSize: '15px', fontWeight: 800,
          color: user.isUser ? 'var(--accent-teal)' : 'var(--text-primary)',
          letterSpacing: '-0.3px',
        }}>${user.saved}</p>
        <p style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 500 }}>saved</p>
      </div>
    </div>
  )
}
