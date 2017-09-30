/* @flow */
/* eslint-env jest */

import {
  blank,
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
import {
  game,
  createGrid,
  genScoreCard,
  takeTurn,
  current,
  move,
  ROW_LENGTH,
} from '../Models';

const draw = [
  Side.X,
  Side.O,
  Side.X,
  Side.O,
  Side.X,
  Side.X,
  Side.O,
  Side.X,
  Side.O,
];

const fillBoard = (game: GameState, limit: number) => {
  for (let x of Array(3).keys()) {
    for (let y of Array(3).keys()) {
      const tile = x * ROW_LENGTH + y;
      if (tile <= limit)
        game.grid = move(game.grid, { x, y, player: draw[tile] });
    }
  }
};

let state: GameState;
describe('TicTacToe Handlers', () => {
  beforeEach(() => {
    state = Object.assign(
      {},
      game,
      { grid: createGrid() },
      { score: genScoreCard() },
    );
  });

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

    const action = makeAction(elem, Side.X);
    expect(action).toEqual({ x: 1, y: 2, player: Side.X });
  });

  it('playerAction returns if player selects square that is unavailable', () => {
    document.body.innerHTML = require('../index.pug');
    fillBoard(state, 1);

    const refresh = jest.fn();
    const show = jest.fn();
    const elem = document.createElement('div');
    elem.dataset = {
      x: '0',
      y: '0',
    };

    // function under test
    playerAction(state, refresh, show)({ target: elem });

    expect(refresh).not.toHaveBeenCalled();
  });

  it("playerAction returns immediately if player can't move", () => {
    document.body.innerHTML = require('../index.pug');
    fillBoard(state, 8);

    const refresh = jest.fn();
    const show = jest.fn();
    const elem = document.createElement('div');
    elem.dataset = {
      x: '1',
      y: '2',
    };

    // function under test
    playerAction(state, refresh, show)({ target: elem });

    expect(refresh).not.toHaveBeenCalled();
  });

  it('playerAction returns a function that moves both player and computer after staggered timeouts', () => {
    document.body.innerHTML = require('../index.pug');
    fillBoard(state, 4);

    const refresh = jest.fn();
    const refreshCalls = refresh.mock.calls;
    const show = jest.fn();
    const elem = document.createElement('div');
    elem.dataset = {
      x: '1',
      y: '2',
    };

    // function under test
    const action = playerAction(state, refresh, show)({ target: elem });

    // pre-timer actions
    const postPlayerBoardState = [
      Side.X,
      Side.O,
      Side.X,
      Side.O,
      Side.X,
      Side.X,
      '',
      '',
      '',
    ];

    // player move
    expect(refreshCalls[0][0]).toEqual(postPlayerBoardState);
    expect(state.history.length).not.toBe(0);
    expect(show).not.toHaveBeenCalled();

    // computer move
    const postComputerBoardState = [
      Side.X,
      Side.O,
      Side.X,
      Side.O,
      Side.X,
      Side.X,
      Side.O,
      '',
      '',
    ];

    jest.runTimersToTime(500);
    expect(refreshCalls[1][0]).toEqual(postComputerBoardState);
    expect(state.input).toBe(true);
  });

  it('playerAction returns a function that ends & restarts game if player has won', () => {
    document.body.innerHTML = require('../index.pug');
    fillBoard(state, 5);

    const refresh = jest.fn();
    const refreshCalls = refresh.mock.calls;
    const show = jest.fn();
    const elem = document.createElement('div');
    elem.dataset = {
      x: '2',
      y: '0',
    };

    // function under test
    const action = playerAction(state, refresh, show)({ target: elem });

    // pre-timer actions
    const postPlayerBoardState = [
      Side.X,
      Side.O,
      Side.X,
      Side.O,
      Side.X,
      Side.X,
      Side.X,
      '',
      '',
    ];

    expect(refreshCalls[0][0]).toEqual(postPlayerBoardState);
    expect(state.input).toBe(true);

    // player move
    expect(state.history).toEqual([]);
    expect(show).toHaveBeenCalled();

    // computer move
    const postComputerBoardState = [
      Side.X,
      Side.O,
      Side.X,
      Side.O,
      Side.X,
      Side.X,
      Side.O,
      Side.X,
      Side.O,
    ];

    jest.runTimersToTime(500);
    // ensure computer has not moved
    expect(state.history.length).toBe(0);
  });

  it('playerAction returns a function that ends & restarts game if computer has won', () => {
    document.body.innerHTML = require('../index.pug');
    fillBoard(state, 6);

    const refresh = jest.fn();
    const refreshCalls = refresh.mock.calls;
    const show = jest.fn();
    const elem = document.createElement('div');
    elem.dataset = {
      x: '2',
      y: '1',
    };

    // function under test
    const action = playerAction(state, refresh, show)({ target: elem });

    // pre-timer actions
    const postPlayerBoardState = [
      Side.X,
      Side.O,
      Side.X,
      Side.O,
      Side.X,
      Side.X,
      Side.O,
      Side.X,
      '',
    ];

    expect(refreshCalls[0][0]).toEqual(postPlayerBoardState);
    expect(state.input).toBe(false);

    // player move
    expect(state.history).not.toEqual([]);

    // computer move
    const postComputerBoardState = [
      Side.X,
      Side.O,
      Side.X,
      Side.O,
      Side.X,
      Side.X,
      Side.O,
      Side.X,
      Side.O,
    ];

    jest.runTimersToTime(500);
    expect(refreshCalls[1][0]).toEqual(postComputerBoardState);
    expect(state.history.length).toBe(0);
    expect(show).toHaveBeenCalled();
  });

  it('restartGameHandler should restart game, update game when player is Side.X', () => {
    takeTurn(state, { x: 0, y: 0, player: Side.X });
    takeTurn(state, { x: 1, y: 0, player: Side.X });
    takeTurn(state, { x: 2, y: 0, player: Side.X });

    state.player = Side.X;
    state.input = false;

    const show = jest.fn();
    const update = jest.fn();

    restartGameHandler(state, update, show)();

    expect(update).toHaveBeenCalledTimes(1);
    expect(state.input).toBe(true);
    expect(state.history.length).toBe(0);
    expect(state.turn).toBe(Side.X);
  });

  it('restartGameHandler should restart game, update game, and simulate first move when player is Side.X', () => {
    takeTurn(state, { x: 0, y: 0, player: Side.X });
    takeTurn(state, { x: 1, y: 0, player: Side.X });
    takeTurn(state, { x: 2, y: 0, player: Side.X });

    state.player = Side.O;
    state.turn = Side.O;
    state.input = false;

    const show = jest.fn();
    const update = jest.fn();

    restartGameHandler(state, update, show)();

    expect(update).toHaveBeenCalledTimes(2);
    expect(state.input).toBe(true);
    expect(state.history.length).toBe(1);
    expect(state.turn).toBe(Side.O);
  });

  it('resetGameHandler should restart game and trigger reset', () => {
    state.score[Side.X] += 1;
    state.turn = Side.O;

    document.body.innerHTML = `
      <div id="X-score"></div>
      <div id="O-score"></div>
    `;
    const reset = jest.fn();

    const event = (({ preventDefault: jest.fn() }: any): Event);
    resetGameHandler(state, reset)(event);

    expect(game.score[Side.X]).toBe(0);
    expect(state.turn).toBe(Side.X);
  });

  it('rollbackHandler should rollback game state and update grid', () => {
    takeTurn(state, { x: 0, y: 0, player: Side.X });
    const update = jest.fn();

    rollbackHandler(state, update)();

    expect(state.history.length).toBe(0);
    expect(current(state)).toEqual(blank);
    expect(update).toHaveBeenCalled();
  });

  it('chooseTurnHandler extract desired side from HTMLElement and use it to set game side, should clear grid, trigger view transition, simulate move, update, and allow player input when player is Side.O', () => {
    const refresh = jest.fn();
    const show = jest.fn();

    chooseTurnHandler(game, refresh, show)({
      target: { dataset: { glyph: Side.O } },
    });

    expect(game.player).toBe(Side.O);

    expect(refresh).toHaveBeenCalledTimes(1);
    expect(show).toHaveBeenCalled();

    jest.runTimersToTime(500);

    expect(refresh).toHaveBeenCalledTimes(2);
    expect(game.grid[0].player).toBe(Side.X);
    expect(game.input).toBe(true);
  });

  it('chooseTurnHandler extract desired side from HTMLElement and use it to set game side, clear grid and trigger view transition when player is Side.X', () => {
    const refresh = jest.fn();
    const show = jest.fn();

    chooseTurnHandler(state, refresh, show)({
      target: { dataset: { glyph: Side.X } },
    });

    expect(refresh).toHaveBeenCalledTimes(1);
    expect(show).toHaveBeenCalled();
  });
});
