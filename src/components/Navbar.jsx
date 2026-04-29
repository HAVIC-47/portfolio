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
      <nav className="navbar" style={scrolled ? { boxShadow: 'var(--shadow)' } : {}}>
        <div className="nav-inner" style={{
          maxWidth: 1100, margin: '0 auto', padding: '0 2rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64
        }}>
          <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="nav-logo" style={{
            fontFamily: 'var(--font-display)', fontSize: '1.25rem',
            fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.03em'
          }}>
            faisal<span style={{ color: 'var(--accent)' }}>.</span>
          </a>

          <ul className="nav-links" style={{
            display: 'flex', alignItems: 'center', gap: '0.25rem', listStyle: 'none'
          }}>
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={(e) => handleNavClick(e, href)}
                  className={activeSection === href ? 'active' : ''}
                  style={{
                    color: activeSection === href ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontSize: '0.9rem', fontWeight: 500, padding: '0.5rem 1rem',
                    borderRadius: 8, transition: 'all var(--transition)',
                    background: activeSection === href ? 'var(--accent-glow)' : 'transparent',
                    display: 'block'
                  }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button className="theme-toggle" onClick={cycleTheme} aria-label="Cycle theme" title={`Theme: ${theme}`} style={{
              width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'transparent', border: '1px solid var(--border)', borderRadius: 10,
              color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '1.1rem',
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
        .navbar{position:fixed;top:0;left:0;right:0;z-index:1000;background:var(--nav-bg);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-bottom:1px solid var(--border);transition:background var(--transition),border var(--transition)}
        @media(max-width:768px){
          .nav-links{display:none !important}
          .hamburger{display:flex !important}
        }
        @media(max-width:480px){
          .nav-inner{padding:0 1rem !important}
          .mobile-nav{padding:0.75rem 1rem !important}
        }
      `}</style>
    </>
  )
}
