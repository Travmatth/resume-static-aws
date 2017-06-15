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
  .mockImplementationOnce(() => 1496006730973);

describe('Pomodoro Models', () => {
  let timer: Timer;
  let game: Game;
  let node: HTMLElement;

  beforeEach(() => {
    jest.clearAllMocks();
    timer = { work: scale(1), rest: scale(1) };
    game = { id: null, state: State.RUNNING, phase: Phase.work };
    node = document.createElement('div');
  });

  it('stopTimer should call clearInterval', () => {
    game.id = 1;
    stopTimer(game);
    expect(clearInterval).toHaveBeenCalled();
    expect(game.id).toEqual(undefined);
  });

  it('startTimer should measure elapsed time', () => {
    startTimer(node, Date.now(), timer, game);
    jest.runTimersToTime(100);
    expect(node.textContent).toBe('00:00.100');
  });

  it('startTimer should stop measuring elapsed time past the max', () => {
    startTimer(node, Date.now(), timer, game);
    jest.runTimersToTime(1005);
    expect(node.textContent).toBe('01:00.000');
  });
});
