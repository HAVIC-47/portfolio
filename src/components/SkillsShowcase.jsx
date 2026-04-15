import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ── Skill categories ── */
const skillCategories = [
  {
    title: 'Languages',
    icon: 'ri-code-s-slash-line',
    items: ['C', 'C++', 'Python', 'JavaScript', 'Java'],
    accent: 'rgba(201,168,124,0.7)',
  },
  {
    title: 'Frameworks',
    icon: 'ri-stack-line',
    items: ['Next.js', 'React', 'Django', 'Bootstrap', 'Node.js'],
    accent: 'rgba(201,168,124,0.6)',
  },
  {
    title: 'Tools & Databases',
    icon: 'ri-tools-line',
    items: [
      'SQLite', 'MySQL', 'PostgreSQL', 'Git', 'Linux', 'Markdown',
      'GSAP', 'Figma', 'Vercel', 'MongoDB', 'Anaconda',
      'TensorFlow', 'PyTorch', 'NumPy', 'Jupyter Notebook', 'VS Code',
    ],
    accent: 'rgba(201,168,124,0.55)',
  },
  {
    title: 'Fundamentals',
    icon: 'ri-lightbulb-line',
    items: [
      'OOP', 'Data Structures', 'Algorithms', 'System Design & Development',
      'DevOps', 'Development Methodologies', 'Operating Systems',
      'AI / ML', 'Robotics & Peripherals', 'UI / UX', 'Compiler Design',
      'Vectors & Computer Graphics', 'Computer Networks', 'VLSI',
    ],
    accent: 'rgba(201,168,124,0.65)',
  },
].map(c => ({ ...c, count: c.items.length }))

