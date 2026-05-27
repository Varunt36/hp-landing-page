import { useEffect, useRef } from 'react'
import { Box } from '@mui/material'

type RGB = [number, number, number]

interface Particle {
  x: number; y: number
  baseX: number; baseY: number
  vx: number; vy: number
  radius: number
  color: RGB
  baseAlpha: number
  alpha: number
  twinkleSpeed: number
  twinklePhase: number
}

// Matches theme: lavender200 #D4C3EA, lavender300 #B89DD2, purple600 #7c669b, gold300 #C8A86A
const PALETTE: { rgb: RGB; weight: number }[] = [
  { rgb: [212, 195, 234], weight: 38 }, // lavender200 — most common
  { rgb: [184, 157, 210], weight: 32 }, // lavender300
  { rgb: [124, 102, 155], weight: 22 }, // purple600
  { rgb: [200, 168, 106], weight:  8 }, // gold300 — rare sparkle
]

function pickColor(): RGB {
  let r = Math.random() * PALETTE.reduce((s, c) => s + c.weight, 0)
  for (const c of PALETTE) { r -= c.weight; if (r <= 0) return c.rgb }
  return PALETTE[0].rgb
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse     = useRef({ x: -9999, y: -9999 })
  const particles = useRef<Particle[]>([])
  const raf       = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const init = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      const count = Math.floor((canvas.width * canvas.height) / 8500)
      particles.current = Array.from({ length: count }, () => {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const baseAlpha = Math.random() * 0.28 + 0.07
        return {
          x, y, baseX: x, baseY: y,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
          radius: Math.random() < 0.15
            ? Math.random() * 2.0 + 3.0  // occasional larger dot  (3.0–5.0px)
            : Math.random() * 1.5 + 1.2, // most are small         (1.2–2.7px)
          color: pickColor(),
          baseAlpha,
          alpha: baseAlpha,
          twinkleSpeed: Math.random() * 0.006 + 0.002,
          twinklePhase: Math.random() * Math.PI * 2,
        }
      })
    }

    const draw = (t: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const { x: mx, y: my } = mouse.current

      for (const p of particles.current) {
        // gentle twinkle
        p.alpha = p.baseAlpha + Math.sin(t * p.twinkleSpeed + p.twinklePhase) * 0.05

        // repel from cursor
        const dx = mx - p.x
        const dy = my - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 110 && dist > 0) {
          const f = ((110 - dist) / 110) * 1.1
          p.vx -= (dx / dist) * f
          p.vy -= (dy / dist) * f
        }

        // spring back to base position
        p.vx += (p.baseX - p.x) * 0.011
        p.vy += (p.baseY - p.y) * 0.011
        // smooth damping
        p.vx *= 0.91
        p.vy *= 0.91

        p.x += p.vx
        p.y += p.vy

        const [r, g, b] = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r},${g},${b},${Math.max(0, Math.min(1, p.alpha))})`
        ctx.fill()
      }

      raf.current = requestAnimationFrame(draw)
    }

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 } }

    const ro = new ResizeObserver(init)
    ro.observe(canvas)
    init()
    raf.current = requestAnimationFrame(draw)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(raf.current)
      ro.disconnect()
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <Box
      component="canvas"
      ref={canvasRef}
      sx={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  )
}
