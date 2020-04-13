import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WeeklyChallengeService } from 'src/app/services/weekly-challenge/weekly-challenge.service';

@Component({
  selector: 'app-historique-challenge-template',
  templateUrl: './historique-challenge-template.component.html',
  styleUrls: ['./historique-challenge-template.component.css']
})
export class HistoriqueChallengeTemplateComponent implements OnInit {

  _challengeData: any = null;
  // challengeArtworkPattern = '^(http|https):\/\/(.){1,}(\.png|\.jpeg|\.jpg|\.svg)$';
  challengeDataForm = {
    _id: '',
    processCreatif: '', debutChallenge: '', finChallenge: '',
    challengeArtwork: '', challengeName: '',
    challengePrices: {
      first: '',
      second: '',
      third: ''
    }
  };
  error = { challenge: "" };
  nbParticipant = 0;
  @ViewChild('challengeFormView', {static: true}) challengeViewForm;
  updateViewingState = false;
  listMusicState = false;
  @Input() set challengeData(challengeData: any) {
    this._challengeData = challengeData;
    this._challengeData.musics = this._challengeData.musics
      .sort((a, b) => a.state === 'waitingValidation')
      .reverse();
    this.nbParticipant = this._challengeData.waitingValidation + this._challengeData.musicApproved;
  }

  constructor(private weeklyChallengeService: WeeklyChallengeService) { }

  ngOnInit() {
  }
  initFormData() {
    this.challengeDataForm._id = this._challengeData._id;
    this.challengeDataForm.processCreatif = this._challengeData.processCreatif.slice(0, 16);
    this.challengeDataForm.debutChallenge = this._challengeData.debutChallenge.slice(0, 16);
    this.challengeDataForm.finChallenge = this._challengeData.finChallenge.slice(0, 16);
    this.challengeDataForm.challengeName = this._challengeData.challengeName;
    this.challengeDataForm.challengeArtwork = this._challengeData.challengeArtwork;
    this.challengeDataForm.challengePrices = Object.assign({}, this._challengeData.challengePrices);
  }
  onSubmitUpdateChallenge(challengeForm: NgForm) {
    if (challengeForm.valid) {
      this.weeklyChallengeService.updateChallenge(this.challengeDataForm, this.error);
    }
  }

  showHideUpdate() {
    this.initFormData();
    this.listMusicState = false;
    this.updateViewingState = !this.updateViewingState;
  }
  showHideMusics() {
    this.updateViewingState = false;
    this.listMusicState = !this.listMusicState;
  }

  updateState(newState: string, artistSound: any) {
    const musicPreviousState = artistSound.state;
    if (newState !== musicPreviousState) {
      this.weeklyChallengeService.updateMusicState(newState, artistSound._id, this._challengeData._id).subscribe(
        result => {
          this.updateMusicStateView(newState, musicPreviousState);
          artistSound.state = newState;
        },
        err => {
          console.log(err);
        }
      );
    }
  }
  updateMusicStateView(newState, artistSoundPreviousState) {
    if (artistSoundPreviousState === 'waitingValidation') {
      this._challengeData.waitingValidation--;
    } else if (artistSoundPreviousState === 'approved') {
      this._challengeData.musicApproved--;
    } else if (artistSoundPreviousState === 'rejected') {
      this._challengeData.musicRejected--;
    }
    if (newState === 'waitingValidation') {
      this._challengeData.waitingValidation++;
    } else if (newState === 'approved') {
      this._challengeData.musicApproved++;
    } else if (newState === 'rejected') {
      this._challengeData.musicRejected++;
    }
  }
}
