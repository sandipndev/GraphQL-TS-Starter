import express from "express";
import { AuthenticationError } from "apollo-server-express";
import { User } from "./models";

const signedIn = (req: express.Request) => req.session.userId;

export const checkSignedIn = (req: express.Request) => {
  if (signedIn(req)) throw new AuthenticationError("You must be signed in");
};

export const checkSignedOut = (req: express.Request) => {
  if (!signedIn(req)) throw new AuthenticationError("You must be signed in");
};

export const attemptSignIn = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new AuthenticationError("Incorrect email");
  if (!(await user.matchesPassword(password)))
    throw new AuthenticationError("Incorrect password");
};
