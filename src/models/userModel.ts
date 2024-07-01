import { IUser } from "@/types/user";
import { Schema, model, models } from "mongoose";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
  },
  { timestamps: true }
);

const UserModel = models.User || model("User", userSchema);

export default UserModel;
