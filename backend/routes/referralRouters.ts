import { Employee, Prisma } from "@prisma/client";
import express, { NextFunction, Request, response, Response } from "express";
import {
  createOneCandidate,
  deleteOneCandidate,
  findOneCandidateWithEmail,
} from "../controllers/candidateControllers";
import { getOneEmployeeWithEmail } from "../controllers/employeeControllers";
import { createOneReferral } from "../controllers/referralControllers";
import * as referralControllers from '../controllers/referralControllers';
import { StatusCodedError } from "../error/statusCodedError";
const referralRouter = express.Router();

referralRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {}
);

referralRouter.get(
  "/user",
  async (req: Request, res:Response, next: NextFunction) => {
    try{
      const userId = req.query.userId ? (req.query.userId as string) : "";
      if(req.user?.id!==userId){ //we should only get referrals if the user logged is the user passed into get request
        throw new StatusCodedError("unauthorized request: userId does not match", 401);
      }
      const referrals = await referralControllers.getReferralsFromUserId(userId);
      res.status(200).json({referrals});
    }catch(e:any){
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
      throw new StatusCodedError("unauthroized request: not a manager", 401);
    } catch (err) {
      next(err);
    }
  }
};

referralRouter.get( //I feel like we should restrict this to only the specific job creator and no one else
  "/jobs",
  checkUserIsManager,
  async (req: Request, res:Response, next: NextFunction) => {
    try{
      const jobId = req.query.jobId ? (req.query.jobId as string) : "";
      const referrals = await referralControllers.getReferralsFromJobPostId(jobId);
      res.status(200).json({referrals});
    }catch(e:any){
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
      let candidate = await findOneCandidateWithEmail(req.body.email);
      if (!candidate) {
        const newCandidate = await getNewCandidateData(req.body);
        candidate = await createOneCandidate(newCandidate);
      }
      req.body["candidateId"] = candidate.id;
    } catch (e: any) {
      next(new Error(e));
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
      next(new Error(e));
    }
  }
);

export { referralRouter };
