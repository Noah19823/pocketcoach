import { useState, useEffect } from 'react'

const badges = [
  { id: 1, name: 'First Save',       emoji: '💰', description: 'Made your first deposit into a savings goal.',   color: '#E85D04', earned: true  },
  { id: 2, name: 'Week Warrior',     emoji: '⚔️', description: '7-day savings streak. Consistency is everything.', color: '#0D9488', earned: true  },
  { id: 3, name: 'Consistency King', emoji: '👑', description: 'Saved 4 weeks in a row. Rare badge.',             color: '#7C3AED', earned: true  },
  { id: 4, name: 'Big Saver',        emoji: '🏦', description: 'Save $500 total across all goals.',               color: '#E85D04', earned: false },
  { id: 5, name: 'Goal Crusher',     emoji: '🎯', description: 'Complete a savings goal from 0% to 100%.',       color: '#2563EB', earned: false },
  { id: 6, name: 'Social Star',      emoji: '🌟', description: 'Reach the top 3 on the leaderboard.',            color: '#7C3AED', earned: false },
]

const settingsItems = [
  { icon: '🔔', label: 'Notifications',      value: 'On'          },
  { icon: '🔒', label: 'Privacy & Security',  value: null          },
  { icon: '💳', label: 'Linked Accounts',    value: 'Horizon CU'  },
  { icon: '🎨', label: 'Appearance',         value: 'Light'       },
  { icon: '❓', label: 'Help & Support',     value: null          },
]

export default function ProfileScreen({ setActiveTab, openBadgeModal }) {
  const xp = 1840
  const xpNeeded = 2000
  const [xpWidth, setXpWidth] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setXpWidth((xp / xpNeeded) * 100), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{ paddingBottom: '32px', minHeight: '100%', background: 'var(--bg-primary)' }}>

      {/* Header */}
      <div style={{ padding: '8px 24px 0' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 800, letterSpacing: '-0.5px', color: 'var(--text-primary)' }}>
          Profile
        </h1>
      </div>

      {/* ── Hero: Identity card ── */}
      <div style={{ padding: '16px 24px 0' }}>
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
          borderRadius: '24px',
          boxShadow: 'var(--shadow-md)',
          padding: '24px',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: '-30px', right: '-30px',
            width: '120px', height: '120px', borderRadius: '50%',
            background: 'rgba(13,148,136,0.05)',
          }} />

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '20px' }}>
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div style={{
                width: '64px', height: '64px', borderRadius: '20px',
                background: 'var(--accent-primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '24px', fontWeight: 800, color: 'white',
              }}>N</div>
              <div style={{
                position: 'absolute', bottom: '-4px', right: '-4px',
                width: '22px', height: '22px', borderRadius: '7px',
                background: '#E85D04',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '11px', fontWeight: 900, color: 'white',
                border: '2px solid var(--bg-secondary)',
              }}>4</div>
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '-0.4px', color: 'var(--text-primary)' }}>
                  Noah
                </h2>
                <span style={{
                  fontSize: '11px', fontWeight: 700, color: '#E85D04',
                  background: 'rgba(232,93,4,0.08)', borderRadius: '6px',
                  padding: '2px 8px', border: '1px solid rgba(232,93,4,0.18)',
                }}>Level 4</span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontWeight: 500, marginBottom: '12px' }}>
                ⚔️ Budget Warrior · 🔥 7-day streak
              </p>

              <div style={{ display: 'flex', gap: '20px' }}>
                <div>
                  <p style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '-0.5px', color: 'var(--accent-green)' }}>
                    $1,015
                  </p>
                  <p style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 500 }}>total saved</p>
                </div>
                <div>
                  <p style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '-0.5px', color: '#7C3AED' }}>
                    #2
                  </p>
                  <p style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 500 }}>leaderboard</p>
                </div>
              </div>
            </div>
          </div>

          {/* XP bar */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                XP to Level 5
              </span>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#E85D04' }}>
                {xp.toLocaleString()} / {xpNeeded.toLocaleString()}
              </span>
            </div>
            <div style={{ height: '6px', borderRadius: '99px', background: 'var(--border)' }}>
              <div style={{
                height: '100%', width: `${xpWidth}%`, borderRadius: '99px',
                background: 'linear-gradient(90deg, #E85D04, #F97316)',
                transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              }} />
            </div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ padding: '12px 24px 0', display: 'flex', gap: '10px' }}>
        {[
          { label: 'Goals',  value: '3',  color: 'var(--accent-teal)', tab: 'goals' },
          { label: 'Badges', value: '3',  color: '#E85D04',            tab: null },
          { label: 'Rank',   value: '#2', color: '#7C3AED',            tab: 'leaderboard' },
        ].map(stat => {
          const Tag = stat.tab ? 'button' : 'div'
          return (
            <Tag
              key={stat.label}
              type={stat.tab ? 'button' : undefined}
              className={stat.tab ? 'pressable' : ''}
              onClick={stat.tab ? () => setActiveTab(stat.tab) : undefined}
              style={{
                flex: 1, textAlign: 'center', padding: '16px 8px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                boxShadow: 'var(--shadow-xs)',
                cursor: stat.tab ? 'pointer' : 'default',
                font: 'inherit', color: 'inherit',
              }}
            >
              <p style={{ fontSize: '24px', fontWeight: 900, letterSpacing: '-0.5px', color: stat.color, marginBottom: '3px' }}>
                {stat.value}
              </p>
              <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 500 }}>{stat.label}</p>
            </Tag>
          )
        })}
      </div>

      {/* Badges */}
      <div style={{ padding: '16px 24px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>Badges</span>
          <span style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontWeight: 500 }}>3 of 6 earned</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
          {badges.map(badge => (
            <BadgeCard key={badge.id} badge={badge} onTap={() => openBadgeModal(badge)} />
          ))}
        </div>
      </div>

      {/* Settings */}
      <div style={{ padding: '16px 24px 0' }}>
        <div style={{ marginBottom: '12px' }}>
          <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>Settings</span>
        </div>
        <div style={{
          borderRadius: '20px',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-xs)',
          overflow: 'hidden',
        }}>
          {settingsItems.map((item, i) => (
            <div key={i}>
              <button className="row-hover pressable" style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: '12px',
                padding: '14px 18px', background: 'transparent',
                border: 'none', color: 'var(--text-primary)', cursor: 'pointer', textAlign: 'left',
                font: 'inherit',
              }}>
                <div style={{
                  width: '34px', height: '34px', borderRadius: '10px',
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '15px', flexShrink: 0,
                }}>{item.icon}</div>
                <span style={{ fontSize: '14px', fontWeight: 600, flex: 1, color: 'var(--text-primary)' }}>
                  {item.label}
                </span>
                {item.value && (
                  <span style={{ fontSize: '13px', color: 'var(--text-tertiary)', fontWeight: 400 }}>{item.value}</span>
                )}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ marginLeft: '2px', flexShrink: 0 }}>
                  <path d="M9 18l6-6-6-6" stroke="var(--border-strong)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {i < settingsItems.length - 1 && (
                <div style={{ height: '1px', background: 'var(--border)', marginLeft: '64px' }} />
              )}
            </div>
          ))}
        </div>

        <button className="pressable" style={{
          width: '100%', marginTop: '10px', padding: '14px', borderRadius: '16px',
          background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.15)',
          color: 'var(--accent-red)', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
        }}>
          Sign Out
        </button>
      </div>

    </div>
  )
}

