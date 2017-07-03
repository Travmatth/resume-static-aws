/* @flow */
import { Game } from '../Models';
import { dispatchUpdateScore } from './Events';
import type { HTMLGameSquare, GameGrid } from '../tictactoe.types';
import { scenes, Side } from '../tictactoe.types';

const delay = 500; //ms
// Since refresh callbacks accept Array<string>, can overwrite game grid w/ ''
const blank = ['', '', '', '', '', '', '', '', ''];

const makeAction = (elem: HTMLGameSquare, player: $Keys<typeof Side>) => {
  const { dataset: { x, y } } = elem;

  return ({
    x: parseInt(x),
    y: parseInt(y),
    player,
  }: GameGrid);
};

const playerAction = (game: Game, refresh: () => void, show: () => void) => (
  e: Event,
) => {
  // Simulate Player move
  const turn = game.player();
  const action = makeAction(((e.target: any): HTMLGameSquare), turn);

  if (!game.canMove() || !game.canTakeSquare(action)) return;

  // process Player move
  game.takeTurn(action);
  game.endPlayerMove();
  refresh(game.current());

  if (game.isOver()) {
    dispatchUpdateScore(turn, game.getScore(turn));
    game.restart();
    show(scenes.score);
    return;
  }

  // simulate opponent move
  setTimeout(() => {
    game.simulateMove();
    refresh(game.current());

    if (game.isOver()) {
      const computer = turn === Side.X ? Side.O : Side.X;
      dispatchUpdateScore(computer, game.getScore(computer));
      game.restart();
      show(scenes.score);
    } else {
      game.startPlayerMove();
    }
  }, delay);
};

// Pressed in the score view to switch views: score -> start
const resetGameHandler = (game: Game, show: () => void) => (e: Event) => {
  e.preventDefault();
  game.resetScores();
  dispatchUpdateScore(Side.X, game.getScore(Side.X));
  dispatchUpdateScore(Side.O, game.getScore(Side.O));
  game.restart();
  show(scenes.start);
};

// restartGame is responsible for restarting the game
// if the player is first turn, should only restart game
// else player is second turn, should reset grid and perform first move
const restartGameHandler = (
  game: Game,
  refresh: () => void,
  show: () => void,
) => (e: Event) => {
  game.restart();
  refresh(blank);
  show(scenes.play);
  if (game.player() === Side.O) {
    game.simulateFirstMove();
    refresh(game.current());
  }
};

const rollbackHandler = (game: Game, refresh: () => void) => (e: Event) => {
  game.rollback();
  refresh(game.current());
};

const chooseTurnHandler = (
  game: Game,
  refresh: () => void,
  show: () => void,
) => (e: Event) => {
  const desired = ((e.target.dataset.glyph: any): $Keys<typeof Side>);
  const previous = game.chooseSide(desired);

  // Clear previous state of Game view, if any
  refresh(blank);
  // swap Game View into DOM
  show(scenes.play);
  if (game.player() === Side.O) {
    setTimeout(() => {
      game.simulateFirstMove();
      refresh(game.current());
      game.startPlayerMove();
    }, delay);
  }
};

const updateScoreListener = ({ target, detail }: CustomEvent) => {
  target.textContent = `${detail}`;
};

export {
  playerAction,
  restartGameHandler,
  resetGameHandler,
  rollbackHandler,
  chooseTurnHandler,
  makeAction,
  blank,
  updateScoreListener,
};
