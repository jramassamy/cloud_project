import { Component, OnInit } from '@angular/core';
import { WeeklyChallengeService } from 'src/app/services/weekly-challenge/weekly-challenge.service';
import { Challenge } from 'src/app/models/Challenge';
import { UserModel } from 'src/app/models/UserModel';
import { environment } from 'src/environments/environment';
import { Meta, Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentChallenge: Challenge;
  lastChallenge: Challenge;
  challengePreviewLoaded = false;
  lastWinnerLoaded = false;
  winner: any;
  winnerProfile: any;
  winnerImage = '';
  defaultValueWinner;
  statistics: any = null;
  constructor(private http: HttpClient, private meta: Meta, private title: Title, private weeklyChallengeService: WeeklyChallengeService) {
    const pageTitle = 'Creative Beats - La plateforme des Beatmakers';
    this.title.setTitle(pageTitle);
    // tslint:disable-next-line:max-line-length
    this.meta.updateTag({ name: 'description', content: `Tu es beatmaker, tu connais FL Studio, Ableton ou joue d'un instrument de musique? hip hop, rap, chill, lofi, trap, rock, jazz, compose sur tous types de styles` });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:url', content: 'https://creativebeats.fr' });
    this.meta.updateTag({ property: 'og:image', content: 'https://creativebeats.fr/assets/logo.png', itemprop: 'image' });
    this.meta.updateTag({ property: 'og:image:type', content: 'image/png' });
    this.initCurrentChallenge();
    this.initWinnerLastChallenge();
    // tslint:disable-next-line: max-line-length
    this.http.get<any>('https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCPoF3pEhRliHIOsHaITTXqA&key=AIzaSyCC4VkCiqPh-2FUYuih9cBVOhpMMr6J7JE').subscribe(
      (result) => {
        this.statistics = result.items[0].statistics;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit() {
    this.loadScript();
  }


  initWinnerLastChallenge() {
    this.weeklyChallengeService.getLastFinishedChallenge().subscribe(
      (result) => {
        this.lastChallenge = new Challenge(result.challenge);
        this.winner = this.lastChallenge.musics[this.lastChallenge.musics.length - 1];
        this.winnerProfile = new UserModel(result.user);
        this.initWinnerImg();
        this.defaultValueWinner = false;
        this.lastWinnerLoaded = true;
      },
      (err) => {
        this.initDefaultWinnerValue();
        this.defaultValueWinner = true;
        this.lastWinnerLoaded = true;
      }
    );
  }
  initCurrentChallenge() {
    this.weeklyChallengeService.getCurrentChallenge().subscribe(
      challengeData => {
        this.currentChallenge = new Challenge(challengeData); // Ordre important
        this.currentChallenge.musics = this.currentChallenge.musics.filter(music => music.state === 'approved').slice(0, 3);
        this.challengePreviewLoaded = true;
      },
      err => {
        console.log(err);
      }
    );
  }

  initWinnerImg() {
    const image = new Image();
    const url_image = environment.s3Bucket + this.winnerProfile.userTag + ".jpg";
    image.onload = () => {
      this.winnerImage = environment.s3Bucket + this.winnerProfile.userTag + ".jpg";
    };
    image.onerror = () => {
      this.winnerImage = './assets/userDefaultImg.svg';
    };
    image.src = url_image;
  }

  initDefaultWinnerValue() {
    this.winnerProfile = {
      userAlias: 'Creative Beats',
      userDescription: `En attendant le prochain beatmaker à l'honneur, on se fait un peu d'auto-promo,
    n'hésite pas à nous follow sur tes réseaux préférés et viens participer au prochain challenge`,
      userLinks: {
        userFacebook: 'creativebeats.fr',
        userInstagram: 'creativebeatsfr',
        userSoundcloud: 'user-121245199',
        userTwitter: 'creativebeatsfr',
        userYoutube: 'UCPoF3pEhRliHIOsHaITTXqA',
        userSnapchat: ''
      }
    };
  }

  public loadScript() {
    console.log('preparing to load...')
    const node = document.createElement('script');
    node.src = 'https://apis.google.com/js/platform.js';
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
}
}

