<template>
  <div class="shooting-gallery">
    <div class="game-container" ref="gameContainer" @click="shoot">
      <!-- Carnival background with wood panels -->
      <div class="carnival-backdrop"></div>
      
      <!-- Wooden booth frame -->
      <div class="booth-frame">
        <div class="wood-plank top"></div>
        <div class="wood-plank left"></div>
        <div class="wood-plank right"></div>
        <div class="wood-plank bottom"></div>
      </div>
      
      <!-- Carnival lights -->
      <div class="carnival-lights">
        <div v-for="i in 12" :key="`light-${i}`" class="light-bulb" :style="{ animationDelay: `${i * 0.1}s` }"></div>
      </div>
      
      <!-- Shelf with plushies -->
      <div class="shelf-container">
        <!-- Wooden shelf -->
        <div class="shelf-board top-shelf"></div>
        <div class="shelf-board bottom-shelf"></div>
        
        <!-- Balloons on shelves -->
        <div class="plushies-row top-row">
          <div 
            v-for="(exp, index) in experiences.slice(0, 4)" 
            :key="index"
            class="plushie balloon"
            :class="{ 'hit': hitTargets.includes(index), 'pop': activeTarget === index }"
            @click.stop="hitTarget(index, $event)"
          >
            <div class="balloon-string"></div>
            <div class="plushie-emoji balloon-emoji" :style="{ filter: `drop-shadow(0 4px 12px ${getBalloonColor(index)})` }">{{ getPlushieEmoji(index) }}</div>
            <div class="plushie-label balloon-label" :style="{ background: getBalloonColor(index) }">{{ exp.shortTitle }}</div>
            <div v-if="hitTargets.includes(index)" class="hit-mark">💥</div>
          </div>
        </div>
        
        <div class="plushies-row bottom-row">
          <div 
            v-for="(exp, index) in experiences.slice(4, 8)" 
            :key="index + 4"
            class="plushie balloon"
            :class="{ 'hit': hitTargets.includes(index + 4), 'pop': activeTarget === index + 4 }"
            @click.stop="hitTarget(index + 4, $event)"
          >
            <div class="balloon-string"></div>
            <div class="plushie-emoji balloon-emoji" :style="{ filter: `drop-shadow(0 4px 12px ${getBalloonColor(index + 4)})` }">{{ getPlushieEmoji(index + 4) }}</div>
            <div class="plushie-label balloon-label" :style="{ background: getBalloonColor(index + 4) }">{{ exp.shortTitle }}</div>
            <div v-if="hitTargets.includes(index + 4)" class="hit-mark">💥</div>
          </div>
        </div>
      </div>

      <!-- Rifle in center bottom -->
      <div class="rifle-container" :class="{ 'recoil': isShooting }">
        <div class="crosshair" :style="crosshairPosition"></div>
        <svg class="rifle" viewBox="0 0 200 80">
          <!-- Rifle body -->
          <defs>
            <linearGradient id="rifleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style="stop-color:#2d3748;stop-opacity:1" />
              <stop offset="50%" style="stop-color:#4a5568;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#2d3748;stop-opacity:1" />
            </linearGradient>
            <linearGradient id="woodGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:#8b4513;stop-opacity:1" />
              <stop offset="50%" style="stop-color:#a0522d;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#654321;stop-opacity:1" />
            </linearGradient>
          </defs>
          
          <!-- Stock (wood) -->
          <rect x="140" y="35" width="55" height="18" fill="url(#woodGradient)" rx="3"/>
          <rect x="170" y="30" width="25" height="28" fill="url(#woodGradient)" rx="2"/>
          
          <!-- Barrel -->
          <rect x="5" y="38" width="140" height="10" fill="url(#rifleGradient)" rx="5"/>
          <circle cx="5" cy="43" r="5" fill="#1a202c"/>
          
          <!-- Trigger guard -->
          <path d="M 120 48 Q 125 55 120 60 L 110 60 Q 105 55 110 48 Z" fill="#4a5568" stroke="#2d3748" stroke-width="1"/>
          
          <!-- Scope -->
          <ellipse cx="80" cy="35" rx="20" ry="6" fill="#1a202c" opacity="0.8"/>
          <rect x="60" y="32" width="40" height="6" fill="#2d3748" rx="2"/>
          
          <!-- Muzzle flash (when shooting) -->
          <g v-if="isShooting" class="muzzle-flash">
            <circle cx="5" cy="43" r="15" fill="#fbbf24" opacity="0.8"/>
            <circle cx="5" cy="43" r="10" fill="#fff" opacity="0.6"/>
          </g>
        </svg>
        <div class="rifle-prompt">🎯 Click to shoot!</div>
      </div>

      <!-- Bullet tracers -->
      <div 
        v-for="(bullet, index) in bullets" 
        :key="`bullet-${index}`"
        class="bullet-tracer"
        :style="{ 
          left: bullet.x + 'px', 
          top: bullet.y + 'px',
          width: bullet.length + 'px',
          transform: `rotate(${bullet.angle}deg)`,
          opacity: bullet.opacity
        }"
      ></div>
      
      <!-- Particle effects for hits -->
      <div 
        v-for="(particle, index) in particles" 
        :key="`particle-${index}`"
        class="particle"
        :style="{ 
          left: particle.x + 'px', 
          top: particle.y + 'px',
          background: particle.color,
          opacity: particle.opacity
        }"
      ></div>

      <!-- Score display -->
      <div class="score-panel">
        <div class="score">🎯 Hit: {{ hitTargets.length }}/{{ experiences.length }}</div>
        <button @click="resetGame" class="reset-btn" :class="{ 'pulse': hitTargets.length === experiences.length }">
          <span v-if="hitTargets.length === experiences.length">🎉 Play Again</span>
          <span v-else>🔄 Reset</span>
        </button>
      </div>
    </div>

    <!-- Selected Experience Detail -->
    <transition name="slide-up">
      <div v-if="selectedExperience" class="experience-detail" @click="closeDetail">
        <div class="detail-card" @click.stop>
          <button class="close-btn" @click="closeDetail">✕</button>
          <h3>{{ selectedExperience.title }}</h3>
          <p class="duration">{{ selectedExperience.duration }}</p>
          <ul>
            <li v-for="(bullet, idx) in selectedExperience.bullets" :key="idx">{{ bullet }}</li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

