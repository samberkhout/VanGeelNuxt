// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@sidebase/nuxt-auth'],
  auth: {
    origin: process.env.AUTH_ORIGIN || 'http://localhost:3000',
    baseURL: '/api/auth',
    enableGlobalAppMiddleware: true,
    session: {
      strategy: 'jwt'
    },
    provider: {
      type: 'authjs',
      defaultProvider: 'credentials'
    }
  }
})
