import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'motion/react'
import gsap from 'gsap'

/*
 * Scroll-driven keyword sequence with 3D glass cards, inline SVG
 * illustrations, floating geometric shapes, and perspective transforms.
 * Background matches the rest of the site (--bg-primary).
 */

const FRAMES = [
  {
    word: 'EdTech',
    icon: 'ri-graduation-cap-line',
    accent: '#3b82f6',
    desc: 'Learning platforms that inspire',
    illustration: (
      <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Monitor */}
        <rect x="20" y="10" width="80" height="55" rx="6" stroke="currentColor" strokeWidth="2" opacity="0.6" />
        <rect x="28" y="18" width="64" height="39" rx="3" fill="currentColor" opacity="0.07" />
        <line x1="48" y1="65" x2="72" y2="65" stroke="currentColor" strokeWidth="2" opacity="0.5" />
        <line x1="60" y1="65" x2="60" y2="75" stroke="currentColor" strokeWidth="2" opacity="0.5" />
        <line x1="44" y1="75" x2="76" y2="75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        {/* Graduation cap on screen */}
        <path d="M60 28L40 38L60 48L80 38Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.15" />
        <line x1="60" y1="48" x2="60" y2="55" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
        <path d="M48 42V50C48 50 54 54 60 54C66 54 72 50 72 50V42" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
        {/* Floating elements */}
        <circle cx="92" cy="22" r="3" fill="currentColor" opacity="0.2" />
        <rect x="14" y="32" width="6" height="6" rx="1" fill="currentColor" opacity="0.15" transform="rotate(15 17 35)" />
      </svg>
    ),
  },
  {
    word: 'SaaS',
    icon: 'ri-cloud-line',
    accent: '#8b5cf6',
    desc: 'Scalable cloud-native solutions',
    illustration: (
      <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Cloud */}
        <path d="M30 58C22 58 16 52 16 44C16 36 22 30 30 30C32 22 40 16 50 16C62 16 72 24 72 36C80 36 86 42 86 50C86 58 80 64 72 64H30Z" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.07" />
        {/* Connection lines going down */}
        <line x1="36" y1="64" x2="36" y2="80" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.35" />
        <line x1="52" y1="64" x2="52" y2="84" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.35" />
        <line x1="68" y1="64" x2="68" y2="80" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.35" />
        {/* Endpoint dots */}
        <circle cx="36" cy="82" r="4" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.15" />
        <circle cx="52" cy="86" r="4" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.15" />
        <circle cx="68" cy="82" r="4" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.15" />
        {/* Upload arrow */}
        <path d="M50 46L50 34M50 34L44 40M50 34L56 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
        {/* Floating */}
        <rect x="94" y="24" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.2" opacity="0.2" transform="rotate(20 98 28)" />
        <circle cx="102" cy="60" r="3" fill="currentColor" opacity="0.15" />
      </svg>
    ),
  },
  {
    word: 'E-Commerce',
    icon: 'ri-shopping-cart-2-line',
    accent: '#f59e0b',
    desc: 'Storefronts that convert',
    illustration: (
      <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Shopping bag */}
        <path d="M32 36H88L82 82H38Z" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.07" />
        <path d="M46 36V28C46 20 52 14 60 14C68 14 74 20 74 28V36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        {/* Tag on bag */}
        <circle cx="60" cy="56" r="10" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
        <text x="60" y="60" textAnchor="middle" fill="currentColor" fontSize="10" fontWeight="bold" opacity="0.5">$</text>
        {/* Sparkle effects */}
        <path d="M22 24L24 20L26 24L24 28Z" fill="currentColor" opacity="0.25" />
        <path d="M92 18L94 14L96 18L94 22Z" fill="currentColor" opacity="0.2" />
        <circle cx="100" cy="50" r="2.5" fill="currentColor" opacity="0.15" />
        <path d="M16 52L18 48L20 52L18 56Z" fill="currentColor" opacity="0.15" />
        {/* Chart arrow going up */}
        <path d="M72 74L82 62L90 66" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" />
        <circle cx="90" cy="66" r="2" fill="currentColor" opacity="0.3" />
      </svg>
    ),
  },
  {
    word: 'AI',
    icon: 'ri-robot-2-line',
    accent: '#10b981',
    desc: 'Intelligent systems that learn',
    illustration: (
      <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Brain / neural network */}
        <circle cx="60" cy="44" r="24" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.06" />
        {/* Neural nodes inside */}
        <circle cx="50" cy="36" r="3" fill="currentColor" opacity="0.35" />
        <circle cx="70" cy="36" r="3" fill="currentColor" opacity="0.35" />
        <circle cx="60" cy="50" r="3" fill="currentColor" opacity="0.35" />
        <circle cx="46" cy="48" r="2.5" fill="currentColor" opacity="0.25" />
        <circle cx="74" cy="48" r="2.5" fill="currentColor" opacity="0.25" />
        <circle cx="60" cy="34" r="2.5" fill="currentColor" opacity="0.25" />
        {/* Connections */}
        <line x1="50" y1="36" x2="70" y2="36" stroke="currentColor" strokeWidth="1" opacity="0.2" />
        <line x1="50" y1="36" x2="60" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.2" />
        <line x1="70" y1="36" x2="60" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.2" />
        <line x1="46" y1="48" x2="60" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.2" />
        <line x1="74" y1="48" x2="60" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.2" />
        <line x1="60" y1="34" x2="50" y2="36" stroke="currentColor" strokeWidth="1" opacity="0.2" />
        <line x1="60" y1="34" x2="70" y2="36" stroke="currentColor" strokeWidth="1" opacity="0.2" />
        {/* Pulse rings */}
        <circle cx="60" cy="44" r="32" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" opacity="0.12" />
        <circle cx="60" cy="44" r="40" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 8" opacity="0.08" />
        {/* Base */}
        <line x1="60" y1="68" x2="60" y2="82" stroke="currentColor" strokeWidth="2" opacity="0.3" />
        <rect x="48" y="82" width="24" height="4" rx="2" fill="currentColor" opacity="0.15" />
      </svg>
    ),
  },
  {
    word: 'Game Dev',
    icon: 'ri-gamepad-line',
    accent: '#ef4444',
    desc: 'Experiences that captivate',
    illustration: (
      <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Controller body */}
        <path d="M24 46C24 36 32 28 42 28H78C88 28 96 36 96 46V50C96 62 88 72 76 72H72L66 84H54L48 72H44C32 72 24 62 24 50Z" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.07" />
        {/* D-pad */}
        <rect x="38" y="44" width="4" height="14" rx="1" fill="currentColor" opacity="0.35" />
        <rect x="33" y="49" width="14" height="4" rx="1" fill="currentColor" opacity="0.35" />
        {/* Buttons */}
        <circle cx="78" cy="44" r="3.5" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.2" />
        <circle cx="86" cy="50" r="3.5" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.2" />
        <circle cx="70" cy="50" r="3.5" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.2" />
        <circle cx="78" cy="56" r="3.5" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.2" />
        {/* Floating elements */}
        <path d="M14 30L16 26L18 30L16 34Z" fill="currentColor" opacity="0.2" />
        <circle cx="104" cy="34" r="2.5" fill="currentColor" opacity="0.2" />
        <rect x="10" y="56" width="5" height="5" rx="1" fill="currentColor" opacity="0.12" transform="rotate(30 12 58)" />
        <path d="M100 62L102 58L104 62L102 66Z" fill="currentColor" opacity="0.15" />
      </svg>
    ),
  },
]

