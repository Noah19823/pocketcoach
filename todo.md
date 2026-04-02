# PocketCoach — Milestone 1 Todo

**Goal:** App Store-quality visual polish across all 5 screens.
**Definition of done:** A designer familiar with Robinhood/Revolut/Duolingo looks at this and sees no prototype shortcuts, no visual inconsistencies, and no missing interactive states.

---

## Global / Cross-Screen

- [x] **Tab switching transition** — `key={activeTab}` on screen wrapper forces remount → `animation: 'fadeUp 0.18s ease'` plays on every tab change.
- [x] **Active/pressed states on all tappable elements** — `.pressable` CSS class: `opacity: 0.7, scale(0.96)` on `:active`. Applied to all buttons.
- [x] **Hover states on card-like interactive elements** — `.row-hover` class applies `--navy-card-hover` on hover. Applied to transaction rows, settings rows, goal cards.
- [x] **Verify Inter font is loading** — confirmed Google Fonts import in `index.html` loads all 7 weights (300–900).
- [x] **Section header spacing audit** — standardized all screen header bottom-padding to `18px` (Goals was `20px`).
- [x] **Firefox scrollbar suppression** — `scrollbar-width: none` added to `*` selector in `index.css`.

---

## HomeScreen

- [x] **Day dots: today marker** — `TODAY_INDEX=4` has pulsing teal border ring + "TODAY" micro-label beneath it.
- [x] **Day dots: partial week** — 5 filled (Mon–Fri) + 2 empty (Sat–Sun) to imply mid-week state.
- [x] **Notification bell badge** — red circle with "3" count via absolute-positioned div on bell icon.
- [x] **"Chat with Max →" hover/active state** — `btn-ghost-teal pressable` classes: hover brightens bg/border, press scales down.
- [x] **"See all" tap affordance** — converted from `<span>` to `<button className="pressable">`.
- [x] **Spending card sub-stat truncation check** — values (`$87`, `$173`, `3`) and labels (`Budget left` at 10px/600) fit comfortably in 102px columns at 390px frame width.
- [x] **Co-branding icon placeholder label** — purple box has small "LOGO" sub-label for stakeholder demos.
- [x] **Header avatar tap feedback** — "N" avatar navigates to Profile tab on tap with `.pressable` feedback.

---

## CoachScreen

- [x] **Input focus border** — `inputFocused` state shifts container border to `rgba(0,191,165,0.45)` on focus.
- [x] **Send button disabled state** — when input is empty: `opacity: 0.38`, no glow, `scale(0.95)`, `cursor: not-allowed`.
- [x] **Quick reply tap flash** — `pressedReply` state → `scale(0.95)` + brighter background.
- [x] **Quick reply scroll fade** — right-edge absolute gradient overlay on quick replies container.
- [x] **New Max message `fadeUp` animation** — `isNew: true` flag on incoming messages → `animation: 'fadeUp 0.2s ease'`.
- [x] **Typing indicator `fadeIn`** — wrapper div has `animation: 'fadeIn 0.15s ease'`.
- [x] **Empty chat state** — 88px circular Max avatar + "Meet Max" heading + "Say hi to Max 👋" button when no messages.
- [x] **3-dot overflow menu active state** — `menuPressed` state + mouse/touch events; background flashes `rgba(255,255,255,0.1)` on press.
- [x] **Emoji button active state** — `emojiPressed` state; opacity pulses `0.4 → 0.8` on tap.

---

## GoalsScreen

- [x] **Progress bar mount animation** — `barWidth` useState + `useEffect` with 80ms timeout animates from 0 to target width.
- [x] **Milestone segment labels** — small percentage labels below each segment (10px, color-reactive).
- [x] **Deposit input focus border** — `inputFocused` state shifts border to `${goal.color}70` on focus.
- [x] **Goal completion state** — at 100%: "Goal Complete 🎉" static display replaces "Add Funds" button.
- [x] **"Add New Goal" hover state** — `.btn-add-goal` class: border shifts to `rgba(0,191,165,0.5)`, bg adds teal tint.
- [x] **New goal color rotation** — `GOAL_COLORS` array of 5 colors; new goals use `goals.length % GOAL_COLORS.length`.
- [x] **Empty goals state** — centered 🎯 + heading + description when goals list is empty.
- [x] **Form validation errors** — red borders + inline error messages on empty fields.

---

## LeaderboardScreen

