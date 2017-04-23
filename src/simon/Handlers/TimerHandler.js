/* @flow */

import type { Stage } from '../Simon.types';
import type ColorHandler from './ColorHandler';
import type Simon from '../Simon';
import type Timer from './Timer';
import { delay, cycle } from './GameCycle';

const clock: { id: null | number } = { id: null };

const cancelTimer = () => {
  clock.id && clearTimeout(clock.id);
};

const powerOff = () => {
  cancelTimer();
};

const powerOn = (
  simon: Simon,
  buttons: ColorHandler,
  timer: Timer,
  update: (number | string) => string,
) => {
  advance(simon, buttons, update, timer);
};

const advance = (
  simon: Simon,
  buttons: ColorHandler,
  update: (number | string) => string | void,
  timer: Timer,
) => {
  // ^property `next`. Property cannot be accessed on
  // possibly undefined value  `timer`
  // $FLowIgnore
  const { next, round, action: nextAction } =
    timer && timer.tick(simon, buttons, update);
  // $FLowIgnore
  if (next) fire(round, buttons, nextAction, timer, simon);
};

const fire = (
  roundLength: number,
  buttons: ColorHandler,
  action: () => string | void,
  timer: Timer,
  simon: Simon,
) => {
  action();
  const timeout = () => {
    const { next, round, action: nextAction } = timer.tick(simon, buttons);
    if (next) fire(round, buttons, nextAction, timer, simon);
  };

  clock.id = timer && setTimeout(timeout, roundLength);
};

export { cancelTimer, advance, powerOn, powerOff };
