<template>
  <section class="profile-tabs-section">
    <div class="container">
      <div class="tabs-container" data-aos="fade-up">
        <div class="tab-buttons">
          <button 
            v-for="(tab, index) in tabs" 
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="['tab-btn', { active: activeTab === tab.id }]"
            :data-tab-id="tab.id"
            data-aos="zoom-in"
            :data-aos-delay="index * 80"
          >
            <span class="tab-icon">{{ tab.icon }}</span>
            {{ tab.name }}
          </button>
        </div>
        
        <div class="tab-content">
          <!-- About Tab -->
          <div v-if="activeTab === 'about'" class="tab-panel" data-aos="fade-in">
            <h2>About Me</h2>
            <div class="about-content">
              <p>
                Equipped with a master's degree in Information Technology and six
                years of practical experience, I am a dedicated full‑stack developer
                focusing on Vue.js and AI intergrations. I'm valued for my adaptability, communication
                skills and ability to quickly learn new technologies. I continually
                seek opportunities to broaden my knowledge and innovate within the
                IT sector.
              </p>
            </div>
          </div>

          <!-- Experience Tab -->
          <div v-if="activeTab === 'experience'" class="tab-panel" data-aos="fade-in">
            <div class="experience-header">
              <h2>Working experience</h2>
              <div class="view-toggle">
                <button 
                  @click="experienceView = 'classic'"
                  :class="['toggle-btn', { active: experienceView === 'classic' }]"
                >
                  📋 Classic View
                </button>
                <button 
                  @click="experienceView = 'gallery'"
                  :class="['toggle-btn', { active: experienceView === 'gallery' }]"
                >
                  🎯 Shooting Gallery
                </button>
              </div>
            </div>
            
            <!-- Classic View -->
            <div v-if="experienceView === 'classic'" class="experience-cards">
              <ExperienceCard
                v-for="(exp, index) in experiences"
                :key="index"
                :title="exp.title"
                :duration="exp.duration"
                :bullets="exp.bullets"
                data-aos="fade-up"
                :data-aos-delay="index * 80"
              />
            </div>
            
            <!-- Shooting Gallery View -->
            <ShootingGallery 
              v-else 
              :experiences="experiences"
            />
          </div>

          <!-- Education Tab -->
          <div v-if="activeTab === 'education'" class="tab-panel" data-aos="fade-in">
            <h2>Education</h2>
            <ul class="education-list">
              <li v-for="(edu, index) in education" :key="index" data-aos="fade-up" :data-aos-delay="index * 80">
                <div class="degree">{{ edu.degree }}</div>
                <div class="institution">{{ edu.institution }}</div>
                <div class="years">{{ edu.years }}</div>
              </li>
            </ul>
          </div>

          <!-- Skills Tab -->
          <div v-if="activeTab === 'skills'" class="tab-panel" data-aos="fade-in">
            <h2>Skills</h2>
            <div class="skills-list">
              <span
                v-for="(skill, index) in skills"
                :key="index"
                class="skill-tag"
                data-aos="zoom-in"
                :data-aos-delay="index * 40"
              >{{ skill }}</span>
            </div>
          </div>

          <!-- Projects Tab -->
          <div v-if="activeTab === 'projects'" class="tab-panel" data-aos="fade-in">
            <h2>Some Favourite Projects</h2>
            <div class="project-grid">
              <ProjectCard
                v-for="(project, index) in projects"
                :key="index"
                :title="project.title"
                :description="project.description"
                :tags="project.tags"
                :image="project.image"
                data-aos="fade-up"
                :data-aos-delay="index * 80"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('about')
const experienceView = ref('classic') // 'classic' or 'gallery'

const tabs = [
  { id: 'about', name: 'About', icon: '👨‍💻' },
  { id: 'experience', name: 'Experience', icon: '💼' },
  { id: 'education', name: 'Education', icon: '🎓' },
  { id: 'skills', name: 'Skills', icon: '🛠️' },
  { id: 'projects', name: 'Projects', icon: '🚀' }
]

