import { useState, useCallback, useRef } from 'react'
import { motion } from 'motion/react'

/*
 * "At a Glance" bento — 5 compact info cards with 3D hover tilt,
 * pointer-tracked spotlight, per-card SVG illustrations, and staggered
 * entry. Matches site theme (warm tan accent, Outfit/Satoshi/Mono fonts).
 */

/* ─── per-card decorative SVG illustrations (currentColor = --accent) ─── */
const IllustCurrently = () => (
  <svg viewBox="0 0 120 90" fill="none" aria-hidden>
    {/* dotted grid */}
    {Array.from({ length: 4 }).map((_, r) =>
      Array.from({ length: 7 }).map((_, c) => (
        <circle key={`${r}-${c}`} cx={8 + c * 17} cy={10 + r * 20} r="0.8" fill="currentColor" opacity="0.35" />
      ))
    )}
    {/* concentric radar rings */}
    <circle cx="92" cy="46" r="26" stroke="currentColor" strokeWidth="1" opacity="0.35" />
    <circle cx="92" cy="46" r="18" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
    <circle cx="92" cy="46" r="10" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
    <circle cx="92" cy="46" r="3" fill="currentColor" opacity="0.9" />
    {/* radar sweep line */}
    <line x1="92" y1="46" x2="110" y2="34" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
  </svg>
)

const IllustBio = () => (
  <svg viewBox="0 0 120 90" fill="none" aria-hidden>
    {/* code brackets */}
    <path d="M14 22L4 45L14 68" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
    <path d="M106 22L116 45L106 68" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
    {/* layered windows — dynamic web */}
    <rect x="28" y="18" width="64" height="42" rx="5" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
    <rect x="36" y="26" width="48" height="28" rx="3" fill="currentColor" opacity="0.08" />
    <circle cx="34" cy="24" r="1.4" fill="currentColor" opacity="0.6" />
    <circle cx="39" cy="24" r="1.4" fill="currentColor" opacity="0.4" />
    <circle cx="44" cy="24" r="1.4" fill="currentColor" opacity="0.3" />
    {/* mini bars */}
    <rect x="40" y="44" width="3" height="6" fill="currentColor" opacity="0.5" />
    <rect x="46" y="40" width="3" height="10" fill="currentColor" opacity="0.55" />
    <rect x="52" y="36" width="3" height="14" fill="currentColor" opacity="0.6" />
    <rect x="58" y="42" width="3" height="8" fill="currentColor" opacity="0.45" />
    {/* spark */}
    <path d="M100 70L101 72L103 73L101 74L100 76L99 74L97 73L99 72Z" fill="currentColor" opacity="0.55" />
  </svg>
)

const IllustEducation = () => (
  <svg viewBox="0 0 120 90" fill="none" aria-hidden>
    {/* cap */}
    <path d="M60 22L28 36L60 50L92 36Z" stroke="currentColor" strokeWidth="1.4" fill="currentColor" opacity="0.2" />
    <path d="M40 42V54C40 54 48 60 60 60C72 60 80 54 80 54V42" stroke="currentColor" strokeWidth="1.4" opacity="0.6" fill="none" />
    <line x1="60" y1="50" x2="60" y2="60" stroke="currentColor" strokeWidth="1.4" opacity="0.6" />
    <circle cx="60" cy="62" r="1.8" fill="currentColor" opacity="0.8" />
    {/* tassel */}
    <line x1="92" y1="36" x2="92" y2="48" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
    <circle cx="92" cy="50" r="2" fill="currentColor" opacity="0.7" />
    {/* sparks */}
    <path d="M20 20L21 22.5L23.5 23.5L21 24.5L20 27L19 24.5L16.5 23.5L19 22.5Z" fill="currentColor" opacity="0.45" />
    <path d="M104 70L105 72L107 73L105 74L104 76L103 74L101 73L103 72Z" fill="currentColor" opacity="0.4" />
  </svg>
)

