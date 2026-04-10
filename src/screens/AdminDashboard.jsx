import { useState, useEffect } from 'react'
import { LogoLockup } from '../components/Logo'

/* ── Mock data ───────────────────────────────────────────────────── */

const CHART_DATA = [
  { date: 'Mar 7',  value: 182 }, { date: 'Mar 8',  value: 195 },
  { date: 'Mar 9',  value: 188 }, { date: 'Mar 10', value: 201 },
  { date: 'Mar 11', value: 210 }, { date: 'Mar 12', value: 198 },
  { date: 'Mar 13', value: 215 }, { date: 'Mar 14', value: 223 },
  { date: 'Mar 15', value: 218 }, { date: 'Mar 16', value: 230 },
  { date: 'Mar 17', value: 225 }, { date: 'Mar 18', value: 238 },
  { date: 'Mar 19', value: 232 }, { date: 'Mar 20', value: 245 },
  { date: 'Mar 21', value: 241 }, { date: 'Mar 22', value: 247 },
  { date: 'Mar 23', value: 235 }, { date: 'Mar 24', value: 252 },
  { date: 'Mar 25', value: 248 }, { date: 'Mar 26', value: 255 },
  { date: 'Mar 27', value: 243 }, { date: 'Mar 28', value: 258 },
  { date: 'Mar 29', value: 262 }, { date: 'Mar 30', value: 257 },
  { date: 'Mar 31', value: 265 }, { date: 'Apr 1',  value: 259 },
  { date: 'Apr 2',  value: 271 }, { date: 'Apr 3',  value: 268 },
  { date: 'Apr 4',  value: 275 }, { date: 'Apr 5',  value: 247 },
]

const SEVEN_DAY_DATA = CHART_DATA.slice(-7)

const NINETY_DAY_DATA = (() => {
  const base = [158, 161, 155, 163, 168, 172, 166, 170, 175, 169,
                 178, 182, 176, 184, 181, 188, 185, 192, 189, 195,
                 191, 198, 196, 202, 199, 205, 203, 208, 206, 210,
                 ...CHART_DATA.map(d => d.value),
                 ...Array.from({ length: 30 }, (_, i) => Math.round(247 + i * 0.8 + Math.sin(i) * 4))]
  return base.slice(0, 90).map((v, i) => ({
    date: `Day ${i + 1}`,
    value: v,
  }))
})()

const RANGE_OPTIONS = [
  { label: '7D',  data: SEVEN_DAY_DATA },
  { label: '30D', data: CHART_DATA },
  { label: '90D', data: NINETY_DAY_DATA },
]

const FLAGGED = [
  {
    initials: 'JR', name: 'James R.', color: '#E85D04',
    reason: 'Missed savings goal 3 weeks in a row',
    tag: 'Goal Risk', tagColor: '#E85D04',
    contacted: false,
  },
  {
    initials: 'KT', name: 'Keisha T.', color: '#2563EB',
    reason: 'Spending 40% above average for her income bracket',
    tag: 'Overspending', tagColor: '#2563EB',
    contacted: false,
  },
  {
    initials: 'MD', name: 'Marcus D.', color: '#7C3AED',
    reason: 'No app activity in 14 days',
    tag: 'Disengaged', tagColor: '#7C3AED',
    contacted: false,
  },
]

const WINS = [
  { initials: 'SM', name: 'Sarah M.',  color: '#0D9488', achievement: 'Hit $1,000 Emergency Fund goal', emoji: '🎉', amount: '$1,000' },
  { initials: 'PK', name: 'Priya K.',  color: '#16A34A', achievement: 'Saved $500 toward new laptop in 6 weeks', emoji: '💪', amount: '$500' },
  { initials: 'JL', name: 'Jordan L.', color: '#7C3AED', achievement: 'Maintained 30-day streak — longest in her cohort', emoji: '🔥', amount: '30 days' },
]

