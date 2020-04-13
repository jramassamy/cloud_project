"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const musicChallengeDB_1 = require("./musicChallengeDB");
const ElecteurChallengeDB_1 = require("./ElecteurChallengeDB");
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
var MusicChallenge = musicChallengeDB_1.MusicChallengeSchema;
var ElecteurChallenge = ElecteurChallengeDB_1.ElecteurChallengeSchema;
exports.ChallengeSchema = new Schema({
    processCreatif: { type: Date, required: true, unique: true, dropDups: true },
    debutChallenge: { type: Date, required: true, unique: true, dropDups: true },
    finChallenge: { type: Date, required: true, unique: true, dropDups: true },
    challengeArtwork: { type: String, required: true },
    challengeName: { type: String, required: true },
    challengeWinner: { type: Schema.Types.Mixed },
    challengePrices: {
        first: String,
        second: String,
        third: String
    },
    musics: [MusicChallenge],
    electeurs: [ElecteurChallenge]
});
exports.Challenge = mongoose_1.default.model("challengeData", exports.ChallengeSchema, "Challenge");
//# sourceMappingURL=challengeDB.js.map