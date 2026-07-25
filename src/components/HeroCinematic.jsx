/*
  Cinematic hero — fullscreen looping video, cinematic Instrument Serif type,
  liquid-glass CTAs. Personalized for Faisal Hossain.
*/
export default function HeroCinematic() {
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

        <p className="cine-sub animate-fade-rise-delay">
          A full-stack developer turning curious ideas into AI tools, clean web apps, and delightful interfaces.
        </p>

        <div className="cine-ctas animate-fade-rise-delay-2">
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

        <div className="cine-meta animate-fade-rise-delay-3">
          <span className="cine-meta-item"><i className="ri-map-pin-2-line" /> Dhaka, BD</span>
          <span className="cine-dot" aria-hidden="true" />
          <a className="cine-meta-item cine-mail" href="mailto:faisaladobe666@gmail.com">
            <i className="ri-mail-line" /> faisaladobe666@gmail.com
          </a>
        </div>

        <div className="cine-socials animate-fade-rise-delay-3">
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

        @media (prefers-reduced-motion: reduce) {
          .animate-fade-rise,
          .animate-fade-rise-delay,
          .animate-fade-rise-delay-2,
          .animate-fade-rise-delay-3 { animation: none; }
          .cine-btn:hover, .cine-btn:active,
          .cine-social:hover, .cine-social:active { transform: none; }
        }
        @media (max-width: 640px) {
          .cine-hero { padding: 6rem 1.25rem 7rem; }
          .cine-h1 { max-width: 100%; }
          .cine-btn { padding: 0.85rem 2rem; }
        }
      `}</style>
    </section>
  )
}
