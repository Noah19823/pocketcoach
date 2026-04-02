import { useState, useRef, useEffect } from 'react'

// ── Response engine ──────────────────────────────────────────────────────────
const TOPIC_RESPONSES = {
  greeting: [
    "Hey. Before you ask — yes, I already judged your spending this week. 👀",
    "What's up. Ready to actually look at your finances today?",
    "Oh good, you showed up. We need to have a conversation about your bank account.",
    "Hey Noah. Your wallet called. It wants to talk. 😶",
    "Back again. Let's do something useful with this.",
  ],
  spending: [
    "This week: $340 total. Food is the biggest category at $74. Budget is $515, so you've got $175 left. Not bad.",
    "Your spending is trending 8% higher than last week. Mostly food. The gas spike was a one-time thing.",
    "Breaking it down — $60 Chipotle (twice, yes I noticed), $42 gas, $9.99 Spotify, $14.50 lunch today. The pattern is obvious.",
    "Food spending is 21% of your budget. Everything else is pretty controlled. The fix is simple: batch-cook once a week.",
    "You're at 66% of your weekly budget with 2 days left. If you eat at home tonight and tomorrow, you end under budget. Your choice.",
  ],
  chipotle: [
    "Twice in one week. Both over $30 with tax and tip. I respect the commitment. Your emergency fund does not. 💀",
    "The Chipotle thing. We need to address it. You're spending $120/month there. That's $1,440/year. On burritos.",
    "I'm not telling you to stop. I'm telling you to cook one batch meal on Sunday and cut that number in half.",
    "$60 at Chipotle this week. You know what $60 also buys? Groceries for 5 days. Just saying.",
  ],
  save: [
    "You saved $87 this week. That's not nothing — that's a tank of gas, or 3 meals, or 0.09% of a down payment. Start somewhere.",
    "Your savings rate this week is 20%. Target is 25%. You're close. What's the one thing eating into that 5%?",
    "The 48-hour rule: anything over $20 that isn't essential, wait 2 days. Most impulse buys don't survive that. Test it this week.",
    "You've saved $187 total. That's ahead of 80% of people your age. It compounds faster than you think — don't stop now.",
    "Small consistent saves beat occasional big ones. You're actually doing this right.",
  ],
  goals: [
    "Emergency Fund is at 61.5%. You need $385 more. At current pace: 6 weeks. That's your most important goal right now.",
    "Three goals active: Emergency Fund at 61%, iPhone at 35%, Gaming Setup at 24%. Finish the emergency fund first — it protects everything else.",
    "Real talk: emergency fund first, always. Once that's done, you can take actual financial risks. Before that, one bad month wrecks you.",
    "The iPhone goal — you've saved $280. $520 to go. If you put $50/week toward it specifically, you'll have it in 10 weeks.",
  ],
  budget: [
    "You're at $340 of $515 this week. That's 66% with Friday left. Friday tends to be your expensive day. Watch it.",
    "Budget tip: track every $10+ purchase. Small stuff adds up faster than big purchases. That's where most people leak money.",
    "A realistic budget starts with what you actually spend, not what you wish you spent. Then cut 10% a month. Slowly.",
    "Your budget is fine. The discipline is the issue. Set phone reminders before your high-spend times.",
  ],
  streak: [
    "7 days strong. Science says habits lock in around 21 days. You're ⅓ there. Don't break it.",
    "7-day streak. People who track daily are 3× more likely to hit savings goals. This habit is working.",
    "Don't break the streak. I mean it. Momentum is genuinely real. You're building something.",
    "One week in. Your past self made a good call. Let your future self thank them.",
  ],
  rank: [
    "You're #2. The gap to Sarah is $23/week. That's literally one meal out. You could close it if you wanted to.",
    "Top 6% of savers in your area. Not just good — that's actually impressive for your age group.",
    "You're beating 94% of people your age at saving. That stat is real. Don't coast on it though.",
    "#2 on the leaderboard with a 7-day streak. Genuinely solid. Keep going.",
  ],
  advice: [
    "Automate the savings. Set a $50/week automatic transfer on Monday morning, before you can spend it. Out of sight, out of mind.",
    "Three moves that would actually help right now: 1) Automate savings. 2) Batch cook once a week. 3) Wait 48 hours before any non-essential over $20.",
    "Your biggest leverage point is food spending. $120/month at restaurants is your easiest cut. Cook Sunday, save $60/month.",
    "Honestly? You're closer to your goals than you think. The main thing to fix is consistency, not the amounts.",
  ],
  positive: [
    "You're doing better than you think. Most people your age don't track anything. You're here. That matters. 💪",
    "Real progress looks boring from the inside. But from the outside, a 7-day streak and #2 on the leaderboard is actually impressive.",
    "You saved $87 this week. That's a real number. Small wins compound — this is how it starts.",
    "Keep going. Not a motivational poster thing — just the actual financial advice. Keep going.",
  ],
  default: [
    "I hear you. What specifically are you trying to figure out?",
    "Let me look at the data... your spending is controlled, your saving is consistent. What feels off to you?",
    "Good question. Here's what I see: you're actually doing better than you give yourself credit for.",
    "Real talk — just tracking this puts you ahead of most people. What do you want to work on?",
    "I don't judge. Well, I judge a little. But I'm on your side. What's the goal?",
    "That's worth thinking about. What's your biggest financial stress right now?",
    "You're asking the right questions. That's half the battle.",
  ],
}

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function getMaxResponse(userText) {
  const t = userText.toLowerCase()
  if (t.match(/\b(hi|hello|hey|sup|yo|what'?s up)\b/)) return getRandom(TOPIC_RESPONSES.greeting)
  if (t.match(/chipotle|burrito|taco/)) return getRandom(TOPIC_RESPONSES.chipotle)
  if (t.match(/\b(spend|spent|spending|transaction|purchase|bought|buy)\b/)) return getRandom(TOPIC_RESPONSES.spending)
  if (t.match(/\b(save|saving|saved|savings)\b/)) return getRandom(TOPIC_RESPONSES.save)
  if (t.match(/\b(goal|goals|fund|emergency|iphone|gaming|target)\b/)) return getRandom(TOPIC_RESPONSES.goals)
  if (t.match(/\b(budget|limit|weekly|month)\b/)) return getRandom(TOPIC_RESPONSES.budget)
  if (t.match(/\b(streak|day|days|consistent)\b/)) return getRandom(TOPIC_RESPONSES.streak)
  if (t.match(/\b(rank|leaderboard|sarah|#1|#2|top)\b/)) return getRandom(TOPIC_RESPONSES.rank)
  if (t.match(/\b(advice|tip|help|improve|better|how)\b/)) return getRandom(TOPIC_RESPONSES.advice)
  if (t.match(/\b(good|great|thanks|thank|nice|love|amazing|progress)\b/)) return getRandom(TOPIC_RESPONSES.positive)
  return getRandom(TOPIC_RESPONSES.default)
}

// ── Quick replies ────────────────────────────────────────────────────────────
const quickReplies = [
  '🔥 Roast my spending',
  '📈 How to save more?',
  '⚠️ What\'s my biggest problem?',
  '🏆 My rank situation',
  '🎯 Goal progress',
]

const QUICK_REPLY_RESPONSES = {
  '🔥 Roast my spending': "Okay, full roast: $60 at Chipotle twice (yes, twice), $42 on gas, $9.99 Spotify, $14.50 today. You're basically funding a guac empire. Your emergency fund cried a little. But you saved $87 and you're #2 on the leaderboard, so you're not a disaster. Just... close.",
  '📈 How to save more?': "Actual advice, no fluff: 1) Automate $50/week transfer Monday morning. 2) Cook Sunday — saves ~$100/month on food. 3) 48-hour rule on anything over $20 that isn't essential. Do those three things and your savings rate goes from 20% to 30%. That's it.",
  "⚠️ What's my biggest problem?": "Impulse food spending. You're not bad with money — you just let hunger make your financial decisions. Set a $50/week food budget and I'll nudge you before you hit it. Also: the Chipotle situation. You know what it is.",
  '🏆 My rank situation': "You're #2 with a 7-day streak. Sarah M. is #1, saving $23 more per week. The gap is basically one meal out. You could close it. Whether you want to is a different question. Top 6% of savers in your area regardless — that's genuinely good.",
  '🎯 Goal progress': "Emergency Fund: 61.5% done, need $385 more — ~6 weeks at current pace. iPhone: 35%, need $520 more. Gaming Setup: 24%, need $380. Finish the Emergency Fund first. It protects everything else. Then iPhone.",
}

// ── Initial messages ─────────────────────────────────────────────────────────
const initialMessages = [
  {
    id: 1, from: 'max', time: '2:14 PM',
    text: "I noticed you spent $60 at Chipotle twice this week. I support you. I believe in you. But twice? We need to talk. 👀",
  },
  {
    id: 2, from: 'user', time: '2:16 PM',
    text: "it was really good tho",
  },
  {
    id: 3, from: 'max', time: '2:16 PM',
    text: "I'm not here to judge your taste. I'm here to judge your bank account. Down bad. 💀",
  },
]

// ── Component ────────────────────────────────────────────────────────────────
export default function CoachScreen() {
  const [messages, setMessages] = useState(initialMessages)
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [inputFocused, setInputFocused] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const sendMessage = (text) => {
    const trimmed = text.trim()
    if (!trimmed) return

    const userMsg = {
      id: Date.now(), from: 'user',
      text: trimmed,
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    }
    setMessages(prev => [...prev, userMsg])
    setInputText('')
    setIsTyping(true)

    const delay = 1000 + Math.random() * 800
    setTimeout(() => {
      setIsTyping(false)
      const responseText = QUICK_REPLY_RESPONSES[trimmed] ?? getMaxResponse(trimmed)
      setMessages(prev => [...prev, {
        id: Date.now() + 1, from: 'max',
        text: responseText,
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        isNew: true,
      }])
    }, delay)
  }

  const hasInput = inputText.trim().length > 0

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)' }}>

      {/* Header */}
      <div style={{
        padding: '12px 20px',
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border)',
        flexShrink: 0,
        boxShadow: 'var(--shadow-xs)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div style={{
              width: '42px', height: '42px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #0D9488, #0369A1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '20px',
            }}>🤖</div>
            <div style={{
              position: 'absolute', bottom: '1px', right: '1px',
              width: '10px', height: '10px', borderRadius: '50%',
              background: '#22C55E', border: '2px solid var(--bg-secondary)',
              animation: 'pulseGlow 2s ease-in-out infinite',
            }} />
          </div>
          <div>
            <p style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>Max</p>
            <p style={{ fontSize: '11px', color: 'var(--accent-teal)', fontWeight: 500 }}>
              AI Money Coach · Online
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1, overflowY: 'auto', padding: '16px 16px 8px',
        display: 'flex', flexDirection: 'column', gap: '10px',
        scrollbarWidth: 'none',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
          <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 500 }}>Today</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
        </div>

        {messages.map(msg => <MessageBubble key={msg.id} msg={msg} />)}

        {isTyping && (
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', animation: 'fadeIn 0.15s ease' }}>
            <div style={{
              width: '30px', height: '30px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #0D9488, #0369A1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '13px', flexShrink: 0, marginBottom: '18px',
            }}>🤖</div>
            <div style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '4px 18px 18px 18px',
              padding: '13px 16px',
              boxShadow: 'var(--shadow-xs)',
            }}>
              <TypingDots />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick replies */}
      <div style={{ position: 'relative', flexShrink: 0, background: 'var(--bg-primary)' }}>
        <div style={{
          padding: '8px 16px 6px', display: 'flex', gap: '8px',
          overflowX: 'auto', scrollbarWidth: 'none',
        }}>
          {quickReplies.map((qr, i) => (
            <button
              key={i}
              onClick={() => sendMessage(qr)}
              style={{
                flexShrink: 0, padding: '7px 13px', borderRadius: '20px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
                fontSize: '12px', fontWeight: 500, cursor: 'pointer',
                whiteSpace: 'nowrap', boxShadow: 'var(--shadow-xs)',
                transition: 'all 0.12s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(13,148,136,0.4)'
                e.currentTarget.style.color = 'var(--accent-teal)'
                e.currentTarget.style.background = 'rgba(13,148,136,0.04)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.color = 'var(--text-secondary)'
                e.currentTarget.style.background = 'var(--bg-secondary)'
              }}
            >{qr}</button>
          ))}
        </div>
        <div style={{
          position: 'absolute', top: 0, right: 0, bottom: 0, width: '32px',
          background: 'linear-gradient(to right, transparent, var(--bg-primary))',
          pointerEvents: 'none',
        }} />
      </div>

      {/* Input */}
      <div style={{
        padding: '8px 16px 16px', display: 'flex', gap: '10px',
        alignItems: 'center', flexShrink: 0,
        background: 'var(--bg-primary)',
        borderTop: '1px solid var(--border)',
      }}>
        <div style={{
          flex: 1, background: 'var(--bg-secondary)',
          border: inputFocused ? '1.5px solid var(--accent-teal)' : '1px solid var(--border)',
          borderRadius: '24px', padding: '10px 16px',
          display: 'flex', alignItems: 'center',
          boxShadow: inputFocused ? '0 0 0 3px rgba(13,148,136,0.08)' : 'var(--shadow-xs)',
          transition: 'all 0.15s ease',
        }}>
          <input
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage(inputText)}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            placeholder="Message Max..."
            aria-label="Message Max"
            style={{
              flex: 1, background: 'none', color: 'var(--text-primary)',
              fontSize: '14px', caretColor: 'var(--accent-teal)',
            }}
          />
        </div>
        <button
          onClick={() => sendMessage(inputText)}
          disabled={!hasInput}
          className={hasInput ? 'pressable' : ''}
          style={{
            width: '44px', height: '44px', borderRadius: '50%',
            background: hasInput ? 'var(--accent-primary)' : 'var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, cursor: hasInput ? 'pointer' : 'not-allowed',
            transition: 'all 0.18s ease',
            transform: hasInput ? 'scale(1)' : 'scale(0.9)',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M22 2L11 13" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 2L15 22l-4-9-9-4 20-7z" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

function MessageBubble({ msg }) {
  const isMax = msg.from === 'max'
  return (
    <div style={{
      display: 'flex', flexDirection: isMax ? 'row' : 'row-reverse',
      alignItems: 'flex-end', gap: '8px',
      animation: msg.isNew ? 'fadeUp 0.2s ease' : 'none',
    }}>
      {isMax && (
        <div style={{
          width: '30px', height: '30px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #0D9488, #0369A1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '13px', flexShrink: 0, marginBottom: '18px',
        }}>🤖</div>
      )}
      <div style={{ maxWidth: '76%' }}>
        <div style={{
          background: isMax ? 'var(--bg-secondary)' : 'var(--accent-primary)',
          border: isMax ? '1px solid var(--border)' : 'none',
          borderRadius: isMax ? '4px 18px 18px 18px' : '18px 4px 18px 18px',
          padding: '11px 15px',
          boxShadow: isMax ? 'var(--shadow-xs)' : 'none',
        }}>
          <p style={{
            fontSize: '14px', lineHeight: 1.55,
            color: isMax ? 'var(--text-primary)' : 'white',
            fontWeight: 400,
          }}>{msg.text}</p>
        </div>
        <p style={{
          fontSize: '10px', color: 'var(--text-tertiary)', marginTop: '4px',
          textAlign: isMax ? 'left' : 'right',
          paddingLeft: isMax ? '4px' : '0', paddingRight: isMax ? '0' : '4px',
        }}>{msg.time}</p>
      </div>
    </div>
  )
}

function TypingDots() {
  return (
    <div style={{ display: 'flex', gap: '5px', alignItems: 'center', height: '12px' }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: '6px', height: '6px', borderRadius: '50%',
          background: 'var(--text-tertiary)',
          animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
        }} />
      ))}
    </div>
  )
}
