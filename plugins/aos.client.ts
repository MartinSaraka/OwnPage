import AOS from 'aos'
import 'aos/dist/aos.css'

export default defineNuxtPlugin(() => {
  if (process.client) {
    AOS.init({
      duration: 500, // Reduced from 700ms for snappier animations
      easing: 'ease-out-cubic',
      once: true, // Run animations only once to reduce overhead
      offset: 60, // Trigger slightly earlier
      delay: 0,
      throttleDelay: 99, // Throttle scroll events for better performance
      debounceDelay: 50, // Debounce window resize events
      disable: false,
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

