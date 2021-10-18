import express, { NextFunction, Request, Response } from "express";
const jobPostRouter = express.Router();

import * as jobPostingsController from "../controllers/jobPostControllers";

jobPostRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const comployees = await jobPostingsController.getJobPostings();
      res.status(200).json(comployees);
    } catch (e: any) {
      next(new Error(e));
    }
  }
);

export { jobPostRouter };
