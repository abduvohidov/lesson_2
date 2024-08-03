import mongoose from "mongoose";

export const mongo = async () => {
    return await mongoose.connect("mongodb://localhost://27017/movies")
}