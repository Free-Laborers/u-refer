import { Employee, JobPost, Prisma } from "@prisma/client";
import express, { NextFunction, Request, response, Response } from "express";
import {
  createOneCandidate,
  deleteOneCandidate,
  findOneCandidateWithEmail,
} from "../controllers/candidateControllers";
import {
  getOneEmployeeWithId as getOneEmployeeWithId,
  getOneEmployeeWithEmail,
} from "../controllers/employeeControllers";
import { createOneReferral } from "../controllers/referralControllers";
import * as referralControllers from "../controllers/referralControllers";
import * as jobPostControllers from "../controllers/jobPostControllers";
import { StatusCodedError } from "../error/statusCodedError";
import sendEmail from "../email/emailSender";
const referralRouter = express.Router();

referralRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {}
);

referralRouter.get(
  "/user",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new StatusCodedError("not logged in", 401);
      }

      const referrals = await referralControllers.getReferralsFromEmployeeId({
        userId: req.user.id,
        page: 0,
      });
      res.status(200).json(referrals);
    } catch (e: any) {
      next(new Error(e));
    }
  }
);

//=============middleware for getting referrals from a job post
const checkUserIsManager = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user && req.user.isManager) {
    next();
  } else {
    try {
      throw new StatusCodedError("forbidden request: not a manager", 403);
    } catch (err) {
      next(err);
    }
  }
};

const checkIfQueryHasValidJobId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!(await jobPostControllers.getOneJobPostWithId(req.params.jobPostId))) {
    next(
      new StatusCodedError("bad request: no such jobFeed with input jobId", 400)
    );
  } else {
    next();
  }
};

const checkOneJobPostIsCreatedByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const jobPostId = req.params.jobPostId; //checkIfQueryHasValidJobId checks that it does exist.
  const jobPostCreatorId = (
    (await jobPostControllers.getOneJobPostWithId(jobPostId)) as JobPost
  ).hiringManagerId; //checkIfQueryHasValidJobId checks that the jobPostId is the valid one.
  if (req.user?.id !== jobPostCreatorId) {
    next(new StatusCodedError("forbidden, not the jobpost creater", 403));
  } else {
    next();
  }
};

const middlewaresForReferralJobPost = [
  checkUserIsManager, //check if the user is manager
  checkIfQueryHasValidJobId, //check if the req.query has valid jobId
  checkOneJobPostIsCreatedByUser, //restrict to only the specific job creator and no one else
];

referralRouter.get(
  "/jobPost/:jobPostId",
  middlewaresForReferralJobPost,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const jobId = req.params.jobPostId;
      const referrals = await referralControllers.getReferralsFromJobPostId(
        jobId
      );
      res.status(200).json(referrals);
    } catch (e: any) {
      next(new Error(e));
    }
  }
);

const checkRequiredBodyParamForReferralPost = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    req.body.email &&
    req.body.firstName &&
    req.body.lastName &&
    req.body.jobPostId &&
    req.body.description
  ) {
    next();
  } else {
    try {
      throw new StatusCodedError(
        "required parameters to create a referral is not passed",
        400
      );
    } catch (err) {
      next(err);
    }
  }
};

const getNewCandidateData = async (
  body: any
): Promise<Prisma.CandidateCreateInput> => {
  const pronoun = body.pronoun ? (body.pronoun as string) : undefined;
  const phone = body.phone ? (body.phone as string) : undefined;
  let employeeId = body.employeeId ? (body.employeeId as string) : undefined;

  if (!employeeId) {
    const possibleEmployee = await getOneEmployeeWithEmail(body.email);
    if (possibleEmployee) {
      employeeId = possibleEmployee.id;
    }
  }

  return {
    email: body.email as string,
    firstName: body.firstName as string,
    lastName: body.lastName as string,
    pronoun,
    phone,
    employeeId,
  };
};

const getNewReferralData = (body: any): Prisma.ReferralCreateInput => {
  const resumeFilePath = body.resumeFileName
    ? "./resume/" + (body.resumeFileName as string)
    : undefined;
  return {
    Employee: { connect: { id: body.employeeId } },
    Candidate: { connect: { id: body.candidateId } },
    JobPost: { connect: { id: body.jobPostId } },
    description: body.description,
    resumeFilePath,
  };
};

referralRouter.post(
  "/",
  checkRequiredBodyParamForReferralPost,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const jobPost = await jobPostControllers.getOneJobPostWithId(
        req.body.jobPostId as string
      );

      if (!jobPost) {
        throw new StatusCodedError("bad request: no such jobPost", 400);
      } else {
        req.body["hiringMangerId"] = jobPost.hiringManagerId;
      }
    } catch (e: any) {
      if (e instanceof StatusCodedError) {
        next(e);
      } else {
        next(new Error(e));
      }
    }

    try {
      let candidate = await findOneCandidateWithEmail(req.body.email);
      if (!candidate) {
        const newCandidate = await getNewCandidateData(req.body);
        candidate = await createOneCandidate(newCandidate);
      }
      req.body["candidateId"] = candidate.id;
    } catch (e: any) {
      next(
        new StatusCodedError(
          "Server Error: candidate info is not saved / loaded",
          500
        )
      );
    }

    req.body["employeeId"] = (req.user as Employee).id;
    // req.body["employeeId"] = "ccbca212-18a7-439a-a27b-d69beb2ee7a0";
    try {
      const newReferral = getNewReferralData(req.body);
      const newReferralId = (await createOneReferral(newReferral)).id;
      res.status(200).json({
        message: `new referral with ID:${newReferralId} has been saved`,
      });
    } catch (e: any) {
      await deleteOneCandidate(req.body.candidateId);
      next(
        new StatusCodedError(
          "Server error: Referral is not saved. Candidate change will be reverted",
          500
        )
      );
    }

    try {
      const hiringManager = await getOneEmployeeWithId(
        req.body.hiringMangerId as string
      );

      if (!hiringManager) {
        throw new StatusCodedError(
          "Warning: could not find hiring manager data from employee table. Email Notification will not be sent",
          500
        );
      } else {
        const hiringManagerEmail = hiringManager.email;
        console.log("sending email");
        const job = await jobPostControllers.getOneJobPostWithId(
          req.body.jobPostId
        );
        if (!job) {
          sendEmail(
            hiringManagerEmail,
            "",
            req.body.firstName,
            req.body.lastName
          );
        } else {
          sendEmail(
            hiringManagerEmail,
            job.title,
            req.body.firstName,
            req.body.lastName
          );
        }
      }
    } catch (e: any) {
      if (e instanceof StatusCodedError) {
        next(e);
      } else {
        next(new Error(e));
      }
    }
  }
);

export { referralRouter };
