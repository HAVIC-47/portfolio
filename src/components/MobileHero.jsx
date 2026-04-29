import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const roles = [
  { label: 'Full-Stack Developer', icon: 'ri-code-s-slash-line' },
  { label: 'AI / ML Engineer', icon: 'ri-brain-line' },
  { label: 'UI / UX Designer', icon: 'ri-palette-line' },
  { label: 'Problem Solver', icon: 'ri-lightbulb-flash-line' },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function MobileHero() {
  const [roleIdx, setRoleIdx] = useState(0)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const id = setInterval(() => setRoleIdx((i) => (i + 1) % roles.length), 2400)
    return () => clearInterval(id)
  }, [])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('faisaladobe666@gmail.com')
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {}
  }

  return (
    <section id="home" className="m-hero">
      <div className="m-hero-orb" aria-hidden />

      <motion.div
        className="m-hero-inner"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.span variants={itemVariants} className="m-hero-status" role="status" aria-live="polite">
          <span className="m-hero-status-dot" />
          <span>Available for work · 2026</span>
        </motion.span>

        <motion.h1 variants={itemVariants} className="m-hero-name">
          <span className="m-hero-name-line">Faisal</span>
          <span className="m-hero-name-line">
            <span className="accent-text">Hossain</span>
            <span className="m-hero-period">.</span>
          </span>
        </motion.h1>

        <motion.div variants={itemVariants} className="m-hero-role" aria-live="polite">
          <span className="m-hero-role-prefix">I'm a</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={roleIdx}
              className="m-hero-role-chip"
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <i className={roles[roleIdx].icon} />
              <span>{roles[roleIdx].label}</span>
            </motion.span>
          </AnimatePresence>
        </motion.div>

        <motion.p variants={itemVariants} className="m-hero-desc">
          A <strong>Python full-stack developer</strong> turning curious ideas into AI tools, clean web apps, and delightful interfaces.
        </motion.p>

        <motion.div variants={itemVariants} className="m-hero-meta">
          <span><i className="ri-map-pin-2-line" /> Dhaka, BD</span>
          <span className="m-hero-sep" aria-hidden />
          <span><i className="ri-graduation-cap-line" /> CSE · UAP</span>
        </motion.div>

        <motion.div variants={itemVariants} className="m-hero-divider" aria-hidden />

        <motion.div variants={itemVariants} className="m-hero-ctas">
          <a href="#projects" className="m-hero-cta m-hero-cta--primary">
            <span>View my work</span>
            <i className="ri-arrow-right-up-line" />
          </a>
          <a href="#contact" className="m-hero-cta m-hero-cta--ghost">
            <span>Say hi</span>
          </a>
        </motion.div>

        <motion.button variants={itemVariants} type="button" className="m-hero-email" onClick={copyEmail}>
          <i className={copied ? 'ri-check-line' : 'ri-at-line'} />
          <span>{copied ? 'Copied!' : 'faisaladobe666@gmail.com'}</span>
          <i className={`m-hero-email-cue ${copied ? 'ri-check-line' : 'ri-file-copy-line'}`} aria-hidden />
        </motion.button>

        <motion.div variants={itemVariants} className="m-hero-socials">
          <a href="https://github.com/HAVIC-47" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i className="ri-github-fill" /></a>
          <a href="https://www.facebook.com/HAVIC47" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="ri-facebook-fill" /></a>
          <a href="https://www.instagram.com/visuals_of_faisal" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="ri-instagram-line" /></a>
          <a href="https://discord.gg/pgakM24PEs" target="_blank" rel="noopener noreferrer" aria-label="Discord"><i className="ri-discord-fill" /></a>
        </motion.div>
      </motion.div>

      <style>{`
        .m-hero {
          position: relative;
          min-height: 100svh;
          padding: 5.5rem 1.25rem 3.5rem;
          display: flex;
          align-items: center;
          z-index: 1;
          overflow: hidden;
        }
        .m-hero-orb {
          position: absolute;
          top: 14%;
          right: -22%;
          width: 360px;
          height: 360px;
          background: radial-gradient(circle, var(--accent-glow) 0%, transparent 65%);
          opacity: 0.85;
          pointer-events: none;
          z-index: 0;
          transform: translateZ(0);
        }
        .m-hero-inner {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 520px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        /* Status pill */
        .m-hero-status {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          align-self: flex-start;
          padding: 0.4rem 0.75rem 0.4rem 0.6rem;
          border: 1px solid var(--border);
          border-radius: 999px;
          background: var(--bg-card);
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-secondary);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.04);
        }
        .m-hero-status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 0 0 rgba(34,197,94,0.55);
          animation: m-hero-pulse 2.4s ease-in-out infinite;
        }
        @keyframes m-hero-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.55); }
          50% { box-shadow: 0 0 0 6px rgba(34,197,94,0); }
        }

        /* Name */
        .m-hero-name {
          font-family: var(--font-display);
          font-size: clamp(2.8rem, 12vw, 3.6rem);
          font-weight: 700;
          line-height: 0.95;
          letter-spacing: -0.045em;
          color: var(--text-primary);
          margin-top: 0.6rem;
        }
        .m-hero-name-line {
          display: block;
        }
        .m-hero-period {
          color: var(--accent);
        }

        /* Role chip */
        .m-hero-role {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          flex-wrap: wrap;
          font-size: 0.95rem;
          margin-top: 0.4rem;
        }
        .m-hero-role-prefix {
          color: var(--text-muted);
        }
        .m-hero-role-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.45rem 0.85rem;
          border: 1px solid var(--border);
          border-radius: 999px;
          background: var(--bg-card);
          color: var(--text-primary);
          font-family: var(--font-display);
          font-weight: 500;
          font-size: 0.92rem;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.06);
        }
        .m-hero-role-chip i {
          color: var(--accent);
          font-size: 1rem;
        }

        /* Description */
        .m-hero-desc {
          font-family: var(--font-body);
          font-size: 0.98rem;
          line-height: 1.6;
          color: var(--text-secondary);
          max-width: 32ch;
          margin-top: 0.6rem;
        }
        .m-hero-desc strong {
          color: var(--text-primary);
          font-weight: 600;
        }

        /* Meta */
        .m-hero-meta {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          flex-wrap: wrap;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-top: 0.4rem;
        }
        .m-hero-meta i {
          margin-right: 0.3rem;
          color: var(--accent);
          font-size: 0.85rem;
        }
        .m-hero-sep {
          width: 3px;
          height: 3px;
          background: var(--border-hover);
          border-radius: 50%;
        }

        /* Divider */
        .m-hero-divider {
          height: 1px;
          background: var(--border);
          margin: 0.8rem 0 0.4rem;
        }

        /* CTAs */
        .m-hero-ctas {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .m-hero-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: 100%;
          min-height: 48px;
          padding: 0 1.1rem;
          border-radius: 12px;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 0.95rem;
          letter-spacing: -0.005em;
          transition: transform 180ms ease, background 180ms ease, border-color 180ms ease, color 180ms ease, box-shadow 180ms ease;
          will-change: transform;
        }
        .m-hero-cta--primary {
          background: var(--accent);
          color: var(--text-on-accent);
          border: 1px solid var(--accent);
          box-shadow: 0 6px 18px -8px var(--accent);
        }
        .m-hero-cta--primary i {
          transition: transform 220ms cubic-bezier(0.22,1,0.36,1);
        }
        .m-hero-cta--primary:active {
          transform: scale(0.98);
        }
        .m-hero-cta--primary:active i {
          transform: translate(3px, -3px);
        }
        .m-hero-cta--ghost {
          background: transparent;
          color: var(--text-primary);
          border: 1px solid var(--border);
        }
        .m-hero-cta--ghost:active {
          background: var(--bg-card);
          transform: scale(0.98);
        }

        /* Email */
        .m-hero-email {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 0.65rem 0.9rem;
          color: var(--text-secondary);
          font-family: var(--font-mono);
          font-size: 0.78rem;
          cursor: pointer;
          align-self: flex-start;
          transition: all var(--transition);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.04);
        }
        .m-hero-email:active {
          border-color: var(--accent);
          color: var(--accent);
        }
        .m-hero-email > i:first-child {
          color: var(--accent);
          font-size: 0.95rem;
        }
        .m-hero-email-cue {
          margin-left: 0.25rem;
          opacity: 0.5;
          font-size: 0.85rem;
        }

        /* Socials */
        .m-hero-socials {
          display: flex;
          gap: 0.6rem;
          margin-top: 0.2rem;
        }
        .m-hero-socials a {
          width: 44px;
          height: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border);
          border-radius: 12px;
          background: var(--bg-card);
          color: var(--text-secondary);
          font-size: 1.15rem;
          transition: all var(--transition);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.04);
        }
        .m-hero-socials a:active {
          border-color: var(--accent);
          color: var(--accent);
          transform: scale(0.96);
        }

        /* Light backgrounds — soften inset highlight, brighten orb */
        :is([data-theme="day"], [data-theme="desert"]) .m-hero-status,
        :is([data-theme="day"], [data-theme="desert"]) .m-hero-role-chip,
        :is([data-theme="day"], [data-theme="desert"]) .m-hero-email,
        :is([data-theme="day"], [data-theme="desert"]) .m-hero-socials a {
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.55);
        }

        @media (prefers-reduced-motion: reduce) {
          .m-hero-status-dot { animation: none; }
          .m-hero-cta--primary i { transition: none; }
        }
      `}</style>
    </section>
  )
}
