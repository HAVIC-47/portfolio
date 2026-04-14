import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const AUTOPLAY_DELAY = 2200
const WHEEL_COOLDOWN = 350

function formatTime(t) {
  if (!Number.isFinite(t) || t < 0) return '0:00'
  const m = Math.floor(t / 60)
  const s = Math.floor(t % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function ProjectSlideshow({ media, color }) {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef(null)
  const cooldownRef = useRef(false)
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const total = media.length
  const currentItem = media[current]
  const isVideoSlide = currentItem?.type === 'video'

  const advance = useCallback((dir = 1) => {
    setCurrent(prev => (prev + dir + total) % total)
  }, [total])

  /* Auto-advance timer */
  useEffect(() => {
    if (isPaused) return
    const item = media[current]
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
            <VideoPlayer
              src={item.src}
              isActive={i === current}
              videoRef={i === current ? videoRef : null}
              onEnded={handleVideoEnded}
              accent={color}
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

      {/* Progress indicator — hidden on video slides so the player bar is unobstructed */}
      {!isVideoSlide && (showDots ? (
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
      ))}

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

        .ps-slideshow-dot:hover { background: rgba(255, 255, 255, 0.6); }
        .ps-slideshow-dot.active { transform: scale(1.25); }

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
          color: rgba(255, 255, 255, 0.7);
          background: rgba(0, 0, 0, 0.55);
          padding: 3px 8px;
          border-radius: 6px;
          z-index: 4;
          letter-spacing: 0.05em;
        }

        [data-theme="light"] .ps-slideshow { background: rgba(245, 245, 244, 0.92); }
        [data-theme="light"] .ps-slideshow-counter {
          color: rgba(28, 25, 23, 0.7);
          background: rgba(255, 255, 255, 0.85);
        }
        [data-theme="light"] .ps-slideshow-dot { background: rgba(28, 25, 23, 0.2); }
        [data-theme="light"] .ps-slideshow-dot:hover { background: rgba(28, 25, 23, 0.5); }
        [data-theme="light"] .ps-slideshow-progress { background: rgba(28, 25, 23, 0.06); }

        /* ===== Custom video player ===== */
        .ps-vp {
          position: relative;
          width: 100%;
          background: #000;
          display: block;
        }

        .ps-vp video {
          width: 100%;
          height: auto;
          display: block;
        }

        .ps-vp-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 2;
        }

        .ps-vp-bigplay {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(6px);
          border: 1.5px solid rgba(255, 255, 255, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          opacity: 0;
          transform: scale(0.9);
          transition: opacity 0.25s ease, transform 0.25s ease;
          pointer-events: none;
        }

        .ps-vp.is-paused .ps-vp-bigplay,
        .ps-vp:hover .ps-vp-bigplay {
          opacity: 1;
          transform: scale(1);
        }

        /* ===== YouTube-style bottom bar ===== */
        .ps-vp-bar {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          padding: clamp(28px, 5vw, 44px) clamp(8px, 1.5vw, 16px) clamp(4px, 0.8vw, 8px);
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.85) 0%,
            rgba(0, 0, 0, 0.55) 45%,
            rgba(0, 0, 0, 0) 100%
          );
          display: flex;
          flex-direction: column;
          gap: clamp(2px, 0.4vw, 6px);
          z-index: 3;
          will-change: transform, opacity;
        }

        /* Always-on thin progress hairline at very bottom (gray track + accent fill) */
        .ps-vp-hairline {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 3px;
          background: rgba(255, 255, 255, 0.25);
          z-index: 2;
          pointer-events: none;
        }

        .ps-vp-hairline-fill {
          height: 100%;
          background: var(--ps-vp-accent, #fff);
          transition: width 0.1s linear;
        }

        /* ===== Seek bar (YouTube style) ===== */
        .ps-vp-seek {
          position: relative;
          height: clamp(14px, 2vw, 20px);
          display: flex;
          align-items: center;
          cursor: pointer;
          touch-action: none;
        }

        .ps-vp-seek-track {
          position: relative;
          width: 100%;
          height: 3px;
          background: rgba(255, 255, 255, 0.28);
          border-radius: 2px;
          overflow: hidden;
          transition: height 0.15s ease;
        }

        .ps-vp-seek:hover .ps-vp-seek-track,
        .ps-vp.is-seeking .ps-vp-seek-track {
          height: 5px;
        }

        .ps-vp-seek-buffered {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.4);
        }

        .ps-vp-seek-fill {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          background: var(--ps-vp-accent, #fff);
          transition: width 0.08s linear;
        }

        .ps-vp-seek-thumb {
          position: absolute;
          top: 50%;
          width: clamp(12px, 1.4vw, 15px);
          height: clamp(12px, 1.4vw, 15px);
          border-radius: 50%;
          background: var(--ps-vp-accent, #fff);
          transform: translate(-50%, -50%) scale(0);
          transition: transform 0.15s ease;
          pointer-events: none;
          box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.4), 0 1px 4px rgba(0, 0, 0, 0.5);
        }

        .ps-vp-seek:hover .ps-vp-seek-thumb,
        .ps-vp.is-seeking .ps-vp-seek-thumb {
          transform: translate(-50%, -50%) scale(1);
        }

        /* ===== Control row ===== */
        .ps-vp-controls {
          display: flex;
          align-items: center;
          gap: clamp(4px, 0.8vw, 10px);
          color: #fff;
          font-family: var(--font-mono, monospace);
          font-size: clamp(0.68rem, 0.9vw, 0.8rem);
        }

        .ps-vp-btn {
          background: transparent;
          border: none;
          color: #fff;
          padding: clamp(4px, 0.6vw, 8px);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          transition: background 0.18s, transform 0.12s, opacity 0.18s;
          opacity: 0.92;
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.8));
        }

        .ps-vp-btn:hover {
          background: rgba(255, 255, 255, 0.14);
          opacity: 1;
        }

        .ps-vp-btn:active { transform: scale(0.92); }

        .ps-vp-btn svg {
          width: clamp(16px, 1.6vw, 20px);
          height: clamp(16px, 1.6vw, 20px);
        }

        .ps-vp-time {
          letter-spacing: 0.04em;
          color: #fff;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.9);
          padding: 0 clamp(2px, 0.4vw, 6px);
          white-space: nowrap;
          font-variant-numeric: tabular-nums;
        }

        .ps-vp-spacer { flex: 1; }

        /* ===== Responsive tuning ===== */
        @media (max-width: 768px) {
          .ps-slideshow { max-height: 45vh; }
          .ps-vp-bigplay { width: 56px; height: 56px; }
          .ps-vp-bar { gap: 2px; }
          .ps-vp-time { font-size: 0.65rem; }
          .ps-vp-controls { gap: 4px; }
        }

        @media (max-width: 480px) {
          .ps-vp-bigplay { width: 48px; height: 48px; }
          .ps-vp-controls { gap: 2px; }
          .ps-vp-btn { padding: 5px; }
          /* Hide skip buttons on very small screens to prevent crowding */
          .ps-vp-btn[data-skip] { display: none; }
        }
      `}</style>
    </div>
  )
}

function VideoPlayer({ src, isActive, videoRef, onEnded, accent }) {
  const internalRef = useRef(null)
  const setRefs = (node) => {
    internalRef.current = node
    if (videoRef) videoRef.current = node
  }

  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const [isSeeking, setIsSeeking] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [buffered, setBuffered] = useState(0)
  const seekRef = useRef(null)
  const showBar = hovered || !isPlaying || isSeeking

  /* Auto-play when this slide becomes active, pause+reset when it leaves */
  useEffect(() => {
    const v = internalRef.current
    if (!v) return
    if (isActive) {
      v.currentTime = 0
      const p = v.play()
      if (p && typeof p.catch === 'function') p.catch(() => {})
    } else {
      v.pause()
      v.currentTime = 0
    }
  }, [isActive])

  function togglePlay(e) {
    if (e) e.stopPropagation()
    const v = internalRef.current
    if (!v) return
    if (v.paused) v.play().catch(() => {})
    else v.pause()
  }

  function toggleMute(e) {
    if (e) e.stopPropagation()
    const v = internalRef.current
    if (!v) return
    v.muted = !v.muted
    setIsMuted(v.muted)
  }

  function toggleFullscreen(e) {
    if (e) e.stopPropagation()
    const v = internalRef.current
    if (!v) return
    if (document.fullscreenElement) document.exitFullscreen?.()
    else v.requestFullscreen?.()
  }

  function seekTo(clientX) {
    const v = internalRef.current
    const track = seekRef.current
    if (!v || !track || !v.duration) return
    const rect = track.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    v.currentTime = ratio * v.duration
    setCurrentTime(v.currentTime)
  }

  function onSeekDown(e) {
    e.stopPropagation()
    setIsSeeking(true)
    seekTo(e.clientX)
    function onMove(ev) { seekTo(ev.clientX) }
    function onUp() {
      setIsSeeking(false)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div
      className={`ps-vp${isPlaying ? '' : ' is-paused'}${isSeeking ? ' is-seeking' : ''}`}
      style={{ '--ps-vp-accent': accent }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <video
        ref={setRefs}
        src={src}
        autoPlay={isActive}
        playsInline
        muted={isMuted}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
        onTimeUpdate={(e) => { if (!isSeeking) setCurrentTime(e.currentTarget.currentTime) }}
        onProgress={(e) => {
          const v = e.currentTarget
          if (v.buffered.length > 0 && v.duration) {
            setBuffered((v.buffered.end(v.buffered.length - 1) / v.duration) * 100)
          }
        }}
        onEnded={() => { setIsPlaying(false); onEnded?.() }}
        onClick={togglePlay}
      />

      {/* Always-visible progress hairline (hidden when full bar is showing) */}
      <AnimatePresence>
        {!showBar && (
          <motion.div
            className="ps-vp-hairline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <div className="ps-vp-hairline-fill" style={{ width: `${progress}%` }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Big center play/pause */}
      <AnimatePresence>
        {(!isPlaying || hovered) && (
          <motion.div
            className="ps-vp-overlay"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onClick={togglePlay}
          >
            <div className="ps-vp-bigplay" aria-hidden="true">
              {isPlaying ? (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>
              ) : (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover-revealed control bar */}
      <AnimatePresence>
        {showBar && (
          <motion.div
            className="ps-vp-bar"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 14 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="ps-vp-seek"
              ref={seekRef}
              onPointerDown={onSeekDown}
            >
              <div className="ps-vp-seek-track">
                <div className="ps-vp-seek-buffered" style={{ width: `${buffered}%` }} />
                <div className="ps-vp-seek-fill" style={{ width: `${progress}%` }} />
              </div>
              <div className="ps-vp-seek-thumb" style={{ left: `${progress}%` }} />
            </div>

            <div className="ps-vp-controls">
              <button type="button" className="ps-vp-btn" onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
                {isPlaying ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                )}
              </button>

              <button type="button" data-skip className="ps-vp-btn" onClick={(e) => { e.stopPropagation(); const v = internalRef.current; if (v) v.currentTime = Math.max(0, v.currentTime - 5) }} aria-label="Back 5 seconds">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 17l-5-5 5-5"/><path d="M18 17l-5-5 5-5"/></svg>
              </button>

              <button type="button" data-skip className="ps-vp-btn" onClick={(e) => { e.stopPropagation(); const v = internalRef.current; if (v) v.currentTime = Math.min(v.duration || 0, v.currentTime + 5) }} aria-label="Forward 5 seconds">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 17l5-5-5-5"/><path d="M6 17l5-5-5-5"/></svg>
              </button>

              <span className="ps-vp-time">{formatTime(currentTime)} / {formatTime(duration)}</span>

              <span className="ps-vp-spacer" />

              <button type="button" className="ps-vp-btn" onClick={toggleMute} aria-label={isMuted ? 'Unmute' : 'Mute'}>
                {isMuted ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
                )}
              </button>

              <button type="button" className="ps-vp-btn" onClick={toggleFullscreen} aria-label="Fullscreen">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9V3h6"/><path d="M21 9V3h-6"/><path d="M3 15v6h6"/><path d="M21 15v6h-6"/></svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
