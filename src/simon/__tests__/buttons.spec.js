/* @flow */
import * as TimerHandlers from '../Handlers/TimerHandler';
import * as ColorHandlers from '../Handlers/ColorHandlers';
import type { SoundManager } from '../Models';
import type { TimerState, SimonState } from '../simon.types';
import { timerState } from '../Models/Timer';
import * as Simon from '../Models';
import {
  powerHandler,
  strictHandler,
  scoreHandler,
  clickHandler,
} from '../Handlers';

jest.mock('../Models', () => ({
  ...require.requireActual('../Models'),
  getScore: jest.fn(),
  hasPower: jest.fn(),
  resetSimon: jest.fn(),
  toggleState: jest.fn(),
  hasPower: jest.fn(),
  playerCanMove: jest.fn(),
  setInput: jest.fn(),
  move: jest.fn(),
  hasFailedRound: jest.fn(),
  hasWonRound: jest.fn(),
  hasWonGame: jest.fn(),
  isStrict: jest.fn(),
}));

jest.mock('../Handlers/TimerHandler', () => ({
  powerOn: jest.fn(),
  powerOff: jest.fn(),
  advance: jest.fn(),
  cancelTimer: jest.fn(),
}));

jest.mock('../Handlers/ColorHandlers', () => ({
  showColor: jest.fn(),
  hideColor: jest.fn(),
  wonGame: jest.fn(),
  wonRound: jest.fn(),
  strictFail: jest.fn(),
  restartRound: jest.fn(),
  toggleStrict: jest.fn(),
}));

class Sounds {}
const color = 'red';
const ev = (({}: any): Event);

