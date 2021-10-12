import express, { NextFunction, Request, Response } from "express";
import path from "path";
const multer = require("multer");
const upload = multer();

import { employeeRouter } from "./routes/employeeRouters";
import { DBAuthenticationError } from "./error/500s";
import { statusCodedError } from "./error/statusCodedError";
import { jobPostRouter } from "./routes/jobPostRouters";
const cors = require("cors");

// -------------------firing express app
const app = express();

//body paramter enable
app.use(upload.array());

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "client/build")));

// -------------------routes
app.get("/", (request: Request, response: Response) => {
  response.json({ message: `Welcome to backend!!` });
});

app.get("/home", (request: Request, response: Response) => {
  response.json({ message: `Welcome to the home page!!` });
});
app.use("/employee", employeeRouter);
app.use("/jobs", jobPostRouter);

// ------------ error handling. It only has 500 error, but later more errors will be handled.
app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
  res.status(500).send({ error: "internal server error" });
  console.error(err.stack);
  next();
});

// --------------------Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