interface Experience {
  title: string
  shortTitle: string
  duration: string
  bullets: string[]
}

const props = defineProps<{
  experiences: Array<{
    title: string
    duration: string
    bullets: string[]
  }>
}>()

const gameContainer = ref<HTMLElement>()
const hitTargets = ref<number[]>([])
const activeTarget = ref<number | null>(null)
const selectedExperience = ref<Experience | null>(null)
const isShooting = ref(false)
const bullets = ref<Array<{ x: number; y: number; angle: number; length: number; opacity: number }>>([])
const particles = ref<Array<{ x: number; y: number; color: string; opacity: number }>>([])
const crosshairPosition = ref({ left: '50%', top: '50%' })

// Generate short titles from full titles
const experiences = props.experiences.map(exp => ({
  ...exp,
  shortTitle: exp.title.split('·')[0]?.trim() || exp.title.split('·')[1]?.trim().slice(0, 15) || exp.title.slice(0, 15)
}))

// Balloon emojis for each position - different colors
const balloonEmojis = ['🎈', '🎈', '🎈', '🎈', '🎈', '🎈', '🎈', '🎈']
const balloonColors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#fd79a8', '#00b894', '#fdcb6e']

const getPlushieEmoji = (index: number) => {
  return balloonEmojis[index] || '🎈'
}

const getBalloonColor = (index: number) => {
  return balloonColors[index] || '#ff6b6b'
}

const hitTarget = (index: number, event?: MouseEvent) => {
  if (event) {
    event.stopPropagation()
  }
  
  if (hitTargets.value.includes(index)) {
    // Already hit, show detail
    selectedExperience.value = experiences[index]
    return
  }
  
  // Mark as hit
  hitTargets.value.push(index)
  activeTarget.value = index
  
  // Create explosion particles
  if (event) {
    const rect = (event.target as HTMLElement).getBoundingClientRect()
    const container = gameContainer.value?.getBoundingClientRect()
    if (container) {
      createParticles(
        rect.left - container.left + rect.width / 2,
        rect.top - container.top + rect.height / 2
      )
    }
  }
  
  // Show detail after animation
  setTimeout(() => {
    selectedExperience.value = experiences[index]
    activeTarget.value = null
  }, 800)
}

