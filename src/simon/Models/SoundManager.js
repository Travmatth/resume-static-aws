/* @flow */

import type { Sound, ColorKeys } from '../simon.types';

const sound = file => {
  // $FlowIgnore - The parameter passed to require() must be a literal string.
  const path = require(`../assets/${file}`);
  // $FlowIgnore - Identifier `Audio`. Could not resolve name
  return new Audio(path);
};

export default class SoundManager {
  tones: { [Sound | ColorKeys]: HTMLAudioElement };
  constructor() {
    this.tones = {
      red: sound('red.wav'),
      blue: sound('blue.wav'),
      green: sound('green.wav'),
      yellow: sound('yellow.wav'),
      won: sound('won.wav'),
      lost: sound('lost.wav'),
      start: sound('start.wav'),
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
