import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

// Desktop path — evenly spaced waypoints (~0.10–0.12 apart) with moderate,
// consistent travel distances so the spline holds a steady, graceful speed.
const DESKTOP_WAYPOINTS = [
  { t: 0.00, pos: [1.6, 0.8, 0] },      // start: upper right
  { t: 0.10, pos: [1.2, -1.4, -0.2] },  // dip down on the right
  { t: 0.22, pos: [-1.4, 1.4, -0.5] },  // sweep up to the left
  { t: 0.34, pos: [-2.8, 0.3, -0.6] },  // out along the left edge
  { t: 0.46, pos: [-1.3, -1.0, -0.3] }, // curve down-left
  { t: 0.58, pos: [1.3, 0.1, 0] },      // glide across to the right
  { t: 0.70, pos: [2.6, 1.1, -0.5] },   // rise on the right
  { t: 0.80, pos: [0.3, 1.2, -0.4] },   // drift back to top-center
  { t: 0.90, pos: [-2.2, -0.2, -0.2] }, // sweep down to the left
  { t: 1.0, pos: [-4, -2.8, 0.0] }, // settle: lower left
  
]


// Mobile path — narrower x range to stay in a portrait viewport, same even
// spacing so it never bunches up at the bottom.
const MOBILE_WAYPOINTS = [
  { t: 0.00, pos: [1.2, -2.0, 0] },
  { t: 0.12, pos: [1.0, -1.0, 0] },
  { t: 0.26, pos: [-1.2, 1.2, -0.4] },
  { t: 0.40, pos: [-1.6, 0.0, -0.5] },
  { t: 0.54, pos: [1.2, 0.4, -0.2] },
  { t: 0.68, pos: [1.4, -0.8, -0.3] },
  { t: 0.82, pos: [-1.2, -0.6, -0.3] },
  { t: 0.94, pos: [0.6, -1.4, -0.2] },
  { t: 1.00, pos: [1.2, -2.0, 0.1] },
]

// Samples a Catmull-Rom spline through the waypoints, writing the position into
// `posOut` and the (un-normalized) path tangent into `tanOut`. Using a spline
// instead of per-segment smoothstep keeps velocity continuous across waypoints,
// so the butterfly glides through them instead of braking at each one. The
// analytic tangent gives a clean heading with no frame-to-frame jitter.
function samplePath(progress, waypoints, posOut, tanOut) {
  const t = Math.max(0, Math.min(1, progress))
  const last = waypoints.length - 1

  let i = 0
  for (let j = 0; j < last; j++) {
    if (t >= waypoints[j].t && t <= waypoints[j + 1].t) {
      i = j
      break
    }
  }

  // Four control points around the active segment (clamped at the ends).
  const p0 = waypoints[Math.max(0, i - 1)].pos
  const p1 = waypoints[i].pos
  const p2 = waypoints[i + 1].pos
  const p3 = waypoints[Math.min(last, i + 2)].pos

  const span = waypoints[i + 1].t - waypoints[i].t
  const s = span > 0 ? (t - waypoints[i].t) / span : 0
  const s2 = s * s
  const s3 = s2 * s

  for (let a = 0; a < 3; a++) {
    const a0 = p0[a], a1 = p1[a], a2 = p2[a], a3 = p3[a]
    // Catmull-Rom basis
    posOut.setComponent(
      a,
      0.5 * (2 * a1 +
        (-a0 + a2) * s +
        (2 * a0 - 5 * a1 + 4 * a2 - a3) * s2 +
        (-a0 + 3 * a1 - 3 * a2 + a3) * s3)
    )
    // Derivative w.r.t. s → direction of travel along the path
    tanOut.setComponent(
      a,
      0.5 * ((-a0 + a2) +
        2 * (2 * a0 - 5 * a1 + 4 * a2 - a3) * s +
        3 * (-a0 + 3 * a1 - 3 * a2 + a3) * s2)
    )
  }
}

// Reusable vectors — avoid garbage collection
const _targetVec = new THREE.Vector3()
const _tanVec = new THREE.Vector3()

