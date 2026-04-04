import ScrollReveal from '../components/ScrollReveal'
import TiltCard from '../components/TiltCard'

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

export default function Skills() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <span className="section-label">What I Work With</span>
          <h1>Skills & <span className="accent-text">Technologies</span></h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.75rem', maxWidth: 500, marginLeft: 'auto', marginRight: 'auto' }}>
            The tools, languages, and frameworks I use to bring ideas to life.
          </p>
        </div>
      </div>

      <section style={{ paddingTop: '1rem', paddingBottom: '4rem' }}>
        <div className="container">
          <div className="skills-grid">
            {skillCategories.map((cat, i) => (
              <ScrollReveal key={cat.title} delay={0.1 * ((i % 3) + 1)}>
                <TiltCard className="skill-category">
                  <h3>
                    <i className={cat.icon} style={{ color: 'var(--accent)' }}></i>
                    {cat.title}
                  </h3>
                  <div className="skill-items">
                    {cat.items.map(item => (
                      <div key={item.label} className="skill-item">
                        <i className={item.icon}></i> {item.label}
                      </div>
                    ))}
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Currently Learning */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <span className="section-label">Always Growing</span>
              <h2>Currently Learning</h2>
            </div>
          </ScrollReveal>
          <div className="projects-grid" style={{ maxWidth: 700, margin: '0 auto' }}>
            {learning.map((item, i) => (
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
