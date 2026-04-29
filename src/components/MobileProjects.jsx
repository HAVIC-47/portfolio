import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { projects } from './ProjectShowcase'

export default function MobileProjects() {
  const [openId, setOpenId] = useState(null)
  const [slideIdx, setSlideIdx] = useState(0)
  const carouselRef = useRef(null)
  const open = projects.find((p) => p.id === openId) || null

  // Build slides: thumbnail first, then media
  const slides = useMemo(() => {
    if (!open) return []
    const list = []
    if (open.thumbnail) list.push({ type: 'image', src: open.thumbnail })
    if (Array.isArray(open.media)) list.push(...open.media)
    return list
  }, [open])

  const closeModal = useCallback(() => {
    setOpenId(null)
  }, [])

  const openModal = (id) => {
    setOpenId(id)
    setSlideIdx(0)
    window.history.pushState({ projectModal: id }, '', `#project-${id}`)
  }

  // Hardware back closes modal
  useEffect(() => {
    const onPop = () => setOpenId(null)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  // Lock body scroll while modal open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = prev }
    }
  }, [open])

  // Reset carousel scroll on open
  useEffect(() => {
    if (open && carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0 })
      setSlideIdx(0)
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

  const onCarouselScroll = (e) => {
    const w = e.currentTarget.clientWidth
    if (!w) return
    const idx = Math.round(e.currentTarget.scrollLeft / w)
    if (idx !== slideIdx) setSlideIdx(idx)
  }

  const goToSlide = (i) => {
    const el = carouselRef.current
    if (!el) return
    el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' })
  }

  return (
    <section id="projects" className="m-projects">
      <div className="m-projects-head">
        <span className="section-label">Featured Projects</span>
        <h2>Selected <span className="accent-text">Work</span></h2>
        <p className="m-projects-sub">Tap a card for the full story. Swipe through every shot.</p>
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
              {/* Swipeable gallery — all project images */}
              {slides.length > 0 && (
                <div className="m-gal" style={{ background: `linear-gradient(135deg, ${open.color}33, transparent 80%)` }}>
                  <div
                    ref={carouselRef}
                    className="m-gal-track"
                    onScroll={onCarouselScroll}
                  >
                    {slides.map((m, i) => (
                      <div key={i} className="m-gal-slide">
                        {m.type === 'video' ? (
                          <video src={m.src} controls preload="metadata" playsInline />
                        ) : (
                          <img src={m.src} alt={`${open.title} ${i + 1}`} loading={i === 0 ? 'eager' : 'lazy'} draggable={false} />
                        )}
                      </div>
                    ))}
                  </div>

                  {slides.length > 1 && (
                    <>
                      <div className="m-gal-counter">
                        <span>{slideIdx + 1}</span>
                        <span className="m-gal-counter-sep">/</span>
                        <span>{slides.length}</span>
                      </div>
                      <div className="m-gal-progress" aria-hidden>
                        <div
                          className="m-gal-progress-bar"
                          style={{ width: `${((slideIdx + 1) / slides.length) * 100}%` }}
                        />
                      </div>
                      <div className="m-gal-hint" aria-hidden>
                        <i className="ri-arrow-left-right-line" />
                        <span>swipe</span>
                      </div>
                    </>
                  )}
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

                {/* Quick jump dots — only when slide count is reasonable */}
                {slides.length > 1 && slides.length <= 12 && (
                  <div className="m-gal-dots" role="tablist" aria-label="Gallery slides">
                    {slides.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        className={`m-gal-dot ${i === slideIdx ? 'is-active' : ''}`}
                        onClick={() => goToSlide(i)}
                        aria-label={`Go to slide ${i + 1}`}
                      />
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

        /* GALLERY — horizontal swipe carousel */
        .m-gal {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 11;
          overflow: hidden;
        }
        .m-gal-track {
          display: flex;
          width: 100%;
          height: 100%;
          overflow-x: auto;
          overflow-y: hidden;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .m-gal-track::-webkit-scrollbar { display: none; }
        .m-gal-slide {
          flex: 0 0 100%;
          width: 100%;
          height: 100%;
          scroll-snap-align: start;
          scroll-snap-stop: always;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-secondary);
        }
        .m-gal-slide img,
        .m-gal-slide video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          user-select: none;
          -webkit-user-drag: none;
        }
        .m-gal-counter {
          position: absolute;
          top: 0.85rem;
          right: 0.85rem;
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.35rem 0.7rem;
          background: rgba(0,0,0,0.55);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 999px;
          color: #fff;
          font-family: var(--font-mono);
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          pointer-events: none;
        }
        .m-gal-counter-sep {
          opacity: 0.5;
          margin: 0 0.1rem;
        }
        .m-gal-progress {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 3px;
          background: rgba(0,0,0,0.35);
        }
        .m-gal-progress-bar {
          height: 100%;
          background: var(--accent);
          transition: width 220ms ease;
        }
        .m-gal-hint {
          position: absolute;
          left: 0.85rem;
          bottom: 0.7rem;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.3rem 0.65rem;
          background: rgba(0,0,0,0.45);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 999px;
          color: rgba(255,255,255,0.85);
          font-family: var(--font-mono);
          font-size: 0.68rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          pointer-events: none;
          opacity: 0.85;
          animation: m-gal-hint-fade 4s ease-in-out forwards;
        }
        @keyframes m-gal-hint-fade {
          0% { opacity: 0; transform: translateY(4px); }
          15% { opacity: 0.85; transform: translateY(0); }
          75% { opacity: 0.85; }
          100% { opacity: 0; transform: translateY(4px); }
        }

        .m-gal-dots {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
          margin-top: 1.1rem;
        }
        .m-gal-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--border-hover);
          border: 0;
          padding: 0;
          cursor: pointer;
          transition: all 200ms ease;
        }
        .m-gal-dot.is-active {
          background: var(--accent);
          width: 22px;
          border-radius: 999px;
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

        @media (prefers-reduced-motion: reduce) {
          .m-gal-track { scroll-behavior: auto; }
          .m-gal-hint { animation: none; opacity: 0.85; }
        }
      `}</style>
    </section>
  )
}
