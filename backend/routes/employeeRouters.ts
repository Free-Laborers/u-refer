import express, { NextFunction, Request, response, Response } from "express";
const employeeRouter = express.Router();

import { EmployeeInsert } from "../interfaces/employeeInterface";
import * as employeeController from "../controllers/employeeControllers";

type EmployeeWhereQueryBuilder = (body: any) => Partial<EmployeeInsert>;
const whereClauseBuilder: EmployeeWhereQueryBuilder = (query: any) => {
  const whereClause: Partial<EmployeeInsert> = {
    id: query.id,
    email: query.email,
    password: query.password,
    firstName: query.firstName,
    lastName: query.lastName,
    pronoun: query.pronoun,
    position: query.position,
    createDate: query.date,
    isManager:
      query.isManager === "true"
        ? true
        : query.isManager === "false"
        ? false
        : undefined,
  };

  return whereClause;
};

type EmployeeInsertQueryBuilder = (body: any) => EmployeeInsert;
const insertClauseBuilder: EmployeeInsertQueryBuilder = (body: any) => {
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
      body.isManager === "true"
        ? true
        : body.isManager === "false"
        ? false
        : undefined,
  };

  return insertClause;
};

employeeRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const comployees = await employeeController.getEmployees(
        whereClauseBuilder(req.query)
      );
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
      await employeeController.createOneEmployee(insertClauseBuilder(req.body));
      res
        .status(200)
        .json({ message: `user ${req.body.email} has been saved` });
    } catch (e: any) {
      next(new Error(e));
    }
  }
);

export { employeeRouter };
