import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/mongoose/dbConnect";
import BookModel, { addCommentToBook, deleteAllCommentsFromAllBooks } from "@/models/BookModel";

const crypto = require("crypto");

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const fetchedComment = await BookModel.find({}).select("comments");
    // const fetchedComment = await deleteAllCommentsFromAllBooks();
    if (!fetchedComment)
      return new NextResponse(JSON.stringify({ message: "no comment found" }), {
        status: 400,
      });
      return NextResponse.json(fetchedComment);
  } catch (error: any) {
    console.error("Error fetching comments:", error.message);
    return new NextResponse(
      JSON.stringify({ message: "An error occurred " + error.message }),
      {
        status: 500,
      }
    );
  }
}
export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { bookId, comment } = await req.json();

    if (!bookId || !comment) {
      return new NextResponse(JSON.stringify({ message: "Invalid input" }), {
        status: 400,
      });
    }
    comment.id = crypto.randomUUID();
    const updatedBook = await addCommentToBook(bookId, comment);

    if (!updatedBook) {
      return new NextResponse(JSON.stringify({ message: "Book not found" }), {
        status: 404,
      });
    }

    return NextResponse.json(comment);
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
