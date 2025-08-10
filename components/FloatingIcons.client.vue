<template>
  <div class="float-icons" aria-hidden="true">
    <span class="icon i-braces" style="--x:10%;--y:20%;--d:14s">
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.6">
        <path d="M9 3c-2 0-3 1-3 3v3c0 1-1 2-2 2 1 0 2 1 2 2v3c0 2 1 3 3 3"/>
        <path d="M15 3c2 0 3 1 3 3v3c0 1 1 2 2 2-1 0-2 1-2 2v3c0 2-1 3-3 3"/>
      </svg>
    </span>
    <span class="icon i-code" style="--x:78%;--y:18%;--d:18s">
      <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.6">
        <path d="M8 9l-3 3 3 3"/><path d="M16 9l3 3-3 3"/><path d="M12 8l-1 8"/>
      </svg>
    </span>
    <span class="icon i-db" style="--x:18%;--y:70%;--d:20s">
      <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" stroke-width="1.6">
        <ellipse cx="12" cy="5" rx="7" ry="3"/><path d="M5 5v8c0 1.7 3.1 3 7 3s7-1.3 7-3V5"/>
      </svg>
    </span>
    <span class="icon i-gear" style="--x:65%;--y:72%;--d:22s">
      <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.6">
        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
        <path d="M19.4 15a7.9 7.9 0 0 0 .1-2l2-1.2-2-3.5-2.2.6a8 8 0 0 0-1.7-1l-.2-2.3h-4l-.2 2.3a8 8 0 0 0-1.7 1L4.5 8.3l-2 3.5L4.5 13a7.9 7.9 0 0 0 0 2l-2 1.2 2 3.5 2.2-.6c.5.4 1.1.7 1.7 1l.2 2.3h4l.2-2.3c.6-.3 1.2-.6 1.7-1l2.2.6 2-3.5-2.1-1.2z"/>
      </svg>
    </span>
    <span class="icon i-terminal" style="--x:86%;--y:52%;--d:16s">
      <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" stroke-width="1.6">
        <path d="M3 5h18v14H3z"/><path d="M6 9l3 3-3 3"/><path d="M12 15h6"/>
      </svg>
    </span>
  </div>
</template>

<script setup lang="ts">
// purely presentational, no script needed
</script>

<style scoped>
.float-icons {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}
.icon {
  position: absolute;
  left: var(--x);
  top: var(--y);
  color: rgba(255,255,255,0.85);
  opacity: 0.8;
  filter: drop-shadow(0 8px 24px rgba(0,0,0,0.4));
  transform: translate3d(0,0,0);
  animation: drift var(--d) ease-in-out infinite alternate;
  z-index: 1;
}
.i-db { color: rgba(167, 139, 250, 0.6); }
.i-gear { color: rgba(250, 143, 255, 0.55); }
.i-terminal { color: rgba(255, 255, 255, 0.55); }

@keyframes drift {
  0% { transform: translate3d(-15px, -20px, 0) rotate(-12deg) scale(0.95); }
  100% { transform: translate3d(15px, 20px, 0) rotate(12deg) scale(1.05); }
}
</style>


