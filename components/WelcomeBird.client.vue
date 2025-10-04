<template>
  <div class="welcome-bird-container">
    <div 
      v-if="showBird" 
      class="welcome-bird" 
      :class="birdState"
      :style="birdStyle"
    >
      <div class="bird">🐦</div>
      <div v-if="showBubble" class="speech-bubble">
        Welcome! 👋
        <div class="bubble-tail"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const showBird = ref(false)
const showBubble = ref(false)
const birdState = ref('flying-in') // 'flying-in', 'landed', 'flying-out'
const animationProgress = ref(0)

let welcomeInterval = null
let animationFrame = null
let startTimeout = null
let bubbleTimeout = null
let flyAwayTimeout = null

// Bird position during different states
const birdStyle = computed(() => {
  switch (birdState.value) {
    case 'flying-in':
      const progress = animationProgress.value
      return {
        transform: `translateX(${-200 + (progress * 200)}px) translateY(${20 - (progress * 20)}px) rotate(${-15 + (progress * 15)}deg)`,
        opacity: progress
      }
    case 'landed':
      return {
        transform: 'translateX(0px) translateY(0px) rotate(0deg)',
        opacity: 1
      }
    case 'flying-out':
      const outProgress = animationProgress.value
      return {
        transform: `translateX(${outProgress * 200}px) translateY(${-(outProgress * 30)}px) rotate(${outProgress * 20}deg)`,
        opacity: 1 - (outProgress * 0.5)
      }
    default:
      return {
        transform: 'translateX(-200px) translateY(20px)',
        opacity: 0
      }
  }
})

const animateBirdIn = () => {
  let start = null
  const duration = 1500 // 1.5 seconds to fly in
  
  const animate = (timestamp) => {
    if (!start) start = timestamp
    const elapsed = timestamp - start
    const progress = Math.min(elapsed / duration, 1)
    
    animationProgress.value = progress
    
    if (progress < 1) {
      animationFrame = requestAnimationFrame(animate)
    } else {
      // Bird has landed
      birdState.value = 'landed'
      showBubble.value = true
      
      // Stay for 3 seconds, then fly away
      bubbleTimeout = setTimeout(() => {
        showBubble.value = false
        flyAwayTimeout = setTimeout(() => {
          animateBirdOut()
        }, 300)
      }, 3000)
    }
  }
  
  animationFrame = requestAnimationFrame(animate)
}

const animateBirdOut = () => {
  birdState.value = 'flying-out'
  animationProgress.value = 0
  
  let start = null
  const duration = 1200 // 1.2 seconds to fly out
  
  const animate = (timestamp) => {
    if (!start) start = timestamp
    const elapsed = timestamp - start
    const progress = Math.min(elapsed / duration, 1)
    
    animationProgress.value = progress
    
    if (progress < 1) {
      animationFrame = requestAnimationFrame(animate)
    } else {
      // Bird has flown away
      showBird.value = false
      birdState.value = 'flying-in'
      animationProgress.value = 0
    }
  }
  
  animationFrame = requestAnimationFrame(animate)
}

const startWelcomeSequence = () => {
  showBird.value = true
  birdState.value = 'flying-in'
  animationProgress.value = 0
  animateBirdIn()
}

onMounted(() => {
  // Start first welcome after 3 seconds
  startTimeout = setTimeout(() => {
    startWelcomeSequence()
  }, 3000)
  
  // Repeat every 15 seconds
  welcomeInterval = setInterval(() => {
    startWelcomeSequence()
  }, 15000)
})

onUnmounted(() => {
  if (welcomeInterval) {
    clearInterval(welcomeInterval)
  }
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
  if (startTimeout) {
    clearTimeout(startTimeout)
  }
  if (bubbleTimeout) {
    clearTimeout(bubbleTimeout)
  }
  if (flyAwayTimeout) {
    clearTimeout(flyAwayTimeout)
  }
})
</script>

<style scoped>
.welcome-bird-container {
  position: absolute;
  top: 50%;
  right: -50px;
  transform: translateY(-50%);
  pointer-events: none;
  z-index: 10;
}

.welcome-bird {
  position: relative;
  transition: all 0.3s ease;
}

.bird {
  font-size: 2rem;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.2));
  transition: transform 0.2s ease;
}

.welcome-bird.landed .bird {
  animation: birdHop 0.6s ease-in-out infinite alternate;
}

.speech-bubble {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  color: #1e293b;
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  font-size: 0.9rem;
  font-weight: 600;
  white-space: nowrap;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  border: 2px solid #e2e8f0;
  margin-bottom: 0.5rem;
  animation: bubbleAppear 0.4s ease-out;
  z-index: 15;
}

.bubble-tail {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid #ffffff;
}

.bubble-tail::before {
  content: '';
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid #e2e8f0;
}

@keyframes birdHop {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-4px);
  }
}

@keyframes bubbleAppear {
  0% {
    opacity: 0;
    transform: translateX(-50%) scale(0.8) translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateX(-50%) scale(1) translateY(0);
  }
}

/* Hide on smaller screens */
@media (max-width: 768px) {
  .welcome-bird-container {
    display: none;
  }
}

/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .welcome-bird {
    transition: none;
  }
  
  .bird {
    animation: none;
  }
  
  .speech-bubble {
    animation: none;
  }
}
</style>
