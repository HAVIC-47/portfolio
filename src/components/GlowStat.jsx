import { useEffect, useRef } from 'react'

/*
 * Pointer-tracked spotlight stat card. Uses the site's warm-tan accent
 * (hue ≈ 33) for the glow so it matches the theme in both modes.
 * Pattern adapted from the shadcn spotlight-card (plain JSX, no Tailwind).
 */
export default function GlowStat({ value, label }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const x = e.clientX - r.left
      const y = e.clientY - r.top
      el.style.setProperty('--gx', `${x}px`)
      el.style.setProperty('--gy', `${y}px`)
    }
    const onLeave = () => {
      el.style.setProperty('--gx', `50%`)
      el.style.setProperty('--gy', `50%`)
    }
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div ref={ref} className="glow-stat" data-glow>
      <div className="glow-stat-inner">
        <div className="stat-number">{value}</div>
        <div className="stat-label">{label}</div>
      </div>
    </div>
  )
}
