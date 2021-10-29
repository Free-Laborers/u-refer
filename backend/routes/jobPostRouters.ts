import { JobListingFilterType } from "./../controllers/jobPostControllers";
import express, { NextFunction, Request, Response } from "express";
import * as jobPostController from "../controllers/jobPostControllers";
import { StatusCodedError } from "../error/statusCodedError";
import * as tagController from "../controllers/tagControllers";
import { Prisma } from "@prisma/client";

const jobPostRouter = express.Router();
// import { getJobPostings } from './../controllers/jobPostControllers';

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
  body: any
): Promise<Prisma.JobPostCreateInput> => {
  let openings = undefined;
  if (body.openings) {
    openings = Number(body.openings);
  }

  const insertClause: Prisma.JobPostCreateInput = {
    id: body.id,
    title: body.title,
    position: body.position,
    description: body.description,
    minYearsExperience: body.minYearsExperience,
    salary: body.salary,
    openings: body.openings,
    createdDate: body.createdDate,
    deletedDate: body.deletedDate,
    Employee: { connect: { id: body.hiringManagerId } },
  };

  if (body.tags && body.tags.length != 0) {
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

jobPostRouter.post(
  "/",
  checkUserIsManager,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await jobPostController.createOneJobPost(
        await insertClauseBuilder(req.body)
      );
      res.status(200).json({
        message: `job post with title: "${req.body.title}" has been saved`,
      });
    } catch (e: any) {
      next(new Error(e));
    }
  }
);

export { jobPostRouter };
