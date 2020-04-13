import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalPartageComponent } from './weeklyChallengeApp/modal-partage/modal-partage.component';
import { ModalVoteComponent } from './weeklyChallengeApp/modal-vote/modal-vote.component';
import { SoundCloudMusicComponent } from './weeklyChallengeApp/sound-cloud-music/sound-cloud-music.component';
import { WeeklyChallengeComponent } from './weeklyChallengeApp/weekly-challenge/weekly-challenge.component';
import { ModalConnexionComponent } from './modal-connexion/modal-connexion.component';
import { NextChallengeComponent } from './weeklyChallengeApp/next-challenge/next-challenge.component';
import { LastChallengeComponent } from './weeklyChallengeApp/last-challenge/last-challenge.component';
import { ListeDesChallengesComponent } from './weeklyChallengeApp/historique-challenge/liste-des-challenges/liste-des-challenges.component';
// tslint:disable-next-line: max-line-length
import { HistoriqueChallengeTemplateComponent } from './weeklyChallengeApp/historique-challenge/historique-challenge-template/historique-challenge-template.component';
import { HomeComponent } from './home/home.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { HonoredBeatmakerComponent } from './honored-beatmaker/honored-beatmaker.component';
import { ProfilComponent } from './profil/profil.component';
import { ChallengeCreationAdminComponent } from './adminApp/challengeAdminApp/challenge-creation-admin/challenge-creation-admin.component';
import { ChallengeListAdminComponent } from './adminApp/challengeAdminApp/challenge-list-admin/challenge-list-admin.component';
// tslint:disable-next-line:max-line-length
import { ChallengeListAdminTemplateComponent } from './adminApp/challengeAdminApp/templates/challenge-list-admin-template/challenge-list-admin-template.component';
import { ChallengeAdminPanelComponent } from './adminApp/challengeAdminApp/challenge-admin-panel/challenge-admin-panel.component';
import { AuthentificationService } from './services/authentification/authentification.service';
import { TokenInterceptorService } from './services/token-interceptor/token-interceptor.service';
import { AuthentificationGuard } from './guards/authentification/authentification.guard';
import { AdminDashboardComponent } from './adminApp/admin-dashboard/admin-dashboard.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListeBeatmakerComponent } from './pantheonBeatmakerApp/liste-beatmaker/liste-beatmaker.component';
import { TemplateBeatmakerComponent } from './pantheonBeatmakerApp/template-beatmaker/template-beatmaker.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { SafeHtmlPipe } from "./models/pipe.safehtml";
import fr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
registerLocaleData(fr);

@NgModule({
  declarations: [
    AppComponent,
    WeeklyChallengeComponent,
    ListeDesChallengesComponent,
    HistoriqueChallengeTemplateComponent,
    NextChallengeComponent,
    LastChallengeComponent,
    ListeBeatmakerComponent,
    TemplateBeatmakerComponent,
    HomeComponent,
    ConnexionComponent,
    HonoredBeatmakerComponent,
    ProfilComponent,
    SoundCloudMusicComponent,
    AdminDashboardComponent,
    ChallengeAdminPanelComponent,
    ChallengeListAdminComponent,
    ChallengeListAdminTemplateComponent,
    ChallengeCreationAdminComponent,
    ModalConnexionComponent,
    ModalPartageComponent,
    ModalVoteComponent,
    SafeHtmlPipe
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'creativeProject' }),
    TransferHttpCacheModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    RecaptchaModule,
    EditorModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  entryComponents: [ModalConnexionComponent, ModalPartageComponent, ModalVoteComponent],
  providers: [AuthentificationService, AuthentificationGuard,
    { provide: LOCALE_ID, useValue: "fr-FR" },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