// Define the data for experiences
const experiences = [
  {
    title: 'Lead Frontend Developer · TME solutions s.r.o.',
    duration: 'Apr 2025 – Aug 2025 · 5 mos',
    bullets: [
      'Led the frontend team and designed architecture using Vue.js, Quasar, React, and TypeScript for medical applications.',
      'Developed modules for doctors and patients including e-documentation, appointment scheduling, and data visualization.',
      'Integrated AI for medical image processing and coordinated with backend team (FastAPI, PostgreSQL).',
      'Managed scaling, code reviews, design system implementation, and delivery quality standards.'
    ]
  },
  {
    title: 'Senior Fullstack Developer · SYNOT Games SK, s.r.o.',
    duration: 'Jan 2025 – Apr 2025 · 4 mos',
    bullets: [
      'Developed and maintained internal applications for online gaming platform.',
      'Built responsive frontends using Vue.js, React, and Tailwind with emphasis on performance.',
      'Implemented backend services in Node.js and Flask, optimizing APIs for high load scenarios.',
      'Integrated payment systems and security mechanisms with close collaboration with UX and QA teams.'
    ]
  },
  {
    title: 'Senior Fullstack Developer · Annotaid (Medical Annotation & Education Platform)',
    duration: 'Sep 2023 – Apr 2025 · 1 yr 8 mos',
    bullets: [
      'Developed specialized annotation tools for histopathological images, enabling precise labeling, classification, and segmentation of cancerous cells and pathological structures.',
      'Created educational modules with role-based access, quizzes, and knowledge tests for medical students.',
      'Integrated AI-powered assistance for image annotation, including visual hints highlighting regions of interest, textual suggestions, and chatbot functionality.',
      'Contributed to both frontend and backend development using Vue.js, React, Node.js, and Python (FastAPI/Flask), ensuring performance optimization and usability in high-resolution image handling.'
    ]
  },
  {
    title: 'Senior Fullstack Developer · Telecom Slovakia, s.r.o.',
    duration: 'May 2022 – Present · 3 yrs',
    bullets: [
      'Designed and implemented an internal application to provision OpenStack/VMware servers, plus several supporting modules.',
      'Worked with Vue.js (Quasar), Flask, PostgreSQL, Kubernetes and Docker to build scalable, secure solutions.',
      'Defined testing strategies using pytest and Robot Framework for unit and GUI tests.',
      'Collaborated on implementation of digital signatures for internal documents.'
    ]
  },
  {
    title: 'Freelance Full‑stack Developer',
    duration: 'Jan 2022 – Present (3+ years)',
    bullets: [
      'Delivered custom web applications and mobile solutions for diverse clients across various industries.',
      'Specialized in Vue.js, React, Node.js, and Python ecosystems with modern deployment practices.',
      'Managed complete project lifecycles from requirements gathering to production deployment and maintenance.'
    ]
  },
  {
    title: 'Co‑founder & Lead Fullstack Developer · Fitness & Nutrition Tracking App (Startup)',
    duration: 'Sep 2024 – Jan 2025 · 5 mos',
    bullets: [
      'Co-founded the project and designed full architecture including frontend and backend (Vue.js, Quasar, Flask, PostgreSQL).',
      'Created a modern fitness and nutrition tracking application with personalized onboarding, calorie tracking, workout planning, and community features.',
      'Implemented premium modules and integrated external APIs for enhanced functionality.',
      'Managed deployment and administration using Docker/Kubernetes infrastructure.'
    ]
  },
  {
    title: 'Fullstack Developer · Open Source - Bounty Hunt',
    duration: 'Apr 2024 – Sep 2024 · 6 mos',
    bullets: [
      'Implemented digital signature functionality (XAdES, PAdES, CAdES), eID integration, and electronic submissions.',
      'Built document validation and management workflows with complex forms.',
      'Ensured security, logging, and auditability of all processes with UX consultations for form design.',
      'Contributed to open-source projects focused on government and legal document processing.'
    ]
  },
  {
    title: 'Full‑stack Developer · UXtweak j.s.a.',
    duration: 'Jan 2021 – May 2022',
    bullets: [
      'Developed responsive front‑ends using Quasar (Vue.js) for usability testing tools.',
      'Built scalable back‑end services with Adonis (Node.js) and optimised PostgreSQL schemas.',
      'Implemented Elasticsearch‑powered search and analytics and orchestrated Docker containers for deployment.'
    ]
  }
]

// Define the data for education
const education = [
  {
    degree: 'Master of Intelligent Software Systems',
    institution: 'Faculty of Informatics and Information Technologies, STU Bratislava',
    years: '2023 – 2025'
  },
  {
    degree: 'Bachelor of Computer Science',
    institution: 'Faculty of Informatics and Information Technologies, STU Bratislava',
    years: '2019 – 2023'
  }
]

