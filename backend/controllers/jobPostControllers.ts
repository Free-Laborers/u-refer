import { PrismaClient, Prisma } from '@prisma/client'
import * as _ from 'lodash'

export interface JobListingFilterType {
  tags: string[] | null
  minSalary: number | null
  maxSalary: number | null
  minExperience: number | null
  maxExperience: number | null
  searchString?: string | null
}

const whereClauseBuilder = (args: Partial<JobListingFilterType>) => {
  const { tags, minSalary, maxSalary, minExperience, maxExperience, searchString } = args
  let whereClause: Prisma.JobPostWhereInput = {}

  if (searchString) {
    whereClause.title = {
      contains: searchString
    }
  }

  // Tag ids
  if (tags && tags.length > 0) {
    whereClause.PostToTag = {
      some: {
        tag: {
          name: {
            in: tags,
          },
        },
      },
    }
  }

  // Add and clause if any of these fields exist
  if (!_.isNil(minExperience)  || !_.isNil(maxExperience)  || !_.isNil(minSalary)  || !_.isNil(maxSalary) ){
    whereClause.AND = []
  }
  // Add min experience to AND clause
  if (!_.isNil(minExperience) ) {
    // @ts-ignore
    whereClause.AND.push({
      minYearsExperience: {
        gt: minExperience,
      },
    })
  }
  // Add max experience to AND clause
  if (!_.isNil(maxExperience) ) {
    // @ts-ignore
    whereClause.AND.push({
      minYearsExperience: {
        lt: maxExperience,
      },
    })
  }
  // Add min salary to AND clause
  if (!_.isNil(minSalary) ) {
    // @ts-ignore
    whereClause.AND.push({
      salary: {
        gt: minSalary,
      },
    })
  }
  // Add max salary to AND clause
  if (!_.isNil(maxSalary)) {
    // @ts-ignore
    whereClause.AND.push({
      salary: {
        lt: maxSalary,
      },
    })
  }
  return whereClause
}

const prisma = new PrismaClient()

export const getJobPostings = (filters: Partial<JobListingFilterType>) => {
  const whereClause = whereClauseBuilder(filters)
  return prisma.jobPost.findMany({
    where: whereClause,
    include: {
      PostToTag: {
        include: {
          tag: true,
        },
      },
    },
  })
}

// export const createOneEmployee = (dataClause: EmployeeInsert) => {
//   return prisma.employee.create({
//     data: dataClause,
//   });
// };
