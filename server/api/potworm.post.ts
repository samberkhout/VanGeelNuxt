import { prisma } from '../prisma'
import { z } from 'zod'
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const schema = z.object({
    jaar: z.number().min(1).max(9999),
    week: z.number().min(1).max(52),
    afdeling1: z.number().min(0),
    afdeling16: z.number().min(0)
  })
  const data = schema.parse(body)
  const session = await getServerSession(event)
  if (!session) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  return prisma.potworm.create({ data })
})
