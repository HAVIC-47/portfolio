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
import HeroDeskScene from '../components/HeroDeskScene'
import IntroLoader from '../components/IntroLoader'
import gsap from 'gsap'

const roles = [
  { label: 'Full-Stack Developer', icon: 'ri-code-s-slash-line' },
  { label: 'AI / ML Engineer', icon: 'ri-brain-line' },
  { label: 'UI / UX Designer', icon: 'ri-palette-line' },
  { label: 'Problem Solver', icon: 'ri-lightbulb-flash-line' },
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
  const [introDone, setIntroDone] = useState(false)

  useEffect(() => {
    if (introDone) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [introDone])

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
      const tl = gsap.timeline({ delay: 0.2 })

      /* Orbs fade in */
      tl.fromTo('.hero-orb--warm',
        { opacity: 0, scale: 0.5 },
        { opacity: 0.15, scale: 1, duration: 0.4, ease: 'power2.out' },
        0
      )
      tl.fromTo('.hero-orb--cool',
        { opacity: 0, scale: 0.5 },
        { opacity: 0.1, scale: 1, duration: 0.4, ease: 'power2.out' },
        0.1
      )

      /* Text stagger */
      tl.fromTo('.hero-mono',
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' },
        0.3
      )

      tl.fromTo('.hero-heading',
        { opacity: 0, y: 30, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.4, ease: 'power2.out' },
        0.5
      )

      tl.fromTo('.hero-desc',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
        0.8
      )

      tl.fromTo('.hero-btn',
        { opacity: 0, y: 15, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: 'power2.out', stagger: 0.06 },
        1.0
      )

      tl.fromTo('.hero-social-icon',
        { opacity: 0, y: 10, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: 'power2.out', stagger: 0.04 },
        1.2
      )

    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="home-page">
      {/* ── INTRO GSAP OVERLAY ──
          Plays on mount (page load / reload). 3D model preload already
          triggered by useGLTF.preload in HeroDeskScene. Unmounts on complete. */}
      {!introDone && <IntroLoader onComplete={() => setIntroDone(true)} />}

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

        {/* ── HERO ORBS (animated by GSAP) ── */}
        <div className="hero-orb hero-orb--warm" />
        <div className="hero-orb hero-orb--cool" />

        {/* ─── FULL-SECTION 3D SCENE LAYER ─── */}
        <motion.div
          className="hd-scene"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeroDeskScene />
        </motion.div>

        <div className="container hero-content-wrap">
          <div className="hero-duo">
            {/* ─── LEFT: TEXT ─── */}
            <div className="hd-text">
              <p className="mono hero-mono hd-mono" style={{ opacity: 0 }}>
                // available for work · 2026
              </p>

              <h1 className="hero-heading hd-heading" style={{ opacity: 0 }}>
                <span className="hd-name-first">Faisal</span>
                <span className="hd-name-last">
                  <span className="accent-text hero-name">Hossain</span>
                  <span className="hd-period">.</span>
                </span>
              </h1>

              <motion.div
                className="hd-role"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.5 }}
                aria-live="polite"
              >
                <span className="hd-role-prefix">I'm a</span>
                <span className="hd-role-rotator">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={roleIdx}
                      className="hd-role-chip"
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

              <p className="hero-desc hd-desc" style={{ opacity: 0 }}>
                A <strong>Python full-stack developer</strong> turning curious ideas into AI tools, clean web apps, and delightful interfaces.
              </p>

              <motion.div
                className="hd-meta"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.9, duration: 0.5 }}
              >
                <span className="hd-meta-item">
                  <i className="ri-map-pin-2-line" /> Dhaka, BD
                </span>
                <span className="hd-meta-sep" aria-hidden />
                <span className="hd-meta-item">
                  <i className="ri-graduation-cap-line" /> CSE · UAP
                </span>
              </motion.div>

              <div className="hero-buttons hd-ctas" style={{ opacity: 0 }}>
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
                className="hd-email"
                onClick={copyEmail}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.1, duration: 0.5 }}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                <i className={copied ? 'ri-check-line' : 'ri-at-line'} />
                <span>{copied ? 'Copied!' : 'faisaladobe666@gmail.com'}</span>
              </motion.button>

              <div className="hero-socials hd-socials">
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
            className="hd-scroll"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4, duration: 0.6 }}
            aria-label="Scroll to explore"
          >
            <span className="hd-scroll-label">Scroll</span>
            <motion.span
              className="hd-scroll-icon"
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
          z-index: 1;
          overflow: hidden;
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

        /* ── Hero content (text overlays full-section 3D) ── */
        .hero-content-wrap {
          position: relative;
          z-index: 8;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          min-height: 100vh;
          padding: 96px 24px 48px;
          pointer-events: none; /* let drag pass through empty areas to canvas */
        }
        .hero-duo {
          display: grid;
          grid-template-columns: 1fr;
          align-items: center;
          width: 100%;
          max-width: 1380px;
        }
        .hd-text, .hd-scroll { pointer-events: auto; }

        /* ─ TEXT COLUMN ─ */
        .hd-text {
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
          align-items: flex-start;
          max-width: min(560px, 52%);
        }
        .hero-mono.hd-mono {
          margin: 0;
          color: var(--text-muted);
          font-family: var(--font-mono);
          font-size: 0.78rem;
          letter-spacing: 0.06em;
          will-change: transform, opacity;
        }
        .hero-heading.hd-heading {
          margin: 0;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(2.8rem, 5.6vw, 5rem);
          line-height: 0.94;
          letter-spacing: -0.04em;
          color: var(--heading, var(--text-primary));
          display: flex;
          flex-direction: column;
          gap: 0.06em;
          will-change: transform, opacity, filter;
        }
        .hd-name-first, .hd-name-last { display: block; }
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
        .hd-period { color: var(--accent); margin-left: 0.04em; }

        /* Role rotator */
        .hd-role {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
        }
        .hd-role-prefix {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          color: var(--text-muted);
          letter-spacing: 0.04em;
        }
        .hd-role-rotator {
          position: relative;
          display: inline-flex;
          height: 2rem;
          overflow: hidden;
          align-items: center;
        }
        .hd-role-chip {
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
        .hd-role-chip i { color: var(--accent); font-size: 0.95rem; }

        .hero-desc.hd-desc {
          margin: 0;
          max-width: 420px;
          font-size: 1.05rem;
          line-height: 1.65;
          color: var(--text-secondary);
          will-change: transform, opacity;
        }
        .hero-desc.hd-desc strong {
          color: var(--text-primary);
          font-weight: 600;
        }

        /* Meta line */
        .hd-meta {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .hd-meta-item {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-mono);
          font-size: 0.74rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .hd-meta-item i { color: var(--accent); font-size: 0.95rem; }
        .hd-meta-sep {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: var(--text-muted);
          opacity: 0.5;
        }

        /* CTAs */
        .hero-buttons.hd-ctas {
          display: inline-flex;
          gap: 0.75rem;
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

        .hd-email {
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
        .hd-email i { color: var(--accent); font-size: 0.95rem; }
        .hd-email:hover { color: var(--text-primary); }

        .hero-socials.hd-socials {
          display: inline-flex;
          gap: 0.55rem;
          margin-top: 0.1rem;
        }
        .hero-social-icon { will-change: transform, opacity; }

        /* ─ 3D SCENE: full-section layer behind the text ─ */
        .hd-scene {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 2;
          background: transparent;
          border: none;
          box-shadow: none;
          overflow: visible;
          pointer-events: none; /* wrapper transparent; canvas re-enables */
        }
        .hd-scene > div { background: transparent !important; pointer-events: auto; }
        /* Scroll cue */
        .hd-scroll {
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
        }
        .hd-scroll:hover { color: var(--accent); }
        .hd-scroll-icon {
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
          .hero-heading.hd-heading { font-size: clamp(2.4rem, 5vw, 3.8rem); }
          .hero-desc.hd-desc { max-width: 360px; font-size: 0.95rem; }
        }

        /* Tablet portrait — stack */
        @media (max-width: 768px) {
          .hero-content-wrap { padding-top: 88px; padding-bottom: 32px; align-items: center; }
          .hd-text {
            align-items: center;
            text-align: center;
            max-width: 100%;
          }
          .hero-heading.hd-heading {
            align-items: center;
            font-size: clamp(2.6rem, 9vw, 3.8rem);
          }
          .hd-meta { justify-content: center; }
          .hero-buttons.hd-ctas { justify-content: center; }
          .hero-desc.hd-desc { max-width: 480px; }

          .hero-orb--warm { width: 300px; height: 300px; }
          .hero-orb--cool { width: 250px; height: 250px; }
          .section-divider { padding-top: 4rem; }
        }

        /* Mobile portrait */
        @media (max-width: 480px) {
          .hero-content-wrap { padding: 80px 16px 32px; }
          .hd-text { gap: 0.8rem; }
          .hero-heading.hd-heading { font-size: clamp(2.2rem, 12vw, 3rem); }
          .hero-mono.hd-mono { font-size: 0.72rem; }
          .hero-desc.hd-desc { font-size: 0.92rem; max-width: 92vw; }
          .hero-buttons.hd-ctas {
            flex-direction: column;
            width: 100%;
            max-width: 280px;
            gap: 0.55rem;
          }
          .hero-buttons.hd-ctas .btn {
            width: 100%;
            justify-content: center;
          }
          .section-divider { padding-top: 3rem; }
        }

        /* Small phones */
        @media (max-width: 360px) {
          .hero-heading.hd-heading { font-size: 2.2rem; }
          .hero-buttons.hd-ctas .btn { padding: 0.6rem 1rem; font-size: 0.82rem; }
          .hero-btn-arrow { width: 22px; height: 22px; }
          .hd-scroll-label { display: none; }
        }

        /* Landscape phones */
        @media (max-height: 500px) and (orientation: landscape) {
          .hero-content-wrap { padding-top: 56px; padding-bottom: 12px; }
          .hero-heading.hd-heading { font-size: 1.8rem; }
          .hero-mono.hd-mono { font-size: 0.65rem; }
          .hero-desc.hd-desc { font-size: 0.8rem; max-width: 100%; }
          .hero-buttons.hd-ctas .btn { padding: 0.45rem 0.85rem; font-size: 0.75rem; }
          .hd-scroll { display: none; }
        }
      `}</style>
    </div>
  )
}
