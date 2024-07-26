import { sendPasswordResetEmail } from "@/libs/nodemailer";
import { UserModel } from "@/models/UserModel";
import { dbConnect } from "@/mongoose/dbConnect";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await dbConnect();

    const { email } = body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

   const resetToken = Math.random().toString(36).substring(2, 15);
    // const hashedToken = await bcrypt.hash(resetToken, 10);
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour

    let updatedUser = await UserModel.updateOne(
      { email },
      {
        $set: {
          resetToken: resetToken,
          resetTokenExpiry,
        },
      }
    );
    if(updatedUser.modifiedCount === 0) {
      return new NextResponse(
        JSON.stringify({ message: "User not found" }),
        { status: 404 }
      );
    }
    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${resetToken}&email=${email}`;

    await sendPasswordResetEmail(email, resetUrl);

    return new NextResponse(
      JSON.stringify({ message: "Password reset link sent" }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error in forgot password API:", error);
    return new NextResponse(
      JSON.stringify({ message: "Internal server error" + error.message }),
      { status: 500 }
    );
  }
}
