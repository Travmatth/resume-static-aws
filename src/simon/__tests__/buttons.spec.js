/* @flow */
/* eslint-env jest */

import * as TimerHandlers from '../Handlers/TimerHandler';
import * as ColorHandlers from '../Handlers/ColorHandlers';
import type { SoundManager } from '../Models';
import type { TimerState, SimonState } from '../simon.types';
import { timerState } from '../Models/Timer';
import * as Simon from '../Models';
import {
  powerHandler,
  strictHandler,
  scoreHandler,
  clickHandler,
  startHandler,
} from '../Handlers';

jest.mock('../Models', () => ({
  ...require.requireActual('../Models'),
  resetSimon: jest.fn(),
  toggleState: jest.fn(),
  setInput: jest.fn(),
  recordPlayerAttempt: jest.fn(),
  hasFailedRound: jest.fn(),
  hasWonRound: jest.fn(),
  hasWonGame: jest.fn(),
  toggleStrict: jest.fn(),
}));

jest.mock('../Handlers/TimerHandler', () => ({
  powerOn: jest.fn(),
  powerOff: jest.fn(),
  advance: jest.fn(),
  cancelTimer: jest.fn(),
}));

jest.mock('../Handlers/ColorHandlers', () => ({
  showColor: jest.fn(),
  hideColor: jest.fn(),
}));

class Sounds {}
const color = 'red';

describe('Simon Handlers', () => {
  let simon: SimonState;
  let buttons: ColorButtons;
  let timer: TimerState;
  let update: () => {};
  let sounds: SoundManager;
  let clock: { id: ?number };
  let ev: Event;

  beforeEach(() => {
    simon = Simon.simonState();
    clock = { id: null };
    update = jest.fn();
    timer = timerState();
    ev = (({
      target: document.createElement('div'),
    }: any): Event);
    ev.target.classList.add('is-off');

    buttons = {
      red: document.createElement('button'),
      yellow: document.createElement('button'),
      green: document.createElement('button'),
      blue: document.createElement('button'),
    };

    Object.keys(buttons).forEach(color => buttons[color].classList.add(color));

    sounds = ((new Sounds(): any): SoundManager);
    //$FlowIgnore
    sounds.play = jest.fn();
    //$FlowIgnore
    sounds.pause = jest.fn();

    jest.clearAllMocks();
  });

  it("powerHandler should start game if simon doesn't have power", () => {
    powerHandler(simon, update, clock)(ev);

    expect(Simon.resetSimon).toHaveBeenCalled();
    expect(update).toHaveBeenCalled();

    expect(Simon.toggleState).toHaveBeenCalled();
    expect(ev.target.contains('is-off')).toBe(false);
  });

  it('powerHandler should end game if simon has power', () => {
    simon.power = true;

    powerHandler(simon, update, clock)(ev);

    expect(update).toHaveBeenCalled();
    expect(TimerHandlers.powerOff).toHaveBeenCalled();
    expect(Simon.toggleState).toHaveBeenCalled();
    expect(ev.target.contains('is-off')).toBe(false);
  });

  it('strictHandler should toggle simon strict mode', () => {
    strictHandler(simon)();

    expect(Simon.toggleStrict).toHaveBeenCalled();
  });

  it('scoreHandler should should set score in element textContent', () => {
    const elem = document.createElement('div');
    scoreHandler(elem)(1);

    expect(elem.textContent).toBe('1');
  });

  it('clickHandler should do nothing if player cannot move', () => {
    Simon.input = false;

    clickHandler(color, buttons, update, simon, timer, clock, sounds)(ev);

    expect(Simon.setInput).not.toHaveBeenCalled();
  });

  it('clickHandler should call setInput on correct move', () => {
    simon.input = true;
    Simon.hasFailedRound = Simon.hasFailedRound.mockImplementationOnce(
      () => false,
    );
    Simon.hasWonRound = Simon.hasWonRound.mockImplementationOnce(() => false);
    Simon.hasWonGame = Simon.hasWonGame.mockImplementationOnce(() => false);

    clickHandler(color, buttons, update, simon, timer, clock, sounds)(ev);

    jest.runTimersToTime(1000);

    expect(Simon.setInput).toHaveBeenCalledTimes(2);
  });

  it('clickHandler should manage player move', () => {
    //$FlowIgnore
    simon.input = true;
    clickHandler(color, buttons, update, simon, timer, clock, sounds)(ev);

    expect(Simon.setInput).toHaveBeenCalledTimes(1);
    expect(ColorHandlers.showColor).toHaveBeenCalled();
    expect(Simon.recordPlayerAttempt).toHaveBeenCalled();

    jest.runTimersToTime(1000);

    expect(ColorHandlers.hideColor).toHaveBeenCalled();
    expect(update).toHaveBeenCalled();
    expect(Simon.setInput).toHaveBeenCalledTimes(2);
  });

  it('startHandler should call powerOn if simon has power', () => {
    simon.power = true;
    startHandler(update, buttons, simon, timer, clock, sounds)();
    expect(TimerHandlers.powerOn).toHaveBeenCalled();
  });

  it('startHandler should not call powerOn if simon has no  power', () => {
    startHandler(update, buttons, simon, timer, clock, sounds)();
    expect(TimerHandlers.powerOn).not.toHaveBeenCalled();
  });
});
