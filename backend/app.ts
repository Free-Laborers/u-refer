import express, { NextFunction, Request, Response } from "express";
import path from "path";
const multer = require("multer");
const upload = multer();
const cors = require("cors");

import { employeeRouter } from "./routes/employeeRouters";
import { jobPostRouter } from "./routes/jobPostRouters";

import { DBAuthenticationError } from "./error/500s";
import { Employee } from "@prisma/client";
import { StatusCodedError } from "./error/statusCodedError";

// -------------------firing express app
const app = express();

//body paramter enable
app.use(upload.array());

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "client/build")));

declare global {
  namespace Express {
    export interface Request {
      user?: Employee;
    }
  }
}
// -------------------routes
app.get("/", (request: Request, response: Response) => {
  response.json({ message: `Welcome to backend!!` });
});

app.get("/home", (request: Request, response: Response) => {
  response.json({ message: `Welcome to the home page!!` });
});
app.use("/employee", employeeRouter);
app.use("/jobPost", jobPostRouter);

// ------------ error handling. It only has 500 error, but later more errors will be handled.
app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof StatusCodedError) {
    res.status(err.getStatusCode()).send({ error: err.message });
  } else {
    res.status(500).send({ error: "internal server error" });
  }
  console.error(err.stack);
  next();
});

// --------------------Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
