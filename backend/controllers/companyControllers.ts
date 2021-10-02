import { Company, PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllCompanies = (): Promise<Company[]> => {
  return prisma.company.findMany();
};

export const getSingleCompany = (companyId: string) =>
  prisma.company.findUnique({
    where: {
      id: companyId,
    },
  });

export const createSingleCompany = (companyTitle: string) =>
  prisma.company.create({
    data: {
      name: companyTitle,
    },
  });
