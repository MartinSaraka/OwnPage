<template>
  <div class="orbiting-rocket">
    <div class="rocket-container" :style="rocketStyle">
      <div class="rocket">🚀</div>
    </div>
    <div class="vapor-trail" :style="vaporStyle">
      <span v-for="n in 2" :key="n" class="vapor-dot" :style="{ animationDelay: (n * 0.1) + 's' }">💨</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const angle = ref(0)
const isVisible = ref(false)
let animationId = null

// Orbital properties
const orbitRadius = 60
const speed = 0.8 // degrees per frame (slower)

const rocketStyle = computed(() => {
  const radians = (angle.value * Math.PI) / 180
  const x = Math.cos(radians) * orbitRadius
  const y = Math.sin(radians) * orbitRadius
  
  return {
    transform: `translate(${x}px, ${y}px) rotate(${angle.value + 90}deg)`,
    opacity: isVisible.value ? 1 : 0
  }
})

const vaporStyle = computed(() => {
  // Calculate the exact position and angle for vapor trail
  const radians = (angle.value * Math.PI) / 180
  const x = Math.cos(radians) * orbitRadius
  const y = Math.sin(radians) * orbitRadius
  
  // The rocket's rotation is angle + 90, so vapor should go opposite direction
  const vaporAngle = angle.value + 90 + 180 // Opposite to rocket's front
  
  return {
    transform: `translate(${x}px, ${y}px) rotate(${vaporAngle}deg)`
  }
})

const animate = () => {
  angle.value = (angle.value + speed) % 360
  animationId = requestAnimationFrame(animate)
}

const checkVisibility = () => {
  // Check if the productivity stat is visible
  const productivityStat = document.querySelector('.productivity-stat')
  if (!productivityStat) return
  
  const rect = productivityStat.getBoundingClientRect()
  const windowHeight = window.innerHeight
  
  // Show rocket when productivity stat is in view
  isVisible.value = rect.top < windowHeight && rect.bottom > 0
}

onMounted(() => {
  // Start animation after a small delay
  setTimeout(() => {
    checkVisibility()
    if (isVisible.value) {
      animate()
    }
  }, 1000)
  
  // Check visibility on scroll
  window.addEventListener('scroll', checkVisibility)
  
  // Start animation when stats become visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animationId) {
        isVisible.value = true
        animate()
      }
    })
  })
  
  // Observe the productivity stat specifically
  setTimeout(() => {
    const productivityStat = document.querySelector('.productivity-stat')
    if (productivityStat) {
      observer.observe(productivityStat)
    }
  }, 500)
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  window.removeEventListener('scroll', checkVisibility)
})
</script>

<style scoped>
.orbiting-rocket {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  pointer-events: none;
  z-index: 10;
  transform: translate(-50%, -50%);
}

.rocket-container {
  position: absolute;
  transition: opacity 0.5s ease;
}

.rocket {
  font-size: 1.2rem;
  filter: drop-shadow(0 4px 8px rgba(255, 165, 0, 0.4));
  animation: rocketGlow 2s ease-in-out infinite alternate;
}

.vapor-trail {
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  gap: 3px;
  z-index: -1;
  transition: transform 0.1s ease;
  transform-origin: left center;
}

.vapor-dot {
  font-size: 0.6rem;
  opacity: 0;
  animation: vaporFade 0.8s ease-out infinite;
  filter: blur(0.5px);
}

@keyframes rocketGlow {
  0% {
    filter: drop-shadow(0 4px 8px rgba(255, 165, 0, 0.4));
    transform: scale(1);
  }
  100% {
    filter: drop-shadow(0 6px 12px rgba(255, 100, 0, 0.6));
    transform: scale(1.05);
  }
}

@keyframes vaporFade {
  0% {
    opacity: 0.8;
    transform: scale(1) translateX(0px);
  }
  50% {
    opacity: 0.4;
    transform: scale(0.8) translateX(4px);
  }
  100% {
    opacity: 0;
    transform: scale(0.3) translateX(9px);
  }
}

/* Hide on smaller screens */
@media (max-width: 768px) {
  .orbiting-rocket {
    display: none;
  }
}

/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .rocket-container {
    animation: none;
    transform: none !important;
  }
  
  .rocket {
    animation: none;
  }
  
  .vapor-dot {
    animation: none;
    opacity: 0.3;
  }
}
</style>
