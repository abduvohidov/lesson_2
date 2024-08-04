import { model, Schema, Types } from "mongoose";

const movieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    releaseDate: {
        type: Date,
        required: true
    },
    category: {
        type: Types.ObjectId,
        ref: 'Category',
        required: true
    }
}, {
    collection: 'movies'
});

export const moviesSchema = model('Movie', movieSchema);
