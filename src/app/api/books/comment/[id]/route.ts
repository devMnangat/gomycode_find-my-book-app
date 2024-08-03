import {
  deleteAllBookComments,
  deleteBookComment,
  deleteCommentsWithoutUserId,
  getCommentsForBook,
  updateBookComment,
} from "@/models/BookModel";
import { dbConnect } from "@/mongoose/dbConnect";
import { Query } from "@/types/recommendation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, query: Query) {
  try {
    await dbConnect();
    const fetchedComment = await getCommentsForBook(query.params.id);
    if (!fetchedComment)
      return new NextResponse(JSON.stringify({ message: "no comment found" }), {
        status: 400,
      });

    return NextResponse.json(fetchedComment);
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({ message: "An error occurred " + error.message }),
      {
        status: 500,
      }
    );
  }
}

export async function PUT(req: NextRequest, query: Query) {
  const { id: commentId } = query.params;
  const { text, bookId } = await req.json();
  try {
    await dbConnect();
    // const commentId = req.url.split("/").pop();
    // const { text } = await req.json();

    const updatedBook = updateBookComment(bookId, commentId as string, text);

    if (!updatedBook) {
      return new NextResponse(
        JSON.stringify({ message: "Comment not found" }),
        {
          status: 404,
        }
      );
    }

    const updatedComment = { id: commentId, text };

    return new NextResponse(JSON.stringify(updatedComment), {
      status: 200,
    });
  } catch (error: any) {
    console.error("Error updating comment:", error);
    return new NextResponse(
      JSON.stringify({ message: "An error occurred: " + error.message }),
      {
        status: 500,
      }
    );
  }
}

export async function DELETE1(req: NextRequest, query: Query) {
  const { id: commentId } = query.params;
  const { bookId } = await req.json();
  try {
    await dbConnect();
    // const commentId = req.url.split("/").pop();

    const updatedBook = deleteBookComment(bookId as string, commentId as string);

    if (!updatedBook) {
      return new NextResponse(
        JSON.stringify({ message: "Comment not found" }),
        {
          status: 404,
        }
      );
    }

    return new NextResponse(
      JSON.stringify({ message: "Comment deleted successfully" }),
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("Error deleting comment:", error);
    return new NextResponse(
      JSON.stringify({ message: "An error occurred: " + error.message }),
      {
        status: 500,
      }
    );
  }
}

export async function DELETE2(req: NextRequest, query: Query) {
  const { id: commentId } = query.params;
  const { bookId } = await req.json();
  try {
    await dbConnect();
    // const commentId = req.url.split("/").pop();

    const updatedBook = deleteCommentsWithoutUserId(bookId as string);

    if (!updatedBook) {
      return new NextResponse(
        JSON.stringify({ message: "Comment not found" }),
        {
          status: 404,
        }
      );
    }

    return new NextResponse(
      JSON.stringify({ message: "Comment deleted successfully" }),
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("Error deleting comment:", error);
    return new NextResponse(
      JSON.stringify({ message: "An error occurred: " + error.message }),
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(req: NextRequest, query: Query) {
  const { id: commentId } = query.params;
  const { bookId } = await req.json();
  try {
    await dbConnect();
    // const commentId = req.url.split("/").pop();

    const updatedBook = deleteAllBookComments(bookId as string);

    if (!updatedBook) {
      return new NextResponse(
        JSON.stringify({ message: "Comment not found" }),
        {
          status: 404,
        }
      );
    }

    return new NextResponse(
      JSON.stringify({ message: "Comment deleted successfully" }),
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("Error deleting comment:", error);
    return new NextResponse(
      JSON.stringify({ message: "An error occurred: " + error.message }),
      {
        status: 500,
      }
    );
  }
}



