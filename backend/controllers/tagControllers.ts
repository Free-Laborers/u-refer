import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const getTags = () => {
  return prisma.tag.findMany({});
};

export const findOneTagWithName = (name: string) => {
  return prisma.tag.findUnique({
    where: {
      name,
    },
  });
};

export const getTags = () => {
  return prisma.tag.findMany({});
};
