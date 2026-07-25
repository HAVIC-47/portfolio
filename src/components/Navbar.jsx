import { useState, useEffect } from 'react'

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

const THEMES = ['night', 'day', 'forest', 'desert']
const LEGACY_THEMES = { dark: 'night', light: 'day' }

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('#home')
  const [theme, setTheme] = useState('night')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)

      // Determine active section based on scroll position
      const sections = navLinks.map(l => l.href.slice(1))
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
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function cycleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'night'
    const idx = THEMES.indexOf(current)
    const next = THEMES[(idx + 1) % THEMES.length]
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('theme', next)
    setTheme(next)
  }

  // Restore theme on mount (with legacy migration: dark→night, light→day)
  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const resolved = THEMES.includes(saved) ? saved : (LEGACY_THEMES[saved] ?? 'night')
    document.documentElement.setAttribute('data-theme', resolved)
    if (resolved !== saved) localStorage.setItem('theme', resolved)
    setTheme(resolved)
  }, [])

  function handleNavClick(e, href) {
    e.preventDefault()
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner" style={{
          maxWidth: 1000, margin: '0 auto',
          padding: '0.4rem 0.5rem 0.4rem 1.4rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderRadius: 999,
          background: 'rgba(18, 20, 28, 0.5)',
          backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.12), 0 10px 34px -14px rgba(0,0,0,0.65)'
        }}>
          <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="nav-logo" style={{
            fontFamily: "'Instrument Serif', serif", fontSize: '1.65rem',
            fontWeight: 400, color: '#ffffff', letterSpacing: '0'
          }}>
            faisal<span style={{ color: '#f4cf8f' }}>.</span>
          </a>

          <ul className="nav-links" style={{
            display: 'flex', alignItems: 'center', gap: '0.25rem', listStyle: 'none'
          }}>
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={(e) => handleNavClick(e, href)}
                  className={`nav-link ${activeSection === href ? 'active' : ''}`}
                  style={{
                    fontSize: '0.85rem', fontWeight: 500, padding: '0.45rem 0.95rem',
                    borderRadius: 999, display: 'block'
                  }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button className="theme-toggle" onClick={cycleTheme} aria-label="Cycle theme" title={`Theme: ${theme}`} style={{
              width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.16)', borderRadius: 999,
              color: 'rgba(255,255,255,0.82)', cursor: 'pointer', fontSize: '1.05rem',
              transition: 'all var(--transition)'
            }}>
              <i className="ri-contrast-2-line"></i>
            </button>

            <button
              className={`hamburger ${menuOpen ? 'active' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
              style={{
                display: 'none', flexDirection: 'column', gap: 5,
                background: 'none', border: 'none', cursor: 'pointer', padding: 4
              }}
            >
              <span style={{ display: 'block', width: 22, height: 2, background: 'var(--text-primary)', borderRadius: 2, transition: 'all var(--transition)' }} />
              <span style={{ display: 'block', width: 22, height: 2, background: 'var(--text-primary)', borderRadius: 2, transition: 'all var(--transition)' }} />
              <span style={{ display: 'block', width: 22, height: 2, background: 'var(--text-primary)', borderRadius: 2, transition: 'all var(--transition)' }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Nav */}
      <div className={`mobile-nav ${menuOpen ? 'active' : ''}`} style={{
        display: menuOpen ? 'flex' : 'none',
        position: 'fixed', top: 64, left: 0, right: 0,
        background: 'var(--nav-bg)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border)', padding: '1rem 2rem',
        zIndex: 999, flexDirection: 'column', gap: '0.25rem'
      }}>
        {navLinks.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            onClick={(e) => handleNavClick(e, href)}
            style={{
              color: activeSection === href ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontSize: '0.95rem', fontWeight: 500, padding: '0.75rem 1rem',
              borderRadius: 8, display: 'block', transition: 'all var(--transition)',
              background: activeSection === href ? 'var(--accent-glow)' : 'transparent'
            }}
          >
            {label}
          </a>
        ))}
      </div>

      <style>{`
        .navbar{position:fixed;top:0;left:0;right:0;z-index:1000;background:transparent;border:none;padding:0.7rem 1rem 0;transition:padding var(--transition)}
        .navbar.scrolled{padding-top:0.5rem}
        .navbar.scrolled .nav-inner{background:rgba(14,16,22,0.66) !important}
        .nav-logo{transition:opacity 0.2s ease}
        .nav-logo:hover{opacity:0.85}
        .nav-link{color:rgba(255,255,255,0.7);transition:color 0.2s ease, background 0.2s ease}
        .nav-link:hover{color:#ffffff;background:rgba(255,255,255,0.06)}
        .nav-link.active{color:#f4cf8f;background:rgba(233,184,119,0.13)}
        .theme-toggle:hover{color:#f4cf8f !important;border-color:rgba(244,207,143,0.4) !important}
        @media(max-width:768px){
          .nav-links{display:none !important}
          .hamburger{display:flex !important}
          .navbar{display:none !important}
          .mobile-nav{display:none !important}
        }
        @media(max-width:480px){
          .nav-inner{padding:0 1rem !important}
          .mobile-nav{padding:0.75rem 1rem !important}
        }
      `}</style>
    </>
  )
}
