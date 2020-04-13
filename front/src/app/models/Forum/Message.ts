import { UserModel } from "src/app/models/UserModel";

export class MessageModel {
  user: any; // userModel Light
  content: String;
  date: Date;
  userUpdate: UserModel;
  userUpdateContent: String;

  constructor(user: any, content: String) {
    this.user = user;
    this.content = content;
    this.date = new Date;
  }

}
