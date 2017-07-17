/* @flow */

import { STATE, PHASE, startTimer, stopTimer } from '../Models';
import type { Timer, Game } from '../pomodoro.types';
import { parseTimeToText, scale, shrink } from 'common/js/utils';

const setFill = (node: HTMLElement) => (fill: number) =>
  node.style.backgroundImage = `linear-gradient(0deg, black ${fill}%, transparent 0%)`;

// returns functions that will inc || dec rest || work states on press
const stepperHandler = (
  node: HTMLElement,
  direction: 'inc' | 'dec',
  counter: $Keys<typeof PHASE>,
  timer: Timer,
) => (_: Event) => {
  const timeLimit = timer[counter] + scale(direction === 'inc' ? 1 : -1);
  timer[counter] = Math.max(timeLimit, 0);
  node.textContent = shrink(timer[counter]);
};

// returns func triggered by press on start/stop timer, adjust timer node
const toggleHandler = (
  timerDisplay: HTMLElement,
  circleDisplay: HTMLElement,
  startBtn: HTMLButtonElement,
  timer: Timer,
  game: Game,
  start: (HTMLElement, number, Timer, Game) => {},
  stop: Game => {},
  set: number => {},
) => (e: Event) => {
  startBtn.textContent = startBtn.textContent === 'start' ? 'stop' : 'start';

  if (game.state === STATE.STOPPED) {
    game.state = STATE.RUNNING;
    game.last = Date.now();
    start(timerDisplay, startBtn, circleDisplay, timer, game, set);
  } else {
    game.state = STATE.STOPPED;
    stop(game);
  }
};

// returns func triggered by press on reset timer, adjusts timer node
const resetHandler = (
  timerNode: HTMLElement,
  startBtn: HTMLButtonElement,
  set: number => {},
  game: Game,
) => (_: Event) => {
  if (startBtn.textContent === 'stop') startBtn.textContent = 'start';
  game.state = STATE.STOPPED;
  game.current = 0;
  stopTimer(game);
  //toggleOff((({}: any): Event));
  timerNode.textContent = '0:0.00';
  set(0);
};

export {
  setFill,
  stepperHandler,
  stopTimer,
  startTimer,
  toggleHandler,
  resetHandler,
};
