import { prisma } from '../prisma'
import { z } from 'zod'
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const schema = z.object({
    leverweek: z.number(),
    rasId: z.number(),
    opgepot: z.number(),
    weggegooid: z.number(),
    reden: z.string(),
    extraReden: z.string().optional()
  })
  const data = schema.parse(body)
  const session = await getServerSession(event)
  if (!session) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  return prisma.oppotten.create({ data })
})
