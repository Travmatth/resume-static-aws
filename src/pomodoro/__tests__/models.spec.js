/* @flow */

import { stopTimer, startTimer } from '../Models';

import { scale } from 'common/js/utils';
import { State, Phase } from '../Models';
import type { Timer } from '../pomodoro.types';

//$FlowIgnore
Date.now = jest
  .fn()
  .mockImplementationOnce(() => 1496006730873)
  .mockImplementationOnce(() => 1496006730883)
  .mockImplementationOnce(() => 1496006730893)
  .mockImplementationOnce(() => 1496006730903)
  .mockImplementationOnce(() => 1496006730913)
  .mockImplementationOnce(() => 1496006730923)
  .mockImplementationOnce(() => 1496006730933)
  .mockImplementationOnce(() => 1496006730943)
  .mockImplementationOnce(() => 1496006730953)
  .mockImplementationOnce(() => 1496006730963)
  .mockImplementationOnce(() => 1496006730973)
  .mockImplementationOnce(() => 1496006730983)
  .mockImplementationOnce(() => 1496006730993)
  .mockImplementationOnce(() => 1496006731003)
  .mockImplementationOnce(() => 1496006731013)
  .mockImplementationOnce(() => 1496006731023)
  .mockImplementationOnce(() => 1496006731033)
  .mockImplementationOnce(() => 1496006731043);

describe('Pomodoro Models', () => {
  let timer: Timer;
  let game: Game;
  let node: HTMLElement;
  let circle: HTMLElement;
  let startBtn: HTMLButtonElement;
  let setFill: () => {};

  beforeEach(() => {
    setFill = jest.fn();
    jest.clearAllMocks();
    timer = { work: scale(1), rest: scale(1) };
    game = { id: null, state: State.RUNNING, phase: Phase.work };
    node = document.createElement('div');
    circle = document.createElement('div');
    startBtn = document.createElement('button');
  });

  it('stopTimer should call clearInterval', () => {
    game.id = 1;
    stopTimer(game, setFill);
    expect(clearInterval).toHaveBeenCalled();
    expect(game.id).toEqual(undefined);
  });

  it('startTimer should measure elapsed time', () => {
    startTimer(node, startBtn, circle, Date.now(), timer, game, setFill);
    jest.runTimersToTime(100);
    expect(node.textContent).toBe('00:00.100');
  });

  it('startTimer should call setFill with appropriate percentage', async () => {
    circle = {
      style: {
        backgroundImage: null,
      },
    };

    startTimer(node, startBtn, circle, Date.now(), timer, game, setFill);
    jest.runTimersToTime(10);
    expect(setFill.mock.calls[0][0]).toBeCloseTo(0.03);
  });

  it("startTimer should set start button text to 'stop'", () => {
    startTimer(node, startBtn, circle, Date.now(), timer, game, setFill);
    jest.runTimersToTime(10);
    expect(startBtn.textContent).toEqual('stop');
  });

  it('startTimer should stop measuring elapsed time past the max', () => {
    startTimer(node, startBtn, circle, Date.now(), timer, game, setFill);
    jest.runTimersToTime(1005);
    expect(node.textContent).toBe('01:00.000');
  });
});
