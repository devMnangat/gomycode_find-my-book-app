import BookModel from "@/models/BookModel";
import { dbConnect } from "@/mongoose/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const apiResponse = await fetch('https://api.bigbookapi.com/search-books?api-key=912b5103e2a942e1988e0e95bae54d71');
    if (!apiResponse.ok) {
      throw new Error('Failed to fetch data from external API');
    }
    const fetchedBooks = await apiResponse.json();
    console.log({fetchedBooks})



    return NextResponse.json(fetchedBooks);
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
    console.log(error.message);
    return new NextResponse(
      JSON.stringify({ message: "An error occurred " + error.message }),
      { status: 500 }
    );
  }
}
