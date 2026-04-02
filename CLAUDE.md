# PocketCoach — AI Assistant Context

## Active Design Direction — Light Editorial Fintech Theme

> **This section overrides all color and typography rules in the Design System section below.**

**Theme:** Warm off-white backgrounds, white elevated cards, bold typography, generous whitespace. Premium and clean — the kind of app a credit union VP would pay to license.

### Color Palette (CSS variables in `index.css`)

| Variable | Value | Usage |
|---|---|---|
| `--bg-primary` | `#F5F2EE` | Main screen background |
| `--bg-secondary` | `#FFFFFF` | Cards, elevated surfaces |
| `--bg-accent` | `#FFF8F0` | Subtle warm highlight areas |
| `--text-primary` | `#1A1A1A` | Headings, primary values |
| `--text-secondary` | `#6B6B6B` | Labels, captions |
| `--text-tertiary` | `#9B9B9B` | Placeholders, timestamps |
| `--accent-primary` | `#2D2D2D` | Dark CTA buttons, user chat bubbles |
| `--accent-green` | `#22C55E` | Savings, positive amounts |
| `--accent-orange` | `#F97316` | Streaks, warnings |
| `--accent-red` | `#EF4444` | Overspending, errors |
| `--accent-teal` | `#14B8A6` | Max the coach, AI elements |
| `--border` | `#E8E4DF` | Subtle warm card borders |
| `--shadow-sm` | `0 1px 3px rgba(0,0,0,0.04)` | Default card shadow |
| `--shadow-md` | `0 4px 12px rgba(0,0,0,0.06)` | Hover / active card shadow |
| `--shadow-lg` | `0 8px 24px rgba(0,0,0,0.08)` | Modals, hero elements |

### Typography
- **Font:** DM Sans (Google Fonts) — replaces Inter globally
- Hero numbers: 48–56px, weight 800, slight negative letter-spacing
- Headings: 20–24px, weight 700–800
- Body: 15–16px, weight 400–500
- Section labels: 11–12px, `uppercase`, `letter-spacing: 0.05em`, weight 600, `var(--text-tertiary)`

### Spacing
All multiples of 8px. Card padding `24px`. Card `border-radius: 16px`. Screen padding `24px`. Section gaps `24px`.

### Card Rule (mandatory for all card elements)
`background: var(--bg-secondary)` · `border: 1px solid var(--border)` · `border-radius: 16px` · `box-shadow: var(--shadow-sm)` · hover → `var(--shadow-md)`

### Absolute Rules
- **NO dark backgrounds.** Light theme only.
- **NO background gradients** (only acceptable on avatar/icon elements).
- **DM Sans always** — loaded from Google Fonts.
- **Every card must have** border + border-radius + shadow.
- **More whitespace** when in doubt.
- Outer mockup body background stays dark (`#1A1612`) for phone frame contrast.

---

## What This Project Is

PocketCoach is a gamified budgeting app that credit unions white-label for their members. It runs as a React 18 + Vite mockup rendered inside a 390×844px iPhone frame. The current build is a fully interactive UI prototype: no backend, no router, no state management library. All data is hardcoded mock data.

**Target user:** 18–28 year olds who are members of a credit union.
**White-label client shown in demo:** Horizon Credit Union.
**AI Coach persona:** Max — conversational, direct, slightly funny, genuinely helpful.
**Current milestone:** Milestone 1 (visual polish). UI is built; polishing interactions and animations.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 18 (functional components, hooks only) |
| Build tool | Vite 5 |
| Styling | Inline JSX styles + CSS custom properties in `index.css` |
| State | `useState` / `useRef` / `useEffect` — no external library |
| Routing | None — single `activeTab` state in `App.jsx` |
| Data | Hardcoded mock arrays in each screen file |
| Fonts | Inter (Google Fonts import in `index.html`), -apple-system fallback |

---

## File Structure

```
src/
  App.jsx                     # Root: phone frame, status bar, tab switcher
  main.jsx                    # ReactDOM.createRoot entry point
  index.css                   # CSS variables, global resets, keyframe animations
  components/
    BottomNav.jsx              # 5-tab navigation bar with SVG icons
  screens/
    HomeScreen.jsx             # Spending card, streak, Max card, transactions, co-brand
    CoachScreen.jsx            # iMessage-style chat with Max, quick replies, input
    GoalsScreen.jsx            # Summary stats, 3 goal cards, add goal form
    LeaderboardScreen.jsx      # Time filter tabs, podium, full list, stat card
    ProfileScreen.jsx          # Hero card, stats grid, badges, settings, sign out
```

---

## Design System