const TOTAL = FRAMES.length
const SEG = 1 / (TOTAL + 1)

export default function ContactScrollSequence({ children }) {
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const smoothed = useSpring(scrollYProgress, { stiffness: 70, damping: 24, mass: 0.7 })

  /* CTA appears in the final segment */
  const ctaStart = TOTAL * SEG
  const ctaOpacity = useTransform(smoothed, [ctaStart, ctaStart + SEG * 0.5], [0, 1])
  const ctaY      = useTransform(smoothed, [ctaStart, ctaStart + SEG * 0.5], [60, 0])
  const ctaScale  = useTransform(smoothed, [ctaStart, ctaStart + SEG * 0.5], [0.9, 1])

  /* "I got you covered" bridge text */
  const bridgeStart = (TOTAL - 0.3) * SEG
  const bridgeOpacity = useTransform(smoothed, [bridgeStart, bridgeStart + SEG * 0.4, ctaStart - SEG * 0.1, ctaStart], [0, 1, 1, 0])
  const bridgeScale   = useTransform(smoothed, [bridgeStart, bridgeStart + SEG * 0.4], [0.85, 1])

  /* Progress bar */
  const barScaleX = useTransform(smoothed, [0, 1], [0, 1])

  return (
    <section ref={sectionRef} className="css-section">
      <div className="css-sticky">
        {/* Floating 3D geometric shapes */}
        <FloatingShapes smoothed={smoothed} />

        {/* Keyword cards */}
        {FRAMES.map((frame, i) => (
          <KeywordCard key={frame.word} frame={frame} index={i} smoothed={smoothed} />
        ))}

        {/* Bridge text */}
        <motion.div className="css-bridge" style={{ opacity: bridgeOpacity, scale: bridgeScale }}>
          <span className="css-bridge-text">I got you covered</span>
        </motion.div>

        {/* Final CTA card */}
        <motion.div className="css-cta" style={{ opacity: ctaOpacity, y: ctaY, scale: ctaScale }}>
          {children}
        </motion.div>

        {/* Bottom progress */}
        <div className="css-bar">
          <motion.div className="css-bar-fill" style={{ scaleX: barScaleX }} />
        </div>

        {/* Step indicators */}
        <div className="css-steps">
          {FRAMES.map((f, i) => (
            <StepDot key={i} index={i} smoothed={smoothed} accent={f.accent} word={f.word} />
          ))}
        </div>
      </div>

      <style>{`
        .css-section {
          position: relative;
          height: 500vh;
          width: 100%;
          background: transparent;
          z-index: 1;
        }

        .css-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          width: 100%;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
        }

        /* ===== 3D Floating shapes ===== */
        .css-shapes {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          perspective: 900px;
        }

        .css-shape {
          position: absolute;
          will-change: transform;
        }

        .css-shape-cube {
          width: clamp(30px, 3.5vw, 50px);
          height: clamp(30px, 3.5vw, 50px);
          transform-style: preserve-3d;
        }

        .css-shape-cube-face {
          position: absolute;
          inset: 0;
          border: 1.2px solid var(--border);
          border-radius: 4px;
          background: var(--bg-secondary, rgba(255,255,255,0.02));
          opacity: 0.6;
        }

        .css-shape-ring {
          width: clamp(50px, 5vw, 80px);
          height: clamp(50px, 5vw, 80px);
          border: 1.5px solid var(--border);
          border-radius: 50%;
          opacity: 0.4;
        }

        .css-shape-diamond {
          width: clamp(18px, 2vw, 30px);
          height: clamp(18px, 2vw, 30px);
          border: 1.2px solid var(--border);
          border-radius: 3px;
          opacity: 0.35;
          transform: rotate(45deg);
        }

        .css-shape-dot {
          width: clamp(6px, 0.7vw, 10px);
          height: clamp(6px, 0.7vw, 10px);
          border-radius: 50%;
          background: var(--accent);
          opacity: 0.2;
        }

        /* ===== Keyword card ===== */
        .css-card-wrap {
          position: absolute;
          z-index: 2;
          will-change: transform, opacity;
          pointer-events: none;
          perspective: 1000px;
          perspective-origin: 50% 30%;
        }

        .css-card {
          position: relative;
          display: flex;
          align-items: center;
          gap: clamp(20px, 3vw, 40px);
          padding: clamp(24px, 3vw, 40px) clamp(28px, 3.5vw, 48px);
          background: var(--bg-card, rgba(255,255,255,0.03));
          border: 1px solid var(--border);
          border-radius: clamp(16px, 1.6vw, 24px);
          box-shadow: var(--shadow-card);
          will-change: transform;
          transform-style: preserve-3d;
          transform: translateZ(0);
          max-width: min(700px, 88vw);
          transition: box-shadow 0.35s ease;
        }

        [data-theme="light"] .css-card {
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        /* ===== 3D depth layers ===== */
        .css-card-illust {
          flex-shrink: 0;
          width: clamp(80px, 10vw, 130px);
          height: clamp(80px, 10vw, 130px);
          color: var(--card-accent);
          transform: translateZ(90px);
          backface-visibility: hidden;
          filter:
            drop-shadow(0 12px 24px rgba(0, 0, 0, 0.35))
            drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
        }

        [data-theme="light"] .css-card-illust {
          filter:
            drop-shadow(0 10px 18px rgba(0, 0, 0, 0.15))
            drop-shadow(0 3px 6px rgba(0, 0, 0, 0.08));
        }

        .css-card-illust svg {
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        .css-card-body {
          display: flex;
          flex-direction: column;
          gap: clamp(6px, 0.8vw, 10px);
          transform: translateZ(55px);
          backface-visibility: hidden;
        }

        .css-card-tag {
          font-family: var(--font-mono, monospace);
          font-size: clamp(0.62rem, 0.75vw, 0.72rem);
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--text-secondary);
        }

        .css-card-word {
          font-family: var(--font-display, system-ui);
          font-weight: 800;
          font-size: clamp(2rem, 5vw, 4rem);
          letter-spacing: -0.04em;
          line-height: 1;
          background: linear-gradient(135deg, var(--card-accent), var(--text-primary) 80%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 6px 18px rgba(0, 0, 0, 0.35), 0 2px 4px rgba(0, 0, 0, 0.25);
        }

        [data-theme="light"] .css-card-word {
          text-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
        }

        .css-card-desc {
          font-size: clamp(0.82rem, 1vw, 0.95rem);
          color: var(--text-secondary);
          letter-spacing: 0.01em;
          line-height: 1.5;
          max-width: 300px;
        }

        .css-card-icon {
          position: absolute;
          top: clamp(14px, 1.6vw, 20px);
          right: clamp(14px, 1.6vw, 20px);
          font-size: clamp(1.2rem, 1.6vw, 1.6rem);
          color: var(--card-accent);
          opacity: 0.5;
          transform: translateZ(110px);
          backface-visibility: hidden;
          filter: drop-shadow(0 6px 14px rgba(0, 0, 0, 0.4));
        }

        [data-theme="light"] .css-card-icon {
          filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.18));
        }

        /* ===== Card accent glow line — lifted off the card surface ===== */
        .css-card::before {
          content: '';
          position: absolute;
          left: 0;
          top: 15%;
          bottom: 15%;
          width: 3px;
          background: var(--card-accent);
          border-radius: 2px;
          box-shadow: 0 0 20px var(--card-accent);
          opacity: 0.75;
          transform: translateZ(20px);
        }

        /* Rim-light gradient on the card surface */
        .css-card::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.12), transparent 45%);
          pointer-events: none;
          transform: translateZ(1px);
        }

        [data-theme="light"] .css-card::after {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.7), transparent 55%);
        }

        /* ===== Bridge text ===== */
        .css-bridge {
          position: absolute;
          z-index: 2;
          pointer-events: none;
          will-change: transform, opacity;
        }

        .css-bridge-text {
          font-family: var(--font-display, system-ui);
          font-weight: 700;
          font-size: clamp(1.6rem, 4vw, 3rem);
          letter-spacing: -0.03em;
          background: linear-gradient(90deg, #8b5cf6, #ec4899, #f59e0b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 2px 20px rgba(139,92,246,0.4));
        }

        /* ===== CTA ===== */
        .css-cta {
          position: absolute;
          z-index: 10;
          width: min(560px, 88vw);
          text-align: center;
          padding: clamp(1.6rem, 3vw, 2.5rem) clamp(1.5rem, 3vw, 2.5rem);
          background: var(--bg-card, rgba(10, 10, 20, 0.65));
          backdrop-filter: blur(22px);
          -webkit-backdrop-filter: blur(22px);
          border: 1px solid var(--border);
          border-radius: 22px;
          box-shadow: var(--shadow-card), inset 0 1px 0 rgba(255, 255, 255, 0.06);
          will-change: transform, opacity;
        }

        /* ===== Bottom progress ===== */
        .css-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: rgba(255, 255, 255, 0.08);
          z-index: 5;
        }

        [data-theme="light"] .css-bar { background: rgba(0, 0, 0, 0.06); }

        .css-bar-fill {
          height: 100%;
          width: 100%;
          transform-origin: left center;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6, #f59e0b, #10b981, #ef4444);
          will-change: transform;
        }

        /* ===== Step dots ===== */
        .css-steps {
          position: absolute;
          right: clamp(16px, 2vw, 36px);
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          gap: clamp(14px, 1.6vw, 22px);
          z-index: 5;
        }

        .css-step {
          display: flex;
          align-items: center;
          gap: 10px;
          transition: transform 0.3s;
        }

        .css-step-dot {
          width: clamp(8px, 0.7vw, 10px);
          height: clamp(8px, 0.7vw, 10px);
          border-radius: 50%;
          border: 1.5px solid var(--border);
          background: transparent;
          transition: background 0.3s, border-color 0.3s, transform 0.3s, box-shadow 0.3s;
          will-change: transform;
        }

        .css-step.active .css-step-dot {
          transform: scale(1.6);
        }

        .css-step-label {
          font-family: var(--font-mono, monospace);
          font-size: 0.6rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-secondary);
          opacity: 0;
          transform: translateX(-4px);
          transition: opacity 0.3s, transform 0.3s;
          white-space: nowrap;
        }

        .css-step.active .css-step-label {
          opacity: 1;
          transform: translateX(0);
        }

        @media (max-width: 768px) {
          .css-section { height: 420vh; }
          .css-steps { right: 10px; gap: 10px; }
          .css-step-label { display: none; }
          .css-cta { width: 92vw; padding: 1.2rem 1rem; }
          .css-card { flex-direction: column; text-align: center; gap: 14px; padding: 24px; }
          .css-card-illust { width: 70px; height: 70px; }
          .css-card-desc { max-width: none; }
          .css-card::before { left: 15%; right: 15%; top: 0; bottom: auto; width: auto; height: 3px; }
        }

        @media (max-width: 480px) {
          .css-section { height: 380vh; }
          .css-card-word { font-size: clamp(1.8rem, 10vw, 2.6rem); }
          .css-steps { display: none; }
        }
      `}</style>
    </section>
  )
}

