import { Component, OnInit, AfterViewInit } from '@angular/core';
import { WeeklyChallengeService } from 'src/app/services/weekly-challenge/weekly-challenge.service';
import { Challenge } from 'src/app/models/Challenge';
import { UserService } from 'src/app/services/user/user.service';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ModalVoteComponent } from 'src/app/weeklyChallengeApp/modal-vote/modal-vote.component';

@Component({
  selector: 'app-weekly-challenge',
  templateUrl: './weekly-challenge.component.html',
  styleUrls: ['./weekly-challenge.component.css']
})

export class WeeklyChallengeComponent implements OnInit, AfterViewInit {
  currentChallenge: Challenge = null;
  soundArtistFromUrl: any = null;
  electeur = null;
  nbVoteRestant = null;
  loading = true;
  userTagFromUrl = '';
  deleted = false;
  constructor(public dialog: MatDialog, private route: ActivatedRoute, private title: Title,
    private meta: Meta, private weeklyChallengeService: WeeklyChallengeService, public user: UserService) {
    this.initSEO();
    this.route.params.pipe(take(1)).subscribe((params) => {
      if (params['userTag']) {
        this.userTagFromUrl = params['userTag'];
      }
      this.initCurrentChallenge();
    });
  }

  initCurrentChallenge() {
    this.weeklyChallengeService.getCurrentChallenge().subscribe(
      challengeData => {
        if (this.user.currentUser) {
          this.electeur = challengeData.electeurs
            .filter(electeur => electeur.user.email === this.user.currentUser.email)[0];
        }
        this.currentChallenge = new Challenge(challengeData); // Ordre important
        this.filterUserFromUrl();
        this.shuffleMusics();
        this.updateVoteInformation();
        this.loading = false;
      },
      err => {
        this.loading = false;
        console.log(err);
      }
    );
  }

  filterUserFromUrl() {
    if (this.userTagFromUrl) {
      this.soundArtistFromUrl = this.currentChallenge.musics.
        filter(music => music.user.userTag === this.userTagFromUrl)[0];
      if (this.soundArtistFromUrl) { // on la retire de la liste
        this.currentChallenge.musics = this.currentChallenge.musics.
          filter(music => music.user.userTag !== this.userTagFromUrl);
      }
    }
  }

  shuffleMusics() {
    for (let i = this.currentChallenge.musics.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.currentChallenge.musics[i], this.currentChallenge.musics[j]] =
        [this.currentChallenge.musics[j], this.currentChallenge.musics[i]];
    }
  }
  updateVoteInformation() {
    if (this.electeur) {
      this.nbVoteRestant = 3 - this.electeur.vote;
      if (this.nbVoteRestant === 0) {
        this.openModalVote();
      }
    }
  }
  updateVoteInformationOnClick(electeurNewData: any) {
    this.electeur = electeurNewData;
    this.updateVoteInformation();
  }

  updateOnDeletePushed(deleted: boolean) {
    this.deleted = deleted;
  }
  openModalVote() {
    this.dialog.open(ModalVoteComponent);
  }

  initSEO() {
    this.title.setTitle('Creative Beats - La plateforme des Beatmakers | Challenge de la semaine');
    // tslint:disable-next-line:max-line-length
    this.meta.updateTag({ name: 'description', content: 'Retrouve ici toutes les instrumentales des beatmakers participant au challenge de la semaine sur divers thèmes, hip hop, rap, chill, lofi, trap, rock, jazz...' });
  }
  ngOnInit() {
  }

  ngAfterViewInit() {
  }

}
