import ScrollReveal from '../components/ScrollReveal'
import TiltCard from '../components/TiltCard'
import GlowStat from '../components/GlowStat'

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

export default function About() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <span className="section-label">Get to Know Me</span>
          <h1>About <span className="accent-text">Me</span></h1>
        </div>
      </div>

      {/* Bio */}
      <section style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
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
      </section>

      {/* Timeline */}
      <section style={{ padding: '4rem 0' }}>
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
      </section>

      {/* Interests */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <span className="section-label">Beyond Code</span>
              <h2>What Drives Me</h2>
            </div>
          </ScrollReveal>
          <div className="projects-grid">
            {interests.map((item, i) => (
              <ScrollReveal key={item.title} delay={0.1 * (i + 1)}>
                <TiltCard>
                  <div style={{ textAlign: 'center' }}>
                    <div className="project-icon" style={{ margin: '0 auto 1rem' }}>
                      <i className={item.icon}></i>
                    </div>
                    <h3>{item.title}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>{item.desc}</p>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
