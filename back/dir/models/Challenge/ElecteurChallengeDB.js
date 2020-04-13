"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
exports.ElecteurChallengeSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, ref: "User" },
    user: { type: Schema.Types.Mixed, required: true },
    vote: { type: Number, required: true },
    musics_id: [{ type: Schema.Types.ObjectId }]
});
//# sourceMappingURL=ElecteurChallengeDB.js.map