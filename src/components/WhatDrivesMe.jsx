import { useState } from 'react'
import { motion } from 'motion/react'

/*
 * "What Drives Me" — 4 flip cards. Front shows title + primary
 * illustration. On hover the card rotates on Y to reveal extended
 * detail, keywords, and a secondary illustration.
 * Matches site theme: --bg-card, --accent (warm tan), --font-body,
 * --font-display, --font-mono.
 */

/* ─────────── Front + back illustrations per card ─────────── */

/* Artificial Intelligence */
const AIFront = () => (
  <svg viewBox="0 0 120 120" fill="none" aria-hidden>
    <circle cx="60" cy="60" r="44" stroke="currentColor" strokeWidth="1" strokeDasharray="3 5" opacity="0.3" />
    <circle cx="60" cy="60" r="32" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
    {/* neural nodes */}
    <circle cx="46" cy="48" r="3.2" fill="currentColor" opacity="0.9" />
    <circle cx="74" cy="48" r="3.2" fill="currentColor" opacity="0.9" />
    <circle cx="60" cy="64" r="3.2" fill="currentColor" opacity="0.9" />
    <circle cx="48" cy="76" r="2.4" fill="currentColor" opacity="0.7" />
    <circle cx="72" cy="76" r="2.4" fill="currentColor" opacity="0.7" />
    {/* connections */}
    <line x1="46" y1="48" x2="74" y2="48" stroke="currentColor" strokeWidth="1" opacity="0.6" />
    <line x1="46" y1="48" x2="60" y2="64" stroke="currentColor" strokeWidth="1" opacity="0.6" />
    <line x1="74" y1="48" x2="60" y2="64" stroke="currentColor" strokeWidth="1" opacity="0.6" />
    <line x1="60" y1="64" x2="48" y2="76" stroke="currentColor" strokeWidth="1" opacity="0.55" />
    <line x1="60" y1="64" x2="72" y2="76" stroke="currentColor" strokeWidth="1" opacity="0.55" />
    {/* spark */}
    <path d="M96 28L97.5 31L100.5 32.5L97.5 34L96 37L94.5 34L91.5 32.5L94.5 31Z" fill="currentColor" opacity="0.6" />
  </svg>
)
const AIBack = () => (
  <svg viewBox="0 0 120 120" fill="none" aria-hidden>
    {/* layered matrix */}
    {Array.from({ length: 5 }).map((_, r) =>
      Array.from({ length: 5 }).map((_, c) => (
        <rect key={`${r}-${c}`} x={22 + c * 16} y={22 + r * 16} width="10" height="10" rx="2" fill="currentColor" opacity={0.15 + ((r + c) % 3) * 0.15} />
      ))
    )}
    {/* vector arrow */}
    <path d="M18 102L102 18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.55" strokeDasharray="3 3" />
    <path d="M102 18L94 20L100 26Z" fill="currentColor" opacity="0.7" />
  </svg>
)

/* Dynamic Web Design */
const WebFront = () => (
  <svg viewBox="0 0 120 120" fill="none" aria-hidden>
    {/* window */}
    <rect x="20" y="28" width="80" height="56" rx="6" stroke="currentColor" strokeWidth="1.3" opacity="0.6" />
    <circle cx="28" cy="36" r="1.6" fill="currentColor" opacity="0.7" />
    <circle cx="33" cy="36" r="1.6" fill="currentColor" opacity="0.5" />
    <circle cx="38" cy="36" r="1.6" fill="currentColor" opacity="0.4" />
    <line x1="20" y1="44" x2="100" y2="44" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    {/* bento blocks */}
    <rect x="28" y="50" width="22" height="14" rx="3" fill="currentColor" opacity="0.22" />
    <rect x="54" y="50" width="38" height="14" rx="3" fill="currentColor" opacity="0.15" />
    <rect x="28" y="68" width="38" height="10" rx="3" fill="currentColor" opacity="0.15" />
    <rect x="70" y="68" width="22" height="10" rx="3" fill="currentColor" opacity="0.22" />
    {/* cursor */}
    <path d="M72 58L82 68L76 68L74 74L72 68L67 68Z" fill="currentColor" opacity="0.85" />
  </svg>
)
const WebBack = () => (
  <svg viewBox="0 0 120 120" fill="none" aria-hidden>
    {/* motion layers */}
    <rect x="18" y="22" width="70" height="44" rx="6" stroke="currentColor" strokeWidth="1.2" opacity="0.55" transform="rotate(-6 53 44)" />
    <rect x="28" y="36" width="70" height="44" rx="6" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
    <rect x="38" y="50" width="70" height="44" rx="6" stroke="currentColor" strokeWidth="1.2" opacity="0.85" transform="rotate(4 73 72)" />
    {/* motion arc */}
    <path d="M14 100 C 40 70, 80 70, 106 100" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.55" fill="none" />
    <circle cx="14" cy="100" r="2" fill="currentColor" opacity="0.7" />
    <circle cx="106" cy="100" r="2.4" fill="currentColor" opacity="0.9" />
  </svg>
)