const STATS = [
  {
    label: 'Active Members This Week',
    value: '247',
    change: '+12%',
    changeLabel: 'vs last week',
    positive: true,
    icon: '👥',
    sparkline: [180, 185, 192, 188, 201, 210, 222, 231, 241, 247],
  },
  {
    label: 'Average Monthly Savings',
    value: '+23%',
    change: '$187 → $230',
    changeLabel: 'avg per member',
    positive: true,
    icon: '📈',
    sparkline: [187, 191, 196, 194, 200, 205, 210, 218, 225, 230],
  },
  {
    label: 'Daily App Open Rate',
    value: '89%',
    change: '+4 pts',
    changeLabel: 'vs last month',
    positive: true,
    icon: '📱',
    sparkline: [82, 83, 84, 85, 84, 86, 87, 88, 88, 89],
  },
  {
    label: 'Members Need Coaching',
    value: '12',
    change: '3 flagged today',
    changeLabel: 'need attention',
    positive: false,
    icon: '🚩',
    sparkline: [7, 9, 8, 11, 10, 13, 11, 14, 13, 12],
  },
]

const NAV_ITEMS = [
  { id: 'overview',   label: 'Overview',  icon: SquaresIcon },
  { id: 'members',    label: 'Members',   icon: UsersIcon },
  { id: 'analytics',  label: 'Analytics', icon: ChartIcon },
  { id: 'settings',   label: 'Settings',  icon: GearIcon },
]

/* ── Root component ──────────────────────────────────────────────── */

