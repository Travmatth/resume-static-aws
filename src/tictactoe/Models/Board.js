/* @flow */

/**
 * createGrid creates an array of cell objects
 * @return {[Cell]} List of cell Maps; {x, y, player}
 */
import type { GameGrid, WinningBoard } from '../tictactoe.types';
import { Side } from '../tictactoe.types';

export function createGrid() {
  const grid = [];

  for (let x of Array(3).keys()) {
    for (let y of Array(3).keys()) {
      grid.push({ x, y, player: null });
    }
  }

  return grid;
}

export const copy = (obj: any): Object => JSON.parse(JSON.stringify(obj));

export function move(grid: Array<GameGrid>, { x, y, player }: GameGrid) {
  const square = x * 3 + y;
  const clone = copy(grid);

  if (clone[square].player === null) {
    clone[square].player = player;
  }

  return clone;
}

export const serialize = (grid: Array<GameGrid>) => grid.map(c => {
	return c.player || ''
});

// export function hasColumnScore(grid, score) {}
// export function hasDiagonalScore(grid, score) {}
// export function optimalMove() {}
/**
 * playerHasWonRow will check the given grid and return true if any
 * horizontal Row is a win for the given player
 * @param  {string} player [the player to check for horizontal wins]
 * @param  {grid}   grid   [grid in question]
 * @return {bool}          [whether player has a winning Row]
 */
export function playerHasWonRow(
  player: $Keys<typeof Side>,
  grid: Array<GameGrid>,
) {
  let hasWon = false;

  for (let row of Array(3).keys()) {
    grid
      .filter(cell => cell.player === player && cell.x === row)
      .reduce(prev => prev + 1, 0) >= 3
      ? (hasWon = true)
      : null;
  }

  return hasWon;
}

/**
 * playerHasWonColumn will check the given grid and return true if any
 * horizontal column is a win for the given player
 * @param  {string} player [the player to check for horizontal wins]
 * @param  {grid} grid   [grid in question]
 * @return {bool}        [whether player has a winning column]
 */
export function playerHasWonColumn(
  player: $Keys<typeof Side>,
  grid: Array<GameGrid>,
) {
  let hasWon = false;

  for (let col of Array(3).keys()) {
    grid
      .filter(cell => cell.player === player && cell.y === col)
      .reduce(prev => prev + 1, 0) >= 3
      ? (hasWon = true)
      : null;
  }

  return hasWon;
}

/**
 * [playerHasWonDiagonal checks the board for winning combinations on diagonals]
 * @param  {string} player [the player to check for diagonal wins]
 * @param  {grid} grid   [grid in question]
 * @return {bool}        [whether player has a winning diagonal]
 */
export function playerHasWonDiagonal(
  player: $Keys<typeof Side>,
  grid: Array<GameGrid>,
) {
  return checkDiagonal(grid, ascending, player) ||
    checkDiagonal(grid, descending, player);
}

const ascending: WinningBoard = [
  [false, false, true],
  [false, true, false],
  [true, false, false],
];

const descending: WinningBoard = [
  [true, false, false],
  [false, true, false],
  [false, false, true],
];

export const checkDiagonal = (
  grid: Array<GameGrid>,
  winningBoard: WinningBoard,
  possibleWinner: $Keys<typeof Side>,
) => {
  const score = grid
    .filter(
      ({ x, y, player }) => player === possibleWinner && winningBoard[x][y],
    )
    .reduce(prev => prev + 1, 0);

  return score >= 3;
};

/**
 * [playerHasWon checks the board to see if given player has won]
 * @param  {string} player [the player to check for wins]
 * @param  {grid} grid   [grid in question]
 * @return {bool}        [whether player has won]
 */
export function playerHasWon(
  player: $Keys<typeof Side>,
  grid: Array<GameGrid>,
) {
  return playerHasWonColumn(player, grid) ||
    playerHasWonRow(player, grid) ||
    playerHasWonDiagonal(player, grid);
}
