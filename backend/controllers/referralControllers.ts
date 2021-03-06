import { PrismaClient, Prisma, Referral } from "@prisma/client";
const prisma = new PrismaClient();

export const createOneReferral = (dataClause: Prisma.ReferralCreateInput) => {
  return prisma.referral.create({ data: dataClause });
};

export const patchReferralById = (referralId: string, newData: Referral) => {
  return prisma.referral.update({
    where: {
      id: referralId
    },
    data: newData
  })
}

export const getReferralAndJobPostById = (referralId: string) => {
  return prisma.referral.findUnique({
    where: {
      id: referralId
    },
    include: {
      JobPost: true
    }
  });
}

export const getReferralsFromEmployeeId = async ({ userId, page }: { userId: string, page: number }) => {
  const PAGE_SIZE = 10
  const whereClause = {
    employeeId: {
      equals: userId
    }
  }
  const data = await prisma.referral.findMany({
    where: whereClause,
    include: {
      Candidate: true,
      JobPost: {
        include: {
          PostToTag: {
            include: {
              Tag: true,
            }
          }
        }
      },
    },
    skip: page * PAGE_SIZE,
    take: PAGE_SIZE,
  })
  // console.log(`data`, data)
  const numResults = await prisma.referral.count({ where: whereClause });
  return { data, numResults }
};

export const getReferralsFromJobPostId = (jobId: string) => {
  return prisma.referral.findMany({
    where: {
      jobPostId: {
        equals: jobId
      }
    },
    include: {
      Candidate: true,
    }
  })
};
