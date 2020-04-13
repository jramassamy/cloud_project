import { Component, OnInit } from '@angular/core';
import { WeeklyChallengeService } from 'src/app/services/weekly-challenge/weekly-challenge.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-liste-des-challenges',
  templateUrl: './liste-des-challenges.component.html',
  styleUrls: ['./liste-des-challenges.component.css']
})
export class ListeDesChallengesComponent implements OnInit {
  challengeList: Array<any> = [];
  constructor(private title: Title, private meta: Meta, private weeklyChallengeService: WeeklyChallengeService) {
    this.title.setTitle('Creative Beats - La plateforme des Beatmakers | Tous les challenges');
    // tslint:disable-next-line:max-line-length
    this.meta.updateTag({ name: 'description', content: 'Retrouve ici toutes les instrumentales de tous les challenges, chillhop, trap, lofi, rap français, hip hop, rap us...' });
    this.weeklyChallengeService.getAllChallenge().subscribe(
      challengeList => {
        this.challengeList = challengeList.slice(0, challengeList.length - 1);
      }
    );
  }
  ngOnInit() {
  }

}
