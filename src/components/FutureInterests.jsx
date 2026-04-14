import { useState } from 'react'
import { motion } from 'motion/react'

/*
 * "Future Focus" — 3 flip cards for AI Automation, AI Agents, SQA.
 * Minimal SVG illustrations, site palette (warm tan accent), native
 * site fonts. Hover flips card on Y to reveal extended detail.
 */

/* ─────────── Minimal illustrations ─────────── */

/* AI Automation — workflow nodes + gear */
const AutomationFront = () => (
  <svg viewBox="0 0 120 120" fill="none" aria-hidden>
    <rect x="14" y="50" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.4" opacity="0.7" />
    <rect x="50" y="30" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.4" opacity="0.7" />
    <rect x="50" y="70" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.4" opacity="0.7" />
    <rect x="86" y="50" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.4" opacity="0.9" fill="currentColor" fillOpacity="0.18" />
    <line x1="34" y1="60" x2="50" y2="40" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 3" opacity="0.55" />
    <line x1="34" y1="60" x2="50" y2="80" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 3" opacity="0.55" />
    <line x1="70" y1="40" x2="86" y2="60" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 3" opacity="0.55" />
    <line x1="70" y1="80" x2="86" y2="60" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 3" opacity="0.55" />
    <circle cx="24" cy="60" r="2" fill="currentColor" opacity="0.9" />
    <circle cx="60" cy="40" r="2" fill="currentColor" opacity="0.8" />
    <circle cx="60" cy="80" r="2" fill="currentColor" opacity="0.8" />
    <circle cx="96" cy="60" r="2.4" fill="currentColor" />
  </svg>
)
const AutomationBack = () => (
  <svg viewBox="0 0 120 120" fill="none" aria-hidden>
    {/* gear */}
    <g transform="translate(60 60)">
      {Array.from({ length: 8 }).map((_, i) => (
        <rect key={i} x="-4" y="-34" width="8" height="10" fill="currentColor" opacity="0.6" transform={`rotate(${i * 45})`} />
      ))}
      <circle r="22" stroke="currentColor" strokeWidth="1.6" fill="currentColor" fillOpacity="0.15" opacity="0.8" />
      <circle r="8" fill="currentColor" opacity="0.9" />
    </g>
    <path d="M14 100L22 92M98 22L106 14" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
  </svg>
)

/* AI Agents — orbiting bots */
const AgentsFront = () => (
  <svg viewBox="0 0 120 120" fill="none" aria-hidden>
    <circle cx="60" cy="60" r="40" stroke="currentColor" strokeWidth="1" strokeDasharray="3 5" opacity="0.4" />
    <circle cx="60" cy="60" r="26" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" opacity="0.55" />
    {/* center bot head */}
    <rect x="48" y="50" width="24" height="20" rx="5" stroke="currentColor" strokeWidth="1.4" fill="currentColor" fillOpacity="0.18" />
    <circle cx="55" cy="60" r="2" fill="currentColor" />
    <circle cx="65" cy="60" r="2" fill="currentColor" />
    <line x1="60" y1="42" x2="60" y2="50" stroke="currentColor" strokeWidth="1.4" opacity="0.7" />
    <circle cx="60" cy="40" r="2" fill="currentColor" opacity="0.85" />
    {/* orbit dots */}
    <circle cx="100" cy="60" r="3" fill="currentColor" opacity="0.8" />
    <circle cx="20" cy="60" r="3" fill="currentColor" opacity="0.7" />
    <circle cx="60" cy="20" r="2.6" fill="currentColor" opacity="0.6" />
    <circle cx="60" cy="100" r="2.6" fill="currentColor" opacity="0.6" />
  </svg>
)
const AgentsBack = () => (
  <svg viewBox="0 0 120 120" fill="none" aria-hidden>
    {/* task tree */}
    <rect x="46" y="14" width="28" height="16" rx="3" stroke="currentColor" strokeWidth="1.3" fill="currentColor" fillOpacity="0.18" />
    <rect x="16" y="54" width="28" height="16" rx="3" stroke="currentColor" strokeWidth="1.3" opacity="0.75" />
    <rect x="46" y="54" width="28" height="16" rx="3" stroke="currentColor" strokeWidth="1.3" opacity="0.75" />
    <rect x="76" y="54" width="28" height="16" rx="3" stroke="currentColor" strokeWidth="1.3" opacity="0.75" />
    <rect x="46" y="94" width="28" height="16" rx="3" stroke="currentColor" strokeWidth="1.3" opacity="0.6" />
    <path d="M60 30L60 42M60 42L30 54M60 42L60 54M60 42L90 54M60 70L60 94" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 3" opacity="0.55" fill="none" />
    <circle cx="60" cy="42" r="2" fill="currentColor" opacity="0.8" />
  </svg>
)

