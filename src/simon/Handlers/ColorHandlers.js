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

const flash = (
  sound: Sound,
  resume: () => void,
  sounds: SoundManager,
  buttons: ColorButtons,
) => {
  showAll(sounds, buttons);
  sounds.play(sound);

  setTimeout(() => {
    hideAll(sounds, buttons);
    sounds.pause(sound);
    resume();
  }, 1000);
};

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

const wonGame = (
  resume: () => void,
  sounds: SoundManager,
  buttons: ColorButtons,
) => flash('won', resume, sounds, buttons);

const wonRound = (
  resume: () => void,
  sounds: SoundManager,
  buttons: ColorButtons,
) => flash('won', resume, sounds, buttons);

const strictFail = (
  resume: () => void,
  sounds: SoundManager,
  buttons: ColorButtons,
) => flash('lost', resume, sounds, buttons);

const restartRound = (
  resume: () => void,
  sounds: SoundManager,
  buttons: ColorButtons,
) => flash('start', resume, sounds, buttons);

const showAll = (sounds: SoundManager, buttons: ColorButtons) =>
  Object.keys(COLORS).forEach(color => showColor(color, sounds, buttons));

const hideAll = (sounds: SoundManager, buttons: ColorButtons) =>
  Object.keys(COLORS).forEach(color => hideColor(color, sounds, buttons));

const swapCss = (color: ColorKeys, buttons: ColorButtons) => {
  if (buttons[color].classList.contains(color)) {
    buttons[color].classList.add(`light-${color}`);
    buttons[color].classList.remove(color);
  } else {
    buttons[color].classList.add(color);
    buttons[color].classList.remove(`light-${color}`);
  }
};

const showColor = (
  color: ColorKeys,
  sounds: SoundManager,
  buttons: ColorButtons,
) => {
  sounds.play(color);
  swapCss(color, buttons);
};

const hideColor = (
  color: ColorKeys,
  sounds: SoundManager,
  buttons: ColorButtons,
) => {
  sounds.pause(color);
  swapCss(color, buttons);
};

export {
  COLORS,
  flash,
  wonStart,
  wonEnd,
  failEnd,
  failStart,
  wonGame,
  wonRound,
  strictFail,
  restartRound,
  showAll,
  hideAll,
  swapCss,
  showColor,
  hideColor,
};
