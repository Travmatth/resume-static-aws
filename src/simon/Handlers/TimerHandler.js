/* @flow */

import type { Simon, TimerState } from '../Models';
import { delay, cycle, timerState, tick } from '../Models';
import type { ColorKeys, ColorButtons } from '../simon.types';

const cancelTimer = (clock: { id: null | number }) =>
  clock.id && clearTimeout(clock.id);

const powerOff = (clock: { id: null | number }) => cancelTimer(clock);

const powerOn = (
  simon: Simon,
  buttons: ColorButtons,
  timer: TimerState,
  update: (number | string) => string,
  clock: { id: null | number },
  sounds: SoundManager,
) => advance(simon, buttons, update, timer, clock, sounds);

const advance = (
  simon: Simon,
  buttons: ColorButtons,
  update: (number | string) => string | void,
  timer: TimerState,
  clock: { id: null | number },
  sounds: SoundManager,
) => {
  // ^property `next`. Property cannot be accessed on
  // possibly undefined value  `timer`
  // $FLowIgnore
  const { next, round, action: nextAction } = tick(
    timer,
    simon,
    sounds,
    buttons,
  );
  // $FLowIgnore
  if (next) fire(round, buttons, nextAction, timer, simon, clock, sounds);
};

const fire = (
  roundLength: number,
  buttons: ColorButtons,
  action: () => string | void,
  timer: TimerState,
  simon: Simon,
  clock: { id: null | number },
  sounds: SoundManager,
) => {
  action();
  clock.id = setTimeout(() => {
    const { next, round, action: nextAction } = tick(
      timer,
      simon,
      sounds,
      buttons,
    );
    if (next) fire(round, buttons, nextAction, timer, simon, clock, sounds);
  }, roundLength);
};

export { cancelTimer, advance, powerOn, powerOff, fire };