describe('Simon Handlers', () => {
  let simon: SimonState;
  let buttons: ColorButtons;
  let timer: TimerState;
  let update: () => {};
  let sounds: SoundManager;
  let clock: { id: ?number };

  beforeEach(() => {
    clock = { id: null };
    update = jest.fn();
    timer = timerState();

    buttons = {
      red: document.createElement('button'),
      yellow: document.createElement('button'),
      green: document.createElement('button'),
      blue: document.createElement('button'),
    };

    Object.keys(buttons).forEach(color => buttons[color].classList.add(color));

    sounds = ((new Sounds(): any): SoundManager);
    //$FlowIgnore
    sounds.play = jest.fn();
    //$FlowIgnore
    sounds.pause = jest.fn();
  });

  it("powerHandler should start game if simon doesn't have power", () => {
    Simon.hasPower = Simon.hasPower.mockImplementationOnce(() => false);

    //const spy = jest.spyOn(simon, 'getScore');

    powerHandler(update, buttons, simon, timer, clock)(ev);

    expect(Simon.resetSimon).toHaveBeenCalled();
    expect(update).toHaveBeenCalled();
    expect(Simon.toggleState).toHaveBeenCalled();
    expect(Simon.hasPower).toHaveBeenCalled();
    expect(Simon.getScore).toHaveBeenCalled();
    expect(TimerHandlers.powerOn).toHaveBeenCalled();
  });

  it('powerHandler should end game if simon has power', () => {
    //$FlowIgnore
    Simon.hasPower = Simon.hasPower.mockImplementationOnce(() => true);

    powerHandler(update, buttons, simon, timer, clock)(ev);

    expect(Simon.toggleState).toHaveBeenCalled();
    expect(Simon.hasPower).toHaveBeenCalled();
    expect(update).toHaveBeenCalled();
    expect(TimerHandlers.powerOff).toHaveBeenCalled();
  });

  it('strictHandler should toggle simon strict mode', () => {
    strictHandler(simon)();

    expect(ColorHandlers.toggleStrict).toHaveBeenCalled();
  });

  it('scoreHandler should should set score in element textContent', () => {
    const elem = document.createElement('div');
    scoreHandler(elem)(1);

    expect(elem.textContent).toBe('1');
  });

  it('clickHandler should do nothing if player cannot move', () => {
    Simon.playerCanMove = Simon.playerCanMove.mockImplementationOnce(
      () => false,
    );

    const click = clickHandler(
      color,
      buttons,
      update,
      simon,
      timer,
      clock,
      sounds,
    )(ev);

    expect(click).toBe(false);
  });

  it('clickHandler should call setInput on correct move', () => {
    Simon.playerCanMove = Simon.playerCanMove.mockImplementationOnce(
      () => true,
    );
    Simon.hasFailedRound = Simon.hasFailedRound.mockImplementationOnce(
      () => false,
    );
    Simon.hasWonRound = Simon.hasWonRound.mockImplementationOnce(() => false);
    Simon.hasWonGame = Simon.hasWonGame.mockImplementationOnce(() => false);

    const click = clickHandler(
      color,
      buttons,
      update,
      simon,
      timer,
      clock,
      sounds,
    )(ev);

    jest.runTimersToTime(1000);

    expect(Simon.setInput).toHaveBeenCalledTimes(2);
  });

  it('clickHandler should end and restart game if player has won', () => {
    //$FlowIgnore
    Simon.playerCanMove = Simon.playerCanMove.mockImplementationOnce(
      () => true,
    );
    //$FlowIgnore
    Simon.hasFailedRound = Simon.hasFailedRound.mockImplementationOnce(
      () => false,
    );
    //$FlowIgnore
    Simon.hasWonRound = Simon.hasWonRound.mockImplementationOnce(() => false);
    //$FlowIgnore
    Simon.hasWonGame = Simon.hasWonGame.mockImplementationOnce(() => true);

    const click = clickHandler(
      color,
      buttons,
      update,
      simon,
      timer,
      clock,
      sounds,
    )(ev);

    jest.runTimersToTime(1000);

    expect(ColorHandlers.wonGame).toHaveBeenCalled();
  });

  it('clickHandler should advance to next round if player has won current round', () => {
    const color = 'red';

    //$FlowIgnore
    Simon.playerCanMove = Simon.playerCanMove.mockImplementationOnce(
      () => true,
    );
    //$FlowIgnore
    Simon.move = Simon.move.mockImplementationOnce();
    //$FlowIgnore
    Simon.setInput = Simon.setInput.mockImplementationOnce();
    //$FlowIgnore
    Simon.hasFailedRound = Simon.hasFailedRound.mockImplementationOnce(
      () => false,
    );
    //$FlowIgnore
    Simon.hasWonRound = Simon.hasWonRound.mockImplementationOnce(() => true);
    //$FlowIgnore
    Simon.hasWonGame = Simon.hasWonGame.mockImplementationOnce(() => false);

    const click = clickHandler(
      color,
      buttons,
      update,
      simon,
      timer,
      clock,
      sounds,
    )(ev);

    jest.runTimersToTime(1000);

    expect(TimerHandlers.cancelTimer).toHaveBeenCalled();
    expect(ColorHandlers.wonRound).toHaveBeenCalled();
  });

  it('clickHandler should restart if player has lost current round in strict mode', () => {
    //$FlowIgnore
    Simon.playerCanMove = Simon.playerCanMove.mockImplementationOnce(
      () => true,
    );
    //$FlowIgnore
    Simon.isStrict = Simon.isStrict.mockImplementationOnce(() => true);
    //$FlowIgnore
    Simon.hasFailedRound = Simon.hasFailedRound.mockImplementationOnce(
      () => true,
    );
    //$FlowIgnore
    Simon.hasWonRound = Simon.hasWonRound.mockImplementationOnce(() => false);
    //$FlowIgnore
    Simon.hasWonGame = Simon.hasWonGame.mockImplementationOnce(() => false);

    const click = clickHandler(
      color,
      buttons,
      update,
      simon,
      timer,
      clock,
      sounds,
    )(ev);

    jest.runTimersToTime(1000);

    expect(TimerHandlers.cancelTimer).toHaveBeenCalled();
    expect(ColorHandlers.strictFail).toHaveBeenCalled();
  });

  it('clickHandler should restart restart round if player has lost in regular mode', () => {
    //$FlowIgnore
    Simon.playerCanMove = Simon.playerCanMove.mockImplementationOnce(
      () => true,
    );
    //$FlowIgnore
    Simon.isStrict = Simon.isStrict.mockImplementationOnce(() => false);
    //$FlowIgnore
    Simon.hasFailedRound = Simon.hasFailedRound.mockImplementationOnce(
      () => true,
    );
    //$FlowIgnore
    Simon.hasWonRound = Simon.hasWonRound.mockImplementationOnce(() => false);
    //$FlowIgnore
    Simon.hasWonGame = Simon.hasWonGame.mockImplementationOnce;
    Simon.hasWonGame(() => false);

    const click = clickHandler(
      color,
      buttons,
      update,
      simon,
      timer,
      clock,
      sounds,
    )(ev);

    jest.runTimersToTime(1000);

    expect(TimerHandlers.cancelTimer).toHaveBeenCalled();
    expect(ColorHandlers.restartRound).toHaveBeenCalled();
  });
});
