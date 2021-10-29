import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();
export const getEmployees = (whereClause: Prisma.EmployeeWhereInput) => {
  // for the parameters that is not undefined, to sth.
  return prisma.employee.findMany({
    where: whereClause,
    include: {
      JobPost: true,
      Referral: true,
    },
  });
};

export const createOneEmployee = (dataClause: Prisma.EmployeeCreateInput) => {
  return prisma.employee.create({
    data: dataClause,
  });
};
