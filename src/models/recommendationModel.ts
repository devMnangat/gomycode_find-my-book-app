import { IRecommendation } from "@/types/recommendation";
import { Schema, model, models } from "mongoose";

const recommendationSchema = new Schema<IRecommendation>(
  {
    userId: { type: String, required: true },
    recommendedBooks: [
      {
        title: { type: String, required: true },
        author: { type: String, required: true },
      },
    ],
    comment: { type: String },
  },
  { timestamps: true }
);

const RecommendationModel =
  models.Recommendation || model("Recommendation", recommendationSchema);

export default RecommendationModel;
