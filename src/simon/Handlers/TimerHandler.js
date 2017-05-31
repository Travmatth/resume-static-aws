/* @flow */

import type ColorHandler from './ColorHandler';
import type { Simon, Timer } from '../Models';
import { delay, cycle } from '../Models';

//const clock = { id: null };

const cancelTimer = (clock: { id: null | number }) => {
  clock.id && clearTimeout(clock.id);
};

const powerOff = (clock: { id: null | number }) => {
  cancelTimer(clock);
};

const powerOn = (
  simon: Simon,
  buttons: ColorHandler,
  timer: Timer,
  update: (number | string) => string,
  clock: { id: null | number },
) => {
  advance(simon, buttons, update, timer, clock);
};

const advance = (
  simon: Simon,
  buttons: ColorHandler,
  update: (number | string) => string | void,
  timer: Timer,
  clock: { id: null | number },
) => {
  // ^property `next`. Property cannot be accessed on
  // possibly undefined value  `timer`
  // $FLowIgnore
  const { next, round, action: nextAction } =
    timer && timer.tick(simon, buttons, update);
  // $FLowIgnore
  if (next) fire(round, buttons, nextAction, timer, simon, clock);
};

const fire = (
  roundLength: number,
  buttons: ColorHandler,
  action: () => string | void,
  timer: Timer,
  simon: Simon,
  clock: { id: null | number },
) => {
  action();
  const timeout = () => {
    const { next, round, action: nextAction } = timer.tick(simon, buttons);
    if (next) fire(round, buttons, nextAction, timer, simon, clock);
  };

  clock.id = timer && setTimeout(timeout, roundLength);
};

export { cancelTimer, advance, powerOn, powerOff, fire };
