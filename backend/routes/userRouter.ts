import express, { NextFunction, Request, Response } from "express";
const companyRouter = express.Router();
import { DBAuthenticationError } from "../error/500s";

import * as userControllers from "../controllers/userControllers";

companyRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.query.id) {
        const user = await userControllers.getSingleEmployee(
          String(req.query.id)
        );
        res.status(200).json({ data: user });
      } else {
        const users = await userControllers.getAllEmployees();
        res.status(200).json({ data: users });
      }
    } catch (e: any) {
      next(new DBAuthenticationError(e.message));
    }
  }
);