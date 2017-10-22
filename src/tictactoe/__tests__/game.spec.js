/* @flow */
/* eslint-env jest */

import {
  canMove,
  canTakeSquare,
  chooseSide,
  createGrid,
  current,
  endPlayerMove,
  game,
  getScore,
  genScoreCard,
  markWinner,
  performMove,
  resetScores,
  restart,
  rollback,
  simulateFirstMove,
  simulateMove,
  startPlayerMove,
  takeTurn,
  minimax,
} from '../Models';
import type { GameGrid } from '../tictactoe.types';
import { Side } from '../tictactoe.types';
import { blank } from '../Handlers';

let state: GameState;
describe('TicTacToe Game', () => {
  beforeEach(() => {
    state = Object.assign(
      {},
      game,
      { grid: createGrid() },
      { score: genScoreCard() },
    );
  });

  it('minimax should detect possible win', () => {
    const possibleWin = ['X', 'O', 'X', 'X', 'O', 'O', null, null, null];

    state.grid.forEach((cell, i) => cell.player = possibleWin[i]);
    state.player = Side.O;
    state.turn = Side.X;
    const next = minimax(state.grid, 9, 'X');
    expect(next).toEqual({ score: 0, move: { x: 2, y: 0, player: 'X' } });
  });

  it('minimax should detect possible loss', () => {
    const possibleLoss = ['O', 'X', 'X', 'X', 'O', 'O', null, null, null];

    state.grid.forEach((cell, i) => cell.player = possibleLoss[i]);
    state.player = Side.O;
    state.turn = Side.X;
    const next = minimax(state.grid, 9, 'X');
    //console.log('result: ', next);
    expect(next).toEqual({ score: 0, move: { x: 2, y: 2, player: 'X' } });
  });

  it('resetScores should set X and O scores to 0', () => {
    state.score[Side.X] = 1;
    state.score[Side.O] = 1;

    resetScores(state);

    expect(getScore(state, Side.X)).toBe(0);
    expect(getScore(state, Side.O)).toBe(0);
  });

  it('canTakeSquare returns true if requested square is available', () => {
    const gameGrid = { x: 0, y: 0, player: Side.X };
    expect(canTakeSquare(state, gameGrid)).toBe(true);
  });

  it('canTakeSquare returns false if requested square is unavailable', () => {
    const gameGrid = { x: 0, y: 0, player: Side.X };
    takeTurn(state, gameGrid);
    expect(canTakeSquare(state, gameGrid)).toBe(false);
  });

  it('instantiates with correct default state', () => {
    expect(state.input).toBe(false);
    expect(state.history).toEqual([]);
    expect(state.turn).toBe(Side.X);
    expect(state.player).toBe(Side.X);
    expect(state.finished).toBe(false);
    expect(state.grid).toEqual(createGrid());
    expect(state.score).toEqual(genScoreCard());
  });

  it('rollback should move back 2 states', () => {
    takeTurn(state, { x: 0, y: 0, player: Side.X });
    simulateMove(state);
    rollback(state);

    expect(state.history.length).toBe(0);
    expect(current(state)).toEqual(blank);
  });

  it('getScore return score of given player', () => {
    expect(getScore(state, Side.X)).toBe(0);
    expect(getScore(state, Side.O)).toBe(0);
  });

  it('canMove returns true when player === turn', () => {
    expect(canMove(state)).toBe(true);
  });

  it('canMove returns false when player !== turn', () => {
    state.player = Side.O;
    expect(canMove(state)).toBe(false);
  });

  it('restart should reset state state', () => {
    state.input = false;
    state.finished = true;
    state.turn = Side.O;
    state.history = [createGrid()];
    state.grid = ((['a']: any): Array<GameGrid>);

    restart(state);

    expect(state.input).toBe(true);
    expect(state.finished).toBe(false);
    expect(state.turn).toBe(Side.X);
    expect(state.history).toEqual([]);
    expect(state.grid).toEqual(createGrid());
  });

  it('update should state state', () => {
    state.finished = true;
  });

  it('markWinner should update player score', () => {
    markWinner(state, Side.X);
    expect(state.score[Side.X]).toBe(1);
  });

  it('chooseSide should set player', () => {
    chooseSide(state, Side.O);
    expect(state.player).toBe(Side.O);
  });

  it('takeTurn should reject move if player !== turn', () => {
    chooseSide(state, Side.O);
    takeTurn(state, { x: 0, y: 0, player: null });
    expect(current(state)[0]).toBe('');
    expect(state.turn).toBe(Side.X);
  });

  it('takeTurn should make move, update turn', () => {
    takeTurn(state, { x: 0, y: 0, player: null });
    expect(current(state)[0]).toBe(Side.X);
    expect(state.turn).toBe(Side.O);
    expect(state.finished).toBe(false);
  });

  it('takeTurn should detect when board already full', () => {
    state.grid.map(
      (c, i) => (i % 2 === 0 ? (c.player = Side.X) : (c.player = Side.O)),
    );
    takeTurn(state, { x: 0, y: 0, player: null });
    expect(state.history.length).toBe(0);
    expect(state.turn).toBe(Side.X);
  });

  it('takeTurn should detect when winning move just made', () => {
    state.grid[0].player = Side.X;
    state.grid[1].player = Side.X;
    takeTurn(state, { x: 0, y: 2, player: null });
    expect(state.score[Side.X]).toBe(1);
    expect(state.turn).toBe(Side.O);
  });

  it('performMove should set turn state', () => {
    state.player = 'O';
    state.grid[0].player = Side.O;
    state.grid[1].player = Side.O;
    performMove(state, 0, { x: 0, y: 2, player: null });
    expect(state.turn).toBe(Side.X);
  });

  it('startPlayerMove should set input to true', () => {
    startPlayerMove(state);
    expect(state.input).toBe(true);
  });

  it('endPlayerMove should set input to false', () => {
    state.input = true;
    endPlayerMove(state);
    expect(state.input).toBe(false);
  });

  it('simulateFirstMove should update turn, input, and call simulateMove', () => {
    const spy = jest.fn();
    simulateFirstMove(state, spy);
    expect(state.turn).toBe(Side.X);
    expect(state.input).toBe(false);
    expect(spy).toHaveBeenCalled();

    //$FlowIgnore
    spy.mockRestore();
  });

  it('simulateMove should not move if state board is full', () => {
    state.grid.map(
      (c, i) => (i % 2 === 0 ? (c.player = Side.X) : (c.player = Side.O)),
    );
    simulateMove(state);
    expect(state.finished).toBe(true);
  });

  it('simulateMove should detect if computer has won', () => {
    state.player = Side.O;
    state.grid[0].player = Side.X;
    state.grid[1].player = Side.X;
    simulateMove(state);
    expect(state.score[Side.X]).toBe(1);
  });

  it("current should return current state board with it's players", () => {
    state.grid[0].player = Side.X;
    state.grid[1].player = Side.O;
    expect(current(state)).toEqual([
      Side.X,
      Side.O,
      '',
      '',
      '',
      '',
      '',
      '',
      '',
    ]);
  });
});
