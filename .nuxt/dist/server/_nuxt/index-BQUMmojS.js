import { _ as _export_sfc, d as __nuxt_component_8 } from "../server.mjs";
import { resolveDirective, mergeProps, useSSRContext, ref } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrGetDirectiveProps, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import "ofetch";
import "#internal/nuxt/paths";
import "C:/Users/Martin/Downloads/personal_website_rev2/personal_website/node_modules/hookable/dist/index.mjs";
import "C:/Users/Martin/Downloads/personal_website_rev2/personal_website/node_modules/unctx/dist/index.mjs";
import "C:/Users/Martin/Downloads/personal_website_rev2/personal_website/node_modules/h3/dist/index.mjs";
import "vue-router";
import "C:/Users/Martin/Downloads/personal_website_rev2/personal_website/node_modules/radix3/dist/index.mjs";
import "C:/Users/Martin/Downloads/personal_website_rev2/personal_website/node_modules/defu/dist/defu.mjs";
import "C:/Users/Martin/Downloads/personal_website_rev2/personal_website/node_modules/ufo/dist/index.mjs";
const _sfc_main$3 = {
  __name: "ExperienceCard",
  __ssrInlineRender: true,
  props: {
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
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_tilt = resolveDirective("tilt");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "exp-card" }, _attrs, ssrGetDirectiveProps(_ctx, _directive_tilt, 5)))} data-v-2499915b><h3 data-v-2499915b>${ssrInterpolate(__props.title)}</h3><p class="duration" data-v-2499915b>${ssrInterpolate(__props.duration)}</p><ul data-v-2499915b><!--[-->`);
      ssrRenderList(__props.bullets, (bullet, index2) => {
        _push(`<li data-v-2499915b>${ssrInterpolate(bullet)}</li>`);
      });
      _push(`<!--]--></ul></div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ExperienceCard.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-2499915b"]]);
