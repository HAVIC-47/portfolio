import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'

/*
 * "At a Glance" — 5 tall expanding cards side-by-side.
 * Hover/focus expands a card (5fr) while others collapse (1fr) to vertical
 * rotated labels. Full-bleed site-native SVG art behind each panel.
 */

/* ─── per-card decorative SVG illustrations (currentColor = --accent) ─── */
const IllustCurrently = () => (
  <svg viewBox="0 0 120 90" fill="none" aria-hidden preserveAspectRatio="xMidYMid slice">
    {Array.from({ length: 4 }).map((_, r) =>
      Array.from({ length: 7 }).map((_, c) => (
        <circle key={`${r}-${c}`} cx={8 + c * 17} cy={10 + r * 20} r="0.8" fill="currentColor" opacity="0.35" />
      ))
    )}
    <circle cx="92" cy="46" r="26" stroke="currentColor" strokeWidth="1" opacity="0.35" />
    <circle cx="92" cy="46" r="18" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
    <circle cx="92" cy="46" r="10" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
    <circle cx="92" cy="46" r="3" fill="currentColor" opacity="0.9" />
    <line x1="92" y1="46" x2="110" y2="34" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
  </svg>
)

const IllustBio = () => (
  <svg viewBox="0 0 120 90" fill="none" aria-hidden preserveAspectRatio="xMidYMid slice">
    <path d="M14 22L4 45L14 68" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
    <path d="M106 22L116 45L106 68" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
    <rect x="28" y="18" width="64" height="42" rx="5" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
    <rect x="36" y="26" width="48" height="28" rx="3" fill="currentColor" opacity="0.08" />
    <circle cx="34" cy="24" r="1.4" fill="currentColor" opacity="0.6" />
    <circle cx="39" cy="24" r="1.4" fill="currentColor" opacity="0.4" />
    <circle cx="44" cy="24" r="1.4" fill="currentColor" opacity="0.3" />
    <rect x="40" y="44" width="3" height="6" fill="currentColor" opacity="0.5" />
    <rect x="46" y="40" width="3" height="10" fill="currentColor" opacity="0.55" />
    <rect x="52" y="36" width="3" height="14" fill="currentColor" opacity="0.6" />
    <rect x="58" y="42" width="3" height="8" fill="currentColor" opacity="0.45" />
    <path d="M100 70L101 72L103 73L101 74L100 76L99 74L97 73L99 72Z" fill="currentColor" opacity="0.55" />
  </svg>
)

const IllustEducation = () => (
  <svg viewBox="0 0 120 90" fill="none" aria-hidden preserveAspectRatio="xMidYMid slice">
    <path d="M60 22L28 36L60 50L92 36Z" stroke="currentColor" strokeWidth="1.4" fill="currentColor" opacity="0.2" />
    <path d="M40 42V54C40 54 48 60 60 60C72 60 80 54 80 54V42" stroke="currentColor" strokeWidth="1.4" opacity="0.6" fill="none" />
    <line x1="60" y1="50" x2="60" y2="60" stroke="currentColor" strokeWidth="1.4" opacity="0.6" />
    <circle cx="60" cy="62" r="1.8" fill="currentColor" opacity="0.8" />
    <line x1="92" y1="36" x2="92" y2="48" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
    <circle cx="92" cy="50" r="2" fill="currentColor" opacity="0.7" />
    <path d="M20 20L21 22.5L23.5 23.5L21 24.5L20 27L19 24.5L16.5 23.5L19 22.5Z" fill="currentColor" opacity="0.45" />
    <path d="M104 70L105 72L107 73L105 74L104 76L103 74L101 73L103 72Z" fill="currentColor" opacity="0.4" />
  </svg>
)

const IllustLocation = () => (
  <svg viewBox="0 0 120 90" fill="none" aria-hidden preserveAspectRatio="xMidYMid slice">
    <circle cx="60" cy="45" r="28" stroke="currentColor" strokeWidth="1.2" opacity="0.55" />
    <ellipse cx="60" cy="45" rx="28" ry="10" stroke="currentColor" strokeWidth="0.9" opacity="0.4" />
    <ellipse cx="60" cy="45" rx="12" ry="28" stroke="currentColor" strokeWidth="0.9" opacity="0.4" />
    <line x1="32" y1="45" x2="88" y2="45" stroke="currentColor" strokeWidth="0.9" opacity="0.4" />
    <path d="M60 30C56 30 54 33 54 36C54 40 60 46 60 46C60 46 66 40 66 36C66 33 64 30 60 30Z" fill="currentColor" opacity="0.85" />
    <circle cx="60" cy="36" r="1.6" fill="var(--bg-card)" />
    <circle cx="96" cy="24" r="2" fill="currentColor" opacity="0.6" />
    <circle cx="22" cy="68" r="2" fill="currentColor" opacity="0.5" />
  </svg>
)

