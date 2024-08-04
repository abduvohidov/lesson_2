import { model, Schema, Types } from "mongoose";

const userSchema = new Schema({
    id: {
        type: Types.ObjectId
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
}, {
    collection: 'users'
});

export const usersSchema = model('User', userSchema);
