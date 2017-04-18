/* @flow */
import { TimerManager } from './TimerHandler';

const timer = new TimerManager();
const simon = new Simon();

// When power button is pressed, simon game may be started & score should illuminate
const powerHandler = (update: (score: number) => void, buttons: any) => (
  e: Event,
) => {
  simon.toggleState();
  let score = simon.getScore();

  if (simon.hasPower()) {
    update(score === null ? '--' : `${score}`);
    timer.start(simon, buttons);
  } else {
    timer.cancelTimer();
    update('');
  }
};

const strictHandler = () => (_: Event) => simon.toggleStrict();

const scoreHandler = (element: HTMLElement) => (score: number) =>
  element.textContent = `${score}`;

const clickHandler = (
  color: Color,
  buttons: ColorHandler,
  update: (score: number) => void,
) => (_: Event) => {
  // Event should not fire if player cannot move
  if (!simon.playerCanMove()) return false;

  // start player press animation
  simon.setPlayerCanMove(false);
  buttons.showPress(color);

  // end player press animation after 1 second
  setTimeout(() => {
    buttons.hidePress(color);
    //simon.setPlayerCanMove(true);

    simon.attemptMove(color);

    const hasWon = simon.hasWonRound() || simon.hasWonGame();
    const shouldUpdate = hasWon ? update : () => {};

    // If player has won game, end & restart
    // If player has won round, advance to next
    // If correct move, do nothing
    // else failure during regular or strict game, should restart
    timer.advance(simon, buttons, shouldUpdate);
  }, 1000);
};

export { clickHandler, strictHandler, scoreHandler, powerHandler };