// Define the data for skills
const skills = [
  'Vue.js (Options & Composition API)',
  'Quasar',
  'Nuxt',
  'JavaScript / TypeScript',
  'Python & Flask',
  'Node.js / Adonis.js',
  'PostgreSQL & SQL',
  'Docker & Kubernetes',
  'HTML5 & CSS3',
  'Tailwind & SCSS',
  'Figma & Axure',
  'Elasticsearch',
  'React & React Native'
]

// Define the data for projects
const projects = [
  {
    title: 'NFT Tower Defense Game',
    description: 'Designed and implemented core gameplay mechanics for a tower‑defense game built in Unity with NFT integration.',
    tags: ['Unity', 'C#', 'NFT'],
    image: undefined
  },
  {
    title: 'Stroke Rehabilitation Web App',
    description: 'Built a platform to help doctors monitor patient recovery with interactive games and detailed statistics.',
    tags: ['Quasar', 'Flask', 'Docker', 'PostgreSQL'],
    image: undefined
  },
  {
    title: 'Annotaid',
    description: 'Created an Electron application for manual and AI‑assisted annotation of histopathology images.',
    tags: ['React', 'Next.js', 'Docker'],
    image: undefined
  },
  {
    title: 'Slick Communication Platform',
    description: 'Developed a real‑time messaging application combining features of Slack and Discord.',
    tags: ['Quasar', 'Adonis.js', 'PostgreSQL', 'Nuxt'],
    image: undefined
  },
  {
    title: 'C Assignment Compiler',
    description: 'Designed a web tool for teachers to create C programming assignments and automatically test student submissions.',
    tags: ['Quasar', 'Flask', 'Docker', 'PostgreSQL'],
    image: undefined
  },
  {
    title: 'Superjumprio',
    description: 'A side‑scrolling platformer inspired by Super Mario built using vanilla JavaScript and the Canvas API.',
    tags: ['JavaScript', 'HTML5', 'CSS3'],
    image: undefined
  }
]
</script>

<style scoped>
.profile-tabs-section {
  padding: 3rem 1rem;
  background: linear-gradient(135deg, rgba(245,245,250,0.8) 0%, rgba(223,224,248,0.9) 100%);
  position: relative;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.tabs-container {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 20px 60px rgba(0,0,0,0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.3);
}

.tab-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
  padding: 0.5rem;
  background: rgba(94,96,206,0.05);
  border-radius: 1rem;
  justify-content: center;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.75rem;
  background: transparent;
  color: var(--color-text);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  white-space: nowrap;
}

.tab-btn:hover {
  background: rgba(94,96,206,0.1);
  transform: translateY(-2px);
}

.tab-btn.active {
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  color: white;
  box-shadow: 0 8px 25px rgba(94,96,206,0.3);
  transform: translateY(-2px);
}

.tab-icon {
  font-size: 1.1rem;
}

.tab-content {
  min-height: 400px;
  position: relative;
}

.tab-panel {
  animation: fadeIn 0.4s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.tab-panel h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--color-primary);
  font-size: 2rem;
  font-weight: 600;
}

/* Experience header with toggle */
.experience-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.experience-header h2 {
  margin-bottom: 0;
}

.view-toggle {
  display: flex;
  gap: 0.5rem;
  background: rgba(94,96,206,0.05);
  padding: 0.4rem;
  border-radius: 0.75rem;
}

.toggle-btn {
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 0.5rem;
  background: transparent;
  color: var(--color-text);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  white-space: nowrap;
}

.toggle-btn:hover {
  background: rgba(94,96,206,0.1);
  transform: translateY(-1px);
}

.toggle-btn.active {
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  color: white;
  box-shadow: 0 4px 15px rgba(94,96,206,0.3);
}

/* About styles */
.about-content {
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
  color: var(--color-text);
  line-height: 1.7;
  font-size: 1.1rem;
}

/* Experience styles */
.experience-cards {
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 1rem 0.5rem;
  margin: 0 auto;
  max-width: 100%;
  /* Hide scrollbar but keep functionality */
  scrollbar-width: thin;
  scrollbar-color: rgba(139, 92, 246, 0.3) rgba(0, 0, 0, 0.1);
}

.experience-cards::-webkit-scrollbar {
  height: 8px;
}

.experience-cards::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
}

