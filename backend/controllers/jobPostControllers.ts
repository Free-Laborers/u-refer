import { PrismaClient } from "@prisma/client";
import { JobPostInsert } from "../interfaces/jobPostInterface";

const prisma = new PrismaClient();
export const createOneJobPost = (dataClause: JobPostInsert) => {
  return prisma.jobPost.create({
    data: dataClause,
  });
};
export const getJobPostings = () => {
  return prisma.jobPost.findMany({
    include: {
      PostToTag: true,
    },
  });
};