export default function AdminDashboard() {
  const [activeNav, setActiveNav] = useState('overview')
  const [toast, setToast] = useState(null)
  const [contacted, setContacted] = useState({})
  const [activeRange, setActiveRange] = useState(1) // index into RANGE_OPTIONS

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3500)
  }

  const handleReachOut = (name) => {
    setContacted(prev => ({ ...prev, [name]: true }))
    showToast(`Message queued for ${name}`)
  }

  const chartData = RANGE_OPTIONS[activeRange].data

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'var(--font)', background: 'var(--bg-primary)' }}>

      {/* ── Sidebar ── */}
      <aside style={{
        width: '228px',
        flexShrink: 0,
        background: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        height: '100vh',
      }}>
        {/* Logo */}
        <div style={{ padding: '22px 20px 18px', borderBottom: '1px solid var(--border)' }}>
          <LogoLockup size={32} />
          <p style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 500, marginTop: '6px', paddingLeft: '2px' }}>
            Admin Portal
          </p>
        </div>

        {/* Nav */}
        <nav style={{ padding: '12px 12px', flex: 1 }}>
          <p style={{
            fontSize: '10px', fontWeight: 700, color: 'var(--text-tertiary)',
            textTransform: 'uppercase', letterSpacing: '0.08em',
            padding: '0 8px', marginBottom: '6px',
          }}>Navigation</p>
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
            const active = activeNav === id
            return (
              <button
                key={id}
                onClick={() => setActiveNav(id)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '9px 10px', borderRadius: '10px', border: 'none',
                  background: active ? 'rgba(13,148,136,0.08)' : 'transparent',
                  color: active ? 'var(--accent-teal)' : 'var(--text-secondary)',
                  fontSize: '13.5px', fontWeight: active ? 700 : 500,
                  cursor: 'pointer', textAlign: 'left',
                  marginBottom: '2px',
                  transition: 'all 0.15s ease',
                }}
              >
                <Icon size={16} color={active ? 'var(--accent-teal)' : 'var(--text-tertiary)'} />
                {label}
                {id === 'members' && (
                  <span style={{
                    marginLeft: 'auto', background: 'var(--bg-primary)',
                    border: '1px solid var(--border)',
                    borderRadius: '99px', padding: '1px 7px',
                    fontSize: '10px', fontWeight: 700, color: 'var(--text-secondary)',
                  }}>247</span>
                )}
              </button>
            )
          })}
        </nav>

        {/* Credit union info */}
        <div style={{
          margin: '12px', padding: '14px',
          background: 'var(--bg-primary)', borderRadius: '12px',
          border: '1px solid var(--border)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <div style={{
              width: '28px', height: '28px', borderRadius: '8px',
              background: 'linear-gradient(135deg, #7C3AED, #2563EB)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '13px',
            }}>🏦</div>
            <div>
              <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>Horizon CU</p>
              <p style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>Enterprise Plan</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: '#22C55E',
              boxShadow: '0 0 6px rgba(34,197,94,0.6)',
            }} />
            <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 500 }}>All systems operational</span>
          </div>
        </div>
      </aside>

      {/* ── Main content ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

        {/* Top bar */}
        <header style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 32px',
          height: '64px',
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border)',
          flexShrink: 0,
          position: 'sticky', top: 0, zIndex: 10,
        }}>
          <div>
            <h1 style={{ fontSize: '15px', fontWeight: 800, letterSpacing: '-0.3px', color: 'var(--text-primary)' }}>
              Horizon Credit Union
            </h1>
            <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontWeight: 500 }}>
              Admin Dashboard · Last synced Apr 5, 2026 at 9:41 AM
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.18)',
              borderRadius: '99px', padding: '4px 10px',
            }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22C55E' }} />
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#16A34A' }}>Live</span>
            </div>
            <button
              className="pressable"
              style={{
                padding: '7px 14px', borderRadius: '8px', border: '1px solid var(--border)',
                background: 'var(--bg-primary)', color: 'var(--text-secondary)',
                fontSize: '13px', fontWeight: 600, cursor: 'pointer',
              }}
            >
              Download Report
            </button>
            <button
              className="pressable"
              onClick={() => window.location.href = '/'}
              style={{
                padding: '7px 14px', borderRadius: '8px', border: 'none',
                background: 'var(--accent-primary)', color: 'white',
                fontSize: '13px', fontWeight: 600, cursor: 'pointer',
              }}
            >
              Log Out
            </button>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, padding: '28px 32px 48px', overflowY: 'auto' }}>

          {/* Page title */}
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '-0.5px', color: 'var(--text-primary)', marginBottom: '4px' }}>
              Overview
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-tertiary)', fontWeight: 500 }}>
              April 2026 · 247 active members this week
            </p>
          </div>

          {/* ── Stat cards ── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
            {STATS.map((stat, i) => (
              <StatCard key={i} stat={stat} />
            ))}
          </div>

          {/* ── Activity chart ── */}
          <div style={{
            background: 'var(--bg-secondary)', border: '1px solid var(--border)',
            borderRadius: '16px', padding: '24px',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: '24px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '2px' }}>
                  Member Activity
                </h3>
                <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontWeight: 500 }}>
                  Daily active members · {RANGE_OPTIONS[activeRange].label === '7D' ? 'Last 7 days' : RANGE_OPTIONS[activeRange].label === '30D' ? 'Last 30 days' : 'Last 90 days'}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-primary)', borderRadius: '8px', padding: '3px' }}>
                {RANGE_OPTIONS.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveRange(i)}
                    style={{
                      padding: '5px 12px', borderRadius: '6px', border: 'none',
                      background: activeRange === i ? 'var(--bg-secondary)' : 'transparent',
                      boxShadow: activeRange === i ? 'var(--shadow-xs)' : 'none',
                      color: activeRange === i ? 'var(--text-primary)' : 'var(--text-tertiary)',
                      fontSize: '12px', fontWeight: activeRange === i ? 700 : 500,
                      cursor: 'pointer', transition: 'all 0.15s ease',
                    }}
                  >{opt.label}</button>
                ))}
              </div>
            </div>
            <LineChart data={chartData} />
          </div>

          {/* ── Bottom two columns ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

            {/* Flagged members */}
            <div style={{
              background: 'var(--bg-secondary)', border: '1px solid var(--border)',
              borderRadius: '16px', padding: '20px',
              boxShadow: 'var(--shadow-sm)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '2px' }}>
                    Flagged for Coaching
                  </h3>
                  <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 500 }}>
                    {Object.keys(contacted).length} of {FLAGGED.length} contacted this week
                  </p>
                </div>
                <div style={{
                  background: 'rgba(232,93,4,0.08)', border: '1px solid rgba(232,93,4,0.18)',
                  borderRadius: '99px', padding: '3px 10px',
                  fontSize: '11px', fontWeight: 700, color: '#E85D04',
                }}>🚩 {FLAGGED.length} members</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {FLAGGED.map((member, i) => (
                  <FlaggedRow
                    key={i}
                    member={member}
                    contacted={!!contacted[member.name]}
                    onReachOut={() => handleReachOut(member.name)}
                  />
                ))}
              </div>
            </div>

            {/* This Month's Wins */}
            <div style={{
              background: 'var(--bg-secondary)', border: '1px solid var(--border)',
              borderRadius: '16px', padding: '20px',
              boxShadow: 'var(--shadow-sm)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '2px' }}>
                    This Month's Wins
                  </h3>
                  <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 500 }}>
                    Members who hit savings milestones
                  </p>
                </div>
                <div style={{
                  background: 'rgba(22,163,74,0.08)', border: '1px solid rgba(22,163,74,0.18)',
                  borderRadius: '99px', padding: '3px 10px',
                  fontSize: '11px', fontWeight: 700, color: '#16A34A',
                }}>🏆 {WINS.length} milestones</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {WINS.map((win, i) => (
                  <WinRow key={i} win={win} />
                ))}
              </div>

              <div style={{
                marginTop: '14px', padding: '12px 14px',
                background: 'rgba(13,148,136,0.05)', border: '1px solid rgba(13,148,136,0.12)',
                borderRadius: '10px',
              }}>
                <p style={{ fontSize: '12px', color: 'var(--accent-teal)', fontWeight: 600, marginBottom: '2px' }}>
                  📊 Portfolio health: 87/100
                </p>
                <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 500 }}>
                  Members are saving 23% more than credit unions using competitor apps.
                </p>
              </div>
            </div>

          </div>
        </main>
      </div>

      {/* ── Toast ── */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: '28px', left: '50%', transform: 'translateX(-50%)',
          background: 'var(--text-primary)', color: 'white',
          padding: '12px 20px', borderRadius: '12px',
          fontSize: '13px', fontWeight: 600,
          boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
          display: 'flex', alignItems: 'center', gap: '8px',
          animation: 'fadeUp 0.22s cubic-bezier(0.34,1.2,0.64,1)',
          zIndex: 999,
          whiteSpace: 'nowrap',
        }}>
          <span style={{ fontSize: '15px' }}>✓</span>
          {toast}
        </div>
      )}
    </div>
  )
}

