import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import ParticleCanvas from '../components/ParticleCanvas'
import ScrollReveal from '../components/ScrollReveal'
import TiltCard from '../components/TiltCard'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const featuredProjects = [
  {
    icon: 'ri-gamepad-line',
    title: 'Machine Strike',
    desc: 'Recreation of the Horizon Forbidden West in-game board game using Python with minimax and alpha-beta pruning AI.',
    tags: ['Python', 'AI', 'Game Dev'],
    link: 'https://github.com/HAVIC-47/Machine-Strike',
  },
  {
    icon: 'ri-swap-line',
    title: 'NoteSwap',
    desc: 'A web application for sharing and exchanging notes with fellow students, built through multiple iterations.',
    tags: ['Python', 'CSS', 'Web App'],
    link: 'https://github.com/HAVIC-47/final_NoteSwap',
  },
  {
    icon: 'ri-line-chart-line',
    title: 'Life Expectancy Prediction',
    desc: 'Machine learning project that predicts life expectancy using data analysis and predictive modeling techniques.',
    tags: ['Jupyter', 'ML', 'Data Science'],
    link: 'https://github.com/HAVIC-47/Life-expectancy-prediction-project',
  },
]

/* Fake code lines for the code editor panel */
const codeLines = [
  { indent: 0, kw: 'import', rest: ' React from ', str: "'react'" },
  { indent: 0, kw: 'import', rest: ' { useState } from ', str: "'react'" },
  { indent: 0, kw: 'import', rest: ' axios from ', str: "'axios'" },
  { indent: 0, rest: '' },
  { indent: 0, kw: 'const', rest: ' App = () => {' },
  { indent: 1, kw: 'const', rest: ' [data, setData] = useState([])' },
  { indent: 1, kw: 'const', rest: ' [loading, setLoading] = useState(', str: 'true', rest2: ')' },
  { indent: 1, rest: '' },
  { indent: 1, kw: 'useEffect', rest: '(() => {' },
  { indent: 2, rest: 'fetchData()' },
  { indent: 1, rest: '}, [])' },
  { indent: 1, rest: '' },
  { indent: 1, kw: 'async function', rest: ' fetchData() {' },
  { indent: 2, kw: 'const', rest: ' res = ', kw2: 'await', rest2: ' axios.get(', str: "'/api'", rest3: ')' },
  { indent: 2, rest: 'setData(res.data)' },
  { indent: 2, rest: 'setLoading(', str: 'false', rest2: ')' },
  { indent: 1, rest: '}' },
]

