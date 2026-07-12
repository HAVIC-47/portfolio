import { useEffect, useRef } from 'react'
import ProjectSlideshow from './ProjectSlideshow'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */

export const projects = [
  {
    id: 'catalyst',
    title: 'Catalyst',
    category: 'Fintech · SaaS',
    desc: 'Most finance apps count money. Catalyst also counts how you felt spending it — an honest ledger that maps every taka against how the day actually felt, built for Bangladesh (৳).\n\nA multi-user web app where daily spending, income, savings, and mood live side by side. The calendar tints each day by mood with spend and income overlays, so problem days glow without reading a number. The dashboard drives seven charts from one shared period selector — including a mood×money overlap quantified with a Pearson correlation — plus budgets, savings goals, bills, and a journal.\n\nBuilt with Next.js 14 (App Router), TypeScript, and Supabase — serverless Postgres with row-level security scoping every row to its owner. Recharts for data, Framer Motion and GSAP for motion, deployed on Vercel. Design language: Editorial Almanac — a printed financial diary, not the generic AI-SaaS look.',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Recharts'],
    color: '#e28670',
    link: 'https://github.com/HAVIC-47/catalyst',
    live: 'https://catalyst-hishab.vercel.app/',
    thumbnail: '/projects/catalyst/thumbnail.png',
    media: Array.from({ length: 14 }, (_, i) => ({ type: 'image', src: `/projects/catalyst/${i + 1}.png` })),
  },
  {
    id: 'noteswap',
    title: 'NoteSwap',
    category: 'EdTech',
    desc: 'University students in Bangladesh struggle to find well-organized, reliable study materials — often relying on incomplete notes from peers, leading to gaps in understanding and heightened exam stress.\n\nNoteSwap provides a centralized hub where students upload, download, and rate academic notes across courses. Features include advanced search by subject and course code, personalized user profiles for tracking contributions, and discussion forums for collaborative learning.\n\nBuilt with Python and Django, the platform handles user authentication, file management, content moderation, and a community-driven rating system that surfaces the best materials.',
    tags: ['Python', 'Django', 'CSS', 'Web App'],
    color: '#4f6ef7',
    link: 'https://github.com/HAVIC-47/final_NoteSwap',
    thumbnail: '/projects/noteswap/thumbnail.png',
    media: Array.from({ length: 11 }, (_, i) => ({ type: 'image', src: `/projects/noteswap/${i + 1}.png` })),
  },
  {
    id: 'noteswap2',
    title: 'NoteSwap 2.0',
    category: 'EdTech',
    desc: 'A ground-up rebuild of NoteSwap, addressing the gaps in global platforms like OneClass, StuDocu, and StudyLib — paywalled content, no local university support, and zero content verification.\n\nIntroduces localized search filters by university, faculty, and course code. A community-driven rating system ensures content accuracy, while all materials remain freely accessible without premium subscriptions.\n\nThe UX was rebuilt from real v1 user feedback — cleaner navigation, faster uploads, and responsive design. Backend restructured for better scalability and performance under load.',
    tags: ['Python', 'Django', 'Web App', 'Iteration'],
    color: '#7c4dff',
    link: 'https://github.com/HAVIC-47/Updated_NoteSwap',
    thumbnail: '/projects/noteswap2/thumbnail.png',
    media: Array.from({ length: 29 }, (_, i) => ({ type: 'image', src: `/projects/noteswap2/${i + 1}.png` })),
  },
  {
    id: 'eventease',
    title: 'EventEase',
    category: 'SaaS',
    desc: 'Born from the frustration of trying to book Young Stunners concert tickets on a completely disorganized website — no proper information, confusing updates, and tickets sold out before we could act.\n\nEventEase connects users, organizers, and venues in one centralized platform. Features real-time event updates with notifications, intuitive discovery with smart filtering, secure ticket management, and automated alerts for schedule changes.\n\nBuilt with HTML, CSS, and JavaScript, filling the gap left by transaction-only platforms like Tickyfie — handling the full event lifecycle from creation to post-event feedback.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    color: '#10b981',
    link: 'https://github.com/HAVIC-47/EventEase',
    thumbnail: '/projects/eventease/thumbnail.png',
    media: [
      { type: 'video', src: '/projects/eventease/1.mp4' },
      { type: 'video', src: '/projects/eventease/2.mp4' },
    ],
  },
  {
    id: 'rootreach',
    title: 'RootReach',
    category: 'E-Commerce',
    desc: 'Rural producers in Bangladesh rely on middlemen who buy goods at unfairly low prices and resell at high margins. RootReach cuts them out with a dedicated e-commerce platform for direct producer-to-consumer sales.\n\nFeatures verified product listings with authenticity guarantees, secure payment gateways replacing cash-only transactions, integrated courier services for nationwide delivery, and multilingual support for non-English-speaking producers.\n\nBuilt with Python and Django, bridging the economic and digital divide that platforms like Amazon, Daraz, and Bikroy fail to address for rural communities.',
    tags: ['Python', 'Django', 'E-Commerce'],
    color: '#f59e0b',
    link: 'https://github.com/HAVIC-47',
    thumbnail: '/projects/rootreach/thumbnail.png',
    media: Array.from({ length: 22 }, (_, i) => ({ type: 'image', src: `/projects/rootreach/${i + 1}.png` })),
  },
  {
    id: 'machinestrike',
    title: 'Machine Strike',
    category: 'Board Game · AI',
    desc: 'A recreation of the board game from Horizon Forbidden West — a deterministic, zero-sum, perfect-information strategy game on an 8x8 board where terrain modifiers directly affect combat outcomes.\n\nImplements two AI agents: standard Minimax that exhaustively explores all moves, and an optimized Alpha-Beta Pruning version that eliminates unnecessary branches. Each piece has unique attack patterns, health values, and movement ranges.\n\nThe AI evaluates board states using custom heuristics for piece positioning, terrain advantage, and threat assessment. Performance comparison demonstrates how pruning cuts node exploration dramatically while guaranteeing the same optimal result.',
    tags: ['Python', 'AI', 'Minimax', 'Game Dev'],
    color: '#ef4444',
    link: 'https://github.com/HAVIC-47/Machine-Strike',
    thumbnail: '/projects/machinestrike/thumbnail.png',
    media: Array.from({ length: 3 }, (_, i) => ({ type: 'image', src: `/projects/machinestrike/${i + 1}.png` })),
  },
  {
    id: 'catcheggs',
    title: 'Catch The Eggs',
    category: 'Arcade Game · C++',
    desc: 'A 2D arcade catch game built in C++ with OpenGL and FreeGLUT. Move a basket to catch eggs dropped by chickens on sticks, dodge hazards, and grab power-ups across six difficulty levels that ramp from a sunny farm to a stormy blood moon.\n\nEverything on screen is drawn from raw OpenGL primitives — chickens, eggs, barn, clouds, sun, moon, lightning, and UI. No image assets at all. Even the music and thunder are synthesized at runtime by additive sine synthesis, a different track per level. Power-ups like Large Basket, Slow Time, Magnet, and Shield — plus power-downs, wind physics, combo multipliers, and per-level high scores — round out the systems.\n\nA data-driven level table defines each stage: chicken count, fall speed, hazard mix, score multiplier, sky theme, and music. Grown incrementally across nine staged versions on a fixed 60 FPS step, with juice throughout: particle bursts, floating score text, screen shake, twinkling stars, fireflies, and randomized lightning.',
    tags: ['C++', 'OpenGL', 'FreeGLUT', 'Game Dev'],
    color: '#f2b705',
    link: 'https://github.com/HAVIC-47',
    thumbnail: '/projects/catcheggs/thumbnail.png',
    media: Array.from({ length: 8 }, (_, i) => ({ type: 'image', src: `/projects/catcheggs/${i + 1}.png` })),
  },
]