/* ── Tech logos for the rotating globe ── */
const techLogos = [
  { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Django', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
  { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
  { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
  { name: 'Vercel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg' },
  { name: 'Anaconda', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/anaconda/anaconda-original.svg' },
  { name: 'TensorFlow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
  { name: 'PyTorch', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
  { name: 'NumPy', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg' },
  { name: 'Jupyter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg' },
  { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
  { name: 'PyCharm', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pycharm/pycharm-original.svg' },
]

/* ═══════════════════════════════════════════
   TECH GLOBE — Fibonacci-distributed icons on a
   3D rotating sphere. Auto-rotate around Y, drag
   to spin, depth-based scale + opacity, hover
   tooltip with tech name.
   ═══════════════════════════════════════════ */
function TechGlobe() {
  const stageRef = useRef(null)
  const nodeRefs = useRef([])
  const meridianRefs = useRef([])
  const parallelRefs = useRef([])
  const rotRef = useRef({ x: -0.25, y: 0 })
  const targetRef = useRef({ x: -0.25, y: 0 })
  const draggingRef = useRef(false)
  const hoverRef = useRef(false)
  const lastPosRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef(0)
  const [hovered, setHovered] = useState(null)
  const [radius, setRadius] = useState(180)
  const [stageSize, setStageSize] = useState(520)

  // Wireframe sphere geometry (unit-sphere points)
  // Dense mesh: 16 meridians + 11 parallels + 16 perpendicular meridians
  // = diamond-tile lattice across the surface.
  const MERIDIAN_COUNT = 16
  const MERIDIAN_SEGMENTS = 40
  const PARALLEL_COUNT = 11
  const PARALLEL_SEGMENTS = 56

  const meridians = useMemo(() => {
    const build = (axisSwap) => (
      Array.from({ length: MERIDIAN_COUNT }, (_, m) => {
        const lng = (m / MERIDIAN_COUNT) * Math.PI * 2
        const pts = []
        for (let i = 0; i <= MERIDIAN_SEGMENTS; i++) {
          const lat = (i / MERIDIAN_SEGMENTS) * Math.PI - Math.PI / 2
          const cl = Math.cos(lat)
          const x = Math.cos(lng) * cl
          const y = Math.sin(lat)
          const z = Math.sin(lng) * cl
          // axisSwap=true rotates this family 90° around Z so its "poles"
          // sit on the equator — produces the crossing diamond lattice.
          pts.push(axisSwap ? [y, x, z] : [x, y, z])
        }
        return pts
      })
    )
    return [...build(false), ...build(true)]
  }, [])

  const parallels = useMemo(() => {
    return Array.from({ length: PARALLEL_COUNT }, (_, p) => {
      const lat = ((p + 1) / (PARALLEL_COUNT + 1)) * Math.PI - Math.PI / 2
      const y = Math.sin(lat)
      const r = Math.cos(lat)
      const pts = []
      for (let i = 0; i <= PARALLEL_SEGMENTS; i++) {
        const t = (i / PARALLEL_SEGMENTS) * Math.PI * 2
        pts.push([Math.cos(t) * r, y, Math.sin(t) * r])
      }
      return pts
    })
  }, [])

  // Fibonacci sphere positions (unit sphere)
  const points = useMemo(() => {
    const N = techLogos.length
    const phi = Math.PI * (Math.sqrt(5) - 1)
    return techLogos.map((tech, i) => {
      const y = 1 - (i / (N - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      const theta = phi * i
      return { ...tech, ux: Math.cos(theta) * r, uy: y, uz: Math.sin(theta) * r }
    })
  }, [])

  // Responsive radius
  useEffect(() => {
    const compute = () => {
      const w = stageRef.current?.clientWidth || 480
      setStageSize(w)
      setRadius(Math.min(180, Math.max(110, w * 0.33)))
    }
    compute()
    window.addEventListener('resize', compute)
    return () => window.removeEventListener('resize', compute)
  }, [])

  // rAF rotation loop
  useEffect(() => {
    const reduceMq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const tick = () => {
      if (!draggingRef.current && !hoverRef.current && !reduceMq.matches) {
        targetRef.current.y += 0.009 // auto-rotate
      }
      rotRef.current.x += (targetRef.current.x - rotRef.current.x) * 0.08
      rotRef.current.y += (targetRef.current.y - rotRef.current.y) * 0.08

      const cx = Math.cos(rotRef.current.x), sx = Math.sin(rotRef.current.x)
      const cy = Math.cos(rotRef.current.y), sy = Math.sin(rotRef.current.y)

      const rotate = (ux, uy, uz) => {
        const x1 = ux * cy + uz * sy
        const z1 = -ux * sy + uz * cy
        const y2 = uy * cx - z1 * sx
        const z2 = uy * sx + z1 * cx
        return [x1, y2, z2]
      }

      points.forEach((p, i) => {
        const [x1, y2, z2] = rotate(p.ux, p.uy, p.uz)
        const depth = (z2 + 1) / 2 // 0 (back) → 1 (front)
        const scale = 0.55 + depth * 0.55
        const opacity = 0.35 + depth * 0.65
        const node = nodeRefs.current[i]
        if (node) {
          node.style.transform =
            `translate3d(${x1 * radius}px, ${y2 * radius}px, 0) translate(-50%, -50%) scale(${scale})`
          node.style.opacity = opacity
          node.style.zIndex = String(Math.round(depth * 100))
          node.style.filter = `blur(${(1 - depth) * 0.6}px)`
        }
      })

      // Update wireframe meridians (split into front/back halves for depth fade)
      meridians.forEach((pts, mi) => {
        const path = meridianRefs.current[mi]
        if (!path) return
        let d = ''
        let depthSum = 0
        for (let i = 0; i < pts.length; i++) {
          const [x, y, z] = rotate(pts[i][0], pts[i][1], pts[i][2])
          d += (i === 0 ? 'M' : 'L') + (x * radius).toFixed(1) + ' ' + (y * radius).toFixed(1) + ' '
          depthSum += z
        }
        const avgDepth = (depthSum / pts.length + 1) / 2
        path.setAttribute('d', d)
        path.style.opacity = String(0.12 + avgDepth * 0.5)
      })

      parallels.forEach((pts, pi) => {
        const path = parallelRefs.current[pi]
        if (!path) return
        let d = ''
        let depthSum = 0
        for (let i = 0; i < pts.length; i++) {
          const [x, y, z] = rotate(pts[i][0], pts[i][1], pts[i][2])
          d += (i === 0 ? 'M' : 'L') + (x * radius).toFixed(1) + ' ' + (y * radius).toFixed(1) + ' '
          depthSum += z
        }
        const avgDepth = (depthSum / pts.length + 1) / 2
        path.setAttribute('d', d)
        path.style.opacity = String(0.1 + avgDepth * 0.4)
      })
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [points, meridians, parallels, radius])

  // Pointer drag handlers
  const onPointerDown = (e) => {
    draggingRef.current = true
    lastPosRef.current = { x: e.clientX, y: e.clientY }
    stageRef.current?.setPointerCapture?.(e.pointerId)
  }
  const onPointerMove = (e) => {
    if (!draggingRef.current) return
    const dx = e.clientX - lastPosRef.current.x
    const dy = e.clientY - lastPosRef.current.y
    targetRef.current.y += dx * 0.006
    targetRef.current.x += dy * 0.006
    targetRef.current.x = Math.max(-1.1, Math.min(1.1, targetRef.current.x))
    lastPosRef.current = { x: e.clientX, y: e.clientY }
  }
  const onPointerUp = (e) => {
    draggingRef.current = false
    stageRef.current?.releasePointerCapture?.(e.pointerId)
  }

  return (
    <div className="tg-wrap">
      <div className="tg-glow tg-glow--a" aria-hidden />
      <div className="tg-glow tg-glow--b" aria-hidden />
      <div
        ref={stageRef}
        className="tg-stage"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={(e) => { onPointerUp(e); hoverRef.current = false }}
        onPointerEnter={() => { hoverRef.current = true }}
        role="img"
        aria-label="Rotating sphere of technologies I work with"
      >
        <svg
          className="tg-wire"
          viewBox={`${-stageSize / 2} ${-stageSize / 2} ${stageSize} ${stageSize}`}
          aria-hidden
        >
          <circle cx="0" cy="0" r={radius} className="tg-wire-rim" />
          {parallels.map((_, i) => (
            <path
              key={`par-${i}`}
              ref={(el) => (parallelRefs.current[i] = el)}
              className="tg-wire-line"
              fill="none"
            />
          ))}
          {meridians.map((_, i) => (
            <path
              key={`mer-${i}`}
              ref={(el) => (meridianRefs.current[i] = el)}
              className="tg-wire-line"
              fill="none"
            />
          ))}
        </svg>
        <div className="tg-globe">
          {points.map((p, i) => (
            <div
              key={p.name}
              ref={(el) => (nodeRefs.current[i] = el)}
              className="tg-node"
              onMouseEnter={() => setHovered(p.name)}
              onMouseLeave={() => setHovered(h => (h === p.name ? null : h))}
            >
              <img src={p.icon} alt={p.name} draggable={false} />
            </div>
          ))}
        </div>
        <AnimatePresence>
          {hovered && (
            <motion.div
              key={hovered}
              className="tg-tip"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.18 }}
            >
              {hovered}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <p className="tg-hint">Drag to spin · hover a logo</p>
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

      <TechGlobe />

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

  /* ═══ TECH GLOBE ═══ */
  .tg-wrap {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 640px;
    margin: 2.2rem auto 3rem;
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
  }

  .tg-stage {
    position: relative;
    width: 100%;
    max-width: 560px;
    aspect-ratio: 1 / 1;
    touch-action: none;
    cursor: grab;
    user-select: none;
    -webkit-user-select: none;
  }
  .tg-stage:active { cursor: grabbing; }

  .tg-glow {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 70%;
    aspect-ratio: 1;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    filter: blur(44px);
    opacity: 0.55;
    z-index: 0;
  }
  .tg-glow--a { background: radial-gradient(circle, var(--accent-glow) 0%, transparent 70%); }
  .tg-glow--b {
    width: 42%;
    background: radial-gradient(circle, var(--accent-glow) 0%, transparent 65%);
    opacity: 0.7;
    animation: tgPulse 5.5s ease-in-out infinite;
  }
  @keyframes tgPulse {
    0%, 100% { opacity: 0.45; }
    50% { opacity: 0.8; }
  }

  .tg-globe {
    position: absolute;
    inset: 0;
    transform-style: preserve-3d;
  }

  .tg-wire {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: visible;
  }
  .tg-wire-rim {
    fill: none;
    stroke: var(--accent);
    stroke-width: 1;
    opacity: 0.35;
  }
  .tg-wire-line {
    stroke: var(--accent);
    stroke-width: 0.9;
    vector-effect: non-scaling-stroke;
    stroke-linecap: round;
    stroke-linejoin: round;
    will-change: opacity;
  }
  [data-theme="light"] .tg-wire-rim { opacity: 0.5; }
  [data-theme="light"] .tg-wire-line { stroke-width: 1; }

  .tg-node {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 46px;
    height: 46px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    box-shadow: 0 6px 18px rgba(0,0,0,0.28);
    cursor: pointer;
    will-change: transform, opacity, filter;
    transition: border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
  }
  .tg-node:hover {
    border-color: var(--accent);
    background: var(--bg-card-hover, var(--bg-card));
    box-shadow: 0 10px 26px var(--accent-glow), 0 4px 12px rgba(0,0,0,0.3);
  }
  .tg-node img {
    width: 60%;
    height: 60%;
    object-fit: contain;
    pointer-events: none;
    -webkit-user-drag: none;
  }

  .tg-tip {
    position: absolute;
    left: 50%;
    bottom: 8%;
    transform: translateX(-50%);
    padding: 6px 14px;
    border-radius: 999px;
    background: var(--bg-card);
    border: 1px solid var(--accent);
    color: var(--text-primary);
    font-family: var(--font-mono);
    font-size: 0.74rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    pointer-events: none;
    z-index: 100;
    box-shadow: 0 8px 22px var(--accent-glow);
  }

  .tg-hint {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--text-secondary);
    opacity: 0.6;
    margin: 0;
  }

  [data-theme="light"] .tg-node {
    box-shadow: 0 6px 18px rgba(60,40,15,0.1);
  }
  [data-theme="light"] .tg-node:hover {
    box-shadow: 0 10px 26px var(--accent-glow), 0 4px 12px rgba(60,40,15,0.14);
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

    .tg-node { width: 40px; height: 40px; border-radius: 10px; }
    .tg-tip { font-size: 0.68rem; padding: 5px 11px; }
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
    .tg-glow--b { animation: none !important; }
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

`
