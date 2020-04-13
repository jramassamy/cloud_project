import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WeeklyChallengeService } from 'src/app/services/weekly-challenge/weekly-challenge.service';

@Component({
  selector: 'app-challenge-creation-admin',
  templateUrl: './challenge-creation-admin.component.html',
  styleUrls: ['./challenge-creation-admin.component.css']
})
export class ChallengeCreationAdminComponent implements OnInit {

  challengeArtworkPattern = '^(http|https):\/\/(.){1,}(\.png|\.jpeg|\.jpg|\.svg)$';
  challengeData = {
    processCreatif: '', debutChallenge: '', finChallenge: '',
    challengeArtwork: '', challengeName: '',
    challengePrices: {
      first: '',
      second: '',
      third: ''
    }
  };
  error = { challenge: "" };
  constructor(private weeklyChallengeService: WeeklyChallengeService) {
  }

  ngOnInit() {
  }

  onSubmitCreationChallenge(challengeForm: NgForm) {
    if (challengeForm.valid) {
      this.weeklyChallengeService.createChallenge(this.challengeData, this.error);
    }
  }
}
