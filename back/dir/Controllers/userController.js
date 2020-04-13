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
const baseController_1 = require("./baseController");
const userDB_1 = require("../models/User/userDB");
const userRightsDB_1 = require("../models/UserRights/userRightsDB");
const IUserRightsModel_1 = require("../Interfaces/UserRights/IUserRightsModel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const BCRYPT_SALT_ROUNDS = 10;
const S3 = new aws_sdk_1.default.S3();
class UserController {
    registerUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userBody = req.body;
            let objReference = {};
            if (yield UserController.createUser(userBody, objReference)) {
                const user = objReference['user'];
                const userRights = objReference['userRights'];
                const token = objReference['token'];
                res.status(200).send({ user, userRights, token });
                return;
            }
            res.status(400).send();
            return;
        });
    }
    static createUser(userBody, objReference) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = new userDB_1.User(userBody);
            let pwdHashedResult = yield bcryptjs_1.default.hash(currentUser.userPwd, BCRYPT_SALT_ROUNDS);
            currentUser.userPwd = pwdHashedResult;
            let user = yield currentUser.save();
            if (user) {
                const payload = { _id: user._id, userTag: user.userTag };
                const token = jsonwebtoken_1.default.sign(payload, 'currentUserKey');
                let userRights = yield UserController.registerUserRights$(user._id);
                if (userRights) {
                    objReference['user'] = user;
                    objReference['userRights'] = userRights;
                    objReference['token'] = token;
                    return true;
                }
                else {
                    console.log('echec droits', userRights);
                }
            }
            console.log('echec utilisateur');
            return false;
        });
    }
    /*OK*/
    checkLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let userBody = req.body;
            let user = yield userDB_1.User.findOne({ email: userBody.email }).select('-__v');
            let bcryptResult = false;
            if (user) {
                bcryptResult = yield bcryptjs_1.default.compare(userBody.userPwd, user.userPwd);
            }
            if (bcryptResult) {
                const payload = { _id: user._id, userTag: user.userTag };
                const token = jsonwebtoken_1.default.sign(payload, 'currentUserKey');
                const userRights = yield UserController.getUserRightsById$(user._id);
                if (userRights) {
                    // after jwtToken remove _id when sending request - security
                    user._id = null;
                    res.status(200).send({ user, userRights, token });
                    return;
                }
            }
            if (!user) {
                res.status(400).send('email');
            }
            else {
                res.status(400).send('password');
            }
            return;
        });
    }
    /*OK*/
    static registerUserRights$(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUserRightsModel = IUserRightsModel_1.initRights(userId);
            const currentUserRights = new userRightsDB_1.UserRights(currentUserRightsModel);
            try {
                let result = yield currentUserRights.save();
                return result;
            }
            catch (err) {
                return null;
            }
        });
    }
    /*OK*/
    static getUserRightsById$(_idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let currentUserRights = yield userRightsDB_1.UserRights.findOne({ _id: _idUser }).select('-__v -_id');
                return currentUserRights;
            }
            catch (_a) {
                return null;
            }
        });
    }
    /*OK*/
    getUserRights(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const jwtUserData = yield baseController_1.BaseController.verifyToken(req.headers['token']);
            if (jwtUserData) {
                const userRights = yield UserController.getUserRightsById$(jwtUserData._id);
                if (userRights) {
                    res.status(200).send(userRights);
                    return;
                }
            }
            res.status(400).send();
            return;
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const jwtUserData = yield baseController_1.BaseController.verifyToken(req.headers['token']);
                const user = req.body;
                if (jwtUserData) {
                    const result = yield userDB_1.User.updateOne({ "userTag": req.body.userTag }, {
                        $set: {
                            "userDescription": user.userDescription,
                            "userLinks": user.userLinks
                        }
                    });
                    if (result.nModified >= 1) {
                        res.status(200).send({ success: true });
                        return;
                    }
                    res.status(400).send({ success: false });
                    return;
                }
            }
            catch (err) {
                res.status(400).send(err);
                return;
            }
        });
    }
    addMusic(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield userDB_1.User.updateOne({ "userTag": req.body.userTag }, {
                    $addToSet: {
                        "musics": req.body.userMusic
                    }
                });
                if (result.nModified >= 1) {
                    res.status(200).send({ success: true });
                    return;
                }
                res.status(400).send({ success: false });
                return;
            }
            catch (err) {
                res.status(400).send(err);
                return;
            }
        });
    }
    loadUserByTag(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userResult = yield userDB_1.User.findOne({ "userTag": req.query.userTag });
                if (userResult) {
                    res.status(200).send(userResult);
                    return;
                }
                res.status(400).send({ success: false });
            }
            catch (err) {
                res.status(400).send(err);
                return;
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=userController.js.map