/* @flow */

import type { SoundManager } from '../Models';
import {
  toggleState,
  hasPower,
  getScore,
  resetSimon,
  playerCanMove,
  setInput,
  move,
  hasFailedRound,
  hasWonRound,
  hasWonGame,
  isStrict,
  toggleStrict,
} from '../Models';
import type {
  ColorKeys,
  ColorButtons,
  TimerState,
  SimonState,
} from '../simon.types';
import { powerOn, powerOff, advance, cancelTimer } from './TimerHandler';
import {
  showColor,
  hideColor,
  wonGame,
  wonRound,
  restartRound,
  strictFail,
} from './ColorHandlers';

const powerHandler = (
  update: (number | string) => string,
  buttons: ColorButtons,
  simon: SimonState,
  timer: TimerState,
  clock: { id: null | number },
  sounds: SoundManager,
) => (_: Event) => {
  toggleState(simon);

  if (!hasPower(simon)) {
    const score = getScore(simon);
    resetSimon(simon);
    update(score === 0 ? '--' : `${score}`);
    powerOn(simon, buttons, timer, update, clock, sounds);
  } else {
    update('');
    powerOff(clock);
  }
};

const strictHandler = (simon: SimonState) => (_: Event) => toggleStrict(simon);

const scoreHandler = (element: HTMLElement) => (score: number | string) =>
  element.textContent = `${score}`;

const clickHandler = (
  color: ColorKeys,
  buttons: ColorButtons,
  update: (number | string) => string,
  simon: SimonState,
  timer: TimerState,
  clock: { id: null | number },
  sounds: SoundManager,
) => (_: Event) => {
  if (!playerCanMove(simon)) return false;

  // start player press animation
  setInput(simon, false);
  showColor(color, sounds, buttons);

  move(simon, color);

  // end player press animation after 1 second
  setTimeout(() => {
    hideColor(color, sounds, buttons);
    update(getScore(simon));

    const hasFailed = hasFailedRound(simon);
    const hasWon = hasWonRound(simon);
    if (hasFailed || hasWon) cancelTimer(clock);

    const exec = () => advance(simon, buttons, update, timer, clock);
    // If player has won game, end & restart
    if (hasWonGame(simon)) {
      // show won game animation
      wonGame(exec, sounds, buttons);

      // If player has won round, advance to next
    } else if (hasWon) {
      // show won round animation
      wonRound(move, sounds, buttons);

      // If failure during strict game, should restart
    } else if (hasFailed && isStrict(simon)) {
      // show strict fail animation
      strictFail(move, sounds, buttons);

      // If failure during regular game, should restart round
    } else if (hasFailed) {
      // show fail animation
      restartRound(move, sounds, buttons);

      // If correct move, do nothing
    } else {
      setInput(simon, true);
    }
  }, 1000);
};

export { clickHandler, strictHandler, scoreHandler, powerHandler };
