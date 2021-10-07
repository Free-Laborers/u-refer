import express, { NextFunction, Request, Response } from "express";
import path from "path";
import cors from "cors";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import { DBAuthenticationError } from "./error/500s";
import { statusCodedError } from "./error/statusCodedError";
const multer = require("multer");
const upload = multer();

import { employeeRouter } from "./routes/employeeRouters";

// -------------------firing express app
const app = express();

//body paramter enable
app.use(upload.array());

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "client/build")));

passport.use(new LocalStrategy({ usernameField: "email" },
  function (username, password, done) {
    if (username !== "admin") {
      return done(null, false, { message: "Username is wrong"});
    }
    if (password !== "password") {
      return done(null, false, { message: "Password is wrong" });
    }
    return done(null, { username: "admin", message:"Login Successful" });
  }
));

// -------------------routes
app.get("/", (request: Request, response: Response) => {
  response.json({ message: `Welcome to backend!!` });
});

app.get("/home", (request: Request, response: Response) => {
  response.json({ message: `Welcome to the home page!!` });
});
app.use("/employee", employeeRouter);

app.post('/login', function(req, res, next ){
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err) }
    if (!user) { return res.json( { message: info.message }) }
    res.json(user);
  })(req, res, next);   
});

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
