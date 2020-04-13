import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeeklyChallengeService } from 'src/app/services/weekly-challenge/weekly-challenge.service';
import { Challenge } from 'src/app/models/Challenge';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalConnexionComponent } from 'src/app/modal-connexion/modal-connexion.component';
import { UserEnum } from 'src/app/models/modal';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
@Component({
  selector: 'app-next-challenge',
  templateUrl: './next-challenge.component.html',
  styleUrls: ['./next-challenge.component.css']
})
export class NextChallengeComponent implements OnInit, OnDestroy {

  slideIndex = 0;
  soundCloudUrl = '';
  soundCloudPattern = "^(https:\/\/soundcloud.com\/[a-zA-Z0-9-_]+\/[a-zA-Z0-9-_]+)$";
  nextChallenge: Challenge = null;
  showError = false;
  loaded = false;
  previewFind = false;
  artistUrl = '';
  content = '';
  textEntete = `Pour participer, compose une instru' pour le challenge et envoie-la nous`;
  constructor(private meta: Meta, private title: Title, private router: Router, public dialog: MatDialog,
    private userService: UserService, private weeklyChallengeService: WeeklyChallengeService) {
    this.title.setTitle('Creative Beats - La plateforme des Beatmakers | Prochain Challenge');
    // tslint:disable-next-line:max-line-length
    this.meta.updateTag({ name: 'description', content: `Si tu es beatmaker ou musicien, viens participer au prochain challenge, chaque semaine un thème différent, hip hop, rap, chill, lofi, trap, rock, jazz, sampling` });
    this.initNextChallenge();
  }

  ngOnInit() {

  }
  ngOnDestroy() {
  }

  initNextChallenge() {
    this.weeklyChallengeService.getNextChallenge().subscribe(
      challenge => {
        this.nextChallenge = new Challenge(challenge);
        this.content = this.nextChallenge.challengePrices.first;
        this.getMusicArtist();
        this.loaded = true;
      },
      err => {
        this.loaded = true;
      }
    );
  }

  getMusicArtist() {
    if (this.userService.isConnected()) {
      const artistMusic = this.nextChallenge.musics.filter(music => music.user.userTag === this.userService.currentUser.userTag)[0];
      if (artistMusic) {
        this.artistUrl = artistMusic.musicUrl;
        this.textEntete = 'si tu souhaites modifier le lien de ta composition, envoie-la à nouveau';
        this.previewFind = true;
      }
    }
  }
  updateSlideIndex() {
    this.slideIndex++;
    if (this.slideIndex > 2) {
      this.slideIndex = 0;
    }
  }
  onSubmitParticipation(participationForm: NgForm) {
    if (participationForm.valid) {
      const userConnected = this.userService.isConnected();
      if (!userConnected) {
        const dialogRef = this.dialog.open(ModalConnexionComponent, {
          width: '360px',
          height: '400px',
          data: 0 // UserEnum.showFormConnexionOrInscription
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result === true) {
            this.onSubmitParticipation(participationForm);
          }
        });
        return;
      } else {
        this.weeklyChallengeService.addParticipant(this.nextChallenge._id, this.userService.currentUser, this.soundCloudUrl).subscribe(
          (result) => {
            this.router.navigateByUrl('/', { skipLocationChange: true })
              .then(() => this.router.navigate(['/nextChallenge']));
          },
          (err) => {
            console.log(err);
          }
        );
      }
    } else {
      this.showError = true;
    }
  }

}
