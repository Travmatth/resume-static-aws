/* @flow */

import type { SoundManager } from '../Models';
import {
  toggleState,
  resetSimon,
  setInput,
  recordPlayerAttempt,
  toggleStrict,
} from '../Models';
import type {
  ColorKeys,
  ColorButtons,
  TimerState,
  SimonState,
} from '../simon.types';
import { powerOn, powerOff } from './TimerHandler';
import { showColor, hideColor } from './ColorHandlers';

const SIMON_TIMEOUT = 1000;

const toggleHandleAnimation = (event: Event) => {
  const { target: { classList } } = event;
  const current = classList.contains('is-off');
  classList.toggle('is-off', !current);
};

const startHandler = (
  update: (number | string) => string,
  buttons: ColorButtons,
  simon: SimonState,
  timer: TimerState,
  clock: { id: null | number },
  sounds: SoundManager,
) => (event: Event) =>
  simon.power && powerOn(simon, buttons, timer, update, clock, sounds);

const powerHandler = (
  simon: SimonState,
  update: (number | string) => string,
  clock: { id: null | number },
) => (event: Event) => {
  if (!simon.power) {
    resetSimon(simon);
    update(`${simon.score}`);
  } else {
    update('');
    powerOff(clock);
  }

  toggleState(simon);
  toggleHandleAnimation(event);
};

const strictHandler = (simon: SimonState) => (_: Event) => toggleStrict(simon);

const scoreHandler = (element: HTMLElement) => (score: number | string) =>
  element.textContent = `${score}`;

const clickHandler = (
  color: ColorKeys,
  buttons: ColorButtons,
  update: (number | string) => string,
  simon: SimonState,
  timer: TimerState,
  clock: { id: null | number },
  sounds: SoundManager,
) => (_: Event) => {
  if (!simon.input) {
    console.error('Attempting move while player input disabled');
    return false;
  }

  // start player press animation
  setInput(simon, false);
  showColor(color, sounds, buttons);

  recordPlayerAttempt(simon, color);

  // end player press animation after 1 second
  setTimeout(() => {
    hideColor(color, sounds, buttons);
    update(simon.score);
    setInput(simon, true);
  }, SIMON_TIMEOUT);
};

export {
  SIMON_TIMEOUT,
  clickHandler,
  strictHandler,
  scoreHandler,
  powerHandler,
  startHandler,
};
