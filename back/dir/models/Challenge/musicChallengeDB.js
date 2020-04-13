"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
exports.MusicChallengeSchema = new Schema({
    user: { type: Schema.Types.Mixed, required: true },
    musicUrl: { type: String, required: true },
    state: { type: String, enum: ['waitingValidation', 'approved', 'rejected'], required: true },
    createdDate: { type: Date, required: true },
    vote: { type: Number, required: true }
});
//# sourceMappingURL=musicChallengeDB.js.map