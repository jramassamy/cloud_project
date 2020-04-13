import { Request, Response } from "express";
import { Challenge } from "../models/Challenge/challengeDB";
import { IChallengeModel } from "../Interfaces/Challenge/IChallengeModel";
import { IMongooseUpdate, IMongooseSelect } from "../Interfaces/Mongoose/IMongoose";
import { BaseController, IUserJwtData } from "./baseController";
import Req from 'request';
import { IMusicChallenge } from "Interfaces/Challenge/IMusicChallenge";
import { IElecteurModel } from "Interfaces/Challenge/IElecteurModel";
import { User } from "../models/User/userDB";
import { IUserModel } from "Interfaces/User/IUserModel";

export class ChallengeController {
    /*OK*/
    public async createChallenge(req: Request, res: Response) {
        console.log('createChallenge', req.body);
        const challengeBody: IChallengeModel = req.body;
        const newChallenge = new Challenge(challengeBody);
        const jwtUserData: IUserJwtData = await BaseController.verifyToken(req.headers['token']);
        if (jwtUserData) {
            let newChallengeResult = await newChallenge.save();
            if (newChallengeResult) {
                res.status(200).send({ newChallengeResult });
                return;
            }
        }
        res.status(400).send();
        return;
    }

    /*OK*/
    public async updateChallenge(req: Request, res: Response) {
        const jwtUserData: IUserJwtData = await BaseController.verifyToken(req.headers['token']);
        if (jwtUserData) {
            let updateResult = await Challenge.updateOne({
                "_id": req.body._id
            },
                {
                    $set:
                    {
                        "processCreatif": req.body.processCreatif,
                        "debutChallenge": req.body.debutChallenge,
                        "finChallenge": req.body.finChallenge,
                        "challengeArtwork": req.body.challengeArtwork,
                        "challengeName": req.body.challengeName,
                        "challengePrices": req.body.challengePrices
                    }
                },
            );
            if (updateResult.nModified) {
                res.status(200).send();
                return;
            }
        }
        res.status(400).send();
        return;
    }
    /*A TESTER*/
    public async getNextChallenge(req: Request, res: Response) {
        /*  db.col.find().sort({"datetime": -1}).limit(1)
            Get last processCreatif <= currentDate && 
            son debutChallenge > currentDate 
        */
        let challengeResult: IMongooseSelect = await Challenge.aggregate([
            {
                $match: {
                    "processCreatif": { $lte: new Date() }
                }
            },
            { $sort: { "processCreatif": -1 } }, // On récupère le plus récent
            { $limit: 1 }
        ]);
        if (challengeResult.length === 1) {
            let challenge: IChallengeModel = challengeResult[0];
            const currentDate: Date = new Date();
            if (challenge.debutChallenge > currentDate) {
                res.status(200).send(challenge);
                return;
            }
        }
        res.status(400).send();
        return;
    }
    /*OK*/
    public async getCurrentChallenge(req: Request, res: Response) {
        /*  db.col.find().sort({"datetime": -1}).limit(1)
            Get last debutChallenge <= currentDate && 
            son finChallenge > currentDate 
        */
        let challengeResult: IMongooseSelect = await Challenge.aggregate([
            {
                $match: {
                    "debutChallenge": { $lte: new Date() }
                }
            },
            { $sort: { "debutChallenge": -1 } }, // On récupère le plus récent
            { $limit: 1 }
        ]);
        if (challengeResult.length === 1) {
            let challenge: IChallengeModel = challengeResult[0];
            const currentDate: Date = new Date();
            if (challenge.finChallenge > currentDate) {
                res.status(200).send(challenge);
                return;
            }
        }
        res.status(400).send();
        return;
    }

    /*OK*/
    public async addParticipant(req: Request, res: Response) {
        const jwtUserData: IUserJwtData = await BaseController.verifyToken(req.headers['token']);
        if (jwtUserData) {
            const participantMusicExist = await ChallengeController.participantMusicExist$(req.body._id, req.body.soundCloudUrl);
            if (!participantMusicExist) {
                let updateChallenge = await ChallengeController.updateChallenge$(req.body._id, req.body.user, req.body.soundCloudUrl);
                if (updateChallenge) {
                    res.status(200).send({ message: 'Ok.' });
                    return;
                }
                else {
                    res.status(400).send({ message: 'Error on update.' });
                    return;
                }
            } else {
                res.status(400).send({ message: 'Music already exist.' });
                return;
            }
        }
        res.status(400).send({ message: 'Utilisateur non connecté.' });
        return;
    }

