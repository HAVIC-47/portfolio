import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const navLinks = [
  { href: '#home', label: 'Home', icon: 'ri-home-5-line' },
  { href: '#about', label: 'About', icon: 'ri-user-line' },
  { href: '#projects', label: 'Projects', icon: 'ri-briefcase-line' },
  { href: '#skills', label: 'Skills', icon: 'ri-tools-line' },
  { href: '#contact', label: 'Contact', icon: 'ri-mail-line' },
]

const THEMES = ['night', 'day']
const LEGACY_THEMES = { dark: 'night', light: 'day' }

export default function MobileNav() {
  const [activeSection, setActiveSection] = useState('#home')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [theme, setTheme] = useState('night')

  useEffect(() => {
    const onScroll = () => {
      const sections = navLinks.map((l) => l.href.slice(1))
      let current = '#home'
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 150) current = '#' + id
        }
      }
      setActiveSection(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const resolved = THEMES.includes(saved) ? saved : (LEGACY_THEMES[saved] ?? 'night')
    document.documentElement.setAttribute('data-theme', resolved)
    if (resolved !== saved) localStorage.setItem('theme', resolved)
    setTheme(resolved)
  }, [])

  useEffect(() => {
    if (!drawerOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [drawerOpen])

  function cycleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'night'
    const idx = THEMES.indexOf(current)
    const next = THEMES[(idx + 1) % THEMES.length]
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('theme', next)
    setTheme(next)
  }

  function handleNavClick(e, href) {
    e.preventDefault()
    setDrawerOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              key="mn-backdrop"
              className="mn-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              key="mn-drawer"
              className="mn-drawer"
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '110%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            >
              <div className="mn-drawer-handle" />
              <ul className="mn-drawer-list">
                {navLinks.map(({ href, label, icon }) => (
                  <li key={href}>
                    <a
                      href={href}
                      onClick={(e) => handleNavClick(e, href)}
                      className={activeSection === href ? 'active' : ''}
                    >
                      <i className={icon} />
                      <span>{label}</span>
                      {activeSection === href && <span className="mn-drawer-dot" />}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <nav className="mn-pill" aria-label="Mobile navigation">
        {navLinks.map(({ href, label, icon }) => (
          <a
            key={href}
            href={href}
            onClick={(e) => handleNavClick(e, href)}
            className={`mn-tile${activeSection === href ? ' active' : ''}`}
            aria-label={label}
            aria-current={activeSection === href ? 'page' : undefined}
          >
            <i className={icon} />
          </a>
        ))}
        <button
          type="button"
          className="mn-tile mn-tile--theme"
          onClick={cycleTheme}
          aria-label={`Cycle theme. Current: ${theme}`}
          title={`Theme: ${theme}`}
        >
          <i className="ri-contrast-2-line" />
        </button>
        <button
          type="button"
          className={`mn-tile mn-tile--menu${drawerOpen ? ' active' : ''}`}
          onClick={() => setDrawerOpen((v) => !v)}
          aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={drawerOpen}
        >
          <i className={drawerOpen ? 'ri-close-line' : 'ri-menu-line'} />
        </button>
      </nav>

      <style>{`
        .mn-pill {
          position: fixed;
          left: 50%;
          bottom: 14px;
          transform: translateX(-50%);
          z-index: 1000;
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 6px;
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 999px;
          background: rgba(16,18,26,0.55);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: inset 0 1px 1px rgba(255,255,255,0.12), 0 12px 34px -12px rgba(0,0,0,0.7);
          max-width: calc(100vw - 24px);
        }

        .mn-tile {
          width: 44px;
          height: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          border-radius: 999px;
          color: rgba(255,255,255,0.7);
          font-size: 1.2rem;
          cursor: pointer;
          transition: background var(--transition), color var(--transition), transform 160ms ease;
          -webkit-tap-highlight-color: transparent;
        }
        .mn-tile:active {
          transform: scale(0.92);
        }
        .mn-tile.active {
          background: rgba(233,184,119,0.14);
          color: #f4cf8f;
        }
        .mn-tile--menu.active {
          background: rgba(233,184,119,0.2);
          color: #f4cf8f;
        }

        .mn-backdrop {
          position: fixed;
          inset: 0;
          z-index: 998;
          background: rgba(0,0,0,0.45);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
        }

        .mn-drawer {
          position: fixed;
          left: 14px;
          right: 14px;
          bottom: 76px;
          z-index: 999;
          background: rgba(16,18,26,0.92);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 20px;
          padding: 14px 10px 10px;
          box-shadow: 0 24px 60px rgba(0,0,0,0.55);
        }
        .mn-drawer-handle {
          width: 38px;
          height: 4px;
          border-radius: 999px;
          background: rgba(255,255,255,0.2);
          margin: 0 auto 12px;
        }
        .mn-drawer-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .mn-drawer-list a {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 14px;
          border-radius: 14px;
          color: rgba(255,255,255,0.72);
          font-family: var(--font-display);
          font-weight: 500;
          font-size: 1rem;
          transition: background var(--transition), color var(--transition);
        }
        .mn-drawer-list a i {
          font-size: 1.25rem;
          color: rgba(255,255,255,0.55);
          transition: color var(--transition);
        }
        .mn-drawer-list a.active {
          background: rgba(233,184,119,0.13);
          color: #ffffff;
        }
        .mn-drawer-list a.active i {
          color: #f4cf8f;
        }
        .mn-drawer-dot {
          margin-left: auto;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #f4cf8f;
          box-shadow: 0 0 0 4px rgba(233,184,119,0.18);
        }

        :is([data-theme="day"], [data-theme="desert"]) .mn-pill {
          box-shadow: 0 6px 26px rgba(60,40,15,0.12);
        }
        :is([data-theme="day"], [data-theme="desert"]) .mn-backdrop {
          background: rgba(60,40,15,0.32);
        }
        :is([data-theme="day"], [data-theme="desert"]) .mn-drawer {
          box-shadow: 0 24px 60px rgba(60,40,15,0.18);
        }

        @media (min-width: 769px) {
          .mn-pill, .mn-drawer, .mn-backdrop { display: none !important; }
        }
      `}</style>
    </>
  )
}
