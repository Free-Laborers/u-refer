import express, { NextFunction, Request, response, Response } from "express";
const employeeRouter = express.Router();

import {
  EmployeeDataClause,
  EmployeeWhereClause,
} from "../interfaces/employeeInterface";
import * as employeeController from "../controllers/employeeControllers";

type WhereClauseBuilderFunc = (query: any) => EmployeeWhereClause;
const _whereClauseBuilder: WhereClauseBuilderFunc = (query: any) => {
  const whereClause: EmployeeWhereClause = {
    id: query.id,
    email: query.email,
    password: query.password,
    firstName: query.firstName,
    lastName: query.lastName,
    pronoun: query.pronoun,
    position: query.position,
    isManager: Boolean(query.isManager),
  };

  return whereClause;
};

type DataClauseBuilderFunc = (body: any) => EmployeeDataClause;
const _dataClauseBuilder: DataClauseBuilderFunc = (body: any) => {
  const whereClause: EmployeeDataClause = {
    id: body.id,
    email: body.email,
    password: body.password,
    firstName: body.firstName,
    lastName: body.lastName,
    pronoun: body.pronoun,
    position: body.position,
    isManager: Boolean(body.isManager),
  };

  return whereClause;
};

employeeRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const comployees = await employeeController.getEmployees(
        _whereClauseBuilder(req.query)
      );
      res.status(200).json(comployees);
    } catch (e: any) {
      next(new Error(e));
    }
  }
);

// employeeRouter.get(
//   "/all",
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const employees = await employeeController.getAllEmployees();
//       res.status(200).json(employees);
//     } catch (e: any) {
//       next(new Error(e));
//     }
//   }
// );

employeeRouter.post(
  "/create",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await employeeController.createOneEmployee(_dataClauseBuilder(req.body));
      res
        .status(200)
        .json({ message: `user ${req.body.email} has been saved` });
    } catch (e: any) {
      next(new Error(e));
    }
  }
);

export { employeeRouter };
