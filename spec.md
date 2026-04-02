# PocketCoach — Product Specification

**Version:** 1.0 (Milestone 1)
**Last updated:** 2026-03-30

---

## 1. Product Description

PocketCoach is a mobile-first budgeting and savings app for credit union members aged 18–28. It combines:

- **Spending visibility** — weekly budget tracking with a clear progress display
- **Savings goals** — goal-based savings with visual progress and milestone rewards
- **Gamification** — streaks, XP, levels, badges, and a leaderboard to make saving feel like a game
- **AI coaching** — Max, an AI money coach who gives personalized, direct, funny, and actionable advice
- **Social accountability** — opt-in leaderboard showing relative performance among peers

The app is built as a white-label product. Credit unions license PocketCoach and surface it to their members under their own branding. The Horizon Credit Union skin shown in the demo is an example deployment.

---

## 2. Business Context

**Go-to-market:** B2B2C. PocketCoach sells to credit unions; credit unions deploy to members.

**Why credit unions:** Credit unions are member-owned, typically serve younger demographics, and are increasingly competing with fintech apps. They need engaging digital experiences but lack the resources to build them in-house.

**White-label system:** The co-branding appears in:
- The Home screen footer ("Powered by [Institution Name]")
- The institution icon and name in the footer banner
- (Future) App name, color scheme overrides, splash screen

**Revenue model (planned):** Monthly SaaS fee per credit union + per-active-user pricing.

---

## 3. Target User

**Primary:** 18–28 year olds who are members of a credit union.

**User characteristics:**
- Comfortable with mobile-first apps (iMessage, TikTok, Instagram as UX references)
- May be budgeting for the first time
- Motivated by social comparison, streaks, and visible progress
- Responds better to direct, peer-tone communication than formal financial language
- Likely has irregular income (part-time jobs, gig work, early career)

**Jobs to be done:**
1. Know whether I'm on track with spending this week without doing math
2. Save toward specific goals I care about (not just "emergency fund")
3. Feel good about my financial progress relative to my peers
4. Get real advice when I'm making bad decisions, from something that doesn't judge me

---

## 4. Tech Stack

| Layer | Choice | Rationale |
|---|---|---|
| Framework | React 18 | Industry standard, component reuse, hooks-based state |
| Build | Vite 5 | Fast HMR, minimal config |
| Styling | Inline JSX styles + CSS custom properties | Zero dependencies, easy to theme/white-label, no class name conflicts |
| State | React `useState`/`useEffect` | Sufficient for prototype; no prop drilling issues at this scale |
| Routing | None (tab state in App.jsx) | Single-screen mockup; no URL routing needed for prototype |
| Data | Hardcoded mock arrays | Milestone 1 only; Milestone 3 replaces with API calls |
| AI (planned) | Anthropic Claude API | Milestone 2 |
| Auth (planned) | TBD | Milestone 3 |
| Database (planned) | TBD | Milestone 3 |

---

## 5. Design System

### Color Palette

| Token | Value | Role |
|---|---|---|
| `--navy` | `#0D1B2A` | App background |
| `--navy-light` | `#162032` | Surface variation |
| `--navy-card` | `#1A2B3C` | Card backgrounds |
| `--navy-card-hover` | `#1F3350` | Hover state for cards |
| `--teal` | `#00BFA5` | Primary accent — all CTAs, active states, progress bars |
| `--teal-dim` | `rgba(0,191,165,0.14)` | Teal-tinted surfaces |
| `--teal-glow` | `rgba(0,191,165,0.28)` | Teal box shadows |
| `--yellow` | `#FFD60A` | XP, levels, gold rank |
| `--green` | `#30D158` | Online status, positive amounts |
| `--red` | `#FF453A` | Destructive actions, warning |
| `--purple` | `#BF5AF2` | Secondary accent (iPhone goal, Social Star) |

**Streak palette (inline):** `#FF6B35` (deep orange), `#FF9F1C` (amber)
**Blue partner (inline):** `#0077B6` (paired with teal in gradients)

### Typography

- **Font:** `'Inter', -apple-system, BlinkMacSystemFont, sans-serif`
- **Rendering:** `-webkit-font-smoothing: antialiased`

| Use case | Size | Weight | Letter spacing |
|---|---|---|---|
| Screen title | 28px | 800 | -1px |
| Card title / heading | 17–22px | 700–800 | -0.4–0.6px |
| Body / card content | 14–16px | 600–700 | -0.2–0.3px |
| Metadata / timestamps | 10–12px | 500–600 | 0–0.3px |
| Uppercase micro-labels | 10–12px | 600–700 | 0.3–1.4px |
| Large numeric display | 36–54px | 800–900 | -1 to -3px |

### Spacing

- Screen side padding (cards): `18px`
- Screen side padding (headers): `22px`
- Card internal padding: `18–24px`
- Gap between cards: `14–18px`
- Gap between inline elements: `8–16px`

### Component Shapes

