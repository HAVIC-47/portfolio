// Generates all raster icons + the OG card from public/favicon.svg.
// Run once: `node scripts/build-icons.mjs`
import sharp from 'sharp'
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '..')
const pub = (p) => resolve(root, 'public', p)

const ACCENT = '#c9a87c'
const ACCENT_DARK = '#b78a4a'
const BG_TOP = '#15131a'
const BG_BOT = '#0a0a0e'
const TEXT_PRIMARY = '#f0e9da'
const TEXT_MUTED = '#8a8275'

const monogram = await readFile(pub('favicon.svg'))

async function rasterize(size, out) {
  await sharp(monogram, { density: Math.max(72, Math.round(size * 4))})
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(pub(out))
  console.log('  ✓', out, `(${size}×${size})`)
}

// 1) PWA + iOS icons
await rasterize(180, 'apple-touch-icon.png')
await rasterize(192, 'favicon-192.png')
await rasterize(512, 'favicon-512.png')
await rasterize(32,  'favicon-32.png')

// 2) Open Graph card (1200x630)
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${BG_TOP}"/>
      <stop offset="100%" stop-color="${BG_BOT}"/>
    </linearGradient>
    <radialGradient id="glow" cx="78%" cy="38%" r="52%">
      <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0.22"/>
      <stop offset="60%" stop-color="${ACCENT}" stop-opacity="0.06"/>
      <stop offset="100%" stop-color="${ACCENT}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="mono" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f0d8a8"/>
      <stop offset="100%" stop-color="${ACCENT_DARK}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <g opacity="0.22" stroke="${ACCENT}" stroke-width="1" fill="none">
    <line x1="0" y1="120" x2="1200" y2="120"/>
    <line x1="0" y1="510" x2="1200" y2="510"/>
    <line x1="120" y1="0" x2="120" y2="630"/>
    <line x1="1080" y1="0" x2="1080" y2="630"/>
  </g>
  <g transform="translate(120 110)" font-family="'Outfit','Inter',system-ui,sans-serif" fill="${TEXT_PRIMARY}">
    <text font-size="22" letter-spacing="6" fill="${ACCENT}" font-weight="500">PORTFOLIO &#8212; 2026</text>
    <text y="180" font-size="148" font-weight="700" letter-spacing="-5">Faisal <tspan fill="url(#mono)">Hossain.</tspan></text>
    <text y="270" font-size="40" font-weight="500" fill="${TEXT_PRIMARY}" opacity="0.9">Full-Stack Developer &#183; AI / ML &#183; UI / UX</text>
    <text y="330" font-size="26" font-weight="400" fill="${TEXT_MUTED}">Building web apps, AI tools and 3D experiences from Dhaka.</text>
  </g>
  <g transform="translate(960 380)">
    <rect x="-120" y="-120" width="240" height="240" rx="40" fill="#1a1620" stroke="${ACCENT}" stroke-opacity="0.5" stroke-width="2"/>
    <text x="0" y="40" font-family="'Outfit','Inter',sans-serif" font-size="160" font-weight="700"
          fill="url(#mono)" text-anchor="middle" letter-spacing="-6">FH</text>
  </g>
  <g transform="translate(120 560)" font-family="'JetBrains Mono','Menlo',monospace" font-size="22" fill="${TEXT_MUTED}">
    <text>faisal-solo.vercel.app</text>
    <text x="1080" text-anchor="end">github.com/HAVIC-47</text>
  </g>
</svg>`
await writeFile(pub('og-image.svg'), ogSvg, 'utf8')
await sharp(Buffer.from(ogSvg))
  .resize(1200, 630)
  .png({ compressionLevel: 9 })
  .toFile(pub('og-image.png'))
console.log('  ✓ og-image.png (1200×630)')

console.log('\nDone. All icons regenerated under public/.')
