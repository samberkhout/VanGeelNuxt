import { getCookie } from 'h3'
export default defineEventHandler((event) => {
  const session = getCookie(event, 'session')
  if (!session) return null
  return { user: { email: 'test@example.com' } }
})
