import { Injectable, ViewChild } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeeklyChallengeService {
  private _createChallengeUrl = environment.baseAPI + "challengeAPI/createChallenge";
  private _getNextChallengeUrl = environment.baseAPI + "challengeAPI/getNextChallenge";
  private _getCurrentChallengeUrl = environment.baseAPI + "challengeAPI/getCurrentChallenge";
  private _addParticipantUrl = environment.baseAPI + "challengeAPI/addParticipant";
  private _updateMusicStateUrl = environment.baseAPI + "challengeAPI/updateMusicState";
  private _updateChallengeUrl = environment.baseAPI + "challengeAPI/updateChallenge";
  private _getAllChallengeUrl = environment.baseAPI + "challengeAPI/getAllChallenge";
  private _postVoteUrl = environment.baseAPI + "challengeAPI/postVote";
  private _getAllFinishedChallengeUrl = environment.baseAPI + "challengeAPI/getAllFinishedChallenge";
  private _getLastFinishedChallengeUrl = environment.baseAPI + "challengeAPI/getLastFinishedChallenge";
  countList = 0;
  soundList: ViewChild[] = [];
  private _currentCountList = new ReplaySubject<number>(1);
  _currentCountList$ = this._currentCountList.asObservable();

  constructor(private http: HttpClient) { }

  public createChallenge(challengeData, error) { /*error object with section*/
    return this.http.post<any>(this._createChallengeUrl, challengeData).subscribe(
      result => {
        window.location.reload();
      },
      err => {
        console.log(err);
        error.challenge = "Erreur, voir console.";
      }
    );
  }
  public updateChallenge(challengeData, error) { /*error object with section*/
    return this.http.post<any>(this._updateChallengeUrl, challengeData).subscribe(
      result => {
        window.location.reload();
      },
      err => {
        console.log(err);
        error.challenge = "Erreur, voir console.";
      }
    );
  }
  public getNextChallenge() {
    return this.http.get<any>(this._getNextChallengeUrl);
  }

  public getCurrentChallenge() {
    return this.http.get<any>(this._getCurrentChallengeUrl);
  }

  public postVote(challenge_id, music_id, currentUser) {
    const obj = {
      challenge_id: challenge_id,
      music_id: music_id,
      user: this.userChallengeData(currentUser)
    };
    return this.http.post<any>(this._postVoteUrl, obj);
  }

  public addParticipant(_id, currentUser, soundCloudUrl) {
    const obj = {
      _id: _id,
      user: this.userChallengeData(currentUser),
      soundCloudUrl: soundCloudUrl
    };
    return this.http.post<any>(this._addParticipantUrl, obj);
  }

  public getAllChallenge() {
    return this.http.get<any>(this._getAllChallengeUrl);
  }

  public getAllFinishedChallenge() {
    return this.http.get<any>(this._getAllFinishedChallengeUrl);
  }

  public getLastFinishedChallenge() {
    return this.http.get<any>(this._getLastFinishedChallengeUrl);
  }

  userChallengeData(currentUser) {
    // passage par copie, userForum = currentUser passage par référence.
    const userChallenge = {
      userAlias: currentUser.userAlias,
      userTag: currentUser.userTag,
      email: currentUser.email,
      userVerified: currentUser.userVerified
    };
    return userChallenge;
  }

  updateMusicState(newState, musicId, challengeId) {
    const obj = {
      challenge_id: challengeId,
      music_id: musicId,
      newState: newState
    };
    return this.http.post<any>(this._updateMusicStateUrl, obj);
  }
}
