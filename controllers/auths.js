import jwt from "jsonwebtoken";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { body, validationResult } from "express-validator";
import prisma from "./prismaController.js";
import passport from "passport";
import bcrypt from "bcryptjs";

const validateUserForm = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Email must match this format emailhere@gmail.com"),
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must have a minimum of 8 characters"),
  body("passwordConfirm")
    .trim()
    .custom((val, { req }) => {
      return val === req.body.password;
    })
    .withMessage("Passwords do not match!"),
];

// TODO: Add the form validation for the posts

const opts = {
  // fromAuthHeaderAsBearerToken() creates a new extractor that looks for the JWT
  // in the authorization header with the scheme 'bearer'pts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await prisma.user.findFirst({
        where: {
          email: jwt_payload.email,
        },
      });

      if (!user) {
        return done(null, false, { message: "No such user email exists" });
      }

      const match = await bcrypt.compare(jwt_payload.password, user.password);

      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }

      return done(null, user);
    } catch (err) {
      return done(null, false, { message: "Error in authorizing user" });
    }
  }),
);

const logOut = function (req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    return res.status(200).json("User Logged out successfully");
  });
};

const logIn = [
  validateUserForm,
  async (req, res) => {
    const payload = {
      email: req.body.email,
      password: req.body.password,
    };
    jwt.sign(payload, process.env.SECRET, (err, token) =>
      err
        ? res.json({ error: err })
        : res.json({ token, email: req.body.email }),
    );
  },
];

const signUp = [
  validateUserForm,
  async (req, res) => {
    try {
      console.log(req.body);
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }

      const userExists = await prisma.user.findFirst({
        where: {
          email: req.body.email,
        },
      });

      if (!userExists) {
        await prisma.user.create({
          data: {
            Role: req.body.role ? req.body.role : "READER",
            email: req.body.email,
            password: hashedPassword,
          },
        });
        // TODO: can login be called here to reduce bad ux?
        return res.status(200).json("Registration Successful");
      } else {
        return res
          .status(400)
          .json("Email is already associated with an account");
      }
    } catch (err) {
      return res.status(500).json("Error in registering user");
    }
  },
];

export { signUp, logOut, logIn };
