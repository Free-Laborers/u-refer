import express, { NextFunction, Request, Response } from "express";
import path from "path";
const cors = require("cors");
const multer = require("multer");
const upload = multer();
const passport = require("passport");
const jwt = require("jsonwebtoken");

const passportConfig = require("./passport");
import { employeeRouter } from "./routes/employeeRouters";
import { createOneEmployee } from "./controllers/employeeControllers";
import { Employee } from ".prisma/client";
import { EmployeeInsert } from "./interfaces/employeeInterface";

// -------------------firing express app
const app = express();

//body paramter enable
app.use(upload.array());

passportConfig();

app.use(passport.initialize());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "client/build")));

// -------------------unprotected routes
app.get("/unprotected", (request: Request, response: Response) => {
  response.json({ msg: "unprotected" });
});

app.post("/login", async (req, res, next) => {
  try {
    passport.authenticate(
      "local",
      (passportError: Error, user: Employee, info: any) => {
        if (passportError || !user) {
          res.status(400).json({ message: info.reason });
          return;
        }
        req.login(user, { session: false }, (loginError) => {
          if (loginError) {
            res.send(loginError);
            return;
          }
          const token = jwt.sign(
            { id: user.id, email: user.email },
            "jwt-secret-key",
            { expiresIn: "1d" }
          );
          res.json({ token });
        });
      }
    )(req, res);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.post("/signup", async (req: Request, res: Response, next: NextFunction) => {
  const insertClauseBuilder = (body: any): EmployeeInsert => {
    const insertClause: EmployeeInsert = {
      id: body.id,
      email: body.email,
      password: body.password,
      firstName: body.firstName,
      lastName: body.lastName,
      position: body.position,
      pronoun: body.pronoun,
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

  try {
    await createOneEmployee(insertClauseBuilder(req.body));
    res.status(200).json({ message: `user ${req.body.email} is saved` });
  } catch (e: any) {
    next(new Error(e));
  }
});

// check jwt. Router Above this line is unprotected, below this line is protected
app.use(passport.authenticate("jwt", { session: false }));

// -------------------protected routes
app.get("/", (request: Request, response: Response) => {
  response.json({ message: `Welcome to backend!!` });
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
