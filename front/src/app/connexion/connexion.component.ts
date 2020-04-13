import { Component, OnInit, HostListener } from "@angular/core";
import { UserModel } from "src/app/models/UserModel";
import { AuthentificationService } from "src/app/services/authentification/authentification.service";
import { NgForm } from "@angular/forms";
import { ReplaySubject } from "rxjs";
import { Router } from "@angular/router";
import { Meta, Title } from "@angular/platform-browser";
@Component({
  selector: "app-connexion",
  templateUrl: "./connexion.component.html",
  styleUrls: ["./connexion.component.css"]
})
export class ConnexionComponent implements OnInit {
  initialPosition = true;
  userAliasPattern = "(^[A-Za-z0-9])([A-Za-z0-9 _-]*)([A-Za-z0-9]$)";
  soundCloudPattern = "^([a-zA-Z0-9-_]{2,})$";
  error = { inscription: "", connexion: "" };
  userFormData: UserModel = new UserModel();
  key = "6LcW5oQUAAAAAHIiS31NLkDMDceR6gCAawLEmPYI";
  connexionForm = {};
  inscriptionForm = {};
  innerWidth: Number;
  _innerWidthSource = new ReplaySubject<Number>(1);
  public _innerWidth$ = this._innerWidthSource.asObservable();
  constructor(private meta: Meta, private title: Title, private router: Router, private authentificationService: AuthentificationService) {
    this._innerWidth$.subscribe(
      innerWidth => {
        this.innerWidth = innerWidth;
        if (this.innerWidth <= 1200) {
          this.changeState(false, false);
        }
        if (this.innerWidth > 1200) { // petit reset des familles
          this.changeState(true, false);
        }
      }
    );
    this.innerWidth = window.innerWidth;
    this.title.setTitle('Creative Beats - La plateforme des Beatmakers | Connexion');
    // tslint:disable-next-line:max-line-length
    this.meta.updateTag({ name: 'description', content: `Connecte toi directement en cliquant sur ce lien et découvre toute une communauté de beatmakers, participe à divers challenges et gagne en visibilité` });
  }

  ngOnInit() {
    document.getElementById("connectAccount").style.visibility = "hidden";
    document.getElementById("createAccount").style.visibility = "visible";
  }
  clear() { // Reset error msg and userFormData
    this.userFormData = new UserModel();
    this.error.inscription = "";
    this.error.connexion = "";
  }

  changeState(isDesktop: boolean, changePos: boolean) {
    this.clear();
    if (changePos) {
      this.initialPosition = !this.initialPosition;
    }
    if (!this.initialPosition) {
      if (isDesktop) {
        document.getElementById("panel").classList.add("moveRight");
      }
    }
    if (this.initialPosition || !isDesktop) {
      document.getElementById("panel").classList.remove("moveRight");
    }
    this.changePanelVisibility();
    this.changeHeaderVisibility();
  }

  changeHeaderVisibility() {
    if (!this.initialPosition) {
      document.getElementById("createAccountMobile").style.display = "none";
      document.getElementById("connectAccountMobile").style.display = "block";
    } else {
      document.getElementById("connectAccountMobile").style.display = "none";
      document.getElementById("createAccountMobile").style.display = "block";
    }
  }
  changePanelVisibility() {
    if (!this.initialPosition) {
      document.getElementById("createAccount").style.visibility = "hidden";
      setTimeout(() => {
        document.getElementById("connectAccount").style.visibility = "visible";
      }, 300);
    } else {
      document.getElementById("connectAccount").style.visibility = "hidden";
      setTimeout(() => {
        document.getElementById("createAccount").style.visibility = "visible";
      }, 300);
    }
  }
  onSubmitConnexion(connexionForm: NgForm) {
    if (connexionForm.valid) {
      this.authentificationService.connectUser(this.userFormData, this.error).subscribe(
        currentUser => {
          this.router.navigate(["/"]);
        },
        err => {
          if (err.error === "email") {
            this.error.connexion = "Mail inexistant.";
          } else if (err.error === "password") {
            this.error.connexion = "Mot de passe incorrect.";
          }
        }
      );
    } else {
      this.error.connexion = 'Remplis correctement le formulaire :)';
    }
  }

  onSubmitInscription(inscriptionForm: NgForm) {
    if (inscriptionForm.valid) {
      this.generateUserTag(this.userFormData);
      this.authentificationService.registerUser(this.userFormData, this.error)
        .subscribe(
          currentUser => {
            this.router.navigate(["/"]);
          },
          err => {
            console.log(err);
            if (err.error === "email") {
              this.error.inscription = "Mail déjà existant.";
            } else if (err.error === "userAlias") {
              this.error.inscription = "Pseudonyme déjà pris.";
            } else {
              this.error.inscription = "Erreur inconnue, contactez nous par mail.";
            }
          }
        );
    } else {
      this.error.inscription = 'Remplis correctement le formulaire :)';
    }
  }

  generateUserTag(user) {
    let userAliasToArray = user.userAlias.split(" ").join('_').split("_").join('-').split("-");
    userAliasToArray = userAliasToArray.filter(data => data !== "");
    user.userTag = userAliasToArray.join('-').toLowerCase();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event) {
    if (this.innerWidth > 1200 && event.currentTarget.innerWidth <= 1200
      || this.innerWidth <= 1200 && event.currentTarget.innerWidth > 1200) {
      this._innerWidthSource.next(event.currentTarget.innerWidth);
    }
  }
}
