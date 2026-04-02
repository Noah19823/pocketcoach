import { useState, useEffect } from 'react'

const TODAY_IDX = 4
const DAYS = ['M', 'T', 'W', 'T', 'F', 'Sa', 'Su']

const weeklySpend = [
  { day: 'M',  amount: 45  },
  { day: 'T',  amount: 12  },
  { day: 'W',  amount: 67  },
  { day: 'T',  amount: 89  },
  { day: 'F',  amount: 82  },
  { day: 'Sa', amount: 35  },
  { day: 'Su', amount: 10  },
]
const MAX_BAR = Math.max(...weeklySpend.map(d => d.amount))

const categories = [
  { name: 'Food',    emoji: '🌯', amount: 74,  pct: 22, color: '#E85D04' },
  { name: 'Gas',     emoji: '⛽', amount: 42,  pct: 12, color: '#2563EB' },
  { name: 'Music',   emoji: '🎵', amount: 10,  pct: 3,  color: '#7C3AED' },
  { name: 'Other',   emoji: '🛍️', amount: 214, pct: 63, color: '#D4D0CA' },
]

const transactions = [
  { name: 'Chipotle',         date: 'Today',     amount: -14.50, emoji: '🌯', category: 'Food'          },
  { name: 'Savings Transfer', date: 'Yesterday', amount:  50.00, emoji: '💰', category: 'Savings'       },
  { name: 'Spotify',          date: 'Mar 26',    amount:  -9.99, emoji: '🎵', category: 'Entertainment' },
  { name: 'Gas Station',      date: 'Mar 25',    amount: -42.00, emoji: '⛽', category: 'Transport'     },
]

