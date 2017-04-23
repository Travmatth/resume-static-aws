/* @flow */

import type Simon from '../Simon';
import { Colors } from '../simon.types';
import type { ColorKeys } from '../simon.types';
import { powerOn, powerOff, advance, cancelTimer } from './TimerHandler';
import type ColorHandler from './ColorHandler';
import type Timer from './Timer';

// When power button is pressed, simon game may be started & score should illuminate
const powerHandler = (
  update: (number | string) => string,
  buttons: ColorHandler,
  simon: Simon,
  timer: Timer,
) => (_: Event) => {
  simon.toggleState();

  if (!simon.hasPower()) {
    const score = simon.getScore();
    simon.reset();
    update(score === 0 ? '--' : `${score}`);
    powerOn(simon, buttons, timer, update);
  } else {
    simon.end();
    update('');
    powerOff();
  }
};

const strictHandler = (simon: Simon) => (_: Event) => simon.toggleStrict();

const scoreHandler = (element: HTMLElement) => (score: number | string) =>
  element.textContent = `${score}`;

const clickHandler = (
  color: ColorKeys,
  buttons: ColorHandler,
  update: (number | string) => string,
  simon: Simon,
  timer: Timer,
) => (_: Event) => {
  if (!simon.playerCanMove()) return false;

  // start player press animation
  simon.setInput(false);
  buttons.showColor(color);

  simon.move(color);

  // end player press animation after 1 second
  setTimeout(() => {
    buttons.hideColor(color);
    update(simon.getScore());

    const hasFailed = simon.hasFailedRound();
    const hasWon = simon.hasWonRound();
    if (hasFailed || hasWon) cancelTimer();

    const move = () => advance(simon, buttons, update, timer);
    // If player has won game, end & restart
    if (simon.hasWonGame()) {
      // show won game animation
      buttons.wonGame(move);

      // If player has won round, advance to next
    } else if (hasWon) {
      // show won round animation
      buttons.wonRound(move);

      // If failure during strict game, should restart
    } else if (hasFailed && simon.isStrict()) {
      // show strict fail animation
      buttons.strictFail(move);

      // If failure during regular game, should restart round
    } else if (hasFailed) {
      // show fail animation
      buttons.restartRound(move);

      // If correct move, do nothing
    } else {
      simon.setInput(true);
    }
  }, 1000);
};

export { clickHandler, strictHandler, scoreHandler, powerHandler };
