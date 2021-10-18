import { JobListingFilterType } from './../controllers/jobPostControllers';
// import { getJobPostings } from './../controllers/jobPostControllers';
import express, { NextFunction, Request, Response } from 'express'
const jobPostRouter = express.Router()

import { EmployeeInsert } from '../interfaces/employeeInterface'
import * as jobPostingsController from '../controllers/jobPostControllers'

// const whereClauseBuilder = (query: any): Partial<EmployeeInsert> => {
//   const whereClause: Partial<EmployeeInsert> = {
//     id: query.id,
//     email: query.email,
//     password: query.password,
//     firstName: query.firstName,
//     lastName: query.lastName,
//     pronoun: query.pronoun,
//     position: query.position,
//     createDate: query.date,
//     isManager:
//       query.isManager === "true"
//         ? true
//         : query.isManager === "false"
//         ? false
//         : undefined,
//   };

//   return whereClause;
// };

const insertClauseBuilder = (body: any): EmployeeInsert => {
  const insertClause: EmployeeInsert = {
    id: body.id,
    email: body.email,
    password: body.password,
    firstName: body.firstName,
    lastName: body.lastName,
    pronoun: body.pronoun,
    position: body.position,
    createDate: body.date,
    isManager:
      // this part can only be boolean|undefined, or prisma will rasie type error.
      body.isManager === 'true' ? true : body.isManager === 'false' ? false : undefined,
  }

  return insertClause
}


const coerceToNumberOrNull = (x: any) => {
  const res = parseInt(x)
  return isNaN(res) ? null : res
}

jobPostRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filters: Partial<JobListingFilterType> = {
      searchString: req.query.searchString as string,
      maxExperience: coerceToNumberOrNull(req.query.maxExperience as string),
      minExperience: coerceToNumberOrNull(req.query.minExperience as string),
      maxSalary: coerceToNumberOrNull(req.query.maxSalary as string),
      minSalary: coerceToNumberOrNull(req.query.minSalary as string),
      tagIds: req.query.tagIds as string[]
    }
    const jobs = await jobPostingsController.getJobPostings({...filters})
    res.status(200).json(jobs)
  } catch (e: any) {
    next(new Error(e))
  }
})

export { jobPostRouter }
