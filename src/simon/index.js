/* @flow */

import { simonState, timerState, SoundManager } from './Models';
import {
  clickHandler,
  strictHandler,
  scoreHandler,
  powerHandler,
} from './Handlers';

if (typeof document !== 'undefined')
  document.addEventListener('DOMContentLoaded', () => {
    const clock = { id: null };
    const timer = timerState();
    const simon = simonState();
    const sounds = new SoundManager();

    const buttons = {
      red: document.getElementById('red'),
      blue: document.getElementById('blue'),
      green: document.getElementById('green'),
      yellow: document.getElementById('yellow'),
    };

    const update = scoreHandler(document.getElementById('score-label'));

    const power = powerHandler(update, buttons, simon, timer, clock, sounds);
    document.getElementById('power').addEventListener('click', power);

    document
      .getElementById('strict')
      .addEventListener('click', strictHandler(simon));

    Object.keys(buttons).forEach(color => {
      const click = clickHandler(
        color,
        buttons,
        update,
        simon,
        timer,
        clock,
        sounds,
      );
      buttons[color].addEventListener('click', click);
    });
  });
