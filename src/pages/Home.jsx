import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import ParticleCanvas from '../components/ParticleCanvas'
import ScrollReveal from '../components/ScrollReveal'
import TiltCard from '../components/TiltCard'
import ProjectShowcase from '../components/ProjectShowcase'
import SkillsShowcase from '../components/SkillsShowcase'
import ContactScrollSequence from '../components/ContactScrollSequence'
import GetToKnowMe from '../components/GetToKnowMe'
import WhatDrivesMe from '../components/WhatDrivesMe'
import FutureInterests from '../components/FutureInterests'
import GlowStat from '../components/GlowStat'
import gsap from 'gsap'

const roles = [
  { label: 'Full-Stack Developer', icon: 'ri-code-s-slash-line' },
  { label: 'AI / ML Engineer', icon: 'ri-brain-line' },
  { label: 'UI / UX Designer', icon: 'ri-palette-line' },
  { label: 'Problem Solver', icon: 'ri-lightbulb-flash-line' },
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

/* All projects */
const allProjects = [
  { icon: 'ri-gamepad-line', title: 'Machine Strike', desc: 'Recreation of the Horizon Forbidden West board game with minimax and alpha-beta pruning AI opponent. A deep dive into game theory and adversarial search.', tags: ['Python', 'AI', 'Minimax', 'Game Dev'], link: 'https://github.com/HAVIC-47/Machine-Strike' },
  { icon: 'ri-swap-line', title: 'NoteSwap', desc: 'A student-focused web app for sharing and exchanging notes. Went through three iterations from prototype to final product.', tags: ['Python', 'Django', 'CSS', 'Web App'], link: 'https://github.com/HAVIC-47/final_NoteSwap' },
  { icon: 'ri-line-chart-line', title: 'Life Expectancy Prediction', desc: 'Machine learning project using data analysis and predictive modeling to estimate life expectancy based on health and economic indicators.', tags: ['Jupyter', 'Machine Learning', 'Data Science'], link: 'https://github.com/HAVIC-47/Life-expectancy-prediction-project' },
  { icon: 'ri-calendar-event-line', title: 'EventEase', desc: 'An event management web application for organizing, tracking, and managing events with a clean user interface.', tags: ['HTML', 'CSS', 'JavaScript'], link: 'https://github.com/HAVIC-47/EventEase' },
  { icon: 'ri-code-box-line', title: 'Compiler', desc: 'A compiler implementation exploring lexical analysis, parsing, and code generation — understanding how programming languages work under the hood.', tags: ['Python', 'Compiler Design'], link: 'https://github.com/HAVIC-47/Compiler-' },
  { icon: 'ri-terminal-box-line', title: 'OS Scheduling Algorithms', desc: 'Implementation of FCFS and SJF CPU scheduling algorithms — exploring how operating systems manage process execution.', tags: ['Python', 'OS Concepts', 'Algorithms'], link: 'https://github.com/HAVIC-47/OS-LAB-1' },
  { icon: 'ri-robot-2-line', title: 'AI Lab Projects', desc: 'Collection of AI coursework projects exploring logic programming, search algorithms, and knowledge representation in Prolog.', tags: ['Prolog', 'AI', 'Logic Programming'], link: 'https://github.com/HAVIC-47/AI_LAB_projects' },
  { icon: 'ri-refresh-line', title: 'Updated NoteSwap', desc: 'Revised version of NoteSwap with improved features, better UX, and refined codebase based on learnings from the original build.', tags: ['Python', 'Web App', 'Iteration'], link: 'https://github.com/HAVIC-47/Updated_NoteSwap' },
  { icon: 'ri-computer-line', title: 'OS Projects', desc: 'Operating systems coursework — implementations covering process management, memory allocation, and system-level programming concepts.', tags: ['Python', 'Operating Systems'], link: 'https://github.com/HAVIC-47/OS' },
]

/* Skills */
const skillCategories = [
  {
    icon: 'ri-code-s-slash-line', title: 'Languages',
    items: [
      { icon: 'ri-code-line', label: 'Python' },
      { icon: 'ri-code-line', label: 'C' },
      { icon: 'ri-code-line', label: 'Java' },
      { icon: 'ri-code-line', label: 'Prolog' },
      { icon: 'ri-code-line', label: 'HTML' },
      { icon: 'ri-code-line', label: 'CSS' },
      { icon: 'ri-code-line', label: 'JavaScript' },
    ]
  },
  {
    icon: 'ri-stack-line', title: 'Frameworks',
    items: [
      { icon: 'ri-global-line', label: 'Django' },
      { icon: 'ri-server-line', label: 'Apache' },
    ]
  },
  {
    icon: 'ri-database-2-line', title: 'Databases',
    items: [
      { icon: 'ri-database-line', label: 'MySQL' },
    ]
  },
  {
    icon: 'ri-tools-line', title: 'Tools & Platforms',
    items: [
      { icon: 'ri-git-merge-line', label: 'Git' },
      { icon: 'ri-github-fill', label: 'GitHub' },
      { icon: 'ri-file-list-3-line', label: 'Notion' },
      { icon: 'ri-palette-line', label: 'Canva' },
      { icon: 'ri-shield-keyhole-line', label: 'Tor' },
    ]
  },
  {
    icon: 'ri-robot-2-line', title: 'AI & Data Science',
    items: [
      { icon: 'ri-brain-line', label: 'Machine Learning' },
      { icon: 'ri-bar-chart-grouped-line', label: 'Data Analysis' },
      { icon: 'ri-file-code-line', label: 'Jupyter Notebooks' },
      { icon: 'ri-search-eye-line', label: 'Minimax / Alpha-Beta' },
    ]
  },
  {
    icon: 'ri-lightbulb-line', title: 'Concepts',
    items: [
      { icon: 'ri-flow-chart', label: 'Algorithms' },
      { icon: 'ri-terminal-box-line', label: 'OS Concepts' },
      { icon: 'ri-code-box-line', label: 'Compiler Design' },
      { icon: 'ri-global-line', label: 'Web Development' },
      { icon: 'ri-database-2-line', label: 'DBMS' },
    ]
  },
]

const learning = [
  { icon: 'ri-server-line', title: 'Full-Stack Development', desc: 'Deepening Django skills and exploring modern frontend frameworks to become a complete full-stack developer.' },
  { icon: 'ri-brain-line', title: 'Advanced AI/ML', desc: 'Expanding machine learning knowledge with deep learning, neural networks, and more complex AI architectures.' },
]

/* About timeline */
const timeline = [
  { date: '2026 — Present', title: 'Full-Stack Engineering & Design', desc: 'Building full-stack web applications while refining expertise in dynamic web design and UI/UX. Currently serving as an SQA and UI/UX intern at Utopia IT Limited.' },
  { date: '2025', title: 'AI, ML & LLM Systems', desc: 'Focused on machine learning, LLMs, and healthcare-oriented AI. Delivered the Life Expectancy Prediction system and built Machine Strike — an AI-powered board game driven by the minimax algorithm.' },
  { date: '2024', title: 'Full-Stack Development with Django', desc: 'Shipped full-stack Python and Django projects including NoteSwap and EventEase, deepening backend architecture, data modeling, and deployment practices.' },
  { date: '2023', title: 'Front-End, Back-End & System Design', desc: 'Studied the full web stack — front-end, back-end, and system design fundamentals — and launched my first independent project, NoteSwap v1.' },
  { date: '2022', title: 'Started BSc in Computer Science', desc: 'Began my Computer Science & Engineering degree at the University of Asia Pacific, laying the foundation in programming, algorithms, and systems.' },
]

const interests = [
  { icon: 'ri-robot-2-line', title: 'Artificial Intelligence', desc: 'Fascinated by how machines can learn, reason, and make decisions. From minimax algorithms to ML models.' },
  { icon: 'ri-terminal-box-line', title: 'Systems Programming', desc: 'Understanding how things work under the hood — OS scheduling, compilers, and low-level system design.' },
  { icon: 'ri-camera-lens-line', title: 'Visual Storytelling', desc: 'Capturing moments through photography — check out my Instagram @visuals_of_faisal for my visual work.' },
]

/* Contact */
const contacts = [
  { icon: 'ri-mail-line', title: 'Email', value: 'faisaladobe666@gmail.com', link: 'mailto:faisaladobe666@gmail.com' },
  { icon: 'ri-phone-line', title: 'Phone', value: '01829937871', link: 'tel:+8801829937871' },
  { icon: 'ri-github-fill', title: 'GitHub', value: 'github.com/HAVIC-47', link: 'https://github.com/HAVIC-47' },
  { icon: 'ri-facebook-fill', title: 'Facebook', value: 'facebook.com/HAVIC47', link: 'https://www.facebook.com/HAVIC47' },
  { icon: 'ri-instagram-line', title: 'Instagram', value: '@visuals_of_faisal', link: 'https://www.instagram.com/visuals_of_faisal' },
  { icon: 'ri-discord-fill', title: 'Discord', value: 'Join my server', link: 'https://discord.gg/pgakM24PEs' },
  { icon: 'ri-map-pin-line', title: 'Location', value: 'Bangladesh', link: null },
]

const socials = [
  { icon: 'ri-github-fill', link: 'https://github.com/HAVIC-47' },
  { icon: 'ri-facebook-fill', link: 'https://www.facebook.com/HAVIC47' },
  { icon: 'ri-instagram-line', link: 'https://www.instagram.com/visuals_of_faisal' },
  { icon: 'ri-discord-fill', link: 'https://discord.gg/pgakM24PEs' },
]

export default function Home() {
  const heroRef = useRef(null)
  const [sent, setSent] = useState(false)
  const [roleIdx, setRoleIdx] = useState(0)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const id = setInterval(() => setRoleIdx(i => (i + 1) % roles.length), 2600)
    return () => clearInterval(id)
  }, [])

  function copyEmail() {
    navigator.clipboard?.writeText('faisaladobe666@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
    setTimeout(() => {
      setSent(false)
      e.target.reset()
    }, 2500)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Auto-playing timeline — ~2s total, smooth power2.inOut easing throughout
      const tl = gsap.timeline({ delay: 0.15 })

      /* ============================================
         PHASE 1: Workspace scene (0s → 0.6s)
         ============================================ */

      tl.fromTo('.ws-monitor',
        { y: 0 },
        { y: -15, duration: 0.6, ease: 'power2.inOut' },
        0
      )

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
          duration: 0.6, ease: 'power2.inOut',
        }, 0)
      })

      tl.fromTo('.monitor-glow',
        { opacity: 0.3 },
        { opacity: 0.6, duration: 0.3, ease: 'sine.inOut', yoyo: true, repeat: 1 },
        0.1
      )

      /* ============================================
         PHASE 2: Collapse + transition (0.6s → 1.05s)
         ============================================ */

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
          duration: 0.25, ease: 'power2.in',
        }, 0.6)
      })

      tl.to('.ws-monitor', {
        scale: 0.6, opacity: 0, y: 80,
        duration: 0.2, ease: 'power2.in',
      }, 0.65)

      tl.to('.ws-desk', {
        opacity: 0, y: 40,
        duration: 0.15, ease: 'power2.in',
      }, 0.65)

      tl.fromTo('.energy-burst',
        { opacity: 0, scale: 0.2 },
        { opacity: 1, scale: 1.5, duration: 0.12, ease: 'power2.out' },
        0.78
      )
      tl.to('.energy-burst', {
        opacity: 0, scale: 3,
        duration: 0.15, ease: 'power2.inOut',
      }, 0.9)

      tl.fromTo('.portal-ring',
        { opacity: 0, scale: 0.3, rotation: -90 },
        { opacity: 1, scale: 1, rotation: 0, duration: 0.2, ease: 'power2.out' },
        0.8
      )
      tl.to('.portal-ring', {
        opacity: 0, scale: 2,
        duration: 0.15, ease: 'power2.inOut',
      }, 1.0)

      /* ============================================
         PHASE 3: Hero resolve (1.05s → 2.0s)
         ============================================ */

      tl.fromTo('.hero-orb--warm',
        { opacity: 0, scale: 0.5 },
        { opacity: 0.15, scale: 1, duration: 0.25, ease: 'power2.out' },
        1.05
      )
      tl.fromTo('.hero-orb--cool',
        { opacity: 0, scale: 0.5 },
        { opacity: 0.1, scale: 1, duration: 0.25, ease: 'power2.out' },
        1.1
      )

      tl.fromTo('.hero-mono',
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.2, ease: 'power2.out' },
        1.1
      )

      tl.fromTo('.hero-heading',
        { opacity: 0, y: 30, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.3, ease: 'power2.out' },
        1.2
      )

      tl.fromTo('.hero-desc',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' },
        1.4
      )

      tl.fromTo('.hero-btn',
        { opacity: 0, y: 15, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: 'power2.out', stagger: 0.05 },
        1.55
      )

      tl.fromTo('.hero-social-icon',
        { opacity: 0, y: 10, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.15, ease: 'power2.out', stagger: 0.04 },
        1.7
      )

      tl.fromTo('.avatar-glow-ring',
        { opacity: 0 },
        { opacity: 1, duration: 0.05, ease: 'none' },
        0
      )

      tl.fromTo('.avatar-img',
        { opacity: 0 },
        { opacity: 1, duration: 0.05, ease: 'none' },
        0
      )

      tl.to('.avatar-glow-ring', {
        opacity: 0.5, boxShadow: '0 0 40px var(--accent-glow)',
        duration: 0.25, ease: 'power2.inOut',
      }, 1.8)

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

      {/* ═══════════════════════════════════════════
          HERO SECTION (scroll animation)
          ═══════════════════════════════════════════ */}
      <section id="home" ref={heroRef} className="hero-scroll-section">

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
          <div className="hero-split">
            {/* ─── LEFT COLUMN ─── */}
            <div className="hs-col hs-col--left">
              <p className="mono hero-mono hs-mono" style={{ opacity: 0 }}>
                // available · spring 2026
              </p>

              <h1 className="hero-heading hs-heading" style={{ opacity: 0 }}>
                <span className="hs-name-row">Faisal</span>
                <span className="hs-name-row">
                  <span className="accent-text hero-name">Hossain</span>
                  <span className="hs-period">.</span>
                </span>
              </h1>

              <motion.span
                className="hs-rule"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 2.25, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                aria-hidden
              />

              <motion.div
                className="hs-meta-stack"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.35, duration: 0.5 }}
              >
                <span className="hs-meta-line">
                  <i className="ri-map-pin-2-line" /> Dhaka, BD · GMT+6
                </span>
                <span className="hs-meta-line">
                  <i className="ri-graduation-cap-line" /> CSE · UAP — 2022→2026
                </span>
              </motion.div>
            </div>

            {/* ─── CENTER PORTRAIT ─── */}
            <motion.div
              className="hs-col hs-col--center"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="hs-frame">
                <span className="hs-corner hs-corner--tl" aria-hidden />
                <span className="hs-corner hs-corner--tr" aria-hidden />
                <span className="hs-corner hs-corner--bl" aria-hidden />
                <span className="hs-corner hs-corner--br" aria-hidden />

                <div className="avatar-wrap hs-avatar-wrap">
                  <div className="avatar-glow-ring hs-avatar-ring" style={{ opacity: 0 }} />
                  <img
                    src="https://avatars.githubusercontent.com/u/123256888?v=4"
                    alt="Faisal Hossain"
                    className="avatar-img hs-avatar-img"
                    style={{ opacity: 0 }}
                  />
                </div>
              </div>

              <div className="hs-frame-cap">
                <span className="hs-frame-name">Faisal Hossain</span>
              </div>
            </motion.div>

            {/* ─── RIGHT COLUMN ─── */}
            <div className="hs-col hs-col--right">
              <motion.div
                className="hs-role"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.32, duration: 0.5 }}
                aria-live="polite"
              >
                <span className="hs-role-prefix">I'm a</span>
                <span className="hs-role-rotator">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={roleIdx}
                      className="hs-role-chip"
                      initial={{ y: 14, opacity: 0, filter: 'blur(6px)' }}
                      animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                      exit={{ y: -14, opacity: 0, filter: 'blur(6px)' }}
                      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <i className={roles[roleIdx].icon} />
                      <span>{roles[roleIdx].label}</span>
                    </motion.span>
                  </AnimatePresence>
                </span>
              </motion.div>

              <p className="hero-desc hs-desc" style={{ opacity: 0 }}>
                A <strong>Python full-stack developer</strong> turning curious ideas into AI tools, clean web apps, and delightful interfaces.
              </p>

              <div className="hero-buttons hs-ctas" style={{ opacity: 0 }}>
                <a href="#projects" className="btn btn-primary hero-btn hero-btn-cta">
                  <span>View my work</span>
                  <span className="hero-btn-arrow"><i className="ri-arrow-right-up-line" /></span>
                </a>
                <a href="#contact" className="btn btn-outline hero-btn hero-btn-ghost">
                  <span>Say hi</span>
                </a>
              </div>

              <motion.button
                type="button"
                className="hs-email"
                onClick={copyEmail}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5, duration: 0.5 }}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                <i className={copied ? 'ri-check-line' : 'ri-at-line'} />
                <span>{copied ? 'Copied!' : 'faisaladobe666@gmail.com'}</span>
              </motion.button>

              <div className="hero-socials hs-socials">
                <a href="https://github.com/HAVIC-47" target="_blank" rel="noopener noreferrer" className="social-icon hero-social-icon" style={{ opacity: 0 }} aria-label="GitHub"><i className="ri-github-fill"></i></a>
                <a href="https://www.facebook.com/HAVIC47" target="_blank" rel="noopener noreferrer" className="social-icon hero-social-icon" style={{ opacity: 0 }} aria-label="Facebook"><i className="ri-facebook-fill"></i></a>
                <a href="https://www.instagram.com/visuals_of_faisal" target="_blank" rel="noopener noreferrer" className="social-icon hero-social-icon" style={{ opacity: 0 }} aria-label="Instagram"><i className="ri-instagram-line"></i></a>
                <a href="https://discord.gg/pgakM24PEs" target="_blank" rel="noopener noreferrer" className="social-icon hero-social-icon" style={{ opacity: 0 }} aria-label="Discord"><i className="ri-discord-fill"></i></a>
              </div>
            </div>
          </div>

          {/* Scroll cue */}
          <motion.a
            href="#about"
            className="hs-scroll"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.7, duration: 0.6 }}
            aria-label="Scroll to explore"
          >
            <span className="hs-scroll-label">Scroll</span>
            <motion.span
              className="hs-scroll-icon"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <i className="ri-arrow-down-line" />
            </motion.span>
          </motion.a>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ABOUT SECTION
          ═══════════════════════════════════════════ */}
      <section id="about" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-divider">
          <div className="container">
            <span className="section-label">Get to Know Me</span>
            <h2>About <span className="accent-text">Me</span></h2>
          </div>
        </div>

        {/* Bio */}
        <div style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
          <div className="container">
            <div className="about-grid">
              <ScrollReveal className="about-image-container">
                <img
                  src="https://avatars.githubusercontent.com/u/123256888?v=4"
                  alt="Faisal Hossain"
                  className="about-image"
                />
              </ScrollReveal>
              <div className="about-content">
                <ScrollReveal>
                  <h2>A developer driven by <span className="accent-text">curiosity</span></h2>
                </ScrollReveal>
                <ScrollReveal>
                  <p>Hey there! I'm Faisal Hossain, an amateur programmer with a clear goal — to become a skilled Python full-stack developer. I'm passionate about building things that solve real problems, from web applications to AI-powered tools.</p>
                </ScrollReveal>
                <ScrollReveal>
                  <p>My journey started with C and Python, and has since expanded into web development with Django, machine learning, and even game development. I love exploring the intersection of AI and practical applications.</p>
                </ScrollReveal>
                <ScrollReveal>
                  <p>Beyond coding, I'm interested in operating systems, compiler design, and artificial intelligence — topics I actively explore through coursework and personal projects. I believe in learning by building.</p>
                </ScrollReveal>
                <ScrollReveal>
                  <div className="about-stats">
                    <GlowStat value="15+" label="Repositories" />
                    <GlowStat value="3+" label="Years Coding" />
                    <GlowStat value="6+" label="Languages" />
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div style={{ padding: '4rem 0' }}>
          <div className="container">
            <ScrollReveal>
              <div className="section-header">
                <span className="section-label">My Journey</span>
                <h2>Education & Experience</h2>
              </div>
            </ScrollReveal>
            <div style={{ maxWidth: 650, margin: '0 auto' }}>
              <div className="timeline">
                {timeline.map((item, i) => (
                  <ScrollReveal key={i} delay={0.1 * i}>
                    <div className="timeline-item">
                      <div className="timeline-date">{item.date}</div>
                      <div className="timeline-title">{item.title}</div>
                      <div className="timeline-desc">{item.desc}</div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Get to Know Me bento */}
        <GetToKnowMe />

        {/* Interests — flip cards */}
        <WhatDrivesMe />
      </section>

      {/* ═══════════════════════════════════════════
          PROJECTS SECTION
          ═══════════════════════════════════════════ */}
      <section id="projects" style={{ position: 'relative', zIndex: 2 }}>
        <ProjectShowcase />
      </section>

      {/* ═══════════════════════════════════════════
          SKILLS SECTION
          ═══════════════════════════════════════════ */}
      <section id="skills" style={{ position: 'relative', zIndex: 1 }}>
        <SkillsShowcase />
      </section>

      {/* ═══════════════════════════════════════════
          FUTURE FOCUS SECTION
          ═══════════════════════════════════════════ */}
      <section id="future" style={{ position: 'relative', zIndex: 1 }}>
        <FutureInterests />
      </section>

      {/* ═══════════════════════════════════════════
          CONTACT SECTION
          ═══════════════════════════════════════════ */}
      <section id="contact" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-divider">
          <div className="container">
            <span className="section-label">Let's Connect</span>
            <h2>Get in <span className="accent-text">Touch</span></h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.75rem', maxWidth: 500, marginLeft: 'auto', marginRight: 'auto' }}>
              Have a project idea, question, or just want to say hello? I'd love to hear from you.
            </p>
          </div>
        </div>

        <div style={{ paddingTop: '1rem', paddingBottom: '4rem' }}>
          <div className="container">
            <div className="contact-grid">
              <div className="contact-info">
                {contacts.map((c, i) => (
                  <ScrollReveal key={c.title} delay={0.1 * i}>
                    <div className="contact-item">
                      <div className="contact-item-icon"><i className={c.icon}></i></div>
                      <div>
                        <h4>{c.title}</h4>
                        {c.link ? (
                          <p><a href={c.link} target="_blank" rel="noopener noreferrer">{c.value}</a></p>
                        ) : (
                          <p style={{ color: 'var(--text-secondary)' }}>{c.value}</p>
                        )}
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              <ScrollReveal delay={0.1}>
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input type="text" id="name" placeholder="Your full name" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" placeholder="you@example.com" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input type="text" id="subject" placeholder="Project Collaboration" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea id="message" placeholder="Tell me about your idea..." required></textarea>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                      width: '100%', justifyContent: 'center',
                      background: sent ? '#3b9b74' : undefined
                    }}
                  >
                    <i className={sent ? 'ri-check-line' : 'ri-send-plane-line'}></i>
                    {sent ? 'Message Sent!' : 'Send Message'}
                  </button>
                </form>
              </ScrollReveal>
            </div>
          </div>
        </div>

      </section>

      {/* Scroll-driven keyword sequence — final section */}
      <ContactScrollSequence>
        <h3 className="css-outro-title" style={{ marginBottom: '0.6rem', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800, letterSpacing: '-0.03em' }}>
          Let's build something together
        </h3>
        <p className="css-outro-sub" style={{ marginBottom: '1.5rem', fontSize: 'clamp(0.85rem, 1.1vw, 0.95rem)' }}>
          Find me on these platforms
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {socials.map(s => (
            <a key={s.icon} href={s.link} target="_blank" rel="noopener noreferrer" className="social-icon css-outro-social">
              <i className={s.icon}></i>
            </a>
          ))}
        </div>
      </ContactScrollSequence>

      <style>{`
        /* Outro section (ContactScrollSequence) — theme-aware */
        .css-outro-title { color: #fff; }
        .css-outro-sub { color: rgba(255,255,255,0.6); }
        .css-outro-social { color: #fff; border-color: rgba(255,255,255,0.18); }
        [data-theme="light"] .css-outro-title { color: var(--text-primary); }
        [data-theme="light"] .css-outro-sub { color: var(--text-secondary); }
        [data-theme="light"] .css-outro-social { color: var(--text-primary); border-color: var(--border); }

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

        /* Section dividers — replaces page-header for inline sections */
        .section-divider {
          padding-top: 6rem;
          padding-bottom: 2rem;
          text-align: center;
        }

        /* All sections transparent so particles show through */
        .stats-section {
          padding-top: 2rem;
          padding-bottom: 4rem;
          position: relative;
          z-index: 1;
        }

        /* ===== HERO SECTION ===== */
        .hero-scroll-section {
          min-height: 100vh;
          position: relative;
          perspective: 1200px;
          z-index: 1;
          overflow: hidden;
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

        /* ── Hero content (3-column split with center portrait) ── */
        .hero-content-wrap {
          position: absolute;
          inset: 0;
          z-index: 8;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 96px 24px 48px;
          pointer-events: none;
        }
        .hero-split {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: clamp(2.5rem, 6vw, 5.5rem);
          width: 100%;
          max-width: 1240px;
          pointer-events: auto;
        }

        /* Pulse keyframe (used by online dot) */
        @keyframes hero-pulse {
          0%   { box-shadow: 0 0 0 0 rgba(62,207,142,0.55); }
          70%  { box-shadow: 0 0 0 10px rgba(62,207,142,0); }
          100% { box-shadow: 0 0 0 0 rgba(62,207,142,0); }
        }

        .hs-col { display: flex; flex-direction: column; }

        /* ─ LEFT COLUMN ─ */
        .hs-col--left {
          align-items: flex-end;
          text-align: right;
          gap: 1rem;
        }
        .hero-mono.hs-mono {
          margin: 0;
          color: var(--text-muted);
          font-family: var(--font-mono);
          font-size: 0.78rem;
          letter-spacing: 0.06em;
          will-change: transform, opacity;
        }
        .hero-heading.hs-heading {
          margin: 0;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(2.6rem, 5.4vw, 4.6rem);
          line-height: 0.94;
          letter-spacing: -0.04em;
          color: var(--heading, var(--text-primary));
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.04em;
          will-change: transform, opacity, filter;
        }
        .hs-name-row { display: inline-flex; align-items: baseline; }
        .hero-name {
          background: linear-gradient(95deg, var(--accent) 0%, color-mix(in oklab, var(--accent) 60%, var(--text-primary)) 55%, var(--accent) 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 220% 100%;
          animation: hero-shine 7s linear infinite;
        }
        @keyframes hero-shine {
          0%   { background-position: 0% 0%; }
          100% { background-position: 220% 0%; }
        }
        .hs-period { color: var(--accent); margin-left: 0.04em; }
        .hs-rule {
          display: block;
          width: 64px;
          height: 1px;
          background: var(--accent);
          opacity: 0.6;
          transform-origin: right center;
        }
        .hs-meta-stack {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          align-items: flex-end;
        }
        .hs-meta-line {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .hs-meta-line i { color: var(--accent); font-size: 0.95rem; }

        /* ─ CENTER PORTRAIT ─ */
        .hs-col--center {
          align-items: center;
          gap: 0.85rem;
        }
        .hs-frame {
          position: relative;
          width: clamp(220px, 24vw, 320px);
          aspect-ratio: 1 / 1;
          padding: 14px;
        }
        .hs-corner {
          position: absolute;
          width: 18px;
          height: 18px;
          border: 1.5px solid var(--accent);
          opacity: 0.85;
        }
        .hs-corner--tl { top: 0; left: 0; border-right: none; border-bottom: none; }
        .hs-corner--tr { top: 0; right: 0; border-left: none; border-bottom: none; }
        .hs-corner--bl { bottom: 0; left: 0; border-right: none; border-top: none; }
        .hs-corner--br { bottom: 0; right: 0; border-left: none; border-top: none; }

        .avatar-wrap.hs-avatar-wrap {
          position: relative;
          width: 100%;
          height: 100%;
          display: block;
        }
        .avatar-glow-ring.hs-avatar-ring {
          position: absolute;
          inset: -1px;
          border-radius: 22px;
          border: 1px solid color-mix(in oklab, var(--accent) 35%, transparent);
          box-shadow: 0 0 50px var(--accent-glow), inset 0 0 32px color-mix(in oklab, var(--accent) 10%, transparent);
          will-change: transform, opacity;
          z-index: 0;
        }
        .avatar-img.hs-avatar-img {
          position: relative;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 20px;
          border: 1px solid var(--border);
          box-shadow: 0 24px 60px -22px rgba(0,0,0,0.55);
          z-index: 1;
          will-change: transform, opacity, filter;
          filter: grayscale(0.08) contrast(1.02);
        }
        .hs-online {
          position: absolute;
          left: 50%;
          bottom: -14px;
          transform: translateX(-50%);
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.3rem 0.65rem;
          border-radius: 999px;
          background: color-mix(in oklab, var(--bg-card) 92%, transparent);
          border: 1px solid var(--border);
          backdrop-filter: blur(8px);
          font-family: var(--font-mono);
          font-size: 0.65rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.12em;
          z-index: 4;
          box-shadow: 0 8px 24px -10px rgba(0,0,0,0.35);
        }
        .hs-online-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #3ecf8e;
          animation: hero-pulse 2s ease-out infinite;
        }
        .hs-frame-cap {
          margin-top: 1rem;
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          font-family: var(--font-mono);
          font-size: 0.68rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--text-muted);
        }
        .hs-frame-num { color: var(--accent); }
        .hs-frame-name { color: var(--text-secondary); }

        /* ─ RIGHT COLUMN ─ */
        .hs-col--right {
          align-items: flex-start;
          text-align: left;
          gap: 1rem;
        }
        .hs-role {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
        }
        .hs-role-prefix {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          color: var(--text-muted);
          letter-spacing: 0.04em;
        }
        .hs-role-rotator {
          position: relative;
          display: inline-flex;
          height: 2rem;
          overflow: hidden;
          align-items: center;
        }
        .hs-role-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.32rem 0.8rem;
          border: 1px solid var(--border);
          border-radius: 999px;
          font-family: var(--font-body);
          font-size: 0.88rem;
          font-weight: 500;
          color: var(--text-primary);
          background: color-mix(in oklab, var(--bg-card) 50%, transparent);
          backdrop-filter: blur(8px);
          white-space: nowrap;
        }
        .hs-role-chip i { color: var(--accent); font-size: 0.95rem; }

        .hero-desc.hs-desc {
          margin: 0;
          max-width: 320px;
          font-size: 1rem;
          line-height: 1.6;
          color: var(--text-secondary);
          will-change: transform, opacity;
        }
        .hero-desc.hs-desc strong {
          color: var(--text-primary);
          font-weight: 600;
        }

        .hero-buttons.hs-ctas {
          display: inline-flex;
          gap: 0.7rem;
          flex-wrap: wrap;
        }
        .hero-btn {
          will-change: transform, opacity;
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          font-weight: 600;
          letter-spacing: 0.005em;
          transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease, color 0.25s ease, border-color 0.25s ease;
        }
        .hero-btn-cta { padding-right: 0.55rem; }
        .hero-btn-arrow {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 26px; height: 26px;
          border-radius: 999px;
          background: var(--text-on-accent, #ffffff);
          color: var(--accent);
          transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .hero-btn-cta:hover .hero-btn-arrow {
          transform: translate(2px, -2px) rotate(-8deg);
        }
        .hero-btn-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 18px 40px -16px var(--accent-glow), 0 6px 16px -6px rgba(0,0,0,0.25);
        }
        .hero-btn-ghost:hover {
          transform: translateY(-2px);
          border-color: var(--accent);
          color: var(--accent);
        }

        .hs-email {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: transparent;
          border: none;
          padding: 0;
          font-family: var(--font-mono);
          font-size: 0.78rem;
          color: var(--text-muted);
          letter-spacing: 0.02em;
          cursor: pointer;
          transition: color 0.25s ease;
        }
        .hs-email i { color: var(--accent); font-size: 0.95rem; }
        .hs-email:hover { color: var(--text-primary); }

        .hero-socials.hs-socials {
          display: inline-flex;
          gap: 0.55rem;
          margin-top: 0.1rem;
        }
        .hero-social-icon { will-change: transform, opacity; }

        /* Scroll cue (under the split) */
        .hs-scroll {
          margin-top: 2rem;
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.22em;
          color: var(--text-muted);
          text-decoration: none;
          transition: color 0.25s ease;
          pointer-events: auto;
        }
        .hs-scroll:hover { color: var(--accent); }
        .hs-scroll-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 24px; height: 24px;
          border-radius: 50%;
          border: 1px solid var(--border);
          color: var(--accent);
        }

        /* ===== RESPONSIVE ===== */

        /* Tablet */
        @media (max-width: 1024px) {
          .workspace-layer { transform: scale(0.85); }
          .energy-burst { transform: translate(-50%, -50%) scale(0.85); }
          .portal-ring { transform: translate(50%, -50%) scale(0.85); }
          .hero-split { gap: 1.75rem; max-width: 980px; }
          .hero-heading.hs-heading { font-size: clamp(2.2rem, 5vw, 3.6rem); }
          .hs-frame { width: clamp(200px, 22vw, 260px); }
          .hero-desc.hs-desc { max-width: 280px; font-size: 0.95rem; }
        }

        /* Tablet portrait — collapse to single column with portrait on top */
        @media (max-width: 768px) {
          .workspace-layer { transform: scale(0.65); }
          .energy-burst { transform: translate(-50%, -50%) scale(0.65); }
          .portal-ring { transform: translate(50%, -50%) scale(0.65); }

          .hero-content-wrap { padding-top: 88px; padding-bottom: 32px; }
          .hero-split {
            grid-template-columns: 1fr;
            gap: 2.25rem;
            max-width: 560px;
            justify-items: center;
          }
          .hs-col--left,
          .hs-col--right {
            align-items: center;
            text-align: center;
          }
          .hero-heading.hs-heading {
            align-items: center;
            font-size: clamp(2.6rem, 9vw, 3.8rem);
          }
          .hs-rule { transform-origin: center; }
          .hs-meta-stack { align-items: center; }
          .hs-frame { order: -1; width: clamp(200px, 50vw, 260px); }
          .hero-desc.hs-desc { max-width: 480px; }

          .hero-orb--warm { width: 300px; height: 300px; }
          .hero-orb--cool { width: 250px; height: 250px; }
          .section-divider { padding-top: 4rem; }
        }

        /* Mobile portrait */
        @media (max-width: 480px) {
          .workspace-layer { transform: scale(0.48); }
          .energy-burst { transform: translate(-50%, -50%) scale(0.5); }
          .portal-ring { transform: translate(50%, -50%) scale(0.5); }

          .hero-content-wrap { padding: 80px 16px 32px; }
          .hero-split { gap: 1.15rem; }
          .hs-col--left, .hs-col--right { gap: 0.8rem; }
          .hs-frame { width: clamp(180px, 56vw, 220px); }
          .hero-heading.hs-heading { font-size: clamp(2.2rem, 12vw, 3rem); }
          .hero-mono.hs-mono { font-size: 0.72rem; }
          .hero-desc.hs-desc { font-size: 0.92rem; max-width: 92vw; }
          .hero-buttons.hs-ctas {
            flex-direction: column;
            width: 100%;
            max-width: 280px;
            gap: 0.55rem;
          }
          .hero-buttons.hs-ctas .btn {
            width: 100%;
            justify-content: center;
          }
          .section-divider { padding-top: 3rem; }
        }

        /* Small phones */
        @media (max-width: 360px) {
          .workspace-layer { transform: scale(0.38); }
          .energy-burst { transform: translate(-50%, -50%) scale(0.4); }
          .portal-ring { transform: translate(50%, -50%) scale(0.4); }

          .hs-frame { width: 170px; }
          .hero-heading.hs-heading { font-size: 2.2rem; }
          .hero-buttons.hs-ctas .btn { padding: 0.6rem 1rem; font-size: 0.82rem; }
          .hero-btn-arrow { width: 22px; height: 22px; }
          .hs-scroll-label { display: none; }
        }

        /* Landscape phones — keep 3-col but tighter */
        @media (max-height: 500px) and (orientation: landscape) {
          .workspace-layer { transform: scale(0.55); }
          .energy-burst { transform: translate(-50%, -50%) scale(0.55); }
          .portal-ring { transform: translate(50%, -50%) scale(0.55); }

          .hero-content-wrap { padding-top: 56px; padding-bottom: 12px; }
          .hero-split { grid-template-columns: 1fr auto 1fr; gap: 1rem; max-width: 880px; }
          .hs-frame { width: 140px; padding: 8px; }
          .hs-corner { width: 12px; height: 12px; }
          .hero-heading.hs-heading { font-size: 1.8rem; }
          .hero-mono.hs-mono { font-size: 0.65rem; }
          .hero-desc.hs-desc { font-size: 0.8rem; max-width: 100%; }
          .hs-meta-stack { gap: 0.2rem; }
          .hero-buttons.hs-ctas .btn { padding: 0.45rem 0.85rem; font-size: 0.75rem; }
          .hs-scroll { display: none; }
        }
        /* ═══════════════════════════════════════════
           LIGHT MODE OVERRIDES
           All hardcoded dark-only colors adapted for
           the light theme. Panels, monitors, code
           syntax, floating panels, glass effects.
           ═══════════════════════════════════════════ */
        [data-theme="light"] .ws-desk {
          background: linear-gradient(90deg, transparent, rgba(28,25,23,0.1) 30%, rgba(28,25,23,0.1) 70%, transparent);
        }
        [data-theme="light"] .monitor-bezel {
          background: #E7E5E4;
          border-color: #D6D3D1;
        }
        [data-theme="light"] .monitor-screen {
          background: linear-gradient(135deg, #FAFAF9 0%, #F5F5F4 100%);
        }
        [data-theme="light"] .monitor-glow {
          background: radial-gradient(ellipse at 40% 40%, rgba(146,64,14,0.12), transparent 60%);
        }
        [data-theme="light"] .monitor-stand {
          background: linear-gradient(to bottom, #D6D3D1, #E7E5E4);
        }
        [data-theme="light"] .monitor-base {
          background: #D6D3D1;
        }
        [data-theme="light"] .floating-panel {
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(146, 64, 14, 0.12);
          box-shadow: 0 8px 32px rgba(28,25,23,0.1), 0 0 0 1px rgba(0,0,0,0.04);
        }
        [data-theme="light"] .fp-header {
          background: rgba(28,25,23,0.03);
          border-bottom-color: rgba(28,25,23,0.06);
        }
        [data-theme="light"] .code-line { color: #44403C; }
        [data-theme="light"] .ck { color: #92400E; }
        [data-theme="light"] .cs { color: #166534; }
        [data-theme="light"] .ct { color: #44403C; }
        [data-theme="light"] .fp-term-body { color: #44403C; }
        [data-theme="light"] .term-g { color: #166534; }
        [data-theme="light"] .ui-nav-item { background: rgba(28,25,23,0.08); }
        [data-theme="light"] .ui-bar {
          background: linear-gradient(to top, var(--accent), rgba(146,64,14,0.25));
        }
        [data-theme="light"] .ui-btn-mock.outline {
          border-color: rgba(28,25,23,0.12);
        }
        [data-theme="light"] .fp-stat-pill { background: rgba(28,25,23,0.06); }
        [data-theme="light"] .db-node {
          color: var(--text-secondary);
          background: rgba(28,25,23,0.04);
        }
        [data-theme="light"] .mob-header { background: rgba(28,25,23,0.08); }
        [data-theme="light"] .mob-line { background: rgba(28,25,23,0.05); }
        [data-theme="light"] .mob-card {
          background: rgba(28,25,23,0.03);
          border-color: rgba(28,25,23,0.06);
        }
        [data-theme="light"] .energy-burst {
          background: radial-gradient(circle, rgba(146,64,14,0.3) 0%, rgba(146,64,14,0.12) 40%, transparent 70%);
        }
        [data-theme="light"] .portal-ring {
          border-color: rgba(146,64,14,0.35);
          box-shadow: 0 0 40px rgba(146,64,14,0.15), inset 0 0 40px rgba(146,64,14,0.06);
        }
        [data-theme="light"] .avatar-glow-ring {
          border-color: rgba(146, 64, 14, 0.3);
          box-shadow: 0 0 60px rgba(146,64,14,0.12), inset 0 0 60px rgba(146,64,14,0.04);
        }
        [data-theme="light"] .avatar-img {
          border-color: var(--border);
          box-shadow: 0 0 40px rgba(146,64,14,0.08);
        }
      `}</style>
    </div>
  )
}