    /*OK*/
    static async participantMusicExist$(id, urlToCheck) {
        let musicUrlExist = false;
        let challengeResult = await Challenge.findOne({ "_id": id });
        if (challengeResult) {
            let musicsLength = challengeResult.musics.length;
            let i = 0;
            let challengeMusic: IMusicChallenge;
            while (!musicUrlExist && i < musicsLength) {
                challengeMusic = challengeResult.musics[i];
                musicUrlExist = (challengeMusic.musicUrl === urlToCheck);
                i++;
            }
        }
        return musicUrlExist;
    }
    /*OK*/
    static async updateChallenge$(id, user, soundCloudUrl) {
        let result: IMongooseUpdate;
        let findMusicParticipant = await Challenge.findOne({ "_id": id, "musics.user.userTag": user.userTag });
        if (findMusicParticipant) {
            result = await Challenge.updateOne(
                { "_id": id, "musics.user.userTag": user.userTag },
                {
                    $set:
                    {
                        "musics.$": [{
                            user: user,
                            musicUrl: soundCloudUrl,
                            state: 'waitingValidation',
                            vote: 0,
                            createdDate: Date.now(),
                        }]
                    },
                });
        }
        else {
            result = await Challenge.updateOne(
                { "_id": id },
                {
                    $addToSet:
                    {
                        "musics": [{
                            user: user,
                            musicUrl: soundCloudUrl,
                            state: 'waitingValidation',
                            vote: 0,
                            createdDate: Date.now(),
                        }]
                    },
                });
        }
        if (result.nModified >= 1) {
            return true;
        }
        return false;
    }
    /*OK*/
    public async getAllChallenge(req: Request, res: Response) {
        let challengeListResult = await Challenge.find({}).lean().exec();
        if (challengeListResult.length) {
            let musicWaitingState = 0;
            let musicApproved = 0;
            let musicRejected = 0;
            for (let i = 0; i < challengeListResult.length; i++) {
                const challenge: IChallengeModel = challengeListResult[i];
                for (let j = 0; j < challenge.musics.length; j++) {
                    const musicState: String = challenge.musics[j].state;
                    if (musicState) {
                        if (musicState === 'waitingValidation') musicWaitingState++;
                        else if (musicState === 'approved') musicApproved++;
                        else if (musicState === 'rejected') musicRejected++;
                    }
                }
                challenge['waitingValidation'] = musicWaitingState;
                challenge['musicApproved'] = musicApproved;
                challenge['musicRejected'] = musicRejected;
                musicWaitingState = 0;
                musicApproved = 0;
                musicRejected = 0;
            }
            res.status(200).send(challengeListResult);
            return;
        }
    }

    public async getLastFinishedChallenge(req: Request, res: Response) {
        const challengeResult = await Challenge.aggregate([
            {
                $match: {
                    "finChallenge": { $lte: new Date() }
                }
            },
            { $sort: { "finChallenge": -1 } }, // On récupère le plus récent en premier
            { $limit: 1 }
        ]);
        if (challengeResult.length === 1) {
            let challenge: IChallengeModel = challengeResult[0];
            challenge.musics = challenge.musics.sort((a, b) => { if (a.vote > b.vote) { return 1; }});
            const userResult = await User.findOne({ "userTag": challenge.musics[challenge.musics.length-1].user.userTag });
            res.status(200).send({ challenge: challenge, user: userResult });
            return;
        }
        res.status(400).send();
        return;
    }
    public async getAllFinishedChallenge(req: Request, res: Response) {
        const challengeResult = await Challenge.aggregate([
            {
                $match: {
                    "finChallenge": { $lte: new Date() }
                }
            },
            { $sort: { "finChallenge": -1 } } // On récupère le plus récent en premier
        ]);
        if (challengeResult) {
            res.status(200).send(challengeResult);
            return;
        }
        res.status(400).send();
        return;
    }

    /*OK*/
    public async updateMusicState(req: Request, res: Response) {
        var challenge_id = req.body.challenge_id;
        var music_id = req.body.music_id;
        let result: IMongooseUpdate =
            await Challenge.updateOne({
                "_id": challenge_id,
                "musics._id": music_id
            },
                {
                    $set:
                    {
                        "musics.$.state": req.body.newState
                    }
                }
            );
        if (result.nModified) {
            res.status(200).send();
            return;
        }
        res.status(400).send();
        return;
    }

