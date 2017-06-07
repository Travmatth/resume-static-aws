/* @flow */
import { Timer, Simon } from '../Models';
import { delay } from '../Models';

class MockButtons {}

describe('Simon Game Timer Model', () => {
  let timer: Timer;
  let simon: Simon;
  let buttons: ColorHandler;

  beforeEach(() => {
    timer = new Timer();
    simon = new Simon();
    buttons = new MockButtons();
  });

  it('reset should set current to zero', () => {
    timer.current = 1;
    timer.reset();
    expect(timer.current).toBe(0);
  });

  it('increment should increment current by 1', () => {
    timer.increment();
    expect(timer.current).toBe(1);
  });

  it('increment should increment current by given amount', () => {
    timer.increment(2);
    expect(timer.current).toBe(2);
  });

  it('decrement should decrement current by 1', () => {
    timer.current = 1;
    timer.decrement();
    expect(timer.current).toBe(0);
  });

  it('decrement should decrement current by given amount', () => {
    timer.current = 2;
    timer.decrement(2);
    expect(timer.current).toBe(0);
  });

  it('tick should reset if current step is impossibly low', () => {
    const spy = jest.spyOn(timer, 'reset');
    timer.current = -1;
    timer.tick(simon, buttons);

    expect(spy).toHaveBeenCalled();
  });

  it('tick should reset if current step is impossibly high', () => {
    const spy = jest.spyOn(timer, 'reset');
    timer.current = 20;
    timer.tick(simon, buttons);

    expect(spy).toHaveBeenCalled();
  });

  it('cycle: start should increment and show all buttons', () => {
    buttons.showAll = jest.fn();

    const { next, round, action } = timer.tick(simon, buttons);
    action();

    expect(next).toBe(true);
    expect(round).toBe(delay['start']);
    expect(timer.current).toBe(1);
    expect(buttons.showAll).toHaveBeenCalled();
  });

  it('cycle: end-start should increment and hide all buttons', () => {
    timer.current = 1;
    buttons.hideAll = jest.fn();

    const { next, round, action } = timer.tick(simon, buttons);
    action();

    expect(next).toBe(true);
    expect(round).toBe(delay['end-start']);
    expect(timer.current).toBe(2);
    expect(buttons.hideAll).toHaveBeenCalled();
  });

  it('cycle: show-sequence should increment', () => {
    timer.current = 2;

    const { next, round, action } = timer.tick(simon, buttons);
    action();

    expect(next).toBe(true);
    expect(round).toBe(delay['show-sequence']);
    expect(timer.current).toBe(3);
  });

  it('cycle: show-step-pause should increment', () => {
    timer.current = 3;

    const { next, round, action } = timer.tick(simon, buttons);
    action();

    expect(next).toBe(true);
    expect(round).toBe(delay['show-step-pause']);
    expect(timer.current).toBe(4);
  });

  it('cycle: show-step should increment and show specified color', () => {
    timer.current = 4;
    buttons.showColor = jest.fn();

    const { next, round, action } = timer.tick(simon, buttons);
    action();

    expect(next).toBe(true);
    expect(round).toBe(delay['show-step']);
    expect(timer.current).toBe(5);
    expect(buttons.showColor).toHaveBeenCalled();
  });

  it('cycle: hide-step should hide color, queue next color, and increment if sequence is over', () => {
    timer.current = 5;
    buttons.hideColor = jest.fn();
    simon.showSequenceOver = jest.fn(() => true);

    const { next, round, action } = timer.tick(simon, buttons);
    action();

    expect(next).toBe(true);
    expect(round).toBe(delay['hide-step']);
    expect(timer.current).toBe(6);
    expect(buttons.hideColor).toHaveBeenCalled();
  });

  it('cycle: hide-step should hide color, queue next color, and decrement if sequence is over', () => {
    timer.current = 5;
    buttons.hideColor = jest.fn();
    simon.showSequenceOver = jest.fn(() => false);

    const { next, round, action } = timer.tick(simon, buttons);
    action();

    expect(next).toBe(true);
    expect(round).toBe(delay['hide-step']);
    expect(timer.current).toBe(3);
    expect(buttons.hideColor).toHaveBeenCalled();
  });

  it('cycle: hide-sequence should increment', () => {
    timer.current = 6;

    const { next, round, action } = timer.tick(simon, buttons);
    action();

    expect(next).toBe(true);
    expect(round).toBe(delay['hide-sequence']);
    expect(timer.current).toBe(7);
  });

  it('cycle: start-input should increment and set simon input to true', () => {
    timer.current = 7;
    simon.setInput = jest.fn();
    simon.round = ['red'];

    const { next, round, action } = timer.tick(simon, buttons);
    action();

    expect(next).toBe(true);
    expect(round).toBe(simon.round.length * 2.5 * 1000);
    expect(timer.current).toBe(8);
    expect(simon.setInput).toHaveBeenCalledWith(true);
  });

  it('cycle: end-input should set simon input to false and jump to successful-round if player has won round or game', () => {
    timer.current = 8;
    simon.setInput = jest.fn();
    simon.hasWonRound = jest.fn(() => true);
    simon.hasWonGame = jest.fn(() => false);

    const { next, round, action } = timer.tick(simon, buttons);
    action();

    expect(next).toBe(true);
    expect(round).toBe(delay['end-input']);
    expect(timer.current).toBe(10);
    expect(simon.setInput).toHaveBeenCalledWith(false);
  });

  it('cycle: end-input should set simon input to false and increment to failed-round if player has failed round or game', () => {
    timer.current = 8;
    simon.setInput = jest.fn();
    simon.hasWonRound = jest.fn(() => false);
    simon.hasWonGame = jest.fn(() => false);

    const { next, round, action } = timer.tick(simon, buttons);
    action();

    expect(next).toBe(true);
    expect(round).toBe(delay['end-input']);
    expect(timer.current).toBe(9);
    expect(simon.setInput).toHaveBeenCalledWith(false);
  });

  it('cycle: failed-round should start failed animation and jump to end', () => {
    timer.current = 9;
    buttons.failStart = jest.fn();

    const { next, round, action } = timer.tick(simon, buttons);
    action();

    expect(next).toBe(true);
    expect(round).toBe(delay['failed-round']);
    expect(timer.current).toBe(11);
    expect(buttons.failStart).toHaveBeenCalled();
  });

  it('cycle: successful-round should start win animation and increment to end', () => {
    timer.current = 10;
    buttons.wonStart = jest.fn();

    const { next, round, action } = timer.tick(simon, buttons);
    action();

    expect(next).toBe(true);
    expect(round).toBe(delay['failed-round']);
    expect(timer.current).toBe(11);
    expect(buttons.wonStart).toHaveBeenCalled();
  });

  it('cycle: end should stop all animations and reset game and timer state', () => {
    timer.current = 11;
    const spy = jest.spyOn(timer, 'reset');
    simon.reset = jest.fn();
    buttons.wonEnd = jest.fn();
    buttons.failEnd = jest.fn();

    const { next, round, action } = timer.tick(simon, buttons);
    action();

    expect(next).toBe(true);
    expect(round).toBe(delay['end']);
    expect(timer.current).toBe(0);
    expect(spy).toHaveBeenCalled();
    expect(buttons.wonEnd).toHaveBeenCalled();
    expect(buttons.failEnd).toHaveBeenCalled();
    expect(simon.reset).toHaveBeenCalled();
  });

  it('timer should return default action if stage is not recognized', () => {
    timer.current = 12;

    const { next, round, action } = timer.tick(simon, buttons);
    action();

    expect(next).toBe(false);
    expect(round).toBe(0);
  });
});
