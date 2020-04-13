export class Sound {

  artworkUrl: string;
  artistName: string;
  title: string;
  urlSong: string;
  artistImg: string;
  constructor(song?: any) {
    if (song) {
      if (song['artwork_url']) {
        this.artworkUrl = song['artwork_url'].replace('-large', '-t500x500');
      }
      this.artistName = song['user']['username'];
      this.title = song['title'];
      this.urlSong = song['permalink_url'];
      this.artistImg = song['user']['avatar_url'].replace('-large', '-t500x500');
    } else {
      this.artworkUrl = '';
      this.artistName = '';
      this.title = '';
      this.urlSong = '';
      this.artistImg = '';
    }
  }
}
