import { prisma } from '../prisma'
import { z } from 'zod'
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const schema = z.object({
    leverweek: z.number(),
    oppotweek: z.number(),
    rasId: z.number(),
    aantal: z.number(),
    locatieX: z.number().min(0).max(20),
    locatieY: z.number().min(0).max(20)
  })
  const data = schema.parse(body)
  const session = await getServerSession(event)
  if (!session) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  return prisma.trip.create({ data })
})