### Colors (defined in `index.css` as CSS custom properties)

| Variable | Value | Usage |
|---|---|---|
| `--navy` | `#0D1B2A` | App background, screen backgrounds |
| `--navy-light` | `#162032` | Subtle surface variation |
| `--navy-card` | `#1A2B3C` | All card backgrounds |
| `--navy-card-hover` | `#1F3350` | Card hover states |
| `--teal` | `#00BFA5` | Primary accent: CTAs, active states, progress bars, links |
| `--teal-dim` | `rgba(0,191,165,0.14)` | Tint backgrounds for teal-accented elements |
| `--teal-glow` | `rgba(0,191,165,0.28)` | Box shadow glow on teal elements |
| `--white` | `#FFFFFF` | Primary text |
| `--white-60` | `rgba(255,255,255,0.6)` | Secondary text |
| `--white-40` | `rgba(255,255,255,0.4)` | Tertiary text |
| `--white-10` | `rgba(255,255,255,0.07)` | Card borders |
| `--yellow` | `#FFD60A` | XP, level badges, gold medals |
| `--green` | `#30D158` | Online indicators, positive amounts |
| `--red` | `#FF453A` | Sign out, destructive actions, warning states |
| `--purple` | `#BF5AF2` | iPhone goal, Social Star badge, secondary accent |
| `--font` | `'Inter', -apple-system, ...` | All text |

**Additional colors used inline (not in CSS vars):**
- Streak orange: `#FF9F1C`, streak red-orange: `#FF6B35`
- Indigo: `#4F46E5` (new goal default, Priya avatar)
- Blue: `#0077B6` (gradient partner for teal)
- Body background behind frame: `#060F18`

### White Opacity Text Tiers

| Opacity | Use case |
|---|---|
| 100% | Headings, primary values, active labels |
| ~88–90% | Message body text, card content |
| 60–72% | Secondary labels, subtitles |
| 38–48% | Tertiary metadata, timestamps, helper text |
| 28–32% | Placeholder text, inactive nav labels, faint dividers |

### Spacing & Sizing

- **Phone frame:** `390×844px`, `border-radius: 44px`
- **Status bar:** `44px` tall
- **Bottom nav:** `80px` tall
- **Screen horizontal padding:** `18px` (cards), `22px` (headers)
- **Card border-radius:** `22–26px`
- **Card border:** `1px solid rgba(255,255,255,0.07)`
- **Card shadow:** `0 4px 24px rgba(0,0,0,0.18–0.25)`
- **Button border-radius:** `12–18px` (standard), `22px` (pill / quick-reply)
- **Progress bars:** `12px` tall, `border-radius: 99px`
- **Section gap between cards:** `14–18px`

### Gradient Recipes

| Name | Value |
|---|---|
| Hero spending card | `linear-gradient(140deg, #00BFA5 0%, #0091AD 55%, #0077B6 100%)` |
| CTA button | `linear-gradient(135deg, #00BFA5, #0077B6)` |
| Streak icon / day dots | `linear-gradient(135deg, #FF6B35, #FF9F1C)` |
| XP bar | `linear-gradient(90deg, #FFD60A, #FF9F1C)` |
| User / Max avatar | `linear-gradient(135deg, #00BFA5 0%, #0077B6 100%)` |
| Level badge | `linear-gradient(135deg, #FFD60A, #FF9F1C)` |

### Shadow / Glow Pattern

Glows are always `box-shadow` using the element's own color at low alpha — never generic black:

| Element | Shadow |
|---|---|
| Teal CTA button | `0 4px 16px rgba(0,191,165,0.38)` |
| XP bar | `0 0 12px rgba(255,214,10,0.55)` |
| Streak icon | `0 6px 20px rgba(255,107,53,0.4)` |
| Green online dot | `0 0 8px rgba(48,209,88,0.7)` |
| Progress bar fill | `0 0 10px {goalColor}55` |
| Hero card | `0 16px 48px rgba(0,191,165,0.28), 0 4px 12px rgba(0,0,0,0.2)` |
| Phone frame | `0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.06)` |

### Keyframe Animations (defined in `index.css`)

| Name | Effect | Used for |
|---|---|---|
| `bounce` | Vertical bounce + opacity (0%/60%/100% at Y=0; 30% at Y=-6px) | Typing indicator dots |
| `pulseGlow` | Opacity oscillates 1→0.5→1 over 2s | Max's online status green dot |
| `fadeUp` | opacity 0→1 + translateY 6px→0 | New message appearance |

---

## Screen Inventory

