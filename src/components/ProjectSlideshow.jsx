import { useState, useEffect, useRef, useCallback } from 'react'

const AUTOPLAY_DELAY = 2200
const WHEEL_COOLDOWN = 350

export default function ProjectSlideshow({ media, color }) {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef(null)
  const cooldownRef = useRef(false)
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const total = media.length

  const advance = useCallback((dir = 1) => {
    setCurrent(prev => (prev + dir + total) % total)
  }, [total])

  /* Auto-advance timer */
  useEffect(() => {
    if (isPaused) return
    const item = media[current]
    /* Don't auto-advance while a video is playing */
    if (item.type === 'video') return

    timerRef.current = setTimeout(() => advance(1), AUTOPLAY_DELAY)
    return () => clearTimeout(timerRef.current)
  }, [current, isPaused, media, advance])

  /* Wheel to advance slides */
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    function onWheel(e) {
      e.preventDefault()
      e.stopPropagation()
      if (cooldownRef.current) return
      cooldownRef.current = true
      advance(e.deltaY > 0 ? 1 : -1)
      setTimeout(() => { cooldownRef.current = false }, WHEEL_COOLDOWN)
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [advance])

  function handleVideoEnded() {
    advance(1)
  }

  const showDots = total <= 12

  return (
    <div
      ref={containerRef}
      className="ps-slideshow"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {media.map((item, i) => (
        <div
          key={i}
          className={`ps-slideshow-item${i === current ? ' active' : ''}`}
        >
          {item.type === 'video' ? (
            <video
              ref={i === current ? videoRef : null}
              src={item.src}
              autoPlay={i === current}
              controls
              playsInline
              muted
              onEnded={handleVideoEnded}
              className="ps-slideshow-media"
            />
          ) : (
            <img
              src={item.src}
              alt={`Screenshot ${i + 1}`}
              className="ps-slideshow-media"
              loading="lazy"
            />
          )}
        </div>
      ))}

      {/* Progress indicator */}
      {showDots ? (
        <div className="ps-slideshow-dots">
          {media.map((_, i) => (
            <button
              key={i}
              className={`ps-slideshow-dot${i === current ? ' active' : ''}`}
              style={i === current ? { background: color } : undefined}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
      ) : (
        <div className="ps-slideshow-progress">
          <div
            className="ps-slideshow-progress-fill"
            style={{
              width: `${((current + 1) / total) * 100}%`,
              background: color,
            }}
          />
        </div>
      )}

      {/* Slide counter */}
      <div className="ps-slideshow-counter">
        {current + 1} / {total}
      </div>

      <style>{`
        .ps-slideshow {
          width: 100%;
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          background: rgba(16, 16, 28, 0.88);
          cursor: grab;
        }

        .ps-slideshow-item {
          width: 100%;
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
          position: absolute;
          top: 0;
          left: 0;
        }

        .ps-slideshow-item:first-child {
          position: relative;
        }

        .ps-slideshow-item.active {
          opacity: 1;
          pointer-events: auto;
        }

        .ps-slideshow-media {
          width: 100%;
          height: auto;
          display: block;
        }

        video.ps-slideshow-media {
          background: #000;
        }

        .ps-slideshow-dots {
          position: absolute;
          bottom: 14px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 6px;
          z-index: 2;
        }

        .ps-slideshow-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: none;
          padding: 0;
          background: rgba(255, 255, 255, 0.3);
          cursor: pointer;
          transition: background 0.3s, transform 0.2s;
        }

        .ps-slideshow-dot:hover {
          background: rgba(255, 255, 255, 0.6);
        }

        .ps-slideshow-dot.active {
          transform: scale(1.25);
        }

        .ps-slideshow-progress {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: rgba(255, 255, 255, 0.1);
          z-index: 2;
        }

        .ps-slideshow-progress-fill {
          height: 100%;
          transition: width 0.4s ease;
          border-radius: 0 2px 2px 0;
        }

        .ps-slideshow-counter {
          position: absolute;
          top: 12px;
          right: 14px;
          font-family: var(--font-mono, monospace);
          font-size: 0.72rem;
          color: rgba(255, 255, 255, 0.5);
          background: rgba(0, 0, 0, 0.4);
          padding: 3px 8px;
          border-radius: 6px;
          z-index: 2;
          letter-spacing: 0.05em;
        }

        [data-theme="light"] .ps-slideshow {
          background: rgba(245, 245, 244, 0.92);
        }

        [data-theme="light"] .ps-slideshow-counter {
          color: rgba(28, 25, 23, 0.5);
          background: rgba(255, 255, 255, 0.7);
        }

        [data-theme="light"] .ps-slideshow-dot {
          background: rgba(28, 25, 23, 0.2);
        }

        [data-theme="light"] .ps-slideshow-dot:hover {
          background: rgba(28, 25, 23, 0.5);
        }

        [data-theme="light"] .ps-slideshow-progress {
          background: rgba(28, 25, 23, 0.06);
        }

        @media (max-width: 768px) {
          .ps-slideshow {
            max-height: 45vh;
          }
        }
      `}</style>
    </div>
  )
}