/* ─── 3D Keyword Card ─── */
function KeywordCard({ frame, index, smoothed }) {
  const cardRef = useRef(null)
  const start = index * SEG
  const peak  = start + SEG * 0.5
  const end   = (index + 1) * SEG

  const opacity = useTransform(smoothed, [start, start + SEG * 0.18, end - SEG * 0.18, end], [0, 1, 1, 0])
  const y       = useTransform(smoothed, [start, peak, end], [80, 0, -80])
  const scale   = useTransform(smoothed, [start, peak, end], [0.8, 1, 0.8])

  /* 3D tilt driven by scroll — stronger range for visible depth separation */
  const rotateX = useTransform(smoothed, [start, peak, end], [18, 0, -18])
  const rotateY = useTransform(smoothed, [start, peak, end], [-14, 0, 14])

  /* Parallax shadow shifts opposite to tilt — strongest depth cue */
  const shadowX = useTransform(smoothed, [start, peak, end], [14, 0, -14])
  const shadowY = useTransform(smoothed, [start, peak, end], [-10, 8, 26])

  /* GSAP-powered continuous subtle float while card is visible */
  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const tl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: 'sine.inOut' } })
    tl.to(el, { y: -6, rotateZ: 0.3, duration: 3 })
      .to(el, { y: 6, rotateZ: -0.3, duration: 3 })
    return () => tl.kill()
  }, [])

  /* Apply dynamic parallax shadow via GSAP for perf */
  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const apply = () => {
      const sx = shadowX.get()
      const sy = shadowY.get()
      el.style.boxShadow = `${sx}px ${sy}px 60px -12px rgba(0,0,0,0.28), 0 20px 70px -24px rgba(0,0,0,0.35), 0 0 50px -20px var(--card-accent)`
    }
    const unsubX = shadowX.on('change', apply)
    const unsubY = shadowY.on('change', apply)
    return () => { unsubX(); unsubY() }
  }, [shadowX, shadowY])

  return (
    <motion.div className="css-card-wrap" style={{ opacity, y, scale }}>
      <motion.div
        ref={cardRef}
        className="css-card"
        style={{
          '--card-accent': frame.accent,
          rotateX,
          rotateY,
        }}
      >
        <div className="css-card-illust">
          {frame.illustration}
        </div>
        <div className="css-card-body">
          <span className="css-card-tag">from</span>
          <span className="css-card-word">{frame.word}</span>
          <span className="css-card-desc">{frame.desc}</span>
        </div>
        <i className={`css-card-icon ${frame.icon}`} />
      </motion.div>
    </motion.div>
  )
}