const IllustLocation = () => (
  <svg viewBox="0 0 120 90" fill="none" aria-hidden>
    {/* globe grid */}
    <circle cx="60" cy="45" r="28" stroke="currentColor" strokeWidth="1.2" opacity="0.55" />
    <ellipse cx="60" cy="45" rx="28" ry="10" stroke="currentColor" strokeWidth="0.9" opacity="0.4" />
    <ellipse cx="60" cy="45" rx="12" ry="28" stroke="currentColor" strokeWidth="0.9" opacity="0.4" />
    <line x1="32" y1="45" x2="88" y2="45" stroke="currentColor" strokeWidth="0.9" opacity="0.4" />
    {/* pin on globe */}
    <path d="M60 30C56 30 54 33 54 36C54 40 60 46 60 46C60 46 66 40 66 36C66 33 64 30 60 30Z" fill="currentColor" opacity="0.85" />
    <circle cx="60" cy="36" r="1.6" fill="var(--bg-card)" />
    {/* small pins */}
    <circle cx="96" cy="24" r="2" fill="currentColor" opacity="0.6" />
    <circle cx="22" cy="68" r="2" fill="currentColor" opacity="0.5" />
  </svg>
)

const IllustInterests = () => (
  <svg viewBox="0 0 120 90" fill="none" aria-hidden>
    {/* dotted grid */}
    {Array.from({ length: 4 }).map((_, r) =>
      Array.from({ length: 7 }).map((_, c) => (
        <circle key={`${r}-${c}`} cx={8 + c * 17} cy={10 + r * 20} r="0.7" fill="currentColor" opacity="0.3" />
      ))
    )}
    {/* neural cluster left */}
    <circle cx="32" cy="44" r="16" stroke="currentColor" strokeWidth="1" opacity="0.45" />
    <circle cx="26" cy="40" r="2" fill="currentColor" opacity="0.7" />
    <circle cx="38" cy="40" r="2" fill="currentColor" opacity="0.7" />
    <circle cx="32" cy="50" r="2" fill="currentColor" opacity="0.7" />
    <line x1="26" y1="40" x2="38" y2="40" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
    <line x1="26" y1="40" x2="32" y2="50" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
    <line x1="38" y1="40" x2="32" y2="50" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
    {/* UI window right */}
    <rect x="62" y="28" width="46" height="32" rx="4" stroke="currentColor" strokeWidth="1.1" opacity="0.55" />
    <line x1="68" y1="36" x2="92" y2="36" stroke="currentColor" strokeWidth="1.1" opacity="0.5" />
    <line x1="68" y1="42" x2="86" y2="42" stroke="currentColor" strokeWidth="1.1" opacity="0.4" />
    <rect x="68" y="48" width="16" height="6" rx="1.5" fill="currentColor" opacity="0.5" />
    {/* connecting flow */}
    <path d="M48 44C54 44 56 44 62 44" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" opacity="0.55" />
    {/* spark */}
    <path d="M104 66L105 68L107 69L105 70L104 72L103 70L101 69L103 68Z" fill="currentColor" opacity="0.5" />
  </svg>
)

const CARDS = [
  {
    id: 'currently',
    label: 'Currently',
    icon: 'ri-focus-3-line',
    span: 'wide',
    illust: IllustCurrently,
    body: (
      <>
        SQA &amp; UI/UX Intern at{' '}
        <strong style={{ color: 'var(--text-primary)' }}>Utopia IT Limited</strong>, while completing my final semester as a CSE student.
      </>
    ),
  },
  {
    id: 'bio',
    label: 'Bio',
    icon: 'ri-user-3-line',
    span: 'wide',
    illust: IllustBio,
    body: (
      <>
        Full-stack developer with a strong design sensibility — shipping dynamic, production-grade web products end-to-end. Focused on UI/UX, AI &amp; ML systems, LLM integration, and AI-assisted automation.
      </>
    ),
  },
  {
    id: 'education',
    label: 'Education',
    icon: 'ri-graduation-cap-line',
    span: 'narrow',
    illust: IllustEducation,
    body: (
      <>
        BSc in Computer Science &amp; Engineering
        <br />
        <span style={{ color: 'var(--text-secondary)' }}>University of Asia Pacific</span>
        <br />
        <span className="gtk-kv">
          <span className="gtk-kv-tag">CGPA</span>
          <span className="gtk-kv-val">3.80 / 4.00</span>
        </span>
      </>
    ),
  },
  {
    id: 'location',
    label: 'Location',
    icon: 'ri-map-pin-2-line',
    span: 'narrow',
    illust: IllustLocation,
    body: (
      <ul className="gtk-list">
        <li><i className="ri-building-line" /> Dhaka, Bangladesh</li>
        <li><i className="ri-global-line" /> Open to opportunities worldwide</li>
        <li><i className="ri-flag-line" /> Open to opportunities in Bangladesh</li>
      </ul>
    ),
  },
  {
    id: 'interests',
    label: 'Interests',
    icon: 'ri-sparkling-2-line',
    span: 'wide',
    illust: IllustInterests,
    body: (
      <ul className="gtk-list">
        <li><i className="ri-robot-2-line" /> Agent-assisted development &amp; dynamic web design</li>
        <li><i className="ri-brain-line" /> AI / ML prediction systems</li>
        <li><i className="ri-pen-nib-line" /> UI / UX design</li>
      </ul>
    ),
  },
]

