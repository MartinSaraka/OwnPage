<template>
  <div>
    <GradientMesh v-if="!isMobile" />
    <MagneticParticles v-if="!isMobile" />
    <!-- Disable FloatingIcons and FlyingBirds on mobile for better performance -->
    <FloatingIcons v-if="!isMobile" />
    <ContactHeart />
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <div class="hero-icons">
          <span class="knight-icon">⚔️</span>
          <span class="laptop-icon">
            💻
            <WelcomeBird />
          </span>
        </div>
        <h1>
          <span class="name-text">Martin Saraka</span>
        </h1>
        <p class="hero-description">
          Full‑stack developer passionate about building scalable and intuitive web applications with
          <span class="highlight">enterprise-grade precision</span> and <span class="highlight">cutting-edge technology</span>.
        </p>
        <div class="hero-actions">
          <a href="#contact" class="cta primary">Get in touch</a>
          <a href="javascript:void(0)" @click="scrollToProjects" class="cta secondary">View Portfolio</a>
        </div>
        <div class="badge">
          <span class="dot"></span>
          Premium Full‑Stack Expert
          <span class="shield-icon">⭐</span>
        </div>
        <div class="hero-stats">
          <div class="stat">
            <span class="stat-icon">⚡</span>
            <strong>5+</strong>
            <span>years exp.</span>
          </div>
          <div class="stat productivity-stat">
            <strong>10×</strong>
            <span>productivity</span>
            <OrbitingRocket />
          </div>
          <div class="stat">
            <span class="stat-icon">🏆</span>
            <strong>20+</strong>
            <span>projects</span>
          </div>
        </div>
      </div>
      <!-- Decorative animated orbs -->
      <span class="orb orb-a" aria-hidden="true"></span>
      <span class="orb orb-b" aria-hidden="true"></span>
      <span class="orb orb-c" aria-hidden="true"></span>
    </section>

    <!-- Profile Tabs Section -->
    <ProfileTabs />

    <!-- Games Section -->
    <section id="games" class="game-section">
      <div class="container">
        <DevGames />
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact">
      <h2 data-aos="fade-up">Contact</h2>
      <div class="info" data-aos="fade-up" data-aos-delay="100">
        <p>If you'd like to collaborate or just say hi, feel free to reach out!</p>
      </div>
      <div class="links" data-aos="zoom-in" data-aos-delay="180">
        <a href="mailto:martin.saraka1@gmail.com">martin.saraka1@gmail.com</a>
        ·
        <a href="tel:+421917566722">+421 917 566 722</a>
        ·
        <a href="https://www.linkedin.com/in/martin-saraka-3140a5166/" target="_blank" rel="noopener">LinkedIn</a>
      </div>
    </section>
  </div>
</template>

<script setup>
// Page setup - data is now handled in ProfileTabs component
const { isMobile } = useDevice()

const scrollToProjects = () => {
  // First scroll to the profile tabs section
  const profileSection = document.querySelector('.profile-tabs-section')
  if (profileSection) {
    profileSection.scrollIntoView({ behavior: 'smooth' })
    
    // Then trigger the projects tab after a small delay
    setTimeout(() => {
      // Try to find and click the projects tab button
      const projectsTab = document.querySelector('[data-tab-id="projects"]') || 
                         document.querySelector('button:nth-child(5)') // 5th tab (projects)
      if (projectsTab) {
        projectsTab.click()
      }
    }, 500)
  }
}
</script>

<style scoped>
/* Scoped styles specific to this page can be added here if necessary. */
</style>