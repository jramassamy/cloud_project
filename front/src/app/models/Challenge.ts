export class Challenge {
  _id: string;
  challengeArtwork: string;
  challengeName: string;
  challengePrices: {
    first: string;
    second: string;
    third: string;
  };
  processCreatif: Date;
  debutChallenge: Date;
  finChallenge: Date;
  musics: Array<any>;
  electeurs: Array<any>;
  constructor(challenge: any) {
    this.challengePrices = <any>{};
    this._id = challenge._id;
    this.challengeArtwork = challenge.challengeArtwork;
    this.challengeName = challenge.challengeName;
    this.challengePrices = challenge.challengePrices;
    this.processCreatif = challenge.processCreatif;
    this.debutChallenge = challenge.debutChallenge;
    this.finChallenge = challenge.finChallenge;
    this.musics = challenge.musics;
    this.electeurs = challenge.electeurs;
  }
}
