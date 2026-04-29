import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const roles = [
  { label: 'Full-Stack Developer', icon: 'ri-code-s-slash-line' },
  { label: 'AI / ML Engineer', icon: 'ri-brain-line' },
  { label: 'UI / UX Designer', icon: 'ri-palette-line' },
  { label: 'Problem Solver', icon: 'ri-lightbulb-flash-line' },
]

const stats = [
  { value: '4+', label: 'Years' },
  { value: '9', label: 'Projects' },
  { value: 'CSE', label: 'UAP' },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
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
    <section id="home" className="m2-hero">
      {/* Backdrop mesh */}
      <div className="m2-mesh" aria-hidden>
        <div className="m2-mesh-blob m2-mesh-blob--a" />
        <div className="m2-mesh-blob m2-mesh-blob--b" />
        <div className="m2-mesh-grid" />
      </div>

      <motion.div
        className="m2-inner"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Avatar + status */}
        <motion.div variants={itemVariants} className="m2-avatar-row">
          <div className="m2-avatar">
            <div className="m2-avatar-ring" aria-hidden />
            <img
              src="https://avatars.githubusercontent.com/u/123256888?v=4"
              alt="Faisal Hossain"
              loading="eager"
            />
          </div>
          <span className="m2-status">
            <span className="m2-status-dot" />
            <span>Available · 2026</span>
          </span>
        </motion.div>

        {/* Greeting + Name */}
        <motion.p variants={itemVariants} className="m2-greet">Hey, I'm</motion.p>
        <motion.h1 variants={itemVariants} className="m2-name">
          Faisal <span className="accent-text">Hossain</span>
          <span className="m2-name-dot">.</span>
        </motion.h1>

        {/* Role rotator */}
        <motion.div variants={itemVariants} className="m2-role" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.span
              key={roleIdx}
              className="m2-role-chip"
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

        {/* Tagline */}
        <motion.p variants={itemVariants} className="m2-tagline">
          Building thoughtful products with <strong>Python</strong>, AI, and a love for clean interfaces — from Dhaka, Bangladesh.
        </motion.p>

        {/* Bento stat row */}
        <motion.div variants={itemVariants} className="m2-stats">
          {stats.map((s) => (
            <div key={s.label} className="m2-stat">
              <span className="m2-stat-value">{s.value}</span>
              <span className="m2-stat-label">{s.label}</span>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div variants={itemVariants} className="m2-ctas">
          <a href="#projects" className="m2-cta m2-cta--primary">
            <span>View my work</span>
            <i className="ri-arrow-right-up-line" />
          </a>
          <a href="#contact" className="m2-cta m2-cta--ghost">
            <i className="ri-chat-3-line" />
            <span>Get in touch</span>
          </a>
        </motion.div>

        {/* Email pill */}
        <motion.button variants={itemVariants} type="button" className="m2-email" onClick={copyEmail}>
          <i className={copied ? 'ri-check-line' : 'ri-mail-line'} />
          <span>{copied ? 'Copied to clipboard' : 'faisaladobe666@gmail.com'}</span>
          <i className={copied ? 'ri-check-line' : 'ri-file-copy-line'} aria-hidden />
        </motion.button>

        {/* Socials */}
        <motion.div variants={itemVariants} className="m2-socials">
          <a href="https://github.com/HAVIC-47" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i className="ri-github-fill" /></a>
          <a href="https://www.facebook.com/HAVIC47" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="ri-facebook-fill" /></a>
          <a href="https://www.instagram.com/visuals_of_faisal" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="ri-instagram-line" /></a>
          <a href="https://discord.gg/pgakM24PEs" target="_blank" rel="noopener noreferrer" aria-label="Discord"><i className="ri-discord-fill" /></a>
        </motion.div>

        {/* Scroll cue */}
        <motion.a variants={itemVariants} href="#about" className="m2-scroll" aria-label="Scroll to about">
          <span>scroll</span>
          <motion.i
            className="ri-arrow-down-line"
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.a>
      </motion.div>

      <style>{`
        .m2-hero {
          position: relative;
          min-height: 100svh;
          padding: 5.5rem 1.25rem 3.5rem;
          overflow: hidden;
          z-index: 1;
        }

        /* Backdrop */
        .m2-mesh {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
        }
        .m2-mesh-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(64px);
          opacity: 0.55;
        }
        .m2-mesh-blob--a {
          top: -10%;
          right: -25%;
          width: 380px;
          height: 380px;
          background: radial-gradient(circle, var(--accent-glow) 0%, transparent 70%);
        }
        .m2-mesh-blob--b {
          bottom: 8%;
          left: -30%;
          width: 320px;
          height: 320px;
          background: radial-gradient(circle, var(--accent-glow) 0%, transparent 70%);
          opacity: 0.4;
        }
        .m2-mesh-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px);
          background-size: 36px 36px;
          opacity: 0.18;
          mask-image: radial-gradient(ellipse 70% 60% at 50% 30%, black 30%, transparent 80%);
          -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 30%, black 30%, transparent 80%);
        }

        /* Inner */
        .m2-inner {
          position: relative;
          z-index: 1;
          max-width: 520px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
        }

        /* Avatar row */
        .m2-avatar-row {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          margin-bottom: 1.4rem;
        }
        .m2-avatar {
          position: relative;
          width: 72px;
          height: 72px;
          flex: 0 0 72px;
        }
        .m2-avatar-ring {
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          background: conic-gradient(from 0deg, var(--accent), transparent 50%, var(--accent));
          opacity: 0.7;
          animation: m2RingSpin 8s linear infinite;
        }
        @keyframes m2RingSpin {
          to { transform: rotate(360deg); }
        }
        .m2-avatar img {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid var(--bg-primary);
          box-shadow: 0 8px 28px rgba(0,0,0,0.35), 0 0 0 1px var(--border);
        }

        .m2-status {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 0.75rem 0.4rem 0.6rem;
          border: 1px solid var(--border);
          border-radius: 999px;
          background: var(--bg-card);
          font-family: var(--font-mono);
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-secondary);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.04);
        }
        .m2-status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #22c55e;
          animation: m2Pulse 2.4s ease-in-out infinite;
        }
        @keyframes m2Pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.55); }
          50% { box-shadow: 0 0 0 6px rgba(34,197,94,0); }
        }

        /* Greeting + Name */
        .m2-greet {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 0.4rem;
        }
        .m2-name {
          font-family: var(--font-display);
          font-size: clamp(2.6rem, 11vw, 3.4rem);
          font-weight: 700;
          line-height: 0.98;
          letter-spacing: -0.045em;
          color: var(--text-primary);
        }
        .m2-name-dot {
          color: var(--accent);
        }

        /* Role chip */
        .m2-role {
          margin-top: 1rem;
        }
        .m2-role-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0.95rem;
          border: 1px solid var(--border);
          border-radius: 999px;
          background: var(--bg-card);
          color: var(--text-primary);
          font-family: var(--font-display);
          font-weight: 500;
          font-size: 0.92rem;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.06);
        }
        .m2-role-chip i {
          color: var(--accent);
          font-size: 1.05rem;
        }

        /* Tagline */
        .m2-tagline {
          margin-top: 1.1rem;
          font-family: var(--font-body);
          font-size: 1rem;
          line-height: 1.6;
          color: var(--text-secondary);
          max-width: 34ch;
        }
        .m2-tagline strong {
          color: var(--text-primary);
          font-weight: 600;
        }

        /* Bento stat row */
        .m2-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.6rem;
          margin-top: 1.6rem;
        }
        .m2-stat {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 0.85rem 0.95rem;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 14px;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.04);
        }
        .m2-stat-value {
          font-family: var(--font-display);
          font-size: 1.35rem;
          font-weight: 700;
          line-height: 1;
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }
        .m2-stat-label {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-top: 0.35rem;
        }

        /* CTAs */
        .m2-ctas {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          margin-top: 1.6rem;
        }
        .m2-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.55rem;
          width: 100%;
          min-height: 50px;
          padding: 0 1.1rem;
          border-radius: 14px;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 0.98rem;
          letter-spacing: -0.005em;
          transition: transform 180ms ease, background 180ms ease, border-color 180ms ease, color 180ms ease, box-shadow 180ms ease;
          will-change: transform;
        }
        .m2-cta--primary {
          background: var(--accent);
          color: var(--text-on-accent);
          border: 1px solid var(--accent);
          box-shadow: 0 8px 24px -10px var(--accent), inset 0 1px 0 rgba(255,255,255,0.18);
        }
        .m2-cta--primary i {
          transition: transform 220ms cubic-bezier(0.22,1,0.36,1);
        }
        .m2-cta--primary:active {
          transform: scale(0.98);
        }
        .m2-cta--primary:active i {
          transform: translate(3px, -3px);
        }
        .m2-cta--ghost {
          background: var(--bg-card);
          color: var(--text-primary);
          border: 1px solid var(--border);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.04);
        }
        .m2-cta--ghost i {
          color: var(--accent);
          font-size: 1.05rem;
        }
        .m2-cta--ghost:active {
          border-color: var(--accent);
          transform: scale(0.98);
        }

        /* Email */
        .m2-email {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          margin-top: 1rem;
          padding: 0.7rem 0.95rem;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 12px;
          color: var(--text-secondary);
          font-family: var(--font-mono);
          font-size: 0.78rem;
          cursor: pointer;
          align-self: flex-start;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.04);
          transition: all var(--transition);
        }
        .m2-email > i:first-child {
          color: var(--accent);
          font-size: 0.95rem;
        }
        .m2-email > i:last-child {
          margin-left: 0.25rem;
          opacity: 0.5;
        }
        .m2-email:active {
          border-color: var(--accent);
          color: var(--accent);
        }

        /* Socials */
        .m2-socials {
          display: flex;
          gap: 0.55rem;
          margin-top: 1.2rem;
        }
        .m2-socials a {
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
        .m2-socials a:active {
          border-color: var(--accent);
          color: var(--accent);
          transform: scale(0.96);
        }

        /* Scroll cue */
        .m2-scroll {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          margin: 2rem auto 0;
          padding: 0.5rem 0.85rem;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--text-muted);
          opacity: 0.7;
        }
        .m2-scroll i { color: var(--accent); font-size: 0.95rem; }

        /* Light theme: tighten inset highlights, soften shadows */
        :is([data-theme="day"], [data-theme="desert"]) .m2-status,
        :is([data-theme="day"], [data-theme="desert"]) .m2-role-chip,
        :is([data-theme="day"], [data-theme="desert"]) .m2-stat,
        :is([data-theme="day"], [data-theme="desert"]) .m2-cta--ghost,
        :is([data-theme="day"], [data-theme="desert"]) .m2-email,
        :is([data-theme="day"], [data-theme="desert"]) .m2-socials a {
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.55);
        }
        :is([data-theme="day"], [data-theme="desert"]) .m2-avatar img {
          box-shadow: 0 8px 28px rgba(60,40,15,0.12), 0 0 0 1px var(--border);
        }

        @media (prefers-reduced-motion: reduce) {
          .m2-avatar-ring { animation: none; }
          .m2-status-dot { animation: none; }
          .m2-cta--primary i { transition: none; }
        }
      `}</style>
    </section>
  )
}
