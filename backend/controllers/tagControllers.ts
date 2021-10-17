import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const findOneTagWithName = (name: string) => {
  return prisma.tag.findUnique({
    where: {
      name,
    },
  });
};
