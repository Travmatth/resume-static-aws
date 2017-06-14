/* @flow */

import { Simon, Colors } from '../Models';

describe('Simon Game Model', () => {
  let simon: Simon;

  beforeEach(() => simon = new Simon());

  it('hasPower should return state of simon power', () => {
    expect(simon.hasPower()).toBe(false);
  });

  it('isStrict should return state of simon strictness', () => {
    expect(simon.isStrict()).toBe(false);
  });

  it('toggleStrict should flip the strictness of the simon game', () => {
    simon.toggleStrict();
    expect(simon.isStrict()).toBe(true);
  });

  it('randomColor should return a color', () => {
    const colors = new Set(Object.keys(Colors));
    expect(colors.has(simon.randomColor())).toBe(true);
  });

  it('reset should modfy game state', () => {
    const colors = new Set(Object.keys(Colors));
    simon.failure = true;
    simon.score = 1;
    simon.step = 1;

    simon.reset();

    expect(colors.has(simon.randomColor())).toBe(true);
    expect(simon.failure).toBe(false);
    expect(simon.score).toBe(0);
    expect(colors.has(simon.round[0])).toBe(true);
    expect(simon.step).toBe(0);
  });

  it('setInput should set input with parameter', () => {
    simon.setInput(true);
    expect(simon.playerCanMove()).toBe(true);
  });

  it('playerCanMove should return state of player move', () => {
    expect(simon.playerCanMove()).toBe(false);
  });

  it('hasWonGame should return false is score < 20', () => {
    expect(simon.hasWonGame()).toBe(false);
  });

  it('hasWonGame should return false is score >= 20', () => {
    simon.score = 20;
    expect(simon.hasWonGame()).toBe(true);
  });

  it('hasWonRound return false if attempt < round', () => {
    simon.attempt = [];
    simon.round = ['red'];
    expect(simon.hasWonRound()).toBe(false);
  });

  it('hasWonRound return true if attempt >= round', () => {
    simon.attempt = ['red'];
    simon.round = ['red'];
    expect(simon.hasWonRound()).toBe(true);
  });

  it('getScore should return score', () => {
    expect(simon.getScore()).toBe(0);
  });

  it('showSequenceOver should return false if step < length', () => {
    //showSequenceOver() {
    //return this.step >= this.round.length;
    //}
    simon.step = 0;
    simon.round = ['red'];

    expect(simon.showSequenceOver()).toBe(false);
  });

  it('showSequenceOver should return true if step >= length', () => {
    simon.step = 1;
    simon.round = ['red'];

    expect(simon.showSequenceOver()).toBe(true);
  });

  it('move should add to attempt and increment step if move is correct', () => {
    simon.round = ['red'];
    simon.move('red');

    expect(simon.attempt[0]).toBe('red');
    expect(simon.step).toBe(1);
  });

  it('move should reset state if move is wrong and game is strict', () => {
    const colors = new Set(Object.keys(Colors));
    simon.round = ['blue'];
    simon.strict = true;
    simon.move('red');

    expect(colors.has(simon.round[0])).toBe(true);
    expect(simon.attempt).toEqual([]);
    expect(simon.step).toBe(0);
    expect(simon.failure).toBe(true);
  });

  it('move should reset state if move is wrong', () => {
    simon.round = ['blue'];
    simon.move('red');

    expect(simon.step).toBe(0);
    expect(simon.failure).toBe(true);
  });

  it('currentColor should return color of current step', () => {
    simon.round = ['red'];
    expect(simon.currentColor()).toBe('red');
  });

  it('hasFailedRound should return failure', () => {
    expect(simon.hasFailedRound()).toBe(false);
  });

  it('nextColor should increment step', () => {
    simon.nextColor();
    expect(simon.step).toBe(1);
  });
});
