import { IUser } from "@/types/user";
import { Schema, model, models, Document } from "mongoose";
import RecommendationModel from "./RecommendationModel";

// Define the user schema
const userSchema = new Schema<IUser & Document>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    resetToken: { type: String },
    resetTokenExpiry: { type: Date },
  },
  { timestamps: true }
);

// Create the user model if it doesn't exist
const UserModel = models?.User || model<IUser & Document>("User", userSchema);

// Example function for deleting a user and related recommendations
async function deleteUserWithCascade(userId: string) {
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    await UserModel.findByIdAndDelete(userId);
    await RecommendationModel.deleteMany({ user: userId });
    return user;
  } catch (error) {
    // Handle error
    console.error("Error deleting user with cascade:", error);
    throw error;
  }
}

export { UserModel, deleteUserWithCascade };
