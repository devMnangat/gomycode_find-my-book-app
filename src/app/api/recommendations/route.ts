import RecommendationModel from "@/models/RecommendationModel";
import { dbConnect } from "@/mongoose/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const fetchedRecommendations = await RecommendationModel.find({});
    if (!fetchedRecommendations) {
      return new NextResponse(JSON.stringify({ message: "no recommendations found" }), {
        status: 400,
      });
    }

    return NextResponse.json(fetchedRecommendations);
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ message: "An error occurred " + error.message }), {
      status: 500,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newRecommendations = Array.isArray(body) ? body : [body];
    await dbConnect();
    const savedRecommendations = await RecommendationModel.insertMany(newRecommendations);

    return NextResponse.json(savedRecommendations);
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({ message: "An error occurred " + error.message }),
      { status: 500 }
    );
  }
}
