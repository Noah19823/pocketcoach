import { useState, useEffect } from 'react'

const GOAL_COLORS = ['#0D9488', '#7C3AED', '#E85D04', '#2563EB', '#DC2626']

const initialGoals = [
  { id: 1, name: 'Emergency Fund', emoji: '🛡️', saved: 615, target: 1000, color: '#0D9488' },
  { id: 2, name: 'New iPhone',     emoji: '📱', saved: 280, target: 800,  color: '#7C3AED' },
  { id: 3, name: 'Gaming Setup',   emoji: '🎮', saved: 120, target: 500,  color: '#E85D04' },
]

export default function GoalsScreen() {
  const [goals, setGoals] = useState(initialGoals)
  const [showAdd, setShowAdd] = useState(false)
  const [newGoal, setNewGoal] = useState({ name: '', target: '', emoji: '🎯' })
  const [formErrors, setFormErrors] = useState({})

  const totalSaved = goals.reduce((s, g) => s + g.saved, 0)
  const totalTarget = goals.reduce((s, g) => s + g.target, 0)

  const handleDeposit = (goalId, amount) => {
    if (!amount || isNaN(amount) || amount <= 0) return
    setGoals(prev => prev.map(g =>
      g.id === goalId
        ? { ...g, saved: Math.min(g.saved + amount, g.target) }
        : g
    ))
  }

  const handleAddGoal = () => {
    const errors = {}
    if (!newGoal.name.trim()) errors.name = true
    if (!newGoal.target || isNaN(Number(newGoal.target)) || Number(newGoal.target) <= 0) errors.target = true
    if (Object.keys(errors).length) { setFormErrors(errors); return }
    setFormErrors({})
    setGoals(prev => [...prev, {
      id: Date.now(),
      name: newGoal.name.trim(),
      emoji: newGoal.emoji || '🎯',
      saved: 0,
      target: parseInt(newGoal.target),
      color: GOAL_COLORS[prev.length % GOAL_COLORS.length],
    }])
    setNewGoal({ name: '', target: '', emoji: '🎯' })
    setShowAdd(false)
  }

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100%', paddingBottom: '32px' }}>

      {/* Header */}
      <div style={{ padding: '8px 24px 0' }}>
        <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontWeight: 500, marginBottom: '1px' }}>
          {goals.length} active
        </p>
        <h1 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
          Savings Goals
        </h1>
      </div>

      {/* ── HERO: Total saved ── */}
      <div style={{ padding: '20px 24px 0' }}>
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
          borderRadius: '24px',
          boxShadow: 'var(--shadow-md)',
          padding: '24px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', bottom: '-24px', right: '-24px',
            width: '100px', height: '100px', borderRadius: '50%',
            background: 'rgba(22,163,74,0.06)',
          }} />
          <p style={{
            fontSize: '11px', fontWeight: 700, color: 'var(--text-tertiary)',
            textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px',
          }}>Total saved</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', marginBottom: '16px' }}>
            <span style={{
              fontSize: '48px', fontWeight: 800, letterSpacing: '-3px',
              lineHeight: 1, color: 'var(--accent-green)',
            }}>${totalSaved.toLocaleString()}</span>
            <span style={{ fontSize: '14px', color: 'var(--text-tertiary)', fontWeight: 500, marginBottom: '6px' }}>
              of ${totalTarget.toLocaleString()}
            </span>
          </div>
          <div style={{ height: '5px', borderRadius: '99px', background: 'var(--border)' }}>
            <div style={{
              height: '100%', borderRadius: '99px',
              background: 'var(--accent-green)',
              width: `${Math.round((totalSaved / totalTarget) * 100)}%`,
              transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)',
            }} />
          </div>
        </div>
      </div>

      {/* Goal cards */}
      <div style={{ padding: '16px 24px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {goals.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎯</div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>No goals yet</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Set your first goal and start building toward something real.
            </p>
          </div>
        ) : (
          goals.map(goal => {
            const pct = Math.min(Math.round((goal.saved / goal.target) * 100), 100)
            return <GoalCard key={goal.id} goal={goal} pct={pct} onDeposit={handleDeposit} />
          })
        )}
      </div>

      {/* Add goal */}
      <div style={{ padding: '12px 24px 0' }}>
        {!showAdd ? (
          <button
            className="pressable"
            onClick={() => setShowAdd(true)}
            style={{
              width: '100%', padding: '16px',
              borderRadius: '16px',
              background: 'var(--bg-secondary)',
              border: '1.5px dashed var(--border)',
              color: 'var(--text-tertiary)', fontSize: '14px', fontWeight: 600,
              cursor: 'pointer', display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: '8px',
              transition: 'all 0.18s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(13,148,136,0.4)'
              e.currentTarget.style.color = 'var(--accent-teal)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.color = 'var(--text-tertiary)'
            }}
          >
            <span style={{ fontSize: '18px' }}>+</span> Add New Goal
          </button>
        ) : (
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            borderRadius: '20px',
            boxShadow: 'var(--shadow-md)',
            padding: '20px',
            animation: 'fadeUp 0.18s ease',
          }}>
            <p style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>
              New Goal
            </p>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <input
                value={newGoal.emoji}
                onChange={e => setNewGoal(p => ({ ...p, emoji: e.target.value }))}
                style={{
                  width: '52px', padding: '11px', textAlign: 'center',
                  background: 'var(--bg-primary)', borderRadius: '12px',
                  border: '1px solid var(--border)', color: 'var(--text-primary)',
                  fontSize: '20px',
                }}
              />
              <input
                value={newGoal.name}
                onChange={e => { setNewGoal(p => ({ ...p, name: e.target.value })); setFormErrors(p => ({ ...p, name: false })) }}
                placeholder="Goal name"
                aria-label="Goal name"
                style={{
                  flex: 1, padding: '11px 14px',
                  background: 'var(--bg-primary)', borderRadius: '12px',
                  border: formErrors.name ? '1.5px solid var(--accent-red)' : '1px solid var(--border)',
                  color: 'var(--text-primary)', fontSize: '14px',
                }}
              />
            </div>
            {formErrors.name && (
              <p style={{ fontSize: '11px', color: 'var(--accent-red)', marginBottom: '8px', paddingLeft: '62px', fontWeight: 600 }}>
                Goal name is required
              </p>
            )}
            <input
              type="number"
              value={newGoal.target}
              onChange={e => { setNewGoal(p => ({ ...p, target: e.target.value })); setFormErrors(p => ({ ...p, target: false })) }}
              placeholder="Target amount ($)"
              aria-label="Target amount"
              style={{
                width: '100%', padding: '11px 14px',
                background: 'var(--bg-primary)', borderRadius: '12px',
                border: formErrors.target ? '1.5px solid var(--accent-red)' : '1px solid var(--border)',
                color: 'var(--text-primary)', fontSize: '14px',
                marginBottom: formErrors.target ? '4px' : '16px',
              }}
            />
            {formErrors.target && (
              <p style={{ fontSize: '11px', color: 'var(--accent-red)', marginBottom: '12px', fontWeight: 600 }}>
                Enter a target amount
              </p>
            )}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="pressable" onClick={() => { setShowAdd(false); setFormErrors({}) }} style={{
                flex: 1, padding: '12px', borderRadius: '12px',
                background: 'var(--bg-primary)', border: '1px solid var(--border)',
                color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
              }}>Cancel</button>
              <button className="pressable" onClick={handleAddGoal} style={{
                flex: 2, padding: '12px', borderRadius: '12px',
                background: 'var(--accent-primary)',
                color: 'white', fontSize: '14px', fontWeight: 700, cursor: 'pointer',
              }}>Create Goal</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function GoalCard({ goal, pct, onDeposit }) {
  const [depositing, setDepositing] = useState(false)
  const [amount, setAmount] = useState('')
  const [inputFocused, setInputFocused] = useState(false)
  const [barWidth, setBarWidth] = useState(0)
  const [justDeposited, setJustDeposited] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setBarWidth(pct), 80)
    return () => clearTimeout(t)
  }, [pct])

  const isComplete = pct >= 100
  const remaining = goal.target - goal.saved

  const handleSave = () => {
    const val = parseFloat(amount)
    if (!val || val <= 0) return
    onDeposit(goal.id, val)
    setAmount('')
    setDepositing(false)
    setJustDeposited(true)
    setTimeout(() => setJustDeposited(false), 2000)
  }

  return (
    <div style={{
      background: 'var(--bg-secondary)',
      border: `1px solid ${justDeposited ? `${goal.color}30` : 'var(--border)'}`,
      borderRadius: '20px',
      boxShadow: justDeposited ? `0 4px 20px ${goal.color}18` : 'var(--shadow-sm)',
      padding: '20px',
      transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    }}>
      {/* Title row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
        <div style={{
          width: '46px', height: '46px', borderRadius: '14px',
          background: `${goal.color}10`,
          border: `1px solid ${goal.color}22`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '22px', flexShrink: 0,
        }}>{goal.emoji}</div>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '2px' }}>
            {goal.name}
          </p>
          <p style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
            <span style={{ color: goal.color, fontWeight: 700 }}>${goal.saved.toLocaleString()}</span>
            {' '}saved · ${remaining.toLocaleString()} to go
          </p>
        </div>
        <div style={{
          background: isComplete ? `${goal.color}12` : `${goal.color}0D`,
          border: `1px solid ${goal.color}22`,
          borderRadius: '99px', padding: '4px 10px',
          fontSize: '13px', fontWeight: 800, color: goal.color,
        }}>
          {isComplete ? '✓' : `${pct}%`}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{
        height: '6px', borderRadius: '99px',
        background: 'var(--border)', marginBottom: '14px',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%', width: `${barWidth}%`, borderRadius: '99px',
          background: goal.color,
          transition: 'width 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
        }} />
      </div>

      {/* Success flash */}
      {justDeposited && (
        <div style={{
          padding: '9px', borderRadius: '10px', textAlign: 'center',
          background: `${goal.color}0D`, border: `1px solid ${goal.color}22`,
          color: goal.color, fontSize: '13px', fontWeight: 700,
          animation: 'popIn 0.25s ease',
          marginBottom: '0',
        }}>
          Added! Keep going 💪
        </div>
      )}

      {/* CTA */}
      {!justDeposited && (isComplete ? (
        <div style={{
          padding: '10px', borderRadius: '10px', textAlign: 'center',
          background: `${goal.color}0D`, border: `1px solid ${goal.color}20`,
          color: goal.color, fontSize: '13px', fontWeight: 700,
        }}>
          Goal Complete 🎉
        </div>
      ) : !depositing ? (
        <button className="pressable" onClick={() => setDepositing(true)} style={{
          width: '100%', padding: '10px', borderRadius: '10px',
          background: `${goal.color}0D`,
          border: `1px solid ${goal.color}22`,
          color: goal.color, fontSize: '13px', fontWeight: 600,
          cursor: 'pointer', transition: 'all 0.15s',
        }}>
          + Add Funds
        </button>
      ) : (
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSave()}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            placeholder="$0"
            autoFocus
            aria-label="Deposit amount"
            style={{
              flex: 1, padding: '10px 14px',
              background: 'var(--bg-primary)', borderRadius: '10px',
              border: inputFocused ? `1.5px solid ${goal.color}` : '1px solid var(--border)',
              color: 'var(--text-primary)', fontSize: '15px', fontWeight: 600,
              transition: 'border-color 0.15s ease',
            }}
          />
          <button className="pressable" onClick={() => { setDepositing(false); setAmount('') }} style={{
            padding: '10px 14px', borderRadius: '10px',
            background: 'var(--bg-primary)', border: '1px solid var(--border)',
            color: 'var(--text-tertiary)', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
          }}>✕</button>
          <button className="pressable" onClick={handleSave} style={{
            padding: '10px 18px', borderRadius: '10px',
            background: goal.color, color: 'white',
            fontSize: '13px', fontWeight: 700, cursor: 'pointer',
          }}>Save</button>
        </div>
      ))}
    </div>
  )
}
