<template>
  <canvas v-if="!isMobile || enableOnMobile" ref="canvasEl" class="magnetic-canvas" @mousemove="onMouseMove" aria-hidden="true"></canvas>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, computed } from 'vue'

type MagneticParticle = {
  x: number
  y: number
  baseX: number
  baseY: number
  vx: number
  vy: number
  r: number
  hue: number
  alpha: number
  magneticForce: number
}

const { isMobile } = useDevice()
const enableOnMobile = ref(false) // Disable on mobile by default for performance

const canvasEl = ref<HTMLCanvasElement>()
let ctx: CanvasRenderingContext2D | null = null
let rafId = 0
let particles: MagneticParticle[] = []
let mouse = { x: 0, y: 0 }
let devicePixelRatio = 1
let isTabVisible = true
let isScrolling = false
let scrollTimeout: NodeJS.Timeout | null = null

// Performance settings based on device
const isMobileDevice = computed(() => isMobile.value)
const maxParticles = computed(() => isMobileDevice.value ? 20 : 60)
const drawConnections = computed(() => !isMobileDevice.value)

function resize() {
  if (!canvasEl.value) return
  const { innerWidth, innerHeight } = window
  // Reduce pixel ratio on mobile for better performance
  devicePixelRatio = isMobileDevice.value ? 1 : Math.min(2, window.devicePixelRatio || 1)
  canvasEl.value.width = innerWidth * devicePixelRatio
  canvasEl.value.height = innerHeight * devicePixelRatio
  canvasEl.value.style.width = `${innerWidth}px`
  canvasEl.value.style.height = `${innerHeight}px`
}

function createParticles() {
  if (!canvasEl.value) return
  const baseCount = Math.floor((window.innerWidth * window.innerHeight) / 25000)
  const count = Math.min(maxParticles.value, baseCount)
  particles = Array.from({ length: count }, () => {
    const x = Math.random() * canvasEl.value!.width
    const y = Math.random() * canvasEl.value!.height
    return {
      x,
      y,
      baseX: x,
      baseY: y,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: 1 + Math.random() * 3,
      hue: 240 + Math.random() * 80,
      alpha: 0.6 + Math.random() * 0.4,
      magneticForce: 0.002 + Math.random() * 0.003
    }
  })
}

function onMouseMove(e: MouseEvent) {
  const rect = canvasEl.value?.getBoundingClientRect()
  if (!rect) return
  mouse.x = (e.clientX - rect.left) * devicePixelRatio
  mouse.y = (e.clientY - rect.top) * devicePixelRatio
}

function step() {
  if (!ctx || !canvasEl.value || !isTabVisible) {
    rafId = requestAnimationFrame(step)
    return
  }
  const w = canvasEl.value.width
  const h = canvasEl.value.height
  
  // Reduce animation complexity during scroll for better performance
  const shouldSimplify = isScrolling
  
  ctx.clearRect(0, 0, w, h)
  ctx.save()
  ctx.scale(devicePixelRatio, devicePixelRatio)
  
  for (const p of particles) {
    // Magnetic attraction to mouse
    const dx = mouse.x - p.x
    const dy = mouse.y - p.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    const maxDistance = 150 * devicePixelRatio
    
    if (distance < maxDistance) {
      const force = (1 - distance / maxDistance) * p.magneticForce
      p.vx += dx * force
      p.vy += dy * force
    }
    
    // Return to base position
    const returnForce = 0.01
    p.vx += (p.baseX - p.x) * returnForce
    p.vy += (p.baseY - p.y) * returnForce
    
    // Apply velocity with damping
    p.vx *= 0.98
    p.vy *= 0.98
    p.x += p.vx
    p.y += p.vy
    
    // Boundaries
    if (p.x < 0 || p.x > w) p.vx *= -0.8
    if (p.y < 0 || p.y > h) p.vy *= -0.8
    
    // Draw particle with glow (simplified during scroll)
    if (shouldSimplify) {
      // Simple solid particle during scroll
      ctx.fillStyle = `hsla(${p.hue}, 85%, 75%, ${p.alpha * 0.8})`
    } else {
      // Full gradient when not scrolling
      const grd = ctx.createRadialGradient(p.x / devicePixelRatio, p.y / devicePixelRatio, 0, p.x / devicePixelRatio, p.y / devicePixelRatio, p.r * 4)
      grd.addColorStop(0, `hsla(${p.hue}, 85%, 75%, ${p.alpha})`)
      grd.addColorStop(0.5, `hsla(${p.hue}, 85%, 65%, ${p.alpha * 0.6})`)
      grd.addColorStop(1, `hsla(${p.hue}, 85%, 65%, 0)`)
      ctx.fillStyle = grd
    }
    ctx.beginPath()
    ctx.arc(p.x / devicePixelRatio, p.y / devicePixelRatio, p.r, 0, Math.PI * 2)
    ctx.fill()
    
    // Connection lines to nearby particles (skip on mobile and during scroll for performance)
    if (drawConnections.value && !shouldSimplify) {
      for (const other of particles) {
        if (other === p) continue
        const dx2 = other.x - p.x
        const dy2 = other.y - p.y
        const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2)
        if (dist2 < 100 * devicePixelRatio) {
          const alpha = (1 - dist2 / (100 * devicePixelRatio)) * 0.3
          ctx.strokeStyle = `hsla(${(p.hue + other.hue) / 2}, 70%, 70%, ${alpha})`
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.moveTo(p.x / devicePixelRatio, p.y / devicePixelRatio)
          ctx.lineTo(other.x / devicePixelRatio, other.y / devicePixelRatio)
          ctx.stroke()
        }
      }
    }
  }
  
  ctx.restore()
  rafId = requestAnimationFrame(step)
}

const handleResize = () => {
  resize()
  createParticles()
}

const handleVisibilityChange = () => {
  isTabVisible = !document.hidden
}

const handleScroll = () => {
  isScrolling = true
  if (scrollTimeout) clearTimeout(scrollTimeout)
  scrollTimeout = setTimeout(() => {
    isScrolling = false
  }, 150)
}

onMounted(() => {
  if (!canvasEl.value) return
  ctx = canvasEl.value.getContext('2d')
  resize()
  createParticles()
  window.addEventListener('resize', handleResize)
  window.addEventListener('scroll', handleScroll, { passive: true })
  document.addEventListener('visibilitychange', handleVisibilityChange)
  rafId = requestAnimationFrame(step)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(rafId)
  if (scrollTimeout) clearTimeout(scrollTimeout)
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('visibilitychange', handleVisibilityChange)
})
</script>

<style scoped>
.magnetic-canvas {
  position: fixed;
  inset: 0;
  z-index: -2;
  pointer-events: auto;
}
</style>
