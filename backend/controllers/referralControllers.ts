import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

export const createOneReferral = (dataClause: Prisma.ReferralCreateInput) => {
  return prisma.referral.create({ data: dataClause });
};

export interface ReferralFilterType {
  status: string;
  page: number;
  userId: string;
}

const whereClauseBuilder = (args: Partial<ReferralFilterType>) => {
  const {
    status,
    userId
  } = args;

  let whereClause: Prisma.ReferralWhereInput = {};

  if (status) {
    if(status==="OPEN"){
      whereClause.status = {
        in: ['SUBMITTED', 'REVIEWED', 'CONTACTED'] 

      }
    }if(status==="CLOSED"){
      whereClause.status = {
        in: ['REJECTED', 'HIRED', 'IGNORED', 'WITHDRAWN']
      }
    }
  }
  if(userId){
    whereClause.employeeId = {equals: userId};
  }
  return whereClause;
}

export const getReferralsFromEmployeeId = async ( filters: Partial<ReferralFilterType> & { page: number },
  orderBy: Prisma.ReferralOrderByWithRelationInput) =>{
  const PAGE_SIZE = 10;
  const { page, ...whereClauseFilters } = filters;
  const whereClause = whereClauseBuilder(whereClauseFilters);
  const data = await prisma.referral.findMany({
    where: whereClause,
    orderBy, 
    include:{
      Candidate: true,
      JobPost: {
        include:{
          PostToTag:{
            include:{
              Tag: true,
            }
          }
        }
      },
    },
    skip: page * PAGE_SIZE,
    take: PAGE_SIZE,
  })
  // console.log(`data`, data)
  const numResults = await prisma.referral.count({ where: whereClause });
  return { data, numResults }
};

export const getReferralsFromJobPostId = (jobId: string) =>{
  return prisma.referral.findMany({
    where:{
      jobPostId:{
        equals: jobId
      }
    },
    include:{
      Candidate: true,
    }
  })
};
