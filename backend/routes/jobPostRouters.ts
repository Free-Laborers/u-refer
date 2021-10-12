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

jobPostRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const comployees = await jobPostingsController.getJobPostings()
    res.status(200).json(comployees)
  } catch (e: any) {
    next(new Error(e))
  }
})

export { jobPostRouter }
