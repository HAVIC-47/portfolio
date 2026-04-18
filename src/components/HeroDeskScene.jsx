import { Suspense, useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber'
import { OrbitControls, Environment, useGLTF, Center, ContactShadows } from '@react-three/drei'
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js'
import * as THREE from 'three'

const MODEL_URL = '/models/gaming_desktop_pc.glb'
const SCREEN_TEXTURE_URL = '/models/MY_SCREEN_2.png'

/* ═══════════════════════════════════════════
   Off-axis camera frustum: shifts the rendered
   image so world origin sits at ~85% from left,
   putting the model clearly on the right side.
   ═══════════════════════════════════════════ */
function ViewShift({ factor = 1.7 }) {
  const camera = useThree((s) => s.camera)
  const width = useThree((s) => s.size.width)
  const height = useThree((s) => s.size.height)
  useEffect(() => {
    camera.setViewOffset(width * factor, height, 0, 0, width, height)
    camera.updateProjectionMatrix()
    return () => {
      camera.clearViewOffset()
      camera.updateProjectionMatrix()
    }
  }, [camera, width, height, factor])
  return null
}

/* ═══════════════════════════════════════════
   Gaming Desktop PC model (GLB)
   ═══════════════════════════════════════════ */
function GamingDesktop({ scale = 0.25 }) {
  const gl = useThree((s) => s.gl)
  const ktx2Loader = useMemo(
    () => new KTX2Loader().setTranscoderPath('/basis/').detectSupport(gl),
    [gl]
  )
  const { scene } = useGLTF(
    MODEL_URL,
    '/draco/',
    false,
    (loader) => loader.setKTX2Loader(ktx2Loader)
  )
  const screenTex = useLoader(THREE.TextureLoader, SCREEN_TEXTURE_URL)
  const cloned = useMemo(() => scene.clone(true), [scene])

  useEffect(() => {
    if (!cloned || !screenTex) return
    const maxAniso = gl.capabilities.getMaxAnisotropy?.() || 16
    const colorKeys = ['map', 'emissiveMap']
    const allKeys = ['map', 'emissiveMap', 'normalMap', 'roughnessMap', 'metalnessMap', 'aoMap', 'bumpMap', 'alphaMap']

    cloned.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
        child.frustumCulled = false
        const matName = (Array.isArray(child.material) ? child.material[0] : child.material)?.name || ''
        const isScreenMesh = /screen/i.test(child.name) || /screen/i.test(matName)
        if (isScreenMesh) {
          const original = Array.isArray(child.material) ? child.material[0] : child.material
          const screenMat = original.clone()
          const prev = original.map || original.emissiveMap
          const next = screenTex.clone()
          next.colorSpace = THREE.SRGBColorSpace
          next.flipY = true
          next.wrapS = prev ? prev.wrapS : THREE.ClampToEdgeWrapping
          next.wrapT = prev ? prev.wrapT : THREE.ClampToEdgeWrapping
          next.repeat.copy(prev ? prev.repeat : new THREE.Vector2(1, 1))
          next.offset.copy(prev ? prev.offset : new THREE.Vector2(0, 0))
          next.center.copy(prev ? prev.center : new THREE.Vector2(0, 0))
          next.rotation = prev ? prev.rotation : 0
          next.channel = prev ? prev.channel : 0
          next.needsUpdate = true
          screenMat.map = next
          if (original.emissiveMap) screenMat.emissiveMap = next
          screenMat.emissive = new THREE.Color(0xffffff)
          screenMat.emissiveIntensity = Math.max(original.emissiveIntensity || 0, 1.6)
          screenMat.needsUpdate = true
          child.material = screenMat
        }
        const mats = Array.isArray(child.material) ? child.material : [child.material]
        mats.forEach((m) => {
          if (!m) return
          allKeys.forEach((k) => {
            const t = m[k]
            if (!t) return
            if (colorKeys.includes(k)) t.colorSpace = THREE.SRGBColorSpace
            t.anisotropy = maxAniso
            t.minFilter = THREE.LinearMipmapLinearFilter
            t.magFilter = THREE.LinearFilter
            t.generateMipmaps = true
            t.needsUpdate = true
          })
          if (typeof m.roughness === 'number') m.roughness = Math.min(m.roughness, 0.9)
          m.envMapIntensity = 1.2
          if (m.emissiveMap) {
            m.emissiveIntensity = Math.max(m.emissiveIntensity || 0, 1.6)
          }
          m.needsUpdate = true
        })
      }
    })
  }, [cloned, gl, screenTex])

  return (
    <Center disableY>
      <primitive object={cloned} scale={scale} />
    </Center>
  )
}

