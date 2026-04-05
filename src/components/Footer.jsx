export default function Footer() {
  function handleClick(e, href) {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <p className="footer-text">&copy; 2026 Faisal Hossain. Built with purpose.</p>
          <div className="footer-links">
            <a href="#about" onClick={(e) => handleClick(e, '#about')}>About</a>
            <a href="#projects" onClick={(e) => handleClick(e, '#projects')}>Projects</a>
            <a href="#contact" onClick={(e) => handleClick(e, '#contact')}>Contact</a>
            <a href="https://github.com/HAVIC-47" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
