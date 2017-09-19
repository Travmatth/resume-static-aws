/* @flow */
import '../Models';
import type { ColorHandler } from '../Handlers';
import type { SoundManager } from '../Models';
import type { TimerState, SimonState } from '../simon.types';
import {
  timerState,
  resetTimer,
  increment,
  decrement,
  tick,
} from '../Models/Timer';
import { delay } from '../Models/GameCycle';
import * as Simon from '../Models/Simon';

jest.mock('../Models/Simon', () => ({
  ...require.requireActual('../Models/Simon'),
  showSequenceOver: jest.fn(),
  //setInput: jest.fn(),
  hasWonRound: jest.fn(),
  hasWonGame: jest.fn(),
  resetSimon: jest.fn(),
}));

class Sounds {}

describe('Simon Game Timer Model', () => {
  let simon: SimonState;
  let buttons: ColorHandler;
  let sounds: SoundManager;
  let state: TimerState;

  beforeEach(() => {
    state = timerState();
    simon = Simon.simonState();
    sounds = ((new Sounds(): any): SoundManager);

    //$FlowIgnore
    sounds.play = jest.fn();
    //$FlowIgnore
    sounds.pause = jest.fn();

    buttons = {
      red: document.createElement('button'),
      yellow: document.createElement('button'),
      green: document.createElement('button'),
      blue: document.createElement('button'),
    };

    Object.keys(buttons).forEach(color => buttons[color].classList.add(color));
  });

  it('reset should set current to zero', () => {
    state.current = 1;
    resetTimer(state);
    expect(state.current).toBe(0);
  });

  it('increment should increment current by 1', () => {
    increment(state);
    expect(state.current).toBe(1);
  });

  it('increment should increment current by given amount', () => {
    increment(state, 2);
    expect(state.current).toBe(2);
  });

  it('decrement should decrement current by 1', () => {
    state.current = 1;
    decrement(state);
    expect(state.current).toBe(0);
  });

  it('decrement should decrement current by given amount', () => {
    state.current = 2;
    decrement(state, 2);
    expect(state.current).toBe(0);
  });

  it('tick should reset if current step is impossibly low', () => {
    state.current = -1;
    tick(state, simon, sounds, buttons);

    expect(state.current).toBe(0);
  });

  it('tick should reset if current step is impossibly high', () => {
    state.current = 20;
    tick(state, simon, sounds, buttons);

    expect(state.current).toBe(0);
  });

  it('cycle: start should increment and show all buttons', () => {
    const calls = [['red'], ['yellow'], ['blue'], ['green']];
    const { next, round, action } = tick(state, simon, sounds, buttons);
    action();

    expect(next).toBe(true);
    expect(round).toBe(delay['start']);
    expect(state.current).toBe(1);
    expect(sounds.play.mock.calls).toEqual(calls);
  });

  it('cycle: end-start should increment and hide all buttons', () => {
    const calls = [['red'], ['yellow'], ['blue'], ['green']];
    state.current = 1;

    const { next, round, action } = tick(state, simon, sounds, buttons);
    action();

    expect(next).toBe(true);
    expect(round).toBe(delay['end-start']);
    expect(state.current).toBe(2);
    expect(sounds.pause.mock.calls).toEqual(calls);
  });

  it('cycle: show-sequence should increment', () => {
    state.current = 2;

    const { next, round, action } = tick(state, simon, sounds, buttons);
    action();

    expect(next).toBe(true);
    expect(round).toBe(delay['show-sequence']);
    expect(state.current).toBe(3);
  });

  it('cycle: show-step-pause should increment', () => {
    state.current = 3;

    const { next, round, action } = tick(state, simon, sounds, buttons);
    action();

    expect(next).toBe(true);
    expect(round).toBe(delay['show-step-pause']);
    expect(state.current).toBe(4);
  });

  it('cycle: show-step should increment and show specified color', () => {
    simon.round = ['blue'];
    const calls = [['blue']];
    state.current = 4;

    const { next, round, action } = tick(state, simon, sounds, buttons);
    action();

    expect(next).toBe(true);
    expect(round).toBe(delay['show-step']);
    expect(state.current).toBe(5);
    expect(sounds.play.mock.calls).toEqual(calls);
  });

  it('cycle: hide-step should hide color, queue next color, and increment if sequence is over', () => {
    simon.round = ['blue'];
    const calls = [['blue']];
    state.current = 5;
    //$FlowIgnore
    Simon.showSequenceOver = Simon.showSequenceOver.mockImplementationOnce(
      () => true,
    );

    const { next, round, action } = tick(state, simon, sounds, buttons);
    action();

    expect(next).toBe(true);
    expect(round).toBe(delay['hide-step']);
    expect(state.current).toBe(6);
    expect(sounds.pause.mock.calls).toEqual(calls);
  });

  it('cycle: hide-step should hide color, queue next color, and decrement if sequence is over', () => {
    simon.round = ['blue'];
    const calls = [['blue']];
    state.current = 5;
    //$FlowIgnore
    simon.showSequenceOver = jest.fn(() => false);

    const { next, round, action } = tick(state, simon, sounds, buttons);
    action();

    expect(next).toBe(true);
    expect(round).toBe(delay['hide-step']);
    expect(state.current).toBe(3);
    expect(sounds.pause.mock.calls).toEqual(calls);
  });

  it('cycle: hide-sequence should increment', () => {
    state.current = 6;

    const { next, round, action } = tick(state, simon, sounds, buttons);
    action();

    expect(next).toBe(true);
    expect(round).toBe(delay['hide-sequence']);
    expect(state.current).toBe(7);
  });

  it('cycle: start-input should increment and set simon input to true', () => {
    state.current = 7;
    //$FlowIgnore
    simon.round = ['red'];

    const { next, round, action } = tick(state, simon, sounds, buttons);
    action();

    expect(next).toBe(true);
    expect(round).toBe(simon.round.length * 2.5 * 1000);
    expect(state.current).toBe(8);
    expect(simon.input).toBe(true);
  });

  it('cycle: end-input should set simon input to false and jump to successful-round if player has won round or game', () => {
    state.current = 8;
    //$FlowIgnore
    Simon.hasWonRound = Simon.hasWonRound.mockImplementationOnce(() => true);
    //$FlowIgnore
    Simon.hasWonGame = Simon.hasWonGame.mockImplementationOnce(() => false);

    const { next, round, action } = tick(state, simon, sounds, buttons);
    action();

    expect(next).toBe(true);
    expect(round).toBe(delay['end-input']);
    expect(state.current).toBe(10);
    expect(simon.input).toBe(false);
  });

  it('cycle: end-input should set simon input to false and increment to failed-round if player has failed round or game', () => {
    state.current = 8;
    //$FlowIgnore
    Simon.hasWonRound = Simon.hasWonRound.mockImplementationOnce(() => false);
    //$FlowIgnore
    Simon.hasWonGame = Simon.hasWonGame.mockImplementationOnce(() => false);

    const { next, round, action } = tick(state, simon, sounds, buttons);
    action();

    expect(next).toBe(true);
    expect(round).toBe(delay['end-input']);
    expect(state.current).toBe(9);
    expect(simon.input).toBe(false);
  });

  it('cycle: failed-round should start failed animation and jump to end', () => {
    const calls = [['lost'], ['red'], ['yellow'], ['blue'], ['green']];
    state.current = 9;

    const { next, round, action } = tick(state, simon, sounds, buttons);
    action();

    expect(next).toBe(true);
    expect(round).toBe(delay['failed-round']);
    expect(state.current).toBe(11);
    expect(sounds.play.mock.calls).toEqual(calls);
  });

  it('cycle: successful-round should start win animation and increment to end', () => {
    const calls = [['won'], ['red'], ['yellow'], ['blue'], ['green']];
    state.current = 10;

    const { next, round, action } = tick(state, simon, sounds, buttons);
    action();

    expect(next).toBe(true);
    expect(round).toBe(delay['failed-round']);
    expect(state.current).toBe(11);
    expect(sounds.play.mock.calls).toEqual(calls);
  });

  it('cycle: end should stop all animations and reset game and timer state', () => {
    const calls = [
      ['won'],
      ['red'],
      ['yellow'],
      ['blue'],
      ['green'],
      ['lost'],
      ['red'],
      ['yellow'],
      ['blue'],
      ['green'],
    ];

    state.current = 11;
    //$FlowIgnore
    Simon.resetSimon = Simon.resetSimon.mockImplementationOnce();

    const { next, round, action } = tick(state, simon, sounds, buttons);
    action();

    expect(next).toBe(true);
    expect(round).toBe(delay['end']);
    expect(state.current).toBe(0);
    expect(Simon.resetSimon).toHaveBeenCalled();
    expect(sounds.pause.mock.calls).toEqual(calls);
  });

  it('timer should return default action if stage is not recognized', () => {
    state.current = 12;

    const { next, round, action } = tick(state, simon, sounds, buttons);
    action();

    expect(next).toBe(false);
    expect(round).toBe(0);
  });
});
