/* @flow */

import type { Stage } from '../Simon.types';
import type ColorHandler from './ColorHandler';
import type Simon from '../Simon';
import type Timer from './Timer';
import { delay, cycle } from './GameCycle';

export default class TimerManager {
  _id: ?number;
  _timer: Timer;

  constructor() {
    this._id = null;
    //this._timer = new Timer();
  }

  cancelTimer() {
    this._id && clearTimeout(this._id);
  }

  powerOff(update: (number | string) => string) {
    update('');
    this.cancelTimer();
  }

  powerOn(
    simon: Simon,
    buttons: ColorHandler,
    update: (number | string) => string,
    timer: Timer,
  ) {
    const score = simon.getScore();
    update(score === 0 ? '--' : `${score}`);
    this.advance(simon, buttons, update, timer);
  }

  advance(
    simon: Simon,
    buttons: ColorHandler,
    update: (number | string) => string | null,
    timer: Timer,
  ) {
    // ^property `next`. Property cannot be accessed on
    // possibly undefined value  `timer`
    // $FLowIgnore
    const { next, round, action: nextAction } =
      timer && timer.tick(simon, buttons, update);
    if (next) this._fire(round, buttons, nextAction, timer);
  }

  _fire(
    roundLength: number,
    buttons: ColorHandler,
    action: () => string | undefined,
    timer: Timer,
  ) {
    action();
    const timeout = () => {
      const { next, round, action: nextAction } = timer.tick(simon, buttons);
      if (next) this._fire(round, buttons, nextAction, timer);
    };

    this._id = setTimeout(timeout, roundLength);
  }
}
