import BookModel from "@/models/BookModel";
import { dbConnect } from "@/mongoose/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const apiResponse = await fetch(`https://www.googleapis.com/books/v1/volumes?q=flowers&key=${process.env.NEXT_PUBLIC_GOOGLEBOOKS_API_KEY}`);
    if (!apiResponse.ok) {
      throw new Error('Failed to fetch data from external API');
    }
    const fetchedBooks = await apiResponse.json();
    const bookItems = fetchedBooks.items;
    const books = bookItems.volumeInfo

    console.log({books})



    return NextResponse.json(bookItems);
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ message: "An error occurred "+ error.message }), {
      status: 500,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const hashedBooks = Array.isArray(body) ? body : [body];
    await dbConnect();
    const savedBooks = await BookModel.insertMany(hashedBooks);

    return NextResponse.json(savedBooks);
  } catch (error: any) {
    // console.log(error.message);
    return new NextResponse(
      JSON.stringify({ message: "An error occurred " + error.message }),
      { status: 500 }
    );
  }
}
