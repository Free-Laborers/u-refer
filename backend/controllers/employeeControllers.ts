import { PrismaClient } from "@prisma/client";
import { EmployeeInsert } from "../interfaces/employeeInterface";

const prisma = new PrismaClient();
export const getEmployees = (whereClause: Partial<EmployeeInsert>) => {
  // for the parameters that is not undefined, to sth.
  return prisma.employee.findMany({
    where: whereClause,
    include: {
      JobPost: true,
      Referral: true,
    },
  });
};

export const getOneEmployeeWithEmail = (email: string) => {
  // for the parameters that is not undefined, to sth.
  return prisma.employee.findUnique({
    where: {
      email,
    },
    include: {
      JobPost: true,
      Referral: true,
    },
  });
};

export const getEmployeesWithNameTextSearch = (nameInput: string) => {
  return prisma.employee.findMany({
    where: {
      OR: [
        {
          firstName: {
            contains: nameInput,
            mode: "insensitive",
          },
        },
        {
          lastName: {
            contains: nameInput,
            mode: "insensitive",
          },
        },
      ],
    },
  });
};

export const createOneEmployee = (dataClause: EmployeeInsert) => {
  return prisma.employee.create({
    data: dataClause,
  });
};