const IllustInterests = () => (
  <svg viewBox="0 0 120 90" fill="none" aria-hidden preserveAspectRatio="xMidYMid slice">
    {Array.from({ length: 4 }).map((_, r) =>
      Array.from({ length: 7 }).map((_, c) => (
        <circle key={`${r}-${c}`} cx={8 + c * 17} cy={10 + r * 20} r="0.7" fill="currentColor" opacity="0.3" />
      ))
    )}
    <circle cx="32" cy="44" r="16" stroke="currentColor" strokeWidth="1" opacity="0.45" />
    <circle cx="26" cy="40" r="2" fill="currentColor" opacity="0.7" />
    <circle cx="38" cy="40" r="2" fill="currentColor" opacity="0.7" />
    <circle cx="32" cy="50" r="2" fill="currentColor" opacity="0.7" />
    <line x1="26" y1="40" x2="38" y2="40" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
    <line x1="26" y1="40" x2="32" y2="50" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
    <line x1="38" y1="40" x2="32" y2="50" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
    <rect x="62" y="28" width="46" height="32" rx="4" stroke="currentColor" strokeWidth="1.1" opacity="0.55" />
    <line x1="68" y1="36" x2="92" y2="36" stroke="currentColor" strokeWidth="1.1" opacity="0.5" />
    <line x1="68" y1="42" x2="86" y2="42" stroke="currentColor" strokeWidth="1.1" opacity="0.4" />
    <rect x="68" y="48" width="16" height="6" rx="1.5" fill="currentColor" opacity="0.5" />
    <path d="M48 44C54 44 56 44 62 44" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" opacity="0.55" />
    <path d="M104 66L105 68L107 69L105 70L104 72L103 70L101 69L103 68Z" fill="currentColor" opacity="0.5" />
  </svg>
)

const CARDS = [
  {
    id: 'currently',
    label: 'Currently',
    title: 'Interning & Wrapping Up CSE',
    icon: 'ri-focus-3-line',
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
    title: 'Builder, End-to-End',
    icon: 'ri-user-3-line',
    illust: IllustBio,
    body: (
      <>
        Full-stack developer with a strong design sensibility — shipping dynamic, production-grade web products. Focused on UI/UX, AI &amp; ML, LLM integration, and automation.
      </>
    ),
  },
  {
    id: 'education',
    label: 'Education',
    title: 'CSE @ UAP',
    icon: 'ri-graduation-cap-line',
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
    title: 'Dhaka & Beyond',
    icon: 'ri-map-pin-2-line',
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
    title: 'Where I Go Deep',
    icon: 'ri-sparkling-2-line',
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

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 768 : true
  )
  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return isDesktop
}

function ExpandCard({ card, index, active, onActivate }) {
  const Illust = card.illust
  const isActive = active === index
  const cardRef = useRef(null)

  const onPointerMove = (e) => {
    const el = cardRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const lx = e.clientX - r.left
    const ly = e.clientY - r.top
    el.style.setProperty('--gx', `${lx}px`)
    el.style.setProperty('--gy', `${ly}px`)
    const ang = Math.atan2(ly - r.height / 2, lx - r.width / 2)
    el.style.setProperty('--rot', `${ang}rad`)
  }

  const onPointerLeave = () => {
    const el = cardRef.current
    if (!el) return
    el.style.setProperty('--rot', `0rad`)
  }

  return (
    <li
      ref={cardRef}
      className="gtk-exp-card"
      data-active={isActive}
      role="tab"
      tabIndex={0}
      aria-selected={isActive}
      onMouseEnter={() => onActivate(index)}
      onFocus={() => onActivate(index)}
      onClick={() => onActivate(index)}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div className="gtk-exp-arc" aria-hidden />
      <div className="gtk-exp-spot" aria-hidden />
      <div className="gtk-exp-rim" aria-hidden />
      <div className="gtk-exp-bg" aria-hidden>
        <Illust />
      </div>
      <div className="gtk-exp-vignette" aria-hidden />

      <span className="gtk-exp-vlabel" aria-hidden>{card.label}</span>

      <AnimatePresence mode="wait">
        {isActive && (
          <motion.article
            key={card.id}
            className="gtk-exp-content"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: { transition: { staggerChildren: 0 } },
              visible: { transition: { staggerChildren: 0.075, delayChildren: 0.05 } },
            }}
          >
            <motion.div
              className="gtk-exp-icon"
              variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
            >
              <i className={card.icon} />
            </motion.div>
            <motion.span
              className="gtk-exp-label"
              variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
            >
              {card.label}
            </motion.span>
            <motion.h3
              className="gtk-exp-title"
              variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
            >
              {card.title}
            </motion.h3>
            <motion.div
              className="gtk-exp-body"
              variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
            >
              {card.body}
            </motion.div>
            <motion.span
              className="gtk-exp-rule"
              variants={{ hidden: { opacity: 0, scaleX: 0 }, visible: { opacity: 1, scaleX: 1 } }}
              style={{ transformOrigin: 'left center' }}
            />
          </motion.article>
        )}
      </AnimatePresence>
    </li>
  )
}

