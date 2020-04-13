import { Component, OnInit, Input, Renderer2, ElementRef, ViewChild, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sound } from 'src/app/models/Sound';
import { WeeklyChallengeService } from 'src/app/services/weekly-challenge/weekly-challenge.service';
import { UserService } from 'src/app/services/user/user.service';
import { ModalConnexionComponent } from 'src/app/modal-connexion/modal-connexion.component';
import { UserEnum } from 'src/app/models/modal';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalPartageComponent } from '../modal-partage/modal-partage.component';
@Component({
  selector: 'app-sound-cloud-music',
  templateUrl: './sound-cloud-music.component.html',
  styleUrls: ['./sound-cloud-music.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SoundCloudMusicComponent implements OnInit {
  _artistSound: any;
  _challengeId: any;
  _electeurData: any;
  sound: Sound;
  test: any;
  iframeString: string;
  isPlaying = false;
  changePos = false;
  player: any;
  durationMs: number;
  playerDivPosXMouse: number;
  playerHeight: number;
  idMusic: number;
  voteText = 'Voter';
  alreadyVoted = false;
  _preview = false;
  _image = true;
  _home = false;
  deleted = false;
  @ViewChild("scWidgetIframe", {static: true}) iframe: ElementRef;
  @ViewChild("player", {static: true}) divPlayer: ElementRef;
  @ViewChild("playerProgress", {static: true}) playerProgress: ElementRef;
  @ViewChild("userName", {static: true}) userName: ElementRef;
  @ViewChild("titleSong", {static: true}) titleSong: ElementRef;
  @ViewChild("artistImg", {static: true}) artistImg: ElementRef;
  @ViewChild("artist", {static: true}) artist: ElementRef;
  @ViewChild("duration", {static: true}) durationDiv: ElementRef;
  @ViewChild("playSong", {static: true}) playSongButton: ElementRef;
  @ViewChild("btnVote", {static: true}) btnVote: ElementRef;
  @ViewChild("heart", {static: true}) heart: ElementRef;
  i = 0;
  @Output() OnClickVote: EventEmitter<any> = new EventEmitter();
  @Output() OnDelete: EventEmitter<any> = new EventEmitter();
  @Input() set preview(value: boolean) {
    this._preview = value;
  }
  @Input() set home(value: boolean) {
    this._home = value;
  }
  @Input() set image(value: boolean) {
    this._image = value;
  }
  @Input() set artistSound(value: any) {
    if (!value.musicUrl) { // cas où on envoie uniquement une url de musique
      value = {
        musicUrl: value
      };
    }
    this._artistSound = value;
    window['SC'].initialize({
      client_id: '5dcb5ea7cb935713b230330006d1765e'
    });
    this.initSong();
  }

  @Input() set challengeId(value: any) {
    this._challengeId = value;
  }

  @Input() set electeurData(value: any) {
    this._electeurData = value;
    if (this._electeurData) {
      this.checkMusicVoted();
    }
  }

  constructor(public dialog: MatDialog, private weeklyChallengeService: WeeklyChallengeService,
    private renderer: Renderer2, private router: Router, private userService: UserService) {
    this.sound = new Sound();
  }

  ngOnInit() {
  }

  play() {
    if (this.isPlaying) {
      this.player.pause();
    } else {
      this.player.play();
    }
  }

  initSong(): void {
    this.playerGetCurrentSound();
  }

  playerGetCurrentSound(): void {
    window['SC'].resolve(this._artistSound.musicUrl).then((result) => {
      if(!result) {
        this.deleted = true;
        this.OnDelete.emit(this.deleted); // send it to parent
        return;
      }
      this.idMusic = result['id'];
      this.sound = new Sound(result);
      const divPlayerStyle = 'background-image: url(' + this.sound.artworkUrl + ')';
      this.renderer.setStyle(this.playSongButton.nativeElement, 'background-image', `url(./assets/playMusic.svg)`);
      this.renderer.setAttribute(this.divPlayer.nativeElement, 'style', divPlayerStyle);
      this.userName.nativeElement.textContent = this.sound.artistName;
      this.titleSong.nativeElement.textContent = this.sound.title;
      this.renderer.setAttribute(this.artistImg.nativeElement, "src", this.sound.artistImg);
      this.renderer.addClass(this.divPlayer.nativeElement, 'visible');
      this.renderer.addClass(this.artist.nativeElement, 'visible');
      this.renderer.addClass(this.playSongButton.nativeElement, 'visible');
      const i: string = this.playerConvertMsToString(+result['duration']); // convert a string to an int by adding '+' operator.
      this.durationDiv.nativeElement.innerHTML = i;
      this.durationMs = +result['duration'];
      window['SC'].stream('/tracks/' + this.idMusic).then((player) => {
        this.player = player;
        this.playerBindEvents();
      });
    });
  }

  playerBindEvents(): void {
    this.player.on('state-change', (state) => {
      if (state === 'playing') {
        this.isPlaying = true;
        this.renderer.setStyle(this.playSongButton.nativeElement, 'background-image', `url(./assets/pause.svg)`);
      } else if (state === 'paused') {
        this.isPlaying = false;
        this.renderer.setStyle(this.playSongButton.nativeElement, 'background-image', `url(./assets/playMusic.svg)`);
      } else if (state === 'ended') {
        this.isPlaying = false;
        this.renderer.setStyle(this.playSongButton.nativeElement, 'background-image', `url(./assets/playMusic.svg)`);
      }
    });
    this.player.on('time', () => {
      this.playProgress();
    });

  }

  playerConvertMsToString(ms: number): string {
    let s: number;
    let m: number;
    s = Math.floor(ms / 1000);
    m = Math.floor(s / 60);
    s = s % 60;
    m = m % 60;
    let sResult: string;
    let mResult: string;
    sResult = (s > 9) ? '' + s : '0' + s;
    mResult = (m > 9) ? '' + m : '0' + m;
    return mResult + ':' + sResult;
  }

  playProgress() {
    const width = this.playerProgress.nativeElement.clientWidth * ((this.player.currentTime() / this.durationMs));
    this.renderer.setStyle(this.playerProgress.nativeElement, 'transform', `translateX(${width}px)`);
  }

  fireevent(e) {
    const playerPositionToPlay = this.durationMs * (e.offsetX / this.divPlayer.nativeElement.clientWidth);
    this.player.seek(playerPositionToPlay);
  }

  checkMusicVoted() {
    if (!this._preview) {
      this._electeurData.musics_id.forEach(artistMusicId => {
        if (artistMusicId.toString() === this._artistSound._id.toString()) {
          this.alreadyVoted = true;
          this.renderer.addClass(this.btnVote.nativeElement, "btnChecked");
          setTimeout(() => {
            this.renderer.removeClass(this.heart.nativeElement, 'heartLeft');
            this.renderer.addClass(this.heart.nativeElement, 'is_animating');
          }, 1000);
        }
      });
    }
  }
  openSongUrl() {
    if (this._artistSound.musicUrl) {
      window.open(this._artistSound.musicUrl, "_blank");
    }
  }
  openModalPartage() {
    if (this._artistSound.musicUrl) {
      this.dialog.open(ModalPartageComponent, {
        width: '160px',
        height: '45px',
        data: this._artistSound.musicUrl
      });
    }
  }
  updateVote(): void {
    let enumDialog;
    const userConnected = this.userService.isConnected();
    let showPanel = false;
    if (this._preview || this._home) {
      this.router.navigate(['/weeklyChallenge']);
      return;
    }
    if (!userConnected) {
      enumDialog = 1; // UserEnum.showFormConnexionOrValidatePhone = 1
      showPanel = true;
    }
    if (userConnected) {
      if (!this.userService.currentUser.userVerified) {
        enumDialog = 2; // UserEnum.validatePhoneNumber = 2
        showPanel = true;
      }
    }
    if (showPanel) {
      const dialogRef = this.dialog.open(ModalConnexionComponent, {
        width: '360px',
        height: '400px',
        data: enumDialog
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          let urlTemp = this.router.url;
          if (!urlTemp.includes('weeklyChallenge')) {
            urlTemp = '/weeklyChallenge';
          }
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate([urlTemp])
          );
        }
      });
      return;
    }
    if (!this.alreadyVoted && !this._preview) {
      this.weeklyChallengeService.postVote(this._challengeId, this._artistSound._id, this.userService.currentUser)
        .subscribe(
          result => {
            this.renderer.addClass(this.heart.nativeElement, 'is_animating');
            this.renderer.removeClass(this.heart.nativeElement, 'heartLeft');
            this.OnClickVote.emit(result.electeurs[0]); // send it to parent
            this._electeurData = result.electeurs[0];
            this.checkMusicVoted();
          },
          err => {
            console.log('erreur lors du vote');
          }
        );
      return;
    }
  }

  redirectToProfilArtist() {
    if (this._artistSound.user.userTag) {
      this.router.navigate([`/profil/${this._artistSound.user.userTag}`]);
    }
  }
}
