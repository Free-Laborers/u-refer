import { PrismaClient, Prisma } from "@prisma/client";
import { equal } from "assert";
import * as _ from "lodash";

export interface JobListingFilterType {
  searchString: string;
  maxExperience: number | null;
  minExperience: number | null;
  maxSalary: number | null;
  minSalary: number | null;
  tags: string[];
  page: number;
  myJobsId: string | undefined;
}

const whereClauseBuilder = (args: Partial<JobListingFilterType>) => {
  const {
    tags,
    minSalary,
    maxSalary,
    minExperience,
    maxExperience,
    searchString,
    myJobsId,
  } = args;

  let whereClause: Prisma.JobPostWhereInput = {};

  if (searchString) {
    whereClause.title = {
      contains: searchString,
    };
  }

  if (myJobsId) {
    whereClause.hiringManagerId = {
      equals: myJobsId,
    };
  }

  // Tag ids
  if (tags && tags.length > 0) {
    whereClause.PostToTag = {
      some: {
        Tag: {
          name: {
            in: tags,
          },
        },
      },
    };
  }

  // Add and clause if any of these fields exist
  if (
    !_.isNil(minExperience) ||
    !_.isNil(maxExperience) ||
    !_.isNil(minSalary) ||
    !_.isNil(maxSalary)
  ) {
    whereClause.AND = [];
  }
  // Add min experience to AND clause
  if (!_.isNil(minExperience)) {
    // @ts-ignore
    whereClause.AND.push({
      minYearsExperience: {
        gt: minExperience - 1,
      },
    });
  }
  // Add max experience to AND clause
  if (!_.isNil(maxExperience)) {
    // @ts-ignore
    whereClause.AND.push({
      minYearsExperience: {
        lt: maxExperience + 1,
      },
    });
  }
  // Add min salary to AND clause
  if (!_.isNil(minSalary)) {
    // @ts-ignore
    whereClause.AND.push({
      salary: {
        gt: minSalary - 1,
      },
    });
  }
  // Add max salary to AND clause
  if (!_.isNil(maxSalary)) {
    // @ts-ignore
    whereClause.AND.push({
      salary: {
        lt: maxSalary + 1,
      },
    });
  }
  return whereClause;
};

const prisma = new PrismaClient();

export const getJobPostings = async (
  filters: Partial<JobListingFilterType> & { page: number },
  orderBy: Prisma.JobPostOrderByWithRelationInput
) => {
  const PAGE_SIZE = 10;
  const { page, ...whereClauseFilters } = filters;
  const whereClause = whereClauseBuilder(whereClauseFilters);

  const data = await prisma.jobPost.findMany({
    where: whereClause,
    orderBy,
    skip: page * PAGE_SIZE,
    take: PAGE_SIZE,
    include: {
      PostToTag: {
        include: {
          Tag: true,
        },
      },
    },
  });

  const numResults = await prisma.jobPost.count({ where: whereClause });

  return { numResults, data };
};

export const getJobPostingsWithManagerId = (managerId: string) => {
  return prisma.jobPost.findMany({
    where: {
      hiringManagerId: managerId,
    },
    include: {
      PostToTag: {
        include: {
          Tag: true,
        },
      },
    },
  });
};

export const getOneJobPostWithId = (id: string) => {
  return prisma.jobPost.findUnique({
    where: {
      id,
    },
    include: {
      PostToTag: {
        include: {
          Tag: true,
        },
      },
    },
  });
};

export const createOneJobPost = (dataClause: Prisma.JobPostCreateInput) => {
  return prisma.jobPost.create({
    data: dataClause,
  });
};
