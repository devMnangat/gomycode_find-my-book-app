import BookModel from "@/models/BookModel";
import RecommendationModel from "@/models/RecommendationModel";
import { dbConnect } from "@/mongoose/dbConnect";
import { isBookRecommended } from "@/utils/books";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const userId = req.nextUrl.searchParams.get('userId');
        const bookTitle = req.nextUrl.searchParams.get('bookTitle');
      await dbConnect();
      
    // let query = bookTitle ? {title: bookTitle}
    let book = await BookModel.findOne({title: bookTitle});
    if(!book?._id) return new NextResponse(JSON.stringify({exists: false}));
        // check if book recommendation exists
        let recommendationExists = await isBookRecommended(userId as string, book._id.toString()); 
        return NextResponse.json({exists: recommendationExists});
      
    } catch (error: any) {
      return new NextResponse(JSON.stringify({ message: "An error occurred " + error.message }), {
        status: 500,
      });
    }
  }