.experience-cards::-webkit-scrollbar-thumb {
  background: rgba(139, 92, 246, 0.4);
  border-radius: 10px;
}

.experience-cards::-webkit-scrollbar-thumb:hover {
  background: rgba(139, 92, 246, 0.6);
}

/* Each experience card should have fixed width */
.experience-cards > * {
  flex: 0 0 calc(33.333% - 1rem);
  min-width: 320px;
  max-width: 400px;
}

/* Education styles */
.education-list {
  max-width: 600px;
  margin: 0 auto;
  padding-left: 0;
  list-style: none;
}

.education-list li {
  margin-bottom: 1.5rem;
  position: relative;
  padding-left: 2rem;
  padding: 1.5rem;
  background: rgba(255,255,255,0.7);
  border-radius: 0.75rem;
  border-left: 4px solid var(--color-accent);
  margin-bottom: 1rem;
}

.education-list .degree {
  font-weight: 600;
  color: var(--color-secondary);
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.education-list .institution {
  font-style: italic;
  color: var(--color-text);
  margin-bottom: 0.25rem;
}

.education-list .years {
  color: var(--color-accent);
  font-size: 0.9rem;
  font-weight: 500;
}

/* Skills styles */
.skills-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.8rem;
  max-width: 800px;
  margin: 0 auto;
}

.skill-tag {
  background: linear-gradient(135deg, #8b5cf6, #a855f7);
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 2rem;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255,255,255,0.2);
  box-shadow: 0 4px 15px rgba(139,92,246,0.3);
}

.skill-tag:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 25px rgba(139,92,246,0.4);
}

/* Projects styles */
.project-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  max-width: 1000px;
  margin: 0 auto;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .profile-tabs-section {
    padding: 2rem 1rem;
  }
  
  .tabs-container {
    padding: 1.5rem;
  }
  
  .tab-buttons {
    flex-direction: column;
    gap: 0.3rem;
  }
  
  .tab-btn {
    justify-content: center;
    padding: 1rem;
    font-size: 0.85rem;
  }
  
  .tab-panel h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  .view-toggle {
    flex-direction: column;
    width: 100%;
  }
  
  .toggle-btn {
    width: 100%;
    padding: 0.8rem;
    font-size: 0.85rem;
  }
  
  .experience-cards {
    gap: 1rem;
  }
  
  .experience-cards > * {
    flex: 0 0 85%;
    min-width: 280px;
  }
  
  .project-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .about-content {
    font-size: 1rem;
    padding: 0 0.5rem;
  }
  
  .skills-list {
    gap: 0.6rem;
    padding: 0 0.5rem;
  }
  
  .skill-tag {
    font-size: 0.85rem;
    padding: 0.5rem 1rem;
  }
  
  .education-list {
    max-width: 100%;
    padding: 0 0.5rem;
  }
  
  .education-list li {
    padding: 1.2rem;
    margin-bottom: 0.8rem;
  }
}

@media (max-width: 600px) {
  .profile-tabs-section {
    padding: 1.5rem 0.8rem;
  }
  
  .tabs-container {
    padding: 1.2rem;
  }
  
  .tab-btn {
    padding: 0.8rem;
    font-size: 0.8rem;
  }
  
  .tab-panel h2 {
    font-size: 1.3rem;
    margin-bottom: 1.2rem;
  }
  
  .about-content {
    font-size: 0.95rem;
    line-height: 1.6;
  }
  
  .experience-cards > * {
    flex: 0 0 90%;
    min-width: 260px;
  }
  
  .skill-tag {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
  }
  
  .education-list li {
    padding: 1rem;
  }
  
  .education-list .degree {
    font-size: 1rem;
  }
  
  .education-list .institution {
    font-size: 0.9rem;
  }
  
  .education-list .years {
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .profile-tabs-section {
    padding: 1rem 0.5rem;
  }
  
  .tabs-container {
    padding: 1rem;
  }
  
  .tab-btn {
    padding: 0.7rem;
    font-size: 0.75rem;
  }
  
  .tab-panel h2 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
  
  .about-content {
    font-size: 0.9rem;
  }
  
  .experience-cards > * {
    flex: 0 0 95%;
    min-width: 240px;
  }
  
  .skill-tag {
    font-size: 0.75rem;
    padding: 0.35rem 0.7rem;
  }
  
  .education-list li {
    padding: 0.8rem;
  }
}
</style>
