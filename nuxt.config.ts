// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  typescript: {
    typeCheck: 'build',
  },
  runtimeConfig: {
    public: {
      // Overridden at runtime by NUXT_PUBLIC_API_BASE, which realestate-infrastructure
      // sets on the Cloud Run service to realestate-api's URL.
      apiBase: 'http://localhost:8080',
    },
  },
})