/* ── Stat card ───────────────────────────────────────────────────── */

function StatCard({ stat }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setTimeout(() => setMounted(true), 80) }, [])

  const min = Math.min(...stat.sparkline)
  const max = Math.max(...stat.sparkline)
  const range = max - min || 1
  const n = stat.sparkline.length
  const w = 72, h = 28

  const points = stat.sparkline.map((v, i) => {
    const x = (i / (n - 1)) * w
    const y = h - ((v - min) / range) * (h - 4) - 2
    return `${x},${y}`
  }).join(' ')

  return (
    <div style={{
      background: 'var(--bg-secondary)', border: '1px solid var(--border)',
      borderRadius: '14px', padding: '18px 20px',
      boxShadow: 'var(--shadow-sm)',
      opacity: mounted ? 1 : 0,
      transform: mounted ? 'translateY(0)' : 'translateY(8px)',
      transition: 'opacity 0.3s ease, transform 0.3s ease',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
        <p style={{
          fontSize: '11px', fontWeight: 700, color: 'var(--text-tertiary)',
          textTransform: 'uppercase', letterSpacing: '0.06em',
          lineHeight: 1.4, maxWidth: '130px',
        }}>{stat.label}</p>
        <svg width={w} height={h} style={{ flexShrink: 0, opacity: 0.75 }}>
          <polyline
            points={points}
            fill="none"
            stroke={stat.positive ? 'var(--accent-teal)' : '#E85D04'}
            strokeWidth="1.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="num" style={{
        fontSize: '28px', fontWeight: 800, letterSpacing: '-0.8px',
        color: 'var(--text-primary)', marginBottom: '6px',
      }}>{stat.value}</div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span style={{
          fontSize: '11px', fontWeight: 700,
          color: stat.positive ? 'var(--accent-green)' : '#E85D04',
          display: 'flex', alignItems: 'center', gap: '2px',
        }}>
          {stat.positive ? '↑' : '↗'} {stat.change}
        </span>
        <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 500 }}>
          {stat.changeLabel}
        </span>
      </div>
    </div>
  )
}

/* ── Line chart ──────────────────────────────────────────────────── */