export default function Home() {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=250%',
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
        },
      })

      /* ============================================
         PHASE 1: Workspace scene (0 → 0.35)
         Panels float outward from monitor
         ============================================ */

      // Monitor subtle drift
      tl.fromTo('.ws-monitor',
        { y: 0 },
        { y: -15, duration: 0.35, ease: 'none' },
        0
      )

      // Floating panels — they start clustered near monitor, drift outward
      const panelDrifts = [
        { sel: '.fp-code',    x: -40,  y: -30,  r: -2  },
        { sel: '.fp-ui',      x: 15,   y: -35,  r: 1   },
        { sel: '.fp-chart',   x: 50,   y: -10,  r: 2   },
        { sel: '.fp-db',      x: 60,   y: -40,  r: -1  },
        { sel: '.fp-terminal',x: 30,   y: 25,   r: 1.5 },
        { sel: '.fp-mobile',  x: 70,   y: 10,   r: -2  },
      ]

      panelDrifts.forEach(p => {
        tl.to(p.sel, {
          x: p.x, y: p.y, rotation: p.r,
          duration: 0.35, ease: 'power1.out',
        }, 0)
      })

      // Glow pulse on monitor screen during workspace phase
      tl.fromTo('.monitor-glow',
        { opacity: 0.3 },
        { opacity: 0.6, duration: 0.2, ease: 'sine.inOut', yoyo: true, repeat: 1 },
        0.1
      )

      /* ============================================
         PHASE 2: Collapse + transition (0.35 → 0.55)
         Panels fly away, monitor shifts, energy burst
         ============================================ */

      // Panels scatter and fade
      const panelScatters = [
        { sel: '.fp-code',     x: -300, y: -200, r: -15, s: 0.3 },
        { sel: '.fp-ui',       x: -100, y: -350, r: 10,  s: 0.2 },
        { sel: '.fp-chart',    x: 200,  y: -300, r: 20,  s: 0.2 },
        { sel: '.fp-db',       x: 350,  y: -150, r: -12, s: 0.3 },
        { sel: '.fp-terminal', x: 150,  y: 300,  r: 15,  s: 0.2 },
        { sel: '.fp-mobile',   x: 400,  y: 100,  r: -20, s: 0.2 },
      ]

      panelScatters.forEach(p => {
        tl.to(p.sel, {
          x: p.x, y: p.y, rotation: p.r, scale: p.s, opacity: 0,
          duration: 0.2, ease: 'power3.in',
        }, 0.35)
      })

      // Monitor shrinks and fades
      tl.to('.ws-monitor', {
        scale: 0.6, opacity: 0, y: 80,
        duration: 0.18, ease: 'power3.in',
      }, 0.38)

      // Desk fades
      tl.to('.ws-desk', {
        opacity: 0, y: 40,
        duration: 0.12, ease: 'power2.in',
      }, 0.38)

      // Energy burst flash
      tl.fromTo('.energy-burst',
        { opacity: 0, scale: 0.2 },
        { opacity: 1, scale: 1.5, duration: 0.1, ease: 'power2.out' },
        0.42
      )
      tl.to('.energy-burst', {
        opacity: 0, scale: 3,
        duration: 0.12, ease: 'power2.in',
      }, 0.50)

      // Portal ring appears
      tl.fromTo('.portal-ring',
        { opacity: 0, scale: 0.3, rotation: -90 },
        { opacity: 1, scale: 1, rotation: 0, duration: 0.15, ease: 'power3.out' },
        0.44
      )
      tl.to('.portal-ring', {
        opacity: 0, scale: 2,
        duration: 0.1, ease: 'power2.in',
      }, 0.56
      )

      /* ============================================
         PHASE 3: Hero resolve (0.55 → 1.0)
         Particles, text, avatar all appear
         ============================================ */

      // Ambient orbs
      tl.fromTo('.hero-orb--warm',
        { opacity: 0, scale: 0.5 },
        { opacity: 0.15, scale: 1, duration: 0.2, ease: 'power2.out' },
        0.55
      )
      tl.fromTo('.hero-orb--cool',
        { opacity: 0, scale: 0.5 },
        { opacity: 0.1, scale: 1, duration: 0.2, ease: 'power2.out' },
        0.58
      )

      // "// hello, world"
      tl.fromTo('.hero-mono',
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.1, ease: 'power3.out' },
        0.60
      )

      // "I'm Faisal Hossain" — blur reveal
      tl.fromTo('.hero-heading',
        { opacity: 0, y: 50, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.15, ease: 'power3.out' },
        0.64
      )

      // Description
      tl.fromTo('.hero-desc',
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.12, ease: 'power3.out' },
        0.72
      )

      // Buttons
      tl.fromTo('.hero-btn',
        { opacity: 0, y: 25, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.08, ease: 'back.out(1.5)', stagger: 0.03 },
        0.78
      )

      // Social icons
      tl.fromTo('.hero-social-icon',
        { opacity: 0, y: 15, scale: 0.7 },
        { opacity: 1, y: 0, scale: 1, duration: 0.06, ease: 'back.out(2)', stagger: 0.02 },
        0.84
      )

      // Avatar glow ring
      tl.fromTo('.avatar-glow-ring',
        { opacity: 0, scale: 0.5, rotation: -180 },
        { opacity: 1, scale: 1, rotation: 0, duration: 0.2, ease: 'power3.out' },
        0.62
      )

      // Avatar image — blur to sharp
      tl.fromTo('.avatar-img',
        { opacity: 0, scale: 0.6, filter: 'blur(15px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.18, ease: 'power3.out' },
        0.66
      )

      // Avatar glow ring settles (cyan → border color)
      tl.to('.avatar-glow-ring', {
        opacity: 0.5, boxShadow: '0 0 40px var(--accent-glow)',
        duration: 0.15, ease: 'power1.inOut',
      }, 0.85)

    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="home-page">
      {/* Full-page particle bg + hover effect */}
      <div className="page-particles">
        <ParticleCanvas />
      </div>
      <div className="page-orb page-orb--warm" />
      <div className="page-orb page-orb--cool" />

      <section ref={heroRef} className="hero-scroll-section">

        {/* ── WORKSPACE SCENE ── */}
        <div className="workspace-layer">
          {/* Desk surface */}
          <div className="ws-desk" />

          {/* Monitor */}
          <div className="ws-monitor">
            <div className="monitor-bezel">
              <div className="monitor-screen">
                <div className="monitor-glow" />
              </div>
            </div>
            <div className="monitor-stand" />
            <div className="monitor-base" />
          </div>

          {/* Floating panels */}
          <div className="floating-panel fp-code">
            <div className="fp-header">
              <span className="fp-dot" style={{ background: '#ff5f57' }} />
              <span className="fp-dot" style={{ background: '#febc2e' }} />
              <span className="fp-dot" style={{ background: '#28c840' }} />
              <span className="fp-title">app.jsx</span>
            </div>
            <div className="fp-body fp-code-body">
              {codeLines.map((l, i) => (
                <div key={i} className="code-line" style={{ paddingLeft: l.indent * 16 }}>
                  {l.kw && <span className="ck">{l.kw}</span>}
                  {l.rest && <span className="ct">{l.rest}</span>}
                  {l.str && <span className="cs">{l.str}</span>}
                  {l.kw2 && <span className="ck"> {l.kw2}</span>}
                  {l.rest2 && <span className="ct">{l.rest2}</span>}
                  {l.rest3 && <span className="ct">{l.rest3}</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="floating-panel fp-ui">
            <div className="fp-header">
              <span className="fp-dot" style={{ background: '#ff5f57' }} />
              <span className="fp-dot" style={{ background: '#febc2e' }} />
              <span className="fp-dot" style={{ background: '#28c840' }} />
              <span className="fp-title">dashboard</span>
            </div>
            <div className="fp-body fp-ui-body">
              <div className="ui-nav">
                <div className="ui-nav-item active" />
                <div className="ui-nav-item" />
                <div className="ui-nav-item" />
              </div>
              <div className="ui-chart-area">
                <svg viewBox="0 0 120 50" className="ui-line-chart">
                  <polyline points="0,40 20,35 40,20 60,30 80,10 100,18 120,5" fill="none" stroke="var(--accent)" strokeWidth="2" />
                  <polyline points="0,40 20,35 40,20 60,30 80,10 100,18 120,5" fill="url(#chartGrad)" stroke="none" />
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="ui-bars">
                <div className="ui-bar" style={{ height: '60%' }} />
                <div className="ui-bar" style={{ height: '85%' }} />
                <div className="ui-bar" style={{ height: '45%' }} />
                <div className="ui-bar" style={{ height: '70%' }} />
                <div className="ui-bar" style={{ height: '55%' }} />
              </div>
              <div className="ui-buttons">
                <div className="ui-btn-mock primary" />
                <div className="ui-btn-mock outline" />
              </div>
            </div>
          </div>

          <div className="floating-panel fp-chart">
            <div className="fp-header">
              <span className="fp-dot" style={{ background: '#ff5f57' }} />
              <span className="fp-dot" style={{ background: '#febc2e' }} />
              <span className="fp-dot" style={{ background: '#28c840' }} />
              <span className="fp-title">analytics</span>
            </div>
            <div className="fp-body fp-chart-body">
              <svg viewBox="0 0 100 60" className="fp-line-svg">
                <polyline points="5,50 20,42 35,45 50,25 65,30 80,15 95,20" fill="none" stroke="#4ecdc4" strokeWidth="2" strokeLinecap="round" />
                <polyline points="5,55 20,48 35,52 50,38 65,42 80,32 95,35" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
              </svg>
              <div className="fp-stat-row">
                <div className="fp-stat-pill" /><div className="fp-stat-pill" /><div className="fp-stat-pill" />
              </div>
            </div>
          </div>

          <div className="floating-panel fp-db">
            <div className="fp-header">
              <span className="fp-dot" style={{ background: '#ff5f57' }} />
              <span className="fp-dot" style={{ background: '#febc2e' }} />
              <span className="fp-dot" style={{ background: '#28c840' }} />
              <span className="fp-title">schema</span>
            </div>
            <div className="fp-body fp-db-body">
              <div className="db-node db-n1"><i className="ri-database-2-line" /><span>Users</span></div>
              <div className="db-node db-n2"><i className="ri-database-2-line" /><span>Posts</span></div>
              <div className="db-node db-n3"><i className="ri-server-line" /><span>API</span></div>
              <svg className="db-lines" viewBox="0 0 100 80">
                <line x1="30" y1="20" x2="70" y2="20" stroke="var(--accent)" strokeWidth="1" opacity="0.5" />
                <line x1="50" y1="20" x2="50" y2="60" stroke="var(--accent)" strokeWidth="1" opacity="0.5" />
              </svg>
            </div>
          </div>

          <div className="floating-panel fp-terminal">
            <div className="fp-header">
              <span className="fp-dot" style={{ background: '#ff5f57' }} />
              <span className="fp-dot" style={{ background: '#febc2e' }} />
              <span className="fp-dot" style={{ background: '#28c840' }} />
              <span className="fp-title">terminal</span>
            </div>
            <div className="fp-body fp-term-body">
              <p><span className="term-g">$</span> npm run dev</p>
              <p className="term-d">Starting server...</p>
              <p className="term-g">&#10003; Ready on localhost:3000</p>
              <p><span className="term-g">$</span> git push origin main</p>
              <p className="term-d">Enumerating objects: 24</p>
              <p className="term-g">&#10003; Deployed successfully</p>
            </div>
          </div>

          <div className="floating-panel fp-mobile">
            <div className="fp-header">
              <span className="fp-dot" style={{ background: '#ff5f57' }} />
              <span className="fp-dot" style={{ background: '#febc2e' }} />
              <span className="fp-dot" style={{ background: '#28c840' }} />
            </div>
            <div className="fp-body fp-mobile-body">
              <div className="mob-header" />
              <div className="mob-line" />
              <div className="mob-line short" />
              <div className="mob-card" />
              <div className="mob-card" />
            </div>
          </div>
        </div>

        {/* ── TRANSITION FX ── */}
        <div className="energy-burst" />
        <div className="portal-ring" />

        {/* ── HERO LAYER (orbs animated by GSAP) ── */}
        <div className="hero-orb hero-orb--warm" />
        <div className="hero-orb hero-orb--cool" />

        <div className="container hero-content-wrap">
          <div className="hero-grid">
            <div className="hero-text-col">
              <p className="mono hero-mono" style={{ opacity: 0 }}>// hello, world</p>
              <h1 className="hero-heading" style={{ opacity: 0 }}>
                I'm <span className="accent-text">Faisal Hossain</span>
              </h1>
              <p className="hero-desc" style={{ opacity: 0 }}>
                An aspiring <strong>Python full-stack developer</strong> who loves turning ideas into real-world applications — from AI projects to web platforms.
              </p>
              <div className="hero-buttons" style={{ opacity: 0 }}>
                <Link to="/projects" className="btn btn-primary hero-btn">
                  <i className="ri-code-s-slash-line"></i> View Projects
                </Link>
                <Link to="/about" className="btn btn-outline hero-btn">
                  <i className="ri-user-line"></i> About Me
                </Link>
              </div>
              <div className="hero-socials">
                <a href="https://github.com/HAVIC-47" target="_blank" rel="noopener noreferrer" className="social-icon hero-social-icon" style={{ opacity: 0 }}><i className="ri-github-fill"></i></a>
                <a href="https://www.facebook.com/HAVIC47" target="_blank" rel="noopener noreferrer" className="social-icon hero-social-icon" style={{ opacity: 0 }}><i className="ri-facebook-fill"></i></a>
                <a href="https://www.instagram.com/visuals_of_faisal" target="_blank" rel="noopener noreferrer" className="social-icon hero-social-icon" style={{ opacity: 0 }}><i className="ri-instagram-line"></i></a>
                <a href="https://discord.gg/pgakM24PEs" target="_blank" rel="noopener noreferrer" className="social-icon hero-social-icon" style={{ opacity: 0 }}><i className="ri-discord-fill"></i></a>
              </div>
            </div>
            <div className="hero-avatar-col">
              <div className="avatar-wrap">
                <div className="avatar-glow-ring" style={{ opacity: 0 }} />
                <img
                  src="https://avatars.githubusercontent.com/u/123256888?v=4"
                  alt="Faisal Hossain"
                  className="avatar-img"
                  style={{ opacity: 0 }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="container">
          <ScrollReveal>
            <div className="about-stats">
              <div className="stat-item"><div className="stat-number">15+</div><div className="stat-label">Projects Built</div></div>
              <div className="stat-item"><div className="stat-number">6+</div><div className="stat-label">Technologies</div></div>
              <div className="stat-item"><div className="stat-number">3+</div><div className="stat-label">Years Coding</div></div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Projects */}
      <section style={{ padding: '4rem 0', position: 'relative', zIndex: 1 }}>
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <span className="section-label">Featured Work</span>
              <h2>Recent Projects</h2>
              <p>A few highlights from my portfolio</p>
            </div>
          </ScrollReveal>
          <div className="projects-grid">
            {featuredProjects.map((p, i) => (
              <ScrollReveal key={p.title} delay={0.1 * (i + 1)}>
                <TiltCard className="project-card">
                  <div className="project-top">
                    <div className="project-icon"><i className={p.icon}></i></div>
                    <div className="project-links">
                      <a href={p.link} target="_blank" rel="noopener noreferrer"><i className="ri-github-fill"></i></a>
                    </div>
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <div className="project-tags">
                    {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
              <Link to="/projects" className="btn btn-outline">
                View All Projects <i className="ri-arrow-right-line"></i>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <style>{`
        /* ===== PAGE WRAPPER ===== */
        .home-page {
          position: relative;
          background: var(--bg-primary);
          min-height: 100vh;
        }

        /* Full-page particle canvas — pointer-events none so content is clickable */
        .page-particles {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }

        /* Page-level ambient orbs */
        .page-orb {
          position: fixed;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
          z-index: 0;
        }
        .page-orb--warm {
          width: 500px;
          height: 500px;
          background: var(--accent);
          top: 5%;
          right: -8%;
          opacity: 0.08;
          animation: pulse 4s ease-in-out infinite;
        }
        .page-orb--cool {
          width: 400px;
          height: 400px;
          background: var(--accent);
          bottom: 8%;
          left: -6%;
          opacity: 0.06;
          animation: pulse 4s ease-in-out infinite 2s;
        }

        /* All sections transparent so particles show through */
        .stats-section {
          padding-top: 2rem;
          padding-bottom: 4rem;
          position: relative;
          z-index: 1;
        }

        /* ===== HERO SCROLL SECTION ===== */
        .hero-scroll-section {
          height: 100vh;
          position: relative;
          perspective: 1200px;
          z-index: 1;
        }

        /* ===== WORKSPACE LAYER ===== */
        .workspace-layer {
          position: absolute;
          inset: 0;
          z-index: 4;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ── Desk ── */
        .ws-desk {
          position: absolute;
          bottom: 12%;
          left: 20%;
          right: 20%;
          height: 3px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.08) 70%, transparent);
          border-radius: 2px;
        }

        /* ── Monitor ── */
        .ws-monitor {
          position: absolute;
          bottom: 14%;
          left: 50%;
          transform: translateX(-50%);
          will-change: transform, opacity;
        }
        .monitor-bezel {
          width: 280px;
          height: 180px;
          background: #1a1a22;
          border: 2px solid #2a2a35;
          border-radius: 12px;
          padding: 8px;
          position: relative;
        }
        .monitor-screen {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #0d1117 0%, #161b22 100%);
          border-radius: 6px;
          overflow: hidden;
          position: relative;
        }
        .monitor-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 40% 40%, rgba(201,168,124,0.15), transparent 60%);
          opacity: 0.3;
        }
        .monitor-stand {
          width: 40px;
          height: 30px;
          background: linear-gradient(to bottom, #2a2a35, #1a1a22);
          margin: 0 auto;
          clip-path: polygon(15% 0, 85% 0, 100% 100%, 0% 100%);
        }
        .monitor-base {
          width: 80px;
          height: 6px;
          background: #2a2a35;
          border-radius: 3px;
          margin: 0 auto;
        }

        /* ===== FLOATING PANELS ===== */
        .floating-panel {
          position: absolute;
          background: rgba(22, 22, 32, 0.85);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(201, 168, 124, 0.15);
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05);
          will-change: transform, opacity;
          z-index: 5;
        }
        .fp-header {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 6px 10px;
          background: rgba(255,255,255,0.03);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .fp-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .fp-title {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          color: var(--text-muted);
          margin-left: 6px;
        }
        .fp-body { padding: 10px; }

        /* ── Code panel ── */
        .fp-code {
          width: 240px;
          top: 15%;
          left: 8%;
        }
        .fp-code-body {
          font-family: var(--font-mono);
          font-size: 0.55rem;
          line-height: 1.6;
          max-height: 180px;
          overflow: hidden;
        }
        .code-line { white-space: nowrap; color: #abb2bf; }
        .ck { color: #c678dd; }
        .cs { color: #98c379; }
        .ct { color: #abb2bf; }

        /* ── UI Dashboard panel ── */
        .fp-ui {
          width: 200px;
          top: 12%;
          left: 35%;
        }
        .fp-ui-body { display: flex; flex-direction: column; gap: 8px; }
        .ui-nav { display: flex; gap: 4px; }
        .ui-nav-item { height: 4px; width: 30px; background: rgba(255,255,255,0.1); border-radius: 2px; }
        .ui-nav-item.active { background: var(--accent); }
        .ui-chart-area { height: 35px; }
        .ui-line-chart { width: 100%; height: 100%; }
        .ui-bars { display: flex; gap: 4px; align-items: flex-end; height: 40px; }
        .ui-bar { flex: 1; background: linear-gradient(to top, var(--accent), rgba(201,168,124,0.3)); border-radius: 2px 2px 0 0; }
        .ui-buttons { display: flex; gap: 6px; margin-top: 4px; }
        .ui-btn-mock { height: 14px; border-radius: 4px; flex: 1; }
        .ui-btn-mock.primary { background: var(--accent); }
        .ui-btn-mock.outline { background: transparent; border: 1px solid rgba(255,255,255,0.15); }

        /* ── Chart panel ── */
        .fp-chart {
          width: 160px;
          top: 18%;
          right: 22%;
        }
        .fp-chart-body { display: flex; flex-direction: column; gap: 6px; }
        .fp-line-svg { width: 100%; height: 50px; }
        .fp-stat-row { display: flex; gap: 4px; }
        .fp-stat-pill { height: 8px; flex: 1; background: rgba(255,255,255,0.06); border-radius: 4px; }

        /* ── Database panel ── */
        .fp-db {
          width: 150px;
          top: 10%;
          right: 8%;
        }
        .fp-db-body { position: relative; min-height: 80px; }
        .db-node {
          display: flex; align-items: center; gap: 4px;
          font-size: 0.55rem; color: var(--text-secondary);
          padding: 3px 6px; background: rgba(255,255,255,0.04);
          border-radius: 4px; position: absolute;
        }
        .db-node i { color: var(--accent); font-size: 0.7rem; }
        .db-n1 { top: 5px; left: 5px; }
        .db-n2 { top: 5px; right: 5px; }
        .db-n3 { bottom: 5px; left: 50%; transform: translateX(-50%); }
        .db-lines { position: absolute; inset: 0; }

        /* ── Terminal panel ── */
        .fp-terminal {
          width: 180px;
          bottom: 22%;
          right: 18%;
        }
        .fp-term-body {
          font-family: var(--font-mono);
          font-size: 0.5rem;
          line-height: 1.8;
          color: #abb2bf;
        }
        .fp-term-body p { margin: 0; white-space: nowrap; }
        .term-g { color: #28c840; }
        .term-d { color: var(--text-muted); }

        /* ── Mobile panel ── */
        .fp-mobile {
          width: 90px;
          bottom: 25%;
          right: 6%;
        }
        .fp-mobile-body { display: flex; flex-direction: column; gap: 5px; }
        .mob-header { height: 6px; background: rgba(255,255,255,0.08); border-radius: 3px; }
        .mob-line { height: 3px; background: rgba(255,255,255,0.05); border-radius: 2px; }
        .mob-line.short { width: 60%; }
        .mob-card { height: 16px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 4px; }

        /* ===== TRANSITION FX ===== */
        .energy-burst {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(78,205,196,0.6) 0%, rgba(201,168,124,0.3) 40%, transparent 70%);
          opacity: 0;
          z-index: 6;
          pointer-events: none;
          will-change: transform, opacity;
        }
        .portal-ring {
          position: absolute;
          top: 50%;
          right: 25%;
          transform: translate(50%, -50%);
          width: 250px;
          height: 250px;
          border-radius: 50%;
          border: 3px solid rgba(78,205,196,0.6);
          box-shadow: 0 0 40px rgba(78,205,196,0.3), inset 0 0 40px rgba(78,205,196,0.1);
          opacity: 0;
          z-index: 6;
          pointer-events: none;
          will-change: transform, opacity;
        }

        /* ===== HERO ORBS (animated by GSAP) ===== */
        .hero-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0;
          z-index: 1;
          pointer-events: none;
          will-change: transform, opacity;
        }
        .hero-orb--warm {
          width: 500px;
          height: 500px;
          background: var(--accent);
          top: 5%;
          right: -8%;
        }
        .hero-orb--cool {
          width: 400px;
          height: 400px;
          background: var(--accent);
          bottom: 8%;
          left: -6%;
        }

        /* ── Hero content ── */
        .hero-content-wrap {
          position: absolute;
          inset: 0;
          z-index: 8;
          display: flex;
          align-items: center;
          padding-top: 64px;
          pointer-events: none;
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          width: 100%;
        }
        .hero-text-col {
          display: flex;
          flex-direction: column;
          pointer-events: auto;
        }
        .hero-mono {
          color: var(--accent);
          margin-bottom: 1rem;
          will-change: transform, opacity;
        }
        .hero-heading {
          margin-bottom: 1rem;
          will-change: transform, opacity, filter;
        }
        .hero-desc {
          font-size: 1.15rem;
          color: var(--text-secondary);
          margin-bottom: 2rem;
          max-width: 440px;
          will-change: transform, opacity;
        }
        .hero-desc strong { color: var(--text-primary); }
        .hero-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .hero-btn { will-change: transform, opacity; }
        .hero-socials {
          display: flex;
          gap: 0.75rem;
          margin-top: 2rem;
        }
        .hero-social-icon { will-change: transform, opacity; }

        /* ── Avatar ── */
        .hero-avatar-col {
          display: flex;
          justify-content: center;
          align-items: center;
          pointer-events: auto;
        }
        .avatar-wrap {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .avatar-glow-ring {
          position: absolute;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          border: 3px solid rgba(78, 205, 196, 0.5);
          box-shadow: 0 0 60px rgba(78, 205, 196, 0.25), inset 0 0 60px rgba(78, 205, 196, 0.08);
          will-change: transform, opacity;
        }
        .avatar-img {
          width: 300px;
          height: 300px;
          border-radius: 50%;
          border: 3px solid var(--border);
          object-fit: cover;
          position: relative;
          z-index: 1;
          box-shadow: 0 0 60px var(--accent-glow);
          will-change: transform, opacity, filter;
        }

        /* ===== RESPONSIVE ===== */

        /* Tablet */
        @media (max-width: 1024px) {
          .workspace-layer { transform: scale(0.85); }
          .energy-burst { transform: translate(-50%, -50%) scale(0.85); }
          .portal-ring { transform: translate(50%, -50%) scale(0.85); }
          .avatar-img { width: 260px; height: 260px; }
          .avatar-glow-ring { width: 280px; height: 280px; }
          .hero-grid { gap: 2.5rem; }
        }

        /* Small tablet / large phone landscape */
        @media (max-width: 768px) {
          .workspace-layer { transform: scale(0.65); }
          .energy-burst { transform: translate(-50%, -50%) scale(0.65); }
          .portal-ring { transform: translate(50%, -50%) scale(0.65); }

          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
            gap: 1.5rem !important;
          }
          .hero-grid > .hero-text-col { order: 2; }
          .hero-grid > .hero-avatar-col { order: 1; }
          .hero-desc { margin-left: auto; margin-right: auto; font-size: 1rem; }
          .hero-buttons { justify-content: center; }
          .hero-socials { justify-content: center; }
          .avatar-img { width: 200px !important; height: 200px !important; }
          .avatar-glow-ring { width: 220px !important; height: 220px !important; }
          .hero-orb--warm { width: 300px; height: 300px; }
          .hero-orb--cool { width: 250px; height: 250px; }
          .hero-content-wrap { padding-top: 56px; }
        }

        /* Mobile portrait */
        @media (max-width: 480px) {
          .workspace-layer { transform: scale(0.48); }
          .energy-burst { transform: translate(-50%, -50%) scale(0.5); }
          .portal-ring { transform: translate(50%, -50%) scale(0.5); }

          .hero-grid { gap: 1.25rem !important; }
          .avatar-img { width: 150px !important; height: 150px !important; }
          .avatar-glow-ring { width: 165px !important; height: 165px !important; }
          .hero-heading { font-size: 1.85rem !important; }
          .hero-mono { font-size: 0.8rem !important; }
          .hero-desc { font-size: 0.92rem !important; max-width: 90vw; }
          .hero-content-wrap { padding-top: 48px; }
        }

        /* Small phones */
        @media (max-width: 360px) {
          .workspace-layer { transform: scale(0.38); }
          .energy-burst { transform: translate(-50%, -50%) scale(0.4); }
          .portal-ring { transform: translate(50%, -50%) scale(0.4); }

          .avatar-img { width: 130px !important; height: 130px !important; }
          .avatar-glow-ring { width: 145px !important; height: 145px !important; }
          .hero-heading { font-size: 1.6rem !important; }
          .hero-buttons .btn { padding: 0.6rem 1rem; font-size: 0.8rem; }
        }

        /* Landscape phones */
        @media (max-height: 500px) and (orientation: landscape) {
          .workspace-layer { transform: scale(0.55); }
          .energy-burst { transform: translate(-50%, -50%) scale(0.55); }
          .portal-ring { transform: translate(50%, -50%) scale(0.55); }

          .hero-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 1.5rem !important;
            text-align: left;
          }
          .hero-grid > .hero-text-col { order: 1; }
          .hero-grid > .hero-avatar-col { order: 2; }
          .avatar-img { width: 140px !important; height: 140px !important; }
          .avatar-glow-ring { width: 155px !important; height: 155px !important; }
          .hero-heading { font-size: 1.5rem !important; margin-bottom: 0.5rem !important; }
          .hero-desc { font-size: 0.85rem !important; margin-bottom: 1rem; }
          .hero-mono { margin-bottom: 0.5rem; }
          .hero-buttons { gap: 0.5rem; }
          .hero-buttons .btn { padding: 0.5rem 1rem; font-size: 0.8rem; }
          .hero-socials { margin-top: 0.75rem; gap: 0.5rem; }
          .hero-content-wrap { padding-top: 40px; }
        }
      `}</style>
    </div>
  )
}
