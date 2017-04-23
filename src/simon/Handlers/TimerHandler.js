/* @flow */

import type { Stage } from '../Simon.types';
import type ColorHandler from './ColorHandler';
import type Simon from '../Simon';
import type Timer from './Timer';
import { delay, cycle } from './GameCycle';

const timer = { id: null };

const cancelTimer = () => {
  timer.id && clearTimeout(timer.id);
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
  update: (number | string) => string | null,
  timer: Timer,
) => {
  // ^property `next`. Property cannot be accessed on
  // possibly undefined value  `timer`
  // $FLowIgnore
  const { next, round, action: nextAction } =
    timer && timer.tick(simon, buttons, update);
  // $FLowIgnore
  if (next) fire(round, buttons, nextAction, timer);
};

const fire = (
  roundLength: number,
  buttons: ColorHandler,
  action: () => string | undefined,
  timer: Timer,
) => {
  action();
  const timeout = () => {
    const { next, round, action: nextAction } = timer.tick(simon, buttons);
    if (next) fire(round, buttons, nextAction, timer);
  };

  timer.id = timer && setTimeout(timeout, roundLength);
};

export { cancelTimer, advance, powerOn, powerOff };
