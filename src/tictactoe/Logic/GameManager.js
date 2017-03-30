/* @flow */
import Game from './Game';
import type { Update, HTMLGameSquare, GameGrid } from '../tictactoe.types';
import { Side } from '../tictactoe.types';

const delay = 500; //ms

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

const playerAction = (game: Game, updateBoard: Update, end: () => void) =>
  (e: Event) => {
    if (!game.canMove()) return;

    setTimeout(
      () => {
        const turn = game.player();
        const action = makeAction(e.target);
        game.takeTurn(action, turn);

        if (game.isOver()) {
          end();
          return;
        } else {
          const postPlayer = game.current();
          updateBoard(postPlayer);
        }

        setTimeout(
          () => {
            game.simulateMove();
            if (game.isOver()) {
              end();
            } else {
              const postComputer = game.current();
              updateBoard(postComputer);
            }
          },
          delay * 2,
        );
      },
      delay * 1,
    );
  };

// resetGame is responsible for resetting the game
// if the player is first turn, should only reset game
// if player is second turn, should reset grid and perform first move
const resetGameHandler = (game: Game, updateBoard: Update) =>
  (e: Event) => {
    const { textContent: glyph } = e.target;
    game.reset();
    const postReset = game.current();
    updateBoard(postReset);
    if (glyph === Side.O) {
      game.simulateFirstMove();
      const postMove = game.current();
      updateBoard(postMove);
    }
  };

const restartGameHandler = (game: Game, transition, root) =>
  (e: Event) => {
    const { textContent: glyph } = e.target;
    game.restart();
    transition(root, game);
    if (glyph === Side.O) {
      game.simulateFirstMove();
      const postMove = game.current();
      updateBoard(postMove);
    }
  };

// if the player is currently is first turn
//  should only reset game
// if player is second turn
//  should reset grid and perform first move
const startGameHandler = (game: Game, updateBoard: Update) =>
  (e: Event) => {
    //Clear previous state of Game view, if any
    updateBoard(['', '', '', '', '', '', '', '', '']);
    if (game.player() === Side.O) {
      setTimeout(
        () => {
          game.simulateFirstMove();
          const grid = game.current();
          updateBoard(grid);
        },
        delay,
      );
    }
  };

const rollbackHandler = (game: Game, callback: Update) =>
  (e: Event) => {
    game.rollback();
    const previous = game.current();
    callback(previous);
  };

const chooseTurnHandler = (game: Game, desired: $Keys<typeof Side>) =>
  (e: Event) => {
    const previous = game.chooseSide(desired);
  };

export {
  playerAction,
  restartGameHandler,
  resetGameHandler,
  startGameHandler,
  rollbackHandler,
  chooseTurnHandler,
};
