import UserModel from "@/models/UserModel";
import { dbConnect } from "@/mongoose/dbConnect";
import { userService } from "@/server/services/userService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const loggedInUser = await userService.authenticate(email, password);
    if (!loggedInUser)
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: "Invalid email or password",
        }),
        { status: 401 }
      );
    return NextResponse.json({ success: true, data: loggedInUser });
  } catch (error: any) {
    console.log("An error has occurred " + error.message);
    return new NextResponse(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500 }
    );
  }
}

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


