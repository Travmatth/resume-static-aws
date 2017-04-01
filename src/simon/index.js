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
    const red = document.getElementById('red');
    const blue = document.getElementById('blue');
    const green = document.getElementById('green');
    const yellow = document.getElementById('yellow');

    const simon = new Simon();
    const colorButtons = new ColorHandler({ red, blue, green, yellow });

    power.addEventListener('click', startHandler(simon, colorButtons));
    strict.addEventListener('click', strictHandler(simon));

    red.addEventListener('click', () => handlePress('red', colorButtons));
    blue.addEventListener('click', () => handlePress('blue', colorButtons));
    green.addEventListener('click', () => handlePress('green', colorButtons));
    yellow.addEventListener('click', () => handlePress('yellow', colorButtons));
  });
}
