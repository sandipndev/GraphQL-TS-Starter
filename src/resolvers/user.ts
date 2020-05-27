import mongoose from "mongoose";
import { UserInputError } from "apollo-server-express";

import { User } from "../models";

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
    signUp: (_: any, args: object) => {
      // TODO not auth

      // TODO unique
      return User.create(args);
    },
  },
};
