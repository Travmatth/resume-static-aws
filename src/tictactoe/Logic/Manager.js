/* @flow */
import Game from './Game';
import type { Update, HTMLGameSquare, GameGrid } from '../tictactoe.types';
import { Side } from '../tictactoe.types';

const delay = 500; //ms
// Since update callbacks accept Array<string>, can overwrite game grid w/ ''
const blank = ['', '', '', '', '', '', '', '', ''];

const makeAction = (elem: HTMLGameSquare, player: $Keys<typeof Side>) => {
  const { dataset: { x, y } } = elem;

  return ({
    x: parseInt(x),
    y: parseInt(y),
    player,
  }: GameGrid);
};

const playerAction = (game: Game, update: Update, end: () => void) =>
  (e: Event) => {
    if (!game.canMove()) return;

    // Simulate Player move
    const turn = game.player();
    const action = makeAction(e.target, turn);
    game.takeTurn(action);

    setTimeout(
      () => {
        // process Player move
        if (game.isOver()) {
          game.restart();
          end();
          return;
        } else {
          update(game.current());
        }

        // simulate opponent move
        setTimeout(
          () => {
            game.simulateMove();
            if (game.isOver()) {
              game.restart();
              end();
              return;
            } else {
              update(game.current());
            }
          },
          delay,
        );
      },
      delay,
    );
  };

// Pressed in the score view to switch views: score -> start
const resetGameHandler = (game: Game, reset: () => void) =>
  (e: Event) => {
    game.restart();
    reset();
  };

// restartGame is responsible for restarting the game
// if the player is first turn, should only restart game
// else player is second turn, should reset grid and perform first move
const restartGameHandler = (game: Game, update: Update) =>
  (e: Event) => {
    game.restart();
    update(blank);
    if (game.player() === Side.O) {
      game.simulateFirstMove();
      update(game.current());
    }
  };

const startGameHandler = (game: Game, update: Update, transition: () => void) =>
  (e: Event) => {
    // Clear previous state of Game view, if any
    update(blank);
    // swap Game View into DOM
    transition();
    if (game.player() === Side.O) {
      setTimeout(
        () => {
          game.simulateFirstMove();
          update(game.current());
        },
        delay,
      );
    }
  };

const rollbackHandler = (game: Game, update: Update) =>
  (e: Event) => {
    game.rollback();
    update(game.current());
  };

const chooseTurnHandler = (game: Game) =>
  (e: Event) => {
    const desired = e.target.dataset.glyph;
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
