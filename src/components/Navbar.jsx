import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/projects', label: 'Projects' },
  { path: '/skills', label: 'Skills' },
  { path: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function toggleTheme() {
    const html = document.documentElement
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
    html.setAttribute('data-theme', next)
    localStorage.setItem('theme', next)
  }

  // Restore theme on mount
  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'dark'
    document.documentElement.setAttribute('data-theme', saved)
  }, [])

  const theme = typeof document !== 'undefined'
    ? document.documentElement.getAttribute('data-theme')
    : 'dark'

  return (
    <>
      <nav className="navbar" style={scrolled ? { boxShadow: 'var(--shadow)' } : {}}>
        <div className="nav-inner" style={{
          maxWidth: 1100, margin: '0 auto', padding: '0 2rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64
        }}>
          <Link to="/" className="nav-logo" style={{
            fontFamily: 'var(--font-display)', fontSize: '1.25rem',
            fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.03em'
          }}>
            faisal<span style={{ color: 'var(--accent)' }}>.</span>
          </Link>

          <ul className="nav-links" style={{
            display: 'flex', alignItems: 'center', gap: '0.25rem', listStyle: 'none'
          }}>
            {navLinks.map(({ path, label }) => (
              <li key={path}>
                <Link
                  to={path}
                  className={pathname === path ? 'active' : ''}
                  style={{
                    color: pathname === path ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontSize: '0.9rem', fontWeight: 500, padding: '0.5rem 1rem',
                    borderRadius: 8, transition: 'all var(--transition)',
                    background: pathname === path ? 'var(--accent-glow)' : 'transparent',
                    display: 'block'
                  }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme" style={{
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
        {navLinks.map(({ path, label }) => (
          <Link
            key={path}
            to={path}
            onClick={() => setMenuOpen(false)}
            style={{
              color: pathname === path ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontSize: '0.95rem', fontWeight: 500, padding: '0.75rem 1rem',
              borderRadius: 8, display: 'block', transition: 'all var(--transition)',
              background: pathname === path ? 'var(--accent-glow)' : 'transparent'
            }}
          >
            {label}
          </Link>
        ))}
      </div>

      <style>{`
        .navbar{position:fixed;top:0;left:0;right:0;z-index:1000;background:var(--nav-bg);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-bottom:1px solid var(--border);transition:background var(--transition),border var(--transition)}
        @media(max-width:768px){
          .nav-links{display:none !important}
          .hamburger{display:flex !important}
        }
      `}</style>
    </>
  )
}
