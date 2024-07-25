import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/mongoose/dbConnect";
import { UserModel } from "@/models/UserModel";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await dbConnect();

    const { token, email, password } = body;

    const user = await UserModel.findOne({ email });
    // console.log({ token, email, password, user });
    if (
      !user ||
      !user.resetToken ||
      !user.resetTokenExpiry ||
      user.resetTokenExpiry < Date.now()
    ) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid or expired token" }),
        { status: 400 }
      );
    }
    // const isTokenValid = await bcrypt.compare(token.trim(), user.resetToken);
    const isTokenValid = token.trim() === user.resetToken;
    // const isTokenValid = token === user.resetToken;
    // console.log({ isTokenValid });

    if (!isTokenValid) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid or expired token" }),
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await UserModel.updateOne(
      { email },
      {
        $set: {
          password: hashedPassword,
          resetToken: null,
          resetTokenExpiry: null,
        },
      }
    );
    console.log({ updatedUser });

    return new NextResponse(
      JSON.stringify({ message: "Password reset successful" }),
      { status: 200 }
    );
  } catch (error: any) {
    console.log("An error has occurred " + error.message);
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