/* ═══════════════════════════════════════════
   Loading fallback — subtle accent pulse
   ═══════════════════════════════════════════ */
function Fallback() {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.elapsedTime * 0.35
      const p = 0.4 + Math.sin(clock.elapsedTime * 2) * 0.15
      ref.current.children.forEach((c) => { if (c.material) c.material.opacity = p })
    }
  })
  return (
    <group ref={ref}>
      {/* Case silhouette — tall box */}
      <mesh>
        <boxGeometry args={[0.28, 0.48, 0.32]} />
        <meshBasicMaterial color="#c9a87c" transparent opacity={0.35} wireframe />
      </mesh>
      {/* Desk plane hint */}
      <mesh position={[0, -0.26, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.35, 0.55, 48]} />
        <meshBasicMaterial color="#c9a87c" transparent opacity={0.25} />
      </mesh>
    </group>
  )
}

/* ═══════════════════════════════════════════
   Scene composition
   ═══════════════════════════════════════════ */
function Scene() {
  return (
    <>
      {/* Cinematic lighting */}
      <ambientLight intensity={0.25} />

      <directionalLight
        position={[4, 6, 5]}
        intensity={1.3}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={20}
        shadow-camera-left={-4}
        shadow-camera-right={4}
        shadow-camera-top={4}
        shadow-camera-bottom={-4}
        shadow-bias={-0.0008}
      />

      {/* Warm accent */}
      <pointLight position={[-3, 2, 2]} intensity={0.6} color="#c9a87c" distance={8} decay={2} />

      {/* Cool rim */}
      <pointLight position={[3, 3, -3]} intensity={0.5} color="#7b61ff" distance={8} decay={2} />

      {/* Under fill (RGB glow feel) */}
      <pointLight position={[0, -1, 2]} intensity={0.4} color="#ec4899" distance={5} decay={2} />

      <Environment preset="night" environmentIntensity={0.55} />

      <ViewShift factor={1.4} />

      <Suspense fallback={<Fallback />}>
        <GamingDesktop />
      </Suspense>

      <ContactShadows
        position={[0, -0.4, 0]}
        opacity={0.55}
        scale={2.2}
        blur={2.4}
        far={1.1}
        color="#000000"
      />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.05}
        autoRotate={false}
        dampingFactor={0.08}
        enableDamping
        target={[0, 0, 0]}
      />
    </>
  )
}

/* ═══════════════════════════════════════════
   Exported Canvas — borderless, containerless
   ═══════════════════════════════════════════ */
export default function HeroDeskScene() {
  return (
    <div className="hero-desk-scene">
      <Canvas
        shadows={{ type: THREE.PCFSoftShadowMap }}
        camera={{ position: [4.8, 3.0, 6.2], fov: 28 }}
        dpr={[1, 2.5]}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.25,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>

      <style>{`
        /* Fills its parent fully — parent (.hd-scene) is the full hero section. */
        .hero-desk-scene {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: visible;
          background: transparent;
          border: none;
          pointer-events: auto;
        }
        .hero-desk-scene canvas {
          cursor: grab;
          background: transparent !important;
          width: 100% !important;
          height: 100% !important;
        }
        .hero-desk-scene canvas:active { cursor: grabbing; }
      `}</style>
    </div>
  )
}

// Preload is driven by <link rel="preload"> in index.html.
// Can't call useGLTF.preload here without the KTX2Loader (needs gl context),
// and calling it with only Draco poisons the useLoader cache with a decode error.
