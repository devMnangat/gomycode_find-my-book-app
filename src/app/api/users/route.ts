import UserModel from "@/models/userModel";
import { dbConnect } from "@/mongoose/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const fetchedUsers = await UserModel.find({});
    if (!fetchedUsers)
      return new NextResponse(JSON.stringify({ message: "no users found" }), {
        status: 400,
      });

    return NextResponse.json(fetchedUsers);
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ message: "An error occurred" }), {
      status: 500,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const hashedUsers = Array.isArray(body) ? body : [body];
    await dbConnect();
    const savedUsers = await UserModel.insertMany(hashedUsers);

    return NextResponse.json(savedUsers);
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse(
      JSON.stringify({ message: "An error occurred " + error.message }),
      { status: 500 }
    );
  }
}
