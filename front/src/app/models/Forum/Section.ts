import { UserModel } from "src/app/models/UserModel";

export class SectionModel {
  _id: String;
  titleSection: String;
  descSection: String;
  urlSection: String;
  nbMessage: Number;
  nbTopic: Number;
  lastUser: UserModel;
  lastMessageDate: Date;
  constructor() {
    this.titleSection = '';
    this.descSection = '';
    this.urlSection = '';
    this.nbMessage = 0;
    this.nbTopic = 0;
  }
}