function Butterfly({ scrollRef, isMobile }) {
  const group = useRef()
  const { scene, animations } = useGLTF('/models/butterfly.glb')
  const { actions, mixer } = useAnimations(animations, group)
  const prevAnim = useRef('')
  const waypoints = isMobile ? MOBILE_WAYPOINTS : DESKTOP_WAYPOINTS
  const currentPos = useRef(new THREE.Vector3(...waypoints[0].pos))
  const prevProgress = useRef(0)
  const scrollVelocity = useRef(0)
  const headingSign = useRef(1)
  const prevFramePos = useRef(new THREE.Vector3(...waypoints[0].pos))

  useEffect(() => {
    if (group.current) group.current.position.set(...waypoints[0].pos)
    currentPos.current.set(...waypoints[0].pos)
    prevFramePos.current.set(...waypoints[0].pos)
  }, [isMobile])

  useEffect(() => {
    if (actions?.Idle) {
      actions.Idle.reset().setLoop(THREE.LoopRepeat).play()
      prevAnim.current = 'Idle'
    }
  }, [actions])

  useFrame((_, delta) => {
    if (!group.current) return

    const scrollProgress = scrollRef.current.progress
    const isScrolling = scrollRef.current.scrolling

    // Animation switching
    const isAtRest = scrollProgress <= 0.02 || scrollProgress >= 0.98
    const desired = (isAtRest && !isScrolling) ? 'Idle' : 'Flying'
    if (desired !== prevAnim.current && actions?.[desired]) {
      const next = actions[desired]
      const prev = actions[prevAnim.current]
      next.reset().setLoop(THREE.LoopRepeat).setEffectiveWeight(1).play()
      if (prev) prev.crossFadeTo(next, 0.5, true)
      prevAnim.current = desired
    }

    // Sample the spline for both target position and path tangent (heading).
    samplePath(scrollProgress, waypoints, _targetVec, _tanVec)

    // Frame-rate-independent smoothing: alpha = 1 - e^(-k·dt).
    // Light smoothing absorbs the discrete scroll steps without adding lag.
    const posAlpha = 1 - Math.exp(-9 * delta)
    currentPos.current.lerp(_targetVec, posAlpha)
    group.current.position.copy(currentPos.current)

    // Scroll momentum — drives the extra pitch "lean" while scrolling.
    const scrollDelta = scrollProgress - prevProgress.current
    if (isAtRest && !isScrolling) {
      scrollVelocity.current *= Math.exp(-6 * delta)
      if (Math.abs(scrollVelocity.current) < 0.01) scrollVelocity.current = 0
    } else {
      const velAlpha = 1 - Math.exp(-8 * delta)
      scrollVelocity.current += (scrollDelta * 80 - scrollVelocity.current) * velAlpha
    }
    const directionPitch = Math.max(-0.4, Math.min(0.4, scrollVelocity.current))

    // Heading sign — flip the tangent when scrolling back up the page so the
    // butterfly turns to face the way it's actually travelling. Hysteresis keeps
    // it from flickering when nearly still.
    if (scrollDelta > 0.0002) headingSign.current = 1
    else if (scrollDelta < -0.0002) headingSign.current = -1

    const tanLen = Math.hypot(_tanVec.x, _tanVec.y)

    if (!(isAtRest && !isScrolling) && tanLen > 0.0001) {
      // Direction of travel from the analytic tangent (no frame-delta noise).
      const ndx = (_tanVec.x / tanLen) * headingSign.current
      const ndy = (_tanVec.y / tanLen) * headingSign.current

      // Yaw — atan2(horizontal, |vertical|) keeps result in [-PI/2, PI/2]
      const targetYaw = Math.atan2(ndx, Math.abs(ndy) + 0.001)
      // Gentle bank into turns
      const targetRoll = -ndx * 0.4
      // Pitch from vertical direction + scroll momentum
      const targetPitch = ndy * 0.3 + directionPitch

      const rotAlpha = 1 - Math.exp(-6 * delta)
      group.current.rotation.y += (targetYaw - group.current.rotation.y) * rotAlpha
      group.current.rotation.z += (targetRoll - group.current.rotation.z) * rotAlpha
      group.current.rotation.x += (targetPitch - group.current.rotation.x) * rotAlpha
    } else {
      // At rest — gently return to idle pose (facing left, level)
      const restAlpha = 1 - Math.exp(-3 * delta)
      group.current.rotation.x += (0 - group.current.rotation.x) * restAlpha
      group.current.rotation.y += (-Math.PI / 2 - group.current.rotation.y) * restAlpha
      group.current.rotation.z += (0 - group.current.rotation.z) * restAlpha
    }

    prevFramePos.current.copy(currentPos.current)
    prevProgress.current = scrollProgress
    mixer.update(delta)
  })

  return (
    <group ref={group} scale={isMobile ? 0.5 : 1} position={waypoints[0].pos} dispose={null} rotation={[0, -Math.PI / 2, 0]}>
      <primitive object={scene} />
      <pointLight color="#dd8833" intensity={10} distance={5} decay={2} />
      <pointLight color="#4488ff" intensity={2} distance={5} decay={3} position={[0, 0.5, 0]} />
    </group>
  )
}

export default function ScrollButterfly() {
  // Use a single ref for scroll data — zero re-renders on scroll
  const scrollRef = useRef({ progress: 0, scrolling: false })
  const scrollTimeout = useRef(null)
  const [isMobile, setIsMobile] = useState(false)
  const [hideAway, setHideAway] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      scrollRef.current.progress = maxScroll > 0 ? Math.max(0, Math.min(1, window.scrollY / maxScroll)) : 0
      scrollRef.current.scrolling = true

      if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
      scrollTimeout.current = setTimeout(() => {
        scrollRef.current.scrolling = false
      }, 200)
    }

    let observer
    const stackEl = document.getElementById('stack')
    if (stackEl) {
      observer = new IntersectionObserver(
        ([entry]) => setHideAway(entry.isIntersecting),
        { threshold: 0.15 }
      )
      observer.observe(stackEl)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', checkMobile)
      if (observer && stackEl) observer.unobserve(stackEl)
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
    }
  }, [])

  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return null
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: hideAway ? 30 : 40,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        style={{ pointerEvents: 'none' }}
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={1}
        gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.setClearAlpha(0)
          gl.setClearColor(0x000000, 0)
        }}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <directionalLight position={[-5, -5, 5]} intensity={0.5} />
        <Butterfly scrollRef={scrollRef} isMobile={isMobile} />
      </Canvas>
    </div>
  )
}

useGLTF.preload('/models/butterfly.glb')