function LineChart({ data }) {
  const [clipWidth, setClipWidth] = useState(0)

  useEffect(() => {
    setClipWidth(0)
    const t = setTimeout(() => setClipWidth(100), 60)
    return () => clearTimeout(t)
  }, [data])

  const ML = 48, MR = 16, MT = 12, MB = 36
  const VW = 820, VH = 200
  const CW = VW - ML - MR
  const CH = VH - MT - MB

  const values = data.map(d => d.value)
  const minV = Math.min(...values)
  const maxV = Math.max(...values)
  const padV = (maxV - minV) * 0.1 || 10
  const yMin = Math.floor((minV - padV) / 25) * 25
  const yMax = Math.ceil((maxV + padV) / 25) * 25

  const xOf = (i) => ML + (i / (data.length - 1)) * CW
  const yOf = (v) => MT + CH - ((v - yMin) / (yMax - yMin)) * CH

  const linePath = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${xOf(i).toFixed(1)},${yOf(d.value).toFixed(1)}`).join(' ')
  const areaPath = linePath + ` L ${xOf(data.length - 1).toFixed(1)},${(MT + CH).toFixed(1)} L ${xOf(0).toFixed(1)},${(MT + CH).toFixed(1)} Z`

  const yGridValues = []
  for (let v = yMin; v <= yMax; v += 25) yGridValues.push(v)

  // X-axis: show up to 6 evenly-spaced labels
  const maxLabels = 6
  const step = Math.ceil(data.length / maxLabels)
  const xLabels = data.filter((_, i) => i % step === 0 || i === data.length - 1)
    .map((d, _, arr) => ({ ...d }))
  const xLabelIndices = data.reduce((acc, _, i) => {
    if (i % step === 0 || i === data.length - 1) acc.push(i)
    return acc
  }, [])

  const gradId = `chartGrad_${data.length}`

  return (
    <div style={{ width: '100%' }}>
      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        width="100%"
        style={{ display: 'block', overflow: 'visible' }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent-teal)" stopOpacity="0.14" />
            <stop offset="100%" stopColor="var(--accent-teal)" stopOpacity="0.01" />
          </linearGradient>
          <clipPath id="lineClip">
            <rect
              x="0" y="0"
              width={`${clipWidth}%`}
              height={VH}
              style={{ transition: 'width 1.1s cubic-bezier(0.4,0,0.2,1)' }}
            />
          </clipPath>
        </defs>

        {/* Grid lines */}
        {yGridValues.map((v, i) => (
          <g key={i}>
            <line
              x1={ML} y1={yOf(v)}
              x2={ML + CW} y2={yOf(v)}
              stroke="var(--border)" strokeWidth="1"
              strokeDasharray="4,4"
            />
            <text
              x={ML - 8} y={yOf(v) + 4}
              textAnchor="end" fontSize="10" fontWeight="500"
              fill="var(--text-tertiary)"
              fontFamily="var(--font)"
            >{v}</text>
          </g>
        ))}

        {/* Y-axis label */}
        <text
          x={10} y={MT + CH / 2}
          textAnchor="middle"
          fontSize="10" fontWeight="600"
          fill="var(--text-tertiary)"
          fontFamily="var(--font)"
          transform={`rotate(-90, 10, ${MT + CH / 2})`}
          letterSpacing="0.04em"
        >MEMBERS</text>

        {/* Area fill (clipped) */}
        <path d={areaPath} fill={`url(#${gradId})`} clipPath="url(#lineClip)" />

        {/* Line (clipped) */}
        <path
          d={linePath}
          fill="none"
          stroke="var(--accent-teal)"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          clipPath="url(#lineClip)"
        />

        {/* Dots at data points (every 5th) */}
        {data.map((d, i) => {
          if (i % 5 !== 0 && i !== data.length - 1) return null
          return (
            <circle
              key={i}
              cx={xOf(i)} cy={yOf(d.value)} r="3"
              fill="var(--bg-secondary)"
              stroke="var(--accent-teal)"
              strokeWidth="1.5"
              clipPath="url(#lineClip)"
            />
          )
        })}

        {/* Last point highlight */}
        <circle
          cx={xOf(data.length - 1)} cy={yOf(data[data.length - 1].value)} r="5"
          fill="var(--accent-teal)"
          clipPath="url(#lineClip)"
        />
        <circle
          cx={xOf(data.length - 1)} cy={yOf(data[data.length - 1].value)} r="9"
          fill="rgba(13,148,136,0.12)"
          clipPath="url(#lineClip)"
        />

        {/* X-axis labels */}
        {xLabelIndices.map((idx) => (
          <text
            key={idx}
            x={xOf(idx)} y={VH - 6}
            textAnchor="middle" fontSize="10" fontWeight="500"
            fill="var(--text-tertiary)"
            fontFamily="var(--font)"
          >{data[idx].date}</text>
        ))}

        {/* X axis baseline */}
        <line
          x1={ML} y1={MT + CH}
          x2={ML + CW} y2={MT + CH}
          stroke="var(--border)" strokeWidth="1"
        />
      </svg>
    </div>
  )
}

