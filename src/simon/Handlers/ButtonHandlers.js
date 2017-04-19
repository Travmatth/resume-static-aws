/* @flow */
import { TimerManager } from './TimerHandler';

const timer = new TimerManager();
const simon = new Simon();

// When power button is pressed, simon game may be started & score should illuminate
const powerHandler = (update: (score: number) => void, buttons: any) => (
  _: Event,
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

const strictHandler = (_: Event) => simon.toggleStrict();

const scoreHandler = (element: HTMLElement) => (score: number | string) =>
  element.textContent = `${score}`;

const clickHandler = (
  color: Color,
  buttons: ColorHandler,
  update: number => void,
) => (_: Event) => {
  // Event should not fire if player cannot move
  if (!simon.playerCanMove()) return false;

  // start player press animation
  simon.setPlayerCanMove(false);
  buttons.showPress(color);

  simon.move(color);

  // end player press animation after 1 second
  setTimeout(() => {
    buttons.hidePress(color);
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
      simon.setPlayerCanMove(true);
    }
  }, 1000);
};

export { clickHandler, strictHandler, scoreHandler, powerHandler };
