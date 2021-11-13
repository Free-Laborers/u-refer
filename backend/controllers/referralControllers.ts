import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

export const createOneReferral = (dataClause: Prisma.ReferralCreateInput) => {
  return prisma.referral.create({ data: dataClause });
};

export const getReferralsFromEmployeeId = (userId: string) =>{
  return prisma.referral.findMany({
    where:{
      employeeId:{
        equals: userId
      }
    }
  })
};

export const getReferralsFromJobPostId = (jobId: string) =>{
  return prisma.referral.findMany({
    where:{
      jobPostId:{
        equals: jobId
      }
    }
  })
};
