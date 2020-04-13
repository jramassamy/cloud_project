import mongoose, { Schema, Document, Model } from 'mongoose';
import { IUserModel } from '../../Interfaces/User/IUserModel';
const Schema = mongoose.Schema;

export const UserSchema = new Schema({
  email: { type: String, sparse: true, unique: true },
  userAlias: { type: String, required: true, unique: true, dropDups: true },
  userTag: { type: String, required: true, unique: true, dropDups: true },
  userPwd: { type: String, required: true },
  userVerified: { type: Boolean, default: false },
  telCrypted: { type: String, sparse: true, unique: true },
  userDescription: { type: String, default: '' },
  userRole: {
    type: String,
    enum: ["root", "administrateur", "beatmaker", "moderateur", "membre"],
    default: "membre"
  },
  userPoints: { type: Number, default: 0 },
  userLinks: {
    userSoundcloud: { type: String, default: '' },
    userFacebook: { type: String, default: '' },
    userTwitter: { type: String, default: '' },
    userSnapchat: { type: String, default: '' },
    userInstagram: { type: String, default: '' },
    userYoutube: { type: String, default: '' }
  },
  musics: { type: [String], default: [] }
});

// Export the model and return your IUser interface
export let User: Model<IUserModel> = mongoose.model<IUserModel>("user", UserSchema, "User");
