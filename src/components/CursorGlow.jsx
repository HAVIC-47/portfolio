import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const ref = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const el = ref.current

    function onMove(e) {
      el.style.left = e.clientX + 'px'
      el.style.top = e.clientY + 'px'
      el.style.opacity = '1'
    }

    function onLeave() {
      el.style.opacity = '0'
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div ref={ref} style={{
      position: 'fixed', width: 300, height: 300, borderRadius: '50%',
      background: 'radial-gradient(circle, var(--accent-glow), transparent 70%)',
      pointerEvents: 'none', zIndex: 0, transform: 'translate(-50%, -50%)',
      transition: 'opacity 0.3s', opacity: 0
    }} />
  )
}
