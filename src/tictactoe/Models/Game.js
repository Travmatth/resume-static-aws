/* @flow */

import {
  makeHistory,
  move,
  createGrid,
  playerHasWon,
  serialize,
  isTerminal,
  swapPlayer,
  possibleWins,
  //Debug
  copy,
} from './Board';
import type {
  GameBoard,
  GameGrid,
  GameState,
  ScoreCard,
} from '../tictactoe.types';
import { Side } from '../tictactoe.types';

const restart = (game: GameState) => {
  game.input = true;
  game.finished = false;
  game.turn = Side.X;
  game.history = [];
  game.grid = createGrid();
};

const genScoreCard = (): ScoreCard => ({ X: 0, O: 0 });

const game: GameState = {
  input: false,
  history: [],
  turn: Side.X,
  player: Side.X,
  finished: false,
  difficulty: 5,
  grid: createGrid(),
  score: genScoreCard(),
};

const ROW_LENGTH = 3;
const current = (game: GameState) => serialize(game.grid);
const startPlayerMove = (game: GameState) => game.input = true;
const endPlayerMove = (game: GameState) => game.input = false;
const canMove = (game: GameState) => game.player === game.turn;
const resetScores = (game: GameState) => game.score = genScoreCard();

const heuristicValue = (grid: GameBoard, player: $Keys<typeof Side>) => {
  const wins = possibleWins(grid, player);
  //const losses = possibleWins(grid, swapPlayer(player));
  return wins; //- losses;
};

const negamax = (
  game: GameState,
  depth: number = 5,
  //player: $Keys<typeof Side>,
  color: 1 | -1 = 1,
) => {
  const opponent = swapPlayer(game.player);
  const nextColor = color === 1 ? -1 : 1;

  if (depth === 0 || isTerminal(game.grid, game.player)) {
    const score = color * heuristicValue(game.grid, opponent);
    return { move: null, score };
  }

  const best = { score: -Infinity, move: null };

  for (let cell of game.grid.filter(c => c.player === null)) {
    const m = { ...cell, player: opponent };
    const clone = Object.assign({}, game, { grid: move(game.grid, m) });
    const { score: child } = negamax(clone, depth - 1, nextColor);

    if (-child > best.score) {
      best.score = child;
      best.move = m;
    }
  }

  return best;
};

const minimax = (
  game: GameState,
  depth: number = 5,
  player: $Keys<typeof Side>,
  low: number = -Infinity,
  high: number = Infinity,
) => {
  const opponent = swapPlayer(player);
  if (depth === 0 || isTerminal(game.grid, opponent)) {
    return { move: null, score: heuristicValue(game.grid, opponent) };
  }

  const best = { score: 0, move: null };
  const computerTurn = player !== game.player;
  const emptyCells = game.grid.filter(c => c.player === null);

  if (computerTurn) {
    let score = -Infinity;
    for (let cell of emptyCells) {
      const m = { ...cell, player };
      const next = move(game.grid, m);
      const clone = Object.assign({}, game, { grid: next });
      const { score: child } = minimax(clone, depth - 1, opponent, low, high);

      if (child >= score) {
        score = copy(child);
        best.move = copy(m);
      }

      low = Math.max(low, score);

      if (score >= high) return best;
    }

    return best;
  } else {
    let score = Infinity;
    for (let cell of emptyCells) {
      const m = { ...cell, player };
      const next = move(game.grid, m);
      const clone = Object.assign({}, game, { grid: next });
      const { score: child } = minimax(clone, depth - 1, opponent, low, high);

      if (child <= score) {
        score = copy(child);
        best.move = copy(m);
      }

      high = Math.min(high, score);

      if (low >= score) return best;
    }

    return best;
  }
};

const chooseNextMove = (game: GameState) => {
  const { grid, player, difficulty } = game;
  const color = game.player === 'X' ? -1 : 1;
  const { move: play } = negamax(game, difficulty, color);

  game.grid = move(grid, play);
};

const getScore = (game: GameState, glyph: $Keys<typeof Side>) =>
  game.score[glyph];

const canTakeSquare = (game: GameState, { x, y }: GameGrid) =>
  (game.grid[x * ROW_LENGTH + y].player === null ? true : false);

const markWinner = (game: GameState, winner: $Keys<typeof Side>) =>
  game.score[winner] += 1;

const chooseSide = (game: GameState, desiredSide: $Keys<typeof Side>) =>
  game.player = desiredSide;

const rollback = (game: GameState) => {
  const { history } = game;
  if (history.length >= 2) {
    game.history = history.slice(0, -2);
    game.grid = history[history.length - 2];
  } else if (history.length === 1) {
    game.history = history.slice(0, -1);
    game.grid = history[history.length - 1];
  }
};

const performMove = (
  game: GameState,
  remaining: number,
  selected: GameGrid,
) => {
  const { grid, history, player } = game;
  game.history = makeHistory(grid, history);
  game.grid = move(grid, { ...selected, player });

  let hasWon = false;
  if (playerHasWon(player, game.grid)) {
    hasWon = true;
    game.score[player] += 1;
  }

  game.turn = player === 'X' ? 'O' : 'X';
  game.finished = remaining <= 1 || hasWon;
};

const takeTurn = (game: GameState, selected: GameGrid) => {
  if (game.player !== game.turn) {
    console.error('takeTurn should not execute while player is not moving');
    return;
  }

  const remaining = game.grid.filter(c => c.player === null).length;

  if (remaining > 0) performMove(game, remaining, selected);
};

const simulateMove = (game: GameState) => {
  const { grid, history, turn, finished } = game;

  game.history = makeHistory(grid, history);
  game.input = !game.input;
  const empty = grid.filter(cell => cell.player === null).length;

  if (empty <= 0 || finished) {
    game.finished = true;
    return serialize(grid);
  }

  chooseNextMove(game);

  let computerHasWon = false;
  if (playerHasWon(turn, game.grid)) {
    computerHasWon = true;
    game.score[turn] += 1;
  }

  game.turn = turn === Side.X ? Side.O : Side.X;
  game.finished = empty <= 1 || computerHasWon;
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
  resetScores,
  current,
  restart,
  markWinner,
  chooseSide,
  rollback,
  takeTurn,
  startPlayerMove,
  endPlayerMove,
  simulateFirstMove,
  simulateMove,
  ROW_LENGTH,
  chooseNextMove,
  performMove,
  heuristicValue,
  minimax,
  negamax,
};
