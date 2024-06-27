import UserModel from "@/models/userModel";
import { dbConnect } from "@/mongoose/dbConnect";
import { Query } from "@/types/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, query: Query) {
  try {
    await dbConnect();
    const fetchedUser = await UserModel.findById(query.params.id);
    if (!fetchedUser)
      return new NextResponse(JSON.stringify({ message: "no user found" }), {
        status: 400,
      });

    return NextResponse.json(fetchedUser);
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ message: "An error occurred" }), {
      status: 500,
    });
  }
}

export async function PUT(req: NextRequest, query: Query) {
    try {
    const body = await req.json()
      await dbConnect();
      const updatedUser = await UserModel.findByIdAndUpdate(query.params.id, body);
      if (!updatedUser)
        return new NextResponse(JSON.stringify({ message: "Update failed "+ query.params.id }), {
          status: 400,
        });
  
      return NextResponse.json(updatedUser);
    } catch (error: any) {
      return new NextResponse(JSON.stringify({ message: "An error occurred" }), {
        status: 500,
      });
    }
  }

  export async function DELETE(req: NextRequest, query: Query) {
    try {
      await dbConnect();
      const deletedUser = await UserModel.findByIdAndDelete(query.params.id);
      
      return NextResponse.json(deletedUser);
    } catch (error: any) {
        console.log(error.message)
      return new NextResponse(JSON.stringify({ message: "Failed to delete "+ query.params.id }), {
        status: 500,
      });
    }
  }
  
  
