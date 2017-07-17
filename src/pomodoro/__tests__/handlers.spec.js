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
import { STATE, PHASE } from '../Models';
import type { Timer } from '../pomodoro.types';

let base = 1496006730873;
//$FlowIgnore
Date.now = jest.fn().mockImplementation(() => {
  base += 10;
  return base;
});

let timer: Timer;
let game: Game;
let node: HTMLElement;
let timerBtn: HTMLButtonElement;

describe('Pomodoro Handlers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    timer = { WORK: scale(1), REST: scale(1) };
    game = { id: null, state: STATE.RUNNING, phase: PHASE.WORK };
    node = document.createElement('div');
    timerBtn = document.createElement('button');
  });

  it('stepperHandler should return function that can increment rest', () => {
    const step = stepperHandler(node, 'inc', PHASE.REST, timer);
    step((({}: any): Event));
    expect(timer.REST).toBe(120000);
  });

  it('stepperHandler should return function that can decrement rest', () => {
    stepperHandler(node, 'inc', PHASE.WORK, timer)((({}: any): Event));
    stepperHandler(node, 'dec', PHASE.REST, timer)((({}: any): Event));
    expect(timer.REST).toBe(0);
  });

  it('stepperHandler should return function that can increment work', () => {
    stepperHandler(node, 'inc', PHASE.WORK, timer)((({}: any): Event));
    expect(timer.WORK).toBe(120000);
  });

  it('stepperHandler should return function that can decrement work', () => {
    stepperHandler(node, 'dec', PHASE.WORK, timer)((({}: any): Event));
    expect(timer.WORK).toBe(0);
  });

  it('stepperHandler should return function that can decrement work without going negative', () => {
    const stepper = stepperHandler(node, 'dec', PHASE.WORK, timer);
    stepper((({}: any): Event));
    stepper((({}: any): Event));

    expect(timer.WORK).toBe(0);
  });

  it('returned stepperHandler function can increment HTMLElement counter', () => {
    stepperHandler(node, 'inc', PHASE.WORK, timer)((({}: any): Event));
    expect(node.textContent).toBe(`${2}`);
  });

  it('returned stepperHandler function can decrement HTMLElement counter', () => {
    stepperHandler(node, 'dec', PHASE.WORK, timer)((({}: any): Event));
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
