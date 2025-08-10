export default defineNuxtPlugin((nuxtApp) => {
  if (!process.client) return

  nuxtApp.vueApp.directive('tilt', {
    mounted(el: HTMLElement, binding) {
      const maxTilt = typeof binding.value === 'number' ? binding.value : 8
      let requestId: number | null = null
      let currentX = 0
      let currentY = 0

      el.style.transformStyle = 'preserve-3d'
      el.style.willChange = 'transform'

      const onMouseMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect()
        const relX = (e.clientX - rect.left) / rect.width
        const relY = (e.clientY - rect.top) / rect.height
        const tiltX = (0.5 - relY) * maxTilt
        const tiltY = (relX - 0.5) * maxTilt
        currentX = tiltX
        currentY = tiltY
        // cursor-follow glow variables used by CSS gradients
        el.style.setProperty('--mx', `${Math.round(relX * 100)}%`)
        el.style.setProperty('--my', `${Math.round(relY * 100)}%`)
        if (requestId == null) requestId = requestAnimationFrame(apply)
      }

      const onMouseLeave = () => {
        currentX = 0
        currentY = 0
        el.style.setProperty('--mx', `50%`)
        el.style.setProperty('--my', `0%`)
        if (requestId == null) requestId = requestAnimationFrame(apply)
      }

      const apply = () => {
        requestId = null
        el.style.transform = `rotateX(${currentX}deg) rotateY(${currentY}deg)`
      }

      el.addEventListener('mousemove', onMouseMove)
      el.addEventListener('mouseleave', onMouseLeave)

      ;(el as any).__tiltCleanup__ = () => {
        el.removeEventListener('mousemove', onMouseMove)
        el.removeEventListener('mouseleave', onMouseLeave)
      }
    },
    unmounted(el: HTMLElement) {
      (el as any).__tiltCleanup__?.()
    }
  })
})

