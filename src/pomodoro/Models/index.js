/* @flow */

import { parseTimeToText } from 'common/js/utils';

const Phase = { work: 'work', rest: 'rest' };

const State = { STOPPED: 'STOPPED', RUNNING: 'RUNNING' };

const stopTimer = (game: Game) => {
  if (game.id) game.id = clearInterval(game.id);
};

const startTimer = (
  node: HTMLElement,
  starttime: number,
  timer: Timer,
  game: Game,
) =>
  game.id = setInterval(() => {
    const max = timer[game.phase];
    const elapsed = Date.now() - starttime;

    if (elapsed < max) {
      // If time has not run out yet, set displayed time
      node.textContent = parseTimeToText(elapsed);
    } else {
      // If time is out, set final node, clear timer, shift phase
      node.textContent = parseTimeToText(max);
      if (game.id) clearInterval(game.id);
      game.phase = game.phase === Phase.work ? Phase.rest : Phase.work;
    }
  }, 10);

export { State, Phase, stopTimer, startTimer };
