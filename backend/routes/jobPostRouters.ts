import { Employee } from ".prisma/client";
import express, { NextFunction, Request, Response } from "express";
import { StatusCodedError } from "../error/statusCodedError";
import * as jobPostController from "../controllers/jobPostControllers";
import * as tagController from "../controllers/tagControllers";
import { JobPostInsert } from "../interfaces/jobPostInterface";
const jobPostRouter = express.Router();

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

const insertClauseBuilder = async (body: any): Promise<JobPostInsert> => {
  let openings = undefined;
  if (body.openings) {
    openings = Number(body.openings);
  }

  const insertClause: JobPostInsert = {
    id: body.id,
    title: body.title,
    position: body.position,
    description: body.description,
    minYearsExperience: Number(body.minYearsExperience),
    salary: Number(body.salary),
    openings: openings,
    createdDate: body.createdDate,
    deletedDate: body.deletedDate,
    hiringManagerId: body.hiringManagerId,
  };

  if (body.tags) {
    const postToTagObjects = [];
    for (const tagName in body.tags) {
      const tag = await tagController.findOneTagWithName(tagName);
      if (tag) {
        postToTagObjects.push({
          jobPostId: body.id,
          tagId: tag.id,
        });
      }
    }

    insertClause.PostToTag = {
      createMany: postToTagObjects,
    };
  }

  return insertClause;
};

//Todo: activate "checkUserIsManager" middleware to the post request once login is merged into main branch.
jobPostRouter.post(
  "/",
  // checkUserIsManager,
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