/* ─── Floating 3D shapes ─── */
function FloatingShapes({ smoothed }) {
  const shapes = [
    { type: 'cube',    x: '12%', y: '18%', speed: 1.2 },
    { type: 'ring',    x: '82%', y: '25%', speed: 0.8 },
    { type: 'diamond', x: '8%',  y: '72%', speed: 1.5 },
    { type: 'cube',    x: '88%', y: '68%', speed: 1.0 },
    { type: 'ring',    x: '50%', y: '85%', speed: 0.6 },
    { type: 'dot',     x: '25%', y: '35%', speed: 1.8 },
    { type: 'dot',     x: '75%', y: '50%', speed: 1.4 },
    { type: 'diamond', x: '92%', y: '42%', speed: 1.1 },
    { type: 'dot',     x: '40%', y: '12%', speed: 2.0 },
    { type: 'diamond', x: '60%', y: '90%', speed: 0.9 },
  ]

  return (
    <div className="css-shapes">
      {shapes.map((s, i) => (
        <FloatingShape key={i} shape={s} index={i} smoothed={smoothed} />
      ))}
    </div>
  )
}

function FloatingShape({ shape, index, smoothed }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    /* Each shape has its own idle float animation */
    const tl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: 'sine.inOut' } })
    const dur = 4 + index * 0.5
    tl.to(el, {
      y: `+=${10 + index * 3}`,
      rotateX: 20 + index * 8,
      rotateY: 15 + index * 6,
      rotateZ: 10 + index * 4,
      duration: dur,
    }).to(el, {
      y: `-=${10 + index * 3}`,
      rotateX: -(10 + index * 5),
      rotateY: -(12 + index * 4),
      rotateZ: -(8 + index * 3),
      duration: dur,
    })

    /* Scroll-driven parallax layer */
    const unsub = smoothed.on('change', (v) => {
      const parallax = v * shape.speed * 80 - 40
      gsap.set(el, { '--parallax': `${parallax}px` })
    })

    return () => { tl.kill(); unsub() }
  }, [smoothed, shape.speed, index])

  const inner = shape.type === 'cube' ? (
    <div className="css-shape-cube">
      <div className="css-shape-cube-face" style={{ transform: 'rotateY(0deg) translateZ(var(--half, 16px))' }} />
      <div className="css-shape-cube-face" style={{ transform: 'rotateY(90deg) translateZ(var(--half, 16px))' }} />
      <div className="css-shape-cube-face" style={{ transform: 'rotateY(180deg) translateZ(var(--half, 16px))' }} />
      <div className="css-shape-cube-face" style={{ transform: 'rotateY(-90deg) translateZ(var(--half, 16px))' }} />
    </div>
  ) : (
    <div className={`css-shape-${shape.type}`} />
  )

  return (
    <div
      ref={ref}
      className="css-shape"
      style={{
        left: shape.x,
        top: shape.y,
        transform: `translate(-50%, -50%) translateY(var(--parallax, 0px))`,
      }}
    >
      {inner}
    </div>
  )
}

/* ─── Step dot with label ─── */
function StepDot({ index, smoothed, accent, word }) {
  const ref = useRef(null)
  const start = index * SEG
  const end   = (index + 1) * SEG

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const dot = el.querySelector('.css-step-dot')
    const unsub = smoothed.on('change', (v) => {
      const active = v >= start && v < end
      el.classList.toggle('active', active)
      if (dot) {
        dot.style.background = active ? accent : 'transparent'
        dot.style.borderColor = active ? accent : ''
        dot.style.boxShadow = active ? `0 0 14px ${accent}` : 'none'
      }
    })
    return unsub
  }, [smoothed, start, end, accent])

  return (
    <div ref={ref} className="css-step">
      <div className="css-step-dot" />
      <span className="css-step-label">{word}</span>
    </div>
  )
}
