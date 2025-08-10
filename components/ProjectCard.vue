<template>
  <div class="project-card" v-tilt="6">
    <!-- optional cover image -->
    <img v-if="image" :src="image" :alt="title + ' image'" />
    <div class="project-content">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
      <div class="tags">
        <span v-for="(tag, index) in tags" :key="index" class="tag">{{ tag }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
/*
 * ProjectCard component
 *
 * Displays a project with an optional image, title, brief description
 * and a list of technology tags. Tags are rendered as badges. All
 * styling is handled in the global stylesheet.
 */
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tags: {
    type: Array,
    required: true
  },
  image: {
    type: String,
    required: false,
    default: undefined
  }
})
</script>

<style scoped>
.project-card {
  background: linear-gradient(#ffffff, #ffffff) padding-box,
              radial-gradient(1200px circle at var(--mx, 50%) var(--my, 0%), rgba(181, 23, 158, 0.18), rgba(67, 97, 238, 0.18)) border-box;
  border: 1px solid transparent;
}

.project-card:hover {
  --mx: 50%;
  --my: 100%;
}
</style>