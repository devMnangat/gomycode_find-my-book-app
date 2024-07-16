// // import BookModel from "@/models/BookModel";
// import RecommendationModel from "@/models/RecommendationModel";
// import { dbConnect } from "@/mongoose/dbConnect";
// import { getServerSession } from "next-auth";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest) {
//   const session = await getServerSession();
//   console.log({ session });
//   try {
//     await dbConnect();
//     let savedBooks = await RecommendationModel.findOne({user: session?.user?.id}).populate('recommendedBooks');
//     console.log({savedBooks})
//     return NextResponse.json(savedBooks);
//   } catch (error: any) {
//     return NextResponse.json(
//       { message: "An error occurred " + error.message },
//       { status: 500 }
//     );
//   }
// }


