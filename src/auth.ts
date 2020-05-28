import express from "express";
import { AuthenticationError } from "apollo-server-express";
import { User } from "./models";
import { SESS_NAME } from "./config";

const signedIn = (req: express.Request) => req.session.userId;

export const checkSignedIn = (req: express.Request) => {
  if (!signedIn(req)) throw new AuthenticationError("You must be signed in");
};

export const checkSignedOut = (req: express.Request) => {
  if (signedIn(req)) throw new AuthenticationError("You must be signed in");
};

export const attemptSignIn = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new AuthenticationError("Incorrect email");
  if (!(await user.matchesPassword(password)))
    throw new AuthenticationError("Incorrect password");
  return user;
};

export const signOut = (req: express.Request, res: express.Response) => {
  return new Promise((resolve, reject) => {
    req.session.destroy((err) => {
      if (err) reject(err);
      res.clearCookie(SESS_NAME);
      resolve(true);
    });
  });
};
