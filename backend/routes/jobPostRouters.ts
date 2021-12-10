import { JobListingFilterType } from "./../controllers/jobPostControllers";
import express, { NextFunction, Request, Response } from "express";
import * as jobPostController from "../controllers/jobPostControllers";
import { StatusCodedError } from "../error/statusCodedError";
import * as tagController from "../controllers/tagControllers";
import { Prisma } from "@prisma/client";

const jobPostRouter = express.Router();

const coerceToNumberOrNull = (x: any) => {
  const res = parseInt(x);
  return isNaN(res) ? null : res;
};

type JobPostRequest = {
  filters: {
    searchString: string;
    maxExperience: number | null;
    minExperience: number | null;
    maxSalary: number | null;
    minSalary: number | null;
    tags: string[];
    page: number;
    myJobs: boolean | null;
  };
  orderBy: Prisma.JobPostOrderByWithRelationInput;
};

function parseString(x: qs.ParsedQs["a"]): string {
  if (typeof x === "string") {
    return x;
  } else {
    throw new Error(`error parsing request: expected string, got ${x}`);
  }
}

function parseStringArray(x: qs.ParsedQs["a"]): string[] {
  if (x instanceof Array) {
    return x.map(parseString);
    // arrays are stringified as undefined when empty in query strings
  } else if (x === undefined) {
    return [];
  } else {
    throw new Error(`error parsing request: expected array, got ${x}`);
  }
}
function parseJobPostRequest(query: Request["query"]): JobPostRequest {
  const filters = {
    searchString: parseString(query.searchString),
    maxExperience: coerceToNumberOrNull(query.maxExperience),
    minExperience: coerceToNumberOrNull(query.minExperience),
    maxSalary: coerceToNumberOrNull(query.maxSalary),
    minSalary: coerceToNumberOrNull(query.minSalary),
    myJobs: !!query.myJobs,
    tags: parseStringArray(query.tags),
    page: coerceToNumberOrNull(query.page) || 0,
  };
  let sortKey = parseString(query.sortBy);
  if (!["createdDate"].includes(sortKey)) {
    throw new Error(`invalid sort ${sortKey}`);
  }
  let orderDirection = parseString(query.sortDirection);
  if (!["asc", "desc"].includes(orderDirection)) {
    throw new Error(`invalid sort direction ${orderDirection}`);
  }
  const orderBy = { [sortKey]: orderDirection };
  return { filters, orderBy };
}

jobPostRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { filters, orderBy } = parseJobPostRequest(req.query);
      const jobs = await jobPostController.getJobPostings(filters, orderBy);
      res.status(200).json(jobs);
    } catch (e: any) {
      next(e);
    }
  }
);

jobPostRouter.get(
  "/manager/:managerId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const managerId = req.params.managerId;
      const jobs = await jobPostController.getJobPostingsWithManagerId(
        managerId
      );
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