const ENTRY = {
  hidden: { opacity: 0, y: 28, rotateX: -8, scale: 0.97 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 110, damping: 14, mass: 0.7, delay: i * 0.07 },
  }),
}

function GTKCard({ card, index }) {
  const ref = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [spot, setSpot] = useState({ x: 50, y: 50 })
  const [hover, setHover] = useState(false)
  const Illust = card.illust

  const onMove = useCallback((e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    setTilt({ x: (px - 0.5) * 12, y: (py - 0.5) * -8 })
    setSpot({ x: px * 100, y: py * 100 })
  }, [])

  const onLeave = useCallback(() => {
    setHover(false)
    setTilt({ x: 0, y: 0 })
  }, [])

  return (
    <motion.div
      ref={ref}
      className={`gtk-card gtk-card--${card.span}`}
      custom={index}
      variants={ENTRY}
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={onLeave}
      animate={{ rotateX: tilt.y, rotateY: tilt.x, z: hover ? 14 : 0 }}
      transition={{ type: 'spring', stiffness: 380, damping: 32, mass: 0.7 }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* pointer spotlight */}
      <div
        className="gtk-spot"
        style={{
          opacity: hover ? 1 : 0,
          background: `radial-gradient(340px circle at ${spot.x}% ${spot.y}%, var(--accent-glow), transparent 55%)`,
        }}
      />
      {/* rim light */}
      <div className="gtk-rim" />

      {/* corner illustration */}
      <div className="gtk-illust" aria-hidden>
        <Illust />
      </div>

      <div className="gtk-head">
        <span className="gtk-icon-wrap">
          <i className={`gtk-icon ${card.icon}`} />
        </span>
        <span className="gtk-label">{card.label}</span>
        <span className="gtk-pulse" />
      </div>

      <div className="gtk-body">{card.body}</div>
    </motion.div>
  )
}

