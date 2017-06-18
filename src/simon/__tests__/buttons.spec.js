/* @flow */
import * as TimerHandlers from '../Handlers/TimerHandler';
import { Simon, Timer } from '../Models';
import type { ColorHandler } from '../Handlers';
import {
  powerHandler,
  strictHandler,
  scoreHandler,
  clickHandler,
} from '../Handlers';

jest.mock('../Handlers/TimerHandler', () => ({
  powerOn: jest.fn(),
  powerOff: jest.fn(),
  advance: jest.fn(),
  cancelTimer: jest.fn(),
}));

const color = 'red';
const ev = (({}: any): Event);

describe('Simon Handlers', () => {
  let simon: Simon;
  let buttons: ColorHandler;
  let timer: Timer;
  let update: () => {};

  beforeEach(() => {
    update = jest.fn();
    simon = new Simon();
    //$FlowIgnore
    simon.toggleState = jest.fn();
    //$FlowIgnore
    simon.reset = jest.fn();
    //$FlowIgnore
    simon.end = jest.fn();
    //$FlowIgnore
    simon.toggleStrict = jest.fn();
    //$FlowIgnore
    simon.setInput = jest.fn();
    //$FlowIgnore
    simon.move = jest.fn();
    //$FlowIgnore
    simon.setInput = jest.fn();

    buttons = (({}: any): ColorHandler);
    //$FlowIgnore
    buttons.showColor = jest.fn();
    //$FlowIgnore
    buttons.hideColor = jest.fn();
    //$FlowIgnore
    buttons.wonGame = jest.fn();
    //$FlowIgnore
    buttons.wonRound = jest.fn();
    //$FlowIgnore
    buttons.strictFail = jest.fn();
    //$FlowIgnore
    buttons.restartRound = jest.fn();

    timer = new Timer();
  });

  it("powerHandler should start game if simon doesn't have power", () => {
    //$FlowIgnore
    simon.hasPower = jest.fn(() => false);

    const spy = jest.spyOn(simon, 'getScore');
    const clock = { id: null };

    powerHandler(update, buttons, simon, timer, clock)(ev);

    expect(simon.toggleState).toHaveBeenCalled();
    expect(simon.hasPower).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
    expect(simon.reset).toHaveBeenCalled();
    expect(update).toHaveBeenCalled();
    expect(TimerHandlers.powerOn).toHaveBeenCalled();
  });

  it('powerHandler should end game if simon has power', () => {
    //$FlowIgnore
    simon.hasPower = jest.fn(() => true);

    const clock = { id: null };

    powerHandler(update, buttons, simon, timer, clock)(ev);

    expect(simon.toggleState).toHaveBeenCalled();
    expect(simon.hasPower).toHaveBeenCalled();
    expect(simon.end).toHaveBeenCalled();
    expect(update).toHaveBeenCalled();
    expect(TimerHandlers.powerOff).toHaveBeenCalled();
  });

  it('strictHandler should toggle simon strict mode', () => {
    //$FlowIgnore
    strictHandler(simon)();

    expect(simon.toggleStrict).toHaveBeenCalled();
  });

  it('scoreHandler should should set score in element textContent', () => {
    const elem = document.createElement('div');
    scoreHandler(elem)(1);

    expect(elem.textContent).toBe('1');
  });

  it('clickHandler should do nothing if player cannot move', () => {
    const clock = { id: null };

    //$FlowIgnore
    simon.playerCanMove = jest.fn(() => false);

    const click = clickHandler(color, buttons, update, simon, timer, clock)(ev);

    expect(click).toBe(false);
  });

  it('clickHandler should call setInput on correct move', () => {
    const clock = { id: null };
    //$FlowIgnore
    simon.playerCanMove = jest.fn(() => true);
    //$FlowIgnore
    simon.hasFailedRound = jest.fn(() => false);
    //$FlowIgnore
    simon.hasWonRound = jest.fn(() => false);
    //$FlowIgnore
    simon.hasWonGame = jest.fn(() => false);

    const click = clickHandler(color, buttons, update, simon, timer, clock)(ev);

    jest.runTimersToTime(1000);

    expect(simon.setInput).toHaveBeenCalledTimes(2);
  });

  it('clickHandler should end and restart game if player has won', () => {
    //$FlowIgnore
    simon.playerCanMove = jest.fn(() => true);
    //$FlowIgnore
    simon.hasFailedRound = jest.fn(() => false);
    //$FlowIgnore
    simon.hasWonRound = jest.fn(() => false);
    //$FlowIgnore
    simon.hasWonGame = jest.fn(() => true);

    const clock = { id: null };
    const click = clickHandler(color, buttons, update, simon, timer, clock)(ev);

    jest.runTimersToTime(1000);

    expect(buttons.wonGame).toHaveBeenCalled();
  });

  it('clickHandler should advance to next round if player has won current round', () => {
    const color = 'red';

    //$FlowIgnore
    simon.playerCanMove = jest.fn(() => true);
    //$FlowIgnore
    simon.move = jest.fn();
    //$FlowIgnore
    simon.setInput = jest.fn();
    //$FlowIgnore
    simon.hasFailedRound = jest.fn(() => false);
    //$FlowIgnore
    simon.hasWonRound = jest.fn(() => true);
    //$FlowIgnore
    simon.hasWonGame = jest.fn(() => false);

    const clock = { id: null };
    const click = clickHandler(color, buttons, update, simon, timer, clock)(ev);

    jest.runTimersToTime(1000);

    expect(TimerHandlers.cancelTimer).toHaveBeenCalled();
    expect(buttons.wonRound).toHaveBeenCalled();
  });

  it('clickHandler should restart if player has lost current round in strict mode', () => {
    const clock = { id: null };

    //$FlowIgnore
    simon.playerCanMove = jest.fn(() => true);
    //$FlowIgnore
    simon.isStrict = jest.fn(() => true);
    //$FlowIgnore
    simon.hasFailedRound = jest.fn(() => true);
    //$FlowIgnore
    simon.hasWonRound = jest.fn(() => false);
    //$FlowIgnore
    simon.hasWonGame = jest.fn(() => false);

    const click = clickHandler(color, buttons, update, simon, timer, clock)(ev);

    jest.runTimersToTime(1000);

    expect(TimerHandlers.cancelTimer).toHaveBeenCalled();
    expect(buttons.strictFail).toHaveBeenCalled();
  });

  it('clickHandler should restart restart round if player has lost in regular mode', () => {
    const clock = { id: null };
    //$FlowIgnore
    simon.playerCanMove = jest.fn(() => true);
    //$FlowIgnore
    simon.isStrict = jest.fn(() => false);
    //$FlowIgnore
    simon.hasFailedRound = jest.fn(() => true);
    //$FlowIgnore
    simon.hasWonRound = jest.fn(() => false);
    //$FlowIgnore
    simon.hasWonGame = jest.fn(() => false);

    const click = clickHandler(color, buttons, update, simon, timer, clock)(ev);

    jest.runTimersToTime(1000);

    expect(TimerHandlers.cancelTimer).toHaveBeenCalled();
    expect(buttons.restartRound).toHaveBeenCalled();
  });
});
