/* @flow */
import * as TimerHandlers from '../Handlers/TimerHandler';
import { Simon, Timer } from '../Models';
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

describe('Simon Handlers', () => {
  it("powerHandler should start game if simon doesn't have power", () => {
    const simon = new Simon();
    simon.toggleState = jest.fn();
    simon.hasPower = jest.fn(() => false);
    simon.reset = jest.fn();
    const spy = jest.spyOn(simon, 'getScore');
    const update = jest.fn();
    const buttons = {};
    const timer = new Timer();

    powerHandler(update, buttons, simon, timer)();

    expect(simon.toggleState).toHaveBeenCalled();
    expect(simon.hasPower).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
    expect(simon.reset).toHaveBeenCalled();
    expect(update).toHaveBeenCalled();
    expect(TimerHandlers.powerOn).toHaveBeenCalled();
  });

  it('powerHandler should end game if simon has power', () => {
    const simon = new Simon();
    simon.toggleState = jest.fn();
    simon.hasPower = jest.fn(() => true);
    simon.end = jest.fn();
    const update = jest.fn();
    const buttons = {};
    const timer = new Timer();

    powerHandler(update, buttons, simon, timer)();

    expect(simon.toggleState).toHaveBeenCalled();
    expect(simon.hasPower).toHaveBeenCalled();
    expect(simon.end).toHaveBeenCalled();
    expect(update).toHaveBeenCalled();
    expect(TimerHandlers.powerOff).toHaveBeenCalled();
  });

  it('strictHandler should toggle simon strict mode', () => {
    const simon = new Simon();
    simon.toggleStrict = jest.fn();
    strictHandler(simon)();

    expect(simon.toggleStrict).toHaveBeenCalled();
  });

  it('scoreHandler should should set score in element textContent', () => {
    const elem = document.createElement('div');
    scoreHandler(elem)(1);

    expect(elem.textContent).toBe('1');
  });

  it('clickHandler should do nothing if player cannot move', () => {
    const color = 'red';
    const buttons = {};
    const update = jest.fn();
    const simon = new Simon();
    simon.playerCanMove = jest.fn(() => false);
    simon.setInput = jest.fn();
    const timer = class {};

    const click = clickHandler(color, buttons, update, simon, timer)();

    expect(click).toBe(false);
  });

  it('clickHandler should call setInput on correct move', () => {
    const color = 'red';
    const buttons = {};
    buttons.showColor = jest.fn();
    buttons.hideColor = jest.fn();
    const update = jest.fn();
    const simon = new Simon();
    simon.playerCanMove = jest.fn(() => true);
    simon.move = jest.fn();
    simon.setInput = jest.fn();
    simon.hasFailedRound = jest.fn(() => false);
    simon.hasWonRound = jest.fn(() => false);
    simon.hasWonGame = jest.fn(() => false);
    const timer = class {};

    const click = clickHandler(color, buttons, update, simon, timer)();

    jest.runTimersToTime(1000);

    expect(simon.setInput).toHaveBeenCalledTimes(2);
  });

  it('clickHandler should end and restart game if player has won', () => {
    const color = 'red';
    const buttons = {};
    buttons.showColor = jest.fn();
    buttons.hideColor = jest.fn();
    buttons.wonGame = jest.fn();
    const update = jest.fn();
    const simon = new Simon();
    simon.playerCanMove = jest.fn(() => true);
    simon.move = jest.fn();
    simon.setInput = jest.fn();
    simon.hasFailedRound = jest.fn(() => false);
    simon.hasWonRound = jest.fn(() => false);
    simon.hasWonGame = jest.fn(() => true);
    const timer = class {};

    const click = clickHandler(color, buttons, update, simon, timer)();

    jest.runTimersToTime(1000);

    expect(buttons.wonGame).toHaveBeenCalled();
  });

  it('clickHandler should advance to next round if player has won current round', () => {
    const color = 'red';
    const buttons = {};
    buttons.showColor = jest.fn();
    buttons.hideColor = jest.fn();
    buttons.wonGame = jest.fn();
    buttons.wonRound = jest.fn();
    const update = jest.fn();
    const simon = new Simon();
    simon.playerCanMove = jest.fn(() => true);
    simon.move = jest.fn();
    simon.setInput = jest.fn();
    simon.hasFailedRound = jest.fn(() => false);
    simon.hasWonRound = jest.fn(() => true);
    simon.hasWonGame = jest.fn(() => false);
    const timer = class {};

    const click = clickHandler(color, buttons, update, simon, timer)();

    jest.runTimersToTime(1000);

    expect(TimerHandlers.cancelTimer).toHaveBeenCalled();
    expect(buttons.wonRound).toHaveBeenCalled();
  });

  it('clickHandler should restart if player has lost current round in strict mode', () => {
    const color = 'red';
    const buttons = {};
    buttons.showColor = jest.fn();
    buttons.hideColor = jest.fn();
    buttons.wonGame = jest.fn();
    buttons.wonRound = jest.fn();
    buttons.strictFail = jest.fn();
    const update = jest.fn();
    const simon = new Simon();
    simon.playerCanMove = jest.fn(() => true);
    simon.isStrict = jest.fn(() => true);
    simon.move = jest.fn();
    simon.setInput = jest.fn();
    simon.hasFailedRound = jest.fn(() => true);
    simon.hasWonRound = jest.fn(() => false);
    simon.hasWonGame = jest.fn(() => false);
    const timer = class {};

    const click = clickHandler(color, buttons, update, simon, timer)();

    jest.runTimersToTime(1000);

    expect(TimerHandlers.cancelTimer).toHaveBeenCalled();
    expect(buttons.strictFail).toHaveBeenCalled();
  });

  it('clickHandler should restart restart round if player has lost in regular mode', () => {
    const color = 'red';
    const buttons = {};
    buttons.showColor = jest.fn();
    buttons.hideColor = jest.fn();
    buttons.wonGame = jest.fn();
    buttons.wonRound = jest.fn();
    buttons.restartRound = jest.fn();
    const update = jest.fn();
    const simon = new Simon();
    simon.playerCanMove = jest.fn(() => true);
    simon.isStrict = jest.fn(() => false);
    simon.move = jest.fn();
    simon.setInput = jest.fn();
    simon.hasFailedRound = jest.fn(() => true);
    simon.hasWonRound = jest.fn(() => false);
    simon.hasWonGame = jest.fn(() => false);
    const timer = class {};

    const click = clickHandler(color, buttons, update, simon, timer)();

    jest.runTimersToTime(1000);

    expect(TimerHandlers.cancelTimer).toHaveBeenCalled();
    expect(buttons.restartRound).toHaveBeenCalled();
  });
});
