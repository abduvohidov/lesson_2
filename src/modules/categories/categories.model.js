import { model, Schema, Types } from "mongoose";

const categorySchema = new Schema({
    id: {
        type: Types.ObjectId
    },
    name: {
        type: String,
        required: true
    }
}, {
    collation: 'categories'
})

export const categoriesSchema = model('Category', categorySchema);