import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/mongoose/dbConnect";
import { addCommentToBook } from "@/models/BookModel";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { bookId, comment, userId } = await req.json();

    if (!bookId || !comment || !userId) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid input" }),
        {
          status: 400,
        }
      );
    }

    const updatedBook = await addCommentToBook(
      bookId,
      {text: comment, userId},
    );

    if (!updatedBook) {
      return new NextResponse(
        JSON.stringify({ message: "Book not found" }),
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({ id: userId, text: comment });
  } catch (error: any) {
    console.error("Error adding comment:", error);
    return new NextResponse(
      JSON.stringify({ message: "An error occurred: " + error.message }),
      {
        status: 500,
      }
    );
  }
}