| Component | Border radius |
|---|---|
| Phone frame | 44px |
| Hero card | 26px |
| Standard card | 22–24px |
| List row | 18px |
| Button (standard) | 12–14px |
| Button (pill) | 22–99px |
| Icon container | 11–16px |
| Avatar (square) | 14–24px |
| Avatar (circle) | 50% |

### Borders

| Context | Value |
|---|---|
| Card default | `1px solid rgba(255,255,255,0.07)` |
| Card teal-accent | `1px solid rgba(0,191,165,0.18–0.25)` |
| Interactive active | `1px solid rgba(0,191,165,0.30)` |
| Input focused | `1px solid {goalColor}40` |
| Divider | `1px solid rgba(255,255,255,0.05–0.07)` |

### Shadows

| Element | Value |
|---|---|
| Standard card | `0 4px 24px rgba(0,0,0,0.18–0.25)` |
| Hero card | `0 16px 48px rgba(0,191,165,0.28), 0 4px 12px rgba(0,0,0,0.2)` |
| Teal CTA button | `0 4px 16px rgba(0,191,165,0.38)` |
| XP bar glow | `0 0 12px rgba(255,214,10,0.55)` |
| Streak icon | `0 6px 20px rgba(255,107,53,0.4)` |
| Phone frame | `0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.06)` |

### Animations

| Name | Behavior | Duration | Used for |
|---|---|---|---|
| `bounce` | Y-axis bounce + opacity pulse | `1.2s ease-in-out infinite`, 0.2s stagger | Typing indicator dots |
| `pulseGlow` | Opacity 1→0.5→1 | `2s ease-in-out infinite` | Max's online dot |
| `fadeUp` | opacity 0→1, translateY 6px→0 | ~180ms | Screen mount, new messages |

---

## 6. Screen Specifications

### 6.1 HomeScreen

**Purpose:** Financial summary and daily check-in hub.

**Layout (top to bottom):**

1. **Header** — "Good morning" label + "Noah 👋" (28px/800), notification bell icon, 42px avatar circle
2. **Weekly Spending Card** — teal gradient hero; "Spent This Week" label; `$340` at 54px/900; 5px progress bar (66%); 3-column sub-stats: Saved $87 / Budget left $173 / Days left 3
3. **Streak Card** — 52px fire emoji icon (orange gradient); "7 day streak" heading; "+50 XP" badge
4. **Day Dots Row** — 7 circles (38px), one per day M–S; completed = fire emoji + orange gradient; incomplete = empty + subtle border
5. **Max AI Coach Card** — Max avatar (46px) with green online dot; "Daily Check-in" badge; italic quote; "Chat with Max →" ghost CTA
6. **Recent Transactions** — 4 rows: Chipotle -$14.50, Savings Transfer +$50, Spotify -$9.99, Gas -$42.00; all uniform card backgrounds; positive amounts green
7. **Co-branding Banner** — "Powered by Horizon Credit Union" with purple icon placeholder

---

### 6.2 CoachScreen

**Purpose:** Chat interface with Max.

**Layout:** Fixed header + scrollable messages + sticky quick replies + sticky input bar.

**Header:** 46px circular Max avatar + green online dot overlay; "Max" (17px/700); "Your AI Money Coach · Online"; 3-dot overflow button.

**Message bubbles:**
- Max (incoming): `var(--navy-card)` bg, `border-radius: 4px 20px 20px 20px`, left-aligned with 30px circular avatar, `0 2px 12px rgba(0,0,0,0.2)` shadow
- User (outgoing): teal gradient bg, `border-radius: 20px 4px 20px 20px`, right-aligned, no avatar, `0 4px 18px rgba(0,191,165,0.28)` shadow
- Timestamp: 10px / 28% white / below each bubble

**Typing indicator:** 30px circular Max avatar + 3 bounce-animated dots (7px each, 5px gap).

**Quick replies (horizontal scroll):** "🔥 Roast my spending" / "📈 Help me save more" / "⚠️ What's my biggest problem?" — teal ghost pill buttons, 22px radius.

**Input row:** Pill input (`var(--navy-card)`, 24px radius) with 😊 emoji button; 46px circular teal send button; Enter key triggers send.

**Interaction timing:** 1.4s simulated delay before Max responds. Quick replies use canned responses matched by label text.

---

### 6.3 GoalsScreen

**Purpose:** Savings goal tracking and management.

**Summary Card:** 3-column — Total Saved ($1,015 in teal) / Left to Save ($1,285) / Active Goals (3) — divided by hairline rules.

