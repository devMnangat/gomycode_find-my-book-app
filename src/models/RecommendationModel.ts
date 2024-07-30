// import { Book } from "@/types/book";
// import { IUser } from "@/types/user";
// import { Schema, model, models, Document, Types } from "mongoose";

// // Define the schema for recommendations
// export interface IRecommendation {
//   user: Types.ObjectId | IUser;
//   recommendedBooks: Types.ObjectId[] | Book[];
//   comment?: string;

// }

// const recommendationSchema = new Schema<IRecommendation>(
//   {
//     // Reference to the User model
//     user: {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//       unique: true, // Ensure each user can have only one recommendation
//     },
//     // Array of references to the Book model
//     recommendedBooks: [
//       {
//         type: Schema.Types.ObjectId,
//         ref: "Book",
//       }
//     ],
//     // Optional comment field with a default value of an empty string
//     comment: {
//       type: String,
//       default: "",
//     },
//   },
//   {
//     // Automatically manage createdAt and updatedAt fields
//     timestamps: true,
//   }
// );

// // Define a TypeScript interface for the document (optional but recommended)

// // Create or retrieve the Recommendation model
// // let RecommendationModel = (models.Recommendation as any) || model("Recommendation", recommendationSchema);

// let RecommendationModel;

// if (typeof window === 'undefined') {
//   RecommendationModel = (models.Recommendation as any) || model("Recommendation", recommendationSchema);
// } else {
//   // Provide a mock or placeholder for client-side
//   RecommendationModel = {} as any;
// }


// export default RecommendationModel;

import { Book } from "@/types/book";
import { IUser } from "@/types/user";
import { Schema, model, models, Document, Types, Model } from "mongoose";

export interface IRecommendation {
  user: Types.ObjectId | IUser;
  recommendedBooks: Types.ObjectId[] | Book[];
  comment?: string;
}

const recommendationSchema = new Schema<IRecommendation>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    recommendedBooks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Book",
      }
    ],
    comment: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

let RecommendationModel: Model<IRecommendation>;

if (typeof window === 'undefined') {
  RecommendationModel = models.Recommendation || model<IRecommendation>("Recommendation", recommendationSchema);
} else {
  RecommendationModel = null as any;
}

export default RecommendationModel;
