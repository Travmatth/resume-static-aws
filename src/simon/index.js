/* @flow */

import { Simon, Timer, SoundManager } from './Models';
import {
  clickHandler,
  strictHandler,
  scoreHandler,
  powerHandler,
  ColorHandler,
} from './Handlers';
import { registerToggle } from 'common/js/handlers';

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    registerToggle();
    const clock = { id: null };
    const timer = new Timer();
    const simon = new Simon();
    const sounds = new SoundManager();

    const strict = ((document.getElementById(
      'strict',
    ): any): HTMLButtonElement);
    const power = ((document.getElementById('power'): any): HTMLButtonElement);
    const score = ((document.getElementById('score'): any): HTMLElement);
    // prettier-ignore

    const yellow = ((document.getElementById(
      'yellow',
    ): any): HTMLButtonElement);
    const red = ((document.getElementById('red'): any): HTMLButtonElement);
    const blue = ((document.getElementById('blue'): any): HTMLButtonElement);
    const green = ((document.getElementById('green'): any): HTMLButtonElement);

    const updateScore = scoreHandler(score);
    const buttons = { red, blue, green, yellow };
    const colorButtons = new ColorHandler(buttons, sounds);

    power.addEventListener(
      'click',
      powerHandler(updateScore, colorButtons, simon, timer, clock),
    );
    strict.addEventListener('click', strictHandler(simon));

    Object.keys(buttons).forEach(color => {
      buttons[color].addEventListener(
        'click',
        clickHandler(color, colorButtons, updateScore, simon, timer, clock),
      );
    });
  });
}
