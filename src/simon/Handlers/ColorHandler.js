/* @flow */

import type { ColorKeys, Sound, ColorButtons } from '../simon.types';
import type Sound from './SoundHandler';
import { Colors } from '../simon.types';

export default class ColorHandler {
  colors: Colors;
  buttons: ColorButtons;

  constructor(buttons: ColorButtons, sounds: SoundHandler) {
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

  flash(sound: Sound, advance: () => void) {
    this.showAll();
    this.startSound(sound);

    setTimout(() => {
      this.hideAll();
      this.endSound(sound);
      advance();
    }, 1000);
  }

  wonGame(advance: () => void) {
    this.flash('won', advance);
  }

  wonRound(advance: () => void) {
    this.flash('won', advance);
  }

  strictFail(advance: () => void) {
    this.flash('fail', advance);
  }

  restartRound(advance: () => void) {
    this.flash('start', advance);
  }

  showAll() {
    this.colors.forEach(color => this.showColor(color));
  }

  hideAll() {
    this.colors.forEach(color => this.hideColor(color));
  }
}
