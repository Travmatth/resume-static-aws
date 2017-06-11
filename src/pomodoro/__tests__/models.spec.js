/* @flow */

import { Pomodoro } from '../Models';

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
  let pomodoro: Pomodoro;

  beforeEach(() => (pomodoro = new Pomodoro(1, 1)));

  it('stepper should return function that can inc rest', () => {
    pomodoro.stepper('inc', 'rest')((({}: any): Event));
    expect(pomodoro.timer.rest).toBe(120000);
  });

  it('stepper should return function that can dec rest', () => {
    pomodoro.stepper('dec', 'rest')((({}: any): Event));
    expect(pomodoro.timer.rest).toBe(0);
  });

  it('stepper should return function that can inc work', () => {
    pomodoro.stepper('inc', 'work')((({}: any): Event));
    expect(pomodoro.timer.work).toBe(120000);
  });

  it('stepper should return function that can dec work', () => {
    pomodoro.stepper('dec', 'work')((({}: any): Event));
    expect(pomodoro.timer.work).toBe(0);
  });

  it('measure should return difference of number less an anchor', () => {
    expect(pomodoro.measure(1)(2)).toBe(1);
  });

  it('stopTimer should call clearInterval', () => {
    pomodoro.clock = 1;
    pomodoro.stopTimer();
    expect(clearInterval).toHaveBeenCalled();
  });

  it('startTimer should measure elapsed time', () => {
    const elem = document.createElement('div');
    pomodoro.startTimer(elem, Date.now());
    jest.runTimersToTime(100);
    expect(elem.textContent).toBe('00:00.100');
  });

  it('startTimer should stop measuring elapsed time past the max', () => {
    const elem = document.createElement('div');
    pomodoro.startTimer(elem, Date.now());
    jest.runTimersToTime(1005);
    expect(elem.textContent).toBe('01:00.000');
  });

  it('toggleDisplay should return function that can toogles startTimer', () => {
    //$FlowIgnore
    pomodoro.startTimer = jest.fn();
    //$FlowIgnore
    pomodoro.stopTimer = jest.fn();
    const toggle = pomodoro.toggle(document.createElement('div'));

    expect(pomodoro.state).toBe('STOPPED');
    toggle((({}: any): Event));
    expect(pomodoro.state).toBe('RUNNING');
    toggle((({}: any): Event));
    expect(pomodoro.state).toBe('STOPPED');
  });

  it('reset should set timer display to 0:0.00', () => {
    const elem = document.createElement('div');
    pomodoro.reset(elem)((({}: any): Event));
    expect(elem.textContent).toBe('0:0.00');
  });
});
