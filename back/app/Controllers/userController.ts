import { BaseController, IUserJwtData } from "./baseController";
import { Request, Response } from "express";
import { Message } from "../models/Message/messageDB";
import { User } from "../models/User/userDB";
import { UserRights } from "../models/UserRights/userRightsDB";
import { IUserModel } from "../Interfaces/User/IUserModel";
import { IUserRightsModel, initRights } from "../Interfaces/UserRights/IUserRightsModel";
import { Telephone } from "../models/Telephone/telephoneDB";
import { ITelephoneModel } from "../Interfaces/Telephone/ITelephoneModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import md5 from "md5";
import AWS from "aws-sdk";
import { IMongooseUpdate } from "Interfaces/Mongoose/IMongoose";

const BCRYPT_SALT_ROUNDS = 10;
const S3 = new AWS.S3();

export class UserController {
  public async registerUser(req: Request, res: Response) {
    const userBody: IUserModel = req.body;
    let objReference = {};
    if (await UserController.createUser(userBody, objReference)) {
        const user = objReference['user'];
        const userRights = objReference['userRights'];
        const token = objReference['token'];
        res.status(200).send({ user, userRights, token });
        return;
    }
    res.status(400).send();
    return;
  }

  static async createUser(userBody: IUserModel, objReference: any) : Promise<boolean> {
    const currentUser = new User(userBody);
    let pwdHashedResult = await bcrypt.hash(currentUser.userPwd, BCRYPT_SALT_ROUNDS);
    currentUser.userPwd = pwdHashedResult;
    let user: IUserModel = await currentUser.save();
    if (user) {
      const payload = { _id: user._id, userTag: user.userTag };
      const token = jwt.sign(payload, 'currentUserKey');
      let userRights: IUserRightsModel = await UserController.registerUserRights$(user._id);
      if (userRights) {
        objReference['user'] = user;
        objReference['userRights'] = userRights;
        objReference['token'] = token;
        return true;
      } else {
        console.log('echec droits', userRights);
      }
    }
    console.log('echec utilisateur');
    return false;
  }
  /*OK*/
  public async checkLogin(req: Request, res: Response) {
    let userBody: IUserModel = req.body;
    let user: IUserModel = await User.findOne( { email: userBody.email }).select('-__v');
    let bcryptResult: Boolean = false;
    if (user) {
      bcryptResult = await bcrypt.compare(userBody.userPwd, user.userPwd);
    }
    if (bcryptResult) {
      const payload = { _id: user._id, userTag: user.userTag };
      const token = jwt.sign(payload, 'currentUserKey');
      const userRights: IUserRightsModel = await UserController.getUserRightsById$(user._id);
      if (userRights) {
        // after jwtToken remove _id when sending request - security
        user._id = null;
        res.status(200).send({ user, userRights, token });
        return;
      }
    }
    if (!user) {
      res.status(400).send('email');
    } else {
      res.status(400).send('password');
    }
    return;
  }

  /*OK*/
  public static async registerUserRights$(userId: String): Promise<IUserRightsModel> {
    const currentUserRightsModel: IUserRightsModel = initRights(userId);
    const currentUserRights = new UserRights(currentUserRightsModel);
    try {
      let result = await currentUserRights.save();
      return result;
    } catch (err) {
      return null;
    }
  }

  /*OK*/
  public static async getUserRightsById$(_idUser: String): Promise<IUserRightsModel> {
    try {
      let currentUserRights: IUserRightsModel = await UserRights.findOne({ _id: _idUser }).select('-__v -_id');
      return currentUserRights;
    } catch {
      return null;
    }
  }

  /*OK*/
  public async getUserRights(req: Request, res: Response) {
    const jwtUserData: IUserJwtData = await BaseController.verifyToken(req.headers['token']);
    if (jwtUserData) {
      const userRights: IUserRightsModel = await UserController.getUserRightsById$(jwtUserData._id);
      if (userRights) {
        res.status(200).send(userRights);
        return;
      }
    }
    res.status(400).send();
    return;
  }

  public async update(req: Request, res: Response) {
    try {
      const jwtUserData: IUserJwtData = await BaseController.verifyToken(req.headers['token']);
      const user: IUserModel = req.body;
      if (jwtUserData) {
        const result: IMongooseUpdate = await User.updateOne(
          { "userTag": req.body.userTag },
          {
            $set:
            {
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
    } catch (err) {
      res.status(400).send(err);
      return;
    }
  }

  public async addMusic(req: Request, res: Response) {
    try {
      const result: IMongooseUpdate = await User.updateOne(
        { "userTag": req.body.userTag },
        {
          $addToSet:
          {
            "musics": req.body.userMusic
          }
        });
      if (result.nModified >= 1) {
        res.status(200).send({ success: true });
        return;
      }
      res.status(400).send({ success: false });
      return;
    } catch (err) {
      res.status(400).send(err);
      return;
    }
  }

  public async loadUserByTag(req: Request, res: Response) {
    try {
      const userResult = await User.findOne(
        { "userTag": req.query.userTag }
      );
      if (userResult) {
        res.status(200).send(userResult);
        return;
      }
      res.status(400).send({ success: false });
    } catch (err) {
      res.status(400).send(err);
      return;
    }
  }

}
