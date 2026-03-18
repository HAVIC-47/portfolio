import { useRef } from 'react'

export default function TiltCard({ children, className = '' }) {
  const ref = useRef(null)
  const isFine = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches

  function onMove(e) {
    if (!isFine) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -3
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 3
    ref.current.style.transform = `translateY(-4px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  function onLeave() {
    ref.current.style.transform = ''
  }

  return (
    <div
      ref={ref}
      className={`card ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  )
}
