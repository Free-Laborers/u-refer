const passport = require("passport");
const { ExtractJwt, Strategy: JWTStrategy } = require("passport-jwt");
const { Strategy: LocalStrategy } = require("passport-local");
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const passportConfig = { usernameField: "email", passwordField: "password" };
const JWTConfig = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: "jwt-secret-key",
};
const passportVerify = async (
  email: string,
  password: string,
  done: CallableFunction
) => {
  try {
    //try to search user with email param
    const user = await prisma.employee.findUnique({
      where: {
        email: email,
      },
    });

    //check if there is a user with the userId param
    if (!user) {
      done(null, false, { reason: "no such user" });
      return;
    }

    //compare password (pwd not encrypted version)
    if (user.password === password) {
      // console.log("user login successful");
      done(null, user);
      return;
    }
    // console.log("user login unsuccessful");
    //password is wrong
    done(null, false, { reason: "wrong password" });
  } catch (error) {
    console.error(error);
    done(error);
  }
};

//jwtPayload type: the payload in login router
const JWTVerify = async (jwtPayload: any, done: CallableFunction) => {
  try {
    const user = await prisma.employee.findUnique({
      where: {
        id: jwtPayload.id,
      },
    });

    if (user) {
      done(null, user);
      return;
    }
    done(null, false, { reason: "not right user info" });
  } catch (error) {
    console.error(error);
    done(error);
  }
};

module.exports = () => {
  passport.use("local", new LocalStrategy(passportConfig, passportVerify));
  passport.use("jwt", new JWTStrategy(JWTConfig, JWTVerify));
};
