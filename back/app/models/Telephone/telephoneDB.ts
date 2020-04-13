import mongoose, { Schema, Model } from 'mongoose';
import { ITelephoneModel } from '../../Interfaces/Telephone/ITelephoneModel';
const Schema = mongoose.Schema;

export const TelephoneSchema = new Schema({
    telCrypted: { type: String, required: true }
});

// Export the model and return your ITelephoneModel interface
export let Telephone: Model<ITelephoneModel> = mongoose.model<ITelephoneModel>("telephone", TelephoneSchema, "Telephone");