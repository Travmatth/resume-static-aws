/* @flow */
import {
  makeAction,
  playerAction,
  restartGameHandler,
  resetGameHandler,
  rollbackHandler,
  chooseTurnHandler,
  showScene,
  update,
  updateScoreListener,
} from '../Handlers';
import { Side, scenes } from '../tictactoe.types';
import { Game } from '../Models';

describe('TicTacToe Handlers', () => {
  let game: Game;
  beforeEach(() => game = new Game());

  it('updateScoreListener should set element text', () => {
    const event = (({
      detail: 'test',
      target: {
        textContent: '',
      },
    }: any): CustomEvent);

    updateScoreListener(event);

    expect(event.target.textContent).toBe('test');
  });

  it('showScene should remove .hidden class from scene view when id is next', () => {
    document.body.innerHTML = `
      <div>
        <div id="start" class="scene"></div>
        <div id="play" class="scene"></div>
      </div>
    `;

    showScene(scenes.start);

    const classPresent = document
      .querySelector('#start')
      .classList.contains('hidden');
    expect(classPresent).toBe(false);
  });

  it("showScene should add .hidden class to scene view when id isn't next", () => {
    document.body.innerHTML = `
      <div>
        <div id="start" class="scene"></div>
        <div id="play" class="scene"></div>
      </div>
    `;

    showScene(scenes.start);

    const classPresent = document
      .querySelector('#play')
      .classList.contains('hidden');
    expect(classPresent).toBe(true);
  });

  it('update should iterate over squares and update their textContent', () => {
    document.body.innerHTML = `
      <div>
        <div class="test"></div>
        <div class="test"></div>
        <div class="test"></div>
      </div>
    `;

    const latest = ['a', 'b', 'c'];
    update(document.querySelectorAll('.test'))(latest);

    document
      .querySelectorAll('.test')
      .forEach((el: HTMLElement, i: number) =>
        expect(el.textContent).toBe(latest[i]),
      );
  });

  it('makeAction should accpet GameSquare HTMLElement and return a GameGrid object', () => {
    const elem = document.createElement('div');
    elem.dataset = {
      x: '1',
      y: '2',
    };

    const action = makeAction(elem, 'X');
    expect(action).toEqual({ x: 1, y: 2, player: 'X' });
  });

  it('playerAction returns if player selects square that is unavailable', () => {
    //$FlowIgnore
    game.player = jest.fn();
    //$FlowIgnore
    game.takeTurn = jest.fn();
    game.state.grid[0].player = Side.X;

    const refresh = jest.fn();
    const show = jest.fn();
    const elem = document.createElement('div');
    elem.dataset = {
      x: '0',
      y: '0',
    };

    // function under test
    const action = playerAction(game, refresh, show)({ target: elem });

    expect(game.takeTurn).not.toHaveBeenCalled();
  });

  it("playerAction returns immediately if player can't move", () => {
    //$FlowIgnore
    game.canMove = jest.fn(() => false);
    //$FlowIgnore
    game.takeTurn = jest.fn();

    const update = jest.fn();
    const end = jest.fn();
    const elem = document.createElement('div');
    elem.dataset = {
      x: '0',
      y: '0',
    };

    // function under test
    const action = playerAction(game, update, end)({ target: elem });

    expect(game.takeTurn).not.toHaveBeenCalled();
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
    expect(game.endPlayerMove).toHaveBeenCalled();
    expect(game.isOver).toHaveBeenCalled();
    expect(update).toHaveBeenCalledWith('a');

    update.mockClear();

    // computer move
    jest.runTimersToTime(500);
    expect(game.simulateMove).toHaveBeenCalled();
    expect(update).toHaveBeenCalledWith('b');
    expect(game.startPlayerMove).toHaveBeenCalled();

    // cleanup
    //$FlowIgnore
    spy.mockRestore();
  });

  it('playerAction returns a function that ends & restarts game if player has won', () => {
    document.body.innerHTML = require('../index.pug');

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
    expect(end).toHaveBeenCalled();

    // cleanup
    //$FlowIgnore
    spy.mockRestore();
  });

  it('playerAction returns a function that ends & restarts game if computer has won', () => {
    document.body.innerHTML = require('../index.pug');
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

    const player = jest.spyOn(game, 'player');
    const update = jest.fn();
    const show = jest.fn();
    const elem = document.createElement('div');
    elem.dataset = {
      x: '0',
      y: '0',
    };

    // function under test
    const action = playerAction(game, update, show)({ target: elem });

    // pre-timer actions
    expect(player).toHaveBeenCalled();
    expect(game.takeTurn).toHaveBeenCalledWith({ x: 0, y: 0, player: 'X' });

    // player move
    //jest.runTimersToTime(500);
    expect(update).toHaveBeenCalledWith('a');
    expect(game.endPlayerMove).toHaveBeenCalled();
    expect(game.isOver).toHaveBeenCalled();

    update.mockClear();

    // computer move
    jest.runTimersToTime(500);
    expect(game.simulateMove).toHaveBeenCalled();
    expect(update).toHaveBeenCalledWith('b');
    expect(game.restart).toHaveBeenCalled();
    expect(show).toHaveBeenCalled();

    // cleanup
    //$FlowIgnore
    player.mockRestore();
  });

  it("restartGameHandler should restart game, update game when player is 'X'", () => {
    //$FlowIgnore
    game.restart = jest.fn();
    //$FlowIgnore
    game.player = jest.fn(() => 'X');
    //$FlowIgnore
    game.simulateFirstMove = jest.fn();
    const update = jest.fn();
    const show = jest.fn();

    restartGameHandler(game, update, show)();

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
    const show = jest.fn();
    const update = jest.fn();

    restartGameHandler(game, update, show)();

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

  it('rollbackHandler should rollback game state and update grid', () => {
    //$FlowIgnore
    game.rollback = jest.fn();
    const update = jest.fn();

    rollbackHandler(game, update)();

    expect(game.rollback).toHaveBeenCalled();
    expect(update).toHaveBeenCalled();
  });

  it("chooseTurnHandler extract desired side from HTMLElement and use it to set game side, should clear grid, trigger view transition, simulate move, update, and allow player input when player is 'O'", () => {
    //$FlowIgnore
    game.player = jest.fn(() => 'O');
    //$FlowIgnore
    game.simulateFirstMove = jest.fn();
    //$FlowIgnore
    game.startPlayerMove = jest.fn();
    //$FlowIgnore
    game.chooseSide = jest.fn();
    const refresh = jest.fn();
    const show = jest.fn();

    chooseTurnHandler(game, refresh, show)({
      target: { dataset: { glyph: 'X' } },
    });

    expect(game.chooseSide).toHaveBeenCalledWith('X');

    expect(refresh).toHaveBeenCalledTimes(1);
    expect(show).toHaveBeenCalled();

    jest.runTimersToTime(500);

    expect(refresh).toHaveBeenCalledTimes(2);
    expect(game.simulateFirstMove).toHaveBeenCalled();
    expect(game.startPlayerMove).toHaveBeenCalled();
  });

  it("chooseTurnHandler extract desired side from HTMLElement and use it to set game side, clear grid and trigger view transition when player is 'X'", () => {
    //$FlowIgnore
    game.simulateFirstMove = jest.fn();
    //$FlowIgnore
    game.startPlayerMove = jest.fn();
    //$FlowIgnore
    game.chooseSide = jest.fn();
    const refresh = jest.fn();
    const show = jest.fn();

    chooseTurnHandler(game, refresh, show)({
      target: { dataset: { glyph: 'X' } },
    });

    expect(game.chooseSide).toHaveBeenCalledWith('X');

    expect(refresh).toHaveBeenCalledTimes(1);
    expect(show).toHaveBeenCalled();
  });
});
