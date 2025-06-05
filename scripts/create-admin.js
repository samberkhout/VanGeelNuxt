import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const [,, email, password] = process.argv

if (!email || !password) {
  console.log('Usage: npm run create:admin -- <email> <password>')
  process.exit(1)
}

async function main () {
  const hashed = await bcrypt.hash(password, 10)
  const user = await prisma.user.upsert({
    where: { email },
    update: { password: hashed, role: 'ADMIN' },
    create: { email, password: hashed, role: 'ADMIN' }
  })
  console.log(`Admin user ready: ${user.email}`)
}

main()
  .catch(err => console.error(err))
  .finally(() => prisma.$disconnect())
