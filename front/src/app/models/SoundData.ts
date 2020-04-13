export class SoundData {
  soundUrl: string;
  index: number;
  position: number;
  constructor(soundUrl: string, index: number, position: number) {
    this.soundUrl = soundUrl;
    this.index = index;
    this.position = position;
  }
}
