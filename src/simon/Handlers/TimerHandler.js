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

  advance(
    simon: Simon,
    colors: ColorHandler,
    update: (score: number) => void = () => {},
  ) {
    const { next, round, action: nextAction } = this._timer.tick(
      simon,
      colors,
      update,
    );
    if (next) this._fire(round, colors, nextAction);
  }

  _fire(roundLength: number, colors: ColorHandler, action: () => void) {
    const self = this;

    action();
    const timeout = () => {
      // actions of current step? [what actions are possible?]
      const { next, round, action: nextAction } = self._timer.tick(
        simon,
        colors,
      );
      if (next) self._fire(round, colors, nextAction);
    };

    this._id = setTimeout(timeout, roundLength);
  }
}
