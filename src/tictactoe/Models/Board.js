/* @flow */

import type { GameGrid, WinningBoard, GameBoard } from '../tictactoe.types';
import { Side } from '../tictactoe.types';

const createGrid = () => {
  const grid = [];

  for (let x of Array(3).keys()) {
    for (let y of Array(3).keys()) {
      grid.push({ x, y, player: null });
    }
  }

  return grid;
};

const copy = (obj: any): any => JSON.parse(JSON.stringify(obj));

const move = (grid: GameBoard, { x, y, player }: GameGrid) => {
  const square = x * 3 + y;
  const clone = (copy(grid): GameBoard);

  if (clone[square].player === null) {
    clone[square].player = player;
  }

  return clone;
};

const serialize = (grid: Array<GameGrid>) => grid.map(c => c.player || '');

const makeHistory = (current: Array<GameGrid>, history: Array<GameBoard>) => {
  const next = (copy(history): Array<GameBoard>);
  next.push(copy(current));
  return next;
};

const playerHasWonRow = (player: $Keys<typeof Side>, grid: Array<GameGrid>) => {
  let hasWon = false;

  for (let row of Array(3).keys()) {
    grid
      .filter(cell => cell.player === player && cell.x === row)
      .reduce(prev => prev + 1, 0) >= 3
      ? (hasWon = true)
      : null;
  }

  return hasWon;
};

const playerHasWonColumn = (
  player: $Keys<typeof Side>,
  grid: Array<GameGrid>,
) => {
  let hasWon = false;

  for (let col of Array(3).keys()) {
    grid
      .filter(cell => cell.player === player && cell.y === col)
      .reduce(prev => prev + 1, 0) >= 3
      ? (hasWon = true)
      : null;
  }

  return hasWon;
};

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

const checkDiagonal = (
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

const playerHasWonDiagonal = (
  player: $Keys<typeof Side>,
  grid: Array<GameGrid>,
) => {
  return (
    checkDiagonal(grid, ascending, player) ||
    checkDiagonal(grid, descending, player)
  );
};

const playerHasWon = (player: $Keys<typeof Side>, grid: Array<GameGrid>) => {
  return (
    playerHasWonColumn(player, grid) ||
    playerHasWonRow(player, grid) ||
    playerHasWonDiagonal(player, grid)
  );
};

const swapPlayer = (player: $Keys<typeof Side>) =>
  (player === Side.X ? Side.O : Side.X);

const isTerminal = (grid: GameBoard, player: $Keys<typeof Side>) => {
  const remaining = grid.filter(cell => cell.player === null).length;
  const playerWon = playerHasWon(player, grid);
  const opponentWon = playerHasWon(swapPlayer(player), grid);
  return playerWon || opponentWon || remaining <= 0;
};

const possibleWinningRows = [
  // Columns
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // Rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // Diagonals
  [0, 4, 8],
  [2, 4, 6],
];

const possibleWins = (grid: GameBoard, player: $Keys<typeof Side>) => {
  if (playerHasWon(player, grid)) {
    return 100;
  } else if (playerHasWon(swapPlayer(player), grid)) {
    return -100;
  } else {
    const opponent = swapPlayer(player);

    //return 0;
    return possibleWinningRows.reduce((a, combination) => {
      let score;
      const canWin = combination.every(i => grid[i].player !== opponent);

      return canWin === false
        ? a +
            combination.reduce((a, i) => {
              return grid[i].player === player ? a + 1 : a;
            }, 0)
        : a;
    }, 0);
  }
};

export {
  ascending,
  descending,
  makeHistory,
  createGrid,
  copy,
  move,
  serialize,
  playerHasWonRow,
  playerHasWonColumn,
  playerHasWonDiagonal,
  checkDiagonal,
  playerHasWon,
  swapPlayer,
  possibleWins,
  isTerminal,
};
