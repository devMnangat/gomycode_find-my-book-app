import { UserModel } from "@/models/UserModel";
import { dbConnect } from "@/mongoose/dbConnect";
import { pwdHasher } from "@/utils/password";
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

export async function POST(req:NextRequest) {
  try {
    const body = await req.json()
    await dbConnect()
    
    // Check if username already exists
    const existingUser = await UserModel.findOne({ username: body.username })
    if (existingUser) {
      return new NextResponse(JSON.stringify({ message: "Username already exists" }), {
        status: 400
      })
    }

    // If username is unique, proceed with user creation
    body.password = pwdHasher(body.password)
    const savedUser = await UserModel.create(body)
    
    return NextResponse.json(savedUser)
  } catch (error: any) {
    console.log("An error has occurred "+ error.message)
    return new NextResponse(JSON.stringify({message: error.message}),
    {status: 500}
  )
  }
}
