/* @flow */
import Game from './Game';
import type { Update, HTMLGameSquare, GameGrid } from '../tictactoe.types';
import { Side } from '../tictactoe.types';

const delay = 500; //ms

//Actions will control the move of the player; accepts a
//HTMLElement and
const makeAction = (
  elem: HTMLGameSquare,
  player: $Keys<typeof Side>,
): GameGrid => {
  const { dataset: { x, y } } = elem;
  return ({
    x: parseInt(x),
    y: parseInt(y),
    player,
  }: GameGrid);
};

export const playerAction = (
  game: Game,
  square: mixed,
  updateBoard: Update,
): void => {
  if (!game.canMove()) return;

  setTimeout(
    () => {
      const turn = game.player();
      const postPlayer = game.takeTurn(makeAction(square, turn));
      updateBoard(postPlayer);

      setTimeout(
        () => {
          const postComputer = game.simulateMove();
          updateBoard(postComputer);
        },
        delay * 2,
      );
    },
    delay * 1,
  );
};

export const extractGlyph = (elem: HTMLElement): string => {
  return elem.textContent;
};

// resetGame is responsible for resetting the game
// if the player is first turn, should only reset game
// if player is second turn, should reset grid and perform first move
export const resetGameHandler = (game: Game, updateBoard: Update) =>
  (e: Event) => {
    const glyph = extractGlyph(e.target);
    const postReset = game.reset();
    updateBoard(postReset);
    if (glyph === Side.O) {
      const postMove = game.simulateFirstMove();
      updateBoard(postMove);
    }
  };

export const restartGameHandler = (game: Game, updateBoard: Update) =>
  (e: Event) => {
    const glyph = extractGlyph(e.target);
    const postReset = game.restart();
    updateBoard(postReset);
    if (glyph === Side.O) {
      const postMove = game.simulateFirstMove();
      updateBoard(postMove);
    }
  };

// if the player is currently is first turn
//  should only reset game
// if player is second turn
//  should reset grid and perform first move
export const startGameHandler = (game: Game, updateBoard: Update) =>
  (e: Event) => {
    if (game.player() === Side.O) {
      setTimeout(
        () => {
          const grid = game.simulateFirstMove();
          updateBoard(grid);
        },
        delay,
      );
    }
  };

export const rollbackHandler = (game: Game, callback: Update) =>
  (e: Event) => {
    const previous = game.rollback();
    callback(previous /*, game */);
  };

export const choseTurnHandler = (game: Game, desired: $Keys<typeof Side>) =>
  (e: Event) => {
    const previous = game.chooseSide(desired);
  };
