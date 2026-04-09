import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */

const projects = [
  {
    id: 'noteswap',
    title: 'NoteSwap',
    category: 'EdTech',
    desc: 'A student-focused web app for sharing and exchanging academic notes. Built to solve a real problem — helping university students access quality study material from peers.',
    tags: ['Python', 'Django', 'CSS', 'Web App'],
    color: '#4f6ef7',
    link: 'https://github.com/HAVIC-47/final_NoteSwap',
  },
  {
    id: 'noteswap2',
    title: 'NoteSwap 2.0',
    category: 'EdTech',
    desc: 'The evolved version with improved UX, better architecture, and refined features. Built from lessons learned — cleaner code, smoother experience.',
    tags: ['Python', 'Django', 'Web App', 'Iteration'],
    color: '#7c4dff',
    link: 'https://github.com/HAVIC-47/Updated_NoteSwap',
  },
  {
    id: 'eventease',
    title: 'EventEase',
    category: 'SaaS',
    desc: 'An event management platform for organizing, tracking, and managing events. Clean UI with intuitive flows for creating and discovering events.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    color: '#10b981',
    link: 'https://github.com/HAVIC-47/EventEase',
  },
  {
    id: 'rootreach',
    title: 'RootReach',
    category: 'E-Commerce',
    desc: 'An e-commerce platform connecting local producers directly with consumers. Bridging the gap between small businesses and their customers through technology.',
    tags: ['Python', 'Django', 'E-Commerce'],
    color: '#f59e0b',
    link: 'https://github.com/HAVIC-47',
  },
  {
    id: 'machinestrike',
    title: 'Machine Strike',
    category: 'Board Game · AI',
    desc: 'Recreation of the Horizon Forbidden West board game with minimax and alpha-beta pruning AI. A deep dive into game theory and adversarial search algorithms.',
    tags: ['Python', 'AI', 'Minimax', 'Game Dev'],
    color: '#ef4444',
    link: 'https://github.com/HAVIC-47/Machine-Strike',
  },
]

const screenVariants = [
  ['cards', 'form', 'detail'],
  ['dash', 'cards', 'form'],
  ['cards', 'form', 'dash'],
  ['cards', 'detail', 'form'],
  ['board', 'detail', 'dash'],
]

/* ═══════════════════════════════════════════
   MOCK SCREEN
   ═══════════════════════════════════════════ */

