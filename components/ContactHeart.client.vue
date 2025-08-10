<template>
  <div v-if="showHeart" class="contact-heart" :class="{ 'heart-hidden': isHovered }" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
    <div class="heart-container">
      <div class="heart-icon" :class="{ 'beating': isBeating }">❤️</div>
      <div class="heart-particles">
        <span v-for="n in 6" :key="n" class="particle" :style="{ animationDelay: (n * 0.2) + 's' }">💕</span>
      </div>
      <div class="heart-message">Made with love</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const showHeart = ref(false)
const isBeating = ref(false)
const isHovered = ref(false)
let heartBeatInterval = null

const checkContactSection = () => {
  const contactSection = document.querySelector('#contact')
  if (!contactSection) return

  const rect = contactSection.getBoundingClientRect()
  const windowHeight = window.innerHeight
  
  // Show heart when contact section is in view
  const isInView = rect.top < windowHeight && rect.bottom > 0
  
  if (isInView && !showHeart.value) {
    showHeart.value = true
    // Start heart beating animation
    setTimeout(() => {
      isBeating.value = true
      
      // Add periodic extra beats
      heartBeatInterval = setInterval(() => {
        isBeating.value = false
        setTimeout(() => {
          isBeating.value = true
        }, 100)
      }, 3000)
    }, 500)
  }
}

onMounted(() => {
  window.addEventListener('scroll', checkContactSection)
  // Check immediately in case already scrolled
  checkContactSection()
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkContactSection)
  if (heartBeatInterval) {
    clearInterval(heartBeatInterval)
  }
})
</script>

<style scoped>
.contact-heart {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 100;
  pointer-events: auto;
  animation: heartAppear 0.8s ease-out;
  cursor: pointer;
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.contact-heart.heart-hidden {
  opacity: 0;
  transform: scale(0.8) translateY(10px);
}

.contact-heart:hover .heart-icon {
  transform: scale(0.9);
  filter: drop-shadow(0 4px 8px rgba(255, 0, 0, 0.2));
}

.contact-heart:hover .heart-message {
  opacity: 0.7;
  transform: translateY(5px);
}

.contact-heart:hover .particle {
  animation-play-state: paused;
  opacity: 0.3;
}

.heart-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.heart-icon {
  font-size: 3rem;
  filter: drop-shadow(0 8px 16px rgba(255, 0, 0, 0.3));
  animation: float 2s ease-in-out infinite, heartGlow 2s ease-in-out infinite;
  transition: all 0.4s ease;
}

.heart-icon.beating {
  animation: float 2s ease-in-out infinite, heartGlow 2s ease-in-out infinite, heartBeat 0.6s ease-in-out infinite;
}

.heart-particles {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  pointer-events: none;
}

.particle {
  position: absolute;
  font-size: 1rem;
  animation: particleFloat 3s ease-in-out infinite;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.particle:nth-child(1) { top: 10%; left: 20%; }
.particle:nth-child(2) { top: 20%; right: 15%; }
.particle:nth-child(3) { bottom: 25%; left: 10%; }
.particle:nth-child(4) { bottom: 15%; right: 20%; }
.particle:nth-child(5) { top: 40%; left: 5%; }
.particle:nth-child(6) { top: 35%; right: 5%; }

.heart-message {
  background: linear-gradient(135deg, rgba(255, 192, 203, 0.9), rgba(255, 182, 193, 0.8));
  color: #8b5a3c;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(255, 192, 203, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(8px);
  animation: messageFloat 2.5s ease-in-out infinite;
  transition: all 0.3s ease;
}

@keyframes heartAppear {
  0% {
    opacity: 0;
    transform: scale(0) rotate(-180deg);
  }
  50% {
    transform: scale(1.2) rotate(-90deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes heartBeat {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

@keyframes heartGlow {
  0%, 100% {
    filter: drop-shadow(0 8px 16px rgba(255, 0, 0, 0.3));
  }
  50% {
    filter: drop-shadow(0 8px 24px rgba(255, 0, 0, 0.6));
  }
}

@keyframes particleFloat {
  0% {
    opacity: 0;
    transform: translateY(0px) scale(0.5);
  }
  50% {
    opacity: 1;
    transform: translateY(-20px) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(-40px) scale(0.3);
  }
}

@keyframes messageFloat {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .contact-heart {
    bottom: 1rem;
    right: 1rem;
  }
  
  .heart-icon {
    font-size: 2.5rem;
  }
  
  .heart-message {
    font-size: 0.7rem;
    padding: 0.4rem 0.8rem;
  }
  
  .particle {
    font-size: 0.8rem;
  }
}

/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .heart-icon {
    animation: none;
  }
  
  .particle {
    animation: none;
    opacity: 0.5;
  }
  
  .heart-message {
    animation: none;
  }
  
  .contact-heart {
    animation: none;
  }
}
</style>
