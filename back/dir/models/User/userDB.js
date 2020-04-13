"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
exports.UserSchema = new Schema({
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
exports.User = mongoose_1.default.model("user", exports.UserSchema, "User");
//# sourceMappingURL=userDB.js.map