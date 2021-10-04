import { Employee, PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllEmployees = (): Promise<Employee[]> => {
  return prisma.employee.findMany();
};

export const getSingleEmployee = (userID: string) =>
  prisma.employee.findUnique({
    where: {
      id: userID,
    },
  });

export const createSingleEmployee = (email: string, pass: string) =>
  prisma.employee.create({
    data: {
      email: email,
      password: pass,
    },
  });
