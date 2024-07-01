import { Book } from "@/types/book";
import { Schema, model, models } from "mongoose";


const bookSchema: Schema<Book> = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    authors: {
        type: [String],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
        validate: {
            validator: (v: string) => /^(ftp|http|https):\/\/[^ "]+$/.test(v),
            message: (props: { value: string }) => `${props.value} is not a valid URL!`
        }
    },
    infolink: {
        type: String,
        required: true,
        validate: {
            validator: (v: string) => /^(ftp|http|https):\/\/[^ "]+$/.test(v),
            message: (props: { value: string }) => `${props.value} is not a valid URL!`
        }
    }
});


const BookModel =
  models.Book || model("Book", bookSchema);

export default BookModel;
