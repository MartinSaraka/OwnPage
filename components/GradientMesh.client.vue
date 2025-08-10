<template>
  <div class="gradient-mesh" ref="meshContainer">
    <div class="mesh-blob blob-1"></div>
    <div class="mesh-blob blob-2"></div>
    <div class="mesh-blob blob-3"></div>
    <div class="mesh-blob blob-4"></div>
    <div class="mesh-blob blob-5"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const meshContainer = ref<HTMLElement>()

onMounted(() => {
  if (!meshContainer.value) return
  
  const blobs = meshContainer.value.querySelectorAll('.mesh-blob')
  
  blobs.forEach((blob, i) => {
    const duration = 15 + i * 3
    blob.style.setProperty('--duration', `${duration}s`)
    blob.style.setProperty('--delay', `${i * -2}s`)
  })
})
</script>

<style scoped>
.gradient-mesh {
  position: fixed;
  inset: 0;
  z-index: -4;
  overflow: hidden;
  background: radial-gradient(ellipse at top, #1e1b4b 0%, #0f0f23 70%);
}

.mesh-blob {
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.7;
  animation: float-mesh var(--duration, 20s) ease-in-out infinite var(--delay, 0s);
  will-change: transform;
}

.blob-1 {
  top: -20%;
  left: -10%;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%);
}

.blob-2 {
  top: 20%;
  right: -15%;
  background: radial-gradient(circle, rgba(236, 72, 153, 0.35) 0%, transparent 70%);
}

.blob-3 {
  bottom: -10%;
  left: 10%;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%);
}

.blob-4 {
  top: 50%;
  left: 50%;
  background: radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, transparent 70%);
}

.blob-5 {
  bottom: 20%;
  right: 20%;
  background: radial-gradient(circle, rgba(244, 114, 182, 0.3) 0%, transparent 70%);
}

@keyframes float-mesh {
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
  25% { transform: translate3d(30px, -40px, 0) scale(1.1); }
  50% { transform: translate3d(-20px, 20px, 0) scale(0.9); }
  75% { transform: translate3d(40px, 30px, 0) scale(1.05); }
}
</style>
