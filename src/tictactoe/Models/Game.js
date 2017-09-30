/* @flow */

import {
  makeHistory,
  move,
  createGrid,
  playerHasWon,
  playerHasWonDiagonal,
  serialize,
} from './Board';
import type {
  GameBoard,
  GameGrid,
  GameState,
  ScoreCard,
} from '../tictactoe.types';
import { Side } from '../tictactoe.types';

const ROW_LENGTH = 3;

const genScoreCard = (): ScoreCard => ({ X: 0, O: 0 });

const game: GameState = {
  input: false,
  history: [],
  turn: Side.X,
  player: Side.X,
  finished: false,
  grid: createGrid(),
  score: genScoreCard(),
};

const getScore = (game: GameState, glyph: $Keys<typeof Side>) =>
  game.score[glyph];

const canTakeSquare = (game: GameState, { x, y }: GameGrid) =>
  (game.grid[x * ROW_LENGTH + y].player === null ? true : false);

const canMove = (game: GameState) => game.player === game.turn;

const player = (game: GameState) => game.player;

const resetScores = (game: GameState) => game.score = genScoreCard();

const current = (game: GameState) => serialize(game.grid);

const restart = (game: GameState) => {
  game.input = true;
  game.finished = false;
  game.turn = Side.X;
  game.history = [];
  game.grid = createGrid();
};

const isOver = (game: GameState) => game.finished;

const markWinner = (game: GameState, winner: $Keys<typeof Side>) =>
  game.score[winner] += 1;

const chooseSide = (game: GameState, desiredSide: $Keys<typeof Side>) =>
  game.player = desiredSide;

const rollback = (game: GameState) => {
  const { history, player, turn } = game;
  if (history.length >= 2) {
    game.history = history.slice(0, -2);
    game.grid = history[history.length - 2];
  } else {
    game.history = history.slice(0, -1);
    game.grid = history[history.length - 1];
  }
};

const takeTurn = (game: GameState, selected: GameGrid) => {
  // Only move if player has control of board, this shouldn't be reached
  if (!(game.player === game.turn)) {
    console.error("takeTurn shouldn't be execute while player isn't moving");
    return;
  }

  const { history, player } = game;

  const remaining = game.grid.filter(cell => cell.player === null);

  // if spaces available, store history, make move
  if (remaining.length > 0) {
    game.history = makeHistory(game.grid, history);
    game.grid = move(game.grid, { ...selected, player });

    // check winning status, update score
    let hasWon = false;
    if (playerHasWon(player, game.grid)) {
      hasWon = true;
      game.score[player] += 1;
    }

    // set rest of state
    game.turn = player === 'X' ? 'O' : 'X';
    game.finished = remaining.length <= 1 || hasWon;

    //Finished turn at this point
  }
};

const startPlayerMove = (game: GameState) => game.input = true;

const endPlayerMove = (game: GameState) => game.input = false;

const simulateMove = (game: GameState) => {
  const { grid, history, turn, finished } = game;

  game.history = makeHistory(grid, history);
  game.input = !game.input;

  const empty = grid.filter(cell => cell.player === null).length;

  // don't make move if game board is full
  if (empty < 1 || finished) {
    game.finished = true;
    return serialize(grid);
  }

  // choose next move
  const next = grid.filter(cell => cell.player === null)[0];
  const { player: _, ...coords } = next;

  game.grid = move(grid, { ...coords, player: turn });

  // Check if computer has won
  let hasWon = false;
  if (playerHasWon(turn, game.grid)) {
    hasWon = true;
    game.score[turn] += 1;
  }

  // set rest of state
  game.turn = turn === Side.X ? Side.O : Side.X;
  game.finished = empty <= 1 || hasWon;
};

const simulateFirstMove = (game: GameState, move = simulateMove) => {
  game.turn = Side.X;
  game.input = false;

  move(game);
};

export {
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
  ROW_LENGTH,
};
