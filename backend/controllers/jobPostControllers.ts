import { PrismaClient } from "@prisma/client";
import { JobPostInsert } from "../interfaces/jobPostInterface";

const prisma = new PrismaClient();
export const createOneJobPost = (dataClause: JobPostInsert) => {
  return prisma.jobPost.create({
    data: dataClause,
  });
};
