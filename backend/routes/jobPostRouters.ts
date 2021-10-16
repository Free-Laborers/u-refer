import { Employee } from ".prisma/client";
import express, { NextFunction, Request, Response } from "express";
import { StatusCodedError } from "../error/statusCodedError";
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

jobPostRouter.post("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: "hi" });
});

jobPostRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: "hi" });
});

export { jobPostRouter };
