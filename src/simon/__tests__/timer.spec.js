/* @flow */
/* eslint-env jest */

import * as Models from '../Models';
import type { TimerState, ColorButtons } from '../simon.types';
import { cancelTimer, advance, powerOn, powerOff, fire } from '../Handlers';

class Sounds {}

describe('Simon Game Timer', () => {
  let timer: TimerState;
  let sounds: SoundManager;
  let buttons: ColorButtons;

  beforeEach(() => {
    timer = Models.timerState();
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

  it('cancelTimer should call clearTimeout', () => {
    cancelTimer({ id: 1 });
    expect(clearTimeout).toHaveBeenCalled();
  });

  it('powerOff should call cancelTimer', () => {
    powerOff({ id: 1 });
    expect(clearTimeout).toHaveBeenCalled();
  });

  it('powerOn should call advance', () => {
    let limit = 4;
    const action = jest.fn(() => limit -= 1);
    const simon = new Models.simonState();
    const clock = { id: null };

    Models.tick = jest.fn(() => ({
      next: limit === 0 ? false : true,
      round: 0,
      action,
    }));

    powerOn(simon, buttons, timer, action, clock, sounds);
    jest.runAllTimers();
    expect(Models.tick).toHaveBeenCalledTimes(5);
  });

  it('fire should execute action and set timeout for next', () => {
    let limit = 5;
    const roundLength = 1;
    const action = jest.fn(() => limit -= 1);
    const simon = new Models.simonState();
    const clock = { id: null };

    Models.tick = jest.fn(() => ({
      next: limit === 0 ? false : true,
      round: 0,
      action,
    }));

    fire(roundLength, buttons, action, timer, simon, clock);
    jest.runAllTimers();
    expect(action).toHaveBeenCalledTimes(5);
  });

  it('advance should call fire', () => {
    let limit = 5;
    const action = jest.fn(() => limit -= 1);
    const simon = new Models.simonState();
    const clock = { id: null };

    Models.tick = jest.fn(() => ({
      next: limit === 0 ? false : true,
      round: 0,
      action,
    }));

    advance(simon, buttons, action, timer, clock);
    jest.runAllTimers();
    expect(action).toHaveBeenCalledTimes(5);
  });
});