/* Section grouping: web projects vs games */
const GAME_IDS = new Set(['machinestrike', 'catcheggs'])
export const webProjects = projects.filter((p) => !GAME_IDS.has(p.id))
export const gameProjects = projects.filter((p) => GAME_IDS.has(p.id))

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
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

      // Header dissolves upward
      tl.to('.ps-grid-header', {
        yPercent: -150,
        autoAlpha: 0,
        duration: 0.035,
        ease: 'power2.in',
      }, 0.008)

      // Section labels (Web Projects / Games) fade as the warp begins — gone by ~50% of the transition
      tl.to('.ps-group-label', {
        autoAlpha: 0,
        duration: 0.06,
        ease: 'power2.in',
      }, 0.02)

      // ── Card 0: expand in-place into hero slide ──
      tl.to('.ps-card-0', {
        scale: 1.08,
        autoAlpha: 0.6,
        duration: 0.04,
        ease: 'power2.in',
      }, 0.02)
      tl.to('.ps-card-0', {
        scale: 1.15,
        autoAlpha: 0,
        duration: 0.04,
        ease: 'power2.out',
      }, 0.06)

      // ── Cards 1–N: macOS "Genie" warp — stretch, curve, and get sucked into the bookmark ──
      // End point = the real bookmark-icon centre (getBoundingClientRect). Motion is transform+opacity only.
      const genieDX = (i) => {
        const card = document.querySelector(`.ps-card-${i}`)
        const bm = document.querySelector(`.ps-bm-${i}`)
        if (!card || !bm) return 0
        const c = card.getBoundingClientRect()
        const b = bm.getBoundingClientRect()
        return (b.left + b.width / 2) - (c.left + c.width / 2)
      }
      const genieDY = (i) => {
        const card = document.querySelector(`.ps-card-${i}`)
        const bm = document.querySelector(`.ps-bm-${i}`)
        if (!card || !bm) return 0
        const c = card.getBoundingClientRect()
        const b = bm.getBoundingClientRect()
        return (b.top + b.height / 2) - (c.top + c.height / 2)
      }
      const genieScale = (i) => {
        const card = document.querySelector(`.ps-card-${i}`)
        const bm = document.querySelector(`.ps-bm-${i}`)
        if (!card || !bm) return 0.12
        const c = card.getBoundingClientRect()
        const b = bm.getBoundingClientRect()
        return Math.max(0.08, (b.height * 0.92) / c.height)
      }

      for (let i = 1; i < projects.length; i++) {
        const idx = i - 1
        const stagger = idx * 0.006
        const card = `.ps-card-${i}`

        tl.set(card, { transformOrigin: '50% 50%' }, 0.02 + stagger)

        // Text label fades immediately; the thumbnail rides the warp and vanishes on suck-in
        tl.to(`${card} .ps-card-meta`, { autoAlpha: 0, duration: 0.018, ease: 'power2.in' }, 0.022 + stagger)

        if (reduce) {
          // prefers-reduced-motion → simple fade toward the bookmark, no warp
          tl.to(`${card} .ps-card-preview`, { autoAlpha: 0, duration: 0.03 }, 0.03 + stagger)
          tl.to(card, {
            x: () => genieDX(i),
            y: () => genieDY(i),
            scale: 0.22,
            autoAlpha: 0,
            duration: 0.06,
            ease: 'power1.in',
          }, 0.03 + stagger)
        } else {
          // 1) Pinch into a thin neck (accelerating in)
          tl.to(card, {
            skewX: -16, scaleX: 1.2, scaleY: 0.8,
            duration: 0.024, ease: 'power2.in',
          }, 0.02 + stagger)

          // 2) Curve + travel + shrink toward the bookmark — ease-in accelerates into the target
          tl.to(card, {
            x: () => genieDX(i),
            y: () => genieDY(i),
            scaleX: () => genieScale(i),
            scaleY: () => genieScale(i) * 0.8,
            skewX: 9,
            duration: 0.05, ease: 'power2.in',
          }, 0.044 + stagger)

          // 3) Suck-in finale — thumbnail fades and the sliver collapses into the icon
          tl.to(`${card} .ps-card-preview`, { autoAlpha: 0, duration: 0.018, ease: 'power2.in' }, 0.094 + stagger)
          tl.to(card, {
            scaleX: 0.05, scaleY: 0.03, skewX: 0, autoAlpha: 0,
            duration: 0.02, ease: 'power2.in',
          }, 0.092 + stagger)
        }
      }

      // ── Crossfade: grid out (after the genie suck-ins), expanded in ──
      tl.to('.ps-grid', {
        autoAlpha: 0,
        duration: 0.01,
      }, 0.15)

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

      // ── Bookmarks appear exactly where cards landed, with a pulse/bounce as each card is sucked in ──
      projects.forEach((_, i) => {
        tl.fromTo(`.ps-bm-${i}`, {
          autoAlpha: 0,
          x: 20,
          scale: reduce ? 1 : 0.55,
        }, {
          autoAlpha: 1,
          x: 0,
          scale: 1,
          duration: reduce ? 0.02 : 0.028,
          ease: reduce ? 'power2.out' : 'back.out(2.4)',
        }, 0.11 + i * 0.006)
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
    // Spring back to rest
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      z: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.45)',
      overwrite: 'auto',
    })
  }

  /* Grid card — `i` is the global project index (drives the scroll timeline classes) */
  const renderCard = (p, i) => (
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
        <img src={p.thumbnail} alt={p.title} className="ps-card-thumb" loading="lazy" />
      </div>
      <div className="ps-card-meta">
        <div className="ps-card-meta-left">
          <h4>{p.title}</h4>
          <span className="ps-card-cat">{p.category}</span>
        </div>
        <span className="ps-card-num">0{i + 1}</span>
      </div>
    </div>
  )

  return (
    <div ref={sectionRef} className="ps-section">

      {/* ── Grid View ── */}
      <div className="ps-grid">
        <div className="ps-grid-header">
          <span className="section-label">My Work</span>
          <h2>Featured <span className="accent-text">Projects</span></h2>
        </div>
        <div className="ps-grid-group">
          <span className="ps-group-label">Web Projects</span>
          <div className="ps-grid-cards">
            {webProjects.map((p, i) => renderCard(p, i))}
          </div>
        </div>

        <div className="ps-grid-group ps-grid-group--games">
          <span className="ps-group-label">Games</span>
          <div className="ps-grid-cards ps-grid-cards--games">
            {gameProjects.map((p, i) => renderCard(p, webProjects.length + i))}
          </div>
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
                <div className="ps-window-wrap">
                  {/* Scroll hint — floats 50px above the window */}
                  <div className="ps-scroll-hint" aria-hidden="true">
                    <span className="ps-hint-chip">
                      <svg viewBox="0 0 24 24" className="ps-hint-mouse">
                        <rect x="7.5" y="3.5" width="9" height="17" rx="4.5" />
                        <circle className="ps-hint-wheel" cx="12" cy="8" r="1.3" />
                      </svg>
                      <span>Scroll <b>inside</b> · more images</span>
                    </span>
                    <span className="ps-hint-chip">
                      <svg viewBox="0 0 24 24">
                        <path d="M8 10l4-4 4 4" />
                        <path d="M8 14l4 4 4-4" />
                      </svg>
                      <span>Scroll <b>outside</b> · next project</span>
                    </span>
                  </div>
                  <ProjectSlideshow
                    media={[{ type: 'image', src: p.thumbnail }, ...p.media]}
                    color={p.color}
                  />
                </div>
              </div>

              <div className="ps-slide-detail">
                <span className="ps-cat" style={{ color: p.color }}>{p.category}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <div className="ps-tags">
                  {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
                <div className="ps-slide-actions">
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      <i className="ri-external-link-line" /> Live Demo
                    </a>
                  )}
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={p.live ? 'btn btn-outline' : 'btn btn-primary'}
                  >
                    <i className="ri-github-fill" /> {p.live ? 'Code' : 'View Project'}
                  </a>
                </div>
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
          margin-bottom: 1.2vh;
          will-change: transform, opacity;
          flex-shrink: 0;
        }

        .ps-grid-cards {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          grid-auto-rows: 16vh;
          gap: 1.2vh 1.2vw;
          width: 100%;
          max-width: 860px;
          flex-shrink: 0;
          perspective: 900px;
        }

        .ps-grid-group {
          width: 100%;
          max-width: 860px;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          flex-shrink: 0;
        }

        .ps-grid-group--games {
          margin-top: 1.8vh;
        }

        .ps-group-label {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          font-family: var(--font-mono);
          font-size: 0.66rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--accent);
          opacity: 0.9;
          margin-bottom: 0.9vh;
        }

        .ps-group-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, color-mix(in srgb, var(--accent) 35%, transparent), transparent);
        }

        .ps-slide-actions {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-top: 1.5rem;
          align-self: flex-start;
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
          width: 78%;
          height: 90%;
          max-height: 780px;
          overflow: hidden;
        }

        .ps-slide {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: row;
          gap: 2rem;
          padding: 1rem 1.5rem;
          will-change: transform, opacity;
        }

        .ps-slide-visual {
          flex: 0 0 72%;
          display: flex;
          align-items: center;
          border-radius: 12px;
          overflow: visible;
        }

        .ps-window-wrap {
          position: relative;
          width: 100%;
        }

        /* ===== Scroll interaction hint — floats 50px above the window ===== */
        .ps-scroll-hint {
          position: absolute;
          bottom: 100%;
          margin-bottom: 50px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 6;
          display: flex;
          gap: 0.5rem;
          flex-wrap: nowrap;
          justify-content: center;
          width: max-content;
          max-width: 100%;
          pointer-events: none;
        }

        .ps-hint-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.3rem 0.62rem;
          font-family: var(--font-mono);
          font-size: 0.62rem;
          line-height: 1;
          letter-spacing: 0.03em;
          color: rgba(255, 255, 255, 0.66);
          background: rgba(16, 16, 28, 0.55);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(201, 168, 124, 0.2);
          border-radius: 999px;
          white-space: nowrap;
        }

        .ps-hint-chip b {
          color: #c9a87c;
          font-weight: 600;
        }

        .ps-hint-chip svg {
          width: 13px;
          height: 13px;
          color: rgba(201, 168, 124, 0.85);
          fill: none;
          stroke: currentColor;
          stroke-width: 1.6;
          stroke-linecap: round;
          stroke-linejoin: round;
          flex-shrink: 0;
        }

        .ps-hint-wheel {
          fill: currentColor;
          stroke: none;
          transform-box: fill-box;
          transform-origin: center;
          animation: ps-hint-bob 1.6s ease-in-out infinite;
        }

        @keyframes ps-hint-bob {
          0%, 100% { transform: translateY(-2px); opacity: 1; }
          50% { transform: translateY(3px); opacity: 0.35; }
        }

        @media (prefers-reduced-motion: reduce) {
          .ps-hint-wheel { animation: none; }
        }

        @media (max-width: 768px) {
          .ps-scroll-hint { display: none; }
        }

        :is([data-theme="day"], [data-theme="desert"]) .ps-hint-chip {
          color: rgba(28, 25, 23, 0.72);
          background: rgba(255, 255, 255, 0.78);
          border-color: rgba(146, 64, 14, 0.24);
        }
        :is([data-theme="day"], [data-theme="desert"]) .ps-hint-chip b { color: #92400e; }
        :is([data-theme="day"], [data-theme="desert"]) .ps-hint-chip svg { color: rgba(146, 64, 14, 0.85); }

        .ps-slide-detail {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-width: 0;
          overflow: hidden;
          margin-left: auto;
          padding-left: 1rem;
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
          font-size: clamp(1.4rem, 2.2vw, 2rem);
          font-weight: 700;
          margin-bottom: 0.75rem;
          line-height: 1.15;
        }

        .ps-slide-detail p {
          color: var(--text-secondary);
          font-size: 0.8rem;
          line-height: 1.65;
          margin-bottom: 0.75rem;
          text-align: justify;
          white-space: pre-line;
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

        /* ===== THUMBNAIL IN GRID CARDS ===== */
        .ps-card-thumb {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

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
            right: auto;
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
            width: 100%;
          }
          .ps-card { border-radius: 10px; }
          .ps-grid-cards { grid-auto-rows: 160px; }
          .ps-card-meta { padding: 0.45rem 0.6rem; }
          .ps-card-meta h4 { font-size: 0.8rem; }
          .ps-card-num { display: none; }
          .ps-grid-header { margin-bottom: 1.2rem; }

          .ps-slides-wrap {
            width: calc(100% - 16px);
            left: 8px;
            right: 8px;
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
            left: 8px;
            right: 8px;
            transform: none;
            flex-direction: row;
            gap: 0.3rem;
            justify-content: center;
            flex-wrap: wrap;
            max-width: none;
          }
          .ps-bm {
            border-radius: 0 0 8px 8px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-top: none;
            width: auto;
            min-width: 0;
            height: auto;
            padding: 0.4rem 0.55rem;
            flex: 0 1 auto;
          }
          .ps-bm-name { font-size: 0.72rem; }
          .ps-bm-cat { font-size: 0.5rem; }
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
          .ps-grid { padding: 32px 0.75rem 0.75rem; }
          .ps-grid-cards { gap: 0.45rem; max-width: 100%; }
          .ps-card { border-radius: 8px; }
          .ps-grid-cards { grid-auto-rows: 130px; }
          .ps-card:nth-child(5) { max-width: 168px; }
          .ps-card-meta h4 { font-size: 0.74rem; }
          .ps-card-cat { font-size: 0.54rem; }
          .ps-bm { padding: 0.35rem 0.5rem; }
          .ps-bm-name { font-size: 0.68rem; }
        }

        @media (max-width: 360px) {
          .ps-grid { padding: 28px 0.5rem 0.5rem; }
          .ps-grid-cards { gap: 0.4rem; }
          .ps-grid-cards { grid-auto-rows: 108px; }
          .ps-card:nth-child(5) { max-width: 150px; }
          .ps-card-meta { padding: 0.35rem 0.5rem; }
          .ps-card-meta h4 { font-size: 0.68rem; }
          .ps-slide { padding: 0.6rem; }
          .ps-bm { padding: 0.3rem 0.45rem; }
          .ps-bm-name { font-size: 0.64rem; }
          .ps-bm-cat { display: none; }
        }

        /* Desktop: symmetric text-column voids.
           Widen wrap via right-anchor, lock visual/detail to original
           pixel widths, margin-left auto absorbs extra to shift text right. */
        @media (min-width: 1025px) {
          .ps-slides-wrap {
            left: 3%;
            right: calc(9.5vw + 70px);
            width: auto;
          }
          .ps-slide-visual {
            flex: 0 0 calc(56.16vw - 2.16rem);
          }
          .ps-slide-detail {
            flex: 0 0 calc(21.84vw - 2.84rem);
            margin-left: auto;
          }
        }
        /* ═══════════════════════════════════════════
           LIGHT MODE OVERRIDES
           ═══════════════════════════════════════════ */
        :is([data-theme="day"], [data-theme="desert"]) .ps-card {
          background: rgba(255, 255, 255, 0.92);
          border-color: var(--border);
          box-shadow: 0 2px 12px rgba(28,25,23,0.06);
        }
        :is([data-theme="day"], [data-theme="desert"]) .ps-card:hover {
          box-shadow: 0 12px 40px rgba(28,25,23,0.1),
                      0 0 0 1px color-mix(in srgb, var(--pc) 25%, transparent),
                      0 0 50px -10px color-mix(in srgb, var(--pc) 10%, transparent);
        }
        :is([data-theme="day"], [data-theme="desert"]) .ps-card-water-highlight {
          background: radial-gradient(
            circle 140px at var(--mx, 50%) var(--my, 50%),
            rgba(28,25,23,0.06),
            rgba(28,25,23,0.02) 35%,
            transparent 65%
          );
        }
        :is([data-theme="day"], [data-theme="desert"]) .ps-card-caustics {
          background:
            radial-gradient(ellipse 90px 70px at 22% 30%, rgba(146,64,14,0.08), transparent),
            radial-gradient(ellipse 70px 90px at 72% 68%, rgba(146,64,14,0.06), transparent),
            radial-gradient(ellipse 100px 55px at 58% 18%, rgba(146,64,14,0.05), transparent);
        }
        :is([data-theme="day"], [data-theme="desert"]) .ps-card-meta {
          border-top-color: var(--border);
        }
        :is([data-theme="day"], [data-theme="desert"]) .ps-bm {
          background: linear-gradient(135deg, rgba(255,255,255,0.96), rgba(250,250,249,0.98));
          border-color: var(--border);
        }
        :is([data-theme="day"], [data-theme="desert"]) .ps-bm:hover {
          border-color: var(--border-hover);
          box-shadow: 0 4px 20px rgba(28,25,23,0.08), 0 0 0 1px rgba(0,0,0,0.03);
        }
      `}</style>
    </div>
  )
}