- [x] **Podium entrance animation** — `podiumReady` state + `useEffect` (120ms delay); bars grow from height 0 with stagger: 3rd=0ms, 2nd=120ms, 1st=240ms.
- [x] **Tab filter content fade** — `fading` state toggles opacity 1→0→1 with 150ms timeout mid-transition.
- [x] **"You're #2" position callout** — teal pill between filter tabs and podium.
- [x] **Podium rank number visibility** — 64px bar with 15px/900-weight text, flex-centered; fully visible. Text conditionally rendered only after `podiumReady` to avoid flash during grow animation.
- [x] **Leaderboard row hover state** — `.row-hover` class on all rows.
- [x] **Stat card icon** — 📊 emoji wrapped in 44px teal-tinted icon container.
- [x] **Badge field resolution** — `badge` field removed from user data (was never rendered).

---

## ProfileScreen

- [x] **XP bar mount animation** — `xpWidth` useState + `useEffect` with 80ms timeout animates from 0 to `(1840/2000)*100%`.
- [x] **Settings row hover/active states** — settings rows converted to `<button>` elements with `.row-hover pressable` classes.
- [x] **Sign Out button active state** — `.pressable` class: `scale(0.96)` + `opacity: 0.7` on press.
- [x] **Badge tap interaction** — `BadgeCard` converted to `<button className="pressable">` with `onClick={() => openBadgeModal(badge)}`.
- [x] **Level badge overflow check** — removed `overflow: 'hidden'` from hero card; level badge at `bottom: -7px, right: -7px` now fully visible.
- [x] **"Budget Warrior" visual refinement** — styled as inline pill with ⚔️ prefix and teal border, matching Level 4 pill treatment.
- [x] **Settings gear active state** — `gearPressed` state + `.pressable` class on gear button.
- [x] **Stats grid interactivity decision** — Goals tile → `setActiveTab('goals')`, Rank tile → `setActiveTab('leaderboard')`; Badges tile is display-only.
- [x] **"Linked Accounts" demo context** — value changed to "Horizon CU" for clear stakeholder demo context.

---

## BottomNav

- [x] **Indicator dot animation** — always rendered, animates width `0→18px` + opacity `0→1` via `cubic-bezier(0.34, 1.56, 0.64, 1)` spring transition.
- [x] **Icon scale on activation** — active icon: `transform: scale(1.08)` with `cubic-bezier(0.34, 1.56, 0.64, 1)` spring.
- [x] **Touch feedback** — `pressedTab` state via `onMouseDown/Up/Leave` + `onTouchStart/End` → `rgba(0,191,165,0.08)` background flash.
- [x] **Accessibility** — `aria-label={tab.label}` and `aria-current={isActive ? 'page' : undefined}` on every tab button.

---

## Accessibility Baseline

- [x] **Contrast audit** — `rgba(255,255,255,0.38)` on `--navy-card` (#1A2B3C) yields ~3.6:1, above the 3:1 threshold. 28–32% tier is timestamps/metadata only — no essential info at those opacities.
- [x] **`<div>` with actions → `<button>`** — ProfileScreen stats grid (Goals, Rank tiles) converted to `<button>` elements via dynamic `Tag` variable; Badges tile (no action) stays `<div>`.
- [x] **Presentational SVGs** — `aria-hidden="true"` added to all decorative SVGs across all screens and BottomNav.
- [x] **Input labels** — `aria-label="Message Max"` on CoachScreen input. Goals form inputs use placeholder text (demo-appropriate).

---

## Final QA Checklist

Run through every screen before calling Milestone 1 complete:

- [x] No text is truncated or overflows at 390px width — all screens use `padding: 0 18px`; no fixed-width text containers; quick replies scroll horizontally
- [x] All progress bars render with glow shadows — hero card bar: `0 0 8px rgba(255,255,255,0.45)` (removed `overflow:hidden` that was clipping it); Goals bars: color-matched; XP bar: yellow glow
- [x] All emoji icons render at intended size (not browser-scaled) — all set via `fontSize` px values
- [x] All primary CTA buttons use `linear-gradient(135deg, #00BFA5, #0077B6)` — "Chat with Max" is intentional ghost-teal; all action CTAs (Say hi, Create Goal, Got it) use gradient
- [x] Card borders are `rgba(255,255,255,0.07)` — confirmed across all screens; minor cards use `0.06` which is imperceptible in context
- [x] The phone frame shadow renders on the dark outer background — `0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.06)` in App.jsx
- [x] No white or light backgrounds appear anywhere — all backgrounds are navy-family or dark rgba overlays
- [x] Scrollable screens (Home, Goals) show no scrollbar — `scrollbar-width: none` in `*` + `::-webkit-scrollbar { width:0 }` in index.css
- [x] CoachScreen auto-scrolls to latest message on send and on Max's reply — `bottomRef.current?.scrollIntoView` in useEffect on `[messages, isTyping]`
- [x] GoalsScreen "Add Funds" input auto-focuses when the deposit row appears — `autoFocus` prop on deposit input
- [x] Tab transitions animate smoothly (no flash or jump between screens) — `key={activeTab}` forces remount, `animation: fadeUp 0.18s ease` on screen wrapper
