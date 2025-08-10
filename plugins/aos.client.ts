import AOS from 'aos'
import 'aos/dist/aos.css'

export default defineNuxtPlugin(() => {
  if (process.client) {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 40
    })

    // Refresh on route changes to keep animations consistent
    const nuxtApp = useNuxtApp()
    nuxtApp.hook('page:finish', () => {
      // Small timeout lets DOM settle before recalculating
      setTimeout(() => AOS.refreshHard(), 50)
    })
  }
})

