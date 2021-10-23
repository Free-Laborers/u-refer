import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

export const createOneCandidate = (dataClause: Prisma.CandidateCreateInput) => {
  return prisma.candidate.create({ data: dataClause });
};

export const findOneCandidateWithEmail = (email: string) => {
  return prisma.candidate.findUnique({
    where: {
      email,
    },
  });
};

export const deleteOneCandidate = (id: string) => {
  return prisma.candidate.delete({
    where: {
      id,
    },
  });
};