### HomeScreen (`src/screens/HomeScreen.jsx`)
Header (greeting + notification bell + avatar), weekly spending hero card ($340 / 66% budget / 3 sub-stats), streak card (7-day / +50 XP), 7 day dots row (all fire emoji), Max AI Coach card with quote + CTA, recent transactions (4 rows, uniform card backgrounds), Horizon CU co-branding footer. No state hooks — purely presentational with `transactions` data array.

### CoachScreen (`src/screens/CoachScreen.jsx`)
iMessage-style chat interface. State: `messages` array, `inputText`, `isTyping`. Max bubbles: `var(--navy-card)` left-aligned with circular avatar. User bubbles: teal gradient right-aligned. 1.4s simulated response delay. 3 quick-reply buttons. Typing indicator with `bounce` animation. Text input + circular teal send button. Auto-scrolls to bottom on new messages.

### GoalsScreen (`src/screens/GoalsScreen.jsx`)
Summary card (Total Saved / Left to Save / Active Goals). 3 goal cards with emoji, name, progress bar (12px, color-matched glow), 4-segment milestone row, percentage badge, "Add Funds" toggle to inline deposit input. "Add New Goal" dashed button expands to form (emoji + name + target). State: `goals`, `showAdd`, `newGoal`. Each `GoalCard` has its own `depositing` + `amount` state.

### LeaderboardScreen (`src/screens/LeaderboardScreen.jsx`)
Time filter tabs (Week / Month / All Time, `activeFilter` state). Podium (2nd/1st/3rd with varying heights, radial gold glow). Full leaderboard list (5 rows with medal emojis for top 3, teal highlight on current user row #2). "Top 6% of savers" stat card at bottom.

### ProfileScreen (`src/screens/ProfileScreen.jsx`)
Hero card (72px avatar + level 4 badge, "Budget Warrior" title, streak, total saved, 12px XP bar 1840/2000). Stats grid (Goals/Badges/Rank with color-coded values). Badge grid 3×2 (3 earned, 3 locked with grayscale + lock icon). Settings list in grouped card (5 rows + chevrons). Red sign-out button. No state hooks — purely presentational.

---

## BottomNav (`src/components/BottomNav.jsx`)

5 tabs: Home / Coach / Goals / Ranks / Profile. Active state: teal icon (with semi-transparent fill), teal label (700 weight), teal pill background on icon container, teal underline dot with glow. Inactive: `rgba(255,255,255,0.32)`. Height: 80px. `backdropFilter: blur(24px)`.

---

## Max's Personality Guide

Max is PocketCoach's AI money coach. He is:

- **Direct.** Doesn't hedge. Says "That's a problem" or "Here's what to do."
- **Funny but not jokey.** Dry humor and light roasting. Never corny. Examples from the app:
  - *"I noticed you spent $60 at Chipotle twice this week. I support you. I believe in you. But twice? We need to talk. 👀"*
  - *"I'm not here to judge your taste. I'm here to judge your bank account. Down bad. 💀"*
  - *"You're basically funding a guac empire."*
- **Actually helpful.** Every roast comes with actionable advice. Specific numbers, specific habits.
- **Age-appropriate.** Talks like a 25-year-old friend who happens to know about money, not a bank chatbot.
- **Encouraging.** Notices wins: *"That $87 you saved? That's not nothing."*
- **Never robotic.** No "As an AI", no "I understand your concern", no "Great question!"

**Response style:** Short paragraphs. No bullet lists in chat. Emojis sparingly (💀 👀 💪 are in character; 😊 🌟 ✨ are not). References the user's actual spending data.

---

## When Adding New Components

- [ ] Background uses `var(--navy)` or `var(--navy-card)` — never a custom dark color
- [ ] Card has `border-radius: 22–26px` and `border: 1px solid rgba(255,255,255,0.07)`
- [ ] Primary action buttons use `linear-gradient(135deg, #00BFA5, #0077B6)` with teal glow shadow
- [ ] Glow shadow uses the element's own color at ~35–40% alpha, not a generic black shadow
- [ ] Text follows opacity tiers: headings 100%, body 88–90%, secondary 60%, metadata 38–42%
- [ ] Progress bars are `12px` tall with `border-radius: 99px` and a color-matched glow shadow
- [ ] Interactive elements have `transition: all 0.15–0.2s ease`
- [ ] New animations are defined in `index.css` as named `@keyframes`, not inline

---

## Milestone Overview

| # | Name | Summary |
|---|---|---|
| 1 | Visual Polish | App Store-quality UI on all 5 screens — transitions, active states, animations |
| 2 | Real AI | Claude API integration for Max's responses, proper system prompt |
| 3 | Real Users | Auth, database, real leaderboard, all mock data replaced |
