import { IChallengeModel } from "../../Interfaces/Challenge/IChallengeModel";
import { MusicChallengeSchema } from "./musicChallengeDB";
import { ElecteurChallengeSchema } from "./ElecteurChallengeDB";
import mongoose, { Model } from "mongoose";
const Schema = mongoose.Schema;
var MusicChallenge = MusicChallengeSchema;
var ElecteurChallenge = ElecteurChallengeSchema;
export const ChallengeSchema = new Schema({
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

export let Challenge: Model<IChallengeModel> = mongoose.model<IChallengeModel>("challengeData", ChallengeSchema, "Challenge");