/* AI Research & Computer Vision */
const CVFront = () => (
  <svg viewBox="0 0 120 120" fill="none" aria-hidden>
    {/* eye outline */}
    <path d="M14 60C30 38 50 32 60 32C70 32 90 38 106 60C90 82 70 88 60 88C50 88 30 82 14 60Z" stroke="currentColor" strokeWidth="1.4" opacity="0.6" />
    <circle cx="60" cy="60" r="16" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
    <circle cx="60" cy="60" r="8" fill="currentColor" opacity="0.85" />
    <circle cx="56" cy="56" r="2" fill="var(--bg-card)" />
    {/* focus ticks */}
    <line x1="60" y1="20" x2="60" y2="28" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
    <line x1="60" y1="92" x2="60" y2="100" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
    <line x1="20" y1="60" x2="28" y2="60" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
    <line x1="92" y1="60" x2="100" y2="60" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
  </svg>
)
const CVBack = () => (
  <svg viewBox="0 0 120 120" fill="none" aria-hidden>
    {/* detection frames */}
    <rect x="20" y="22" width="38" height="32" rx="2" stroke="currentColor" strokeWidth="1.3" opacity="0.75" />
    <path d="M20 22H26M52 22H58M20 54H26M52 54H58" stroke="currentColor" strokeWidth="2" opacity="0.9" />
    <rect x="66" y="44" width="34" height="30" rx="2" stroke="currentColor" strokeWidth="1.3" opacity="0.6" />
    <path d="M66 44H72M94 44H100M66 74H72M94 74H100" stroke="currentColor" strokeWidth="2" opacity="0.75" />
    <rect x="32" y="70" width="42" height="28" rx="2" stroke="currentColor" strokeWidth="1.3" opacity="0.55" />
    <path d="M32 70H38M68 70H74M32 98H38M68 98H74" stroke="currentColor" strokeWidth="2" opacity="0.7" />
    {/* pixel grid */}
    {Array.from({ length: 3 }).map((_, r) =>
      Array.from({ length: 3 }).map((_, c) => (
        <rect key={`${r}-${c}`} x={88 + c * 7} y={14 + r * 7} width="5" height="5" fill="currentColor" opacity={0.25 + ((r + c) % 2) * 0.25} />
      ))
    )}
  </svg>
)

/* Systems Programming */
const SysFront = () => (
  <svg viewBox="0 0 120 120" fill="none" aria-hidden>
    {/* terminal */}
    <rect x="18" y="26" width="84" height="62" rx="6" stroke="currentColor" strokeWidth="1.3" opacity="0.6" />
    <line x1="18" y1="38" x2="102" y2="38" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <circle cx="26" cy="32" r="1.6" fill="currentColor" opacity="0.7" />
    <circle cx="31" cy="32" r="1.6" fill="currentColor" opacity="0.5" />
    <circle cx="36" cy="32" r="1.6" fill="currentColor" opacity="0.4" />
    {/* prompt lines */}
    <path d="M26 48L30 52L26 56" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.85" />
    <line x1="34" y1="54" x2="70" y2="54" stroke="currentColor" strokeWidth="1.4" opacity="0.5" />
    <path d="M26 62L30 66L26 70" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
    <line x1="34" y1="68" x2="60" y2="68" stroke="currentColor" strokeWidth="1.4" opacity="0.4" />
    <path d="M26 76L30 80L26 84" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
    <rect x="34" y="80" width="8" height="4" rx="1" fill="currentColor" opacity="0.55" />
  </svg>
)
const SysBack = () => (
  <svg viewBox="0 0 120 120" fill="none" aria-hidden>
    {/* chip */}
    <rect x="34" y="34" width="52" height="52" rx="6" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
    <rect x="44" y="44" width="32" height="32" rx="3" fill="currentColor" opacity="0.15" />
    <text x="60" y="66" textAnchor="middle" fill="currentColor" opacity="0.8" fontSize="10" fontFamily="monospace" fontWeight="700">CPU</text>
    {/* pins */}
    {[0,1,2,3,4].map(i => (
      <g key={i}>
        <line x1={40 + i * 10} y1="34" x2={40 + i * 10} y2="24" stroke="currentColor" strokeWidth="1.3" opacity="0.65" />
        <line x1={40 + i * 10} y1="86" x2={40 + i * 10} y2="96" stroke="currentColor" strokeWidth="1.3" opacity="0.65" />
        <line x1="34" y1={40 + i * 10} x2="24" y2={40 + i * 10} stroke="currentColor" strokeWidth="1.3" opacity="0.65" />
        <line x1="86" y1={40 + i * 10} x2="96" y2={40 + i * 10} stroke="currentColor" strokeWidth="1.3" opacity="0.65" />
      </g>
    ))}
  </svg>
)

