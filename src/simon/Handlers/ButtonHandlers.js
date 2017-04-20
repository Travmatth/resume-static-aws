/* @flow */

import Simon from '../Simon';
import { Colors } from '../simon.types';
import type { ColorKeys } from '../simon.types';
import { TimerManager } from './TimerHandler';

const timer = new TimerManager();
const simon = new Simon();

// When power button is pressed, simon game may be started & score should illuminate
const powerHandler = (update: number | ((string) => void), buttons: any) => (
  _: Event,
) => {
  simon.toggleState();

  if (simon.hasPower()) {
    simon.reset();
    timer.powerOn(simon, buttons, update);
  } else {
    simon.end();
    timer.powerOff(update);
  }
};

const strictHandler = (_: Event) => simon.toggleStrict();

const scoreHandler = (element: HTMLElement) => (score: number | string) =>
  element.textContent = `${score}`;

const clickHandler = (
  color: ColorKeys,
  buttons: ColorHandler,
  update: number | ((string) => void),
) => (_: Event) => {
  if (!simon.playerCanMove()) return false;

  // start player press animation
  simon.setInput(false);
  buttons.showColor(color);

  simon.move(color);

  // end player press animation after 1 second
  setTimeout(() => {
    buttons.hideColor(color);
    update(simon.score());

    const hasFailed = simon.hasFailedRound();
    const hasWon = simon.hasWonRound();
    if (hasFailed || hasWon) simon.cancelTimer();

    // If player has won game, end & restart
    if (simon.hasWonGame()) {
      // show won game animation
      buttons.wonGame(() => timer.advance(simon, buttons));

      // If player has won round, advance to next
    } else if (hasWon) {
      // show won round animation
      buttons.wonRound(() => timer.advance(simon, buttons));

      // If failure during strict game, should restart
    } else if (hasFailed && simon.isStrict()) {
      // show strict fail animation
      buttons.strictFail(() => timer.advance(simon, buttons));

      // If failure during regular game, should restart round
    } else if (hasFailed) {
      // show fail animation
      buttons.restartRound(() => timer.advance(simon, buttons));

      // If correct move, do nothing
    } else {
      simon.setInput(true);
    }
  }, 1000);
};

export { clickHandler, strictHandler, scoreHandler, powerHandler };