/* SQA — checklist + magnifier */
const SQAFront = () => (
  <svg viewBox="0 0 120 120" fill="none" aria-hidden>
    <rect x="22" y="18" width="64" height="84" rx="6" stroke="currentColor" strokeWidth="1.4" opacity="0.65" />
    {/* header line */}
    <line x1="30" y1="30" x2="60" y2="30" stroke="currentColor" strokeWidth="1.6" opacity="0.55" />
    {/* checklist items */}
    {[44, 58, 72, 86].map((y, i) => (
      <g key={i}>
        <rect x="30" y={y - 4} width="8" height="8" rx="1.6" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
        {i < 3 && <path d={`M31.5 ${y - 0.5}L34 ${y + 2}L37 ${y - 3}`} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />}
        <line x1="42" y1={y} x2={70 - i * 4} y2={y} stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      </g>
    ))}
    {/* magnifier */}
    <circle cx="88" cy="90" r="12" stroke="currentColor" strokeWidth="1.6" fill="currentColor" fillOpacity="0.15" />
    <line x1="97" y1="99" x2="106" y2="108" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
)
const SQABack = () => (
  <svg viewBox="0 0 120 120" fill="none" aria-hidden>
    {/* bug */}
    <ellipse cx="60" cy="66" rx="18" ry="22" stroke="currentColor" strokeWidth="1.4" fill="currentColor" fillOpacity="0.18" />
    <line x1="60" y1="44" x2="60" y2="66" stroke="currentColor" strokeWidth="1" opacity="0.6" />
    <circle cx="52" cy="58" r="1.6" fill="currentColor" />
    <circle cx="68" cy="58" r="1.6" fill="currentColor" />
    {/* antennae */}
    <path d="M52 44L46 34M68 44L74 34" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
    {/* legs */}
    <path d="M42 60L30 56M42 68L28 68M42 76L30 82M78 60L90 56M78 68L92 68M78 76L90 82" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.65" />
    {/* scanner arc */}
    <path d="M14 98 C 40 80, 80 80, 106 98" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.5" fill="none" />
  </svg>
)

/* ─────────── Cards ─────────── */

