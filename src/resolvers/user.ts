import Joi from "joi";
import mongoose from "mongoose";

import express from "express";
import { UserInputError } from "apollo-server-express";

import { User } from "../models";
import { signUp, signIn } from "../schemas";

import * as Auth from "../auth";

export default {
  Query: {
    /* Params: root, args, ctx, info */
    me: (
      root: any,
      args: object,
      { req }: { req: express.Request },
      info: any
    ) => {
      Auth.checkSignedIn(req);
      return User.findById(req.session.userId);
    },

    users: (
      root: any,
      args: object,
      { req }: { req: express.Request },
      info: any
    ) => {
      // TODO projection, pagination
      Auth.checkSignedIn(req);
      return User.find({});
    },

    user: (
      root: any,
      { id }: { id: mongoose.Types.ObjectId },
      { req }: { req: express.Request },
      info: any
    ) => {
      // TODO sanitization
      Auth.checkSignedIn(req);

      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid user Id`);
      }
      return User.findById(id);
    },
  },

  Mutation: {
    signUp: async (
      root: any,
      args: object,
      { req }: { req: express.Request },
      info: any
    ) => {
      Auth.checkSignedOut(req);
      await Joi.validate(args, signUp, { abortEarly: false });

      const user = await User.create(args);
      req.session.userId = user.id;
      return user;
    },

    signIn: async (
      root: any,
      args: { email: string; password: string },
      { req }: { req: express.Request }
    ) => {
      const { userId } = req.session;
      if (userId) {
        return User.findById(userId);
      }

      await Joi.validate(args, signIn, { abortEarly: false });

      const { email, password } = args;
      const user = await Auth.attemptSignIn(email, password);

      req.session.userId = user.id;

      return user;
    },

    signOut: async (
      root: any,
      args: object,
      { req, res }: { req: express.Request; res: express.Response }
    ) => {
      Auth.checkSignedIn(req);
      return await Auth.signOut(req, res);
    },
  },
};
