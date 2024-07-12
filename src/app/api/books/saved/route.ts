import BookModel from "@/models/BookModel";
import { dbConnect } from "@/mongoose/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    let savedBooks = await BookModel.find({});
    return NextResponse.json(savedBooks);
  } catch (error: any) {
    return NextResponse.json(
      { message: "An error occurred " + error.message },
      { status: 500 }
    );
  }
}