export default function HomeScreen({ setActiveTab, unreadCount, onBellClick }) {
  return (
    <div style={{ minHeight: '100%', background: 'var(--bg-primary)', paddingBottom: '32px' }}>

      {/* ── Header ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '8px 24px 0',
      }}>
        <div>
          <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontWeight: 500 }}>
            Good morning
          </p>
          <h1 style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '-0.6px', color: 'var(--text-primary)' }}>
            Noah 👋
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            onClick={onBellClick}
            aria-label="Notifications"
            style={{
              width: '38px', height: '38px', borderRadius: '50%',
              background: 'var(--bg-secondary)', border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-xs)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative', cursor: 'pointer',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
                stroke="var(--text-secondary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"
                stroke="var(--text-secondary)" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            {unreadCount > 0 && (
              <div style={{
                position: 'absolute', top: '6px', right: '6px',
                width: '8px', height: '8px', borderRadius: '50%',
                background: 'var(--accent-orange)',
                border: '1.5px solid var(--bg-primary)',
                animation: 'pulseGlow 2s ease-in-out infinite',
              }} />
            )}
          </button>
          <button
            className="pressable"
            onClick={() => setActiveTab('profile')}
            style={{
              width: '38px', height: '38px', borderRadius: '50%',
              background: 'var(--accent-primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '14px', fontWeight: 700, color: 'white', cursor: 'pointer',
            }}
          >N</button>
        </div>
      </div>

      {/* ── HERO: Spending card with bar chart ── */}
      <div style={{ padding: '16px 24px 0' }}>
        <SpendingCard />
      </div>

      {/* ── Streak ── */}
      <div style={{ padding: '12px 24px 0' }}>
        <StreakCard />
      </div>

      {/* ── Max card ── */}
      <div style={{ padding: '12px 24px 0' }}>
        <button
          className="pressable"
          onClick={() => setActiveTab('coach')}
          style={{
            width: '100%', display: 'flex', alignItems: 'flex-start', gap: '12px',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            borderRadius: '20px',
            boxShadow: 'var(--shadow-sm)',
            padding: '16px 18px',
            cursor: 'pointer', textAlign: 'left',
          }}
        >
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #0D9488, #0369A1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '18px',
              boxShadow: '0 4px 12px rgba(13,148,136,0.25)',
            }}>🤖</div>
            <div style={{
              position: 'absolute', bottom: '0', right: '0',
              width: '10px', height: '10px', borderRadius: '50%',
              background: '#22C55E', border: '2px solid var(--bg-secondary)',
              animation: 'pulseGlow 2s ease-in-out infinite',
            }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '4px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>Max</span>
              <span style={{
                fontSize: '10px', color: 'white', fontWeight: 600,
                background: 'var(--accent-teal)', borderRadius: '99px', padding: '1px 6px',
              }}>AI Coach</span>
              <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginLeft: 'auto' }}>now</span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
              "You've been consistent this week. That $87 you saved? That's not nothing."
            </p>
            <span style={{ fontSize: '11px', color: 'var(--accent-teal)', fontWeight: 600, marginTop: '8px', display: 'block' }}>
              Reply →
            </span>
          </div>
        </button>
      </div>

      {/* ── Category breakdown ── */}
      <div style={{ padding: '12px 24px 0' }}>
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
          borderRadius: '20px',
          boxShadow: 'var(--shadow-sm)',
          padding: '18px 20px',
        }}>
          <p style={{
            fontSize: '11px', fontWeight: 700, color: 'var(--text-tertiary)',
            textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px',
          }}>By Category</p>
          {categories.map((cat, i) => (
            <CategoryRow key={i} cat={cat} delay={i * 0.07} />
          ))}
        </div>
      </div>

      {/* ── Transactions ── */}
      <div style={{ padding: '12px 24px 0' }}>
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
          borderRadius: '20px',
          boxShadow: 'var(--shadow-sm)',
          overflow: 'hidden',
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '14px 20px 10px',
            borderBottom: '1px solid var(--border)',
          }}>
            <span style={{
              fontSize: '11px', fontWeight: 700, color: 'var(--text-tertiary)',
              textTransform: 'uppercase', letterSpacing: '0.08em',
            }}>Recent</span>
            <button className="pressable" style={{
              fontSize: '12px', color: 'var(--accent-teal)', fontWeight: 600,
              background: 'none', border: 'none', cursor: 'pointer',
            }}>See all</button>
          </div>
          {transactions.map((t, i) => (
            <div key={i}>
              <div className="row-hover" style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '12px 20px', cursor: 'pointer',
              }}>
                <div style={{
                  width: '38px', height: '38px', borderRadius: '11px',
                  background: t.amount > 0 ? 'rgba(22,163,74,0.08)' : 'var(--bg-primary)',
                  border: `1px solid ${t.amount > 0 ? 'rgba(22,163,74,0.15)' : 'var(--border)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '16px', flexShrink: 0,
                }}>{t.emoji}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1px' }}>
                    {t.name}
                  </p>
                  <p style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                    {t.category} · {t.date}
                  </p>
                </div>
                <span className="num" style={{
                  fontSize: '14px', fontWeight: 700,
                  color: t.amount > 0 ? 'var(--accent-green)' : 'var(--text-primary)',
                }}>
                  {t.amount > 0 ? '+' : '−'}${Math.abs(t.amount).toFixed(2)}
                </span>
              </div>
              {i < transactions.length - 1 && (
                <div style={{ height: '1px', background: 'var(--border)', margin: '0 20px' }} />
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

/* ── Sub-components ─────────────────────────────────────────── */

function SpendingCard() {
  const [barsReady, setBarsReady] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setBarsReady(true), 120)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{
      background: 'var(--bg-secondary)',
      border: '1px solid var(--border)',
      borderRadius: '24px',
      boxShadow: 'var(--shadow-md)',
      padding: '22px 22px 18px',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Decorative accent circle */}
      <div style={{
        position: 'absolute', top: '-28px', right: '-28px',
        width: '100px', height: '100px', borderRadius: '50%',
        background: 'rgba(232,93,4,0.07)',
        pointerEvents: 'none',
      }} />

      {/* Amount row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
        <div>
          <p style={{
            fontSize: '10px', fontWeight: 700, color: 'var(--text-tertiary)',
            textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px',
          }}>Spent this week</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px' }}>
            <span className="num" style={{
              fontSize: '44px', fontWeight: 800, letterSpacing: '-3px',
              lineHeight: 1, color: 'var(--text-primary)',
            }}>$340</span>
            <span style={{ fontSize: '13px', color: 'var(--text-tertiary)', fontWeight: 500, marginBottom: '5px' }}>
              / $515
            </span>
          </div>
        </div>
        <div style={{
          background: 'rgba(22,163,74,0.08)',
          border: '1px solid rgba(22,163,74,0.18)',
          borderRadius: '99px', padding: '4px 10px',
          fontSize: '12px', fontWeight: 700, color: 'var(--accent-green)',
        }}>$175 left</div>
      </div>

      {/* Bar chart */}
      <div style={{
        display: 'flex', gap: '5px', alignItems: 'flex-end',
        height: '52px', marginBottom: '8px',
      }}>
        {weeklySpend.map((d, i) => {
          const isToday = i === TODAY_IDX
          const isHigh = d.amount >= 80
          const targetH = barsReady ? Math.max(4, (d.amount / MAX_BAR) * 52) : 0
          return (
            <div key={i} style={{
              flex: 1, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'flex-end', height: '100%',
            }}>
              <div style={{
                width: '100%',
                height: `${targetH}px`,
                borderRadius: '4px 4px 2px 2px',
                background: isToday
                  ? 'var(--accent-teal)'
                  : isHigh ? 'var(--accent-orange)' : 'var(--border)',
                transition: `height 0.55s cubic-bezier(0.4,0,0.2,1) ${i * 0.055}s`,
                position: 'relative',
              }}>
                {isToday && (
                  <div style={{
                    position: 'absolute', top: '-4px', left: '50%', transform: 'translateX(-50%)',
                    width: '4px', height: '4px', borderRadius: '50%',
                    background: 'var(--accent-teal)',
                  }} />
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Day labels */}
      <div style={{ display: 'flex', gap: '5px' }}>
        {weeklySpend.map((d, i) => (
          <div key={i} style={{ flex: 1, textAlign: 'center' }}>
            <span style={{
              fontSize: '9px', fontWeight: i === TODAY_IDX ? 700 : 500,
              color: i === TODAY_IDX ? 'var(--accent-teal)' : 'var(--text-tertiary)',
              textTransform: 'uppercase',
            }}>{d.day}</span>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div style={{ marginTop: '14px' }}>
        <div style={{ height: '4px', borderRadius: '99px', background: 'var(--border)', overflow: 'hidden' }}>
          <div style={{
            height: '100%', borderRadius: '99px',
            background: 'linear-gradient(90deg, var(--accent-orange), #F97316)',
            width: barsReady ? '66%' : '0%',
            transition: 'width 0.7s cubic-bezier(0.4,0,0.2,1) 0.2s',
          }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 500 }}>66% of weekly budget</span>
          <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600 }}>2 days left</span>
        </div>
      </div>
    </div>
  )
}

function StreakCard() {
  const DAYS_COMPLETED = 5
  return (
    <div style={{
      background: 'var(--bg-secondary)',
      border: '1px solid var(--border)',
      borderRadius: '20px',
      boxShadow: 'var(--shadow-sm)',
      padding: '16px 18px',
      display: 'flex', alignItems: 'center', gap: '14px',
    }}>
      <div style={{
        width: '48px', height: '48px', borderRadius: '14px',
        background: 'rgba(232,93,4,0.08)',
        border: '1px solid rgba(232,93,4,0.15)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '24px', flexShrink: 0,
      }}>🔥</div>

      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '8px' }}>
          <span className="num" style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '-1px', color: 'var(--accent-orange)' }}>7</span>
          <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500 }}>day streak</span>
          <div style={{
            marginLeft: 'auto',
            background: 'rgba(232,93,4,0.08)', border: '1px solid rgba(232,93,4,0.18)',
            borderRadius: '99px', padding: '2px 8px',
            fontSize: '11px', fontWeight: 700, color: 'var(--accent-orange)',
          }}>+50 XP</div>
        </div>
        {/* Day dots inline */}
        <div style={{ display: 'flex', gap: '4px' }}>
          {DAYS.map((day, i) => {
            const filled = i < DAYS_COMPLETED
            const isToday = i === TODAY_IDX
            return (
              <div key={i} style={{
                flex: 1, height: '6px', borderRadius: '99px',
                background: filled ? 'var(--accent-orange)' : 'var(--border)',
                opacity: isToday ? 1 : filled ? 0.7 : 1,
                transition: `background 0.3s ease ${i * 0.04}s`,
              }} />
            )
          })}
        </div>
      </div>
    </div>
  )
}

function CategoryRow({ cat, delay }) {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setWidth(cat.pct), 200 + delay * 1000)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{ marginBottom: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '13px' }}>{cat.emoji}</span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{cat.name}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="num" style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
            ${cat.amount}
          </span>
          <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 500, minWidth: '28px', textAlign: 'right' }}>
            {cat.pct}%
          </span>
        </div>
      </div>
      <div style={{ height: '5px', borderRadius: '99px', background: 'var(--border)', overflow: 'hidden' }}>
        <div style={{
          height: '100%', borderRadius: '99px',
          background: cat.color,
          width: `${width}%`,
          transition: `width 0.65s cubic-bezier(0.4,0,0.2,1) ${delay}s`,
        }} />
      </div>
    </div>
  )
}
