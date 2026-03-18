import { Link } from 'react-router-dom'
import ParticleCanvas from '../components/ParticleCanvas'
import ScrollReveal from '../components/ScrollReveal'
import TiltCard from '../components/TiltCard'

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

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', paddingTop: 64 }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <ParticleCanvas />
          <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', filter: 'blur(120px)', opacity: 0.15, background: 'var(--accent)', top: '10%', right: '-10%', animation: 'pulse 4s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', filter: 'blur(120px)', opacity: 0.15, background: '#48bfe3', bottom: '10%', left: '-10%', animation: 'pulse 4s ease-in-out infinite 2s' }} />
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} className="hero-grid">
            <div className="animate-in">
              <p className="mono" style={{ color: 'var(--accent)', marginBottom: '1rem' }}>// hello, world</p>
              <h1 style={{ marginBottom: '1rem' }}>
                I'm <span className="gradient-text">Faisal Hossain</span>
              </h1>
              <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: 440 }}>
                An aspiring <strong style={{ color: 'var(--text-primary)' }}>Python full-stack developer</strong> who loves turning ideas into real-world applications — from AI projects to web platforms.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/projects" className="btn btn-primary">
                  <i className="ri-code-s-slash-line"></i> View Projects
                </Link>
                <Link to="/about" className="btn btn-outline">
                  <i className="ri-user-line"></i> About Me
                </Link>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '2rem' }}>
                <a href="https://github.com/HAVIC-47" target="_blank" rel="noopener noreferrer" className="social-icon"><i className="ri-github-fill"></i></a>
                <a href="https://www.facebook.com/HAVIC47" target="_blank" rel="noopener noreferrer" className="social-icon"><i className="ri-facebook-fill"></i></a>
                <a href="https://www.instagram.com/visuals_of_faisal" target="_blank" rel="noopener noreferrer" className="social-icon"><i className="ri-instagram-line"></i></a>
                <a href="https://discord.gg/pgakM24PEs" target="_blank" rel="noopener noreferrer" className="social-icon"><i className="ri-discord-fill"></i></a>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="animate-in animate-delay-2">
              <img
                src="https://avatars.githubusercontent.com/u/123256888?v=4"
                alt="Faisal Hossain"
                style={{
                  width: 300, height: 300, borderRadius: '50%',
                  border: '3px solid var(--border)', objectFit: 'cover',
                  transition: 'all var(--transition)',
                  boxShadow: '0 0 60px var(--accent-glow)'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
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
      <section style={{ padding: '4rem 0' }}>
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
        @media(max-width:768px){
          .hero-grid{grid-template-columns:1fr !important;text-align:center}
          .hero-grid > div:first-child{order:2}
          .hero-grid > div:last-child{order:1}
          .hero-grid img{width:200px !important;height:200px !important}
          .hero-grid .btn{justify-content:center}
          .hero-grid div[style*="gap: 0.75rem"]{justify-content:center}
          .hero-grid div[style*="gap: 1rem"]{justify-content:center}
        }
      `}</style>
    </>
  )
}
