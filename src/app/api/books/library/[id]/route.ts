import BookModel from "@/models/BookModel";
import { dbConnect } from "@/mongoose/dbConnect";
import { Query } from "@/types/book";
import { NextRequest, NextResponse } from "next/server";

// Fetch a book by ID
export async function GET(req: NextRequest, { params }: Query) {
  try {
    await dbConnect();
    const fetchedBook = await BookModel.findById(params.id);
    if (!fetchedBook) {
      return new NextResponse(JSON.stringify({ message: "No book found" }), {
        status: 404,
      });
    }
    return NextResponse.json(fetchedBook);
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({ message: "An error occurred: " + error.message }),
      {
        status: 500,
      }
    );
  }
}

// Update a book by ID (including like functionality)
export async function PUT(req: NextRequest, { params }: Query) {
  try {
    const body = await req.json();
    await dbConnect();

    const book = await BookModel.findById(params.id);
    if (!book) {
      return new NextResponse(JSON.stringify({ message: "No book found" }), {
        status: 404,
      });
    }

    if (body.like === true) {
      if (book.likedBy && book.likedBy.includes(body.userId)) {
        return new NextResponse(
          JSON.stringify({ message: "User already liked the book" }),
          {
            status: 400,
          }
        );
      }
      book.likes = (book.likes || 0) + 1;
      book.likedBy = book.likedBy || [];
      book.likedBy.push(body.userId);
    } else if (body.like === false) {
      if (!book.likedBy || !book.likedBy.includes(body.userId)) {
        return new NextResponse(
          JSON.stringify({ message: "User has not liked the book" }),
          {
            status: 400,
          }
        );
      }
      book.likes = Math.max((book.likes || 0) - 1, 0);
      book.likedBy = book.likedBy.filter((id: string) => id !== body.userId);
    } else {
      Object.assign(book, body); // General update
    }

    await book.save();
    return NextResponse.json(book);
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({ message: "An error occurred: " + error.message }),
      {
        status: 500,
      }
    );
  }
}

// Delete a book by ID
export async function DELETE(req: NextRequest, { params }: Query) {
  try {
    await dbConnect();
    const deletedBook = await BookModel.findByIdAndDelete(params.id);
    if (!deletedBook) {
      return new NextResponse(
        JSON.stringify({
          message: "Delete failed: No book found with ID " + params.id,
        }),
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(deletedBook);
  } catch (error: any) {
    console.error("Error deleting book:", error);
    return new NextResponse(
      JSON.stringify({ message: "Failed to delete: " + error.message }),
      {
        status: 500,
      }
    );
  }
}
