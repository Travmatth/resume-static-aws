/* @flow */

import {
  //delay,
  //cycle,
  //SoundManager,
  //timerState,
  //increment,
  //decrement,
  //tick,
  COLORS,
  simonState,
  toggleState,
  hasPower,
  isStrict,
  toggleStrict,
  randomColor,
  resetSimon,
  setInput,
  playerCanMove,
  hasWonGame,
  hasWonRound,
  showSequenceOver,
  getScore,
  move,
  currentColor,
  nextColor,
  hasFailedRound,
} from '../Models';
import { SimonState } from '../simon.types';

let state: SimonState;

describe('Simon Game Model', () => {
  beforeEach(() => state = simonState());

  it('hasPower should return state of simon power', () => {
    expect(hasPower(state)).toBe(false);
  });

  it('isStrict should return state of simon strictness', () => {
    expect(isStrict(state)).toBe(false);
  });

  it('toggleStrict should flip the strictness of the simon game', () => {
    toggleStrict(state);
    expect(isStrict(state)).toBe(true);
  });

  it('randomColor should return a color', () => {
    const colors = new Set(Object.keys(COLORS));
    expect(colors.has(randomColor(state))).toBe(true);
  });

  it('resetSimon should modfy game state', () => {
    const colors = new Set(Object.keys(COLORS));
    state.failure = true;
    state.score = 1;
    state.step = 1;

    resetSimon(state);

    expect(colors.has(randomColor(state))).toBe(true);
    expect(state.failure).toBe(false);
    expect(state.score).toBe(0);
    expect(colors.has(state.round[0])).toBe(true);
    expect(state.step).toBe(0);
  });

  it('setInput should set input with parameter', () => {
    setInput(state, true);
    expect(playerCanMove(state)).toBe(true);
  });

  it('playerCanMove should return state of player move', () => {
    expect(playerCanMove(state)).toBe(false);
  });

  it('hasWonGame should return false is score < 20', () => {
    expect(hasWonGame(state)).toBe(false);
  });

  it('hasWonGame should return false is score >= 20', () => {
    state.score = 20;
    expect(hasWonGame(state)).toBe(true);
  });

  it('hasWonRound return false if attempt < round', () => {
    state.attempt = [];
    state.round = ['red'];
    expect(hasWonRound(state)).toBe(false);
  });

  it('hasWonRound return true if attempt >= round', () => {
    state.attempt = ['red'];
    state.round = ['red'];
    expect(hasWonRound(state)).toBe(true);
  });

  it('getScore should return score', () => {
    expect(getScore(state)).toBe(0);
  });

  it('showSequenceOver should return false if step < length', () => {
    state.step = 0;
    state.round = ['red'];

    expect(showSequenceOver(state)).toBe(false);
  });

  it('showSequenceOver should return true if step >= length', () => {
    state.step = 1;
    state.round = ['red'];

    expect(showSequenceOver(state)).toBe(true);
  });

  it('move should add to attempt and increment step if move is correct', () => {
    state.round = ['red'];
    move(state, 'red');

    expect(state.attempt[0]).toBe('red');
    expect(state.step).toBe(1);
  });

  it('move should reset state if move is wrong and game is strict', () => {
    const colors = new Set(Object.keys(COLORS));
    state.round = ['blue'];
    state.strict = true;
    move(state, 'red');

    expect(colors.has(state.round[0])).toBe(true);
    expect(state.attempt).toEqual([]);
    expect(state.step).toBe(0);
    expect(state.failure).toBe(true);
  });

  it('move should reset state if move is wrong', () => {
    state.round = ['blue'];
    move(state, 'red');

    expect(state.step).toBe(0);
    expect(state.failure).toBe(true);
  });

  it('currentColor should return color of current step', () => {
    state.round = ['red'];
    expect(currentColor(state)).toBe('red');
  });

  it('hasFailedRound should return failure', () => {
    expect(hasFailedRound(state)).toBe(false);
  });

  it('nextColor should increment step', () => {
    nextColor(state);
    expect(state.step).toBe(1);
  });
});
