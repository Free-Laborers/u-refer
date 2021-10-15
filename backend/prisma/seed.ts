import { PrismaClient } from '@prisma/client';
import { createEmployee, createCandidate, createJobPost, createReferral, addTags, createTag } from "./factories"

const prisma = new PrismaClient()

const clearAllTables = async () => {
  await Promise.all([
    prisma.employee.deleteMany({}),
    prisma.candidate.deleteMany({}),
    prisma.tag.deleteMany({}),
    prisma.postToTag.deleteMany({}),
    prisma.referral.deleteMany({}),
    prisma.jobPost.deleteMany({}),
  ])
}

const main = async () => {
  await clearAllTables()
  await createTag({ name: 'React' })
  await createTag({ name: 'Angular' })
  await createTag({ name: 'Another' })
  await createTag({ name: 'Test' })
  
  
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
