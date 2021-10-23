import express, { NextFunction, Request, Response } from "express";
import path from "path";
const multer = require("multer");
const upload = multer();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

import { employeeRouter } from "./routes/employeeRouters";
import { DBAuthenticationError } from "./error/500s";
import { statusCodedError } from "./error/statusCodedError";
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

//From https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Employee Api",
      description: "Employee Api Information",
      servers: ["localhost:5000"],
    },
  },
  apis: ["routes/*.ts"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
