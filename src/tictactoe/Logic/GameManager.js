/* @flow */
import type { Update } from '../tictactoe.types';

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
) => {
  if (!game.canMove()) return;
  const delay = 500; //ms

  setTimeout(
    () => {
      const turn = game.player();
      const postPlayer = game.takeTurn(makeAction(square, turn));
      updateBoard(postPlayer);

      setTimeout(
        () => {
          const postComputer = game.computerAction();
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
    const postReset = game.resetGrid();
    updateBoard(postReset);
    if (glyph === Player.O) {
      const postMove = simulateFirstMove(game);
      updateBoard(postMove);
    }
  };

export const restartGameHandler = (game: Game) =>
  (e: Event) => {
    const glyph = extractGlyph(e.target);
    const postReset = game.restartGrid();
    updateBoard(postReset);
    if (glyph === Player.O) {
      const postMove = simulateFirstMove(game);
      updateBoard(postMove);
    }
  };

// if the player is currently is first turn
//  should only reset game
// if player is second turn
//  should reset grid and perform first move
export const startGameHandler = (game: Game, updateBoard: Update) =>
  (e: Event) => {
    if (this.state.player === Player.O) {
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
    callback(rollback /*, game */);
  };

export const choseTurnHandler = (game: Game, desired: $Keys<Player>) =>
  (e: Event) => {
    const previous = game.chooseSide(desired);
  };
