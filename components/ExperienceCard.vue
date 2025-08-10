<template>
  <div class="exp-card" v-tilt="5">
    <h3>{{ title }}</h3>
    <p class="duration">{{ duration }}</p>
    <ul>
      <li v-for="(bullet, index) in bullets" :key="index">{{ bullet }}</li>
    </ul>
  </div>
</template>

<script setup>
/*
 * ExperienceCard component
 *
 * Displays a job title, time period and a list of responsibilities. The
 * parent component passes the title of the role, the duration and an
 * array of bullet points summarising what was achieved during that
 * experience.
 */
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  bullets: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.exp-card {
  background: linear-gradient(#ffffff, #ffffff) padding-box,
              radial-gradient(1200px circle at var(--mx, 50%) var(--my, 0%), rgba(67, 97, 238, 0.16), rgba(181, 23, 158, 0.16)) border-box;
  border: 1px solid transparent;
}
</style>