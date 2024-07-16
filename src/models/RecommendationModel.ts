import { Book } from "@/types/book";
import { IUser } from "@/types/user";
import { Schema, model, models, Document, Types } from "mongoose";

// Define the schema for recommendations
export interface IRecommendation {
  user: Types.ObjectId | IUser;
  recommendedBooks: Types.ObjectId[] | Book[];
  comment?: string;
}

const recommendationSchema = new Schema<IRecommendation>(
  {
    // Reference to the User model
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // Ensure each user can have only one recommendation
    },
    // Array of references to the Book model
    recommendedBooks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Book",
      }
    ],
    // Optional comment field with a default value of an empty string
    comment: {
      type: String,
      default: "",
    },
  },
  {
    // Automatically manage createdAt and updatedAt fields
    timestamps: true,
  }
);

// Define a TypeScript interface for the document (optional but recommended)

// Create or retrieve the Recommendation model
const RecommendationModel = models.Recommendation || model("Recommendation", recommendationSchema);

export default RecommendationModel;