function BadgeCard({ badge, onTap }) {
  return (
    <button
      className="pressable"
      onClick={onTap}
      aria-label={`${badge.name} badge${badge.earned ? ', earned' : ', locked'}`}
      style={{
        borderRadius: '14px', padding: '14px 8px 12px',
        background: badge.earned ? `${badge.color}08` : 'var(--bg-secondary)',
        border: badge.earned ? `1px solid ${badge.color}20` : '1px solid var(--border)',
        textAlign: 'center',
        opacity: badge.earned ? 1 : 0.55,
        cursor: 'pointer', color: 'inherit', width: '100%', position: 'relative',
        boxShadow: badge.earned ? 'var(--shadow-xs)' : 'none',
        transition: 'all 0.15s ease',
      }}
    >
      {!badge.earned && (
        <div style={{
          position: 'absolute', top: '6px', right: '6px',
          width: '14px', height: '14px', borderRadius: '50%',
          background: 'var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="7" height="7" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="5" y="11" width="14" height="11" rx="2" stroke="var(--text-tertiary)" strokeWidth="2.5"/>
            <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="var(--text-tertiary)" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </div>
      )}
      <div style={{ fontSize: '26px', marginBottom: '6px', filter: badge.earned ? 'none' : 'grayscale(1)' }}>
        {badge.emoji}
      </div>
      <p style={{
        fontSize: '10px', fontWeight: 700,
        color: badge.earned ? badge.color : 'var(--text-tertiary)',
        letterSpacing: '-0.1px', lineHeight: 1.2, marginBottom: '2px',
      }}>{badge.name}</p>
      <p style={{ fontSize: '9px', color: 'var(--text-tertiary)', lineHeight: 1.3, fontWeight: 400 }}>
        {badge.description}
      </p>
    </button>
  )
}
