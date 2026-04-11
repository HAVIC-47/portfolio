import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ── Skill categories ── */
const skillCategories = [
  {
    title: 'Languages',
    icon: 'ri-code-s-slash-line',
    count: 7,
    items: ['C', 'C++', 'Python', 'JavaScript', 'TypeScript', 'C#', 'Java'],
    accent: 'rgba(201,168,124,0.7)',
  },
  {
    title: 'Frameworks',
    icon: 'ri-stack-line',
    count: 7,
    items: ['Next.js', 'React', 'Django', '.NET', 'Angular', 'Tailwind CSS', 'Bootstrap'],
    accent: 'rgba(201,168,124,0.6)',
  },
  {
    title: 'Tools & Databases',
    icon: 'ri-tools-line',
    count: 8,
    items: ['SQLite', 'MySQL', 'PostgreSQL', 'Convex', 'Supabase', 'Git', 'Linux', 'Markdown'],
    accent: 'rgba(201,168,124,0.55)',
  },
  {
    title: 'Fundamentals',
    icon: 'ri-lightbulb-line',
    count: 4,
    items: ['OOP', 'Data Structures', 'Algorithms', 'System Design'],
    accent: 'rgba(201,168,124,0.65)',
  },
]

/* ── Tech logos for the ticker ── */
const techLogos = [
  { name: 'C', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
  { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'C#', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg' },
  { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Django', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
  { name: '.NET', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg' },
  { name: 'Angular', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg' },
  { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'SQLite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
]

/* ═══════════════════════════════════════════
   LOGO TICKER
   ═══════════════════════════════════════════ */
function LogoTicker() {
  const tickerRef = useRef(null)
  const tweenRef = useRef(null)

  useEffect(() => {
    const el = tickerRef.current
    if (!el) return
    const inner = el.querySelector('.ticker-inner')
    if (!inner) return

    const w = inner.scrollWidth / 2

    tweenRef.current = gsap.to(inner, {
      x: -w,
      duration: 40,
      ease: 'none',
      repeat: -1,
    })

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) tweenRef.current.pause()
    const onChange = () => (mq.matches ? tweenRef.current.pause() : tweenRef.current.resume())
    mq.addEventListener('change', onChange)

    return () => {
      tweenRef.current.kill()
      mq.removeEventListener('change', onChange)
    }
  }, [])

  function handleEnter() {
    if (tweenRef.current) gsap.to(tweenRef.current, { timeScale: 0, duration: 0.6, ease: 'power2.out' })
  }
  function handleLeave() {
    if (tweenRef.current) gsap.to(tweenRef.current, { timeScale: 1, duration: 0.6, ease: 'power2.out' })
  }

  const doubled = [...techLogos, ...techLogos]

  return (
    <div
      ref={tickerRef}
      className="sk-ticker"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div className="ticker-inner">
        {doubled.map((logo, i) => (
          <div key={i} className="ticker-logo">
            <img src={logo.icon} alt={logo.name} />
            <span>{logo.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════
   STACKING GLASS CARD — Layered 3D Depth
   - perspective(1000px) + rotateX/Y mouse tilt
   - scale3d(1.05) lift on hover
   - Glass body at translateZ(-20px) (pushed back)
   - Content at translateZ(40px) (floats forward)
   - Creates real parallax depth between surface
     and content, like the card-7 reference
   ═══════════════════════════════════════════ */
function GlassSkillCard({ category, index, totalCards }) {
  const cardRef = useRef(null)
  const containerRef = useRef(null)
  const glowRef = useRef(null)
  const contentRef = useRef(null)
  const bodyRef = useRef(null)
  const scrollScaleRef = useRef(1)
  const hoveredRef = useRef(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const card = cardRef.current
    const container = containerRef.current
    if (!card || !container) return

    const targetScale = 1 - (totalCards - index) * 0.05

    gsap.set(card, { scale: 1, transformOrigin: 'center top' })

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top center',
      end: 'bottom center',
      scrub: 1,
      onUpdate: (self) => {
        const scale = Math.max(gsap.utils.interpolate(1, targetScale, self.progress), targetScale)
        scrollScaleRef.current = scale
        /* Don't override GSAP tween while user is hovering */
        if (!hoveredRef.current) {
          gsap.set(card, {
            scale,
            transformOrigin: 'center top',
          })
        }
      },
    })

    return () => trigger.kill()
  }, [index, totalCards])

  /* 3D tilt on mouse move — card-7 style with layered depth */
  function handleMouseMove(e) {
    const card = cardRef.current
    if (!card) return
    const { left, top, width, height } = card.getBoundingClientRect()
    const x = e.clientX - left
    const y = e.clientY - top

    const rotateX = (y - height / 2) / (height / 2) * -8
    const rotateY = (x - width / 2) / (width / 2) * 8

    /* Apply perspective + rotation + scale3d lift to the wrapper */
    gsap.to(card, {
      rotateX,
      rotateY,
      scale: 1.05,
      duration: 0.15,
      ease: 'power2.out',
      overwrite: 'auto',
    })

    /* Move content layer forward for depth parallax */
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        z: 40,
        duration: 0.15,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }

    /* Push glass body back for depth separation */
    if (bodyRef.current) {
      gsap.to(bodyRef.current, {
        z: -20,
        scale: 1.04,
        duration: 0.15,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }

    /* Cursor-following glow — adapts to theme */
    const nx = x / width
    const ny = y / height
    if (glowRef.current) {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light'
      const glowC = isLight ? 'rgba(146,64,14,0.08)' : 'rgba(201,168,124,0.12)'
      glowRef.current.style.background =
        `radial-gradient(600px circle at ${nx * 100}% ${ny * 100}%, ${glowC} 0%, transparent 55%)`
    }
  }

  function handleMouseEnter() {
    hoveredRef.current = true
    setHovered(true)
  }

  function handleMouseLeave() {
    hoveredRef.current = false
    setHovered(false)

    /* Kill ALL in-flight tweens on card before resetting */
    gsap.killTweensOf(cardRef.current)

    /* Reset card tilt + scale back to scroll-driven value */
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: scrollScaleRef.current,
      duration: 0.5,
      ease: 'power3.out',
    })

    /* Reset content depth */
    if (contentRef.current) {
      gsap.killTweensOf(contentRef.current)
      gsap.to(contentRef.current, {
        z: 0,
        duration: 0.5,
        ease: 'power3.out',
      })
    }

    /* Reset glass body depth */
    if (bodyRef.current) {
      gsap.killTweensOf(bodyRef.current)
      gsap.to(bodyRef.current, {
        z: 0,
        scale: 1,
        duration: 0.5,
        ease: 'power3.out',
      })
    }

    if (glowRef.current) glowRef.current.style.background = 'none'
  }

  return (
    <div
      ref={containerRef}
      className="glass-card-container"
    >
      <div
        ref={cardRef}
        className="glass-card-wrapper"
        style={{ top: `calc(-5vh + ${index * 25}px)` }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Electric conic-gradient border */}
        <div
          className="glass-card-border"
          style={{
            opacity: hovered ? 0.8 : 0.2,
            background: `conic-gradient(
              from 0deg,
              transparent 0deg,
              ${category.accent} 60deg,
              ${category.accent.replace('0.', '0.')} 120deg,
              transparent 180deg,
              ${category.accent} 240deg,
              transparent 360deg
            )`,
          }}
        />

        {/* Glass card body — pushed BACK on hover for depth */}
        <div
          ref={bodyRef}
          className={`glass-card-body${hovered ? ' glass-card-body--hovered' : ''}`}
        >
          {/* Cursor-following radial glow */}
          <div ref={glowRef} className="glass-card-glow" />

          {/* Glass reflection overlay */}
          <div className="glass-reflection" />

          {/* Top shine line */}
          <div className="glass-shine" />

          {/* Left side edge reflection */}
          <div className="glass-side-reflection" />

          {/* Frosted glass texture */}
          <div className="glass-frosted-texture" />
        </div>

        {/* Card content — floats FORWARD on hover for 3D parallax */}
        <div ref={contentRef} className="glass-card-content">
          <div className="glass-card-header">
            <div className="glass-card-icon">
              <i className={category.icon} />
            </div>
            <div className="glass-card-title-row">
              <h3>{category.title}</h3>
              <span className="glass-card-count">{category.count}</span>
            </div>
          </div>

          <div className="glass-card-separator" />

          <div className="glass-card-chips">
            {category.items.map((item) => (
              <span key={item} className="glass-chip">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════
   MAIN SKILLS SHOWCASE
   ═══════════════════════════════════════════ */
export default function SkillsShowcase() {
  return (
    <div className="sk-section-stack">
      <style>{skillsStyles}</style>

      <div className="sk-header">
        <span className="section-label">What I Work With</span>
        <h2>Skills & <span className="accent-text">Technologies</span></h2>
        <p className="sk-subtitle">The stack I use to ship clean, reliable products</p>
      </div>

      <LogoTicker />

      <div className="glass-cards-section">
        {skillCategories.map((cat, i) => (
          <GlassSkillCard
            key={cat.title}
            category={cat}
            index={i}
            totalCards={skillCategories.length}
          />
        ))}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════
   STYLES
   ═══════════════════════════════════════════ */
const skillsStyles = `
  /* ── Section — TRANSPARENT so particles show through ── */
  .sk-section-stack {
    position: relative;
    z-index: 1;
    background: transparent;
  }

  /* ── Header ── */
  .sk-header {
    text-align: center;
    padding: 5rem 2rem 1rem;
    position: relative;
    z-index: 2;
  }

  .sk-subtitle {
    color: var(--text-secondary);
    margin-top: 0.6rem;
    max-width: 460px;
    margin-left: auto;
    margin-right: auto;
    font-size: 0.9rem;
    line-height: 1.6;
  }

  /* ═══ LOGO TICKER ═══ */
  .sk-ticker {
    width: 100%;
    overflow: hidden;
    padding: 1.2rem 0;
    position: relative;
    z-index: 2;
    cursor: pointer;
    mask-image: linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%);
    -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }

  .ticker-inner {
    display: flex;
    gap: 0;
    width: max-content;
    will-change: transform;
  }

  .ticker-logo {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.4rem 2rem;
    white-space: nowrap;
    transition: opacity 0.3s;
  }

  .ticker-logo img {
    width: 28px;
    height: 28px;
    flex-shrink: 0;
    filter: grayscale(0.4) brightness(0.85);
    transition: filter 0.3s, transform 0.3s;
  }

  .ticker-logo:hover img {
    filter: grayscale(0) brightness(1.1) drop-shadow(0 0 6px rgba(201,168,124,0.4));
    transform: scale(1.15);
  }

  .ticker-logo span {
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--text-secondary);
    letter-spacing: 0.02em;
    transition: color 0.3s;
  }

  .ticker-logo:hover span {
    color: var(--accent);
  }

  /* ═══════════════════════════════════════════
     STACKING GLASS CARDS
     Matches the glass-cards reference animation:
     sticky containers, depth-scaling, frosted glass
     ═══════════════════════════════════════════ */
  .glass-cards-section {
    position: relative;
    padding-bottom: 4rem;
  }

  /* Each card lives inside a 100vh sticky container */
  .glass-card-container {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: sticky;
    top: 0;
  }

  /* Card itself — 3D transform context.
     perspective on the wrapper enables translateZ
     depth for children (body pushed back, content forward) */
  .glass-card-wrapper {
    position: relative;
    width: 70%;
    max-width: 720px;
    height: 450px;
    border-radius: 24px;
    isolation: isolate;
    transform-style: preserve-3d;
    perspective: 1000px;
    cursor: pointer;
    will-change: transform;
    transform-origin: center center;
  }

  /* ── Electric border (from reference) ── */
  .glass-card-border {
    position: absolute;
    inset: -3px;
    border-radius: 27px;
    padding: 3px;
    z-index: -1;
    transition: opacity 0.5s ease;
  }

  /* ── Glass card body — frosted glass surface
     This layer gets pushed BACK (translateZ -20px)
     on hover for depth separation from content ── */
  .glass-card-body {
    position: absolute;
    inset: 0;
    border-radius: 24px;
    background: linear-gradient(
      145deg,
      rgba(255, 255, 255, 0.08) 0%,
      rgba(255, 255, 255, 0.04) 50%,
      rgba(255, 255, 255, 0.02) 100%
    );
    backdrop-filter: blur(25px) saturate(180%);
    -webkit-backdrop-filter: blur(25px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.35),
      0 2px 8px rgba(0, 0, 0, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.15),
      inset 0 -1px 0 rgba(255, 255, 255, 0.05);
    overflow: hidden;
    transition: border-color 0.4s ease, box-shadow 0.4s ease;
    transform-style: preserve-3d;
    will-change: transform;
  }

  .glass-card-body--hovered {
    border-color: rgba(255, 255, 255, 0.22);
    box-shadow:
      0 30px 80px rgba(0, 0, 0, 0.5),
      0 4px 12px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.25),
      inset 0 -1px 0 rgba(255, 255, 255, 0.1);
  }

  /* ── Cursor-following glow ── */
  .glass-card-glow {
    position: absolute;
    inset: 0;
    border-radius: 24px;
    pointer-events: none;
    z-index: 0;
    transition: background 0.15s ease;
  }

  /* ── Glass reflection overlay (from reference)
     Covers top 60%, diagonal gradient ── */
  .glass-reflection {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 60%;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.12) 0%,
      rgba(255, 255, 255, 0.05) 50%,
      transparent 100%
    );
    pointer-events: none;
    border-radius: 24px 24px 0 0;
  }

  /* ── Top shine line (from reference)
     Thin bright line across top edge ── */
  .glass-shine {
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(201, 168, 124, 0.25) 25%,
      rgba(255, 255, 255, 0.35) 50%,
      rgba(201, 168, 124, 0.25) 75%,
      transparent 100%
    );
    border-radius: 1px;
    pointer-events: none;
  }

  /* ── Side edge reflection (from reference)
     Thin bright line down left edge ── */
  .glass-side-reflection {
    position: absolute;
    top: 0;
    left: 0;
    width: 1px;
    height: 100%;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.15) 0%,
      rgba(255, 255, 255, 0.05) 30%,
      transparent 60%
    );
    border-radius: 24px 0 0 24px;
    pointer-events: none;
  }

  /* ── Frosted glass texture (from reference)
     Subtle dot pattern simulating frosted surface ── */
  .glass-frosted-texture {
    position: absolute;
    inset: 0;
    background-image:
      radial-gradient(circle at 20% 30%, rgba(255,255,255,0.06) 1px, transparent 2px),
      radial-gradient(circle at 80% 70%, rgba(255,255,255,0.04) 1px, transparent 2px),
      radial-gradient(circle at 40% 80%, rgba(255,255,255,0.03) 1px, transparent 2px);
    background-size: 30px 30px, 25px 25px, 35px 35px;
    pointer-events: none;
    border-radius: 24px;
    opacity: 0.6;
  }

  /* ── Card content — floats FORWARD (translateZ 40px)
     on hover for 3D parallax depth against the glass body ── */
  .glass-card-content {
    position: absolute;
    inset: 0;
    z-index: 2;
    display: flex;
    flex-direction: column;
    padding: 2.5rem 3rem;
    pointer-events: none;
    transform-style: preserve-3d;
    will-change: transform;
  }

  /* Re-enable pointer events on interactive children */
  .glass-card-chips { pointer-events: auto; }

  .glass-card-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.2rem;
  }

  .glass-card-icon {
    width: 50px;
    height: 50px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: var(--accent-glow);
    border: 1px solid var(--border);
  }

  .glass-card-icon i {
    font-size: 1.4rem;
    color: var(--accent);
  }

  .glass-card-title-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
  }

  .glass-card-title-row h3 {
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0;
  }

  .glass-card-count {
    font-size: 1.15rem;
    font-weight: 800;
    color: var(--accent);
    opacity: 0.3;
  }

  .glass-card-separator {
    height: 1px;
    width: 100%;
    margin-bottom: 1.4rem;
    background: linear-gradient(90deg, transparent, var(--border), transparent);
  }

  .glass-card-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    flex: 1;
    align-content: flex-start;
  }

  .glass-chip {
    display: inline-flex;
    align-items: center;
    padding: 0.5rem 1.1rem;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 10px;
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--text-primary);
    cursor: default;
    transition: all var(--transition);
  }

  .glass-chip:hover {
    border-color: var(--accent);
    background: var(--accent-glow);
    color: var(--accent);
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
  }

  /* ═══ RESPONSIVE ═══ */
  @media (max-width: 768px) {
    .sk-header { padding: 3rem 1.5rem 0.5rem; }

    .glass-card-wrapper {
      width: 88%;
      height: 380px;
    }

    .glass-card-content { padding: 1.8rem 2rem; }
    .glass-card-icon { width: 44px; height: 44px; border-radius: 12px; }
    .glass-card-icon i { font-size: 1.2rem; }
    .glass-card-title-row h3 { font-size: 1.15rem; }
    .glass-chip { padding: 0.4rem 0.85rem; font-size: 0.8rem; }

    .ticker-logo { padding: 0.4rem 1.4rem; }
    .ticker-logo img { width: 24px; height: 24px; }
    .ticker-logo span { font-size: 0.72rem; }
  }

  @media (max-width: 480px) {
    .glass-card-wrapper {
      width: 92%;
      height: 320px;
    }

    .glass-card-content { padding: 1.4rem 1.5rem; }
    .glass-card-icon { width: 40px; height: 40px; }
    .glass-card-title-row h3 { font-size: 1.05rem; }
    .glass-chip { padding: 0.38rem 0.75rem; font-size: 0.74rem; }
  }

  /* ═══ REDUCED MOTION ═══ */
  @media (prefers-reduced-motion: reduce) {
    .glass-card-wrapper { transform: none !important; transition: opacity 0.3s ease !important; }
    .ticker-inner { animation: none !important; }
  }

  /* ═══════════════════════════════════════════
     LIGHT MODE OVERRIDES
     Glass cards become white-glass with visible
     borders and warm shadows instead of dark glass
     ═══════════════════════════════════════════ */
  [data-theme="light"] .glass-card-body {
    background: linear-gradient(
      145deg,
      rgba(255, 255, 255, 0.85) 0%,
      rgba(255, 255, 255, 0.75) 50%,
      rgba(255, 255, 255, 0.7) 100%
    );
    border-color: var(--border);
    box-shadow:
      0 8px 32px rgba(28,25,23,0.08),
      0 2px 8px rgba(28,25,23,0.04),
      inset 0 1px 0 rgba(255, 255, 255, 0.9),
      inset 0 -1px 0 rgba(255, 255, 255, 0.4);
  }

  [data-theme="light"] .glass-card-body--hovered {
    border-color: var(--border-hover);
    box-shadow:
      0 30px 80px rgba(28,25,23,0.12),
      0 4px 12px rgba(28,25,23,0.06),
      inset 0 1px 0 rgba(255, 255, 255, 1),
      inset 0 -1px 0 rgba(255, 255, 255, 0.6);
  }

  [data-theme="light"] .glass-reflection {
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.6) 0%,
      rgba(255, 255, 255, 0.2) 50%,
      transparent 100%
    );
  }

  [data-theme="light"] .glass-shine {
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(146, 64, 14, 0.12) 25%,
      rgba(255, 255, 255, 0.5) 50%,
      rgba(146, 64, 14, 0.12) 75%,
      transparent 100%
    );
  }

  [data-theme="light"] .glass-side-reflection {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.7) 0%, transparent 60%);
  }

  [data-theme="light"] .glass-frosted-texture {
    opacity: 0.3;
  }

  [data-theme="light"] .glass-chip {
    background: rgba(28, 25, 23, 0.04);
    border-color: var(--border);
    color: var(--text-primary);
  }

  [data-theme="light"] .glass-chip:hover {
    background: var(--accent-glow);
    border-color: var(--accent);
    color: var(--accent);
  }

  [data-theme="light"] .glass-card-icon {
    border-color: var(--border);
  }

  [data-theme="light"] .ticker-logo img {
    filter: grayscale(0.3) brightness(0.9);
  }

  [data-theme="light"] .ticker-logo:hover img {
    filter: grayscale(0) brightness(1) drop-shadow(0 0 6px rgba(146,64,14,0.3));
  }
`
