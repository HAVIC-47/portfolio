import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { skillCategories, TechGlobe } from './SkillsShowcase'

const COLLAPSED_LIMIT = 6

export default function MobileSkills() {
  const [expandedIdx, setExpandedIdx] = useState(null)

  const toggle = (idx) => setExpandedIdx((cur) => (cur === idx ? null : idx))

  return (
    <section id="skills" className="m-skills">
      <div className="m-skills-head">
        <span className="m-skills-overline">Skills · Stack</span>
        <h2 className="m-skills-title">
          What I <span className="accent-text">work with</span>
        </h2>
        <p className="m-skills-sub">A curated stack — languages, frameworks, tools, and the fundamentals underneath.</p>
      </div>

      <div className="m-skills-globe">
        <TechGlobe />
      </div>

      <ul className="m-skills-list">
        {skillCategories.map((cat, idx) => {
          const overflow = cat.items.length > COLLAPSED_LIMIT
          const isExpanded = !overflow || expandedIdx === idx
          const visible = isExpanded ? cat.items : cat.items.slice(0, COLLAPSED_LIMIT)
          const hidden = cat.items.length - COLLAPSED_LIMIT

          return (
            <li key={cat.title}>
              <motion.div
                className="m-skill-card"
                whileTap={overflow ? { scale: 0.99 } : undefined}
                onClick={() => overflow && toggle(idx)}
                role={overflow ? 'button' : undefined}
                tabIndex={overflow ? 0 : undefined}
                aria-expanded={overflow ? isExpanded : undefined}
                onKeyDown={(e) => {
                  if (overflow && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault()
                    toggle(idx)
                  }
                }}
              >
                <div className="m-skill-head">
                  <div className="m-skill-icon">
                    <i className={cat.icon} />
                  </div>
                  <div className="m-skill-title-wrap">
                    <h3 className="m-skill-title">{cat.title}</h3>
                    <span className="m-skill-count">{cat.items.length} items</span>
                  </div>
                  {overflow && (
                    <motion.i
                      className="ri-arrow-down-s-line m-skill-chev"
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      aria-hidden
                    />
                  )}
                </div>

                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    key={isExpanded ? 'open' : 'closed'}
                    className="m-skill-chips"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {visible.map((item) => (
                      <span key={item} className="m-skill-chip">{item}</span>
                    ))}
                    {overflow && !isExpanded && (
                      <span className="m-skill-chip m-skill-chip--more">+{hidden} more</span>
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </li>
          )
        })}
      </ul>

      <style>{`
        .m-skills {
          padding: 4rem 1.25rem 5rem;
          position: relative;
          z-index: 1;
        }
        .m-skills-head {
          max-width: 520px;
          margin: 0 auto 1.6rem;
        }
        .m-skills-overline {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--accent);
        }
        .m-skills-title {
          font-family: var(--font-display);
          font-size: clamp(1.9rem, 7vw, 2.4rem);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.03em;
          margin-top: 0.5rem;
          color: var(--text-primary);
        }
        .m-skills-sub {
          margin-top: 0.65rem;
          color: var(--text-secondary);
          font-size: 0.92rem;
          line-height: 1.55;
          max-width: 36ch;
        }
        .m-skills-globe {
          max-width: 520px;
          margin: 0.5rem auto 1.4rem;
        }
        .m-skills-globe .tg-wrap {
          margin: 0 auto;
          padding: 0;
        }

        .m-skills-list {
          max-width: 520px;
          margin: 0 auto;
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .m-skill-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 1rem 1.1rem 1.05rem;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.04), var(--shadow-card);
          cursor: default;
          transition: border-color 200ms ease, transform 120ms ease;
        }
        .m-skill-card[role='button'] {
          cursor: pointer;
        }
        .m-skill-card[role='button']:active {
          border-color: var(--border-hover);
        }

        .m-skill-head {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .m-skill-icon {
          width: 36px;
          height: 36px;
          flex: 0 0 36px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          background: var(--accent-glow);
          color: var(--accent);
          font-size: 1.05rem;
          border: 1px solid var(--border);
        }
        .m-skill-title-wrap {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
        }
        .m-skill-title {
          font-family: var(--font-display);
          font-size: 1.05rem;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: var(--text-primary);
          line-height: 1.2;
        }
        .m-skill-count {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-muted);
        }
        .m-skill-chev {
          color: var(--text-muted);
          font-size: 1.25rem;
          flex: 0 0 auto;
        }

        .m-skill-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-top: 0.85rem;
        }
        .m-skill-chip {
          display: inline-flex;
          align-items: center;
          padding: 0.42rem 0.75rem;
          min-height: 32px;
          border: 1px solid var(--border);
          border-radius: 999px;
          background: transparent;
          color: var(--text-secondary);
          font-family: var(--font-body);
          font-weight: 500;
          font-size: 0.84rem;
          letter-spacing: -0.005em;
          transition: border-color 180ms ease, color 180ms ease, background 180ms ease;
        }
        .m-skill-chip--more {
          background: var(--accent-glow);
          border-color: var(--accent);
          color: var(--accent);
          font-family: var(--font-mono);
          font-size: 0.78rem;
          letter-spacing: 0.04em;
        }

        :is([data-theme="day"], [data-theme="desert"]) .m-skill-card {
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.55), var(--shadow-card);
        }
      `}</style>
    </section>
  )
}
