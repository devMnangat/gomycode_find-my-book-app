import { IRecommendation } from "@/types/recommendation";
import { Schema, model, models } from "mongoose";

const recommendationSchema = new Schema<IRecommendation>(
  {
    user: { 
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    recommendedBooks: [{
      type: Schema.Types.ObjectId,
      ref: "Book"
    }],
    comment: { 
      type: String 
    },
  },
  { 
    timestamps: true 
  }
);

const RecommendationModel =
  models.Recommendation || model("Recommendation", recommendationSchema);

export default RecommendationModel;
