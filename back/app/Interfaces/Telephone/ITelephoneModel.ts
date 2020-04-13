import { Document } from 'mongoose';

export interface ITelephoneModel extends Document {
    _id: String,
    telCrypted: String
}