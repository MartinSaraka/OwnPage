

// Nuxt configuration for Martin Saraka's personal site.
// This configuration enables a custom global stylesheet and pulls in
// the Poppins font from Google Fonts to give the site a modern,
// approachable typeface. Metadata and title tags are also defined
// to improve SEO and provide meaningful descriptions when the site
// is shared on social media.

export default defineNuxtConfig({
  css: [
    '~/assets/css/main.css'
  ],
  app: {
    head: {
      title: 'Martin Saraka – Full‑stack Developer',
      meta: [
        { name: 'description', content: 'Portfolio and biography of Martin Saraka, a full‑stack developer focusing on modern web technologies.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap' }
      ]
    }
  },
  plugins: [
    '~/plugins/aos.client.ts',
    '~/plugins/tilt.client.ts',
    '~/plugins/lenis.client.ts'
  ],
  nitro: {
    preset: 'vercel',
    prerender: {
      routes: ['/']
    },
    compressPublicAssets: true
  },
  // Performance optimizations
  experimental: {
    payloadExtraction: false
  },
  vite: {
    build: {
      cssMinify: 'lightningcss'
    }
  },
  compatibilityDate: '2025-08-10'
})