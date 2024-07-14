import { Book } from "@/types/book";
import { Schema, model, models } from "mongoose";

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
});

const BookModel = models.Book || model("Book", bookSchema);

export default BookModel;
