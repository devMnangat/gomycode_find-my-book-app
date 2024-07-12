import BookModel from "@/models/BookModel";
import RecommendationModel from "@/models/RecommendationModel";
import { dbConnect } from "@/mongoose/dbConnect";
import { IRecommendation } from "@/types/recommendation";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const apiResponse = await fetch(`https://www.googleapis.com/books/v1/volumes?q=flowers&key=${process.env.NEXT_PUBLIC_GOOGLEBOOKS_API_KEY}`);
    if (!apiResponse.ok) {
      throw new Error('Failed to fetch data from external API');
    }
    const fetchedBooks = await apiResponse.json();
    const bookItems = fetchedBooks.items;

    const books = bookItems.map((item: any) => item.volumeInfo);

    console.log({ books });

    return NextResponse.json(bookItems);
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ message: "An error occurred: " + error.message }), {
      status: 500,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { user, book } = await req.json();

    await dbConnect();
    const newBook = new BookModel(book);
    let fetchedBook = await BookModel.findOne({ title: newBook.title });
    if (!fetchedBook) {
      fetchedBook = await newBook.save();
    }
    if (!fetchedBook) throw new Error("Could not fetch or save the book");

    // create book recommendations
    await handleCreateBookRecommendation(user.id, fetchedBook._id);
    return NextResponse.json({ success: true, fetchedBook });
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse(
      JSON.stringify({ message: "An error occurred: " + error.message }),
      { status: 500 }
    );
  }
}

async function handleCreateBookRecommendation(userId: string, bookId: string) {
  const recom: IRecommendation | any = await RecommendationModel.findOne({ user: userId });
  if (!recom) {
    await RecommendationModel.insertMany([{ user: userId, recommendedBooks: [bookId] }]);
    return;
  }

  let books = recom.recommendedBooks || [],
  uniqueBooks = Array.from(new Set(books))
  if (!books.includes(bookId)) {
    books.push(bookId);
  }

//  return await RecommendationModel.findByIdAndUpdate(recom._id, { recommendedBooks: books });
 return await RecommendationModel.updateOne({_id: recom._id, recommendedBooks: {$nin: uniqueBooks}}, { recommendedBooks: books });
}

