import { PrismaClient } from '@prisma/client';
import { createEmployee, createCandidate, createJobPost, createReferral, addTags } from "./factories"

const prisma = new PrismaClient()

const clearAllTables = async () => {
  await Promise.all([
    await prisma.postToTag.deleteMany({}),
    await prisma.tag.deleteMany({}),
    await prisma.referral.deleteMany({}),
    await prisma.jobPost.deleteMany({}),
    await prisma.candidate.deleteMany({}),
    await prisma.employee.deleteMany({}),
  ])
}

const main = async () => {
  await clearAllTables()
  const manager   = await createEmployee({ isManager: true })
  const employee  = await createEmployee({ isManager: false })
  const candidate = await createCandidate()
  const jobPost   = await createJobPost({ hiringManagerId: manager.id })
  await createJobPost({ hiringManagerId: manager.id })
  await createJobPost({ hiringManagerId: manager.id })
  await createJobPost({ hiringManagerId: manager.id })
  const referral  = await createReferral({ employeeId: employee.id, jobPostId: jobPost.id, candidateId: candidate.id })
  addTags(jobPost, ['React', 'Prisma', 'Angular', 'Dev Ops', 'PostgreSQL'])
  
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
