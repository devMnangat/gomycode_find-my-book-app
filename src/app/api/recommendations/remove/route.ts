import BookModel from "@/models/BookModel";
import RecommendationModel from "@/models/RecommendationModel";
import { dbConnect } from "@/mongoose/dbConnect";
import { isBookRecommended } from "@/utils/books";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");
    const bookId = req.nextUrl.searchParams.get("bookId");
    await dbConnect();

    let isRemoved = await RecommendationModel.updateOne(
      { user: userId },
      { $pull: { recommendedBooks: bookId } }
    );
    return NextResponse.json({ removed: isRemoved.modifiedCount > 0 });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({ message: "An error occurred " + error.message }),
      {
        status: 500,
      }
    );
  }
}
