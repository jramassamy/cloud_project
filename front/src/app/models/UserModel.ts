import { UserRightsInterface } from "src/app/models/UserRights";

export interface IUserLinks {
  userSoundcloud: String;
  userFacebook: String;
  userTwitter: String;
  userSnapchat: String;
  userInstagram: String;
  userYoutube: String;
}
export class UserModel {
  email: String;
  userAlias: String;
  userTag: String;
  userPoints: Number;
  userDescription: String;
  userRole: String;
  userLinks: {
    userSoundcloud: String,
    userFacebook: String,
    userTwitter: String,
    userSnapchat: String,
    userInstagram: String,
    userYoutube: String
  };
  musics: Array<String>;
  userVerified: Boolean;
  userRights: UserRightsInterface;
  telCrypted: String;
  constructor(user?: any) {
    this.userLinks = <IUserLinks>{};
    if (user) {
      if (user.email) { // required false but unique
        this.email = user.email;
      }
      this.userAlias = user.userAlias;
      this.userTag = user.userTag;
      this.userVerified = user.userVerified;
      this.userDescription = user.userDescription;
      this.userRole = user.userRole;
      this.userPoints = user.userPoints;
      this.userLinks = user.userLinks;
      this.musics = user.musics;
      if (user.telCrypted) { // required false but unique
        this.telCrypted = user.telCrypted;
      }
    }
  }

  initRights(rights: any) {
    this.userRights = rights;
  }
}
