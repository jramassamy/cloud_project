import { Document } from 'mongoose';

export interface IMusicChallenge extends Document {
    user: any;
    musicUrl: String,
    state: String,
    createdDate: Date,
    vote: Number
}