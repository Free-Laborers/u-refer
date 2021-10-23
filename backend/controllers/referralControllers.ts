import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

export const createOneReferral = (dataClause: Prisma.ReferralCreateInput) => {
  return prisma.referral.create({ data: dataClause });
};
