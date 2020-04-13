import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const MusicChallengeSchema = new Schema({
    user: { type: Schema.Types.Mixed, required: true },
    musicUrl: { type: String, required: true },
    state: { type: String, enum: ['waitingValidation', 'approved', 'rejected'], required: true },
    createdDate: { type: Date, required: true },
    vote: { type: Number, required: true }
});