/* ─────────── Card data ─────────── */

const DRIVERS = [
  {
    id: 'ai',
    title: 'Artificial Intelligence',
    icon: 'ri-brain-line',
    tagline: 'Teaching systems to reason and decide.',
    back: {
      desc: 'From minimax game-playing agents to modern LLMs — building models that learn patterns and make informed decisions from data.',
      tags: ['LLM', 'Minimax', 'Neural Nets', 'Prediction'],
    },
    Front: AIFront,
    Back: AIBack,
  },
  {
    id: 'web',
    title: 'Dynamic Web Design',
    icon: 'ri-layout-masonry-line',
    tagline: 'Interfaces that feel alive, not just look good.',
    back: {
      desc: 'Motion-led product design — scroll choreography, 3D depth, micro-interactions, and bento layouts that communicate hierarchy with craft.',
      tags: ['Framer Motion', '3D / CSS', 'Bento', 'UI/UX'],
    },
    Front: WebFront,
    Back: WebBack,
  },
  {
    id: 'cv',
    title: 'AI Research & Computer Vision',
    icon: 'ri-scan-line',
    tagline: 'Exploring how machines see and understand.',
    back: {
      desc: 'Research-leaning work on vision models — object detection, segmentation, and experimenting with architectures that bridge perception and reasoning.',
      tags: ['Detection', 'Segmentation', 'CNN', 'Research'],
    },
    Front: CVFront,
    Back: CVBack,
  },
  {
    id: 'sys',
    title: 'Systems Programming',
    icon: 'ri-terminal-box-line',
    tagline: 'Understanding the machine under the code.',
    back: {
      desc: 'Low-level curiosity — OS scheduling, compiler design, memory models, and the primitives that make higher-level software possible.',
      tags: ['OS', 'Compilers', 'C / Rust', 'Low-level'],
    },
    Front: SysFront,
    Back: SysBack,
  },
]

const ENTRY = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 110, damping: 14, delay: i * 0.08 },
  }),
}

