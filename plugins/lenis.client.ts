import Lenis from 'lenis'

export default defineNuxtPlugin(() => {
  if (!process.client) return
  
  // Disable smooth scrolling on mobile for better performance
  const isMobile = window.innerWidth < 768
  if (isMobile) return

  const lenis = new Lenis({
    duration: 0.8, // Reduced from 1.1 for snappier feel
    smoothWheel: true,
    smoothTouch: false,
    lerp: 0.1, // Smoother interpolation
    infinite: false
  })

  let frameCount = 0
  function raf(time: number) {
    lenis.raf(time)
    
    // Only update CSS variable every 3rd frame to reduce repaints
    frameCount++
    if (frameCount % 3 === 0) {
      const velocity = (lenis as any).velocity ?? 0
      // Only update if velocity changed significantly
      if (Math.abs(velocity) > 0.001) {
        document.documentElement.style.setProperty('--velocity', String(velocity))
      }
    }
    
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)
})

