<template>
  <div v-if="showBirds" class="flying-birds">
    <div 
      v-for="bird in birds" 
      :key="bird.id"
      class="bird"
      :style="{
        left: bird.x + 'px',
        top: bird.y + 'px',
        transform: `scale(${bird.scale}) rotate(${bird.rotation}deg)`,
        opacity: bird.opacity,
        animationDelay: bird.delay + 's'
      }"
    >
      🕊️
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const birds = ref([])
const showBirds = ref(false)
let animationId = null

// Check if screen is large enough for birds
const checkScreenSize = () => {
  showBirds.value = window.innerWidth >= 1200
}

// Initialize birds
const initBirds = () => {
  if (!showBirds.value) return
  
  const birdCount = 2
  birds.value = []
  
  for (let i = 0; i < birdCount; i++) {
    birds.value.push({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      scale: 0.8 + Math.random() * 0.4,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 4,
      opacity: 0.4 + Math.random() * 0.4,
      delay: Math.random() * 3
    })
  }
}

// Animate birds
const animateBirds = () => {
  if (!showBirds.value) return
  
  birds.value.forEach(bird => {
    // Update position
    bird.x += bird.vx
    bird.y += bird.vy
    
    // Update rotation
    bird.rotation += bird.rotationSpeed
    
    // Bounce off edges
    if (bird.x <= 0 || bird.x >= window.innerWidth - 30) {
      bird.vx *= -1
    }
    if (bird.y <= 0 || bird.y >= window.innerHeight - 30) {
      bird.vy *= -1
    }
    
    // Keep birds in bounds
    bird.x = Math.max(0, Math.min(window.innerWidth - 30, bird.x))
    bird.y = Math.max(0, Math.min(window.innerHeight - 30, bird.y))
    
    // Slight randomness in movement
    bird.vx += (Math.random() - 0.5) * 0.1
    bird.vy += (Math.random() - 0.5) * 0.1
    
    // Limit speed
    bird.vx = Math.max(-3, Math.min(3, bird.vx))
    bird.vy = Math.max(-3, Math.min(3, bird.vy))
  })
  
  animationId = requestAnimationFrame(animateBirds)
}

// Scroll effect
const handleScroll = () => {
  if (!showBirds.value) return
  
  const scrollY = window.scrollY
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight
  const scrollProgress = Math.min(scrollY / maxScroll, 1)
  
  // Make birds more active when scrolling
  birds.value.forEach(bird => {
    bird.opacity = 0.2 + scrollProgress * 0.6
    bird.vx *= 1 + scrollProgress * 0.5
    bird.vy *= 1 + scrollProgress * 0.5
  })
}

const handleResize = () => {
  checkScreenSize()
  if (showBirds.value) {
    initBirds()
    if (!animationId) animateBirds()
  } else {
    if (animationId) {
      cancelAnimationFrame(animationId)
      animationId = null
    }
  }
}

onMounted(() => {
  checkScreenSize()
  if (showBirds.value) {
    initBirds()
    animateBirds()
  }
  
  window.addEventListener('resize', handleResize)
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.flying-birds {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 5;
  overflow: hidden;
}

.bird {
  position: absolute;
  font-size: 1.5rem;
  transition: all 0.1s ease-out;
  animation: flutter 2s ease-in-out infinite alternate;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
}

@keyframes flutter {
  0% {
    transform: translateY(0px) rotate(0deg);
  }
  100% {
    transform: translateY(-10px) rotate(5deg);
  }
}

/* Hide on smaller screens */
@media (max-width: 1199px) {
  .flying-birds {
    display: none;
  }
}
</style>
