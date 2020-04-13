import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const ElecteurChallengeSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, ref: "User" },
    user: { type: Schema.Types.Mixed, required: true },
    vote: { type: Number, required: true },
    musics_id: [{ type: Schema.Types.ObjectId }]
});
