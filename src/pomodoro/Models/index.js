/* @flow */

import { parseTimeToText } from 'common/js/utils';

const DELAY = 10;

const PHASE = { WORK: 'WORK', REST: 'REST' };

const STATE = { STOPPED: 'STOPPED', RUNNING: 'RUNNING' };

const stopTimer = (game: Game) => {
  if (game.id) game.id = clearInterval(game.id);
};

const startTimer = (
  timerNode: HTMLElement,
  startBtn: HTMLButtonElement,
  circleNode: HTMLElement,
  timer: Timer,
  game: Game,
  set: number => {},
) =>
  game.id = setInterval(() => {
    const timeLimit = timer[game.phase];
    const now = Date.now();
    const elapsed = now - game.last;
    game.last = now;
    game.current += elapsed;

    const scale = 100;
    set(game.current / timeLimit * scale);

    if (game.current < timeLimit) {
      // If time has not run out yet, set displayed time
      timerNode.textContent = parseTimeToText(game.current);
      startBtn.textContent = 'stop';
    } else {
      // If time is out, set final timerNode, clear timer, shift phase
      timerNode.textContent = parseTimeToText(timeLimit);
      game.phase = game.phase === PHASE.WORK ? PHASE.REST : PHASE.WORK;
      stopTimer(game);
      startBtn.textContent = 'start';
      game.current = 0;
      game.state = STATE.STOPPED;
    }
  }, DELAY);

export { STATE, PHASE, stopTimer, startTimer };
