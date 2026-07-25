import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

/*
  Cinematic hero — fullscreen looping video, cinematic Instrument Serif type,
  liquid-glass CTAs. Personalized for Faisal Hossain.
*/
const roles = [
  { label: 'Full-Stack Developer', icon: 'ri-code-s-slash-line' },
  { label: 'Problem Solver', icon: 'ri-lightbulb-flash-line' },
  { label: 'UI / UX Designer', icon: 'ri-palette-line' },
  { label: 'AI / ML Engineer', icon: 'ri-brain-line' },
]

export default function HeroCinematic() {
  const [roleIdx, setRoleIdx] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setRoleIdx((i) => (i + 1) % roles.length), 2600)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="home" className="cine-hero">
      {/* Fullscreen looping background video */}
      <video
        className="cine-video"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
      />

      <div className="cine-inner">
        <h1
          className="cine-h1 animate-fade-rise"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Faisal Hossain
        </h1>

        <div className="cine-role animate-fade-rise-delay" aria-live="polite">
          <span className="cine-role-pre">I&apos;m a</span>
          <span className="cine-role-rot">
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIdx}
                className="cine-role-chip"
                initial={{ y: 14, opacity: 0, filter: 'blur(6px)' }}
                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                exit={{ y: -14, opacity: 0, filter: 'blur(6px)' }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              >
                <i className={roles[roleIdx].icon} />
                <span>{roles[roleIdx].label}</span>
              </motion.span>
            </AnimatePresence>
          </span>
        </div>

        <p className="cine-sub animate-fade-rise-delay-2">
          A full-stack developer turning curious ideas into AI tools, clean web apps, and delightful interfaces.
        </p>

        <div className="cine-ctas animate-fade-rise-delay-3">
          <a href="#projects" className="liquid-glass cine-btn">View my work</a>
          <a
            href="/Faisal_Hossain_CV_v2.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass cine-btn"
          >
            Resume
          </a>
        </div>

        <div className="cine-meta animate-fade-rise-delay-4">
          <span className="cine-meta-item"><i className="ri-map-pin-2-line" /> Dhaka, BD</span>
          <span className="cine-dot" aria-hidden="true" />
          <a className="cine-meta-item cine-mail" href="mailto:faisaladobe666@gmail.com">
            <i className="ri-mail-line" /> faisaladobe666@gmail.com
          </a>
        </div>

        <div className="cine-socials animate-fade-rise-delay-4">
          <a href="https://github.com/HAVIC-47" target="_blank" rel="noopener noreferrer" className="liquid-glass cine-social" aria-label="GitHub"><i className="ri-github-fill" /></a>
          <a href="https://www.facebook.com/HAVIC47" target="_blank" rel="noopener noreferrer" className="liquid-glass cine-social" aria-label="Facebook"><i className="ri-facebook-fill" /></a>
          <a href="https://www.instagram.com/havic._._/" target="_blank" rel="noopener noreferrer" className="liquid-glass cine-social" aria-label="Instagram"><i className="ri-instagram-line" /></a>
          <a href="https://www.linkedin.com/in/faisal-hossain-havic47/" target="_blank" rel="noopener noreferrer" className="liquid-glass cine-social" aria-label="LinkedIn"><i className="ri-linkedin-fill" /></a>
          <a href="https://discord.gg/pgakM24PEs" target="_blank" rel="noopener noreferrer" className="liquid-glass cine-social" aria-label="Discord"><i className="ri-discord-fill" /></a>
        </div>
      </div>

      <style>{`
        .cine-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 8rem 1.5rem 10rem;
          overflow: hidden;
          background: hsl(201 100% 13%);
          isolation: isolate;
        }
        .cine-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
          pointer-events: none;
        }
        .cine-inner {
          position: relative;
          z-index: 1;
          max-width: 80rem;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .cine-h1 {
          font-weight: 400;
          line-height: 0.95;
          letter-spacing: -0.03em;
          font-size: clamp(2.75rem, 7vw, 6rem);
          max-width: 20ch;
          margin: 0;
          background: linear-gradient(180deg, #fff5e6 0%, #f4cf8f 48%, #d99a3f 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 2px 26px rgba(0,0,0,0.5)) drop-shadow(0 1px 2px rgba(0,0,0,0.4));
        }
        .cine-em {
          font-style: normal;
          color: hsl(240 4% 74%);
        }
        /* Rotating role */
        .cine-role {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 1rem;
          font-family: 'Inter', var(--font-body, sans-serif);
          font-size: clamp(0.9rem, 1.4vw, 1.05rem);
          color: hsl(240 5% 78%);
          text-shadow: 0 1px 12px rgba(0,0,0,0.5);
        }
        .cine-role-pre { opacity: 0.8; }
        .cine-role-rot {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          height: 1.7em;
          overflow: hidden;
        }
        .cine-role-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          white-space: nowrap;
          color: #f4cf8f;
          font-weight: 600;
        }
        .cine-role-chip i { color: #e9b877; font-size: 1.05em; }
        .cine-sub {
          font-family: 'Inter', var(--font-body, sans-serif);
          color: hsl(240 5% 80%);
          font-size: clamp(1rem, 1.3vw, 1.15rem);
          line-height: 1.7;
          max-width: 42rem;
          margin-top: 2rem;
          text-shadow: 0 1px 14px rgba(0,0,0,0.55);
        }
        .cine-ctas {
          display: flex;
          gap: 1rem;
          margin-top: 3rem;
          flex-wrap: wrap;
          justify-content: center;
        }
        .cine-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-family: 'Inter', var(--font-body, sans-serif);
          font-size: 1rem;
          font-weight: 500;
          padding: 0.95rem 2.4rem;
          border-radius: 999px;
          cursor: pointer;
          text-decoration: none;
          transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .cine-btn:hover { transform: scale(1.03); }
        .cine-btn:active { transform: scale(0.99); }

        /* Location + email */
        .cine-meta {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 0.65rem 0.9rem;
          margin-top: 2.25rem;
          font-family: 'Inter', var(--font-body, sans-serif);
          font-size: 0.85rem;
          color: hsl(240 5% 80%);
          text-shadow: 0 1px 10px rgba(0,0,0,0.55);
        }
        .cine-meta-item {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          color: inherit;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .cine-meta-item i { color: #e9b877; opacity: 0.95; font-size: 0.95rem; }
        .cine-mail:hover { color: #f4cf8f; }
        .cine-dot {
          width: 3px; height: 3px;
          border-radius: 50%;
          background: currentColor;
          opacity: 0.45;
        }

        /* Socials */
        .cine-socials {
          display: flex;
          gap: 0.6rem;
          justify-content: center;
          margin-top: 1.35rem;
        }
        .cine-social {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border-radius: 999px;
          color: #ffffff;
          font-size: 1.1rem;
          text-decoration: none;
          transition: transform 0.22s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .cine-social:hover { transform: translateY(-3px) scale(1.06); color: #f4cf8f; }
        .cine-social:active { transform: translateY(0) scale(0.98); }
        /* Gold glass ring for socials (overrides the white liquid-glass border/reflection) */
        .cine-socials .cine-social {
          box-shadow: inset 0 1px 1px rgba(244, 207, 143, 0.28);
        }
        .cine-socials .cine-social::before {
          background: linear-gradient(180deg,
            rgba(244,207,143,0.8) 0%, rgba(233,184,119,0.32) 20%,
            rgba(233,184,119,0) 40%, rgba(233,184,119,0) 60%,
            rgba(233,184,119,0.32) 80%, rgba(244,207,143,0.8) 100%);
        }

        /* Liquid glass */
        .liquid-glass {
          background: rgba(255, 255, 255, 0.01);
          background-blend-mode: luminosity;
          -webkit-backdrop-filter: blur(4px);
          backdrop-filter: blur(4px);
          border: none;
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
        }
        .liquid-glass::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1.4px;
          background: linear-gradient(180deg,
            rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 20%,
            rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%,
            rgba(255,255,255,0.15) 80%, rgba(255,255,255,0.45) 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        /* Fade-rise reveal */
        @keyframes fade-rise {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-rise { animation: fade-rise 0.8s ease-out both; }
        .animate-fade-rise-delay { animation: fade-rise 0.8s ease-out 0.2s both; }
        .animate-fade-rise-delay-2 { animation: fade-rise 0.8s ease-out 0.4s both; }
        .animate-fade-rise-delay-3 { animation: fade-rise 0.8s ease-out 0.6s both; }
        .animate-fade-rise-delay-4 { animation: fade-rise 0.8s ease-out 0.8s both; }

        @media (prefers-reduced-motion: reduce) {
          .animate-fade-rise,
          .animate-fade-rise-delay,
          .animate-fade-rise-delay-2,
          .animate-fade-rise-delay-3,
          .animate-fade-rise-delay-4 { animation: none; }
          .cine-btn:hover, .cine-btn:active,
          .cine-social:hover, .cine-social:active { transform: none; }
        }
        @media (max-width: 640px) {
          .cine-hero { padding: 5.5rem 1.25rem 4.5rem; min-height: 100svh; }
          .cine-h1 { font-size: clamp(2.2rem, 11vw, 3.3rem); max-width: 100%; }
          .cine-sub { font-size: 0.95rem; line-height: 1.6; margin-top: 1.4rem; }
          .cine-ctas { margin-top: 2rem; width: 100%; }
          .cine-btn { flex: 1 1 auto; padding: 0.85rem 1.5rem; }
          .cine-meta { font-size: 0.8rem; gap: 0.4rem 0.7rem; margin-top: 1.8rem; }
          .cine-social { width: 40px; height: 40px; font-size: 1rem; }
          .cine-socials { margin-top: 1.1rem; flex-wrap: wrap; }
        }
      `}</style>
    </section>
  )
}
