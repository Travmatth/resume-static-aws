import type { Stage } from '../Simon.types';
import type { ColorHandler } from './ColorHandler';
import { Timer } from './Timer';
import { delay, cycle } from './GameCycle';

export class TimerManager {
  _id: ?number;
  _timer: Timer;

  constructor() {
    this._id = null;
    this._timer = new Timer();
  }

  cancelTimer() {
    this._id && clearTimeout(this._id);
  }

  powerOff(update: (number | string) => void) {
    update('');
    this.cancelTimer();
  }

  powerOn(
    simon: Simon,
    buttons: ColorHandler,
    update: (number | string) => void,
  ) {
    update(simon.score() === null ? '--' : `${score}`);
    this.advance(simon, buttons, update);
  }

  advance(
    simon: Simon,
    buttons: ColorHandler,
    update: (number | string) => void,
  ) {
    const { next, round, action: nextAction } = this._timer.tick(
      simon,
      buttons,
      update,
    );
    if (next) this._fire(round, buttons, nextAction);
  }

  _fire(roundLength: number, buttons: ColorHandler, action: () => void) {
    const self = this;

    action();
    const timeout = () => {
      // actions of current step? [what actions are possible?]
      const { next, round, action: nextAction } = self._timer.tick(
        simon,
        buttons,
      );
      if (next) self._fire(round, buttons, nextAction);
    };

    this._id = setTimeout(timeout, roundLength);
  }
}