export default function GetToKnowMe() {
  const [active, setActive] = useState(0)
  const isDesktop = useIsDesktop()

  const ladder = CARDS.map((_, i) => (i === active ? '5fr' : '1fr')).join(' ')
  const gridStyle = isDesktop
    ? { gridTemplateColumns: ladder, gridTemplateRows: '1fr' }
    : { gridTemplateRows: ladder, gridTemplateColumns: '1fr' }

  return (
    <section className="gtk-section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">At a Glance</span>
          <h2>The Professional Snapshot</h2>
          <p>A concise look at my current focus, background, and the work I enjoy.</p>
        </div>

        <motion.ul
          className="gtk-expand"
          role="tablist"
          style={gridStyle}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {CARDS.map((c, i) => (
            <ExpandCard key={c.id} card={c} index={i} active={active} onActivate={setActive} />
          ))}
        </motion.ul>
      </div>

      <style>{`
        .gtk-section {
          position: relative;
          padding: 4rem 0 3rem;
          background: transparent;
          font-family: var(--font-body);
        }

        .gtk-expand {
          list-style: none;
          padding: 0;
          margin: 0 auto;
          display: grid;
          gap: 10px;
          width: 100%;
          max-width: 1180px;
          height: clamp(440px, 52vh, 540px);
        }

        @media (prefers-reduced-motion: no-preference) {
          .gtk-expand {
            transition: grid-template-columns 520ms cubic-bezier(0.22, 1, 0.36, 1),
                        grid-template-rows 520ms cubic-bezier(0.22, 1, 0.36, 1);
          }
        }

        .gtk-exp-card {
          --gx: 50%;
          --gy: 50%;
          --spot-size: 320px;
          position: relative;
          overflow: hidden;
          border-radius: 14px;
          border: 1px solid var(--border);
          background: var(--bg-card);
          box-shadow: var(--shadow-card);
          cursor: pointer;
          min-width: 0;
          min-height: 0;
          outline: none;
          isolation: isolate;
          transition: border-color 0.35s ease, box-shadow 0.35s ease;
        }

        /* cursor-angle rotating conic arc — 90° bright accent sweep */
        .gtk-exp-arc {
          position: absolute;
          inset: -1.5px;
          border-radius: 15.5px;
          pointer-events: none;
          padding: 1.5px;
          background: conic-gradient(
            from var(--rot, 0rad),
            var(--accent) 0deg,
            var(--accent) 90deg,
            transparent 90deg,
            transparent 360deg
          );
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
                  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
                  mask-composite: exclude;
          opacity: 0;
          filter: drop-shadow(0 0 6px var(--accent-glow));
          transition: opacity 0.35s ease;
        }
        .gtk-exp-card:hover .gtk-exp-arc,
        .gtk-exp-card:focus-visible .gtk-exp-arc,
        .gtk-exp-card[data-active="true"] .gtk-exp-arc { opacity: 1; }

        /* pointer-tracked spotlight wash (accent-tinted) */
        .gtk-exp-spot {
          position: absolute;
          inset: 0;
          pointer-events: none;
          border-radius: inherit;
          background: radial-gradient(
            var(--spot-size) var(--spot-size) at var(--gx) var(--gy),
            var(--accent-glow),
            transparent 60%
          );
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        .gtk-exp-card:hover .gtk-exp-spot { opacity: 1; }

        /* cursor-following bright accent rim (border-only via mask) */
        .gtk-exp-rim {
          position: absolute;
          inset: 0;
          pointer-events: none;
          border-radius: inherit;
          padding: 1px;
          background: radial-gradient(
            calc(var(--spot-size) * 0.7) calc(var(--spot-size) * 0.7) at var(--gx) var(--gy),
            var(--accent),
            transparent 65%
          );
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
                  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
                  mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        .gtk-exp-card:hover .gtk-exp-rim,
        .gtk-exp-card:focus-visible .gtk-exp-rim { opacity: 0.9; }

        .gtk-exp-card:focus-visible { border-color: var(--accent); }
        .gtk-exp-card[data-active="true"] {
          border-color: var(--accent);
          box-shadow: 0 22px 60px -24px var(--accent-glow),
                      0 12px 32px -14px rgba(0, 0, 0, 0.35);
        }

        /* background art */
        .gtk-exp-bg {
          position: absolute;
          inset: 0;
          color: var(--accent);
          opacity: 0.18;
          transform: scale(1.08);
          transition: opacity 0.45s ease, transform 0.6s ease;
          pointer-events: none;
        }
        .gtk-exp-bg svg { width: 100%; height: 100%; display: block; }
        .gtk-exp-card[data-active="true"] .gtk-exp-bg {
          opacity: 0.48;
          transform: scale(1);
        }

        /* vignette for legibility */
        .gtk-exp-vignette {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            180deg,
            var(--bg-card) 0%,
            rgba(0, 0, 0, 0) 35%,
            rgba(0, 0, 0, 0) 55%,
            var(--bg-card) 100%
          );
        }
        [data-theme="light"] .gtk-exp-vignette {
          background: linear-gradient(
            180deg,
            var(--bg-card) 0%,
            rgba(244, 239, 230, 0) 35%,
            rgba(244, 239, 230, 0) 55%,
            var(--bg-card) 100%
          );
        }

        /* collapsed vertical label */
        .gtk-exp-vlabel {
          position: absolute;
          left: 18px;
          bottom: 20px;
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--text-secondary);
          opacity: 1;
          transition: opacity 0.3s ease;
          pointer-events: none;
          white-space: nowrap;
        }
        .gtk-exp-card[data-active="true"] .gtk-exp-vlabel { opacity: 0; }

        @media (max-width: 767px) {
          .gtk-exp-vlabel {
            writing-mode: horizontal-tb;
            transform: none;
            left: 20px;
            bottom: auto;
            top: 50%;
            translate: 0 -50%;
          }
        }

        /* expanded content */
        .gtk-exp-content {
          position: absolute;
          inset: auto 0 0 0;
          padding: clamp(20px, 2.2vw, 32px);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
          color: var(--text-primary);
        }

        .gtk-exp-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: var(--accent-glow);
          border: 1px solid var(--border);
          color: var(--accent);
          font-size: 1.1rem;
          margin-bottom: 2px;
        }

        .gtk-exp-label {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--text-secondary);
          font-weight: 600;
        }

        .gtk-exp-title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(1.4rem, 1.8vw, 1.95rem);
          line-height: 1.15;
          color: var(--text-primary);
          margin: 0;
          letter-spacing: -0.01em;
        }

        .gtk-exp-body {
          color: var(--text-secondary);
          font-family: var(--font-body);
          font-size: 0.95rem;
          line-height: 1.6;
          max-width: 42ch;
        }
        .gtk-exp-body strong { font-weight: 600; }

        .gtk-exp-rule {
          display: block;
          width: 56px;
          height: 2px;
          background: var(--accent);
          border-radius: 2px;
          margin-top: 6px;
        }

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
          font-size: 0.92rem;
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

        /* ─── mobile ─── */
        @media (max-width: 767px) {
          .gtk-expand {
            height: clamp(520px, 80vh, 700px);
            max-width: 560px;
          }
          .gtk-exp-content {
            padding: clamp(18px, 4vw, 24px);
          }
          .gtk-exp-title { font-size: 1.4rem; }
          .gtk-exp-body { font-size: 0.9rem; }
        }

        @media (max-width: 480px) {
          .gtk-expand { gap: 8px; }
          .gtk-exp-bg { opacity: 0.14; }
          .gtk-exp-card[data-active="true"] .gtk-exp-bg { opacity: 0.42; }
        }
      `}</style>
    </section>
  )
}
