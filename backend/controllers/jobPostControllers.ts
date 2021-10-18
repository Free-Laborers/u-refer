import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export const getJobPostings = () => {
  return prisma.jobPost.findMany({
    include: {
      PostToTag: true,
    },
  })
}

// export const createOneEmployee = (dataClause: EmployeeInsert) => {
//   return prisma.employee.create({
//     data: dataClause,
//   });
// };
