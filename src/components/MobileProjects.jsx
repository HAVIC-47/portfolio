import { useState, useEffect, useCallback } from 'react'
import { projects } from './ProjectShowcase'

export default function MobileProjects() {
  const [openId, setOpenId] = useState(null)
  const open = projects.find((p) => p.id === openId) || null

  const closeModal = useCallback(() => {
    setOpenId(null)
  }, [])

  const openModal = (id) => {
    setOpenId(id)
    window.history.pushState({ projectModal: id }, '', `#project-${id}`)
  }

  // Hardware back button → close modal instead of leaving page
  useEffect(() => {
    const onPop = () => {
      setOpenId(null)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  // Lock body scroll when modal open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = prev }
    }
  }, [open])

  // ESC closes
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (window.history.state?.projectModal) window.history.back()
        else closeModal()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, closeModal])

  const handleClose = () => {
    if (window.history.state?.projectModal) window.history.back()
    else closeModal()
  }

  return (
    <section id="projects" className="m-projects">
      <div className="m-projects-head">
        <span className="section-label">Featured Projects</span>
        <h2>Selected <span className="accent-text">Work</span></h2>
        <p className="m-projects-sub">Tap any card for the full story.</p>
      </div>

      <ul className="m-projects-list">
        {projects.map((p) => (
          <li key={p.id}>
            <button
              type="button"
              className="m-project-card"
              onClick={() => openModal(p.id)}
              aria-label={`Open ${p.title}`}
            >
              <div className="m-project-thumb" style={{ background: `linear-gradient(135deg, ${p.color}33, transparent 70%)` }}>
                {p.thumbnail && (
                  <img src={p.thumbnail} alt={p.title} loading="lazy" />
                )}
              </div>
              <div className="m-project-meta">
                <span className="m-project-cat">{p.category}</span>
                <h3 className="m-project-title">{p.title}</h3>
                <span className="m-project-arrow"><i className="ri-arrow-right-up-line" /></span>
              </div>
            </button>
          </li>
        ))}
      </ul>

      {open && (
        <div className="m-modal" role="dialog" aria-modal="true" aria-labelledby={`m-modal-title-${open.id}`}>
          <button type="button" className="m-modal-backdrop" onClick={handleClose} aria-label="Close" />
          <div className="m-modal-sheet">
            <div className="m-modal-bar">
              <button type="button" className="m-modal-back" onClick={handleClose} aria-label="Back">
                <i className="ri-arrow-left-line" /> <span>Back</span>
              </button>
              <button type="button" className="m-modal-close" onClick={handleClose} aria-label="Close">
                <i className="ri-close-line" />
              </button>
            </div>

            <div className="m-modal-scroll">
              {open.thumbnail && (
                <div className="m-modal-hero" style={{ background: `linear-gradient(135deg, ${open.color}55, transparent)` }}>
                  <img src={open.thumbnail} alt={open.title} />
                </div>
              )}

              <div className="m-modal-body">
                <span className="m-project-cat">{open.category}</span>
                <h2 id={`m-modal-title-${open.id}`} className="m-modal-title">{open.title}</h2>

                <div className="m-modal-tags">
                  {open.tags.map((t) => (
                    <span key={t} className="m-modal-tag">{t}</span>
                  ))}
                </div>

                <div className="m-modal-desc">
                  {open.desc.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                {open.link && (
                  <a
                    href={open.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary m-modal-cta"
                  >
                    <span>View on GitHub</span>
                    <i className="ri-external-link-line" />
                  </a>
                )}

                {Array.isArray(open.media) && open.media.length > 0 && (
                  <div className="m-modal-gallery">
                    {open.media.slice(0, 6).map((m, i) => (
                      m.type === 'video' ? (
                        <video key={i} src={m.src} controls preload="metadata" />
                      ) : (
                        <img key={i} src={m.src} alt={`${open.title} ${i + 1}`} loading="lazy" />
                      )
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .m-projects {
          padding: 4rem 1.25rem;
          position: relative;
          z-index: 1;
        }
        .m-projects-head {
          max-width: 520px;
          margin: 0 auto 1.6rem;
        }
        .m-projects-head h2 {
          font-family: var(--font-display);
          font-size: clamp(1.8rem, 7vw, 2.4rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          margin-top: 0.4rem;
        }
        .m-projects-sub {
          color: var(--text-muted);
          font-size: 0.88rem;
          margin-top: 0.5rem;
        }
        .m-projects-list {
          max-width: 520px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          list-style: none;
          padding: 0;
        }
        .m-project-card {
          width: 100%;
          display: flex;
          gap: 0.9rem;
          align-items: center;
          padding: 0.7rem;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 14px;
          color: var(--text-primary);
          text-align: left;
          cursor: pointer;
          transition: border-color var(--transition), background var(--transition);
        }
        .m-project-card:active { background: var(--bg-card-hover); }
        .m-project-card:hover { border-color: var(--border-hover); }
        .m-project-thumb {
          flex: 0 0 84px;
          width: 84px;
          height: 84px;
          border-radius: 10px;
          overflow: hidden;
          background: var(--bg-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .m-project-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .m-project-meta {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          position: relative;
        }
        .m-project-cat {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--accent);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .m-project-title {
          font-family: var(--font-display);
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .m-project-arrow {
          position: absolute;
          top: 0;
          right: 0;
          color: var(--text-muted);
          font-size: 1.05rem;
        }
        .m-project-card:hover .m-project-arrow { color: var(--accent); }

        /* MODAL */
        .m-modal {
          position: fixed;
          inset: 0;
          z-index: 2000;
          display: flex;
          align-items: stretch;
          justify-content: center;
        }
        .m-modal-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.55);
          backdrop-filter: blur(6px);
          border: 0;
          padding: 0;
          cursor: pointer;
        }
        .m-modal-sheet {
          position: relative;
          width: 100%;
          max-width: 640px;
          background: var(--bg-primary);
          display: flex;
          flex-direction: column;
          animation: m-modal-in 0.28s ease-out;
        }
        @keyframes m-modal-in {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .m-modal-bar {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1rem;
          border-bottom: 1px solid var(--border);
          background: var(--nav-bg);
          backdrop-filter: blur(20px);
          position: sticky;
          top: 0;
          z-index: 1;
        }
        .m-modal-back, .m-modal-close {
          background: transparent;
          border: 1px solid var(--border);
          color: var(--text-primary);
          border-radius: 10px;
          padding: 0.5rem 0.85rem;
          font-size: 0.9rem;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
        }
        .m-modal-close { padding: 0.5rem 0.65rem; }
        .m-modal-scroll {
          flex: 1;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
        .m-modal-hero {
          width: 100%;
          aspect-ratio: 16 / 10;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .m-modal-hero img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .m-modal-body {
          padding: 1.4rem 1.25rem 3rem;
          max-width: 640px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .m-modal-title {
          font-family: var(--font-display);
          font-size: clamp(1.7rem, 6vw, 2.2rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          margin-top: 0.2rem;
        }
        .m-modal-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }
        .m-modal-tag {
          background: var(--bg-card);
          border: 1px solid var(--border);
          color: var(--text-secondary);
          padding: 0.3rem 0.65rem;
          border-radius: 999px;
          font-size: 0.78rem;
          font-family: var(--font-mono);
        }
        .m-modal-desc p {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.65;
        }
        .m-modal-desc p + p { margin-top: 0.7rem; }
        .m-modal-cta {
          align-self: flex-start;
          display: inline-flex !important;
          align-items: center;
          gap: 0.4rem;
          padding: 0.75rem 1.1rem !important;
        }
        .m-modal-gallery {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          margin-top: 0.6rem;
        }
        .m-modal-gallery img,
        .m-modal-gallery video {
          width: 100%;
          height: auto;
          border-radius: 10px;
          border: 1px solid var(--border);
          display: block;
          background: var(--bg-secondary);
        }
      `}</style>
    </section>
  )
}
