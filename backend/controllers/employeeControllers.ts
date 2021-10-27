import { PrismaClient } from "@prisma/client";
import { EmployeeInsert } from "../interfaces/employeeInterface";

const prisma = new PrismaClient();
export const getEmployees = (whereClause: Partial<EmployeeInsert>) => {
  // for the parameters that is not undefined, to sth.
  return prisma.employee.findMany({
    where: whereClause,
    include: {
      jobPost: true,
      Referral: true,
    },
  });
};

export const getEmployeeById = async (id: string) => {
  return prisma.employee.findUnique({
    where: {
      id
    }
  })
}

export const createOneEmployee = (dataClause: EmployeeInsert) => {
  return prisma.employee.create({
    data: dataClause,
  });
};
