/* @flow */
/* eslint-env jest */

import {
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
  createGrid,
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

  it('player return the player selection', () => {
    expect(player(state)).toBe(Side.X);
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

  it('isOver should return state finished state', () => {
    expect(isOver(state)).toBe(false);
  });

  it('update should state state', () => {
    state.finished = true;
    expect(isOver(state)).toBe(true);
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
  });

  it('takeTurn should detect when winning move just made', () => {
    state.grid[0].player = Side.X;
    state.grid[1].player = Side.X;
    takeTurn(state, { x: 0, y: 2, player: null });
    expect(isOver(state)).toBe(true);
    expect(state.score[Side.X]).toBe(1);
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

  it("simulateMove shouldn't move if state board is full", () => {
    state.grid.map(
      (c, i) => (i % 2 === 0 ? (c.player = Side.X) : (c.player = Side.O)),
    );
    simulateMove(state);
    expect(state.finished).toBe(true);
  });

  it('simulateMove should move on next available state square', () => {
    simulateMove(state);
    expect(current(state)[0]).toBe(Side.X);
    expect(state.turn).toBe(Side.O);
  });

  it('simulateMove should detect if computer has won', () => {
    state.grid[0].player = Side.X;
    state.grid[1].player = Side.X;
    simulateMove(state);
    expect(isOver(state)).toBe(true);
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
