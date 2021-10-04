import express, { NextFunction, Request, Response } from "express";
import path from "path";

// import { companyRouter } from "./routes/companyRouter";
import { DBAuthenticationError } from "./error/500s";
import { statusCodedError } from "./error/statusCodedError";
const cors = require("cors");

// -------------------firing express app
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "client/build")));

// -------------------routes
// app.use("/company", companyRouter);
app.get("/home", (request: Request, response: Response) => {
  console.log(request.url);
  response.json({ message: `Welcome to the home page!!` });
});

// ------------ error handling. It only has 500 error, but later more errors will be handled.
app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
  res.status(500).send(err.stack);
  next();
});

// --------------------Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
