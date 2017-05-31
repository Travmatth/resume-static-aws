/* @flow */

import { Simon } from '../Models';
import { cancelTimer, advance, powerOn, powerOff, fire } from '../Handlers';

describe('Simon Game Timer', () => {
  it('cancelTimer should call clearTimeout', () => {
    cancelTimer({ id: 1 });

    expect(clearTimeout).toHaveBeenCalled();
  });

  it('powerOff should call cancelTimer', () => {
    powerOff({ id: 1 });

    expect(clearTimeout).toHaveBeenCalled();
  });

  it('powerOn should call advance', () => {
    let limit = 5;
    const roundLength = 1;
    const buttons = {};
    const action = jest.fn(() => limit -= 1);
    const timer = {
      tick: () => ({
        next: limit === 0 ? false : true,
        round: 10,
        action,
        limit,
      }),
    };
    const simon = new Simon();
    const clock = { id: null };

    powerOn(simon, buttons, timer, action, clock);

    jest.runAllTimers();
    expect(action).toHaveBeenCalledTimes(5);
  });

  it('fire should execute action and set timeout for next', () => {
    let limit = 5;
    const roundLength = 1;
    const buttons = {};
    const action = jest.fn(() => limit -= 1);
    const timer = {
      tick: () => ({
        next: limit === 0 ? false : true,
        round: 10,
        action,
        limit,
      }),
    };
    const simon = new Simon();
    const clock = { id: null };

    fire(roundLength, buttons, action, timer, simon, clock);

    jest.runAllTimers();
    expect(action).toHaveBeenCalledTimes(5);
  });

  it('advance should call fire', () => {
    let limit = 5;
    const roundLength = 1;
    const buttons = {};
    const action = jest.fn(() => limit -= 1);
    const timer = {
      tick: () => ({
        next: limit === 0 ? false : true,
        round: 10,
        action,
        limit,
      }),
    };
    const simon = new Simon();
    const clock = { id: null };

    advance(simon, buttons, action, timer, clock);

    jest.runAllTimers();
    expect(action).toHaveBeenCalledTimes(5);
  });
});
