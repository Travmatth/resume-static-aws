/* @flow */
import {
  game,
  genScoreCard,
  getScore,
  canTakeSquare,
  canMove,
  player,
  resetScores,
  current,
  restart,
  isOver,
  markWinner,
  chooseSide,
  rollback,
  takeTurn,
  startPlayerMove,
  endPlayerMove,
  simulateFirstMove,
  simulateMove,
} from '../Models';
import { dispatchUpdateScore } from './Events';
import type { HTMLGameSquare, GameGrid, GameState } from '../tictactoe.types';
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

const playerAction = (
  game: GameState,
  refresh: () => void,
  show: () => void,
) => (e: Event) => {
  // Simulate Player move
  const turn = player(game);
  const action = makeAction(((e.target: any): HTMLGameSquare), turn);

  if (!canMove(game) || !canTakeSquare(game, action)) return;

  // process Player move
  takeTurn(game, action);
  endPlayerMove(game);
  refresh(current(game));

  if (isOver(game)) {
    dispatchUpdateScore(turn, getScore(game, turn));
    restart(game);
    show(scenes.score);
    return;
  }

  // simulate opponent move
  setTimeout(() => {
    simulateMove(game);
    refresh(current(game));

    if (isOver(game)) {
      const computer = turn === Side.X ? Side.O : Side.X;
      dispatchUpdateScore(computer, getScore(game, computer));
      restart(game);
      show(scenes.score);
    } else {
      startPlayerMove(game);
    }
  }, delay);
};

// Pressed in the score view to switch views: score -> start
const resetGameHandler = (game: GameState, show: () => void) => (e: Event) => {
  e.preventDefault();
  resetScores(game);
  dispatchUpdateScore(Side.X, getScore(game, Side.X));
  dispatchUpdateScore(Side.O, getScore(game, Side.O));
  restart(game);
  show(scenes.start);
};

// restartGame is responsible for restarting the game
// if the player is first turn, should only restart game
// else player is second turn, should reset grid and perform first move
const restartGameHandler = (
  game: GameState,
  refresh: () => void,
  show: () => void,
) => (e: Event) => {
  restart(game);
  refresh(blank);
  show(scenes.play);
  if (player(game) === Side.O) {
    simulateFirstMove(game);
    refresh(current(game));
  }
};

const rollbackHandler = (game: GameState, refresh: () => void) => (
  e: Event,
) => {
  rollback(game);
  refresh(current(game));
};

const chooseTurnHandler = (
  game: GameState,
  refresh: () => void,
  show: () => void,
) => (e: Event) => {
  const desired = ((e.target.dataset.glyph: any): $Keys<typeof Side>);
  const previous = chooseSide(game, desired);

  // Clear previous state of Game view, if any
  refresh(blank);
  // swap Game View into DOM
  show(scenes.play);
  if (player(game) === Side.O) {
    setTimeout(() => {
      simulateFirstMove(game);
      refresh(current(game));
      startPlayerMove(game);
    }, delay);
  }
};

const updateScoreListener = ({ target, detail }: CustomEvent) =>
  target.textContent = `${detail}`;

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
