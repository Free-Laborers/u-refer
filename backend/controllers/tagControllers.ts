import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export const getTags = () => {
  return prisma.tag.findMany({})
}
