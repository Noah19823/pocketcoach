/**
 * PocketCoach logo — "P" mark on orange gradient rounded square.
 *
 * LogoMark  — just the square icon, scales to any size
 * LogoLockup — mark + "PocketCoach" wordmark side-by-side
 *
 * SVG geometry (400×400 viewBox):
 *   Stem   : rounded rect  x=108, y=102, w=56, h=202, rx=28
 *   Bowl   : thick open arc, outer R=88, inner r=40, center=(164,190)
 *            sweeps 135° clockwise from top, ends with a convex cap
 */

export function LogoMark({ size = 40 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="PocketCoach"
      role="img"
    >
      <defs>
        {/* Warm orange gradient — matches the reference mark */}
        <linearGradient id="pc-bg" x1="0" y1="0" x2="400" y2="400" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#C94020" />
          <stop offset="100%" stopColor="#F07A3E" />
        </linearGradient>

        {/* Subtle inner highlight at top-left */}
        <radialGradient id="pc-hi" cx="30%" cy="18%" r="55%">
          <stop offset="0%"   stopColor="white" stopOpacity="0.14" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ── Background rounded square ── */}
      <rect width="400" height="400" rx="90" fill="url(#pc-bg)" />
      <rect width="400" height="400" rx="90" fill="url(#pc-hi)" />

      {/* ── Stem — full-height, both ends rounded ── */}
      <rect x="108" y="102" width="56" height="202" rx="28" fill="white" />

      {/*
        ── Bowl — open thick arc ──
        Center (164, 190), outer R=88, inner r=40.
        Sweeps 135° clockwise from the top (matches stem top).
        Ends with a convex semicircle cap.

        Key coordinates:
          Outer start  : (164, 102)   ← top of stem right edge
          Outer end    : (226, 252)   ← 135° CW from top, outer edge
          Inner end    : (192, 218)   ← 135° CW from top, inner edge
          Inner start  : (164, 150)   ← top, inner edge
          Cap radius   : (88-40)/2=24 ← semicircle bridging outer↔inner
      */}
      <path
        d="
          M 164,102
          A 88,88  0 0 1  226,252
          A 24,24  0 0 1  192,218
          A 40,40  0 0 0  164,150
          Z
        "
        fill="white"
      />
    </svg>
  )
}

export function LogoLockup({ size = 36, dark = false }) {
  const textColor = dark ? '#FFFFFF' : 'var(--text-primary)'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: Math.round(size * 0.33) }}>
      <LogoMark size={size} />
      <span style={{
        fontFamily:    'var(--font)',
        fontSize:      Math.round(size * 0.52),
        fontWeight:    800,
        letterSpacing: '-0.03em',
        lineHeight:    1,
        userSelect:    'none',
      }}>
        <span style={{ color: textColor }}>Pocket</span>
        <span style={{ color: '#E86530' }}>Coach</span>
      </span>
    </div>
  )
}

export default LogoMark
