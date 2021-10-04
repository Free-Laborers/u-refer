import express, { NextFunction, Request, Response } from "express";
import path from "path";
import cors from "cors";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import { companyRouter } from "./routes/companyRouter";
import { DBAuthenticationError } from "./error/500s";
import { statusCodedError } from "./error/statusCodedError";

// -------------------firing express app
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "client/build")));

passport.use(new LocalStrategy({ usernameField: "email" },
  function (username, password, done) {
    if (username !== "admin") {
      return done(null, false);
    }
    if (password !== "password") {
      return done(null, false);
    }
    return done(null, { username: "admin" });
  }
));

// -------------------routes
app.use("/company", companyRouter);
app.get("/home", (request: Request, response: Response) => {
  console.log(request.url);
  response.json({ message: `Welcome to the home page!!` });
});

app.post("/login",
  passport.authenticate('local'),
  function (req, res) {
    console.log(req.user);
    res.send(req.user);
  }
);

app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof statusCodedError) {
    res.status(err.getStatusCode()).send(err.name);
  } else {
    res.status(500).send(err.name);
  }

  if (err instanceof DBAuthenticationError) {
    console.error(
      "DB Authentication Error: please check DATABASE_URL in .env file"
    );
    console.error(err.message);
  }

  next();
});

// --------------------Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
