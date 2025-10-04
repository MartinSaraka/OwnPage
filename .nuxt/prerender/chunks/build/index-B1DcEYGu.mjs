import { _ as _export_sfc, d as __nuxt_component_8 } from './server.mjs';
import { ref, mergeProps, resolveDirective, useSSRContext } from 'file://C:/Users/Martin/Downloads/personal_website_rev2/personal_website/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrInterpolate, ssrGetDirectiveProps } from 'file://C:/Users/Martin/Downloads/personal_website_rev2/personal_website/node_modules/vue/server-renderer/index.mjs';
import 'file://C:/Users/Martin/Downloads/personal_website_rev2/personal_website/node_modules/ofetch/dist/node.mjs';
import '../_/renderer.mjs';
import 'file://C:/Users/Martin/Downloads/personal_website_rev2/personal_website/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file://C:/Users/Martin/Downloads/personal_website_rev2/personal_website/node_modules/h3/dist/index.mjs';
import 'file://C:/Users/Martin/Downloads/personal_website_rev2/personal_website/node_modules/ufo/dist/index.mjs';
import '../_/nitro.mjs';
import 'file://C:/Users/Martin/Downloads/personal_website_rev2/personal_website/node_modules/destr/dist/index.mjs';
import 'file://C:/Users/Martin/Downloads/personal_website_rev2/personal_website/node_modules/hookable/dist/index.mjs';
import 'file://C:/Users/Martin/Downloads/personal_website_rev2/personal_website/node_modules/node-mock-http/dist/index.mjs';
import 'file://C:/Users/Martin/Downloads/personal_website_rev2/personal_website/node_modules/unstorage/dist/index.mjs';
import 'file://C:/Users/Martin/Downloads/personal_website_rev2/personal_website/node_modules/unstorage/drivers/fs.mjs';
import 'file:///C:/Users/Martin/Downloads/personal_website_rev2/personal_website/node_modules/nuxt/dist/core/runtime/nitro/utils/cache-driver.js';
import 'file://C:/Users/Martin/Downloads/personal_website_rev2/personal_website/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file://C:/Users/Martin/Downloads/personal_website_rev2/personal_website/node_modules/ohash/dist/index.mjs';
import 'file://C:/Users/Martin/Downloads/personal_website_rev2/personal_website/node_modules/klona/dist/index.mjs';
import 'file://C:/Users/Martin/Downloads/personal_website_rev2/personal_website/node_modules/defu/dist/defu.mjs';
import 'file://C:/Users/Martin/Downloads/personal_website_rev2/personal_website/node_modules/scule/dist/index.mjs';
import 'file://C:/Users/Martin/Downloads/personal_website_rev2/personal_website/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file://C:/Users/Martin/Downloads/personal_website_rev2/personal_website/node_modules/pathe/dist/index.mjs';
import 'file://C:/Users/Martin/Downloads/personal_website_rev2/personal_website/node_modules/unhead/dist/server.mjs';
import 'file://C:/Users/Martin/Downloads/personal_website_rev2/personal_website/node_modules/devalue/index.js';
import 'file://C:/Users/Martin/Downloads/personal_website_rev2/personal_website/node_modules/unhead/dist/utils.mjs';
import 'file://C:/Users/Martin/Downloads/personal_website_rev2/personal_website/node_modules/unhead/dist/plugins.mjs';
import 'file://C:/Users/Martin/Downloads/personal_website_rev2/personal_website/node_modules/unctx/dist/index.mjs';
import 'file://C:/Users/Martin/Downloads/personal_website_rev2/personal_website/node_modules/vue-router/dist/vue-router.node.mjs';

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
      { id: "about", name: "About", icon: "\u{1F468}\u200D\u{1F4BB}" },
      { id: "experience", name: "Experience", icon: "\u{1F4BC}" },
      { id: "education", name: "Education", icon: "\u{1F393}" },
      { id: "skills", name: "Skills", icon: "\u{1F6E0}\uFE0F" },
      { id: "projects", name: "Projects", icon: "\u{1F680}" }
    ];
    const experiences = [
      {
        title: "Senior Fullstack Developer \xB7 Annotaid (Medical Annotation & Education Platform)",
        duration: "Sep 2023 \u2013 May 2025 \xB7 1 yr 9 mos",
        bullets: [
          "Developed specialized annotation tools for histopathological images, enabling precise labeling, classification, and segmentation of cancerous cells and pathological structures.",
          "Integrated AI-powered assistance for image annotation, including visual hints highlighting regions of interest and textual suggestions generated from AI models to guide annotators.",
          "Contributed to both frontend and backend development using Vue.js, React, Node.js, and Python (FastAPI/Flask), ensuring performance optimization and usability in high-resolution image handling."
        ]
      },
      {
        title: "Full\u2011stack Developer \xB7 Telecom Slovakia, s.r.o.",
        duration: "May 2022 \u2013 Present",
        bullets: [
          "Designed and implemented an internal application to provision OpenStack/VMware servers, plus several supporting modules.",
          "Worked with Vue.js, Flask, PostgreSQL, Quasar, Kubernetes and Docker to build scalable, secure solutions.",
          "Defined testing strategies using pytest and Robot Framework for unit and GUI tests."
        ]
      },
      {
        title: "Freelance Full\u2011stack Developer",
        duration: "Jan 2022 \u2013 Present (3+ years)",
        bullets: [
          "Delivered custom web applications and mobile solutions for diverse clients across various industries.",
          "Specialized in Vue.js, React, Node.js, and Python ecosystems with modern deployment practices.",
          "Managed complete project lifecycles from requirements gathering to production deployment and maintenance."
        ]
      },
      {
        title: "Co\u2011founder & Full\u2011stack Developer \xB7 Fit\u2011Life Platform",
        duration: "Sept 2024 \u2013 Jan 2025",
        bullets: [
          "Created a modern fitness and nutrition tracking application featuring personalised onboarding and real\u2011time analytics.",
          "Integrated Google authentication and designed premium upsell flows for advanced insights and community engagement.",
          "Used Vue.js, Flask, Quasar, PostgreSQL, Elastic and Docker for robust deployment."
        ]
      },
      {
        title: "Full\u2011stack Developer \xB7 UXtweak j.s.a.",
        duration: "Jan 2021 \u2013 May 2022",
        bullets: [
          "Developed responsive front\u2011ends using Quasar (Vue.js) for usability testing tools.",
          "Built scalable back\u2011end services with Adonis (Node.js) and optimised PostgreSQL schemas.",
          "Implemented Elasticsearch\u2011powered search and analytics and orchestrated Docker containers for deployment."
        ]
      }
    ];
    const education = [
      {
        degree: "Master of Intelligent Software Systems",
        institution: "Faculty of Informatics and Information Technologies, STU Bratislava",
        years: "2023 \u2013 2025"
      },
      {
        degree: "Bachelor of Computer Science",
        institution: "Faculty of Informatics and Information Technologies, STU Bratislava",
        years: "2019 \u2013 2023"
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
        description: "Designed and implemented core gameplay mechanics for a tower\u2011defense game built in Unity with NFT integration.",
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
        description: "Created an Electron application for manual and AI\u2011assisted annotation of histopathology images.",
        tags: ["React", "Next.js", "Docker"],
        image: void 0
      },
      {
        title: "Slick Communication Platform",
        description: "Developed a real\u2011time messaging application combining features of Slack and Discord.",
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
        description: "A side\u2011scrolling platformer inspired by Super Mario built using vanilla JavaScript and the Canvas API.",
        tags: ["JavaScript", "HTML5", "CSS3"],
        image: void 0
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ExperienceCard = __nuxt_component_0;
      const _component_ProjectCard = __nuxt_component_1;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "profile-tabs-section" }, _attrs))} data-v-e556aced><div class="container" data-v-e556aced><div class="tabs-container" data-aos="fade-up" data-v-e556aced><div class="tab-buttons" data-v-e556aced><!--[-->`);
      ssrRenderList(tabs, (tab, index2) => {
        _push(`<button class="${ssrRenderClass(["tab-btn", { active: activeTab.value === tab.id }])}"${ssrRenderAttr("data-tab-id", tab.id)} data-aos="zoom-in"${ssrRenderAttr("data-aos-delay", index2 * 80)} data-v-e556aced><span class="tab-icon" data-v-e556aced>${ssrInterpolate(tab.icon)}</span> ${ssrInterpolate(tab.name)}</button>`);
      });
      _push(`<!--]--></div><div class="tab-content" data-v-e556aced>`);
      if (activeTab.value === "about") {
        _push(`<div class="tab-panel" data-aos="fade-in" data-v-e556aced><h2 data-v-e556aced>About Me</h2><div class="about-content" data-v-e556aced><p data-v-e556aced> Equipped with a master&#39;s degree in Information Technology and nearly five years of practical experience, I am a dedicated full\u2011stack developer focusing on Vue.js. I&#39;m valued for my adaptability, communication skills and ability to quickly learn new technologies. I continually seek opportunities to broaden my knowledge and innovate within the IT sector. </p></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (activeTab.value === "experience") {
        _push(`<div class="tab-panel" data-aos="fade-in" data-v-e556aced><h2 data-v-e556aced>Experience</h2><div class="experience-cards" data-v-e556aced><!--[-->`);
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
        _push(`<div class="tab-panel" data-aos="fade-in" data-v-e556aced><h2 data-v-e556aced>Education</h2><ul class="education-list" data-v-e556aced><!--[-->`);
        ssrRenderList(education, (edu, index2) => {
          _push(`<li data-aos="fade-up"${ssrRenderAttr("data-aos-delay", index2 * 80)} data-v-e556aced><div class="degree" data-v-e556aced>${ssrInterpolate(edu.degree)}</div><div class="institution" data-v-e556aced>${ssrInterpolate(edu.institution)}</div><div class="years" data-v-e556aced>${ssrInterpolate(edu.years)}</div></li>`);
        });
        _push(`<!--]--></ul></div>`);
      } else {
        _push(`<!---->`);
      }
      if (activeTab.value === "skills") {
        _push(`<div class="tab-panel" data-aos="fade-in" data-v-e556aced><h2 data-v-e556aced>Skills</h2><div class="skills-list" data-v-e556aced><!--[-->`);
        ssrRenderList(skills, (skill, index2) => {
          _push(`<span class="skill-tag" data-aos="zoom-in"${ssrRenderAttr("data-aos-delay", index2 * 40)} data-v-e556aced>${ssrInterpolate(skill)}</span>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (activeTab.value === "projects") {
        _push(`<div class="tab-panel" data-aos="fade-in" data-v-e556aced><h2 data-v-e556aced>Some Favourite Projects</h2><div class="project-grid" data-v-e556aced><!--[-->`);
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
const __nuxt_component_7 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-e556aced"]]);
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
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-e2728167>`);
      _push(ssrRenderComponent(_component_GradientMesh, null, null, _parent));
      _push(ssrRenderComponent(_component_MagneticParticles, null, null, _parent));
      _push(ssrRenderComponent(_component_FloatingIcons, null, null, _parent));
      _push(ssrRenderComponent(_component_FlyingBirds, null, null, _parent));
      _push(ssrRenderComponent(_component_ContactHeart, null, null, _parent));
      _push(`<section class="hero" data-v-e2728167><div class="hero-content" data-v-e2728167><div class="hero-icons" data-v-e2728167><span class="knight-icon" data-v-e2728167>\u2694\uFE0F</span><span class="laptop-icon" data-v-e2728167> \u{1F4BB} `);
      _push(ssrRenderComponent(_component_WelcomeBird, null, null, _parent));
      _push(`</span></div><h1 data-v-e2728167><span class="name-text" data-v-e2728167>Martin Saraka</span><span class="title-subtitle" data-v-e2728167>Elite Full-Stack Developer</span></h1><p class="hero-description" data-v-e2728167> Full\u2011stack developer passionate about building scalable and intuitive web applications with <span class="highlight" data-v-e2728167>enterprise-grade precision</span> and <span class="highlight" data-v-e2728167>cutting-edge technology</span>. </p><div class="hero-actions" data-v-e2728167><a href="#contact" class="cta primary" data-v-e2728167>Get in touch</a><a href="javascript:void(0)" class="cta secondary" data-v-e2728167>View Portfolio</a></div><div class="badge" data-v-e2728167><span class="dot" data-v-e2728167></span> Premium Full\u2011Stack Expert <span class="shield-icon" data-v-e2728167>\u2B50</span></div><div class="hero-stats" data-v-e2728167><div class="stat" data-v-e2728167><span class="stat-icon" data-v-e2728167>\u26A1</span><strong data-v-e2728167>5+</strong><span data-v-e2728167>years exp.</span></div><div class="stat productivity-stat" data-v-e2728167><strong data-v-e2728167>10\xD7</strong><span data-v-e2728167>productivity</span>`);
      _push(ssrRenderComponent(_component_OrbitingRocket, null, null, _parent));
      _push(`</div><div class="stat" data-v-e2728167><span class="stat-icon" data-v-e2728167>\u{1F3C6}</span><strong data-v-e2728167>20+</strong><span data-v-e2728167>projects</span></div></div></div><span class="orb orb-a" aria-hidden="true" data-v-e2728167></span><span class="orb orb-b" aria-hidden="true" data-v-e2728167></span><span class="orb orb-c" aria-hidden="true" data-v-e2728167></span></section>`);
      _push(ssrRenderComponent(_component_ProfileTabs, null, null, _parent));
      _push(`<section id="games" class="game-section" data-v-e2728167><div class="container" data-v-e2728167>`);
      _push(ssrRenderComponent(_component_DevGames, null, null, _parent));
      _push(`</div></section><section id="contact" class="contact" data-v-e2728167><h2 data-aos="fade-up" data-v-e2728167>Contact</h2><div class="info" data-aos="fade-up" data-aos-delay="100" data-v-e2728167><p data-v-e2728167>If you&#39;d like to collaborate or just say hi, feel free to reach out!</p></div><div class="links" data-aos="zoom-in" data-aos-delay="180" data-v-e2728167><a href="mailto:martin.saraka1@gmail.com" data-v-e2728167>martin.saraka1@gmail.com</a> \xB7 <a href="tel:+421917566722" data-v-e2728167>+421 917 566 722</a> \xB7 <a href="https://www.linkedin.com/in/martin-saraka-3140a5166/" target="_blank" rel="noopener" data-v-e2728167>LinkedIn</a></div></section></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e2728167"]]);

export { index as default };
//# sourceMappingURL=index-B1DcEYGu.mjs.map
