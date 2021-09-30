import express, { NextFunction, Request, Response } from "express";
const companyRouter = express.Router();
import { DBAuthenticationError } from "../error/500s";

import * as companyControllers from "../controllers/companyControllers";

companyRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.query.id) {
        const company = await companyControllers.getSingleCompany(
          String(req.query.id)
        );
        res.status(200).json({ data: company });
      } else {
        const companies = await companyControllers.getAllCompanies();
        res.status(200).json({ data: companies });
      }
    } catch (e: any) {
      next(new DBAuthenticationError(e.message));
    }
  }
);

// companyRouter.get("/:id", async (req: Request, res: Response) => {
//   const companyId = req.params.id;
//   let company;
//   try {
//     company = await companyControllers.getSingleCompany(companyId);
//     res.status(200).json({ data: company });
//   } catch (e) {
//     res.status(500).json({ errors: "list of unknown error instance" });
//   }
// });

companyRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.query.title) {
      res.status(400).json({ message: "error: please input company title" });
    } else {
      await companyControllers.createSingleCompany(String(req.query.title));
      res
        .status(200)
        .json({ messsage: `company ${req.query.title} is saved!` });
    }
  }
);

export { companyRouter };
