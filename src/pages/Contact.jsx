import { useState } from 'react'
import ScrollReveal from '../components/ScrollReveal'

const contacts = [
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

export default function Contact() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
    setTimeout(() => {
      setSent(false)
      e.target.reset()
    }, 2500)
  }

  return (
    <>
      <div className="page-header">
        <div className="container">
          <span className="section-label">Let's Connect</span>
          <h1>Get in <span className="accent-text">Touch</span></h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.75rem', maxWidth: 500, marginLeft: 'auto', marginRight: 'auto' }}>
            Have a project idea, question, or just want to say hello? I'd love to hear from you.
          </p>
        </div>
      </div>

      <section style={{ paddingTop: '1rem', paddingBottom: '4rem' }}>
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
      </section>

      {/* Social Banner */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <ScrollReveal>
            <div className="card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>Let's build something together</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Find me on these platforms</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                {socials.map(s => (
                  <a key={s.icon} href={s.link} target="_blank" rel="noopener noreferrer" className="social-icon">
                    <i className={s.icon}></i>
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
