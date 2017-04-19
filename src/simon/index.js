/* @flow */

import { Simon } from './Simon';
import {
  clickHandler,
  strictHandler,
  scoreHandler,
  powerHandler,
} from './Handlers';

if (global.document !== undefined) {
  document.addEventListener('DOMContentLoaded', () => {
    const power = ((document.getElementById('power'): any): HTMLButtonElement);
    const score = ((document.getElementById('score'): any): HTMLElement);
    const strict = ((document.getElementById(
      'strict',
    ): any): HTMLButtonElement);
    const red = ((document.getElementById('red'): any): HTMLButtonElement);
    const blue = ((document.getElementById('blue'): any): HTMLButtonElement);
    const green = ((document.getElementById('green'): any): HTMLButtonElement);
    const yellow = ((document.getElementById(
      'yellow',
    ): any): HTMLButtonElement);

    const updateScore = scoreHandler(score);
    const buttons = { power, updateScore, strict, red, blue, green, yellow };
    const colorButtons = new ColorHandler(buttons);

    power.addEventListener('click', powerHandler(updateScore));
    strict.addEventListener('click', strictHandler);

    ['red', 'blue', 'green', 'yellow'].forEach(color => {
      const click = clickHandler(color, colorButtons, updateScore);
      buttons[color].addEventListener('click', click);
    });
  });
}