/* ── Flagged row ─────────────────────────────────────────────────── */

function FlaggedRow({ member, contacted, onReachOut }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '12px',
      padding: '12px 14px',
      background: 'var(--bg-primary)', borderRadius: '10px',
      border: '1px solid var(--border)',
    }}>
      <div style={{
        width: '36px', height: '36px', borderRadius: '50%',
        background: `${member.color}18`,
        border: `1.5px solid ${member.color}30`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '13px', fontWeight: 800, color: member.color,
        flexShrink: 0, letterSpacing: '-0.5px',
      }}>{member.initials}</div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '3px' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
            {member.name}
          </span>
          <span style={{
            fontSize: '10px', fontWeight: 700,
            color: member.tagColor, background: `${member.tagColor}12`,
            border: `1px solid ${member.tagColor}25`,
            borderRadius: '99px', padding: '1px 6px',
          }}>{member.tag}</span>
        </div>
        <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 500, lineHeight: 1.4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {member.reason}
        </p>
      </div>

      <button
        className="pressable"
        onClick={onReachOut}
        disabled={contacted}
        style={{
          flexShrink: 0,
          padding: '6px 12px', borderRadius: '8px', border: 'none',
          background: contacted ? 'rgba(22,163,74,0.08)' : 'rgba(13,148,136,0.1)',
          color: contacted ? '#16A34A' : 'var(--accent-teal)',
          fontSize: '12px', fontWeight: 700, cursor: contacted ? 'default' : 'pointer',
          transition: 'all 0.15s ease',
          border: `1px solid ${contacted ? 'rgba(22,163,74,0.2)' : 'rgba(13,148,136,0.2)'}`,
        }}
      >
        {contacted ? '✓ Sent' : 'Reach Out'}
      </button>
    </div>
  )
}

/* ── Win row ─────────────────────────────────────────────────────── */

function WinRow({ win }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '12px',
      padding: '12px 14px',
      background: 'var(--bg-primary)', borderRadius: '10px',
      border: '1px solid var(--border)',
    }}>
      <div style={{
        width: '36px', height: '36px', borderRadius: '50%',
        background: `${win.color}18`,
        border: `1.5px solid ${win.color}30`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '13px', fontWeight: 800, color: win.color,
        flexShrink: 0,
      }}>{win.initials}</div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>{win.name}</span>
          <span style={{ fontSize: '14px' }}>{win.emoji}</span>
        </div>
        <p style={{
          fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 500, lineHeight: 1.4,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>{win.achievement}</p>
      </div>

      <div style={{
        flexShrink: 0,
        background: `${win.color}10`, border: `1px solid ${win.color}25`,
        borderRadius: '8px', padding: '4px 10px',
        fontSize: '11px', fontWeight: 700, color: win.color,
      }}>{win.amount}</div>
    </div>
  )
}

/* ── SVG icon components ─────────────────────────────────────────── */

function SquaresIcon({ size = 16, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="6" height="6" rx="1.5" fill={color} opacity="0.9" />
      <rect x="9" y="1" width="6" height="6" rx="1.5" fill={color} opacity="0.5" />
      <rect x="1" y="9" width="6" height="6" rx="1.5" fill={color} opacity="0.5" />
      <rect x="9" y="9" width="6" height="6" rx="1.5" fill={color} opacity="0.9" />
    </svg>
  )
}

function UsersIcon({ size = 16, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="6" cy="5" r="2.5" fill={color} />
      <path d="M1 13c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="5" r="2" fill={color} opacity="0.5" />
      <path d="M11 13c0-1.1.45-2.1 1.18-2.82" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  )
}

function ChartIcon({ size = 16, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <polyline points="1,12 5,7 8,9 12,4 15,6" stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
      <line x1="1" y1="14" x2="15" y2="14" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    </svg>
  )
}

function GearIcon({ size = 16, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="2.5" stroke={color} strokeWidth="1.5" />
      <path
        d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41"
        stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.7"
      />
    </svg>
  )
}