function MockScreen({ color, variant }) {
  return (
    <div className={`ps-screen ps-screen--${variant}`} style={{ '--pc': color }}>
      <div className="ps-screen-bar">
        <span className="ps-dot" />
        <span className="ps-dot" />
        <span className="ps-dot" />
        <div className="ps-bar-url" />
      </div>
      <div className="ps-screen-body">
        {variant === 'cards' && (
          <>
            <div className="ps-sb-row">
              <div className="ps-sb-card" />
              <div className="ps-sb-card" />
            </div>
            <div className="ps-sb-row">
              <div className="ps-sb-card" />
              <div className="ps-sb-card" />
            </div>
          </>
        )}
        {variant === 'form' && (
          <>
            <div className="ps-sb-input" />
            <div className="ps-sb-input" />
            <div className="ps-sb-textarea" />
            <div className="ps-sb-btn" />
          </>
        )}
        {variant === 'dash' && (
          <>
            <div className="ps-sb-stats">
              <div className="ps-sb-stat" />
              <div className="ps-sb-stat" />
              <div className="ps-sb-stat" />
            </div>
            <div className="ps-sb-chart" />
          </>
        )}
        {variant === 'board' && (
          <div className="ps-sb-board">
            {Array.from({ length: 64 }, (_, i) => (
              <div
                key={i}
                className={`ps-sb-cell${[0, 9, 18, 27, 36, 45, 54, 63, 7, 14, 21, 28].includes(i) ? ' ps-sb-cell--active' : ''}`}
              />
            ))}
          </div>
        )}
        {variant === 'detail' && (
          <>
            <div className="ps-sb-hero" />
            <div className="ps-sb-lines">
              <div />
              <div />
              <div className="short" />
            </div>
            <div className="ps-sb-btn" />
          </>
        )}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════
   TIMELINE CONSTANTS
   ═══════════════════════════════════════════ */
const GRID_END = 0.14
const SLOT = (1 - GRID_END) / projects.length
const TRANS = 0.055

/* ═══════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════ */

export default function ProjectShowcase() {
  const sectionRef = useRef(null)
  const stRef = useRef(null)
  const rippleTweens = useRef({})

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=500%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      })

      stRef.current = tl.scrollTrigger

      /* ═══════════════════════════════════════
         PHASE 1: Grid → Expanded (water ripple swish)
         ═══════════════════════════════════════ */

      const rippleDisplace = sectionRef.current.querySelector('.ps-ripple-displace')

      // Header dissolves upward
      tl.to('.ps-grid-header', {
        yPercent: -150,
        autoAlpha: 0,
        duration: 0.035,
        ease: 'power2.in',
      }, 0.008)

      // ── Ripple rings expand from grid center ──
      tl.fromTo('.ps-ripple-ring-1', {
        scale: 0, autoAlpha: 0.7,
      }, {
        scale: 6, autoAlpha: 0,
        duration: 0.09,
        ease: 'power1.out',
      }, 0.02)
      tl.fromTo('.ps-ripple-ring-2', {
        scale: 0, autoAlpha: 0.5,
      }, {
        scale: 8, autoAlpha: 0,
        duration: 0.10,
        ease: 'power1.out',
      }, 0.03)
      tl.fromTo('.ps-ripple-ring-3', {
        scale: 0, autoAlpha: 0.3,
      }, {
        scale: 10, autoAlpha: 0,
        duration: 0.10,
        ease: 'power1.out',
      }, 0.04)

      // ── SVG water displacement: ramp up then settle ──
      if (rippleDisplace) {
        tl.fromTo(rippleDisplace, {
          attr: { scale: 0 },
        }, {
          attr: { scale: 45 },
          duration: 0.04,
          ease: 'power2.in',
        }, 0.02)
        tl.to(rippleDisplace, {
          attr: { scale: 0 },
          duration: 0.05,
          ease: 'power2.out',
        }, 0.06)
      }

      // ── Card 0: expand in-place into hero slide ──
      tl.to('.ps-card-0', {
        scale: 1.08,
        autoAlpha: 0.6,
        filter: 'url(#ps-ripple)',
        duration: 0.04,
        ease: 'power2.in',
      }, 0.02)
      tl.to('.ps-card-0', {
        scale: 1.15,
        autoAlpha: 0,
        duration: 0.04,
        ease: 'power2.out',
      }, 0.06)

      // ── Cards 1–4: water-swish right → bookmark positions ──
      for (let i = 1; i < projects.length; i++) {
        const idx = i - 1
        const stagger = idx * 0.008

        // Apply SVG ripple filter during movement
        tl.set(`.ps-card-${i}`, { filter: 'url(#ps-ripple)' }, 0.02 + stagger)

        // Horizontal skew: water-drag distortion
        tl.to(`.ps-card-${i}`, {
          skewX: -14,
          scaleX: 1.15,
          scaleY: 0.92,
          duration: 0.035,
          ease: 'power2.in',
        }, 0.02 + stagger)

        // Settle skew back while moving to final position
        tl.to(`.ps-card-${i}`, {
          skewX: 0,
          scaleX: 1,
          scaleY: 1,
          duration: 0.04,
          ease: 'power2.out',
        }, 0.055 + stagger)

        // Physical movement: shrink + fly right to bookmark slot
        tl.to(`.ps-card-${i}`, {
          width: '116px',
          height: '66px',
          x: () => {
            const card = document.querySelector(`.ps-card-${i}`)
            if (!card) return 0
            const rect = card.getBoundingClientRect()
            return window.innerWidth - 122 - rect.left
          },
          y: () => {
            const card = document.querySelector(`.ps-card-${i}`)
            if (!card) return 0
            const rect = card.getBoundingClientRect()
            const centerY = window.innerHeight * 0.5
            const totalBookmarks = projects.length
            const totalHeight = totalBookmarks * 66 + (totalBookmarks - 1) * 5
            const startY = centerY - totalHeight / 2
            return startY + i * (66 + 5) - rect.top
          },
          borderRadius: '14px 0 0 14px',
          duration: 0.07,
          ease: 'power3.inOut',
        }, 0.025 + stagger)

        // Fade card content (meta text) during morph
        tl.to(`.ps-card-${i} .ps-card-meta`, {
          autoAlpha: 0,
          duration: 0.025,
          ease: 'power2.in',
        }, 0.02 + stagger)

        tl.to(`.ps-card-${i} .ps-card-preview`, {
          autoAlpha: 0,
          duration: 0.03,
          ease: 'power2.in',
        }, 0.03 + stagger)

        // Remove filter after settling
        tl.set(`.ps-card-${i}`, { filter: 'none' }, 0.10 + stagger)
      }

      // ── Crossfade: grid out, expanded in ──
      tl.to('.ps-grid', {
        autoAlpha: 0,
        duration: 0.015,
      }, 0.10)

      tl.to('.ps-expanded', {
        autoAlpha: 1,
        duration: 0.025,
        ease: 'power2.out',
      }, 0.10)

      // Slide 0 emerges from where card 0 was
      tl.fromTo('.ps-slide-0', {
        autoAlpha: 0,
        scale: 0.96,
      }, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.03,
        ease: 'power2.out',
      }, 0.10)

      // ── Bookmarks appear exactly where cards landed ──
      projects.forEach((_, i) => {
        tl.fromTo(`.ps-bm-${i}`, {
          autoAlpha: 0,
          x: 20,
        }, {
          autoAlpha: 1,
          x: 0,
          duration: 0.02,
          ease: 'power2.out',
        }, 0.105 + i * 0.004)
      })

      tl.fromTo('.ps-bm-0 .ps-bm-indicator', {
        scaleY: 0,
      }, {
        scaleY: 1,
        duration: 0.02,
      }, 0.13)

      /* ═══════════════════════════════════════
         PHASE 2: Project-to-project transitions
         ═══════════════════════════════════════ */

      for (let i = 1; i < projects.length; i++) {
        const tStart = GRID_END + i * SLOT - TRANS

        // Outgoing: text fades instantly, then card shrinks out
        tl.to(`.ps-slide-${i - 1} .ps-slide-detail`, {
          autoAlpha: 0,
          duration: TRANS * 0.25,
          ease: 'power2.in',
        }, tStart)
        tl.to(`.ps-slide-${i - 1}`, {
          xPercent: 50,
          scale: 0.6,
          autoAlpha: 0,
          duration: TRANS * 0.6,
          ease: 'power3.in',
        }, tStart)

        // Incoming: card grows in from right
        tl.fromTo(`.ps-slide-${i}`, {
          xPercent: 60,
          scale: 0.65,
          autoAlpha: 0,
        }, {
          xPercent: 0,
          scale: 1,
          autoAlpha: 1,
          duration: TRANS,
          ease: 'power3.out',
        }, tStart + TRANS * 0.35)

        // Incoming text fades in after card
        tl.fromTo(`.ps-slide-${i} .ps-slide-detail`, {
          autoAlpha: 0,
          y: 15,
        }, {
          autoAlpha: 1,
          y: 0,
          duration: TRANS * 0.6,
          ease: 'power2.out',
        }, tStart + TRANS * 0.55)

        // Bookmark indicator transitions
        tl.to(`.ps-bm-${i - 1} .ps-bm-indicator`, {
          scaleY: 0,
          duration: TRANS * 0.4,
          ease: 'power2.in',
        }, tStart)

        tl.fromTo(`.ps-bm-${i - 1}`, { scale: 1 }, {
          scale: 0.95,
          duration: TRANS * 0.5,
          ease: 'power2.in',
        }, tStart)
        tl.to(`.ps-bm-${i - 1}`, {
          scale: 1,
          duration: TRANS * 0.5,
          ease: 'power2.out',
        }, tStart + TRANS * 0.5)

        tl.fromTo(`.ps-bm-${i}`, { scale: 1 }, {
          scale: 1.08,
          duration: TRANS * 0.5,
          ease: 'power2.out',
        }, tStart + TRANS * 0.2)
        tl.to(`.ps-bm-${i}`, {
          scale: 1,
          duration: TRANS * 0.5,
          ease: 'power2.inOut',
        }, tStart + TRANS * 0.7)

        tl.fromTo(`.ps-bm-${i} .ps-bm-indicator`, {
          scaleY: 0,
        }, {
          scaleY: 1,
          duration: TRANS * 0.5,
          ease: 'power2.out',
        }, tStart + TRANS * 0.4)
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  function scrollToProject(index) {
    const st = stRef.current
    if (!st) return

    let targetProgress
    if (index === 0) {
      targetProgress = GRID_END + SLOT * 0.4
    } else {
      const safeStart = GRID_END + index * SLOT + TRANS * 0.35
      const safeEnd = GRID_END + (index + 1) * SLOT - TRANS
      targetProgress = (safeStart + Math.min(safeEnd, 0.98)) / 2
    }
    targetProgress = Math.max(GRID_END + 0.01, Math.min(targetProgress, 0.99))
    const scrollPos = st.start + (st.end - st.start) * targetProgress

    // Instant jump — no smooth scroll
    window.scrollTo(0, scrollPos)
  }

  /* ═══════════════════════════════════════
     WATER RIPPLE HOVER HANDLERS
     ═══════════════════════════════════════ */

  function handleCardEnter(e, i) {
    const card = e.currentTarget
    const disp = sectionRef.current?.querySelector(`.ps-wdisp-${i}`)
    // Apply per-card water filter
    gsap.set(card, { filter: `url(#ps-water-${i})` })
    if (disp) {
      rippleTweens.current[i]?.kill()
      // Ripple burst: surge then settle to gentle sway
      rippleTweens.current[i] = gsap.timeline()
        .to(disp, { attr: { scale: 38 }, duration: 0.3, ease: 'power2.out' })
        .to(disp, { attr: { scale: 6 }, duration: 0.8, ease: 'elastic.out(1, 0.3)' })
    }
    // Lift card with spring
    gsap.to(card, {
      z: 30,
      duration: 0.4,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }

  function handleCardMove(e, i) {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    // 3D tilt — feels like pressing into a liquid surface
    const rotateX = (0.5 - y) * 16
    const rotateY = (x - 0.5) * 16
    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.35,
      ease: 'power2.out',
      overwrite: 'auto',
    })
    // Track cursor for water highlight
    card.style.setProperty('--mx', `${x * 100}%`)
    card.style.setProperty('--my', `${y * 100}%`)
  }

  function handleCardLeave(e, i) {
    const card = e.currentTarget
    const disp = sectionRef.current?.querySelector(`.ps-wdisp-${i}`)
    rippleTweens.current[i]?.kill()
    // Spring back to rest
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      z: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.45)',
      overwrite: 'auto',
    })
    if (disp) {
      // Final ripple echo then clear
      rippleTweens.current[i] = gsap.timeline()
        .to(disp, { attr: { scale: 12 }, duration: 0.15, ease: 'power2.out' })
        .to(disp, { attr: { scale: 0 }, duration: 0.45, ease: 'power3.inOut',
          onComplete: () => gsap.set(card, { filter: 'none' }),
        })
    }
  }

  return (
    <div ref={sectionRef} className="ps-section">

      {/* ── SVG Water Ripple Filters ── */}
      <svg className="ps-svg-defs" aria-hidden="true">
        <defs>
          {/* Original scroll-transition filter */}
          <filter id="ps-ripple" x="-25%" y="-25%" width="150%" height="150%">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.018 0.055"
              numOctaves="3"
              seed="4"
              result="noise"
            />
            <feDisplacementMap
              className="ps-ripple-displace"
              in="SourceGraphic"
              in2="noise"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          {/* Per-card interactive water filters */}
          {projects.map((_, i) => (
            <filter id={`ps-water-${i}`} key={`w${i}`} x="-15%" y="-15%" width="130%" height="130%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.012 0.032"
                numOctaves="3"
                seed={i * 11 + 3}
                result="waterNoise"
              >
                <animate
                  attributeName="baseFrequency"
                  dur={`${5 + i * 0.7}s`}
                  values="0.012 0.032;0.022 0.055;0.012 0.032"
                  repeatCount="indefinite"
                />
              </feTurbulence>
              <feDisplacementMap
                className={`ps-wdisp-${i}`}
                in="SourceGraphic"
                in2="waterNoise"
                scale="0"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          ))}
        </defs>
      </svg>

      {/* ── Ripple Ring Overlays ── */}
      <div className="ps-ripple-ring ps-ripple-ring-1" />
      <div className="ps-ripple-ring ps-ripple-ring-2" />
      <div className="ps-ripple-ring ps-ripple-ring-3" />

      {/* ── Grid View ── */}
      <div className="ps-grid">
        <div className="ps-grid-header">
          <span className="section-label">My Work</span>
          <h2>Featured <span className="accent-text">Projects</span></h2>
        </div>
        <div className="ps-grid-cards">
          {projects.map((p, i) => (
            <div
              key={p.id}
              className={`ps-card ps-card-${i}`}
              style={{ '--pc': p.color }}
              onClick={() => scrollToProject(i)}
              onMouseEnter={(e) => handleCardEnter(e, i)}
              onMouseMove={(e) => handleCardMove(e, i)}
              onMouseLeave={(e) => handleCardLeave(e, i)}
            >
              {/* Water surface highlight — follows cursor */}
              <div className="ps-card-water-highlight" />
              {/* Caustic light refraction overlay */}
              <div className="ps-card-caustics" />
              <div className="ps-card-accent" />
              <div className="ps-card-preview">
                <MockScreen color={p.color} variant={screenVariants[i][0]} />
              </div>
              <div className="ps-card-meta">
                <div className="ps-card-meta-left">
                  <h4>{p.title}</h4>
                  <span className="ps-card-cat">{p.category}</span>
                </div>
                <span className="ps-card-num">0{i + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Expanded View ── */}
      <div className="ps-expanded" style={{ opacity: 0, visibility: 'hidden' }}>
        <div className="ps-slides-wrap">
          {projects.map((p, i) => (
            <div
              key={p.id}
              className={`ps-slide ps-slide-${i}`}
              style={i > 0 ? { opacity: 0, visibility: 'hidden' } : {}}
            >
              <div className="ps-slide-visual">
                <div className="ps-visual-main">
                  <MockScreen color={p.color} variant={screenVariants[i][0]} />
                </div>
                <div className="ps-visual-row">
                  <MockScreen color={p.color} variant={screenVariants[i][1]} />
                  <MockScreen color={p.color} variant={screenVariants[i][2]} />
                </div>
              </div>

              <div className="ps-slide-detail">
                <span className="ps-cat" style={{ color: p.color }}>{p.category}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <div className="ps-tags">
                  {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ marginTop: '1.5rem', alignSelf: 'flex-start' }}
                >
                  <i className="ri-github-fill" /> View Project
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* ── Bookmark Tabs ── */}
        <nav className="ps-bookmarks">
          {projects.map((p, i) => (
            <button
              key={p.id}
              className={`ps-bm ps-bm-${i}`}
              style={{ '--bm-color': p.color }}
              onClick={() => scrollToProject(i)}
            >
              <div className="ps-bm-indicator" />
              <div className="ps-bm-inner">
                <div className="ps-bm-top">
                  <div className="ps-bm-dot" />
                  <span className="ps-bm-name">{p.title}</span>
                </div>
                <span className="ps-bm-cat">{p.category}</span>
              </div>
            </button>
          ))}
        </nav>
      </div>

      {/* ══════════════════════════════════════
          STYLES
          ══════════════════════════════════════ */}
      <style>{`
        .ps-section {
          height: 100vh;
          position: relative;
          z-index: 2;
          overflow: hidden;
        }

        .ps-svg-defs {
          position: absolute;
          width: 0;
          height: 0;
          pointer-events: none;
        }

        .ps-ripple-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 1.5px solid rgba(201, 168, 124, 0.35);
          transform: translate(-50%, -50%) scale(0);
          pointer-events: none;
          z-index: 7;
          opacity: 0;
          will-change: transform, opacity;
          box-shadow: 0 0 20px rgba(201, 168, 124, 0.08),
                      inset 0 0 20px rgba(201, 168, 124, 0.04);
        }

        .ps-ripple-ring-2 {
          border-color: rgba(201, 168, 124, 0.2);
          width: 60px;
          height: 60px;
        }

        .ps-ripple-ring-3 {
          border-color: rgba(201, 168, 124, 0.12);
          width: 40px;
          height: 40px;
        }

        /* ===== GRID VIEW ===== */
        .ps-grid {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 5;
          padding: 40px 3.5vw 1.5rem;
          box-sizing: border-box;
          overflow: hidden;
        }

        .ps-grid-header {
          text-align: center;
          margin-bottom: 2vh;
          will-change: transform, opacity;
          flex-shrink: 0;
        }

        .ps-grid-cards {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          grid-auto-rows: 22vh;
          gap: 1.3vh 1.2vw;
          width: 100%;
          max-width: 860px;
          flex-shrink: 0;
          perspective: 900px;
        }

        .ps-card:nth-child(5) {
          grid-column: 1 / -1;
          max-width: calc(50% - 0.6vw);
          width: 100%;
          justify-self: center;
        }

        .ps-card {
          position: relative;
          background: rgba(16, 16, 28, 0.88);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          will-change: transform, opacity, width, height, filter;
          transition: border-color 0.35s ease,
                      box-shadow 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
          transform-style: preserve-3d;
        }

        .ps-card:hover {
          border-color: color-mix(in srgb, var(--pc) 45%, transparent);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35),
                      0 0 0 1px color-mix(in srgb, var(--pc) 22%, transparent),
                      0 0 60px -10px color-mix(in srgb, var(--pc) 12%, transparent);
        }

        /* ===== WATER SURFACE EFFECTS ===== */
        .ps-card-water-highlight {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 5;
          opacity: 0;
          border-radius: inherit;
          background: radial-gradient(
            circle 140px at var(--mx, 50%) var(--my, 50%),
            rgba(255, 255, 255, 0.14),
            rgba(255, 255, 255, 0.04) 35%,
            transparent 65%
          );
          transition: opacity 0.35s ease;
        }

        .ps-card:hover .ps-card-water-highlight {
          opacity: 1;
        }

        .ps-card-caustics {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 4;
          opacity: 0;
          border-radius: inherit;
          background:
            radial-gradient(ellipse 90px 70px at 22% 30%, rgba(201, 168, 124, 0.1), transparent),
            radial-gradient(ellipse 70px 90px at 72% 68%, rgba(201, 168, 124, 0.07), transparent),
            radial-gradient(ellipse 100px 55px at 58% 18%, rgba(201, 168, 124, 0.06), transparent);
          mix-blend-mode: overlay;
          animation: ps-caustics 4.5s ease-in-out infinite alternate;
          transition: opacity 0.5s ease;
        }

        .ps-card:hover .ps-card-caustics {
          opacity: 1;
        }

        @keyframes ps-caustics {
          0% {
            background-size: 100% 100%, 115% 115%, 95% 95%;
            background-position: 0% 0%, 100% 100%, 50% 50%;
          }
          33% {
            background-size: 115% 105%, 95% 110%, 110% 100%;
            background-position: 10% 15%, 85% 80%, 40% 60%;
          }
          66% {
            background-size: 95% 115%, 110% 95%, 105% 115%;
            background-position: 5% 10%, 95% 90%, 55% 35%;
          }
          100% {
            background-size: 110% 95%, 100% 120%, 90% 105%;
            background-position: 15% 5%, 80% 95%, 45% 50%;
          }
        }

        .ps-card-accent {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--pc);
          opacity: 0;
          transition: opacity 0.35s ease;
          z-index: 3;
          box-shadow: 0 0 12px var(--pc);
        }

        .ps-card:hover .ps-card-accent {
          opacity: 0.6;
        }

        .ps-card-preview {
          flex: 1 1 0%;
          min-height: 0;
          overflow: hidden;
          position: relative;
        }

        .ps-card-preview .ps-screen {
          position: absolute;
          top: 0;
          left: 0;
          width: 192%;
          height: 192%;
          transform: scale(0.52);
          transform-origin: top left;
          border-radius: 0;
        }

        .ps-card-meta {
          flex-shrink: 0;
          padding: 0.65vh 0.75rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid rgba(255, 255, 255, 0.04);
        }

        .ps-card-meta-left {
          min-width: 0;
        }

        .ps-card-meta h4 {
          font-size: 0.84rem;
          font-weight: 700;
          margin-bottom: 0.05rem;
          color: var(--text-primary);
          letter-spacing: -0.01em;
        }

        .ps-card-cat {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .ps-card-num {
          font-family: var(--font-mono);
          font-size: 0.58rem;
          font-weight: 600;
          color: var(--pc);
          opacity: 0.3;
          letter-spacing: -0.02em;
          flex-shrink: 0;
          transition: opacity 0.3s ease;
        }

        .ps-card:hover .ps-card-num {
          opacity: 0.6;
        }

        /* ===== EXPANDED VIEW ===== */
        .ps-expanded {
          position: absolute;
          inset: 0;
          z-index: 4;
          will-change: opacity;
        }

        .ps-slides-wrap {
          position: absolute;
          left: 3%;
          top: 50%;
          transform: translateY(-50%);
          width: 72%;
          height: 86%;
          max-height: 700px;
          overflow: hidden;
        }

        .ps-slide {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          gap: 2.5rem;
          padding: 1.5rem 2rem;
          will-change: transform, opacity;
        }

        .ps-slide-visual {
          flex: 0 0 54%;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .ps-visual-main {
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.55);
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        .ps-visual-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }

        .ps-visual-row .ps-screen {
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.04);
        }

        .ps-slide-detail {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-width: 0;
        }

        .ps-cat {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 0.5rem;
          font-weight: 600;
        }

        .ps-slide-detail h3 {
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          font-weight: 700;
          margin-bottom: 1rem;
          line-height: 1.15;
        }

        .ps-slide-detail p {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.7;
          margin-bottom: 1.25rem;
        }

        .ps-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        /* ===== BOOKMARKS ===== */
        .ps-bookmarks {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          gap: 5px;
          z-index: 10;
        }

        .ps-bm {
          position: relative;
          display: flex;
          align-items: center;
          width: 116px;
          height: 66px;
          padding: 0 0.5rem 0 0.7rem;
          border-radius: 14px 0 0 14px;
          cursor: pointer;
          background: linear-gradient(135deg, rgba(18, 18, 32, 0.96), rgba(12, 12, 22, 0.98));
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-right: none;
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          will-change: transform;
          font-family: inherit;
          color: inherit;
          outline: none;
          transition: background 0.3s, border-color 0.3s, box-shadow 0.3s;
          overflow: hidden;
        }

        .ps-bm::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, var(--bm-color), transparent);
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
        }

        .ps-bm:hover {
          border-color: rgba(255, 255, 255, 0.16);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        .ps-bm:hover::before {
          opacity: 0.06;
        }

        .ps-bm-indicator {
          position: absolute;
          left: 0;
          top: 6px;
          bottom: 6px;
          width: 4px;
          background: var(--bm-color);
          border-radius: 0 4px 4px 0;
          transform: scaleY(0);
          transform-origin: center;
          box-shadow: 0 0 12px var(--bm-color), 0 0 24px color-mix(in srgb, var(--bm-color) 40%, transparent);
        }

        .ps-bm-inner {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          width: 100%;
          position: relative;
          z-index: 1;
        }

        .ps-bm-top {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .ps-bm-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--bm-color);
          flex-shrink: 0;
          box-shadow: 0 0 10px var(--bm-color), 0 0 3px var(--bm-color);
          opacity: 0.9;
        }

        .ps-bm-name {
          font-size: 0.74rem;
          font-weight: 700;
          color: var(--text-primary);
          white-space: nowrap;
          letter-spacing: -0.01em;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .ps-bm-cat {
          font-family: var(--font-mono);
          font-size: 0.52rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding-left: 1.25rem;
          opacity: 0.65;
        }

        /* ===== MOCK SCREENS ===== */
        .ps-screen {
          background: linear-gradient(145deg, #111119, #18182a);
          border-radius: 10px;
          overflow: hidden;
        }

        .ps-screen-bar {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 8px 10px;
          background: rgba(255, 255, 255, 0.025);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .ps-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.12);
        }
        .ps-dot:first-child { background: #ff5f57; }
        .ps-dot:nth-child(2) { background: #febc2e; }
        .ps-dot:nth-child(3) { background: #28c840; }

        .ps-bar-url {
          margin-left: 8px;
          height: 5px;
          width: 45%;
          background: rgba(255, 255, 255, 0.06);
          border-radius: 3px;
        }

        .ps-screen-body {
          padding: 12px;
          min-height: 120px;
          position: relative;
        }

        .ps-sb-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-bottom: 8px;
        }
        .ps-sb-card {
          height: 48px;
          background: rgba(255, 255, 255, 0.035);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 6px;
          position: relative;
          overflow: hidden;
        }
        .ps-sb-card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          background: var(--pc);
          opacity: 0.5;
        }

        .ps-sb-input {
          height: 24px;
          background: rgba(255, 255, 255, 0.035);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 5px;
          margin-bottom: 8px;
        }
        .ps-sb-textarea {
          height: 50px;
          background: rgba(255, 255, 255, 0.035);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 5px;
          margin-bottom: 10px;
        }
        .ps-sb-btn {
          height: 26px;
          background: var(--pc);
          border-radius: 5px;
          opacity: 0.75;
          width: 40%;
        }

        .ps-sb-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 6px;
          margin-bottom: 10px;
        }
        .ps-sb-stat {
          height: 36px;
          background: rgba(255, 255, 255, 0.035);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 5px;
          position: relative;
        }
        .ps-sb-stat::before {
          content: '';
          position: absolute;
          top: 6px; left: 8px;
          width: 16px; height: 10px;
          background: var(--pc);
          opacity: 0.3;
          border-radius: 3px;
        }
        .ps-sb-chart {
          height: 60px;
          background: rgba(255, 255, 255, 0.025);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 5px;
          position: relative;
          overflow: hidden;
        }
        .ps-sb-chart::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 75%;
          background: linear-gradient(to top, var(--pc), transparent);
          opacity: 0.1;
          clip-path: polygon(0% 100%, 8% 55%, 20% 70%, 35% 25%, 50% 45%, 65% 10%, 80% 35%, 100% 5%, 100% 100%);
        }

        .ps-sb-board {
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          gap: 2px;
        }
        .ps-sb-cell {
          aspect-ratio: 1;
          background: rgba(255, 255, 255, 0.035);
          border-radius: 2px;
        }
        .ps-sb-cell--active {
          background: var(--pc);
          opacity: 0.45;
          box-shadow: 0 0 4px var(--pc);
        }

        .ps-sb-hero {
          height: 55px;
          background: linear-gradient(135deg, var(--pc), transparent);
          opacity: 0.12;
          border-radius: 6px;
          margin-bottom: 10px;
        }
        .ps-sb-lines div {
          height: 6px;
          background: rgba(255, 255, 255, 0.06);
          border-radius: 3px;
          margin-bottom: 6px;
        }
        .ps-sb-lines .short { width: 55%; }

        /* ===== REDUCED MOTION ===== */
        @media (prefers-reduced-motion: reduce) {
          .ps-card-caustics { animation: none; }
          .ps-card { transition: border-color 0.1s, box-shadow 0.1s; }
          .ps-card-water-highlight { transition: opacity 0.1s; }
        }

        /* ===== RESPONSIVE: Tablet ===== */
        @media (max-width: 1024px) {
          .ps-slides-wrap {
            width: 68%;
            left: 2%;
          }
          .ps-slide {
            gap: 2rem;
            padding: 1rem;
          }
          .ps-slide-visual {
            flex: 0 0 50%;
          }
          .ps-bm {
            width: 106px;
            height: 56px;
            padding: 0 0.4rem 0 0.6rem;
          }
          .ps-bm-name { font-size: 0.76rem; }
          .ps-bm-cat { font-size: 0.54rem; }
        }

        /* ===== RESPONSIVE: Mobile ===== */
        @media (max-width: 768px) {
          .ps-grid { padding: 40px 1rem 1rem; }
          .ps-grid-cards {
            gap: 0.6rem;
            max-width: 420px;
          }
          .ps-card { border-radius: 10px; }
          .ps-grid-cards { grid-auto-rows: 160px; }
          .ps-card-meta { padding: 0.45rem 0.6rem; }
          .ps-card-meta h4 { font-size: 0.8rem; }
          .ps-card-num { display: none; }
          .ps-grid-header { margin-bottom: 1.2rem; }

          .ps-slides-wrap {
            width: 96%;
            left: 2%;
            height: calc(100% - 80px);
            max-height: none;
            top: auto;
            bottom: 0;
            transform: none;
          }
          .ps-slide {
            flex-direction: column;
            gap: 1rem;
            overflow-y: auto;
            padding: 0.75rem;
          }
          .ps-slide-visual { flex: none; width: 100%; }
          .ps-slide-detail { flex: none; width: 100%; }
          .ps-slide-detail h3 { font-size: 1.3rem; }
          .ps-slide-detail p { font-size: 0.88rem; }

          .ps-bookmarks {
            top: 52px;
            right: 50%;
            transform: translateX(50%);
            flex-direction: row;
            gap: 0.3rem;
          }
          .ps-bm {
            border-radius: 0 0 8px 8px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-top: none;
            width: auto;
            height: auto;
            padding: 0.4rem 0.6rem;
          }
          .ps-bm-indicator {
            left: 0; right: 0;
            top: 0; bottom: auto;
            width: auto; height: 2.5px;
            border-radius: 0 0 2px 2px;
            transform: scaleX(0);
            transform-origin: center;
          }
        }

        /* ===== RESPONSIVE: Small phones ===== */
        @media (max-width: 480px) {
          .ps-grid-cards { gap: 0.45rem; max-width: 340px; }
          .ps-card { border-radius: 8px; }
          .ps-grid-cards { grid-auto-rows: 130px; }
          .ps-card:nth-child(5) { max-width: 168px; }
          .ps-card-meta h4 { font-size: 0.74rem; }
          .ps-card-cat { font-size: 0.54rem; }
          .ps-screen-body { min-height: 80px; padding: 8px; }
          .ps-screen-bar { padding: 5px 8px; }
        }

        @media (max-width: 360px) {
          .ps-grid-cards { max-width: 300px; }
          .ps-grid-cards { grid-auto-rows: 110px; }
        }
        /* ═══════════════════════════════════════════
           LIGHT MODE OVERRIDES
           ═══════════════════════════════════════════ */
        [data-theme="light"] .ps-card {
          background: rgba(255, 255, 255, 0.92);
          border-color: var(--border);
          box-shadow: 0 2px 12px rgba(28,25,23,0.06);
        }
        [data-theme="light"] .ps-card:hover {
          box-shadow: 0 12px 40px rgba(28,25,23,0.1),
                      0 0 0 1px color-mix(in srgb, var(--pc) 25%, transparent),
                      0 0 50px -10px color-mix(in srgb, var(--pc) 10%, transparent);
        }
        [data-theme="light"] .ps-card-water-highlight {
          background: radial-gradient(
            circle 140px at var(--mx, 50%) var(--my, 50%),
            rgba(28,25,23,0.06),
            rgba(28,25,23,0.02) 35%,
            transparent 65%
          );
        }
        [data-theme="light"] .ps-card-caustics {
          background:
            radial-gradient(ellipse 90px 70px at 22% 30%, rgba(146,64,14,0.08), transparent),
            radial-gradient(ellipse 70px 90px at 72% 68%, rgba(146,64,14,0.06), transparent),
            radial-gradient(ellipse 100px 55px at 58% 18%, rgba(146,64,14,0.05), transparent);
        }
        [data-theme="light"] .ps-card-meta {
          border-top-color: var(--border);
        }
        [data-theme="light"] .ps-screen {
          background: linear-gradient(145deg, #F5F5F4, #FAFAF9);
        }
        [data-theme="light"] .ps-screen-bar {
          background: rgba(28,25,23,0.03);
          border-bottom-color: var(--border);
        }
        [data-theme="light"] .ps-dot { background: rgba(28,25,23,0.1); }
        [data-theme="light"] .ps-bar-url { background: rgba(28,25,23,0.06); }
        [data-theme="light"] .ps-sb-card,
        [data-theme="light"] .ps-sb-stat,
        [data-theme="light"] .ps-sb-input,
        [data-theme="light"] .ps-sb-textarea,
        [data-theme="light"] .ps-sb-chart,
        [data-theme="light"] .ps-sb-cell {
          background: rgba(28,25,23,0.03);
          border-color: var(--border);
        }
        [data-theme="light"] .ps-sb-lines div { background: rgba(28,25,23,0.06); }
        [data-theme="light"] .ps-bm {
          background: linear-gradient(135deg, rgba(255,255,255,0.96), rgba(250,250,249,0.98));
          border-color: var(--border);
        }
        [data-theme="light"] .ps-bm:hover {
          border-color: var(--border-hover);
          box-shadow: 0 4px 20px rgba(28,25,23,0.08), 0 0 0 1px rgba(0,0,0,0.03);
        }
        [data-theme="light"] .ps-visual-main {
          box-shadow: 0 20px 60px rgba(28,25,23,0.12);
          border-color: var(--border);
        }
        [data-theme="light"] .ps-visual-row .ps-screen {
          box-shadow: 0 10px 30px rgba(28,25,23,0.08);
          border-color: var(--border);
        }
        [data-theme="light"] .ps-ripple-ring {
          border-color: rgba(146,64,14,0.25);
          box-shadow: 0 0 20px rgba(146,64,14,0.06),
                      inset 0 0 20px rgba(146,64,14,0.03);
        }
        [data-theme="light"] .ps-ripple-ring-2 { border-color: rgba(146,64,14,0.15); }
        [data-theme="light"] .ps-ripple-ring-3 { border-color: rgba(146,64,14,0.08); }
      `}</style>
    </div>
  )
}
