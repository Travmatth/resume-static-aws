/* @flow */

import Simon from './Simon';
import {
  Timer,
  clickHandler,
  strictHandler,
  scoreHandler,
  powerHandler,
  TimerManager,
  ColorHandler,
  SoundHandler,
} from './Handlers';

if (global.document !== undefined) {
  document.addEventListener('DOMContentLoaded', () => {
    const timer = new Timer();
    const timerManager = new TimerManager();
    const simon = new Simon();
    const sounds = new SoundHandler();

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
      powerHandler(updateScore, simon, timerManager, timer),
    );
    strict.addEventListener('click', strictHandler(simon));

    ['red', 'blue', 'green', 'yellow'].forEach(color => {
      const click = clickHandler(
        color,
        colorButtons,
        updateScore,
        simon,
        timerManager,
        timer,
      );
      buttons[color].addEventListener('click', click);
    });
  });
}
