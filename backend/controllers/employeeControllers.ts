import { PrismaClient } from "@prisma/client";
import {
  EmployeeDataClause,
  EmployeeWhereClause,
} from "../interfaces/employeeInterface";

const prisma = new PrismaClient();

// export const getAllEmployees = () => {
//   return prisma.employee.findMany({
//     include: {
//       jobPost: true,
//       Referral: true,
//     },
//   });
// };

export const getEmployees = (whereClause: EmployeeWhereClause) => {
  // for the parameters that is not undefined, to sth.
  return prisma.employee.findMany({
    where: whereClause,
    include: {
      jobPost: true,
      Referral: true,
    },
  });
};

export const createOneEmployee = (dataClause: EmployeeDataClause) => {
  return prisma.employee.create({
    data: dataClause,
  });
};
