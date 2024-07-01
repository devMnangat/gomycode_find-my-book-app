import mongoose from "mongoose";


export async function dbConnect() {
    try {
        await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string)
        console.log("MongoDB Connected Successfully")
    } catch (error:any) {
        console.log("An error has occurred "+ error.message)
    }
}

