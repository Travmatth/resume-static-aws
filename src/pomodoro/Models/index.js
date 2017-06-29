/* @flow */

import { parseTimeToText } from 'common/js/utils';

const Phase = { work: 'work', rest: 'rest' };

const State = { STOPPED: 'STOPPED', RUNNING: 'RUNNING' };

const stopTimer = (game: Game) => {
  if (game.id) game.id = clearInterval(game.id);
};

const startTimer = (
  timerNode: HTMLElement,
  startBtn: HTMLButtonElement,
  circleNode: HTMLElement,
  starttime: number,
  timer: Timer,
  game: Game,
  set: number => {},
) =>
  game.id = setInterval(() => {
    const max = timer[game.phase];
    const elapsed = Date.now() - starttime;

    set(elapsed / max * 100);

    if (elapsed < max) {
      // If time has not run out yet, set displayed time
      timerNode.textContent = parseTimeToText(elapsed);
      startBtn.textContent = 'stop';
    } else {
      // If time is out, set final timerNode, clear timer, shift phase
      timerNode.textContent = parseTimeToText(max);
      game.phase = game.phase === Phase.work ? Phase.rest : Phase.work;
      stopTimer(startBtn, game, set);
      startBtn.textContent = 'start';
    }
  }, 10);

export { State, Phase, stopTimer, startTimer };
