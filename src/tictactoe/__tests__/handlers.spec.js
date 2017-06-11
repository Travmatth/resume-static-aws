/* @flow */
import {
  makeAction,
  playerAction,
  restartGameHandler,
  resetGameHandler,
  startGameHandler,
  rollbackHandler,
  chooseTurnHandler,
} from '../Handlers';
import { Game } from '../Models';

describe('TicTacToe Handlers', () => {
  let game: Game;
  beforeEach(() => (game = new Game()));

  it('makeAction should accpet GameSquare HTMLElement and return a GameGrid object', () => {
    const elem = document.createElement('div');
    elem.dataset = {
      x: '1',
      y: '2',
    };

    const action = makeAction(elem, 'X');
    expect(action).toEqual({ x: 1, y: 2, player: 'X' });
  });

  it("playerAction returns a function that returns if player can't move", () => {
    //$FlowIgnore
    game.canMove = jest.fn(() => false);
    //$FlowIgnore
    game.player = jest.fn();

    const update = jest.fn();
    const end = jest.fn();
    const elem = document.createElement('div');
    elem.dataset = {
      x: '0',
      y: '0',
    };

    // function under test
    const action = playerAction(game, update, end)({ target: elem });

    expect(game.player).not.toHaveBeenCalled();
  });

  it('playerAction returns a function that moves both player and computer after staggered timeouts', () => {
    //$FlowIgnore
    game.restart = jest.fn();
    //$FlowIgnore
    game.takeTurn = jest.fn();
    //$FlowIgnore
    game.simulateMove = jest.fn();
    //$FlowIgnore
    game.endPlayerMove = jest.fn();
    //$FlowIgnore
    game.isOver = jest.fn(() => false);
    //$FlowIgnore
    game.startPlayerMove = jest.fn();
    //$FlowIgnore
    game.current = jest
      .fn()
      .mockImplementationOnce(() => 'a')
      .mockImplementationOnce(() => 'b');

    const spy = jest.spyOn(game, 'player');
    const update = jest.fn();
    const end = jest.fn();
    const elem = document.createElement('div');

    elem.dataset = {
      x: '0',
      y: '0',
    };

    // function under test
    const action = playerAction(game, update, end)({ target: elem });

    // pre-timer actions
    expect(spy).toHaveBeenCalled();
    expect(game.takeTurn).toHaveBeenCalledWith({ x: 0, y: 0, player: 'X' });

    // player move
    jest.runTimersToTime(500);
    expect(game.endPlayerMove).toHaveBeenCalled();
    expect(game.isOver).toHaveBeenCalled();
    expect(update).toHaveBeenCalledWith('a');

    update.mockClear();

    // computer move
    jest.runTimersToTime(1000);
    expect(game.simulateMove).toHaveBeenCalled();
    expect(update).toHaveBeenCalledWith('b');
    expect(game.startPlayerMove).toHaveBeenCalled();

    // cleanup
    //$FlowIgnore
    spy.mockRestore();
  });

  it('playerAction returns a function that ends & restarts game if player has won', () => {
    //$FlowIgnore
    game.restart = jest.fn();
    //$FlowIgnore
    game.takeTurn = jest.fn();
    //$FlowIgnore
    game.endPlayerMove = jest.fn();
    //$FlowIgnore
    game.isOver = jest.fn(() => true);
    //$FlowIgnore
    game.current = jest.fn().mockImplementationOnce(() => 'a');

    const spy = jest.spyOn(game, 'player');
    const update = jest.fn();
    const end = jest.fn();
    const elem = document.createElement('div');
    elem.dataset = {
      x: '0',
      y: '0',
    };

    // function under test
    const action = playerAction(game, update, end)({ target: elem });

    // pre-timer actions
    expect(spy).toHaveBeenCalled();
    expect(game.takeTurn).toHaveBeenCalledWith({ x: 0, y: 0, player: 'X' });

    // player move
    jest.runTimersToTime(500);
    expect(game.endPlayerMove).toHaveBeenCalled();
    expect(game.isOver).toHaveBeenCalled();
    expect(game.restart).toHaveBeenCalled();
    expect(update).toHaveBeenCalledWith('a');
    expect(end).toHaveBeenCalledWith();

    // cleanup
    //$FlowIgnore
    spy.mockRestore();
  });

  it('playerAction returns a function that ends & restarts game if computer has won', () => {
    //$FlowIgnore
    game.restart = jest.fn();
    //$FlowIgnore
    game.takeTurn = jest.fn();
    //$FlowIgnore
    game.simulateMove = jest.fn();
    //$FlowIgnore
    game.endPlayerMove = jest.fn();
    //$FlowIgnore
    game.isOver = jest
      .fn()
      .mockImplementationOnce(() => false)
      .mockImplementationOnce(() => true);
    //$FlowIgnore
    game.startPlayerMove = jest.fn();
    //$FlowIgnore
    game.current = jest
      .fn()
      .mockImplementationOnce(() => 'a')
      .mockImplementationOnce(() => 'b');

    const spy = jest.spyOn(game, 'player');
    const update = jest.fn();
    const end = jest.fn();
    const elem = document.createElement('div');
    elem.dataset = {
      x: '0',
      y: '0',
    };

    // function under test
    const action = playerAction(game, update, end)({ target: elem });

    // pre-timer actions
    expect(spy).toHaveBeenCalled();
    expect(game.takeTurn).toHaveBeenCalledWith({ x: 0, y: 0, player: 'X' });

    // player move
    jest.runTimersToTime(500);
    expect(update).toHaveBeenCalledWith('a');
    expect(game.endPlayerMove).toHaveBeenCalled();
    expect(game.isOver).toHaveBeenCalled();

    update.mockClear();

    // computer move
    jest.runTimersToTime(1000);
    expect(game.simulateMove).toHaveBeenCalled();
    expect(update).toHaveBeenCalledWith('b');
    expect(game.restart).toHaveBeenCalled();
    expect(end).toHaveBeenCalledWith();

    // cleanup
    //$FlowIgnore
    spy.mockRestore();
  });

  it("restartGameHandler should restart game, update game when player is 'X'", () => {
    //$FlowIgnore
    game.restart = jest.fn();
    //$FlowIgnore
    game.player = jest.fn(() => 'X');
    //$FlowIgnore
    game.simulateFirstMove = jest.fn();
    const update = jest.fn();

    restartGameHandler(game, update)();

    expect(game.restart).toHaveBeenCalled();
    expect(update).toHaveBeenCalledTimes(1);
  });

  it("restartGameHandler should restart game, update game, and simulate first move when player is 'X'", () => {
    //$FlowIgnore
    game.restart = jest.fn();
    //$FlowIgnore
    game.player = jest.fn(() => 'O');
    //$FlowIgnore
    game.simulateFirstMove = jest.fn();
    const update = jest.fn();

    restartGameHandler(game, update)();

    expect(game.restart).toHaveBeenCalled();
    expect(game.simulateFirstMove).toHaveBeenCalled();
    expect(update).toHaveBeenCalledTimes(2);
  });

  it('resetGameHandler should restart game and trigger reset', () => {
    //$FlowIgnore
    game.restart = jest.fn();
    const reset = jest.fn();

    resetGameHandler(game, reset)();

    expect(game.restart).toHaveBeenCalled();
  });

  it("startGameHandler should clear grid and trigger view transition when player is 'X'", () => {
    //$FlowIgnore
    game.player = jest.fn(() => 'X');
    const update = jest.fn();
    const transition = jest.fn();

    startGameHandler(game, update, transition)();

    expect(update).toHaveBeenCalled();
    expect(transition).toHaveBeenCalled();
  });

  it("startGameHandler should clear grid, trigger view transition, simulate move, update, and allow player input when player is 'O'", () => {
    //$FlowIgnore
    game.player = jest.fn(() => 'O');
    //$FlowIgnore
    game.simulateFirstMove = jest.fn();
    //$FlowIgnore
    game.startPlayerMove = jest.fn();
    const update = jest.fn();
    const transition = jest.fn();

    startGameHandler(game, update, transition)();

    expect(update).toHaveBeenCalledTimes(1);
    expect(transition).toHaveBeenCalled();

    jest.runTimersToTime(500);

    expect(update).toHaveBeenCalledTimes(2);
    expect(game.simulateFirstMove).toHaveBeenCalled();
    expect(game.startPlayerMove).toHaveBeenCalled();
  });

  it('rollbackHandler should rollback game state and update grid', () => {
    //$FlowIgnore
    game.rollback = jest.fn();
    const update = jest.fn();

    rollbackHandler(game, update)();

    expect(game.rollback).toHaveBeenCalled();
    expect(update).toHaveBeenCalled();
  });

  it('chooseTurnHandler extract desired side from HTMLElement and use it to set game side', () => {
    //$FlowIgnore
    game.chooseSide = jest.fn();

    chooseTurnHandler(game)({ target: { dataset: { glyph: 'X' } } });

    expect(game.chooseSide).toHaveBeenCalledWith('X');
  });
});
