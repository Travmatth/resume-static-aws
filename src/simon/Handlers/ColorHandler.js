/* @flow */

import type { ColorKeys, Sound, ColorButtons } from '../simon.types';
import type { SoundManager } from '../Models';
import { Colors } from '../Models';

export default class ColorHandler {
  colors: { red: 'red', yellow: 'yellow', red: 'red', green: 'green' };
  buttons: ColorButtons;
  sounds: SoundManager;

  constructor(buttons: ColorButtons, sounds: SoundManager) {
    this.buttons = buttons;
    this.colors = Colors;
    this.sounds = sounds;
  }

  swapCss(color: ColorKeys) {
    if (this.buttons[color].className === color) {
      this.buttons[color].classList.add(`light-${color}`);
      this.buttons[color].classList.remove(color);
    } else {
      this.buttons[color].classList.add(color);
      this.buttons[color].classList.remove(`light-${color}`);
    }
  }

  showColor(color: ColorKeys) {
    this.sounds.play(color);
    this.swapCss(color);
  }

  hideColor(color: ColorKeys) {
    this.sounds.pause(color);
    this.swapCss(color);
  }

  startSound(sound: Sound) {
    this.sounds.play(sound);
  }

  endSound(sound: Sound) {
    this.sounds.pause(sound);
  }

  flash(sound: Sound, resume: () => void) {
    this.showAll();
    this.startSound(sound);

    setTimeout(() => {
      this.hideAll();
      this.endSound(sound);
      resume();
    }, 1000);
  }

  wonGame(resume: () => void) {
    this.flash('won', resume);
  }

  wonRound(resume: () => void) {
    this.flash('won', resume);
  }

  strictFail(resume: () => void) {
    this.flash('lost', resume);
  }

  restartRound(resume: () => void) {
    this.flash('start', resume);
  }

  showAll() {
    Object.keys(this.colors).forEach(color => this.showColor(color));
  }

  hideAll() {
    Object.keys(this.colors).forEach(color => this.hideColor(color));
  }
}
