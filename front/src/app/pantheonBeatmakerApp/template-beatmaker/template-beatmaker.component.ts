import { Component, OnInit, Input } from '@angular/core';
import { Challenge } from 'src/app/models/Challenge';
import { UserModel } from 'src/app/models/UserModel';
import { UserService } from 'src/app/services/user/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-template-beatmaker',
  templateUrl: './template-beatmaker.component.html',
  styleUrls: ['./template-beatmaker.component.css']
})
export class TemplateBeatmakerComponent implements OnInit {
  loaded = false;
  _challenge: Challenge;
  winner: any;
  winnerProfile: UserModel;
  userImage = '';
  @Input() set challenge(value: boolean) {
    this._challenge = new Challenge(value);
    this.loadWinner();
  } constructor(private userService: UserService) { }

  loadWinner() {
    const musics = this._challenge.musics;
    this.winner = musics // order music list by vote, upper = [0]
      .sort((a, b) => { if (a.vote > b.vote) { return -1; } })[0];
    this.loadWinnerData();
  }

  loadWinnerData() {
    this.userService.loadUserByTag(this.winner.user.userTag).subscribe(
      (user) => {
        this.winnerProfile = new UserModel(user);
        this.loaded = true;
        this.checkImageExist();
      },
      (err) => {
        this.loaded = true;
        console.log(err);
      }
    );
  }

  checkImageExist() {
    const image = new Image();
    const url_image = environment.s3Bucket + this.winnerProfile.userTag + ".jpg";
    image.onload = () => {
      this.userImage = environment.s3Bucket + this.winnerProfile.userTag + ".jpg";
    };
    image.onerror = () => {
      this.userImage = './assets/userDefaultImg.svg';
    };
    image.src = url_image;
  }

  ngOnInit() {
  }

}
