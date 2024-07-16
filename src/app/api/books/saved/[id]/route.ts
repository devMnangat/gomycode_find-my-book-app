// import BookModel from "@/models/BookModel";
// import { dbConnect } from "@/mongoose/dbConnect";
// import { Query } from "@/types/book";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest, query: Query) {
//   try {
//     await dbConnect();
//     const fetchedBook = await BookModel.findById(query.params.id);
//     if (!fetchedBook)
//       return new NextResponse(JSON.stringify({ message: "no Book found" }), {
//         status: 400,
//       });

//     return NextResponse.json(fetchedBook);
//   } catch (error: any) {
//     return new NextResponse(JSON.stringify({ message: "An error occurred "+ error.message }), {
//       status: 500,
//     });
//   }
// }

// export async function PUT(req: NextRequest, query: Query) {
//     try {
//     const body = await req.json()
//       await dbConnect();
//       const updatedBook = await BookModel.findByIdAndUpdate(query.params.id, body);
//       if (!updatedBook)
//         return new NextResponse(JSON.stringify({ message: "Update failed "+ query.params.id }), {
//           status: 400,
//         });
  
//       return NextResponse.json(updatedBook);
//     } catch (error: any) {
//       return new NextResponse(JSON.stringify({ message: "An error occurred" }), {
//         status: 500,
//       });
//     }
//   }

//   export async function DELETE(req: NextRequest, query: Query) {
//     try {
//       await dbConnect();
//       const deletedBook = await BookModel.findByIdAndDelete(query.params.id);
      
//       return NextResponse.json(deletedBook);
//     } catch (error: any) {
//         console.log(error.message)
//       return new NextResponse(JSON.stringify({ message: "Failed to delete "+ query.params.id }), {
//         status: 500,
//       });
//     }
//   }
  
  
