import ScrollReveal from '../components/ScrollReveal'
import TiltCard from '../components/TiltCard'

const projects = [
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

export default function Projects() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <span className="section-label">My Work</span>
          <h1>All <span className="accent-text">Projects</span></h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.75rem', maxWidth: 500, marginLeft: 'auto', marginRight: 'auto' }}>
            From AI-powered games to web platforms — a collection of everything I've built.
          </p>
        </div>
      </div>

      <section style={{ paddingTop: '1rem', paddingBottom: '4rem' }}>
        <div className="container">
          <div className="projects-grid">
            {projects.map((p, i) => (
              <ScrollReveal key={p.title} delay={0.1 * ((i % 3) + 1)}>
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
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>Want to see more? Check out my full GitHub profile.</p>
              <a href="https://github.com/HAVIC-47" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <i className="ri-github-fill"></i> View GitHub Profile
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
