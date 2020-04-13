import jwt from "jsonwebtoken";

export interface IUserJwtData {
    _id: String,
    iat: Number,
    userTag: String
}

export class BaseController {
    public static async verifyToken(token: any) {
        try {
            let jwtUserData: IUserJwtData = null;
            if (token) {
                jwtUserData = await jwt.verify(token, 'currentUserKey');
            }
            return jwtUserData;
        } catch {
            return null;
        }
    }
}