const shoot = (event: MouseEvent) => {
  if (isShooting.value) return
  
  isShooting.value = true
  
  const container = gameContainer.value?.getBoundingClientRect()
  if (!container) return
  
  const clickX = event.clientX - container.left
  const clickY = event.clientY - container.top
  
  // Create bullet tracer
  const startX = container.width / 2
  const startY = container.height - 100
  
  const dx = clickX - startX
  const dy = clickY - startY
  const angle = Math.atan2(dy, dx) * (180 / Math.PI)
  const distance = Math.sqrt(dx * dx + dy * dy)
  
  const bullet = {
    x: startX,
    y: startY,
    angle,
    length: 0,
    opacity: 1
  }
  
  bullets.value.push(bullet)
  
  // Animate bullet
  const duration = 150
  const start = Date.now()
  
  const animate = () => {
    const elapsed = Date.now() - start
    const progress = Math.min(elapsed / duration, 1)
    
    bullet.length = Math.min(distance * progress, 60)
    bullet.x = startX + dx * progress
    bullet.y = startY + dy * progress
    
    if (progress < 1) {
      requestAnimationFrame(animate)
    } else {
      // Fade out
      let fadeProgress = 0
      const fadeOut = () => {
        fadeProgress += 0.1
        bullet.opacity = Math.max(0, 1 - fadeProgress)
        if (fadeProgress < 1) {
          requestAnimationFrame(fadeOut)
        } else {
          bullets.value = bullets.value.filter(b => b !== bullet)
        }
      }
      fadeOut()
      
      setTimeout(() => {
        isShooting.value = false
      }, 300)
    }
  }
  
  animate()
}

