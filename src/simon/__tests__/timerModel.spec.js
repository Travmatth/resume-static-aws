/* @flow */
/* eslint-env jest */

import '../Models';
import type { ColorHandler } from '../Handlers';
import type { SoundManager } from '../Models';
import type { TimerState, SimonState } from '../simon.types';
import {
  timerState,
  resetTimer,
  incrementGamePlayState,
  decrementGamePlayState,
  tick,
} from '../Models/Timer';
import { delay } from '../Models/GameCycle';
import * as Simon from '../Models/Simon';
import * as ColorHandlers from '../Handlers/ColorHandlers';

jest.mock('../Handlers/ColorHandlers', () => ({
  ...require.requireActual('../Handlers/ColorHandlers'),
  showAll: jest.fn(),
}));

jest.mock('../Models/Simon', () => ({
  ...require.requireActual('../Models/Simon'),
  showSequenceOver: jest.fn(),
  hasWonRound: jest.fn(),
  hasWonGame: jest.fn(),
  resetSimon: jest.fn(),
  nextRound: jest.fn(),
  resetAttemptStep: jest.fn(),
  hasFailedRound: jest.fn(),
  isStrict: jest.fn(),
  restartRound: jest.fn(),
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

  it('incrementGamePlayState should increment current by 1', () => {
    incrementGamePlayState(state);
    expect(state.current).toBe(1);
  });

  it('incrementGamePlayState should increment current by given amount', () => {
    incrementGamePlayState(state, 2);
    expect(state.current).toBe(2);
  });

  it('decrementGamePlayState should decrement current by 1', () => {
    state.current = 1;
    decrementGamePlayState(state);
    expect(state.current).toBe(0);
  });

  it('decrementGamePlayState should decrement current by given amount', () => {
    state.current = 2;
    decrementGamePlayState(state, 2);
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

  it('cycle: start should increment', () => {
    const { next, round, action } = tick(state, simon, sounds, buttons);
    action();

    expect(next).toBe(true);
    expect(round).toBe(delay['start']);
    expect(state.current).toBe(1);
  });

  it('cycle: end-start should increment and hide all buttons', () => {
    state.current = 1;

    const { next, round, action } = tick(state, simon, sounds, buttons);
    action();

    expect(next).toBe(true);
    expect(round).toBe(delay['end-start']);
    expect(state.current).toBe(2);
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
    expect(round).toBe(simon.round.length * 3 * 1000);
    expect(state.current).toBe(8);
    expect(simon.input).toBe(true);
  });

  it('cycle: end-input should when round is won', () => {
    state.current = 8;
    //$FlowIgnore
    Simon.hasWonRound = Simon.hasWonRound.mockImplementationOnce(() => true);
    //$FlowIgnore
    Simon.hasWonGame = Simon.hasWonGame.mockImplementationOnce(() => false);

    const { next, round, action } = tick(state, simon, sounds, buttons);
    action();

    expect(next).toBe(true);
    expect(round).toBe(delay['end-input']);
    expect(Simon.nextRound).toHaveBeenCalled();
    expect(Simon.resetAttemptStep).toHaveBeenCalled();
  });

  it('cycle: end-input should when round is won and game is over', () => {
    state.current = 8;
    //$FlowIgnore
    Simon.hasWonRound = Simon.hasWonRound.mockImplementationOnce(() => true);
    //$FlowIgnore
    Simon.hasWonGame = Simon.hasWonGame.mockImplementationOnce(() => true);

    const { next, round, action } = tick(state, simon, sounds, buttons);
    action();

    expect(next).toBe(true);
    expect(round).toBe(delay['end-input']);
    expect(Simon.resetAttemptStep).toHaveBeenCalled();
    expect(Simon.resetSimon).toHaveBeenCalled();
    expect(ColorHandlers.showAll).toHaveBeenCalled();
  });

  it('cycle: end-input should when round is lost', () => {
    state.current = 8;
    //$FlowIgnore
    Simon.hasWonRound = Simon.hasWonRound.mockImplementationOnce(() => false);
    //$FlowIgnore
    Simon.hasFailedRound = Simon.hasFailedRound.mockImplementationOnce(
      () => true,
    );
    Simon.isStrict = Simon.isStrict.mockImplementationOnce(() => false);

    const { next, round, action } = tick(state, simon, sounds, buttons);
    action();

    expect(next).toBe(true);
    expect(round).toBe(delay['end-input']);
    expect(Simon.restartRound).toHaveBeenCalled();
  });

  it('cycle: end-input should when round is lost and game is strict', () => {
    state.current = 8;
    //$FlowIgnore
    Simon.hasWonRound = Simon.hasWonRound.mockImplementationOnce(() => false);
    //$FlowIgnore
    Simon.hasFailedRound = Simon.hasFailedRound.mockImplementationOnce(
      () => true,
    );
    Simon.isStrict = Simon.isStrict.mockImplementationOnce(() => true);

    const { next, round, action } = tick(state, simon, sounds, buttons);
    action();

    expect(next).toBe(true);
    expect(round).toBe(delay['end-input']);
    expect(Simon.resetSimon).toHaveBeenCalled();
    expect(sounds.play).toHaveBeenCalled();
  });

  it('cycle: end-input should when round is normal', () => {
    state.current = 8;
    //$FlowIgnore
    Simon.hasWonRound = Simon.hasWonRound.mockImplementationOnce(() => false);
    //$FlowIgnore
    Simon.hasFailedRound = Simon.hasFailedRound.mockImplementationOnce(
      () => false,
    );

    const { next, round, action } = tick(state, simon, sounds, buttons);
    action();

    expect(next).toBe(true);
    expect(round).toBe(delay['end-input']);
    expect(Simon.nextRound).toHaveBeenCalled();
  });

  it('cycle: failed-round should start failed animation and jump to end', () => {
    state.current = 9;

    const { next, round, action } = tick(state, simon, sounds, buttons);
    action();

    expect(next).toBe(true);
    expect(round).toBe(delay['failed-round']);
    expect(state.current).toBe(11);
  });

  it('cycle: successful-round should start win animation and increment to end', () => {
    state.current = 10;

    const { next, round, action } = tick(state, simon, sounds, buttons);
    action();

    expect(next).toBe(true);
    expect(round).toBe(delay['failed-round']);
    expect(state.current).toBe(11);
  });

  it('cycle: end should stop all animations and reset game and timer state', () => {
    state.current = 11;
    //$FlowIgnore
    Simon.resetSimon = Simon.resetSimon.mockImplementationOnce();

    const { next, round, action } = tick(state, simon, sounds, buttons);
    action();

    expect(next).toBe(true);
    expect(round).toBe(delay['end']);
    expect(state.current).toBe(0);
    expect(Simon.resetSimon).toHaveBeenCalled();
  });

  it('timer should return default action if stage is not recognized', () => {
    state.current = 12;

    const { next, round, action } = tick(state, simon, sounds, buttons);
    action();

    expect(next).toBe(false);
    expect(round).toBe(0);
  });
});
