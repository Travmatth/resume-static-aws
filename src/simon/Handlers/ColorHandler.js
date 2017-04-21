/* @flow */

import type { ColorKeys, Sound, ColorButtons } from '../simon.types';
import type SoundManager from './SoundHandler';
import { Colors } from '../simon.types';

export default class ColorHandler {
  colors: Colors;
  buttons: ColorButtons;
  sounds: SoundManager;

  constructor(buttons: ColorButtons, sounds: SoundManager) {
    this.buttons = buttons;
    this.colors = Colors;
    this.sounds = sounds;
  }

  swapCss(color: ColorKeys) {
    this.buttons[color].css === color
      ? (this.buttons[color].css = `light-${color}`)
      : (this.buttons[color].css = color);
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
    this.flash('fail', resume);
  }

  restartRound(resume: () => void) {
    this.flash('start', resume);
  }

  showAll() {
    this.colors.forEach(color => this.showColor(color));
  }

  hideAll() {
    this.colors.forEach(color => this.hideColor(color));
  }
}
