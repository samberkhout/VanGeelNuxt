// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@sidebase/nuxt-auth'],
  auth: {
    origin: process.env.AUTH_ORIGIN || 'http://localhost:3000',
    enableGlobalAppMiddleware: true,
    session: {
      strategy: 'database'
    },
    providers: [
      {
        provider: 'credentials',
        type: 'credentials',
        credentials: {
          email: { label: 'Email', type: 'text' },
          password: { label: 'Password', type: 'password' }
        },
        authorize: async (credentials: any) => {
          // TODO replace with real validation
          if (credentials.email && credentials.password) {
            return { id: 1, email: credentials.email }
          }
          return null
        }
      }
    ]
  }
})
