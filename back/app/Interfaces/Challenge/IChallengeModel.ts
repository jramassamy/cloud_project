import { Document } from 'mongoose';
import { IMusicChallenge } from './IMusicChallenge';
import { IElecteurModel } from './IElecteurModel';

export interface IChallengeModel extends Document {
    processCreatif: Date;
    debutChallenge: Date;
    finChallenge: Date;
    challengeArtwork: String;
    challengeName: String;
    challengeWinner: any;
    challengePrices: {
        first: String,
        second: String,
        third: String
    };
    musics: [IMusicChallenge],
    electeurs: [IElecteurModel]
}