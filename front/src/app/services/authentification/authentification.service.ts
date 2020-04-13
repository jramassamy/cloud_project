import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { ReplaySubject } from "rxjs";
import { UserModel } from "src/app/models/UserModel";
import { environment } from 'src/environments/environment';
import { map, take } from "rxjs/operators";
import { Telephone } from "src/app/models/telephone";
@Injectable({
  providedIn: "root"
})
export class AuthentificationService {
  private _registerUrl = environment.baseAPI + "userAPI/register";
  private _connectUrl = environment.baseAPI + "userAPI/login";
  private _rightsUrl = environment.baseAPI + "userAPI/rights";
  private _insertCryptedPhoneUrl = environment.baseAPI + "userAPI/insertCryptedPhone";
  private _currentUserSource = new ReplaySubject<UserModel>(1);
  public _currentUser$ = this._currentUserSource.asObservable(); // used to stream for userService
  private currentUser: UserModel = null; // model passed to _currentUser$
  private currentToken = '';
  constructor(private http: HttpClient, private router: Router) {
  }

  storeItems(userFromAPI) {
    const userCopy = Object.assign({}, userFromAPI);
    delete userCopy['userRights'];
    localStorage.setItem("currentUser", JSON.stringify(userCopy));
  }

  updateUserLocalStorage() {
    const currentUser = {
      token: this.getToken(),
      user: this.currentUser
    };
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    this.emitUserAsObservable();
  }

  registerUser(user, error) {
    return this.http.post<any>(this._registerUrl, user)
      .pipe(
        map(registrationResult => {
          this.storeItems(registrationResult);
          this.initUser(registrationResult.userRights);
          return this.currentUser;
        }));
  }

  connectUser(user, error) {
    return this.http.post<any>(this._connectUrl, user)
      .pipe(
        map(connectionResult => {
          this.storeItems(connectionResult);
          this.initUser(connectionResult.userRights);
          return this.currentUser;
        }));
  }

  loggedIn() {
    return !!localStorage.getItem("currentUser");
  }

  getToken() {
    return JSON.parse(localStorage.getItem("currentUser")).token;
  }

  initUser(userRights?: any) {
    this.currentUser = new UserModel(
      JSON.parse(localStorage.getItem("currentUser")).user
    );
    this.currentToken = this.getToken();
    this.emitUserAsObservable();
    if (userRights) { // gestion du cas de comptes supprimés, duplicat de code
      this.currentUser.initRights(userRights);
    } else { // Si on a pas les droits en paramètre (donc hors connexion/inscription)
      this.getCurrentUserRights();
      // On les récupèrent depuis le serveur
    }
  }

  getCurrentUserRights() {
    this.http.get<any>(this._rightsUrl).subscribe(
      userRights => { // le compte existe
        this.currentUser.initRights(userRights);
        this.emitUserAsObservable();
      },
      err => { // le compte n'existe plus
        localStorage.removeItem("currentUser"); // gestion du cas de comptes supprimés, duplicat de code
        this.currentUser = null;
        this.emitUserAsObservable();
        console.log(err);
      }
    );
    return;
  }

  insertCryptedPhone(phoneNumber: string, verificationCode: string) {
    const phoneModel = new Telephone(phoneNumber);
    const object = {
      phoneModel: phoneModel,
      verificationCode: verificationCode,
    };
    if (this.currentUser) {
      object['userTag'] = this.currentUser.userTag;
    }
    return this.http.post<any>(this._insertCryptedPhoneUrl, object)
      .pipe(
        take(1),
        map(result => {
          if (result.success) { // already connected
            this.currentUser.userVerified = true;
            this.currentUser.telCrypted = result.cryptedData;
            this.updateUserLocalStorage();
          }
          if (result.user) {
            this.storeItems(result);
            this.initUser(result.userRights);
          }
          return result;
        }));
  }
  public emitUserAsObservable() { // Subject as Observable
    this._currentUserSource.next(this.currentUser);
  }

  logoutUser() {
    localStorage.removeItem("currentUser");
    this.currentUser = null;
    this.emitUserAsObservable();
    this.router.navigate(["/"]);
  }

}
