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
  finally {
    await dbConnect();
    // remove duplicate book recommendations
    await removeDuplicatesInRecommendedBooks();

  }
}

async function handleCreateBookRecommendation2(userId: string, bookId: string) {
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

async function handleCreateBookRecommendation3(userId: string, bookId: string) {
  try {
    // Find the recommendation document for the user
    let recom: IRecommendation | null = await RecommendationModel.findOne({ user: userId });

    if (!recom) {
      // If no recommendation document exists, create a new one
      await RecommendationModel.create({ user: userId, recommendedBooks: [bookId] });
      return;
    }

    // Ensure recommendedBooks array has unique values
    let books = recom.recommendedBooks || [];
    let uniqueBooks = Array.from(new Set(books));

    if (!uniqueBooks.includes(bookId)) {
      // Add the bookId to recommendedBooks if it's not already there
      uniqueBooks.push(bookId);

      // Update the recommendation document with the new recommendedBooks array
      await RecommendationModel.updateOne({ _id: recom?._id }, { recommendedBooks: uniqueBooks });
    }
  } catch (error) {
    // Handle errors appropriately
    console.error("Error in handleCreateBookRecommendation:", error);
    throw error; // Optional: rethrow the error or handle as needed
  }
}


async function handleCreateBookRecommendation(userId: string, bookId: string) {
  try {
    // Find the recommendation document for the user
    let recom: IRecommendation | null = await RecommendationModel.findOne({ user: userId });

    if (!recom) {
      // If no recommendation document exists, create a new one
      await RecommendationModel.create({ user: userId, recommendedBooks: [bookId] });
      return;
    }

    // Remove duplicates from recommendedBooks
    let uniqueBooks = Array.from(new Set(recom.recommendedBooks));

    // Add the bookId to recommendedBooks if it's not already there
    if (!uniqueBooks.includes(bookId)) {
      uniqueBooks.push(bookId);
    }

    // Update the recommendation document with the deduplicated recommendedBooks array
    await RecommendationModel.updateOne(
      { _id: recom._id },
      { $set: { recommendedBooks: uniqueBooks } }
    );
  } catch (error) {
    // Handle errors appropriately
    console.error("Error in handleCreateBookRecommendation:", error);
    throw error; // Optional: rethrow the error or handle as needed
  }
}

async function removeDuplicatesInRecommendedBooks() {
  try {
    // Find all recommendation documents
    const recommendations: IRecommendation[] = await RecommendationModel.find({}).populate("recommendedBooks");

    // Create an array to hold bulk operations
    const bulkOps: any[] = [];

    // Iterate through each recommendation document
    recommendations.forEach(recom => {
      // Remove duplicates from recommendedBooks
      let uniqueBooks = Array.from(new Set(recom.recommendedBooks));

      // If there were duplicates, add an update operation to the bulkOps array
      if (uniqueBooks.length !== recom.recommendedBooks.length) {
        bulkOps.push({
          updateOne: {
            filter: { _id: recom._id },
            update: { $set: { recommendedBooks: uniqueBooks } }
          }
        });
      }
    });

    // If there are any operations to perform, execute them
    if (bulkOps.length > 0) {
      await RecommendationModel.bulkWrite(bulkOps);
      console.log("Duplicates removed from recommendedBooks.");
    } else {
      console.log("No duplicates found in recommendedBooks.");
    }
  } catch (error) {
    // Handle errors appropriately
    console.error("Error in removeDuplicatesInRecommendedBooks:", error);
    throw error; // Optional: rethrow the error or handle as needed
  }
}




