import { PrismaClient } from '@prisma/client'
import { createEmployee, createCandidate, createJobPost, createReferral, addTags } from './factories'

const prisma = new PrismaClient();

const clearAllTables = async () => {
  await prisma.postToTag
    .deleteMany({})
    .then(_ => prisma.tag.deleteMany({}))
    .then(_ => prisma.referral.deleteMany({}))
    .then(_ => prisma.jobPost.deleteMany({}))
    .then(_ => prisma.candidate.deleteMany({}))
    .then(_ => prisma.employee.deleteMany({}))
}

const main = async () => {
  await clearAllTables();
  await createEmployee({ email: 'admin@test.com', isManager: true, password: 'test' })
  const manager = await createEmployee({ isManager: true });
  const employee = await createEmployee({ isManager: false });
  const candidate = await createCandidate();
  const jobPost = await createJobPost({
    hiringManagerId: manager.id,
    title: "1",
  });
  const jp2 = await createJobPost({ hiringManagerId: manager.id, title: "2" });
  const jp3 = await createJobPost({ hiringManagerId: manager.id, title: "3" });
  const jp4 = await createJobPost({ hiringManagerId: manager.id, title: "4" });
  const referral = await createReferral({
    employeeId: employee.id,
    jobPostId: jobPost.id,
    candidateId: candidate.id,
  });
  await addTags(jobPost, [
    "React",
    "Prisma",
    "Angular",
    "Dev Ops",
    "PostgreSQL",
  ]);
  await addTags(jp2, ["React", "Prisma", "Angular", "Dev Ops", "PostgreSQL"]);
  await addTags(jp3, ["React"]);
  await addTags(jp4, ["PostgreSQL"]);
};

main().catch(e => {
  console.error(e)
  process.exit(1)
})
