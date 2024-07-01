import BookModel from "@/models/BookModel";
import { dbConnect } from "@/mongoose/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const fetchedBooks = await BookModel.find({});
    if (!fetchedBooks)
      return new NextResponse(JSON.stringify({ message: "no Books found" }), {
        status: 400,
      });
      

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