const FUTURE = [
  {
    id: 'automation',
    title: 'AI Automation',
    icon: 'ri-flow-chart',
    tagline: 'Workflows that run themselves.',
    back: {
      desc: 'Designing pipelines where AI orchestrates repetitive work — connecting tools, data, and decisions into reliable automated flows.',
      tags: ['Workflows', 'Pipelines', 'Tooling', 'LLM Ops'],
    },
    Front: AutomationFront,
    Back: AutomationBack,
  },
  {
    id: 'agents',
    title: 'AI Agents',
    icon: 'ri-robot-2-line',
    tagline: 'Autonomous, task-aware software.',
    back: {
      desc: 'Exploring agentic systems that plan, reason, and call tools — building copilots and multi-step assistants that handle real workloads.',
      tags: ['Planning', 'Tool Use', 'Multi-agent', 'RAG'],
    },
    Front: AgentsFront,
    Back: AgentsBack,
  },
  {
    id: 'sqa',
    title: 'Software Quality Assurance',
    icon: 'ri-shield-check-line',
    tagline: 'Shipping software that actually works.',
    back: {
      desc: 'Deepening expertise in test strategy, regression coverage, and quality processes — catching issues early and raising the bar on releases.',
      tags: ['Manual', 'Automation', 'Regression', 'QA Process'],
    },
    Front: SQAFront,
    Back: SQABack,
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
      className="fut-card-wrap"
      custom={index}
      variants={ENTRY}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onFocus={() => setFlipped(true)}
      onBlur={() => setFlipped(false)}
      tabIndex={0}
    >
      <motion.div
        className="fut-card"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 180, damping: 22, mass: 0.9 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* FRONT */}
        <div className="fut-face fut-front">
          <div className="fut-illust fut-illust--front" aria-hidden>
            <Front />
          </div>
          <div className="fut-rim" />
          <div className="fut-head">
            <span className="fut-icon-wrap">
              <i className={card.icon} />
            </span>
            <span className="fut-label">Focus 0{index + 1}</span>
          </div>
          <h3 className="fut-title">{card.title}</h3>
          <p className="fut-tagline">{card.tagline}</p>
          <span className="fut-hint">
            <i className="ri-refresh-line" /> Hover to reveal
          </span>
        </div>

        {/* BACK */}
        <div className="fut-face fut-back">
          <div className="fut-illust fut-illust--back" aria-hidden>
            <Back />
          </div>
          <div className="fut-rim" />
          <span className="fut-label fut-label--back">{card.title}</span>
          <p className="fut-desc">{card.back.desc}</p>
          <div className="fut-tags">
            {card.back.tags.map((t) => (
              <span key={t} className="fut-tag">{t}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function FutureInterests() {
  return (
    <section className="fut-section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Looking Ahead</span>
          <h2>Future Focus</h2>
          <p>The areas I'm actively investing in — where I want my work to grow next.</p>
        </div>

        <motion.div
          className="fut-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px', amount: 0.15 }}
          style={{ perspective: 1600 }}
        >
          {FUTURE.map((c, i) => (
            <FlipCard key={c.id} card={c} index={i} />
          ))}
        </motion.div>
      </div>

      <style>{`
        .fut-section {
          padding: 4rem 0;
          background: transparent;
          font-family: var(--font-body);
        }

        .fut-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(14px, 1.5vw, 20px);
          max-width: 960px;
          margin: 0 auto;
        }

        .fut-card-wrap {
          position: relative;
          perspective: 1200px;
          aspect-ratio: 3 / 4;
          outline: none;
        }

        .fut-card {
          position: relative;
          width: 100%;
          height: 100%;
          will-change: transform;
        }

        .fut-face {
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

        .fut-card-wrap:hover .fut-face,
        .fut-card-wrap:focus-visible .fut-face {
          border-color: var(--accent);
          box-shadow: 0 18px 50px -24px var(--accent-glow),
                      0 10px 28px -12px rgba(0,0,0,0.38);
        }

        .fut-front::before,
        .fut-back::before {
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

        .fut-back { transform: rotateY(180deg); }

        .fut-rim {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          background: linear-gradient(135deg, rgba(255,255,255,0.04), transparent 55%);
        }

        [data-theme="light"] .fut-rim {
          background: linear-gradient(135deg, rgba(255,255,255,0.55), transparent 60%);
        }

        .fut-illust {
          position: absolute;
          color: var(--accent);
          opacity: 0.22;
          pointer-events: none;
          transition: opacity 0.4s ease;
        }
        .fut-illust--front {
          right: -14px;
          bottom: -14px;
          width: clamp(130px, 14vw, 170px);
        }
        .fut-illust--back {
          right: -16px;
          top: -16px;
          width: clamp(140px, 15vw, 180px);
        }
        .fut-illust svg { width: 100%; height: auto; display: block; }
        .fut-card-wrap:hover .fut-illust { opacity: 0.35; }

        .fut-head {
          position: relative;
          display: flex;
          align-items: center;
          gap: 9px;
          margin-bottom: auto;
        }

        .fut-icon-wrap {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border-radius: 9px;
          background: var(--accent-glow);
          border: 1px solid var(--border);
          color: var(--accent);
          font-size: 1rem;
          flex-shrink: 0;
        }

        .fut-label {
          position: relative;
          font-family: var(--font-mono);
          font-size: 0.66rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--text-secondary);
          font-weight: 600;
        }

        .fut-label--back {
          display: block;
          margin-bottom: 0.6rem;
          color: var(--accent);
        }

        .fut-title {
          position: relative;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(1.1rem, 1.4vw, 1.3rem);
          line-height: 1.15;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          margin: 0 0 0.45rem;
        }

        .fut-tagline {
          position: relative;
          font-family: var(--font-body);
          font-size: 0.88rem;
          line-height: 1.5;
          color: var(--text-secondary);
          margin: 0;
        }

        .fut-hint {
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
        .fut-hint i { font-size: 0.75rem; }

        .fut-desc {
          position: relative;
          font-family: var(--font-body);
          font-size: 0.85rem;
          line-height: 1.55;
          color: var(--text-secondary);
          margin: 0 0 auto;
        }

        .fut-tags {
          position: relative;
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 0.85rem;
        }

        .fut-tag {
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

        @media (max-width: 820px) {
          .fut-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 520px) {
          .fut-grid { grid-template-columns: 1fr; }
          .fut-card-wrap { aspect-ratio: 4 / 3; }
        }
      `}</style>
    </section>
  )
}
