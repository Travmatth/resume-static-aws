/* @flow */

import { State, Phase, startTimer, stopTimer } from '../Models';
import type { Timer, Game } from '../pomodoro.types';
import { parseTimeToText, scale, shrink } from 'common/js/utils';

// returns functions that will inc || dec rest || work states on press
const stepperHandler = (
  node: HTMLElement,
  direction: 'inc' | 'dec',
  counter: $Keys<typeof Phase>,
  timer: Timer,
) => (_: Event) => {
  const timeLimit = timer[counter] + scale(direction === 'inc' ? 1 : -1);
  timer[counter] = Math.max(timeLimit, 0);
  node.textContent = shrink(timer[counter]);
};

// returns func triggered by press on start/stop timer, adjust timer node
const toggleHandler = (
  node: HTMLElement,
  timer: Timer,
  game: Game,
  start: (HTMLElement, number, Timer, Game) => {},
  stop: Game => {},
) => (e: Event) => {
  if (game.state === State.STOPPED) {
    game.state = State.RUNNING;
    start(node, Date.now(), timer, game);
  } else {
    game.state = State.STOPPED;
    stop(game);
  }
};

// returns func triggered by press on reset timer, adjusts timer node
const resetHandler = (node: HTMLElement) => (_: Event) =>
  node.textContent = '0:0.00';

export { stepperHandler, stopTimer, startTimer, toggleHandler, resetHandler };
