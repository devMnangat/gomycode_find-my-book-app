import RecommendationModel from "@/models/RecommendationModel";
import { dbConnect } from "@/mongoose/dbConnect";

export async function isBookRecommended(userId: string, bookId: string): Promise<boolean> {
    try {
        await dbConnect();
      // Check if a document exists with the given userId and bookId in recommendedBooks
      const exists = await RecommendationModel.exists({
        user: userId,
        recommendedBooks: { $elemMatch: { $eq: bookId } }
      });
  
      // Return true if the document exists, otherwise false
      return !!exists;
    } catch (error) {
      // Handle errors appropriately
      console.error("Error in isBookRecommended:", error);
      throw error; // Optional: rethrow the error or handle as needed
    }
  }

  export async function removeBookFromRecommendations(userId: string, bookId: string): Promise<boolean> {
    try {
      // Perform the update operation
      const result = await RecommendationModel.updateOne(
        { user: userId },
        { $pull: { recommendedBooks: bookId } }
      );

      // Check if the update was successful
      if (result.modifiedCount > 0) {
        console.log(`Book with ID ${bookId} removed from recommendations for user ${userId}.`);
        return true;
      } else {
        console.log(`No modifications made. Book with ID ${bookId} may not have been found.`);
        return false;
      }
    } catch (error) {
      // Handle errors appropriately
      console.error("Error in removeBookFromRecommendations:", error);
      throw error; // Optional: rethrow the error or handle as needed
    }
  }