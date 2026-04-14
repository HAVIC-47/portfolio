import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const size = isMobile ? 46 : 52
  const bottom = isMobile
    ? 16 + 50 + 10 /* chatbot size + gap */
    : 24 + 56 + 12
  const right = isMobile ? 16 : 24

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={handleClick}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 320, damping: 26 }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.94 }}
          style={{
            position: 'fixed',
            bottom,
            right,
            zIndex: 1100,
            width: size,
            height: size,
            borderRadius: '50%',
            background: 'var(--bg-card)',
            color: 'var(--accent)',
            border: '1px solid var(--border)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: isMobile ? '1.1rem' : '1.25rem',
            boxShadow: '0 10px 28px -12px rgba(0,0,0,0.55), 0 0 0 1px var(--accent-glow)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          <i className="ri-arrow-up-line" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
