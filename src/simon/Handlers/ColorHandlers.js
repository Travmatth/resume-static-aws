/* @flow */

import type { ColorKeys, Sound, ColorButtons } from '../simon.types';
import type { SoundManager } from '../Models';
import { Colors } from '../Models';

const COLORS = {
  red: 'red',
  yellow: 'yellow',
  blue: 'blue',
  green: 'green',
};

const showHighlight = (color: ColorKeys, buttons: ColorButtons) => {
  buttons[color].classList.add(`light-${color}`);
  buttons[color].classList.remove(color);
};

const hideHighlight = (color: ColorKeys, buttons: ColorButtons) => {
  buttons[color].classList.add(color);
  buttons[color].classList.remove(`light-${color}`);
};

const showColor = (
  color: ColorKeys,
  sounds: SoundManager,
  buttons: ColorButtons,
  play: boolean = true,
) => {
  showHighlight(color, buttons);
  play && sounds.play(color);
};

const hideColor = (
  color: ColorKeys,
  sounds: SoundManager,
  buttons: ColorButtons,
) => {
  sounds.pause(color);
  hideHighlight(color, buttons);
};

const showAll = (sounds: SoundManager, buttons: ColorButtons) =>
  Object.keys(COLORS).forEach(color =>
    showColor(color, sounds, buttons, false),
  );

const hideAll = (sounds: SoundManager, buttons: ColorButtons) =>
  Object.keys(COLORS).forEach(color =>
    hideColor(color, sounds, buttons, false),
  );

const wonStart = (sounds: SoundManager, buttons: ColorButtons) => {
  sounds.play('won');
  showAll(sounds, buttons);
};

const wonEnd = (sounds: SoundManager, buttons: ColorButtons) => {
  sounds.pause('won');
  hideAll(sounds, buttons);
};

const failStart = (sounds: SoundManager, buttons: ColorButtons) => {
  sounds.play('lost');
  showAll(sounds, buttons);
};

const failEnd = (sounds: SoundManager, buttons: ColorButtons) => {
  sounds.pause('lost');
  hideAll(sounds, buttons);
};

export {
  COLORS,
  wonStart,
  wonEnd,
  failEnd,
  failStart,
  showAll,
  hideAll,
  showColor,
  hideColor,
  hideHighlight,
  showHighlight,
};
