import mongoose from "mongoose";
import Joi from "joi";
import { UserInputError } from "apollo-server-express";

import { User } from "../models";
import { SignUp } from "../schemas";

export default {
  Query: {
    /* Params: root, args, ctx, info */
    users: () => {
      // TODO auth, projection, pagination
      return User.find({});
    },
    user: (_: any, { id }: { id: mongoose.Types.ObjectId }) => {
      // TODO auth, sanitization
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid user Id`);
      }
      return User.findById(id);
    },
  },
  Mutation: {
    signUp: async (_: any, args: object) => {
      // TODO not auth
      // TODO unique, val

      await Joi.validate(args, SignUp, { abortEarly: false });
      return User.create(args);
    },
  },
};
