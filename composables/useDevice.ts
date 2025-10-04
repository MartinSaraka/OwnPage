import { ref, onMounted, onBeforeUnmount } from 'vue'

export const useDevice = () => {
  const isMobile = ref(false)
  const isTablet = ref(false)
  const isDesktop = ref(true)

  const checkDevice = () => {
    if (process.client) {
      const width = window.innerWidth
      isMobile.value = width < 768
      isTablet.value = width >= 768 && width < 1024
      isDesktop.value = width >= 1024
    }
  }

  onMounted(() => {
    checkDevice()
    window.addEventListener('resize', checkDevice)
  })

  onBeforeUnmount(() => {
    if (process.client) {
      window.removeEventListener('resize', checkDevice)
    }
  })

  return {
    isMobile,
    isTablet,
    isDesktop
  }
}