export default function GetToKnowMe() {
  return (
    <section className="gtk-section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">At a Glance</span>
          <h2>The Professional Snapshot</h2>
          <p>A concise look at my current focus, background, and the work I enjoy.</p>
        </div>

        <motion.div
          className="gtk-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px', amount: 0.15 }}
          style={{ perspective: 1400 }}
        >
          {CARDS.map((c, i) => (
            <GTKCard key={c.id} card={c} index={i} />
          ))}
        </motion.div>
      </div>

      <style>{`
        .gtk-section {
          position: relative;
          padding: 4rem 0 3rem;
          background: transparent;
          font-family: var(--font-body);
        }

        .gtk-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(12px, 1.3vw, 18px);
          max-width: 1040px;
          margin: 0 auto;
        }

        /* bento placement */
        .gtk-card:nth-child(1) { grid-column: 1 / span 2; grid-row: 1; }
        .gtk-card:nth-child(2) { grid-column: 1 / span 2; grid-row: 2; }
        .gtk-card:nth-child(3) { grid-column: 3; grid-row: 1; }
        .gtk-card:nth-child(4) { grid-column: 3; grid-row: 2; }
        .gtk-card:nth-child(5) { grid-column: 1 / -1; grid-row: 3; }

        .gtk-card {
          position: relative;
          padding: clamp(14px, 1.5vw, 20px) clamp(16px, 1.7vw, 22px);
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 14px;
          box-shadow: var(--shadow-card);
          overflow: hidden;
          will-change: transform;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          color: var(--text-primary);
          font-family: var(--font-body);
        }

        .gtk-card:hover {
          border-color: var(--accent);
          box-shadow: 0 18px 50px -24px var(--accent-glow),
                      0 10px 28px -12px rgba(0,0,0,0.35);
        }

        /* accent stripe */
        .gtk-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: clamp(16px, 1.7vw, 22px);
          width: clamp(32px, 4vw, 48px);
          height: 2px;
          background: var(--accent);
          opacity: 0.85;
          border-radius: 2px;
        }

        /* pointer spotlight */
        .gtk-spot {
          position: absolute;
          inset: 0;
          pointer-events: none;
          border-radius: inherit;
          transition: opacity 0.3s ease;
        }

        /* surface rim light */
        .gtk-rim {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          background: linear-gradient(135deg, rgba(255,255,255,0.04), transparent 55%);
        }

        [data-theme="light"] .gtk-rim {
          background: linear-gradient(135deg, rgba(255,255,255,0.5), transparent 60%);
        }

        /* corner illustration */
        .gtk-illust {
          position: absolute;
          right: -10px;
          bottom: -6px;
          width: clamp(110px, 13vw, 160px);
          color: var(--accent);
          opacity: 0.22;
          pointer-events: none;
          transition: opacity 0.4s ease, transform 0.5s ease;
          will-change: transform;
        }

        .gtk-illust svg { width: 100%; height: auto; display: block; }

        .gtk-card:hover .gtk-illust {
          opacity: 0.38;
          transform: translate(-4px, -4px);
        }

        .gtk-head {
          display: flex;
          align-items: center;
          gap: 9px;
          margin-bottom: 0.65rem;
          position: relative;
        }

        .gtk-icon-wrap {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: var(--accent-glow);
          border: 1px solid var(--border);
          color: var(--accent);
          flex-shrink: 0;
        }

        .gtk-icon { font-size: 0.95rem; }

        .gtk-label {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: var(--text-secondary);
          font-weight: 600;
        }

        .gtk-pulse {
          margin-left: auto;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--accent);
          opacity: 0.65;
          box-shadow: 0 0 0 0 var(--accent-glow);
          animation: gtkPulse 2.4s ease-in-out infinite;
        }

        @keyframes gtkPulse {
          0%, 100% { box-shadow: 0 0 0 0 var(--accent-glow); }
          50% { box-shadow: 0 0 0 6px transparent; }
        }

        .gtk-body {
          position: relative;
          color: var(--text-secondary);
          font-family: var(--font-body);
          font-size: 0.9rem;
          line-height: 1.55;
        }

        .gtk-body strong { font-weight: 600; }

        .gtk-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .gtk-list li {
          display: flex;
          align-items: center;
          gap: 9px;
          font-size: 0.9rem;
        }

        .gtk-list li i {
          color: var(--accent);
          font-size: 0.95rem;
          width: 16px;
          text-align: center;
          flex-shrink: 0;
        }

        .gtk-kv {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 6px;
        }

        .gtk-kv-tag {
          font-family: var(--font-mono);
          font-size: 0.58rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--accent);
          background: var(--accent-glow);
          padding: 3px 7px;
          border: 1px solid var(--border);
          border-radius: 999px;
        }

        .gtk-kv-val {
          color: var(--text-primary);
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 0.92rem;
        }

        @media (max-width: 900px) {
          .gtk-grid { grid-template-columns: repeat(2, 1fr); }
          .gtk-card:nth-child(1) { grid-column: 1 / -1; grid-row: auto; }
          .gtk-card:nth-child(2) { grid-column: 1 / -1; grid-row: auto; }
          .gtk-card:nth-child(3) { grid-column: 1; grid-row: auto; }
          .gtk-card:nth-child(4) { grid-column: 2; grid-row: auto; }
          .gtk-card:nth-child(5) { grid-column: 1 / -1; grid-row: auto; }
        }

        @media (max-width: 560px) {
          .gtk-grid { grid-template-columns: 1fr; }
          .gtk-card,
          .gtk-card:nth-child(n) { grid-column: 1 / -1; }
          .gtk-illust { width: 100px; }
        }
      `}</style>
    </section>
  )
}
