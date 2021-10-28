import { PrismaClient } from "@prisma/client";
import {
  createEmployee,
  createCandidate,
  createJobPost,
  createReferral,
  addTags,
} from "./factories";

const prisma = new PrismaClient();

const clearAllTables = async () => {
  await prisma.postToTag.deleteMany({})
  .then(_ => prisma.tag.deleteMany({}))
  .then(_ => prisma.referral.deleteMany({}))
  .then(_ => prisma.jobPost.deleteMany({}))
  .then(_ => prisma.candidate.deleteMany({}))
  .then(_ => prisma.candidate.deleteMany({}))
  .then(_ => prisma.employee.deleteMany({}))
};

const main = async () => {
  await clearAllTables();
  const manager = await createEmployee({ isManager: true });
  const employee = await createEmployee({ isManager: false });
  const candidate = await createCandidate();
  const jobPost = await createJobPost({ hiringManagerId: manager.id });
  const referral = await createReferral({
    employeeId: employee.id,
    jobPostId: jobPost.id,
    candidateId: candidate.id,
  });
  //const user = await createEmployee({email: 'employee@test.com', password: 'test'})
  addTags(jobPost, ["React", "Prisma"]);
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
