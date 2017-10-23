/* @flow */

import type { Sound, ColorKeys } from '../simon.types';

const sound = file => {
  // $FlowIgnore - The parameter passed to require() must be a literal string.
  const path = require(`../Assets/${file}`);
  // $FlowIgnore - Identifier `Audio`. Could not resolve name
  return new Audio(path);
};

export default class SoundManager {
  tones: { [Sound | ColorKeys]: HTMLAudioElement };
  constructor() {
    this.tones = {
      red: sound('red.mp3'),
      blue: sound('blue.mp3'),
      green: sound('green.mp3'),
      yellow: sound('yellow.mp3'),
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
    this.tones[sound].pause();
  }
}
