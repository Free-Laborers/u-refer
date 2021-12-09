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

export const getOneEmployeeWithId = (id: string) => {
  // for the parameters that is not undefined, to sth.
  return prisma.employee.findUnique({
    where: {
      id,
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
        {
          email: {
            contains: nameInput,
            mode: "insensitive",
          },
        },
      ],
    },
  });
};

export const createOneEmployee = (dataClause: Prisma.EmployeeCreateInput) => {
  return prisma.employee.create({
    data: dataClause,
  });
};
