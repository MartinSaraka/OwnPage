import AOS from 'aos'
import 'aos/dist/aos.css'

export default defineNuxtPlugin(() => {
  if (process.client) {
    // Detect mobile device
    const isMobile = window.innerWidth < 768
    
    AOS.init({
      duration: isMobile ? 200 : 500, // Faster animations on mobile
      easing: 'ease-out-cubic',
      once: true, // Run animations only once to reduce overhead
      offset: 60, // Trigger slightly earlier
      delay: 0,
      throttleDelay: isMobile ? 150 : 99, // More throttling on mobile
      debounceDelay: isMobile ? 100 : 50, // More debouncing on mobile
      disable: false, // Keep AOS enabled but with shorter duration on mobile
      startEvent: 'DOMContentLoaded',
      initClassName: 'aos-init',
      animatedClassName: 'aos-animate',
      useClassNames: false,
      disableMutationObserver: false,
      anchorPlacement: 'top-bottom',
      mirror: false // Don't animate elements out when scrolling past them
    })

    // Refresh on route changes to keep animations consistent
    const nuxtApp = useNuxtApp()
    nuxtApp.hook('page:finish', () => {
      // Small timeout lets DOM settle before recalculating
      setTimeout(() => AOS.refresh(), 50) // Use refresh instead of refreshHard for better performance
    })
  }
})

