import mongoose from "mongoose";
import { hash } from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    email: String,
    username: String,
    name: String,
    createdAt: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

interface IUser extends mongoose.Document {
  email: string;
  username: string;
  name: string;
  password: string;
}

userSchema.pre<IUser>("save", async function (next) {
  if (this.isModified("password"))
    this.password = await hash(this.password, 10);
  next();
});

export default mongoose.model("User", userSchema);
