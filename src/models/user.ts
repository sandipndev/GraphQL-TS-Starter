import mongoose from "mongoose";
import { hash, compare } from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      validate: {
        validator: (email: string): Promise<boolean> =>
          User.checkUnique("email", email),
        message: ({ value }) => `Account with email ${value} already exists`,
      },
    },
    username: {
      type: String,
      validate: {
        validator: (username: string): Promise<boolean> =>
          User.checkUnique("username", username),
        message: ({ value }) => `Username ${value} has been taken`,
      },
    },
    name: String,
    createdAt: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

// https://stackoverflow.com/a/45675548
export interface IUserDocument extends mongoose.Document {
  email: string;
  username: string;
  name: string;
  password: string;
}

export interface IUser extends IUserDocument {
  matchesPassword: (password: string) => Promise<boolean>;
}

export interface IUserModel extends mongoose.Model<IUser> {
  checkUnique(field: string, value: any): Promise<boolean>;
}

userSchema.pre<IUser>("save", async function () {
  if (this.isModified("password"))
    this.password = await hash(this.password, 10);
});

userSchema.statics.checkUnique = async function (
  field: string,
  value: any
): Promise<boolean> {
  return (await this.where(field).equals(value).countDocuments()) === 0;
};

userSchema.methods.matchesPassword = function (password: string) {
  return compare(password, this.password);
};

const User: IUserModel = mongoose.model<IUser, IUserModel>("User", userSchema);
export default User;
