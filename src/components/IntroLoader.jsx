import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { motion, AnimatePresence } from 'motion/react'

/* ──────────────── PALETTE (used inside window content for color) ──────────────── */
const C = {
  accent: '#c9a87c',
  green:  '#7dd3a8',
  blue:   '#6ec1ff',
  pink:   '#e08aa3',
  purple: '#c789e0',
  amber:  '#e5b86b',
  red:    '#ff5f57',
  yellow: '#ffbd2e',
  ok:     '#28c940',
  panel:  '#15151c',
  panel2: '#1c1c25',
  text:   '#d8d4cb',
  muted:  '#8a8782',
  faint:  '#3a3a44',
}

/* ──────────────── WINDOW LAYOUT — fly to all 4 screen edges ──────────────── */
/* x is vw multiplier, y is vh multiplier (relative to viewport center).      */
const WINDOWS = [
  // TOP edge (4)
  { id: 'code',      label: 'app.jsx',    x: -32, y: -36, w: 17, ratio: 0.66 },
  { id: 'browser',   label: 'browser',    x: -10, y: -38, w: 16, ratio: 0.62 },
  { id: 'dashboard', label: 'dashboard',  x:  12, y: -38, w: 17, ratio: 0.66 },
  { id: 'schema',    label: 'schema',     x:  32, y: -36, w: 15, ratio: 0.55 },
  // RIGHT edge (2)
  { id: 'analytics', label: 'analytics',  x:  40, y:  -8, w: 16, ratio: 0.58 },
  { id: 'files',     label: 'files',      x:  42, y:  14, w: 12, ratio: 0.78 },
  // BOTTOM edge (2) — flank the welcome text
  { id: 'terminal',  label: 'terminal',   x:  28, y:  32, w: 17, ratio: 0.62 },
  { id: 'music',     label: 'now playing',x: -28, y:  32, w: 17, ratio: 0.55 },
  // LEFT edge (2)
  { id: 'gallery',   label: 'gallery',    x: -42, y:  12, w: 14, ratio: 0.66 },
  { id: 'chat',      label: 'messages',   x: -40, y: -12, w: 16, ratio: 0.66 },
]

/* Floating glyph chips — distributed across all 4 sides too (vw/vh multipliers) */
const CHIPS = [
  { id: 'angle',  x: -22, y: -24 }, // top-left
  { id: 'braces', x:  22, y: -24 }, // top-right
  { id: 'spark',  x: -36, y:   2 }, // left
  { id: 'bolt',   x:  36, y:   2 }, // right
  { id: 'plus',   x: -14, y:  20 }, // bottom-left
  { id: 'pixel',  x:  14, y:  20 }, // bottom-right
]

/* ════════════════════════════ WINDOW CONTENT ════════════════════════════ */
function WindowChrome({ label, children }) {
  return (
    <div className="iw-window">
      <div className="iw-titlebar">
        <span className="iw-light" style={{ background: C.red }} />
        <span className="iw-light" style={{ background: C.yellow }} />
        <span className="iw-light" style={{ background: C.ok }} />
        <span className="iw-label">{label}</span>
      </div>
      <div className="iw-body">{children}</div>
    </div>
  )
}

