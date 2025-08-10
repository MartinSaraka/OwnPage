import Lenis from 'lenis'

export default defineNuxtPlugin(() => {
  if (!process.client) return

  const lenis = new Lenis({
    duration: 1.1,
    smoothWheel: true,
    smoothTouch: false
  })

  function raf(time: number) {
    lenis.raf(time)
    // expose velocity for subtle parallax in other components
    const velocity = (lenis as any).velocity ?? 0
    document.documentElement.style.setProperty('--velocity', String(velocity))
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)
})

