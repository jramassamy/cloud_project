import { OnInit, Inject, Component } from '@angular/core';
import { UserModel } from 'src/app/models/UserModel';
import { UserEnum } from 'src/app/models/modal';
import { NgForm } from '@angular/forms';
import { AuthentificationService } from 'src/app/services/authentification/authentification.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

declare var require: any;


@Component({
  selector: 'app-modal-connexion',
  templateUrl: './modal-connexion.component.html',
  styleUrls: ['./modal-connexion.component.css']
})
export class ModalConnexionComponent implements OnInit {

  error = { inscription: "", connexion: "" };
  soundCloudPattern = "^([a-zA-Z0-9-_]{2,})$";
  userFormData: UserModel = new UserModel();
  enteteId: Number;
  contentId: Number;
  key = "6LcW5oQUAAAAAHIiS31NLkDMDceR6gCAawLEmPYI";
  /*firebase*/
  firebase: any;
  verificationCode = '';
  phoneNumber = '';
  codeSendStatus = false;
  infoEnvoieCode = '';
  // messageBtnCode = 'Confirmer mon numéro de tél.';
  pressConfirmationTel = false;
  errorCertifAPI = false;
  errorCertifComparaison = false;
  windowRef: any;
  appVerifier: any;
  entered = false;
  stateConfirmSend = false;
  constructor(
    public dialogRef: MatDialogRef<ModalConnexionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserEnum, private authentificationService: AuthentificationService) {
    if (this.data === 0 /*UserEnum.showFormConnexionOrInscription = 0*/) {
      this.enteteId = 1;
      this.contentId = 1;
    }
  }

  ngOnInit() {
    this.firebase = require('firebase/app');
    require('firebase/auth');
    const config = {
      apiKey: "AIzaSyC4iF8M4Ta7lD_kGruMV5KiH5lZReKsE_Y",
      authDomain: "creativebeats-70f47.firebaseapp.com",
      databaseURL: "https://creativebeats-70f47.firebaseio.com",
      projectId: "creativebeats-70f47",
      storageBucket: "creativebeats-70f47.appspot.com",
      messagingSenderId: "772222299364"
    };
    if (!this.firebase.apps.length) {
      this.firebase.initializeApp(config);
    }
  }
  clear() { // Reset error msg and userFormData
    this.userFormData = new UserModel();
    this.error.inscription = "";
    this.error.connexion = "";
  }

  updateContentId(id: number) {
    this.clear();
    this.contentId = id;
  }

  onSubmitConnexion(connexionForm: NgForm) {
    if (connexionForm.valid) {
      this.authentificationService.connectUser(this.userFormData, this.error).subscribe(
        currentUser => {
          this.dialogRef.close(true);
        },
        err => {
          console.log(err);
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
            this.dialogRef.close(true);
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

}
