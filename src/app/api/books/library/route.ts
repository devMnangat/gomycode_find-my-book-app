

import RecommendationModel from "@/models/RecommendationModel";
import { dbConnect } from "@/mongoose/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
      const userId = req.nextUrl.searchParams.get('userId');
      await dbConnect();
      
      let query = userId ? { user: userId } : {};
      const fetchedRecommendations = await RecommendationModel.findOne(query).populate('recommendedBooks');
      
      if (!fetchedRecommendations || fetchedRecommendations.length === 0) {
        return new NextResponse(JSON.stringify({ message: "No recommendations found" }), {
          status: 404,
        });
      }
  
      return NextResponse.json(fetchedRecommendations);
    } catch (error: any) {
      return new NextResponse(JSON.stringify({ message: "An error occurred " + error.message }), {
        status: 500,
      });
    }
  }
  