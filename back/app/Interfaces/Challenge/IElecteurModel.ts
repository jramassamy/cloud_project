import { Document } from 'mongoose';

export interface IElecteurModel extends Document {
    _id: any;
    user: any;
    vote: Number;
    musics_id: [String];
}