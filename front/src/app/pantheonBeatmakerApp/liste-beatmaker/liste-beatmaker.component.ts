import { Component, OnInit } from '@angular/core';
import { WeeklyChallengeService } from 'src/app/services/weekly-challenge/weekly-challenge.service';
import { Challenge } from 'src/app/models/Challenge';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-liste-beatmaker',
  templateUrl: './liste-beatmaker.component.html',
  styleUrls: ['./liste-beatmaker.component.css']
})
export class ListeBeatmakerComponent implements OnInit {

  loaded = false;
  listChallengeFinished: Array<any> = [];
  constructor(private title: Title, private meta: Meta, private weeklyChallengeService: WeeklyChallengeService) {
    this.title.setTitle('Creative Beats - La plateforme des Beatmakers | Panthéon');
    // tslint:disable-next-line:max-line-length
    this.meta.updateTag({ name: 'description', content: `Retrouve ici tous les beatmakers gagnant des concours sur la plateforme depuis le lancement du projet` });
    this.loadWinnerChallenges();
  }

  ngOnInit() {
  }

  loadWinnerChallenges() {
    this.weeklyChallengeService.getAllFinishedChallenge().subscribe(
      (challenges) => {
        this.listChallengeFinished = challenges;
        this.loaded = true;
      },
      (err) => {
        console.log(err);
        this.loaded = true;
      }
    );
  }
}
