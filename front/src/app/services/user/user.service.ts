import { Injectable } from '@angular/core';
import { AuthentificationService } from "src/app/services/authentification/authentification.service";
import { UserModel } from 'src/app/models/UserModel';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public currentUser: UserModel = null;
  private _updateUserUrl = environment.baseAPI + "userAPI/update";
  private _addMusicUrl = environment.baseAPI + "userAPI/addMusic";
  private _loadUserByTagUrl = environment.baseAPI + "userAPI/loadUserByTag";
  constructor(private http: HttpClient, private authServ: AuthentificationService) {
    this.authServ._currentUser$.subscribe(
      currentUser => {
        this.currentUser = currentUser;
      }
    );
  }

  isConnected() {
    return (this.currentUser !== null);
  }

  updateUser(userToUpdate: UserModel) {
    return this.http.post<any>(this._updateUserUrl, userToUpdate)
      .pipe(
        map(userResult => {
          this.currentUser = userToUpdate;
          this.updateUserAfterUpdate();
          return userResult;
        }));
  }
  addMusic(userTag, userMusic) {
    const dataToSend = {
      userTag: userTag,
      userMusic: userMusic
    };
    return this.http.post<any>(this._addMusicUrl, dataToSend)
      .pipe(
        map(addMusicResult => {
          this.currentUser.musics.push(userMusic);
          this.updateUserAfterUpdate();
          return addMusicResult;
        }));
  }
  loadUserByTag(userTag) {
    const headersParamaters = { userTag: userTag };
    const httpOptions = {
      headers: { 'Content-Type': 'application/json' },
      params: { ...headersParamaters}
    };
    return this.http.get<any>(this._loadUserByTagUrl, httpOptions);
  }

  updateUserAfterUpdate() {
    const currentUser = {
      token: this.authServ.getToken(),
      user: this.currentUser
    };
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }

  userCanAccessAdminDashboard() {
    if (this.currentUser) {
      if (this.currentUser.userRights) {
        return (
          this.currentUser.userRights.CHALLENGE.CHALLENGE_ACCESSADMIN_RIGHTS ||
          this.currentUser.userRights.FORUM.FORUM_ACCESSADMIN_RIGHTS ||
          this.currentUser.userRights.HONORED_BEATMAKER.HONORED_BEATMAKER_ACCESSADMIN_RIGHTS ||
          this.currentUser.userRights.UTILITAIRE.UTILITAIRE_ACCESSADMIN_RIGHTS
        );
      }
    }
    return false;
  }
  canPinTopic() {
    if (this.currentUser) {
      if (this.currentUser.userRights) {
        return (
          this.currentUser.userRights.FORUM.FORUM_MODERATE_MESSAGE
        );
      }
    }
    return false;
  }
}