function FlipCard({ card, index }) {
  const [flipped, setFlipped] = useState(false)
  const { Front, Back } = card

  return (
    <motion.div
      className="drives-card-wrap"
      custom={index}
      variants={ENTRY}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onFocus={() => setFlipped(true)}
      onBlur={() => setFlipped(false)}
      tabIndex={0}
    >
      <motion.div
        className="drives-card"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 180, damping: 22, mass: 0.9 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* FRONT */}
        <div className="drives-face drives-front">
          <div className="drives-illust drives-illust--front" aria-hidden>
            <Front />
          </div>
          <div className="drives-rim" />
          <div className="drives-head">
            <span className="drives-icon-wrap">
              <i className={`${card.icon}`} />
            </span>
            <span className="drives-label">Interest 0{index + 1}</span>
          </div>
          <h3 className="drives-title">{card.title}</h3>
          <p className="drives-tagline">{card.tagline}</p>
          <span className="drives-hint">
            <i className="ri-refresh-line" /> Hover to reveal
          </span>
        </div>

        {/* BACK */}
        <div className="drives-face drives-back">
          <div className="drives-illust drives-illust--back" aria-hidden>
            <Back />
          </div>
          <div className="drives-rim" />
          <span className="drives-label drives-label--back">{card.title}</span>
          <p className="drives-desc">{card.back.desc}</p>
          <div className="drives-tags">
            {card.back.tags.map((t) => (
              <span key={t} className="drives-tag">{t}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function WhatDrivesMe() {
  return (
    <section className="drives-section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Beyond Code</span>
          <h2>What Drives Me</h2>
          <p>The disciplines I keep coming back to — the ones that shape how I build.</p>
        </div>

        <motion.div
          className="drives-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px', amount: 0.15 }}
          style={{ perspective: 1600 }}
        >
          {DRIVERS.map((c, i) => (
            <FlipCard key={c.id} card={c} index={i} />
          ))}
        </motion.div>
      </div>

      <style>{`
        .drives-section {
          padding: 4rem 0;
          background: transparent;
          font-family: var(--font-body);
        }

        .drives-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(14px, 1.5vw, 20px);
          max-width: 1080px;
          margin: 0 auto;
        }

        .drives-card-wrap {
          position: relative;
          perspective: 1200px;
          aspect-ratio: 3 / 4;
          outline: none;
        }

        .drives-card {
          position: relative;
          width: 100%;
          height: 100%;
          will-change: transform;
        }

        .drives-face {
          position: absolute;
          inset: 0;
          padding: clamp(16px, 1.8vw, 22px);
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          box-shadow: var(--shadow-card);
          overflow: hidden;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          display: flex;
          flex-direction: column;
          color: var(--text-primary);
          font-family: var(--font-body);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .drives-card-wrap:hover .drives-face,
        .drives-card-wrap:focus-visible .drives-face {
          border-color: var(--accent);
          box-shadow: 0 18px 50px -24px var(--accent-glow),
                      0 10px 28px -12px rgba(0,0,0,0.38);
        }

        .drives-front::before,
        .drives-back::before {
          content: '';
          position: absolute;
          top: 0;
          left: clamp(16px, 1.8vw, 22px);
          width: clamp(36px, 4vw, 52px);
          height: 2px;
          background: var(--accent);
          opacity: 0.85;
          border-radius: 2px;
        }

        .drives-back {
          transform: rotateY(180deg);
        }

        .drives-rim {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          background: linear-gradient(135deg, rgba(255,255,255,0.04), transparent 55%);
        }

        [data-theme="light"] .drives-rim {
          background: linear-gradient(135deg, rgba(255,255,255,0.55), transparent 60%);
        }

        /* illustrations */
        .drives-illust {
          position: absolute;
          color: var(--accent);
          opacity: 0.22;
          pointer-events: none;
          transition: opacity 0.4s ease;
        }

        .drives-illust--front {
          right: -14px;
          bottom: -14px;
          width: clamp(130px, 14vw, 170px);
        }
        .drives-illust--back {
          right: -16px;
          top: -16px;
          width: clamp(140px, 15vw, 180px);
        }
        .drives-illust svg { width: 100%; height: auto; display: block; }

        .drives-card-wrap:hover .drives-illust { opacity: 0.35; }

        /* head (front) */
        .drives-head {
          position: relative;
          display: flex;
          align-items: center;
          gap: 9px;
          margin-bottom: auto;
        }

        .drives-icon-wrap {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border-radius: 9px;
          background: var(--accent-glow);
          border: 1px solid var(--border);
          color: var(--accent);
          flex-shrink: 0;
          font-size: 1rem;
        }

        .drives-label {
          position: relative;
          font-family: var(--font-mono);
          font-size: 0.66rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--text-secondary);
          font-weight: 600;
        }

        .drives-label--back {
          display: block;
          margin-bottom: 0.6rem;
          color: var(--accent);
        }

        .drives-title {
          position: relative;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(1.1rem, 1.4vw, 1.3rem);
          line-height: 1.15;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          margin: 0 0 0.45rem;
        }

        .drives-tagline {
          position: relative;
          font-family: var(--font-body);
          font-size: 0.88rem;
          line-height: 1.5;
          color: var(--text-secondary);
          margin: 0;
        }

        .drives-hint {
          position: relative;
          margin-top: 0.9rem;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--accent);
          opacity: 0.75;
        }
        .drives-hint i { font-size: 0.75rem; }

        /* back */
        .drives-desc {
          position: relative;
          font-family: var(--font-body);
          font-size: 0.85rem;
          line-height: 1.55;
          color: var(--text-secondary);
          margin: 0 0 auto;
        }

        .drives-tags {
          position: relative;
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 0.85rem;
        }

        .drives-tag {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--accent);
          background: var(--accent-glow);
          padding: 4px 9px;
          border: 1px solid var(--border);
          border-radius: 999px;
        }

        @media (max-width: 900px) {
          .drives-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 520px) {
          .drives-grid { grid-template-columns: 1fr; }
          .drives-card-wrap { aspect-ratio: 4 / 3; }
        }
      `}</style>
    </section>
  )
}
