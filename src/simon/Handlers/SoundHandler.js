import { Sound, ColorKeys } from '../simon.types';

const sound = file => {
  const path = `../assets/${file}`;
  return new Audio(require(path));
};

export default class SoundManager {
  constructor() {
    this.tones = {
      red: sound('red.wav'),
      blue: sound('blue.wav'),
      green: sound('green.wav'),
      yellow: sound('yellow.wav'),
      won: sound('won.mp3'),
      lost: sound('lost.mp3'),
      start: sound('start.mp3'),
    };
  }

  play(sound: Sound | ColorKeys) {
    this.tones[sound].currentTime = 0;
    this.tones[sound].play();
  }

  pause(sound: Sound | ColorKeys) {
    this.tones[this.current].pause();
  }
}
