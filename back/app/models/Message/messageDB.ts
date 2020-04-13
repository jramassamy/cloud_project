import mongoose, { Schema, Model } from 'mongoose';
const Schema = mongoose.Schema;

export const MessageSchema = new Schema({
    name: String,
    mail: String,
    tel: String,
    message: String
});

// Export the model and return your IUser interface
export let Message: Model = mongoose.model("message", MessageSchema, "Message");
