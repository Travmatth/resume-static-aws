/* @flow */
import {
  getScore,
  canTakeSquare,
  canMove,
  resetScores,
  current,
  restart,
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

const msDelay = 500;
const blankGameGrid = ['', '', '', '', '', '', '', '', ''];

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
  const turn = game.player;
  const action = makeAction(((e.target: any): HTMLGameSquare), turn);

  if (!canMove(game) || !canTakeSquare(game, action)) return;

  // process Player move
  takeTurn(game, action);
  endPlayerMove(game);
  refresh(current(game));

  if (game.finished === true) {
    dispatchUpdateScore(turn, getScore(game, turn));
    restart(game);
    show(scenes.score);
    return;
  }

  // simulate opponent move
  setTimeout(() => {
    simulateMove(game);
    refresh(current(game));

    if (game.finished === true) {
      const computer = turn === Side.X ? Side.O : Side.X;
      dispatchUpdateScore(computer, getScore(game, computer));
      restart(game);
      show(scenes.score);
    } else {
      startPlayerMove(game);
    }
  }, msDelay);
};

const resetGameHandler = (game: GameState, show: () => void) => (e: Event) => {
  e.preventDefault();
  resetScores(game);
  dispatchUpdateScore(Side.X, getScore(game, Side.X));
  dispatchUpdateScore(Side.O, getScore(game, Side.O));
  restart(game);
  show(scenes.start);
};

const restartGameHandler = (
  game: GameState,
  refresh: () => void,
  show: () => void,
) => (e: Event) => {
  restart(game);
  refresh(blankGameGrid);
  show(scenes.play);
  if (game.player === Side.O) {
    simulateFirstMove(game);
    refresh(current(game));
  }
};

const setDifficultyHandler = (game: GameState) => ({ target }: Event) => {
  const { dataset: { difficulty } } = target;
  game.difficulty = Number(difficulty);
};

const toggleDifficultyDropdown = (el: HtmlElement) => (ev: Event) => {
  ev.stopPropagation();
  el.classList.toggle('is-active');
};

const rollbackHandler = (game: GameState, refresh: () => void) => (
  _: Event,
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
  chooseSide(game, desired);

  refresh(blankGameGrid);
  show(scenes.play);

  if (game.player === Side.O) {
    setTimeout(() => {
      simulateFirstMove(game);
      refresh(current(game));
      startPlayerMove(game);
    }, msDelay);
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
  blankGameGrid,
  updateScoreListener,
  toggleDifficultyDropdown,
  setDifficultyHandler,
};
