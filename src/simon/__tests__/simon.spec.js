/* @flow */
/* eslint-env jest */

import {
  COLORS,
  simonState,
  toggleState,
  toggleStrict,
  randomColor,
  resetSimon,
  setInput,
  hasWonGame,
  hasWonRound,
  showSequenceOver,
  recordPlayerAttempt,
  currentGameplayColor,
  nextGameplayColor,
  hasFailedRound,
  addGameplayColor,
  restartRound,
  nextRound,
} from '../Models';
import { SimonState } from '../simon.types';

let state: SimonState;
const colors = new Set(Object.keys(COLORS));

describe('Simon Game Model', () => {
  beforeEach(() => state = simonState());

  it('nextRound should reset properties on state', () => {
    const nextState = nextRound(state);
    expect(nextState.round.length).toBe(1);
    expect(nextState).toMatchObject({
      score: 0,
      failure: false,
      gameplayStep: 0,
      attemptStep: 0,
    });
  });

  it('restartRound should reset properties on state', () => {
    expect(restartRound(state)).toMatchObject({
      failure: false,
      gameplayStep: 0,
      attemptStep: 0,
    });
  });

  it('addGameplayColor should add random color to round', () => {
    expect(addGameplayColor(state).round.length).toBe(1);
  });

  it('toggleState should toggle simon power', () => {
    toggleState(state);

    expect(state.power).toBe(true);
  });

  it('toggleStrict should flip the strictness of the simon game', () => {
    toggleStrict(state);
    expect(state.strict).toBe(true);
  });

  it('randomColor should return a color', () => {
    expect(colors.has(randomColor(state))).toBe(true);
  });

  it('resetSimon should modfy game state', () => {
    state.failure = true;
    state.score = 1;
    state.step = 1;
    resetSimon(state);

    expect(colors.has(randomColor(state))).toBe(true);
    expect(state.failure).toBe(false);
    expect(state.score).toBe(0);
    expect(colors.has(state.round[0])).toBe(true);
  });

  it('setInput should set input with parameter', () => {
    setInput(state, true);
    expect(state.input).toBe(true);
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
    state.attemptStep = 1;
    state.round = ['red'];
    expect(hasWonRound(state)).toBe(true);
  });

  it('showSequenceOver should return false if step < length', () => {
    state.gameplayStep = 0;
    state.round = ['red', 'blue'];

    expect(showSequenceOver(state)).toBe(false);
  });

  it('showSequenceOver should return true if step >= length', () => {
    state.step = 1;
    state.round = ['red'];

    expect(showSequenceOver(state)).toBe(true);
  });

  it('recordPlayerAttempt should add to attempt and increment step if move is correct', () => {
    state.round = ['red', 'blue'];
    recordPlayerAttempt(state, 'red');

    expect(state.attemptStep).toBe(1);
  });

  it('recordPlayerAttempt should add to attempt and increment step if move is correct', () => {
    state.round = ['red'];
    recordPlayerAttempt(state, 'red');

    expect(state.attemptStep).toBe(1);
    expect(state.score).toBe(1);
    expect(state.playerInputFinished).toBe(true);
  });

  it('recordPlayerAttempt should reset state if move is wrong and game is strict', () => {
    state.round = ['blue'];
    state.strict = true;
    recordPlayerAttempt(state, 'red');

    expect(state.round.length).toBe(1);
    expect(state.attemptStep).toEqual(0);
    expect(state.gameplayStep).toBe(0);
    expect(state.failure).toBe(true);
  });

  it('recordPlayerAttempt should reset state if move is wrong', () => {
    state.round = ['blue'];
    recordPlayerAttempt(state, 'red');

    expect(state.attemptStep).toBe(0);
    expect(state.gameplayStep).toBe(0);
    expect(state.failure).toBe(true);
  });

  it('currentGameplayColor should return color of current step', () => {
    state.round = ['red'];
    expect(currentGameplayColor(state)).toBe('red');
  });

  it('nextGameplayColor should increment current step', () => {
    state.round = ['red', 'blue'];
    nextGameplayColor(state);
    expect(state.gameplayStep).toBe(1);
  });

  it('hasFailedRound should return failure', () => {
    expect(hasFailedRound(state)).toBe(false);
  });
});
