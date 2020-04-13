import { Document } from 'mongoose';

export interface IUserModel extends Document {
  _id: String,
  email: String,
  userAlias: String,
  userTag: String,
  userPwd: String,
  userRole: String,
  userPoints: Number,
  userDescription: String,
  userLinks: {
    userSoundcloud: String,
    userFacebook: String,
    userTwitter: String,
    userSnapchat: String,
    userInstagram: String,
    userYoutube: String
  },
  musics: Array<String>,
  userVerified: Boolean,
  telCrypted: String
}