    /*OK*/
    public async postVote(req: Request, res: Response) {
        let challenge_id = req.body.challenge_id;
        let music_id = req.body.music_id;
        const jwtUserData: IUserJwtData = await BaseController.verifyToken(req.headers['token']);
        if (jwtUserData) {
            let user: IUserModel = await User.findOne( { email: req.body.user.email });
            if(user.userRole === 'beatmaker' || user.userRole === 'administrateur') {
                req.body.user['_id'] = jwtUserData._id;
                let objReference = {}; //objReference['electeurData'] si update bien effectué.
                if (await ChallengeController.updateElecteur(challenge_id, req.body.user, music_id, objReference)) {
                    const updateVoteArtistSound: IMongooseUpdate =
                        await Challenge.updateOne({
                            "_id": challenge_id,
                            "musics._id": music_id
                        },
                            {
                                $inc:
                                {
                                    "musics.$.vote": 1
                                }
                            });
                    if (updateVoteArtistSound.nModified === 1) {
                        res.status(200).send(objReference['electeurData']);
                        return;
                    } else {
                        res.status(400).send({ message: "problème update musique artiste" });
                        return;
                    }
                } else {
                    res.status(400).send({ message: "l'electeur a dépassé son quota de vote" });
                    return;
                }
        }
        }
        res.status(400).send();
        return;
    }
    /*OK*/
    static async updateElecteur(challenge_id, user, music_id, objReference) {
        let updateElecteurDocResult: IMongooseUpdate;
        let electeurVote = await ChallengeController.ElecteurVoteNumber(challenge_id, user);
        if (electeurVote === - 1) {
            updateElecteurDocResult = await Challenge.updateOne({
                "_id": challenge_id
            },
                {
                    $addToSet:
                    {
                        "electeurs": [{
                            _id: user._id,
                            user: user,
                            vote: 1,
                            musics_id: [music_id]
                        }]
                    },
                }
            );
        } else if (electeurVote > -1 && electeurVote <= 2) { // quota de vote : 3.
            let musicIdExist = await ChallengeController.checkMusicIdExist(challenge_id, music_id, user._id);
            if (musicIdExist === false) {
                updateElecteurDocResult =
                    await Challenge.updateOne(
                        {
                            "_id": challenge_id, "electeurs._id": user._id
                        },
                        {
                            $inc: { "electeurs.$.vote": 1 },
                            $push: { "electeurs.$.musics_id": music_id }
                        });
            } else { // id de la musique déjà présent
                return false;
            }
        } else { // vote = à 3, on ne peut pas dépasser le quota
            return false;
        }
        let electeurResult = await Challenge.findOne({
            "_id": challenge_id,
            "electeurs._id": user._id
        }, { "electeurs.$": 1 }).lean();
        objReference['electeurData'] = electeurResult;
        return (updateElecteurDocResult.nModified === 1);
    }
    /*OK*/
    static async ElecteurVoteNumber(challenge_id, user) {
        let electeurVote = -1;
        let electeurDocResult = await Challenge.findOne({
            "_id": challenge_id,
            "electeurs._id": user._id
        }, { "electeurs.$": 1 }).lean();
        if (electeurDocResult) {
            electeurVote = electeurDocResult.electeurs[0].vote;
        }
        return electeurVote;
    }
    /*OK*/
    static async checkMusicIdExist(challenge_id, music_id, user_id) {
        let exist = false;
        let challengeResult: IChallengeModel =
            await Challenge.findOne({
                "_id": challenge_id,
                "electeurs._id": user_id
            },
                { "electeurs.$": 1 }).lean();
        if (challengeResult) {
            const electeurListMusic: IElecteurModel = challengeResult.electeurs[0];
            electeurListMusic.musics_id.forEach(currentMusicId => {
                if (music_id.toString() === currentMusicId.toString()) {
                    exist = true;
                }
            });
        }
        return exist;
    }
    /*OK*/
    public getSoundCloudMusic(req: Request, res: Response) {
        Req(req.query.url, function (error, response, body) {
            if (error) {
                res.status(400).send()
            } else {
                var soundInformations = JSON.parse(body);
                res.status(200).send(soundInformations);
            }
        });
    }
}
