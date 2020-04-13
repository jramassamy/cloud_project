import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { WeeklyChallengeComponent } from './weeklyChallengeApp/weekly-challenge/weekly-challenge.component';
import { NextChallengeComponent } from './weeklyChallengeApp/next-challenge/next-challenge.component';
import { LastChallengeComponent } from './weeklyChallengeApp/last-challenge/last-challenge.component';
import { HomeComponent } from './home/home.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { HonoredBeatmakerComponent } from './honored-beatmaker/honored-beatmaker.component';
import { ProfilComponent } from './profil/profil.component';
import { AdminDashboardComponent } from './adminApp/admin-dashboard/admin-dashboard.component';
import { AuthentificationGuard } from './guards/authentification/authentification.guard';
import { ListeBeatmakerComponent } from './pantheonBeatmakerApp/liste-beatmaker/liste-beatmaker.component';
import { ListeDesChallengesComponent } from './weeklyChallengeApp/historique-challenge/liste-des-challenges/liste-des-challenges.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'weeklyChallenge', component: WeeklyChallengeComponent },
  { path: 'weeklyChallenge/:userTag', component: WeeklyChallengeComponent },
  { path: 'liste-des-challenges', component: ListeDesChallengesComponent },
  { path: 'nextChallenge', component: NextChallengeComponent },
  { path: 'lastChallenge', component: LastChallengeComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'honoredBeatmaker', component: HonoredBeatmakerComponent },
  { path: 'profil/:userTag', component: ProfilComponent },
  { path: 'adminDashboard', component: AdminDashboardComponent },
  { path: 'pantheon', component: ListeBeatmakerComponent },
  { path: '**', redirectTo: ''}
  /*{ path: 'protectedPath', component: anyComponent, canActivate: [AuthentificationGuard]}*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    anchorScrolling: 'enabled',
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
