/* @flow */

import type { State, Phase } from './pomodoro.types';
import { parseTimeToText, padleft, scale } from '../common/utils';

export default class Pomodoro {
  timer: Timer;
  state: State;
  phase: Phase;
  clock: ?number;

  constructor(work: number, rest: number) {
    this.state = State.STOPPED;
    this.phase = Phase.work;
    this.timer = { work: scale(work), rest: scale(rest) };
  }

  // returns functions that will inc|dec rest|work states on press
  stepper(direction: string, counter: string) {
    const i = direction === 'inc' ? 1 : -1;
    return () => {
      counter === 'work'
        ? (this.timer.work = Math.min(this.timer.work + i, 0))
        : (this.timer.rest = Math.min(this.timer.rest + i, 0));
    };
  }

  measure(anchor: number) {
    return (current: number) => current - anchor;
  }

  stopTimer(display: HTMLElement, endtime: number) {
    clearInterval(this.clock);
  }

  startTimer(display: HTMLElement, starttime: number) {
    this.calculate = this.measure(starttime);
    const self = this;

    const tick = () => {
      const max = self.timer[self.phase];
      const elapsed = self.calculate(Date.now());

      if (elapsed <= max) {
        // If time has not run out yet, set displayed time
        display.textContent = parseTimeToText(elapsed);
      } else {
        // If time is out, set final display, clear timer, shift phase
        display.textContent = parseTimeToText(max);
        clearInterval(self.clock);
        self.phase = self.phase === Phase.work ? Phase.rest : Phase.work;
      }
    };

    this.clock = setInterval(tick, 10);
  }

  // returns func triggered by press on start/stop timer, adjust timer display
  toggle(display: HTMLElement) {
    return () => {
      if (this.state === State.STOPPED)
        this.startTimer(display, Date.now(), this.phase);
      if (this.state === State.RUNNING) this.stopTimer(display);
    };
  }

  // returns func triggered by press on reset timer, adjusts timer display
  reset(display: HTMLElement) {
    display.textContent = '0:0:00';
  }
}
