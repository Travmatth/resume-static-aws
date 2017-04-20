/* @flow */

import type { ColorKeys, Sound } from '../simon.types';
import { Colors } from '../simon.types';

export default class ColorHandler {
  colors: Colors;
  buttons: Array<HTMLButtonElement>;

  constructor(buttons: Array<HTMLButtonElement>) {
    this.buttons = buttons;
    this.colors = Colors;
    //this.won = ;
    //this.fail = ;
    //this.start = ;
  }

  showColor(color: ColorKeys) {}
  hideColor(color: ColorKeys) {}
  startSound(sound: Sound) {}
  endSound(sound: Sound) {}

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
