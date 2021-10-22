import { Employee } from ".prisma/client";
import express, { NextFunction, Request, Response } from "express";
import { StatusCodedError } from "../error/statusCodedError";
import * as jobPostController from "../controllers/jobPostControllers";
import * as tagController from "../controllers/tagControllers";
import { JobPostInsert } from "../interfaces/jobPostInterface";
const jobPostRouter = express.Router();
import { JobListingFilterType } from "./../controllers/jobPostControllers";
// import { getJobPostings } from './../controllers/jobPostControllers';

//=============middleware for post request
const checkUserIsManager = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user && req.user.isManager) {
    next();
  } else {
    try {
      throw new StatusCodedError("unauthroized request: not a manager", 401);
    } catch (err) {
      next(err);
    }
  }
};

const insertClauseBuilder = async (
  body: any,
  managerId: string
): Promise<JobPostInsert> => {
  //will recieve raw data, so no parsing necessary.
  const insertClause: JobPostInsert = {
    id: body.id,
    title: body.title,
    position: body.position,
    description: body.description,
    minYearsExperience: body.minYearsExperience,
    salary: body.salary,
    openings: body.openings,
    createdDate: body.createdDate,
    deletedDate: body.deletedDate,
    hiringManagerId: managerId,
  };

  if (body.tags) {
    const postToTagObjects = [];
    for (let i = 0; i < body.tags.length; i++) {
      const tag = await tagController.findOneTagWithName(body.tags[i]);
      if (tag) {
        postToTagObjects.push({
          tagId: tag.id,
        });
      }
    }
    insertClause.PostToTag = {
      createMany: { data: postToTagObjects },
    };
  }

  return insertClause;
};

//Todo: activate "checkUserIsManager" middleware to the post request once login is merged into main branch.
jobPostRouter.post(
  "/",
  checkUserIsManager,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.user) {
        await jobPostController.createOneJobPost(
          await insertClauseBuilder(req.body, req.user.id)
        );
      }
      res.status(200).json({
        message: `job post with title: "${req.body.title}" has been saved`,
      });
    } catch (e: any) {
      next(new Error(e));
    }
  }
);

// <<<<<<< HEAD
// jobPostRouter.get(
//   "/",
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const comployees = await jobPostController.getJobPostings();
//       res.status(200).json(comployees);
//     } catch (e: any) {
//       next(new Error(e));
//     }
// =======

const coerceToNumberOrNull = (x: any) => {
  const res = parseInt(x);
  return isNaN(res) ? null : res;
};

jobPostRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filters: Partial<JobListingFilterType> = {
        searchString: req.query.searchString as string,
        maxExperience: coerceToNumberOrNull(req.query.maxExperience as string),
        minExperience: coerceToNumberOrNull(req.query.minExperience as string),
        maxSalary: coerceToNumberOrNull(req.query.maxSalary as string),
        minSalary: coerceToNumberOrNull(req.query.minSalary as string),
        tags: req.query.tags as string[],
      };
      const jobs = await jobPostController.getJobPostings({ ...filters });
      res.status(200).json(jobs);
    } catch (e: any) {
      next(new Error(e));
    }
  }
);

export { jobPostRouter };
