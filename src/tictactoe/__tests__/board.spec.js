/* @flow */
/* eslint-env jest */

import {
  ascending,
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
} from '../Models';
import type { GameGrid, GameBoard } from '../tictactoe.types';

const setGrid = (grid: GameBoard, board: Array<null | 'X' | 'O'>) => {
  return grid.map((c, i) => {
    c.player = board[i];
    return c;
  });
};

describe('TicTacToe Board', () => {
  let grid: GameBoard;

  beforeEach(() => grid = createGrid());

  it('createGrid should create a 3x3 grid of game squares with null players', () => {
    const all = grid.reduce((result: boolean, gamegrid: GameGrid) => {
      return result && gamegrid.player === null;
    }, true);

    expect(all).toBe(true);
  });

  it('copy should return a new copy of given object', () => {
    const original = {};
    const clone = copy(original);
    expect(original === clone).toBe(false);
  });

  it("move shouldn't set player in square if already occupied", () => {
    grid[0].player = 'O';
    const next = move(grid, { x: 0, y: 0, player: 'X' });
    expect(next[0].player).toBe('O');
  });

  it('move should accept grid and gamegrid, set player in given square', () => {
    const next = move(grid, { x: 0, y: 0, player: 'X' });
    expect(next[0].player).toBe('X');
  });

  it('move should return copy of given grid', () => {
    const next = move(grid, { x: 0, y: 0, player: 'X' });
    expect(grid === next).toBe(false);
  });

  it('serialize should reduce a grid down to 3 x 3 array of players in given square', () => {
    grid = grid.map((g, i) => {
      i % 2 === 0 ? (g.player = 'X') : (g.player = null);
      return g;
    });

    expect(serialize(grid)).toEqual(['X', '', 'X', '', 'X', '', 'X', '', 'X']);
  });

  it('makeHistory shoud store game grid into history', () => {
    expect(makeHistory(grid, []).length).toBe(1);
  });

  it('makeHistory shoud store copy of game grid', () => {
    const history = makeHistory(grid, []);
    expect(history[0] === grid).toBe(false);
  });

  it('playerHasWonRow should detect if player has won row', () => {
    for (let i of Array(3).keys()) {
      grid[i].player = 'X';
    }

    expect(playerHasWonRow('X', grid)).toBe(true);
  });

  it('playerHasWonColumn should detect if player has won column', () => {
    grid[0].player = 'X';
    grid[3].player = 'X';
    grid[6].player = 'X';

    expect(playerHasWonColumn('X', grid)).toBe(true);
  });

  it('playerHasWonDiagonal should detect if player has won ascending diagonal', () => {
    grid[0].player = 'X';
    grid[4].player = 'X';
    grid[8].player = 'X';

    expect(playerHasWonDiagonal('X', grid)).toBe(true);
  });

  it('playerHasWonDiagonal should detect if player has won descending diagonal', () => {
    grid[2].player = 'X';
    grid[4].player = 'X';
    grid[6].player = 'X';

    expect(playerHasWonDiagonal('X', grid)).toBe(true);
  });

  it('checkDiagonal should check if player has won according to given template', () => {
    grid[2].player = 'X';
    grid[4].player = 'X';
    grid[6].player = 'X';

    expect(checkDiagonal(grid, ascending, 'X')).toBe(true);
  });

  it('playerHasWon should detect winning diagonal', () => {
    grid[2].player = 'X';
    grid[4].player = 'X';
    grid[6].player = 'X';

    expect(playerHasWon('X', grid)).toBe(true);
  });

  it('playerHasWon should detect winning row', () => {
    grid[0].player = 'X';
    grid[1].player = 'X';
    grid[2].player = 'X';

    expect(playerHasWon('X', grid)).toBe(true);
  });

  it('playerHasWon should detect winning column', () => {
    grid[0].player = 'X';
    grid[3].player = 'X';
    grid[6].player = 'X';

    expect(playerHasWon('X', grid)).toBe(true);
  });

  it('possibleWins should return 0 for empty board', () => {
    const board = [null, null, null, null, null, null, null, null, null];
    expect(possibleWins(setGrid(grid, board), 'X')).toBe(0);
  });

  it('possibleWins should return 100 for winning board', () => {
    const board = ['X', 'X', 'X', null, null, null, null, null, null];
    expect(possibleWins(setGrid(grid, board), 'X')).toBe(100);
  });

  it('possibleWins should return 4 for centered piece', () => {
    const board = [null, null, null, null, 'X', null, null, null, null];
    expect(possibleWins(setGrid(grid, board), 'X')).toBe(0);
  });

  it('possibleWins should not count opponent occupied lines', () => {
    const board = [null, null, null, null, 'X', 'O', null, null, null];
    expect(possibleWins(setGrid(grid, board), 'X')).toBe(1);
  });

  it('possibleWins should count multiple lines', () => {
    const board = [null, null, 'X', null, 'X', 'O', null, null, null];
    expect(possibleWins(setGrid(grid, board), 'X')).toBe(2);
  });

  it('swapPlayer should do so', () => {
    expect(swapPlayer('X')).toBe('O');
  });

  it('isTerminal should detect full boards', () => {
    const board = ['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', 'O'];
    expect(isTerminal(setGrid(grid, board), 'X')).toBe(true);
  });

  it('isTerminal should detect player wins', () => {
    const board = ['X', 'O', 'X', 'O', 'X', 'O', 'X', null, null];
    expect(isTerminal(setGrid(grid, board), 'X')).toBe(true);
  });

  it('isTerminal should detect opponent wins', () => {
    const board = ['X', 'O', 'X', 'O', 'O', 'O', null, null, null];
    expect(isTerminal(setGrid(grid, board), 'X')).toBe(true);
  });
});