const createParticles = (x: number, y: number) => {
  const colors = ['#fbbf24', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']
  for (let i = 0; i < 15; i++) {
    const particle = {
      x: x + (Math.random() - 0.5) * 20,
      y: y + (Math.random() - 0.5) * 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: 1,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4
    }
    particles.value.push(particle)
    
    // Animate particle
    const animate = () => {
      particle.x += particle.vx
      particle.y += particle.vy
      particle.opacity -= 0.02
      
      if (particle.opacity > 0) {
        requestAnimationFrame(animate)
      } else {
        particles.value = particles.value.filter(p => p !== particle)
      }
    }
    animate()
  }
}

const closeDetail = () => {
  selectedExperience.value = null
}

const resetGame = () => {
  hitTargets.value = []
  selectedExperience.value = null
}

onMounted(() => {
  // Track mouse for crosshair
  const updateCrosshair = (e: MouseEvent) => {
    if (!gameContainer.value) return
    const rect = gameContainer.value.getBoundingClientRect()
    crosshairPosition.value = {
      left: `${e.clientX - rect.left}px`,
      top: `${e.clientY - rect.top}px`
    }
  }
  
  gameContainer.value?.addEventListener('mousemove', updateCrosshair)
})
</script>

<style scoped>
.shooting-gallery {
  width: 100%;
  min-height: 600px;
  position: relative;
  overflow: hidden;
}

.game-container {
  width: 100%;
  height: 600px;
  position: relative;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  border-radius: 1rem;
  overflow: hidden;
  cursor: crosshair;
  box-shadow: 
    inset 0 0 100px rgba(0,0,0,0.5),
    0 10px 40px rgba(0,0,0,0.3);
}

/* Carnival backdrop */
.carnival-backdrop {
  position: absolute;
  inset: 0;
  background: 
    repeating-linear-gradient(
      45deg,
      rgba(255,59,48,0.1) 0px,
      rgba(255,59,48,0.1) 20px,
      transparent 20px,
      transparent 40px
    ),
    repeating-linear-gradient(
      -45deg,
      rgba(255,204,0,0.1) 0px,
      rgba(255,204,0,0.1) 20px,
      transparent 20px,
      transparent 40px
    );
}

/* Wooden booth frame */
.booth-frame {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.wood-plank {
  position: absolute;
  background: linear-gradient(90deg, #8b4513 0%, #a0522d 50%, #654321 100%);
  box-shadow: inset 0 2px 5px rgba(0,0,0,0.3), 0 4px 10px rgba(0,0,0,0.5);
}

.wood-plank.top {
  top: 0;
  left: 0;
  right: 0;
  height: 30px;
  border-bottom: 3px solid #654321;
}

.wood-plank.bottom {
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  border-top: 3px solid #654321;
}

.wood-plank.left {
  left: 0;
  top: 0;
  bottom: 0;
  width: 25px;
  border-right: 3px solid #654321;
}

.wood-plank.right {
  right: 0;
  top: 0;
  bottom: 0;
  width: 25px;
  border-left: 3px solid #654321;
}

/* Carnival lights */
.carnival-lights {
  position: absolute;
  top: 5px;
  left: 30px;
  right: 30px;
  display: flex;
  justify-content: space-around;
  z-index: 10;
}

.light-bulb {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: radial-gradient(circle, #ffd700 0%, #ff6347 100%);
  box-shadow: 0 0 15px currentColor;
  animation: blink 1.5s ease-in-out infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; box-shadow: 0 0 20px #ffd700; }
  50% { opacity: 0.3; box-shadow: 0 0 5px #ffd700; }
}

/* Shelf container */
.shelf-container {
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 800px;
}

/* Wooden shelf boards */
.shelf-board {
  position: relative;
  width: 100%;
  height: 25px;
  background: linear-gradient(180deg, #8b4513 0%, #6d3410 50%, #4a2408 100%);
  border-radius: 8px;
  box-shadow: 
    0 6px 20px rgba(0,0,0,0.5),
    inset 0 2px 4px rgba(139, 69, 19, 0.5),
    inset 0 -2px 4px rgba(0,0,0,0.3);
  border: 2px solid #5d2f0a;
}

.shelf-board::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 5%;
  right: 5%;
  height: 2px;
  background: rgba(139, 69, 19, 0.4);
  transform: translateY(-50%);
}

.shelf-board::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 5%;
  right: 5%;
  height: 3px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
}

.top-shelf {
  margin-bottom: 120px;
}

.bottom-shelf {
  margin-top: 120px;
}

/* Plushies rows */
.plushies-row {
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  padding: 0 20px;
}

.top-row {
  top: 30px;
}

.bottom-row {
  bottom: -150px;
}

/* Individual plushie */
.plushie {
  position: relative;
  width: 100px;
  cursor: pointer;
  transition: transform 0.2s ease;
  filter: drop-shadow(0 8px 15px rgba(0,0,0,0.4));
}

.plushie:hover {
  transform: translateY(-10px) scale(1.1);
}

.plushie.hit {
  opacity: 0.5;
  pointer-events: none;
  transform: rotate(90deg);
  transition: all 0.5s ease;
}

.plushie.pop {
  animation: balloon-pop 0.4s ease;
}

@keyframes balloon-pop {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.3); opacity: 0.8; }
  100% { transform: scale(0); opacity: 0; }
}

.plushie-emoji {
  font-size: 4rem;
  text-align: center;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
  animation: balloon-float 3s ease-in-out infinite;
}

.balloon-emoji {
  transition: filter 0.3s ease;
}

@keyframes balloon-float {
  0%, 100% { transform: translateY(0) rotate(-2deg); }
  50% { transform: translateY(-12px) rotate(2deg); }
}

.plushie:nth-child(1) .plushie-emoji { animation-delay: 0s; }
.plushie:nth-child(2) .plushie-emoji { animation-delay: 0.3s; }
.plushie:nth-child(3) .plushie-emoji { animation-delay: 0.6s; }
.plushie:nth-child(4) .plushie-emoji { animation-delay: 0.9s; }

.plushie-label {
  text-align: center;
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  color: white;
  padding: 0.4rem 0.6rem;
  border-radius: 0.75rem;
  font-size: 0.7rem;
  font-weight: 600;
  margin-top: 0.5rem;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
  border: 2px solid rgba(255,255,255,0.3);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.balloon-label {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  border: 2px solid rgba(255,255,255,0.4);
}

/* Balloon string */
.balloon-string {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 2px;
  height: 40px;
  background: linear-gradient(180deg, rgba(100, 100, 100, 0.6) 0%, rgba(100, 100, 100, 0.3) 100%);
  transform: translateX(-50%);
  z-index: -1;
}

.balloon.hit .balloon-string {
  display: none;
}

.hit-mark {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
  animation: hit-burst 0.6s ease;
  pointer-events: none;
  z-index: 10;
}

@keyframes hit-burst {
  0% { 
    transform: translate(-50%, -50%) scale(0) rotate(0deg);
    opacity: 1;
  }
  50% { 
    transform: translate(-50%, -50%) scale(1.5) rotate(180deg);
    opacity: 1;
  }
  100% { 
    transform: translate(-50%, -50%) scale(1) rotate(360deg);
    opacity: 1;
  }
}

/* Rifle */
.rifle-container {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  width: 250px;
  height: 100px;
  z-index: 100;
  transition: transform 0.1s ease;
}

.rifle-container.recoil {
  animation: rifle-recoil 0.2s ease;
}

@keyframes rifle-recoil {
  0% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(10px) scale(0.98); }
  100% { transform: translateX(-50%) translateY(0); }
}

.rifle {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 8px 20px rgba(0,0,0,0.5));
}

.muzzle-flash {
  animation: flash 0.1s ease;
}

@keyframes flash {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
}

.rifle-prompt {
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, rgba(255, 59, 48, 0.95), rgba(238, 90, 111, 0.95));
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  font-size: 0.85rem;
  font-weight: 600;
  white-space: nowrap;
  box-shadow: 0 4px 15px rgba(255, 59, 48, 0.5);
  border: 2px solid rgba(255,255,255,0.3);
  animation: pulse-hint 2s ease-in-out infinite;
}