**Goal Card anatomy:**
- 52px emoji icon (goal's `colorDim` background)
- Name, saved amount (goal's color) / target
- Percentage badge (top right, color-matched)
- 12px progress bar (color gradient + `0 0 10px {color}55` glow)
- 4-segment milestone row (fills at 25/50/75/100%)
- "Add Funds" button → inline deposit input + "Save" button

**Goal data (mock):**

| Goal | Emoji | Color | Saved | Target | % |
|---|---|---|---|---|---|
| Emergency Fund | 🛡️ | `#00BFA5` | $615 | $1,000 | 61% |
| New iPhone | 📱 | `#BF5AF2` | $280 | $800 | 35% |
| Gaming Setup | 🎮 | `#FF9F1C` | $120 | $500 | 24% |

**Add New Goal:** Dashed teal border button → expands to inline form (emoji input + name input + target number input + Cancel / Create Goal buttons).

---

### 6.4 LeaderboardScreen

**Purpose:** Social savings comparison and motivation.

**Time Filter Tabs:** Week / Month / All Time — segmented control, teal active state, `activeFilter` useState.

**Podium:**
- 2nd place (left): 88px block, silver styling
- 1st place (center): 116px block, gold styling, 👑 above avatar, radial gold glow in background
- 3rd place (right): 64px block, bronze styling
- Current user avatar ringed with teal border

**Full Leaderboard list:**

| Rank | Name | Saved | Streak | Display |
|---|---|---|---|---|
| 1 | Sarah M. | $210 | 14 days | 🥇 |
| 2 | Noah (You) | $187 | 7 days | 🥈 teal highlight |
| 3 | Marcus T. | $154 | 5 days | 🥉 |
| 4 | Priya K. | $132 | 9 days | #4 |
| 5 | Jordan L. | $98 | 3 days | #5 |

**Stat Card:** "Top 6% of savers — you're saving more than 94% of users your age."

---

### 6.5 ProfileScreen

**Purpose:** User identity, progression, and settings.

**Hero Card:**
- 72px avatar (teal gradient "N") + Level 4 badge overlay (bottom-right, 26px, yellow gradient)
- Name "Noah" + "⚡ Level 4" pill badge
- "Budget Warrior" subtitle (teal)
- Streak 🔥 12 days + Total Saved $1,015
- 12px XP bar: 1840/2000 (yellow gradient + `0 0 12px rgba(255,214,10,0.55)` glow)

**Stats Grid (3 tiles):** Goals 🎯 3 (teal) / Badges 🏅 3 (yellow) / Rank 🥈 #2 (purple)

**Badge Grid (3×2):**

| Badge | Emoji | Status |
|---|---|---|
| First Save | 💰 | Earned (yellow) |
| Week Warrior | ⚔️ | Earned (teal) |
| Consistency King | 👑 | Earned (purple) |
| Big Saver | 🏦 | Locked (42% opacity, grayscale, lock icon) |
| Goal Crusher | 🎯 | Locked |
| Social Star | 🌟 | Locked |

**Settings List (grouped card):** 🔔 Notifications "On" / 🔒 Privacy & Security / 💳 Linked Accounts "1 account" / 🎨 Appearance "Dark" / ❓ Help & Support — all with chevrons.

**Sign Out:** Full-width `rgba(255,69,58,0.08)` button with red text.

---

## 7. BottomNav

| Tab | Label | Screen |
|---|---|---|
| `home` | Home | HomeScreen |
| `coach` | Coach | CoachScreen |
| `goals` | Goals | GoalsScreen |
| `leaderboard` | Ranks | LeaderboardScreen |
| `profile` | Profile | ProfileScreen |

**Active state:** Teal icon (semi-transparent fill) + teal label (700 weight) + teal pill background on icon container + teal underline dot with `0 0 8px rgba(0,191,165,0.6)` glow.
**Inactive:** `rgba(255,255,255,0.32)` icon and label.
**Height:** 80px. `backdropFilter: blur(24px)`.

---

## 8. Product Milestones

### Milestone 1 — Visual Polish

**Goal:** The app looks and feels App Store-quality. A designer reviewing it should find nothing that looks like a prototype shortcut.

**Success criteria:**
- All 5 screens pass the QA checklist in `todo.md`
- Tab switching has a `fadeUp` transition (~180ms)
- All interactive elements have visible active/pressed states
- All progress bars animate from 0 on mount
- No visual inconsistencies in spacing, typography, or card styles between screens
- Empty states exist for all dynamically populated sections
- BottomNav active indicator animates on tab change
- App renders pixel-perfectly at 390×844px
- All text at 38% opacity or above meets 3:1 contrast against its background

### Milestone 2 — Real AI Responses

**Goal:** Max gives real, contextual, personalized responses powered by the Claude API.

**Success criteria:**
- CoachScreen connects to Anthropic Claude API (`claude-sonnet-4-6` or equivalent)
- System prompt encodes Max's personality, user's mock spending data, and response style rules (no bullet lists, no "As an AI", short paragraphs, emojis sparing)
- Quick reply prompts and free-text input both trigger real API calls
- Typing indicator appears during API latency
- Error state displays gracefully ("I'm having trouble connecting right now")
- Responses maintain Max's persona at all times

### Milestone 3 — Real Users

**Goal:** The app supports real user accounts with persistent data.

**Success criteria:**
- User can create an account and sign in
- Financial data (spending, goals, transactions) persists across sessions
- Streak calculated from real daily engagement
- Leaderboard reflects real users from the same credit union
- All mock data replaced with live API data
- Auth is secure (JWT or session-based)
- Data is scoped per credit union (white-label isolation)
