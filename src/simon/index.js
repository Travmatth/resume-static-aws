/* @flow */

import { Simon } from './Simon';
import {
  ColorHandler,
  startHandler,
  startAll,
  cancelAll,
  handlePress,
} from './Handlers';

if (global.document !== undefined) {
  document.addEventListener('DOMContentLoaded', () => {
    // Game Lifecycle Buttons
    const power = document.getElementById('power');
    const strict = document.getElementById('strict');

    // Color Buttons
    const simon = new Simon();
    const colorButtons = new ColorHandler({
      red: document.getElementById('red'),
      blue: document.getElementById('blue'),
      green: document.getElementById('green'),
      yellow: document.getElementById('yellow'),
    });

    power.addEventListener('click', startHandler(simon, colorButtons));
    strict.addEventListener('click', strictHandler(simon));

    red.addEventListener('click', () => handlePress('red', colorButtons));
    blue.addEventListener('click', () => handlePress('blue', colorButtons));
    green.addEventListener('click', () => handlePress('green', colorButtons));
    yellow.addEventListener('click', () => handlePress('yellow', colorButtons));
  });
}
