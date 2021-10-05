import express, { NextFunction, Request, response, Response } from "express";
const employeeRouter = express.Router();

import { EmployeeInsert } from "../interfaces/employeeInterface";
import * as employeeController from "../controllers/employeeControllers";

type EmployeeInsertQueryBuilder = (body: any) => EmployeeInsert;
const dataClauseBuilder: EmployeeInsertQueryBuilder = (body: any) => {
  const whereClause: EmployeeInsert = {
    ...body,
    isManager:
      // this part can only be boolean|undefined, or prisma will rasie type error.
      body.isManager === "true"
        ? true
        : body.isManager === "false"
        ? false
        : undefined,
  };

  return whereClause;
};

employeeRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const comployees = await employeeController.getEmployees(req.query);
      res.status(200).json(comployees);
    } catch (e: any) {
      next(new Error(e));
    }
  }
);

employeeRouter.post(
  "/create",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await employeeController.createOneEmployee(dataClauseBuilder(req.body));
      res
        .status(200)
        .json({ message: `user ${req.body.email} has been saved` });
    } catch (e: any) {
      next(new Error(e));
    }
  }
);

export { employeeRouter };