const _sfc_main$2 = {
  __name: "ProjectCard",
  __ssrInlineRender: true,
  props: {
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
      default: void 0
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_tilt = resolveDirective("tilt");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "project-card" }, _attrs, ssrGetDirectiveProps(_ctx, _directive_tilt, 6)))} data-v-47adc72d>`);
      if (__props.image) {
        _push(`<img${ssrRenderAttr("src", __props.image)}${ssrRenderAttr("alt", __props.title + " image")} data-v-47adc72d>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="project-content" data-v-47adc72d><h3 data-v-47adc72d>${ssrInterpolate(__props.title)}</h3><p data-v-47adc72d>${ssrInterpolate(__props.description)}</p><div class="tags" data-v-47adc72d><!--[-->`);
      ssrRenderList(__props.tags, (tag, index2) => {
        _push(`<span class="tag" data-v-47adc72d>${ssrInterpolate(tag)}</span>`);
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProjectCard.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-47adc72d"]]);
const _sfc_main$1 = {
  __name: "ProfileTabs",
  __ssrInlineRender: true,
  setup(__props) {
    const activeTab = ref("about");
    const tabs = [
      { id: "about", name: "About", icon: "👨‍💻" },
      { id: "experience", name: "Experience", icon: "💼" },
      { id: "education", name: "Education", icon: "🎓" },
      { id: "skills", name: "Skills", icon: "🛠️" },
      { id: "projects", name: "Projects", icon: "🚀" }
    ];
    const experiences = [
      {
        title: "Senior Fullstack Developer · Annotaid (Medical Annotation & Education Platform)",
        duration: "Sep 2023 – May 2025 · 1 yr 9 mos",
        bullets: [
          "Developed specialized annotation tools for histopathological images, enabling precise labeling, classification, and segmentation of cancerous cells and pathological structures.",
          "Integrated AI-powered assistance for image annotation, including visual hints highlighting regions of interest and textual suggestions generated from AI models to guide annotators.",
          "Contributed to both frontend and backend development using Vue.js, React, Node.js, and Python (FastAPI/Flask), ensuring performance optimization and usability in high-resolution image handling."
        ]
      },
      {
        title: "Full‑stack Developer · Telecom Slovakia, s.r.o.",
        duration: "May 2022 – Present",
        bullets: [
          "Designed and implemented an internal application to provision OpenStack/VMware servers, plus several supporting modules.",
          "Worked with Vue.js, Flask, PostgreSQL, Quasar, Kubernetes and Docker to build scalable, secure solutions.",
          "Defined testing strategies using pytest and Robot Framework for unit and GUI tests."
        ]
      },
      {
        title: "Freelance Full‑stack Developer",
        duration: "Jan 2022 – Present (3+ years)",
        bullets: [
          "Delivered custom web applications and mobile solutions for diverse clients across various industries.",
          "Specialized in Vue.js, React, Node.js, and Python ecosystems with modern deployment practices.",
          "Managed complete project lifecycles from requirements gathering to production deployment and maintenance."
        ]
      },
      {
        title: "Co‑founder & Full‑stack Developer · Fit‑Life Platform",
        duration: "Sept 2024 – Jan 2025",
        bullets: [
          "Created a modern fitness and nutrition tracking application featuring personalised onboarding and real‑time analytics.",
          "Integrated Google authentication and designed premium upsell flows for advanced insights and community engagement.",
          "Used Vue.js, Flask, Quasar, PostgreSQL, Elastic and Docker for robust deployment."
        ]
      },
      {
        title: "Full‑stack Developer · UXtweak j.s.a.",
        duration: "Jan 2021 – May 2022",
        bullets: [
          "Developed responsive front‑ends using Quasar (Vue.js) for usability testing tools.",
          "Built scalable back‑end services with Adonis (Node.js) and optimised PostgreSQL schemas.",
          "Implemented Elasticsearch‑powered search and analytics and orchestrated Docker containers for deployment."
        ]
      }
    ];
    const education = [
      {
        degree: "Master of Intelligent Software Systems",
        institution: "Faculty of Informatics and Information Technologies, STU Bratislava",
        years: "2023 – 2025"
      },
      {
        degree: "Bachelor of Computer Science",
        institution: "Faculty of Informatics and Information Technologies, STU Bratislava",
        years: "2019 – 2023"
      }
    ];
    const skills = [
      "Vue.js (Options & Composition API)",
      "Quasar",
      "Nuxt",
      "JavaScript / TypeScript",
      "Python & Flask",
      "Node.js / Adonis.js",
      "PostgreSQL & SQL",
      "Docker & Kubernetes",
      "HTML5 & CSS3",
      "Tailwind & SCSS",
      "Figma & Axure",
      "Elasticsearch",
      "React & React Native"
    ];
    const projects = [
      {
        title: "NFT Tower Defense Game",
        description: "Designed and implemented core gameplay mechanics for a tower‑defense game built in Unity with NFT integration.",
        tags: ["Unity", "C#", "NFT"],
        image: void 0
      },
      {
        title: "Stroke Rehabilitation Web App",
        description: "Built a platform to help doctors monitor patient recovery with interactive games and detailed statistics.",
        tags: ["Quasar", "Flask", "Docker", "PostgreSQL"],
        image: void 0
      },
      {
        title: "Annotaid",
        description: "Created an Electron application for manual and AI‑assisted annotation of histopathology images.",
        tags: ["React", "Next.js", "Docker"],
        image: void 0
      },
      {
        title: "Slick Communication Platform",
        description: "Developed a real‑time messaging application combining features of Slack and Discord.",
        tags: ["Quasar", "Adonis.js", "PostgreSQL", "Nuxt"],
        image: void 0
      },
      {
        title: "C Assignment Compiler",
        description: "Designed a web tool for teachers to create C programming assignments and automatically test student submissions.",
        tags: ["Quasar", "Flask", "Docker", "PostgreSQL"],
        image: void 0
      },
      {
        title: "Superjumprio",
        description: "A side‑scrolling platformer inspired by Super Mario built using vanilla JavaScript and the Canvas API.",
        tags: ["JavaScript", "HTML5", "CSS3"],
        image: void 0
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ExperienceCard = __nuxt_component_0;
      const _component_ProjectCard = __nuxt_component_1;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "profile-tabs-section" }, _attrs))} data-v-7f5ec5f7><div class="container" data-v-7f5ec5f7><div class="tabs-container" data-aos="fade-up" data-v-7f5ec5f7><div class="tab-buttons" data-v-7f5ec5f7><!--[-->`);
      ssrRenderList(tabs, (tab, index2) => {
        _push(`<button class="${ssrRenderClass(["tab-btn", { active: activeTab.value === tab.id }])}"${ssrRenderAttr("data-tab-id", tab.id)} data-aos="zoom-in"${ssrRenderAttr("data-aos-delay", index2 * 80)} data-v-7f5ec5f7><span class="tab-icon" data-v-7f5ec5f7>${ssrInterpolate(tab.icon)}</span> ${ssrInterpolate(tab.name)}</button>`);
      });
      _push(`<!--]--></div><div class="tab-content" data-v-7f5ec5f7>`);
      if (activeTab.value === "about") {
        _push(`<div class="tab-panel" data-aos="fade-in" data-v-7f5ec5f7><h2 data-v-7f5ec5f7>About Me</h2><div class="about-content" data-v-7f5ec5f7><p data-v-7f5ec5f7> Equipped with a master&#39;s degree in Information Technology and nearly five years of practical experience, I am a dedicated full‑stack developer focusing on Vue.js. I&#39;m valued for my adaptability, communication skills and ability to quickly learn new technologies. I continually seek opportunities to broaden my knowledge and innovate within the IT sector. </p></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (activeTab.value === "experience") {
        _push(`<div class="tab-panel" data-aos="fade-in" data-v-7f5ec5f7><h2 data-v-7f5ec5f7>Experience</h2><div class="experience-cards" data-v-7f5ec5f7><!--[-->`);
        ssrRenderList(experiences, (exp, index2) => {
          _push(ssrRenderComponent(_component_ExperienceCard, {
            key: index2,
            title: exp.title,
            duration: exp.duration,
            bullets: exp.bullets,
            "data-aos": "fade-up",
            "data-aos-delay": index2 * 80
          }, null, _parent));
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (activeTab.value === "education") {
        _push(`<div class="tab-panel" data-aos="fade-in" data-v-7f5ec5f7><h2 data-v-7f5ec5f7>Education</h2><ul class="education-list" data-v-7f5ec5f7><!--[-->`);
        ssrRenderList(education, (edu, index2) => {
          _push(`<li data-aos="fade-up"${ssrRenderAttr("data-aos-delay", index2 * 80)} data-v-7f5ec5f7><div class="degree" data-v-7f5ec5f7>${ssrInterpolate(edu.degree)}</div><div class="institution" data-v-7f5ec5f7>${ssrInterpolate(edu.institution)}</div><div class="years" data-v-7f5ec5f7>${ssrInterpolate(edu.years)}</div></li>`);
        });
        _push(`<!--]--></ul></div>`);
      } else {
        _push(`<!---->`);
      }
      if (activeTab.value === "skills") {
        _push(`<div class="tab-panel" data-aos="fade-in" data-v-7f5ec5f7><h2 data-v-7f5ec5f7>Skills</h2><div class="skills-list" data-v-7f5ec5f7><!--[-->`);
        ssrRenderList(skills, (skill, index2) => {
          _push(`<span class="skill-tag" data-aos="zoom-in"${ssrRenderAttr("data-aos-delay", index2 * 40)} data-v-7f5ec5f7>${ssrInterpolate(skill)}</span>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (activeTab.value === "projects") {
        _push(`<div class="tab-panel" data-aos="fade-in" data-v-7f5ec5f7><h2 data-v-7f5ec5f7>Some Favourite Projects</h2><div class="project-grid" data-v-7f5ec5f7><!--[-->`);
        ssrRenderList(projects, (project, index2) => {
          _push(ssrRenderComponent(_component_ProjectCard, {
            key: index2,
            title: project.title,
            description: project.description,
            tags: project.tags,
            image: project.image,
            "data-aos": "fade-up",
            "data-aos-delay": index2 * 80
          }, null, _parent));
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></section>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProfileTabs.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_7 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-7f5ec5f7"]]);
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_GradientMesh = __nuxt_component_8;
      const _component_MagneticParticles = __nuxt_component_8;
      const _component_FloatingIcons = __nuxt_component_8;
      const _component_FlyingBirds = __nuxt_component_8;
      const _component_ContactHeart = __nuxt_component_8;
      const _component_WelcomeBird = __nuxt_component_8;
      const _component_OrbitingRocket = __nuxt_component_8;
      const _component_ProfileTabs = __nuxt_component_7;
      const _component_DevGames = __nuxt_component_8;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-c70f2ff3>`);
      _push(ssrRenderComponent(_component_GradientMesh, null, null, _parent));
      _push(ssrRenderComponent(_component_MagneticParticles, null, null, _parent));
      _push(ssrRenderComponent(_component_FloatingIcons, null, null, _parent));
      _push(ssrRenderComponent(_component_FlyingBirds, null, null, _parent));
      _push(ssrRenderComponent(_component_ContactHeart, null, null, _parent));
      _push(`<section class="hero" data-v-c70f2ff3><div class="hero-content" data-v-c70f2ff3><div class="hero-icons" data-v-c70f2ff3><span class="knight-icon" data-v-c70f2ff3>⚔️</span><span class="laptop-icon" data-v-c70f2ff3> 💻 `);
      _push(ssrRenderComponent(_component_WelcomeBird, null, null, _parent));
      _push(`</span></div><h1 data-v-c70f2ff3><span class="name-text" data-v-c70f2ff3>Martin Saraka</span><span class="title-subtitle" data-v-c70f2ff3>Elite Full-Stack Developer</span></h1><p class="hero-description" data-v-c70f2ff3> Full‑stack developer passionate about building scalable and intuitive web applications with <span class="highlight" data-v-c70f2ff3>enterprise-grade precision</span> and <span class="highlight" data-v-c70f2ff3>cutting-edge technology</span>. </p><div class="hero-actions" data-v-c70f2ff3><a href="#contact" class="cta primary" data-v-c70f2ff3>Get in touch</a><a href="javascript:void(0)" class="cta secondary" data-v-c70f2ff3>View Portfolio</a></div><div class="badge" data-v-c70f2ff3><span class="dot" data-v-c70f2ff3></span> Premium Full‑Stack Expert <span class="shield-icon" data-v-c70f2ff3>⭐</span></div><div class="hero-stats" data-v-c70f2ff3><div class="stat" data-v-c70f2ff3><span class="stat-icon" data-v-c70f2ff3>⚡</span><strong data-v-c70f2ff3>5+</strong><span data-v-c70f2ff3>years exp.</span></div><div class="stat productivity-stat" data-v-c70f2ff3><span class="stat-icon" style="${ssrRenderStyle({ "opacity": "0" })}" data-v-c70f2ff3>🚀</span><strong data-v-c70f2ff3>10×</strong><span data-v-c70f2ff3>productivity</span>`);
      _push(ssrRenderComponent(_component_OrbitingRocket, null, null, _parent));
      _push(`</div><div class="stat" data-v-c70f2ff3><span class="stat-icon" data-v-c70f2ff3>🏆</span><strong data-v-c70f2ff3>20+</strong><span data-v-c70f2ff3>projects</span></div></div></div><span class="orb orb-a" aria-hidden="true" data-v-c70f2ff3></span><span class="orb orb-b" aria-hidden="true" data-v-c70f2ff3></span><span class="orb orb-c" aria-hidden="true" data-v-c70f2ff3></span></section>`);
      _push(ssrRenderComponent(_component_ProfileTabs, null, null, _parent));
      _push(`<section id="games" class="game-section" data-v-c70f2ff3><div class="container" data-v-c70f2ff3>`);
      _push(ssrRenderComponent(_component_DevGames, null, null, _parent));
      _push(`</div></section><section id="contact" class="contact" data-v-c70f2ff3><h2 data-aos="fade-up" data-v-c70f2ff3>Contact</h2><div class="info" data-aos="fade-up" data-aos-delay="100" data-v-c70f2ff3><p data-v-c70f2ff3>If you&#39;d like to collaborate or just say hi, feel free to reach out!</p></div><div class="links" data-aos="zoom-in" data-aos-delay="180" data-v-c70f2ff3><a href="mailto:martin.saraka1@gmail.com" data-v-c70f2ff3>martin.saraka1@gmail.com</a> · <a href="tel:+421917566722" data-v-c70f2ff3>+421 917 566 722</a> · <a href="https://www.linkedin.com/in/martin-saraka-3140a5166/" target="_blank" rel="noopener" data-v-c70f2ff3>LinkedIn</a></div></section></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c70f2ff3"]]);
export {
  index as default
};
//# sourceMappingURL=index-BQUMmojS.js.map
