import { useRef, useEffect, useMemo } from 'react'
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
    desc: 'Learning platforms that inspire curiosity and measure real outcomes.',
    features: ['LMS', 'Interactive', 'Gamified'],
    subIcons: [
      { icon: 'ri-book-open-line', x: '-14%', y: '8%', size: 22 },
      { icon: 'ri-lightbulb-flash-line', x: '96%', y: '6%', size: 24 },
      { icon: 'ri-pencil-ruler-2-line', x: '102%', y: '78%', size: 20 },
    ],
    illustration: (
      <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* dotted grid backdrop */}
        <g opacity="0.18">
          {Array.from({ length: 6 }).map((_, r) =>
            Array.from({ length: 7 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={10 + c * 17} cy={10 + r * 15} r="0.6" fill="currentColor" />
            ))
          )}
        </g>
        {/* orbital ring */}
        <ellipse cx="60" cy="50" rx="50" ry="18" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 5" opacity="0.18" />
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
        {/* data bars in screen */}
        <rect x="34" y="48" width="3" height="6" fill="currentColor" opacity="0.3" />
        <rect x="40" y="44" width="3" height="10" fill="currentColor" opacity="0.3" />
        <rect x="78" y="46" width="3" height="8" fill="currentColor" opacity="0.3" />
        <rect x="84" y="42" width="3" height="12" fill="currentColor" opacity="0.3" />
        {/* sparkle cross */}
        <path d="M108 54L110 58L114 60L110 62L108 66L106 62L102 60L106 58Z" fill="currentColor" opacity="0.35" />
        <path d="M8 80L9 82.5L11.5 83.5L9 84.5L8 87L7 84.5L4.5 83.5L7 82.5Z" fill="currentColor" opacity="0.28" />
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
    desc: 'Scalable cloud-native products built for speed, uptime, and scale.',
    features: ['Multi-tenant', 'Realtime', 'Scalable'],
    subIcons: [
      { icon: 'ri-server-line', x: '-14%', y: '10%', size: 22 },
      { icon: 'ri-database-2-line', x: '98%', y: '8%', size: 22 },
      { icon: 'ri-shield-keyhole-line', x: '-12%', y: '76%', size: 20 },
    ],
    illustration: (
      <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.18">
          {Array.from({ length: 6 }).map((_, r) =>
            Array.from({ length: 7 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={10 + c * 17} cy={10 + r * 15} r="0.6" fill="currentColor" />
            ))
          )}
        </g>
        {/* orbital ring */}
        <circle cx="60" cy="44" r="46" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 6" opacity="0.15" />
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
        {/* sync arrow ring */}
        <path d="M82 28 A 10 10 0 1 1 80 22" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.35" />
        <path d="M80 22 L78 25 L82 25 Z" fill="currentColor" opacity="0.4" />
        {/* Upload arrow */}
        <path d="M50 46L50 34M50 34L44 40M50 34L56 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
        {/* sparkle */}
        <path d="M108 68L109 71L112 72L109 73L108 76L107 73L104 72L107 71Z" fill="currentColor" opacity="0.3" />
        <path d="M10 20L11 22L13 23L11 24L10 26L9 24L7 23L9 22Z" fill="currentColor" opacity="0.28" />
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
    desc: 'Storefronts engineered for conversion, speed, and measurable growth.',
    features: ['Checkout', 'Analytics', 'Conversion'],
    subIcons: [
      { icon: 'ri-price-tag-3-line', x: '-14%', y: '10%', size: 22 },
      { icon: 'ri-bank-card-line', x: '98%', y: '6%', size: 22 },
      { icon: 'ri-truck-line', x: '100%', y: '76%', size: 22 },
    ],
    illustration: (
      <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.18">
          {Array.from({ length: 6 }).map((_, r) =>
            Array.from({ length: 7 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={10 + c * 17} cy={10 + r * 15} r="0.6" fill="currentColor" />
            ))
          )}
        </g>
        <ellipse cx="60" cy="58" rx="48" ry="20" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 5" opacity="0.16" />
        {/* Shopping bag */}
        <path d="M32 36H88L82 82H38Z" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.07" />
        <path d="M46 36V28C46 20 52 14 60 14C68 14 74 20 74 28V36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        {/* Tag on bag */}
        <circle cx="60" cy="56" r="10" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
        <text x="60" y="60" textAnchor="middle" fill="currentColor" fontSize="10" fontWeight="bold" opacity="0.55">$</text>
        {/* Orbit dots around tag */}
        <circle cx="74" cy="44" r="1.6" fill="currentColor" opacity="0.4" />
        <circle cx="48" cy="66" r="1.4" fill="currentColor" opacity="0.35" />
        <circle cx="70" cy="72" r="1.6" fill="currentColor" opacity="0.35" />
        {/* Sparkle effects */}
        <path d="M22 24L24 20L26 24L24 28Z" fill="currentColor" opacity="0.3" />
        <path d="M92 18L94 14L96 18L94 22Z" fill="currentColor" opacity="0.25" />
        <circle cx="100" cy="50" r="2.5" fill="currentColor" opacity="0.15" />
        <path d="M16 52L18 48L20 52L18 56Z" fill="currentColor" opacity="0.2" />
        <path d="M108 78L109 81L112 82L109 83L108 86L107 83L104 82L107 81Z" fill="currentColor" opacity="0.3" />
        {/* Chart arrow going up */}
        <path d="M72 74L82 62L90 66" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.38" />
        <circle cx="90" cy="66" r="2" fill="currentColor" opacity="0.4" />
        {/* mini bar chart */}
        <rect x="94" y="80" width="3" height="6" fill="currentColor" opacity="0.3" />
        <rect x="99" y="76" width="3" height="10" fill="currentColor" opacity="0.35" />
        <rect x="104" y="72" width="3" height="14" fill="currentColor" opacity="0.4" />
      </svg>
    ),
  },
  {
    word: 'AI',
    icon: 'ri-robot-2-line',
    accent: '#10b981',
    desc: 'Intelligent systems that learn, reason, and act alongside humans.',
    features: ['LLM', 'Vision', 'Agents'],
    subIcons: [
      { icon: 'ri-cpu-line', x: '-14%', y: '10%', size: 22 },
      { icon: 'ri-eye-line', x: '100%', y: '8%', size: 22 },
      { icon: 'ri-magic-line', x: '100%', y: '76%', size: 22 },
    ],
    illustration: (
      <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.18">
          {Array.from({ length: 6 }).map((_, r) =>
            Array.from({ length: 7 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={10 + c * 17} cy={10 + r * 15} r="0.6" fill="currentColor" />
            ))
          )}
        </g>
        {/* Brain / neural network */}
        <circle cx="60" cy="44" r="24" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.06" />
        {/* Neural nodes inside */}
        <circle cx="50" cy="36" r="3" fill="currentColor" opacity="0.4" />
        <circle cx="70" cy="36" r="3" fill="currentColor" opacity="0.4" />
        <circle cx="60" cy="50" r="3" fill="currentColor" opacity="0.4" />
        <circle cx="46" cy="48" r="2.5" fill="currentColor" opacity="0.3" />
        <circle cx="74" cy="48" r="2.5" fill="currentColor" opacity="0.3" />
        <circle cx="60" cy="34" r="2.5" fill="currentColor" opacity="0.3" />
        {/* Outer ring nodes */}
        <circle cx="36" cy="44" r="2" fill="currentColor" opacity="0.35" />
        <circle cx="84" cy="44" r="2" fill="currentColor" opacity="0.35" />
        <circle cx="60" cy="20" r="2" fill="currentColor" opacity="0.35" />
        <circle cx="60" cy="68" r="2" fill="currentColor" opacity="0.35" />
        {/* Connections */}
        <line x1="50" y1="36" x2="70" y2="36" stroke="currentColor" strokeWidth="1" opacity="0.25" />
        <line x1="50" y1="36" x2="60" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.25" />
        <line x1="70" y1="36" x2="60" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.25" />
        <line x1="46" y1="48" x2="60" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.25" />
        <line x1="74" y1="48" x2="60" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.25" />
        <line x1="60" y1="34" x2="50" y2="36" stroke="currentColor" strokeWidth="1" opacity="0.25" />
        <line x1="60" y1="34" x2="70" y2="36" stroke="currentColor" strokeWidth="1" opacity="0.25" />
        <line x1="36" y1="44" x2="50" y2="36" stroke="currentColor" strokeWidth="0.8" opacity="0.18" />
        <line x1="84" y1="44" x2="70" y2="36" stroke="currentColor" strokeWidth="0.8" opacity="0.18" />
        <line x1="60" y1="20" x2="60" y2="34" stroke="currentColor" strokeWidth="0.8" opacity="0.18" />
        <line x1="60" y1="68" x2="60" y2="50" stroke="currentColor" strokeWidth="0.8" opacity="0.18" />
        {/* Pulse rings */}
        <circle cx="60" cy="44" r="32" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" opacity="0.14" />
        <circle cx="60" cy="44" r="40" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 8" opacity="0.1" />
        {/* Base */}
        <line x1="60" y1="68" x2="60" y2="82" stroke="currentColor" strokeWidth="2" opacity="0.3" />
        <rect x="48" y="82" width="24" height="4" rx="2" fill="currentColor" opacity="0.15" />
        {/* sparkles */}
        <path d="M14 76L15 79L18 80L15 81L14 84L13 81L10 80L13 79Z" fill="currentColor" opacity="0.35" />
        <path d="M106 18L107 21L110 22L107 23L106 26L105 23L102 22L105 21Z" fill="currentColor" opacity="0.3" />
      </svg>
    ),
  },
  {
    word: 'Game Dev',
    icon: 'ri-gamepad-line',
    accent: '#ef4444',
    desc: 'Interactive experiences that captivate and keep players coming back.',
    features: ['WebGL', 'Physics', 'Multiplayer'],
    subIcons: [
      { icon: 'ri-sword-line', x: '-14%', y: '10%', size: 22 },
      { icon: 'ri-rocket-2-line', x: '98%', y: '8%', size: 22 },
      { icon: 'ri-trophy-line', x: '98%', y: '76%', size: 22 },
    ],
    illustration: (
      <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.18">
          {Array.from({ length: 6 }).map((_, r) =>
            Array.from({ length: 7 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={10 + c * 17} cy={10 + r * 15} r="0.6" fill="currentColor" />
            ))
          )}
        </g>
        <ellipse cx="60" cy="54" rx="52" ry="20" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 6" opacity="0.15" />
        {/* Controller body */}
        <path d="M24 46C24 36 32 28 42 28H78C88 28 96 36 96 46V50C96 62 88 72 76 72H72L66 84H54L48 72H44C32 72 24 62 24 50Z" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.07" />
        {/* D-pad */}
        <rect x="38" y="44" width="4" height="14" rx="1" fill="currentColor" opacity="0.4" />
        <rect x="33" y="49" width="14" height="4" rx="1" fill="currentColor" opacity="0.4" />
        {/* Buttons */}
        <circle cx="78" cy="44" r="3.5" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.25" />
        <circle cx="86" cy="50" r="3.5" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.25" />
        <circle cx="70" cy="50" r="3.5" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.25" />
        <circle cx="78" cy="56" r="3.5" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.25" />
        {/* Shoulder buttons */}
        <rect x="30" y="32" width="10" height="3" rx="1.5" fill="currentColor" opacity="0.3" />
        <rect x="80" y="32" width="10" height="3" rx="1.5" fill="currentColor" opacity="0.3" />
        {/* HUD bars */}
        <rect x="12" y="12" width="20" height="3" rx="1.5" fill="currentColor" opacity="0.3" />
        <rect x="12" y="17" width="14" height="2" rx="1" fill="currentColor" opacity="0.2" />
        <rect x="88" y="12" width="20" height="3" rx="1.5" fill="currentColor" opacity="0.3" />
        <rect x="94" y="17" width="14" height="2" rx="1" fill="currentColor" opacity="0.2" />
        {/* Floating elements */}
        <path d="M14 82L16 78L18 82L16 86Z" fill="currentColor" opacity="0.25" />
        <circle cx="104" cy="82" r="2.5" fill="currentColor" opacity="0.25" />
        <rect x="10" y="56" width="5" height="5" rx="1" fill="currentColor" opacity="0.15" transform="rotate(30 12 58)" />
        <path d="M100 62L102 58L104 62L102 66Z" fill="currentColor" opacity="0.2" />
        <path d="M108 38L109 41L112 42L109 43L108 46L107 43L104 42L107 41Z" fill="currentColor" opacity="0.3" />
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
          perspective: 1200px;
          perspective-origin: 50% 25%;
        }

        .css-card {
          position: relative;
          display: flex;
          align-items: center;
          gap: clamp(28px, 4vw, 56px);
          padding: clamp(32px, 4vw, 56px) clamp(36px, 4.5vw, 64px);
          background: var(--bg-card, rgba(255,255,255,0.03));
          border: 1px solid var(--border);
          border-radius: clamp(20px, 2vw, 28px);
          box-shadow: var(--shadow-card);
          will-change: transform;
          transform-style: preserve-3d;
          transform: translateZ(0);
          max-width: min(960px, 92vw);
          transition: box-shadow 0.35s ease;
        }

        [data-theme="light"] .css-card {
          background: rgba(255, 255, 255, 0.78);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }

        /* ===== Soft radial accent blob pushed back for depth ===== */
        .css-card-glow {
          position: absolute;
          width: 55%;
          height: 85%;
          left: 3%;
          top: 7%;
          background: radial-gradient(circle at 40% 50%, var(--card-accent), transparent 65%);
          opacity: 0.18;
          filter: blur(26px);
          transform: translateZ(-10px);
          pointer-events: none;
          border-radius: 50%;
        }

        [data-theme="light"] .css-card-glow {
          opacity: 0.22;
        }

        /* ===== Ambient particle field inside card ===== */
        .css-card-particles {
          position: absolute;
          inset: 0;
          overflow: hidden;
          border-radius: inherit;
          pointer-events: none;
          transform: translateZ(8px);
        }

        .css-card-particles span {
          position: absolute;
          display: block;
          border-radius: 50%;
          background: var(--card-accent);
          opacity: 0.28;
          filter: blur(0.5px);
          will-change: transform, opacity;
        }

        [data-theme="light"] .css-card-particles span {
          opacity: 0.45;
        }

        /* ===== Illustration wrapper (relative for sub-icons) ===== */
        .css-card-illust-wrap {
          position: relative;
          flex-shrink: 0;
          width: clamp(140px, 16vw, 220px);
          height: clamp(140px, 16vw, 220px);
          transform-style: preserve-3d;
        }

        /* ===== 3D depth layers ===== */
        .css-card-illust {
          position: relative;
          width: 100%;
          height: 100%;
          color: var(--card-accent);
          transform: translateZ(100px);
          backface-visibility: hidden;
          filter:
            drop-shadow(0 14px 28px rgba(0, 0, 0, 0.4))
            drop-shadow(0 5px 10px rgba(0, 0, 0, 0.22));
        }

        [data-theme="light"] .css-card-illust {
          filter:
            drop-shadow(0 12px 20px rgba(0, 0, 0, 0.16))
            drop-shadow(0 4px 7px rgba(0, 0, 0, 0.09));
        }

        .css-card-illust svg {
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        .css-card-subicon {
          position: absolute;
          color: var(--card-accent);
          opacity: 0.55;
          transform: translateZ(75px);
          backface-visibility: hidden;
          filter: drop-shadow(0 6px 14px rgba(0,0,0,0.4));
          will-change: transform;
        }

        [data-theme="light"] .css-card-subicon {
          filter: drop-shadow(0 4px 10px rgba(0,0,0,0.18));
          opacity: 0.7;
        }

        .css-card-body {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1vw, 14px);
          transform: translateZ(60px);
          backface-visibility: hidden;
        }

        .css-card-tag {
          font-family: var(--font-mono, monospace);
          font-size: clamp(0.65rem, 0.78vw, 0.78rem);
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--text-secondary);
        }

        .css-card-word {
          font-family: var(--font-display, system-ui);
          font-weight: 800;
          font-size: clamp(2.4rem, 6vw, 4.2rem);
          letter-spacing: -0.045em;
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
          font-size: clamp(0.88rem, 1.05vw, 1rem);
          color: var(--text-secondary);
          letter-spacing: 0.01em;
          line-height: 1.55;
          max-width: clamp(280px, 32vw, 440px);
        }

        /* ===== Feature chips ===== */
        .css-card-features {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: clamp(6px, 0.8vw, 10px);
          transform: translateZ(40px);
          backface-visibility: hidden;
        }

        .css-card-chip {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px 6px 12px;
          border-radius: 999px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.12);
          color: var(--text-secondary);
          font-family: var(--font-mono, monospace);
          font-size: 0.72rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.5s ease, transform 0.5s ease, border-color 0.3s ease, background 0.3s ease;
          will-change: opacity, transform;
        }

        .css-card-chip::before {
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--card-accent);
          box-shadow: 0 0 8px var(--card-accent);
          flex-shrink: 0;
        }

        .css-card-wrap.is-active .css-card-chip {
          opacity: 1;
          transform: translateY(0);
        }

        .css-card-wrap.is-active .css-card-chip:nth-child(1) { transition-delay: 0.05s; }
        .css-card-wrap.is-active .css-card-chip:nth-child(2) { transition-delay: 0.15s; }
        .css-card-wrap.is-active .css-card-chip:nth-child(3) { transition-delay: 0.25s; }

        [data-theme="light"] .css-card-chip {
          background: rgba(0,0,0,0.04);
          border-color: rgba(0,0,0,0.08);
          color: var(--text-primary);
        }

        .css-card-icon {
          position: absolute;
          top: clamp(18px, 2vw, 26px);
          right: clamp(18px, 2vw, 26px);
          font-size: clamp(1.4rem, 1.9vw, 1.9rem);
          color: var(--card-accent);
          opacity: 0.55;
          transform: translateZ(130px);
          backface-visibility: hidden;
          filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.45));
        }

        [data-theme="light"] .css-card-icon {
          filter: drop-shadow(0 5px 12px rgba(0, 0, 0, 0.2));
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
          opacity: 0.8;
          transform: translateZ(25px);
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
          .css-card {
            flex-direction: column;
            text-align: center;
            gap: 18px;
            padding: 28px 24px;
            max-width: 92vw;
          }
          .css-card-illust-wrap { width: clamp(110px, 22vw, 150px); height: clamp(110px, 22vw, 150px); }
          .css-card-subicon { display: none; }
          .css-card-glow { display: none; }
          .css-card-desc { max-width: none; }
          .css-card-features { justify-content: center; }
          .css-card::before { left: 15%; right: 15%; top: 0; bottom: auto; width: auto; height: 3px; }
        }

        @media (max-width: 480px) {
          .css-section { height: 380vh; }
          .css-card-word { font-size: clamp(1.9rem, 11vw, 2.8rem); }
          .css-card-chip { font-size: 0.65rem; padding: 5px 10px 5px 9px; }
          .css-steps { display: none; }
        }
      `}</style>
    </section>
  )
}

/* ─── Ambient particle field ─── */
function AmbientParticles({ seed }) {
  const ref = useRef(null)
  const particles = useMemo(() => {
    let h = 0
    for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0
    const rand = () => {
      h = (h * 1664525 + 1013904223) >>> 0
      return h / 0xffffffff
    }
    return Array.from({ length: 16 }, (_, i) => ({
      id: i,
      top: `${rand() * 86 + 6}%`,
      left: `${rand() * 92 + 4}%`,
      size: 2 + Math.floor(rand() * 4),
      dur: 4 + rand() * 5,
      delay: rand() * 3,
      dx: (rand() * 2 - 1) * 20,
      dy: (rand() * 2 - 1) * 26,
      op: 0.12 + rand() * 0.35,
    }))
  }, [seed])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const spans = el.querySelectorAll('span')
    const tweens = []
    spans.forEach((s, i) => {
      const p = particles[i]
      tweens.push(
        gsap.to(s, {
          x: p.dx,
          y: p.dy,
          opacity: p.op,
          duration: p.dur,
          delay: p.delay,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      )
    })
    return () => tweens.forEach(t => t.kill())
  }, [particles])

  return (
    <div ref={ref} className="css-card-particles" aria-hidden>
      {particles.map(p => (
        <span
          key={p.id}
          style={{ top: p.top, left: p.left, width: p.size, height: p.size }}
        />
      ))}
    </div>
  )
}

/* ─── 3D Keyword Card ─── */
function KeywordCard({ frame, index, smoothed }) {
  const cardRef = useRef(null)
  const wrapRef = useRef(null)
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

  /* Toggle is-active class while the card's scroll segment is the active one */
  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    const activeStart = start + SEG * 0.1
    const activeEnd = end - SEG * 0.1
    const unsub = smoothed.on('change', (v) => {
      wrap.classList.toggle('is-active', v >= activeStart && v < activeEnd)
    })
    return unsub
  }, [smoothed, start, end])

  /* subtle parallax drift for sub-icons */
  const sx1 = useTransform(smoothed, [start, peak, end], [-8, 0, 8])
  const sx2 = useTransform(smoothed, [start, peak, end], [10, 0, -10])
  const sx3 = useTransform(smoothed, [start, peak, end], [-6, 0, 6])
  const subiconMv = [sx1, sx2, sx3]

  return (
    <motion.div ref={wrapRef} className="css-card-wrap" style={{ opacity, y, scale }}>
      <motion.div
        ref={cardRef}
        className="css-card"
        style={{
          '--card-accent': frame.accent,
          rotateX,
          rotateY,
        }}
      >
        <div className="css-card-glow" />
        <AmbientParticles seed={frame.word} />

        <div className="css-card-illust-wrap">
          <div className="css-card-illust">
            {frame.illustration}
          </div>
          {frame.subIcons && frame.subIcons.map((si, i) => (
            <motion.i
              key={si.icon}
              className={`css-card-subicon ${si.icon}`}
              style={{
                left: si.x,
                top: si.y,
                fontSize: si.size,
                x: subiconMv[i % 3],
              }}
            />
          ))}
        </div>

        <div className="css-card-body">
          <span className="css-card-tag">from</span>
          <span className="css-card-word">{frame.word}</span>
          <span className="css-card-desc">{frame.desc}</span>
          {frame.features && (
            <div className="css-card-features">
              {frame.features.map(f => (
                <span key={f} className="css-card-chip">{f}</span>
              ))}
            </div>
          )}
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
