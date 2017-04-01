/* @flow */

import { Simon } from './Simon';
import { ColorHandler, startHandler, startAll, cancelAll } from './Handlers';

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

    red.addEventListener('click', () => colorButtons.showColor('red'));
    blue.addEventListener('click', () => colorButtons.showColor('blue'));
    green.addEventListener('click', () => colorButtons.showColor('green'));
    yellow.addEventListener('click', () => colorButtons.showColor('yellow'));

    red.addEventListener('mousedown', colorButtons.showHandler('red'));
    blue.addEventListener('mousedown', colorButtons.showHandler('blue'));
    green.addEventListener('mousedown', colorButtons.showHandler('green'));
    yellow.addEventListener('mousedown', colorButtons.showHandler('yellow'));

    red.addEventListener('mouseup', colorButtons.hideHandler('red'));
    blue.addEventListener('mouseup', colorButtons.hideHandler('blue'));
    green.addEventListener('mouseup', colorButtons.hideHandler('green'));
    yellow.addEventListener('mouseup', colorButtons.hideHandler('yellow'));

    // With both click & mouseleave events, will former overshadow latter?
    red.addEventListener('mouseleave', colorButtons.hideHandler('red'));
    blue.addEventListener('mouseleave', colorButtons.hideHandler('blue'));
    green.addEventListener('mouseleave', colorButtons.hideHandler('green'));
    yellow.addEventListener('mouseleave', colorButtons.hideHandler('yellow'));
  });
}
