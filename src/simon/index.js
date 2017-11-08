/* @flow */

import { simonState, timerState, SoundManager } from './Models';
import {
  clickHandler,
  strictHandler,
  scoreHandler,
  powerHandler,
  startHandler,
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
    const indicator = document.getElementById('strict-indicator');

    const start = startHandler(update, buttons, simon, timer, clock, sounds);
    document.getElementById('start').addEventListener('click', start);

    document
      .getElementById('power')
      .addEventListener('click', powerHandler(simon, update, clock));

    document
      .getElementById('strict')
      .addEventListener('click', strictHandler(simon, indicator));

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