const Body = {
  code: () => (
    <div className="iw-code">
      <div className="iw-code-line"><span style={{color:C.pink}}>import</span> <span style={{color:C.text}}>React</span> <span style={{color:C.pink}}>from</span> <span style={{color:C.green}}>'react'</span></div>
      <div className="iw-code-line"><span style={{color:C.pink}}>import</span> <span>{'{ '}</span><span style={{color:C.text}}>useState</span><span>{' }'}</span> <span style={{color:C.pink}}>from</span> <span style={{color:C.green}}>'react'</span></div>
      <div className="iw-code-line"><span style={{color:C.pink}}>import</span> <span style={{color:C.text}}>axios</span> <span style={{color:C.pink}}>from</span> <span style={{color:C.green}}>'axios'</span></div>
      <div className="iw-code-line"><span style={{color:C.purple}}>const</span> <span style={{color:C.blue}}>App</span> <span>= () =&gt; {'{'}</span></div>
      <div className="iw-code-line iw-indent"><span style={{color:C.purple}}>const</span> <span>[data, setData] = </span><span style={{color:C.blue}}>useState</span>([])</div>
      <div className="iw-code-line iw-indent"><span style={{color:C.purple}}>const</span> <span>[loading] = </span><span style={{color:C.blue}}>useState</span>(<span style={{color:C.amber}}>true</span>)</div>
      <div className="iw-code-line iw-indent"><span style={{color:C.blue}}>useEffect</span>(() =&gt; {'{'}</div>
      <div className="iw-code-line iw-indent2"><span style={{color:C.blue}}>fetchData</span>()</div>
      <div className="iw-code-line iw-indent">{'}'}, [])</div>
      <div className="iw-code-line iw-indent"><span style={{color:C.purple}}>async</span> <span style={{color:C.purple}}>function</span> <span style={{color:C.blue}}>fetchData</span>() {'{'}</div>
      <div className="iw-code-line iw-indent2"><span style={{color:C.purple}}>const</span> res = <span style={{color:C.purple}}>await</span> axios.<span style={{color:C.blue}}>get</span>()</div>
    </div>
  ),

  dashboard: () => (
    <div className="iw-dash">
      <div className="iw-dash-row">
        <div className="iw-dash-pill" />
        <div className="iw-dash-pill iw-dash-pill--mid" />
      </div>
      <svg viewBox="0 0 100 38" className="iw-dash-line" preserveAspectRatio="none">
        <path d="M2 30 L18 24 L34 26 L50 18 L66 14 L82 10 L98 6" stroke={C.accent} strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="50" cy="18" r="1.5" fill={C.accent} />
        <circle cx="98" cy="6"  r="1.5" fill={C.accent} />
      </svg>
      <div className="iw-dash-bars">
        {[42, 64, 78, 52, 86, 60, 70].map((h, i) => (
          <span key={i} className="iw-dash-bar" style={{ height: `${h}%`, background: i === 4 ? C.accent : 'rgba(201,168,124,0.55)' }} />
        ))}
      </div>
      <div className="iw-dash-foot" />
    </div>
  ),

  schema: () => (
    <svg viewBox="0 0 100 60" className="iw-schema" preserveAspectRatio="xMidYMid meet">
      <g fill={C.panel2} stroke={C.muted} strokeWidth="0.6">
        <rect x="6"  y="4"  width="34" height="14" rx="2" />
        <rect x="60" y="4"  width="34" height="14" rx="2" />
        <rect x="33" y="38" width="34" height="14" rx="2" />
      </g>
      <g fill={C.text} fontSize="3.4" fontFamily="var(--font-mono)">
        <text x="11" y="13"><tspan fill={C.green}>▣</tspan> Users</text>
        <text x="65" y="13"><tspan fill={C.amber}>▣</tspan> Posts</text>
        <text x="40" y="47"><tspan fill={C.blue}>≡</tspan> API</text>
      </g>
      <g stroke={C.faint} strokeWidth="0.5" fill="none">
        <line x1="40" y1="11" x2="60" y2="11" />
        <path d="M23 18 L23 28 L50 28 L50 38" />
        <path d="M77 18 L77 28 L50 28" />
      </g>
    </svg>
  ),

  analytics: () => (
    <div className="iw-analytics">
      <div className="iw-an-row">
        <span className="iw-an-stat">+24%</span>
        <span className="iw-an-stat iw-an-stat--mid">1.4k</span>
      </div>
      <svg viewBox="0 0 100 36" className="iw-an-chart" preserveAspectRatio="none">
        <defs>
          <linearGradient id="anGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={C.green} stopOpacity="0.45" />
            <stop offset="100%" stopColor={C.green} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M2 28 L14 24 L26 26 L38 18 L50 22 L62 14 L74 16 L86 8 L98 10 L98 36 L2 36 Z" fill="url(#anGrad)" />
        <path d="M2 28 L14 24 L26 26 L38 18 L50 22 L62 14 L74 16 L86 8 L98 10" stroke={C.green} strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="86" cy="8" r="1.6" fill={C.green} />
      </svg>
    </div>
  ),

  terminal: () => (
    <div className="iw-term">
      <div className="iw-term-line"><span style={{color:C.green}}>$</span> npm run dev</div>
      <div className="iw-term-line iw-term-mute">Starting server...</div>
      <div className="iw-term-line"><span style={{color:C.green}}>✓</span> Ready on <span style={{color:C.blue}}>localhost:3000</span></div>
      <div className="iw-term-line"><span style={{color:C.green}}>$</span> git push origin main</div>
      <div className="iw-term-line iw-term-mute">Counting objects: 24...</div>
      <div className="iw-term-line"><span style={{color:C.green}}>✓</span> Deployed successfully</div>
    </div>
  ),

  files: () => (
    <div className="iw-files">
      {[
        { c: C.amber,  n: 'Hero.jsx' },
        { c: C.green,  n: 'About.css' },
        { c: C.blue,   n: 'utils.ts'  },
        { c: C.purple, n: 'README.md' },
        { c: C.pink,   n: 'index.html'},
      ].map((f, i) => (
        <div key={i} className="iw-files-row">
          <span className="iw-files-bar" style={{ background: f.c }} />
          <span className="iw-files-name">{f.n}</span>
        </div>
      ))}
    </div>
  ),

  chat: () => (
    <div className="iw-chat">
      <div className="iw-chat-bubble iw-chat-in">
        <span className="iw-chat-line" />
        <span className="iw-chat-line iw-chat-line--short" />
      </div>
      <div className="iw-chat-bubble iw-chat-out">
        <span className="iw-chat-line iw-chat-line--out" />
        <span className="iw-chat-line iw-chat-line--out iw-chat-line--short" />
      </div>
      <div className="iw-chat-bubble iw-chat-in">
        <span className="iw-chat-line" />
      </div>
      <div className="iw-chat-typing">
        <span /><span /><span />
      </div>
    </div>
  ),

  music: () => (
    <div className="iw-music">
      <div className="iw-music-cover">
        <span className="iw-music-disc" />
      </div>
      <div className="iw-music-info">
        <span className="iw-music-title" />
        <span className="iw-music-artist" />
        <div className="iw-music-progress">
          <span className="iw-music-progress-fill" />
        </div>
      </div>
      <div className="iw-music-wave">
        {[6, 10, 14, 8, 12, 7, 11, 13, 9, 11, 6, 10, 14].map((h, i) => (
          <span key={i} className="iw-music-bar" style={{ height: `${h * 4}%` }} />
        ))}
      </div>
    </div>
  ),

  gallery: () => (
    <div className="iw-gallery">
      <div className="iw-gal-cell" style={{ background: 'linear-gradient(135deg, #c9a87c 0%, #7d6a52 100%)' }} />
      <div className="iw-gal-cell" style={{ background: 'linear-gradient(135deg, #6ec1ff 0%, #2b5d80 100%)' }} />
      <div className="iw-gal-cell" style={{ background: 'linear-gradient(135deg, #e08aa3 0%, #7a3d4d 100%)' }} />
      <div className="iw-gal-cell" style={{ background: 'linear-gradient(135deg, #7dd3a8 0%, #2e6e4e 100%)' }} />
      <div className="iw-gal-cell" style={{ background: 'linear-gradient(135deg, #c789e0 0%, #5e3d6d 100%)' }} />
      <div className="iw-gal-cell" style={{ background: 'linear-gradient(135deg, #e5b86b 0%, #785a30 100%)' }} />
    </div>
  ),

  browser: () => (
    <div className="iw-browser">
      <div className="iw-br-tabs">
        <span className="iw-br-tab" />
        <span className="iw-br-tab iw-br-tab--mid" />
      </div>
      <div className="iw-br-url">
        <span className="iw-br-dot" />
        <span className="iw-br-urltext">faisal.dev/projects</span>
      </div>
      <div className="iw-br-content">
        <div className="iw-br-hero" />
        <div className="iw-br-text">
          <span /><span /><span /><span />
        </div>
      </div>
    </div>
  ),
}

/* ════════════════════════════ CHIP GLYPHS ════════════════════════════ */
function Chip({ id }) {
  const inner = {
    angle:  <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M11 8 L4 16 L11 24" /><path d="M21 8 L28 16 L21 24" /></g>,
    braces: <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 6 C9 6 9 13 6 16 C9 19 9 26 13 26" /><path d="M19 6 C23 6 23 13 26 16 C23 19 23 26 19 26" /></g>,
    spark:  <g fill="currentColor"><path d="M16 3 L18 14 L29 16 L18 18 L16 29 L14 18 L3 16 L14 14 Z" /></g>,
    bolt:   <g fill="currentColor"><path d="M18 3 L7 18 L15 18 L13 29 L25 13 L17 13 Z" /></g>,
    plus:   <g fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"><path d="M16 5 L16 27" /><path d="M5 16 L27 16" /></g>,
    pixel:  <g fill="none" stroke="currentColor" strokeWidth="2"><circle cx="16" cy="16" r="11" /><circle cx="16" cy="16" r="4" fill="currentColor" /></g>,
  }[id]
  return <svg viewBox="0 0 32 32">{inner}</svg>
}

/* ════════════════════════════ MAIN ════════════════════════════ */
export default function IntroLoader({ onComplete }) {
  const rootRef = useRef(null)
  const stageRef = useRef(null)
  const doneRef = useRef(false)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  const [visible, setVisible] = useState(true)

  useLayoutEffect(() => {
    const finish = () => {
      if (doneRef.current) return
      doneRef.current = true
      setVisible(false)
      // give framer-motion exit time before notifying parent
      setTimeout(() => onCompleteRef.current?.(), 480)
    }

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    if (reduce) {
      const t = setTimeout(finish, 280)
      return () => clearTimeout(t)
    }

    /* viewport unit helpers — recomputed on each mount */
    const vw = (typeof window !== 'undefined' ? window.innerWidth  : 1440) / 100
    const vh = (typeof window !== 'undefined' ? window.innerHeight : 900 ) / 100

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: finish,
        defaults: { ease: 'power3.out', force3D: true },
      })

      /* 0.00 – 0.60s  Background ignites: stars + constellation lines */
      tl.to('.intro-star', {
        opacity: 1, scale: 1, duration: 0.6,
        ease: 'sine.out',
        stagger: { each: 0.003, from: 'random' },
      }, 0)
      tl.to('.intro-const-line', {
        strokeDashoffset: 0, duration: 0.7,
        ease: 'sine.out', stagger: 0.028,
      }, 0.08)

      /* 0.00 – 0.75s  Monitor fades + strokes in */
      tl.to('.intro-monitor', {
        opacity: 1, scale: 1, duration: 0.7,
        ease: 'sine.out',
      }, 0.0)
      tl.to('.io-draw', {
        strokeDashoffset: 0, duration: 0.75,
        ease: 'power1.inOut', stagger: 0.008,
      }, 0.1)

      /* 0.45 – 0.95s  Soft screen ignition flash */
      tl.to('.intro-screen-flash', { opacity: 0.9, duration: 0.25, ease: 'sine.out' }, 0.45)
      tl.to('.intro-screen-flash', { opacity: 0,   duration: 0.5,  ease: 'sine.in'  }, 0.65)

      /* PHASE A · 0.45 – 1.45s  Windows pop in at the monitor center
         Long per-element duration + tight stagger = silky cascade.   */
      WINDOWS.forEach((w, i) => {
        const fanAngle = (i / WINDOWS.length) * Math.PI * 2
        const fanR = 22
        tl.to(`.win-${w.id}`, {
          x: Math.cos(fanAngle) * fanR,
          y: Math.sin(fanAngle) * fanR,
          scale: 1,
          rotate: gsap.utils.random(-4, 4),
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'sine.out',
        }, 0.45 + i * 0.035)
      })

      /* PHASE B · 1.35 – 2.95s  Glide to all 4 screen edges.
         power2.inOut: slow start = seamless handoff from Phase A.   */
      WINDOWS.forEach((w, i) => {
        tl.to(`.win-${w.id}`, {
          x: w.x * vw,
          y: w.y * vh,
          rotate: 0,
          duration: 1.4,
          ease: 'power2.inOut',
        }, 1.35 + i * 0.03)
      })

      /* Chips — same continuous flow, behind the windows */
      CHIPS.forEach((c, i) => {
        tl.to(`.chip-${c.id}`, {
          x: 0, y: 0,
          scale: 1,
          opacity: 0.9,
          duration: 0.6,
          ease: 'sine.out',
        }, 0.6 + i * 0.025)
        tl.to(`.chip-${c.id}`, {
          x: c.x * vw,
          y: c.y * vh,
          rotate: gsap.utils.random(-8, 8),
          opacity: 0.85,
          duration: 1.15,
          ease: 'power2.inOut',
        }, 1.45 + i * 0.025)
      })

      /* PHASE C · 3.00 – 3.30s  Soft visible rest at the edges */

      /* PHASE D · 3.30 – 4.00s  Exit — continue outward drift, gracefully fade */
      WINDOWS.forEach((w, i) => {
        const mag = 1.45
        tl.to(`.win-${w.id}`, {
          x: w.x * vw * mag,
          y: w.y * vh * mag,
          scale: 0.78,
          opacity: 0,
          duration: 0.65,
          ease: 'sine.in',
        }, 3.3 + i * 0.012)
      })
      CHIPS.forEach((c, i) => {
        tl.to(`.chip-${c.id}`, {
          x: c.x * vw * 1.55,
          y: c.y * vh * 1.55,
          scale: 0.5,
          opacity: 0,
          duration: 0.6,
          ease: 'sine.in',
        }, 3.32 + i * 0.012)
      })
      tl.to('.intro-monitor',  { opacity: 0, scale: 0.96, duration: 0.6, ease: 'sine.in' }, 3.3)
      tl.to('.intro-bg-layer', { opacity: 0, duration: 0.6, ease: 'sine.in' }, 3.4)
    }, rootRef)

    const failsafe = setTimeout(finish, 5000)

    return () => {
      clearTimeout(failsafe)
      ctx.revert()
    }
  }, [])

  /* ────────────── Constellation lines (decorative) ────────────── */
  const constellationLines = [
    'M5 18 L14 22 L24 14',
    'M82 12 L92 20 L78 28',
    'M10 78 L26 70 L34 82',
    'M68 82 L82 76 L94 86',
    'M40 8 L52 14 L60 6',
  ]

  /* ────────────── Generated star positions (deterministic) ────────────── */
  const stars = Array.from({ length: 64 }, (_, i) => {
    const seed = (i + 1) * 9301
    const r = (s) => ((s % 1000) / 1000)
    return {
      cx: r(seed * 11) * 100,
      cy: r(seed * 17) * 100,
      r: 0.3 + r(seed * 7) * 0.9,
      o: 0.3 + r(seed * 5) * 0.5,
    }
  })

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={rootRef}
          className="intro-overlay"
          aria-hidden="true"
          initial={{ opacity: 1, y: 0 }}
          exit={{ y: '-100%', transition: { duration: 0.55, ease: [0.7, 0, 0.2, 1] } }}
        >
          {/* ────────── BACKGROUND: stars + constellation ────────── */}
          <div className="intro-bg-layer">
            <svg className="intro-stars" viewBox="0 0 100 100" preserveAspectRatio="none">
              {stars.map((s, i) => (
                <circle key={i} className="intro-star" cx={s.cx} cy={s.cy} r={s.r} fill={C.accent} opacity={s.o} />
              ))}
            </svg>
            <svg className="intro-constellation" viewBox="0 0 100 100" preserveAspectRatio="none">
              {constellationLines.map((d, i) => (
                <path key={i} className="intro-const-line" d={d} pathLength="1"
                      stroke={C.accent} strokeOpacity="0.35" strokeWidth="0.18" fill="none"
                      strokeLinecap="round" strokeLinejoin="round" />
              ))}
            </svg>
            <div className="intro-vignette" />
            <div className="intro-grid" />
          </div>

          {/* ────────── STAGE ────────── */}
          <div className="intro-stage" ref={stageRef}>
            {/* Monitor (centered, dark/off look) */}
            <svg
              className="intro-monitor"
              viewBox="0 0 240 180"
              fill="none"
              stroke={C.accent}
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {/* Outer bezel */}
              <path className="io-draw" pathLength="1" d="M40 30 L200 30 L200 110 L40 110 Z" />
              {/* Inner screen */}
              <path className="io-draw" pathLength="1" d="M48 38 L192 38 L192 102 L48 102 Z" />
              {/* Screen fill (subtle) */}
              <rect x="48" y="38" width="144" height="64" fill={C.panel} fillOpacity="0.6" stroke="none" />
              {/* Webcam */}
              <circle className="io-fill" cx="120" cy="34" r="1" fill={C.accent} stroke="none" />
              {/* Speaker grille */}
              <path className="io-draw" pathLength="1" d="M50 107 L190 107" strokeOpacity="0.4" />
              {/* Stand */}
              <path className="io-draw" pathLength="1" d="M108 110 L108 130 L132 130 L132 110" />
              {/* Base */}
              <path className="io-draw" pathLength="1" d="M82 132 L158 132" />
              {/* Desk reflection */}
              <path className="io-draw" pathLength="1" d="M20 150 L220 150" strokeOpacity="0.35" />
              <path className="io-draw" pathLength="1" d="M60 156 L180 156" strokeOpacity="0.18" />
            </svg>

            {/* Screen flash */}
            <div className="intro-screen-flash" />

            {/* Welcome text — middle of viewport */}
            <div className="intro-welcome" aria-hidden="true">
              {'Welcome.'.split('').map((ch, i) => (
                <motion.span
                  key={i}
                  className="intro-welcome-char"
                  initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ delay: 1.6 + i * 0.05, duration: 0.6, ease: [0.22, 0.8, 0.24, 1] }}
                >
                  {ch === ' ' ? '\u00A0' : ch}
                </motion.span>
              ))}
              <motion.span
                className="intro-welcome-sub"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.3, duration: 0.6, ease: [0.22, 0.8, 0.24, 1] }}
              >
                Faisal’s portfolio
              </motion.span>
            </div>

            {/* Emit layer — origin is monitor screen center */}
            <div className="intro-emit">
              {WINDOWS.map((w) => (
                <div
                  key={w.id}
                  className={`intro-emit-obj intro-win win-${w.id}`}
                  style={{ width: `${w.w}%`, aspectRatio: `1 / ${w.ratio}` }}
                >
                  <WindowChrome label={w.label}>
                    {Body[w.id]?.()}
                  </WindowChrome>
                </div>
              ))}
              {CHIPS.map((c) => (
                <div key={c.id} className={`intro-emit-obj intro-chip chip-${c.id}`}>
                  <Chip id={c.id} />
                </div>
              ))}
            </div>
          </div>

          <style>{`
            .intro-overlay {
              position: fixed;
              inset: 0;
              z-index: 9999;
              background: radial-gradient(ellipse at center, #131319 0%, #0a0a0e 70%, #06060a 100%);
              display: grid;
              place-items: center;
              overflow: hidden;
              isolation: isolate;
            }

            /* ── Background layer ── */
            .intro-bg-layer { position: absolute; inset: 0; z-index: 0; }
            .intro-stars, .intro-constellation {
              position: absolute; inset: 0; width: 100%; height: 100%;
              pointer-events: none;
            }
            .intro-star { transform-origin: center; transform: scale(0); opacity: 0; }
            .intro-const-line { stroke-dasharray: 1; stroke-dashoffset: 1; }
            .intro-vignette {
              position: absolute; inset: 0;
              background: radial-gradient(ellipse 80% 60% at 50% 55%, transparent 0%, rgba(6,6,10,0.85) 90%);
              pointer-events: none;
            }
            .intro-grid {
              position: absolute; inset: 0;
              background-image:
                linear-gradient(rgba(201,168,124,0.06) 1px, transparent 1px),
                linear-gradient(90deg, rgba(201,168,124,0.06) 1px, transparent 1px);
              background-size: 80px 80px;
              mask-image: radial-gradient(ellipse 70% 55% at 50% 55%, #000 30%, transparent 90%);
              -webkit-mask-image: radial-gradient(ellipse 70% 55% at 50% 55%, #000 30%, transparent 90%);
              pointer-events: none;
            }

            /* ── Stage ── */
            .intro-stage {
              position: relative;
              width: min(96vw, 1240px);
              height: min(92vh, 760px);
              z-index: 1;
              display: grid;
              place-items: center;
            }

            /* ── Monitor ── */
            .intro-monitor {
              position: relative;
              width: clamp(260px, 26vmin, 360px);
              height: auto;
              filter: drop-shadow(0 20px 50px rgba(0,0,0,0.5)) drop-shadow(0 0 18px var(--accent-glow));
              opacity: 0;
              transform: scale(0.96);
              z-index: 2;
            }
            .io-draw { stroke-dasharray: 1; stroke-dashoffset: 1; }
            .io-fill { opacity: 0.8; }

            /* ── Screen flash overlay (positioned on monitor's screen area) ── */
            .intro-screen-flash {
              position: absolute;
              left: 50%;
              top: 50%;
              width: clamp(160px, 16vmin, 220px);
              height: clamp(72px, 7vmin, 100px);
              transform: translate(-50%, calc(-50% - 9%));
              background: radial-gradient(ellipse, ${C.accent} 0%, var(--accent-glow) 40%, transparent 75%);
              border-radius: 6px;
              pointer-events: none;
              opacity: 0;
              mix-blend-mode: screen;
              z-index: 3;
            }

            /* ── Welcome text (center of stage) ── */
            .intro-welcome {
              position: absolute;
              left: 50%;
              bottom: 8%;
              transform: translateX(-50%);
              z-index: 6;
              display: flex;
              align-items: baseline;
              flex-wrap: wrap;
              justify-content: center;
              gap: 0;
              font-family: var(--font-display, 'Outfit', sans-serif);
              font-weight: 600;
              font-size: clamp(2.4rem, 7vmin, 5.4rem);
              letter-spacing: -0.04em;
              color: ${C.accent};
              text-shadow: 0 0 30px var(--accent-glow), 0 0 60px var(--accent-glow);
              pointer-events: none;
              white-space: nowrap;
            }
            .intro-welcome-char { display: inline-block; }
            .intro-welcome-sub {
              position: absolute;
              top: calc(100% + 0.4rem);
              left: 50%;
              transform: translateX(-50%);
              font-size: clamp(0.7rem, 1.2vmin, 0.9rem);
              font-weight: 400;
              letter-spacing: 0.32em;
              text-transform: uppercase;
              color: ${C.muted};
              text-shadow: none;
              white-space: nowrap;
            }

            /* ── Emit layer ── */
            .intro-emit {
              position: absolute;
              inset: 0;
              z-index: 4;
              pointer-events: none;
            }
            .intro-emit-obj {
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%) scale(0);
              opacity: 0;
              filter: blur(8px);
              will-change: transform, opacity, filter;
            }

            /* ── Chips ── */
            .intro-chip {
              width: clamp(20px, 2.6vmin, 32px);
              height: clamp(20px, 2.6vmin, 32px);
              color: ${C.accent};
              filter: drop-shadow(0 0 8px var(--accent-glow));
              opacity: 0.85;
            }
            .intro-chip svg { display: block; width: 100%; height: 100%; }

            /* ══ WINDOW CHROME ══ */
            .iw-window {
              width: 100%; height: 100%;
              background: ${C.panel2};
              border: 1px solid rgba(201,168,124,0.2);
              border-radius: 8px;
              overflow: hidden;
              box-shadow:
                0 14px 40px rgba(0,0,0,0.55),
                0 0 0 1px rgba(0,0,0,0.4),
                0 0 18px rgba(201,168,124,0.08);
              display: flex; flex-direction: column;
              font-family: 'JetBrains Mono', ui-monospace, monospace;
              font-size: 8.5px;
              color: ${C.text};
            }
            .iw-titlebar {
              display: flex; align-items: center; gap: 4px;
              padding: 4px 8px;
              background: ${C.panel};
              border-bottom: 1px solid rgba(0,0,0,0.4);
              height: 18px; flex-shrink: 0;
            }
            .iw-light { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
            .iw-label {
              margin-left: 8px;
              font-size: 7.5px;
              color: ${C.muted};
              letter-spacing: 0.04em;
            }
            .iw-body {
              flex: 1;
              padding: 6px 8px;
              overflow: hidden;
              position: relative;
            }

            /* ── code window ── */
            .iw-code-line {
              white-space: nowrap;
              line-height: 1.45;
              font-size: 7.5px;
              color: ${C.text};
              overflow: hidden;
              text-overflow: clip;
            }
            .iw-indent  { padding-left: 9px; }
            .iw-indent2 { padding-left: 18px; }

            /* ── dashboard ── */
            .iw-dash { width:100%; height:100%; display:flex; flex-direction:column; gap:4px; }
            .iw-dash-row { display:flex; gap:4px; }
            .iw-dash-pill { width: 20px; height: 4px; background: ${C.faint}; border-radius: 2px; }
            .iw-dash-pill--mid { width: 14px; background: ${C.muted}; }
            .iw-dash-line { width: 100%; height: 30%; }
            .iw-dash-bars {
              flex: 1;
              display: flex; align-items: flex-end; justify-content: space-between;
              gap: 3px;
              padding-bottom: 3px;
            }
            .iw-dash-bar { flex: 1; border-radius: 1px 1px 0 0; min-height: 4px; }
            .iw-dash-foot { height: 3px; background: ${C.faint}; border-radius: 2px; opacity: 0.5; }

            /* ── schema ── */
            .iw-schema { width:100%; height:100%; }

            /* ── analytics ── */
            .iw-analytics { width:100%; height:100%; display:flex; flex-direction:column; gap:4px; }
            .iw-an-row { display:flex; gap:6px; align-items:center; }
            .iw-an-stat { font-size:8px; color:${C.green}; font-weight:600; }
            .iw-an-stat--mid { color:${C.text}; }
            .iw-an-chart { flex:1; width:100%; }

            /* ── terminal ── */
            .iw-term { font-family: 'JetBrains Mono', monospace; font-size:7.5px; line-height:1.55; color:${C.text}; }
            .iw-term-line { white-space: nowrap; overflow: hidden; }
            .iw-term-mute { color: ${C.muted}; }

            /* ── files ── */
            .iw-files { display:flex; flex-direction:column; gap:5px; height:100%; padding-top:2px; }
            .iw-files-row { display:flex; align-items:center; gap:6px; height:11px; }
            .iw-files-bar { width: 3px; height: 100%; border-radius: 2px; flex-shrink:0; }
            .iw-files-name { font-size: 7.5px; color: ${C.text}; }

            /* ── chat ── */
            .iw-chat { display:flex; flex-direction:column; gap:5px; height:100%; }
            .iw-chat-bubble {
              padding: 4px 6px;
              border-radius: 6px;
              max-width: 78%;
              display:flex; flex-direction:column; gap:2px;
            }
            .iw-chat-in { background: ${C.panel}; align-self: flex-start; border: 1px solid ${C.faint}; }
            .iw-chat-out { background: rgba(201,168,124,0.18); align-self: flex-end; }
            .iw-chat-line { display:block; height: 2px; background: ${C.muted}; border-radius: 1px; width: 60px; }
            .iw-chat-line--out { background: ${C.accent}; }
            .iw-chat-line--short { width: 36px; }
            .iw-chat-typing { display:flex; gap:3px; padding: 3px 5px; align-self: flex-start; }
            .iw-chat-typing span { width: 3px; height: 3px; border-radius:50%; background: ${C.muted}; }

            /* ── music ── */
            .iw-music {
              display:grid;
              grid-template-columns: 28% 1fr;
              grid-template-rows: 60% 40%;
              gap: 5px;
              height: 100%;
            }
            .iw-music-cover {
              grid-row: 1 / span 2;
              background: linear-gradient(135deg, ${C.accent} 0%, #6e5436 100%);
              border-radius: 4px;
              display:grid; place-items:center;
            }
            .iw-music-disc {
              width: 50%; aspect-ratio: 1; border-radius: 50%;
              background: ${C.panel};
              border: 1px solid ${C.accent};
            }
            .iw-music-info { display:flex; flex-direction:column; gap:3px; padding-top:2px; }
            .iw-music-title { height: 3px; background: ${C.text}; border-radius:1px; width: 70%; }
            .iw-music-artist { height: 2px; background: ${C.muted}; border-radius:1px; width: 50%; }
            .iw-music-progress { height: 2px; background: ${C.faint}; border-radius:1px; margin-top:2px; }
            .iw-music-progress-fill { display:block; height:100%; width: 55%; background: ${C.accent}; border-radius:1px; }
            .iw-music-wave {
              grid-column: 2;
              display:flex; align-items:flex-end; gap:2px; padding-bottom: 2px;
            }
            .iw-music-bar { flex:1; background: ${C.accent}; opacity: 0.75; border-radius: 1px; min-height: 2px; }

            /* ── gallery ── */
            .iw-gallery {
              display:grid;
              grid-template-columns: repeat(3, 1fr);
              grid-template-rows: repeat(2, 1fr);
              gap: 3px;
              height:100%;
            }
            .iw-gal-cell { border-radius: 3px; }

            /* ── browser ── */
            .iw-browser { display:flex; flex-direction:column; gap:4px; height:100%; }
            .iw-br-tabs { display:flex; gap:3px; height: 8px; }
            .iw-br-tab { width: 30px; height: 100%; background: ${C.panel}; border-radius: 2px 2px 0 0; }
            .iw-br-tab--mid { background: ${C.faint}; width: 22px; }
            .iw-br-url {
              display:flex; align-items:center; gap:5px;
              padding: 2px 6px; height: 11px;
              background: ${C.panel}; border: 1px solid ${C.faint}; border-radius: 4px;
            }
            .iw-br-dot { width: 4px; height: 4px; border-radius:50%; background: ${C.green}; }
            .iw-br-urltext { font-size: 6.5px; color: ${C.muted}; }
            .iw-br-content { flex:1; display:grid; grid-template-columns: 50% 1fr; gap:5px; }
            .iw-br-hero {
              background: linear-gradient(135deg, rgba(201,168,124,0.5), rgba(110,193,255,0.3));
              border-radius: 3px;
            }
            .iw-br-text { display:flex; flex-direction:column; gap: 3px; padding-top: 2px; }
            .iw-br-text span {
              display:block; height: 2px; border-radius: 1px;
              background: ${C.muted};
            }
            .iw-br-text span:nth-child(1) { width: 90%; background: ${C.text}; }
            .iw-br-text span:nth-child(2) { width: 70%; }
            .iw-br-text span:nth-child(3) { width: 80%; }
            .iw-br-text span:nth-child(4) { width: 55%; }

            /* ── Mobile ── */
            @media (max-width: 640px) {
              .intro-monitor { width: 200px; }
              .intro-welcome { font-size: 2.2rem; }
              .intro-welcome-sub { font-size: 0.6rem; letter-spacing: 0.24em; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
