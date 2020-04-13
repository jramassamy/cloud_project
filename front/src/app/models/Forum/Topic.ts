import { UserModel } from "src/app/models/UserModel";
import { MessageModel } from "src/app/models/Forum/Message";

export class TopicModel {
  _id: String;
  urlSection: String;
  titleTopic: String;
  idTopic: String;
  creator: any; // UserModel Light
  lastUser: any; // UserModel Light
  createdDate: Date;
  lastUpdateDate: Date;
  pinSection: Boolean;
  pinForum: Boolean;
  nbMessage: Number;
  nbParticipant: Number;
  Messages: Array<MessageModel>;
  constructor(titleTopic: String, urlSection: String, dataModel: String,
    currentUser: UserModel, pinSection: Boolean, pinForum: Boolean) { // only used for creation
    this.titleTopic = titleTopic;
    if (pinForum) {
      this.pinSection = false;
      this.urlSection = "global";
    } else {
      this.pinSection = pinSection;
      this.urlSection = urlSection;
    }
    this.idTopic = titleTopic.split(' ').join('-').split(',').join('').toLowerCase();
    const userForumData = TopicModel.userForumData(currentUser);
    this.creator = userForumData;
    this.lastUser = userForumData;
    this.pinForum = pinForum;
    this.Messages = [new MessageModel(userForumData, dataModel)];
    this.nbParticipant = 1;
    this.nbMessage = 1;
    this.lastUpdateDate = new Date;
  }

  static userForumData(currentUser) {
    // passage par copie, userForum = currentUser passage par référence.
    const userForum = {
      userAlias: currentUser.userAlias,
      userTag: currentUser.userTag,
      email: currentUser.email
    };
    return userForum;
  }
}
