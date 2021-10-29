import express, { NextFunction, Request, response, Response } from "express";
const employeeRouter = express.Router();

import { Prisma } from "@prisma/client";

import * as employeeController from "../controllers/employeeControllers";

const whereClauseBuilder = (query: any): Prisma.EmployeeWhereInput => {
  const whereClause: Prisma.EmployeeWhereInput = {
    id: query.id,
    email: query.email,
    password: query.password,
    firstName: query.firstName,
    lastName: query.lastName,
    pronoun: query.pronoun,
    position: query.position,
    createdDate: query.date,
    isManager:
      query.isManager === "true"
        ? true
        : query.isManager === "false"
        ? false
        : undefined,
  };

  return whereClause;
};

const insertClauseBuilder = (body: any): Prisma.EmployeeCreateInput => {
  const insertClause: Prisma.EmployeeCreateInput = {
    id: body.id,
    email: body.email,
    password: body.password,
    firstName: body.firstName,
    lastName: body.lastName,
    pronoun: body.pronoun,
    position: body.position,
    createdDate: body.date,
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

/**
 * @swagger
 * /employee:
 *  get:
 *    description: Use to get an employee
 *    responses:
 *      '200':
 *         description: success
 */
employeeRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employees = await employeeController.getEmployees(
        whereClauseBuilder(req.query)
      );
      res.status(200).json(employees);
    } catch (e: any) {
      next(new Error(e));
    }
  }
);

employeeRouter.get(
  "/profile",
  (request: Request, response: Response, next: NextFunction) => {
    const user = { ...request.user, password: undefined };
    response.status(200).json({ user });
  }
);

/**
 * @swagger
 * /employee:
 *  post:
 *    description: Use to post an employee
 *    responses:
 *      '200':
 *         description: success
 */
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
