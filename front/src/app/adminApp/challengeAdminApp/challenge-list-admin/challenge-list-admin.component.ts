import { Component, OnInit } from '@angular/core';
import { WeeklyChallengeService } from 'src/app/services/weekly-challenge/weekly-challenge.service';

@Component({
  selector: 'app-challenge-list-admin',
  templateUrl: './challenge-list-admin.component.html',
  styleUrls: ['./challenge-list-admin.component.css']
})
export class ChallengeListAdminComponent implements OnInit {

  challengeList: Array<any> = [];
  constructor(private weeklyChallengeService: WeeklyChallengeService) {
    this.weeklyChallengeService.getAllChallenge().subscribe(
      challengeList => {
        this.challengeList = challengeList;
      }
    );
  }

  ngOnInit() {
  }

}
