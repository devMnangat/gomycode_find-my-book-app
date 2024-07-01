import UserModel from "@/models/UserModel";
import { dbConnect } from "@/mongoose/dbConnect";
import { userService } from "@/server/services/userService";
import { pwdConfirm, pwdHasher } from "@/utils/password";
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

export async function POSTONE(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    await dbConnect();
    const loggedInUser = await UserModel.findOne(
      { email, password: pwdHasher(password) },
      { password: 0 }
    );
    if (!loggedInUser)
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: "Invalid email or password",
        }),
        { status: 401 }
      );
    // let {password: pass, ...data} = await loggedInUser
    delete loggedInUser.password;
    return NextResponse.json({ success: true, data: loggedInUser });
  } catch (error: any) {
    console.log("An error has occurred " + error.message);
    return new NextResponse(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500 }
    );
  }
}