/* Crosshair */
.crosshair {
  position: absolute;
  width: 40px;
  height: 40px;
  border: 2px solid rgba(255, 59, 48, 0.8);
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  z-index: 200;
  box-shadow: 0 0 20px rgba(255, 59, 48, 0.6);
}

.crosshair::before,
.crosshair::after {
  content: '';
  position: absolute;
  background: rgba(255, 59, 48, 0.8);
  box-shadow: 0 0 10px rgba(255, 59, 48, 0.6);
}

.crosshair::before {
  width: 2px;
  height: 100%;
  left: 50%;
  transform: translateX(-50%);
}

.crosshair::after {
  height: 2px;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
}

/* Bullet tracer */
.bullet-tracer {
  position: absolute;
  height: 3px;
  background: linear-gradient(90deg, 
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 204, 0, 1) 50%,
    rgba(255, 255, 255, 1) 100%
  );
  pointer-events: none;
  z-index: 150;
  box-shadow: 0 0 10px rgba(255, 204, 0, 0.8);
  transform-origin: left center;
}

/* Particle effects */
.particle {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  pointer-events: none;
  z-index: 15;
  box-shadow: 0 0 10px currentColor;
}

/* Score panel */
.score-panel {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255,255,255,0.95);
  padding: 1rem 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  align-items: center;
}

.score {
  font-size: 1.2rem;
  font-weight: 600;
  color: #8b5cf6;
}

.reset-btn {
  background: linear-gradient(135deg, #8b5cf6, #a855f7);
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 0.75rem;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
  border: 2px solid rgba(255,255,255,0.3);
  min-width: 120px;
}

.reset-btn:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 6px 16px rgba(139, 92, 246, 0.5);
}

.reset-btn:active {
  transform: translateY(0) scale(0.98);
}

.reset-btn.pulse {
  animation: pulse-victory 1.5s ease-in-out infinite;
  background: linear-gradient(135deg, #10b981, #059669);
}

@keyframes pulse-victory {
  0%, 100% { 
    transform: scale(1);
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
  }
  50% { 
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(16, 185, 129, 0.6);
  }
}

/* Experience detail modal */
.experience-detail {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.detail-card {
  background: white;
  border-radius: 1.5rem;
  padding: 2rem;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0,0,0,0.1);
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: rgba(0,0,0,0.2);
  transform: rotate(90deg);
}

.detail-card h3 {
  color: var(--color-secondary);
  margin-bottom: 0.5rem;
  padding-right: 2rem;
}

.detail-card .duration {
  color: var(--color-accent);
  font-weight: 600;
  margin-bottom: 1rem;
}

.detail-card ul {
  padding-left: 1.5rem;
  margin: 0;
}

.detail-card li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

/* Animations */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .game-container {
    height: 500px;
  }
  
  .carnival-lights {
    display: none;
  }
  
  .shelf-container {
    width: 95%;
    top: 80px;
  }
  
  .top-shelf {
    margin-bottom: 100px;
  }
  
  .bottom-shelf {
    margin-top: 100px;
  }
  
  .top-row {
    top: 25px;
  }
  
  .bottom-row {
    bottom: -130px;
  }
  
  .plushie {
    width: 70px;
  }
  
  .plushie-emoji {
    font-size: 2.5rem;
  }
  
  .plushie-label {
    font-size: 0.6rem;
    padding: 0.3rem 0.4rem;
  }
  
  .hit-mark {
    font-size: 2rem;
  }
  
  .rifle-container {
    width: 180px;
    height: 70px;
    bottom: 20px;
  }
  
  .rifle-prompt {
    font-size: 0.65rem;
    padding: 0.3rem 0.6rem;
    top: -35px;
    white-space: nowrap;
  }
  
  .wood-plank.bottom {
    height: 35px;
  }
  
  .crosshair {
    width: 25px;
    height: 25px;
  }
  
  .crosshair::before,
  .crosshair::after {
    opacity: 0.8;
  }
  
  .score-panel {
    top: 10px;
    right: 10px;
    padding: 0.8rem 1rem;
    gap: 0.6rem;
  }
  
  .score {
    font-size: 0.9rem;
  }
  
  .reset-btn {
    padding: 0.5rem 0.9rem;
    font-size: 0.8rem;
    min-width: 100px;
  }
  
  .detail-card {
    padding: 1.5rem;
    margin: 1rem;
  }
}
</style>

