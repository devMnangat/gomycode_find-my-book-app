import RecommendationModel from "@/models/RecommendationModel";
import { dbConnect } from "@/mongoose/dbConnect";
import { Query } from "@/types/recommendation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, query: Query) {
  try {
    await dbConnect();
    const fetchedRecommendation = await RecommendationModel.findById(query.params.id);
    if (!fetchedRecommendation)
      return new NextResponse(JSON.stringify({ message: "no recommendation found" }), {
        status: 400,
      });

    return NextResponse.json(fetchedRecommendation);
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ message: "An error occurred "+ error.message }), {
      status: 500,
    });
  }
}

export async function PUT(req: NextRequest, query: Query) {
    try {
    const body = await req.json()
      await dbConnect();
      const updatedRecommendation = await RecommendationModel.findByIdAndUpdate(query.params.id, body);
      if (!updatedRecommendation)
        return new NextResponse(JSON.stringify({ message: "Update failed "+ query.params.id }), {
          status: 400,
        });
  
      return NextResponse.json(updatedRecommendation);
    } catch (error: any) {
      return new NextResponse(JSON.stringify({ message: "An error occurred "+ error.message }), {
        status: 500,
      });
    }
  }

  export async function DELETE(req: NextRequest, query: Query) {
    try {
      await dbConnect();
      const deletedRecommendation = await RecommendationModel.findByIdAndDelete(query.params.id);
      
      return NextResponse.json(deletedRecommendation);
    } catch (error: any) {
        console.log(error.message)
      return new NextResponse(JSON.stringify({ message: "Failed to delete "+ query.params.id }), {
        status: 500,
      });
    }
  }
  
  
