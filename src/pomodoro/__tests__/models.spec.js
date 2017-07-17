/* @flow */

import { stopTimer, startTimer } from '../Models';

import { scale } from 'common/js/utils';
import { STATE, PHASE } from '../Models';
import type { Timer } from '../pomodoro.types';

let base = 1496006730873;
//$FlowIgnore
Date.now = jest.fn().mockImplementation(() => {
  base += 10;
  //console.log('calling now: ', base)
  return base;
});

let timer: Timer;
let game: Game;
let node: HTMLElement;
let circle: HTMLElement;
let startBtn: HTMLButtonElement;
let setFill: () => {};

describe('Pomodoro Models', () => {
  beforeEach(() => {
    setFill = jest.fn();
    timer = { WORK: scale(1), REST: scale(1) };
    node = document.createElement('div');
    circle = document.createElement('div');
    startBtn = document.createElement('button');
    game = {
      id: null,
      state: STATE.RUNNING,
      phase: PHASE.WORK,
      current: 0,
      last: false,
    };
  });

  afterEach(() => jest.clearAllMocks());

  it('should allow timer to be started, stopped and restarted', () => {
    game.last = Date.now();
    startTimer(node, startBtn, circle, timer, game, setFill);
    jest.runTimersToTime(30000);

    stopTimer(game, setFill);
    expect(node.textContent).toBe('00:30.000');
    startTimer(node, startBtn, circle, timer, game, setFill);

    jest.runTimersToTime(30000);
    expect(node.textContent).toBe('01:00.000');
    expect(startBtn.textContent).toBe('start');
    jest.clearAllTimers();
  });

  it('stopTimer should call clearInterval', () => {
    game.id = 1;
    stopTimer(game);
    expect(clearInterval).toHaveBeenCalled();
    expect(game.id).toEqual(undefined);
  });

  it('startTimer should measure elapsed time', () => {
    game.last = Date.now();
    startTimer(node, startBtn, circle, timer, game, setFill);
    jest.runTimersToTime(100);
    expect(node.textContent).toBe('00:00.100');
  });

  it('startTimer should call setFill with appropriate percentage', async () => {
    circle = {
      style: {
        backgroundImage: null,
      },
    };

    game.last = Date.now();
    startTimer(node, startBtn, circle, timer, game, setFill);
    jest.runTimersToTime(100);
    expect(setFill.mock.calls[0][0]).toBeCloseTo(0.03);
  });

  it("startTimer should set start button text to 'stop'", () => {
    game.last = Date.now();
    startTimer(node, startBtn, circle, timer, game, setFill);
    jest.runTimersToTime(10);
    expect(startBtn.textContent).toEqual('stop');
  });

  it('startTimer should stop measuring elapsed time past the max', () => {
    game.last = Date.now();
    startTimer(node, startBtn, circle, timer, game, setFill);
    jest.runTimersToTime(60000);
    expect(node.textContent).toBe('01:00.000');
  });
});
