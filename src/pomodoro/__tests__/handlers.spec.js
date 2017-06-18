/* @flow */

import {
  setFill,
  stepperHandler,
  stopTimer,
  startTimer,
  toggleHandler,
  resetHandler,
} from '../Handlers';
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

describe('Pomodoro Handlers', () => {
  let timer: Timer;
  let game: Game;
  let node: HTMLElement;
  let timerBtn: HTMLButtonElement;

  beforeEach(() => {
    jest.clearAllMocks();
    timer = { work: scale(1), rest: scale(1) };
    game = { id: null, state: State.RUNNING, phase: Phase.work };
    node = document.createElement('div');
    timerBtn = document.createElement('button');
  });

  it('stepperHandler should return function that can increment rest', () => {
    const step = stepperHandler(node, 'inc', Phase.rest, timer);
    step((({}: any): Event));
    expect(timer.rest).toBe(120000);
  });

  it('stepperHandler should return function that can decrement rest', () => {
    stepperHandler(node, 'inc', Phase.work, timer)((({}: any): Event));
    stepperHandler(node, 'dec', Phase.rest, timer)((({}: any): Event));
    expect(timer.rest).toBe(0);
  });

  it('stepperHandler should return function that can increment work', () => {
    stepperHandler(node, 'inc', Phase.work, timer)((({}: any): Event));
    expect(timer.work).toBe(120000);
  });

  it('stepperHandler should return function that can decrement work', () => {
    stepperHandler(node, 'dec', Phase.work, timer)((({}: any): Event));
    expect(timer.work).toBe(0);
  });

  it('stepperHandler should return function that can decrement work without going negavtive', () => {
    stepperHandler(node, 'dec', Phase.work, timer)((({}: any): Event));
    stepperHandler(node, 'dec', Phase.work, timer)((({}: any): Event));
    expect(timer.work).toBe(0);
  });

  it('returned stepperHandler function can increment HTMLElement counter', () => {
    stepperHandler(node, 'inc', Phase.work, timer)((({}: any): Event));
    expect(node.textContent).toBe(`${2}`);
  });

  it('returned stepperHandler function can decrement HTMLElement counter', () => {
    stepperHandler(node, 'dec', Phase.work, timer)((({}: any): Event));
    expect(node.textContent).toBe(`${0}`);
  });

  it("setFill should set given node's backgroundImage to appropriate fill level", () => {
    const inlineStyle = 'linear-gradient(0deg, black 10%, transparent 0%)';
    const node = {
      style: {
        backgroundImage: null,
      },
    };

    setFill(node)(10);

    expect(node.style.backgroundImage).toBe(inlineStyle);
  });

  it('toggleHandler should return function that can toggle startTimer', () => {
    const circle = document.createElement('div');
    const startBtn = document.createElement('button');
    startBtn.textContent = 'start';

    const start = jest.fn();
    const stop = jest.fn();

    const toggle = toggleHandler(
      node,
      circle,
      startBtn,
      timer,
      game,
      start,
      stop,
    );

    expect(game.state).toBe('RUNNING');

    toggle((({}: any): Event));
    expect(game.state).toBe('STOPPED');
    expect(stop).toHaveBeenCalled();

    toggle((({}: any): Event));
    expect(start).toHaveBeenCalled();
    expect(game.state).toBe('RUNNING');
  });

  it('reset should set timer display to 0:0.00', () => {
    resetHandler(node, timerBtn, jest.fn(), game)((({}: any): Event));
    expect(node.textContent).toBe('0:0.00');
  });

  it('reset should set timer fill to 0', () => {
    const set = jest.fn();
    resetHandler(node, timerBtn, set, game)((({}: any): Event));
    expect(set.mock.calls[0][0]).toBe(0);
  });

  it('reset should flip start button text when needed', () => {
    timerBtn.textContent = 'stop';
    resetHandler(node, timerBtn, () => {}, game)((({}: any): Event));
    expect(timerBtn.textContent).toBe('start');
  });
});
