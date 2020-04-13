"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const challengeDB_1 = require("../models/Challenge/challengeDB");
const baseController_1 = require("./baseController");
const request_1 = __importDefault(require("request"));
const userDB_1 = require("../models/User/userDB");
class ChallengeController {
    /*OK*/
    createChallenge(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('createChallenge', req.body);
            const challengeBody = req.body;
            const newChallenge = new challengeDB_1.Challenge(challengeBody);
            const jwtUserData = yield baseController_1.BaseController.verifyToken(req.headers['token']);
            if (jwtUserData) {
                let newChallengeResult = yield newChallenge.save();
                if (newChallengeResult) {
                    res.status(200).send({ newChallengeResult });
                    return;
                }
            }
            res.status(400).send();
            return;
        });
    }
    /*OK*/
    updateChallenge(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const jwtUserData = yield baseController_1.BaseController.verifyToken(req.headers['token']);
            if (jwtUserData) {
                let updateResult = yield challengeDB_1.Challenge.updateOne({
                    "_id": req.body._id
                }, {
                    $set: {
                        "processCreatif": req.body.processCreatif,
                        "debutChallenge": req.body.debutChallenge,
                        "finChallenge": req.body.finChallenge,
                        "challengeArtwork": req.body.challengeArtwork,
                        "challengeName": req.body.challengeName,
                        "challengePrices": req.body.challengePrices
                    }
                });
                if (updateResult.nModified) {
                    res.status(200).send();
                    return;
                }
            }
            res.status(400).send();
            return;
        });
    }
    /*A TESTER*/
    getNextChallenge(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /*  db.col.find().sort({"datetime": -1}).limit(1)
                Get last processCreatif <= currentDate &&
                son debutChallenge > currentDate
            */
            let challengeResult = yield challengeDB_1.Challenge.aggregate([
                {
                    $match: {
                        "processCreatif": { $lte: new Date() }
                    }
                },
                { $sort: { "processCreatif": -1 } },
                { $limit: 1 }
            ]);
            if (challengeResult.length === 1) {
                let challenge = challengeResult[0];
                const currentDate = new Date();
                if (challenge.debutChallenge > currentDate) {
                    res.status(200).send(challenge);
                    return;
                }
            }
            res.status(400).send();
            return;
        });
    }
    /*OK*/
    getCurrentChallenge(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /*  db.col.find().sort({"datetime": -1}).limit(1)
                Get last debutChallenge <= currentDate &&
                son finChallenge > currentDate
            */
            let challengeResult = yield challengeDB_1.Challenge.aggregate([
                {
                    $match: {
                        "debutChallenge": { $lte: new Date() }
                    }
                },
                { $sort: { "debutChallenge": -1 } },
                { $limit: 1 }
            ]);
            if (challengeResult.length === 1) {
                let challenge = challengeResult[0];
                const currentDate = new Date();
                if (challenge.finChallenge > currentDate) {
                    res.status(200).send(challenge);
                    return;
                }
            }
            res.status(400).send();
            return;
        });
    }
    /*OK*/
    addParticipant(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const jwtUserData = yield baseController_1.BaseController.verifyToken(req.headers['token']);
            if (jwtUserData) {
                const participantMusicExist = yield ChallengeController.participantMusicExist$(req.body._id, req.body.soundCloudUrl);
                if (!participantMusicExist) {
                    let updateChallenge = yield ChallengeController.updateChallenge$(req.body._id, req.body.user, req.body.soundCloudUrl);
                    if (updateChallenge) {
                        res.status(200).send({ message: 'Ok.' });
                        return;
                    }
                    else {
                        res.status(400).send({ message: 'Error on update.' });
                        return;
                    }
                }
                else {
                    res.status(400).send({ message: 'Music already exist.' });
                    return;
                }
            }
            res.status(400).send({ message: 'Utilisateur non connecté.' });
            return;
        });
    }
    /*OK*/
    static participantMusicExist$(id, urlToCheck) {
        return __awaiter(this, void 0, void 0, function* () {
            let musicUrlExist = false;
            let challengeResult = yield challengeDB_1.Challenge.findOne({ "_id": id });
            if (challengeResult) {
                let musicsLength = challengeResult.musics.length;
                let i = 0;
                let challengeMusic;
                while (!musicUrlExist && i < musicsLength) {
                    challengeMusic = challengeResult.musics[i];
                    musicUrlExist = (challengeMusic.musicUrl === urlToCheck);
                    i++;
                }
            }
            return musicUrlExist;
        });
    }
    /*OK*/
    static updateChallenge$(id, user, soundCloudUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            let findMusicParticipant = yield challengeDB_1.Challenge.findOne({ "_id": id, "musics.user.userTag": user.userTag });
            if (findMusicParticipant) {
                result = yield challengeDB_1.Challenge.updateOne({ "_id": id, "musics.user.userTag": user.userTag }, {
                    $set: {
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
                result = yield challengeDB_1.Challenge.updateOne({ "_id": id }, {
                    $addToSet: {
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
        });
    }
    /*OK*/
    getAllChallenge(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let challengeListResult = yield challengeDB_1.Challenge.find({}).lean().exec();
            if (challengeListResult.length) {
                let musicWaitingState = 0;
                let musicApproved = 0;
                let musicRejected = 0;
                for (let i = 0; i < challengeListResult.length; i++) {
                    const challenge = challengeListResult[i];
                    for (let j = 0; j < challenge.musics.length; j++) {
                        const musicState = challenge.musics[j].state;
                        if (musicState) {
                            if (musicState === 'waitingValidation')
                                musicWaitingState++;
                            else if (musicState === 'approved')
                                musicApproved++;
                            else if (musicState === 'rejected')
                                musicRejected++;
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
        });
    }
    getLastFinishedChallenge(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const challengeResult = yield challengeDB_1.Challenge.aggregate([
                {
                    $match: {
                        "finChallenge": { $lte: new Date() }
                    }
                },
                { $sort: { "finChallenge": -1 } },
                { $limit: 1 }
            ]);
            if (challengeResult.length === 1) {
                let challenge = challengeResult[0];
                challenge.musics = challenge.musics.sort((a, b) => { if (a.vote > b.vote) {
                    return 1;
                } });
                const userResult = yield userDB_1.User.findOne({ "userTag": challenge.musics[challenge.musics.length - 1].user.userTag });
                res.status(200).send({ challenge: challenge, user: userResult });
                return;
            }
            res.status(400).send();
            return;
        });
    }
    getAllFinishedChallenge(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const challengeResult = yield challengeDB_1.Challenge.aggregate([
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
        });
    }
    /*OK*/
    updateMusicState(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var challenge_id = req.body.challenge_id;
            var music_id = req.body.music_id;
            let result = yield challengeDB_1.Challenge.updateOne({
                "_id": challenge_id,
                "musics._id": music_id
            }, {
                $set: {
                    "musics.$.state": req.body.newState
                }
            });
            if (result.nModified) {
                res.status(200).send();
                return;
            }
            res.status(400).send();
            return;
        });
    }
    /*OK*/
    postVote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let challenge_id = req.body.challenge_id;
            let music_id = req.body.music_id;
            const jwtUserData = yield baseController_1.BaseController.verifyToken(req.headers['token']);
            if (jwtUserData) {
                let user = yield userDB_1.User.findOne({ email: req.body.user.email });
                if (user.userRole === 'beatmaker' || user.userRole === 'administrateur') {
                    req.body.user['_id'] = jwtUserData._id;
                    let objReference = {}; //objReference['electeurData'] si update bien effectué.
                    if (yield ChallengeController.updateElecteur(challenge_id, req.body.user, music_id, objReference)) {
                        const updateVoteArtistSound = yield challengeDB_1.Challenge.updateOne({
                            "_id": challenge_id,
                            "musics._id": music_id
                        }, {
                            $inc: {
                                "musics.$.vote": 1
                            }
                        });
                        if (updateVoteArtistSound.nModified === 1) {
                            res.status(200).send(objReference['electeurData']);
                            return;
                        }
                        else {
                            res.status(400).send({ message: "problème update musique artiste" });
                            return;
                        }
                    }
                    else {
                        res.status(400).send({ message: "l'electeur a dépassé son quota de vote" });
                        return;
                    }
                }
            }
            res.status(400).send();
            return;
        });
    }
    /*OK*/
    static updateElecteur(challenge_id, user, music_id, objReference) {
        return __awaiter(this, void 0, void 0, function* () {
            let updateElecteurDocResult;
            let electeurVote = yield ChallengeController.ElecteurVoteNumber(challenge_id, user);
            if (electeurVote === -1) {
                updateElecteurDocResult = yield challengeDB_1.Challenge.updateOne({
                    "_id": challenge_id
                }, {
                    $addToSet: {
                        "electeurs": [{
                                _id: user._id,
                                user: user,
                                vote: 1,
                                musics_id: [music_id]
                            }]
                    },
                });
            }
            else if (electeurVote > -1 && electeurVote <= 2) { // quota de vote : 3.
                let musicIdExist = yield ChallengeController.checkMusicIdExist(challenge_id, music_id, user._id);
                if (musicIdExist === false) {
                    updateElecteurDocResult =
                        yield challengeDB_1.Challenge.updateOne({
                            "_id": challenge_id, "electeurs._id": user._id
                        }, {
                            $inc: { "electeurs.$.vote": 1 },
                            $push: { "electeurs.$.musics_id": music_id }
                        });
                }
                else { // id de la musique déjà présent
                    return false;
                }
            }
            else { // vote = à 3, on ne peut pas dépasser le quota
                return false;
            }
            let electeurResult = yield challengeDB_1.Challenge.findOne({
                "_id": challenge_id,
                "electeurs._id": user._id
            }, { "electeurs.$": 1 }).lean();
            objReference['electeurData'] = electeurResult;
            return (updateElecteurDocResult.nModified === 1);
        });
    }
    /*OK*/
    static ElecteurVoteNumber(challenge_id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            let electeurVote = -1;
            let electeurDocResult = yield challengeDB_1.Challenge.findOne({
                "_id": challenge_id,
                "electeurs._id": user._id
            }, { "electeurs.$": 1 }).lean();
            if (electeurDocResult) {
                electeurVote = electeurDocResult.electeurs[0].vote;
            }
            return electeurVote;
        });
    }
    /*OK*/
    static checkMusicIdExist(challenge_id, music_id, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let exist = false;
            let challengeResult = yield challengeDB_1.Challenge.findOne({
                "_id": challenge_id,
                "electeurs._id": user_id
            }, { "electeurs.$": 1 }).lean();
            if (challengeResult) {
                const electeurListMusic = challengeResult.electeurs[0];
                electeurListMusic.musics_id.forEach(currentMusicId => {
                    if (music_id.toString() === currentMusicId.toString()) {
                        exist = true;
                    }
                });
            }
            return exist;
        });
    }
    /*OK*/
    getSoundCloudMusic(req, res) {
        request_1.default(req.query.url, function (error, response, body) {
            if (error) {
                res.status(400).send();
            }
            else {
                var soundInformations = JSON.parse(body);
                res.status(200).send(soundInformations);
            }
        });
    }
}
exports.ChallengeController = ChallengeController;
//# sourceMappingURL=challengeController.js.map