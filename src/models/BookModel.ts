import { Book } from "@/types/book";
import mongoose, { Schema, model, models, Document } from "mongoose";

// Define the Book schema
const bookSchema: Schema<Book> = new Schema({
  title: { type: String, required: true },
  authors: { type: [String], required: true },
  subtitle: { type: String, required: true },
  imageLinks: {
    smallThumbnail: { type: String, required: true },
    thumbnail: { type: String, required: true },
  },
  previewLink: { type: String, required: true },
  language: { type: String, required: true },
  pageCount: { type: Number, required: true },
  likes: { type: Number, default: 0 },
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [
    {
      id: String,
      text: String,
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      createdAt: { type: Date, default: Date.now() },
    },
  ],
});

// Create the Book model
const BookModel = models.Book || model("Book", bookSchema);

export default BookModel;

// Function to add a comment to a book
export const addCommentToBook = async (bookId: string, comment: { id: string; text: string; userId: string }): Promise<Document | null> => {
  try {
    const book = await BookModel.findById(bookId);
    if (!book) {
      throw new Error("Book not found");
    }

    book.comments.push(comment);
    await book.save();
    return book;
  } catch (error: any) {
    throw new Error(`Error adding comment: ${error.message}`);
  }
};

// Function to get comments for a book
export const getCommentsForBook = async (bookId: string): Promise<Document | null> => {
  try {
    const book = await BookModel.findById(bookId).select('comments');
    if (!book) {
      throw new Error("Book not found");
    }
    return book.comments;
  } catch (error: any) {
    throw new Error(`Error fetching comments: ${error.message}`);
  }
};

// Function to update a comment
export const updateBookComment = async (bookId: string, commentId: string, text: string): Promise<Document | null> => {
  try {
    const book = await BookModel.findOne({ _id: bookId, 'comments.id': commentId });
    if (!book) {
      throw new Error("Book or comment not found");
    }

    const comment = book.comments.id(commentId);
    if (!comment) {
      throw new Error("Comment not found");
    }

    comment.text = text;
    await book.save();
    return book;
  } catch (error: any) {
    throw new Error(`Error updating comment: ${error.message}`);
  }
};

// Function to delete a comment
export const deleteBookComment = async (bookId: string, commentId: string): Promise<Document | null> => {
  try {
    const book = await BookModel.findOne({ _id: bookId, 'comments.id': commentId });
    if (!book) {
      throw new Error("Book or comment not found");
    }

    book.comments.id(commentId).remove();
    await book.save();
    return book;
  } catch (error: any) {
    throw new Error(`Error deleting comment: ${error.message}`);
  }
};

// Function to delete comments without userId
export const deleteCommentsWithoutUserId = async (bookId: string): Promise<Document | null> => {
  try {
    const book = await BookModel.findById(bookId);
    if (!book) {
      throw new Error("Book not found");
    }

    book.comments = book.comments.filter((comment : any) => comment.userId);
    await book.save();
    return book;
  } catch (error: any) {
    throw new Error(`Error deleting comments: ${error.message}`);
  }
};

// Function to delete all comments from a book
export const deleteAllBookComments = async (bookId: string): Promise<Document | null> => {
  try {
    const book = await BookModel.findById(bookId);
    if (!book) {
      throw new Error("Book not found");
    }

    book.comments = [];
    await book.save();
    return book;
  } catch (error: any) {
    throw new Error(`Error deleting all comments: ${error.message}`);
  }
};

// Function to delete all comments from all books
export const deleteAllCommentsFromAllBooks = async (): Promise<any> => {
  try {
    return await BookModel.updateMany({}, { $set: { comments: [] } });
  } catch (error: any) {
    throw new Error(`Error deleting all comments from all books: ${error.message}`);
  }
};

